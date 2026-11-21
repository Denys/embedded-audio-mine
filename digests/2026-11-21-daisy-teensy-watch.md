# Daisy + Teensy Watch — 2026-11-21

## Executive summary

Due aggiornamenti superano la soglia. **modularev/Nemesis** è una ripetizione materiale entro 30 giorni: non è semplice attività del repository, ma un nuovo motore spettrale STFT/phase-vocoder per Teensy 4.1 con freeze, smear, profiling e test. **Eight4aWish/eurorack_electronics** corregge invece una conclusione di misura importante: il percorso Teensy Audio a 16 bit aveva nascosto il rumore del codec PCM3060 tramite troncamento verso zero. Nessuna novità Daisy forum o PJRC indicizzata è stata promossa senza un evento canonico verificabile. Il digest resta corto per qualità.

## Previous questionnaire feedback applied

none recorded

## Pre-flight / discovery audit

- **Profilo:** daily_broad, data locale Europe/Zurich **2026-11-21**; cutoff anti-repeat **2026-10-22**; overlap verificato **2026-11-20–2026-11-21** dopo l'ultimo scan riuscito del 20 novembre.
- **Regole/stato:** controllati README, AGENTS, digest-rules v0.3, hidden-gems protocol, common anti-repeat policy, feedback loop e prompt evolution state.
- **Anti-repeat:** controllati published log, selected projects, common index, digest del 20 novembre e storici Codex-weekly/portable-weekly. Nemesis era bloccato fino al 13 dicembre; i commit del 20 novembre superano il blocco perché introducono una nuova architettura DSP, non un fix cosmetico.
- **Angoli distinti:** Daisy Projects/Examples e Software; PJRC Audio Projects e thread correlati; GitHub repository/release/commit; Codeberg e host alternativi; Hackaday/Hackster; pagine progetto e build log.
- **Copertura:** 18 query Exa, oltre 7 domini, almeno 4 classi di fonte e 3 famiglie di query; oltre metà dei risultati di discovery proveniva da pagine non-GitHub.
- **Pool:** 14 lead plausibili controllati, tra cui Nemesis, eurorack_electronics, NANO-Updater/FUM, TeensyMIDIAudio, toern, PZD, 726-DSSI, Teensy8x8AudioBoard e progetti recenti dei forum.
- **Registry:** revalidati Daisy Projects, PJRC Audio Projects e Nemesis; aggiunta la pagina primaria eurorack_electronics. Nessun nuovo hub riusabile indipendente è emerso.
- **Fonti degradate/bloccate:** la pagina Daisy Software non è stata recuperata direttamente dall'estrattore; la copertura è stata compensata con ricerche per dominio e pagine primarie. Codeberg ha fornito un lead TeensyMIDIAudio ma senza una data-evento primaria verificabile.
- **Stop rule:** due passate broad più ricerca mirata sui commit hanno prodotto solo i due delta sotto; i restanti lead erano fuori overlap, privi di licenza/source path, non testati o basati su reply/index date.
- **Debito prossimo scan:** cercare una misura diretta 24/32-bit di Boy Rev A; controllare un'eventuale release Slush; risolvere data e build primaria di TeensyMIDIAudio su Codeberg; non riaprire i quattro alert del 20 novembre prima del 20 dicembre senza delta esplicito.

## Ranked entries

### 1. modularev/Nemesis — STRONG_PASS · ripetizione materiale

**Che cosa è cambiato:** commit **b2385ef9dd28b78fa4be663d71a45021779be9f8** e **722f200f81f8cb3bed832c743f5751e4fd79aa3d**, entrambi del **2026-11-20**. Il primo aggiunge Slush e la libreria `nemesis_spectral`; il secondo corregge il buzz/sideband dello smear e profila il percorso reale. Questo supera il blocco anti-repeat del precedente alert Juno/FAUST: il delta è un nuovo sottosistema STFT/phase-vocoder, non una variante della voce Juno.

**Implementazione:** FFT runtime da 1024/2048 punti, hop N/4 e finestra Hann; freeze con history di 32 frame, cattura buffer-swap senza copiare circa 66 kB nel callback, identity phase locking per picco, fase casuale sulle componenti non risolte, level matching, motion, smear, drift, tone e width. Lo stato grande vive in PSRAM; livelli e peak search restano in RAM2, mentre routine non critiche vengono spostate fuori ITCM. `SPECPROF` espone il costo seriale. Con smear a 2048 punti il profilo scende da **710k a 640k cicli/frame**, circa **29% di un blocco da 128 campioni**, con **0 late block**; il test sinusoidale pone gli artefatti entro **72 dB** dal tono pulito.

**Hardware/build:** Teensy 4.1, PlatformIO env `rev2`, 816 MHz, audio 48 kHz, USB MIDI+Serial, pre-build FAUST e linker custom; `pio run -e rev2 -t upload`. Software GPL-3.0-or-later, hardware CC BY-NC-SA 4.0.

**Perché vale la pena / Multi-Delay:** offre un'architettura riusabile per coda spectral-freeze dentro o attorno alla rete di delay. Per il Custom Pedals Multi-Delay sono interessanti soprattutto la cattura buffer-swap, la separazione RAM2/PSRAM, il crossfade del freeze e il profiling seriale.

**Adattamento Daisy Field:** estrarre il core spettrale, sostituire wrapper FAUST e layer hardware, mappare freeze/smear/motion sui controlli Field e misurare callback, SDRAM e late block. È una proposta di porting: **non esiste una build Field verificata**.

**Caveat:** nessun tag o asset firmware; le misure sono dell'autore. Il fix elimina il meccanismo di buzz rilevato e passa i test host, ma manca una validazione fisica indipendente completa di Slush su rev2.

**Fonti primarie:** [repository](https://github.com/modularev/Nemesis) · [commit b2385ef](https://github.com/modularev/Nemesis/commit/b2385ef9dd28b78fa4be663d71a45021779be9f8) · [fix/profile 722f200](https://github.com/modularev/Nemesis/commit/722f200f81f8cb3bed832c743f5751e4fd79aa3d) · [benchmark ebedfd2](https://github.com/modularev/Nemesis/commit/ebedfd2a199efc4f9eb50cf5a27e707900636c30) · [build configuration](https://github.com/modularev/Nemesis/blob/main/software/firmware/platformio.ini)

### 2. Eight4aWish/eurorack_electronics — REF_PASS

**Che cosa è cambiato:** commit **d86dfe5055807ebe6b10ea70a02fddfeda662a41** del **2026-11-20** corregge il confronto di rumore del Teensy 4.1 PCM3060 “Boy Rev A”. Il valore precedente sembrava circa 7 dB migliore perché il percorso Teensy Audio conservava solo i 16 bit alti e il round-trip troncava verso zero: il rumore del codec, circa 0,26 LSB RMS a 16 bit, diventava **99,9% campioni zero**. Il commit aggiunge `tools/noise_test/checks/teensy_16bit_deadzone.py` e rivede la documentazione.

**Implementazione e misura:** il percorso 24-bit Health coincide con la dinamica attesa del PCM3060; patch.init/libDaisy a 24 bit coincide al proprio range d'ingresso. Per Boy Rev A il valore through/per-input viene corretto a circa **-90,7 dB**, allineato a Health e non più presentato come equivalente a patch.init. Il punto riusabile è metodologico: non calcolare RMS/noise dopo una quantizzazione che può cancellare il rumore sotto 1 LSB.

**Hardware/elettronica:** schemi KiCad editabili per la board Teensy/PCM3060, script di generazione/controllo, BOM/fabbricazione e workflow di misura. Il sottoprogetto hardware è CC BY-SA 4.0. Il repository confronta Teensy 4.1, Daisy Seed/patch.init e altre front-end, ma non implica intercambiabilità hardware.

**Perché vale la pena / Multi-Delay:** per il front-end del Custom Pedals Multi-Delay è un controllo di qualità concreto: acquisizione a 24 bit end-to-end, separazione tra rumore ADC/through/output, dB riferiti al vero full-scale e verifica dell'istogramma degli zero prima di fidarsi del numero RMS.

**Adattamento Daisy Field:** usare Field come target comparativo per una procedura di misura 24-bit, con loopback, range analogico documentato e output separato. **Non è una prova di compatibilità Field** della board Teensy.

**Caveat:** il nuovo -90,7 dB è una stima basata su simulazione, datasheet e confronto con il percorso 24-bit Health; Boy Rev A non è stato rimisurato direttamente con un flusso I²S 24/32-bit. La licenza è scoped al sottoprogetto hardware, non una dichiarazione root per ogni file del monorepo.

**Fonti primarie:** [repository](https://github.com/Eight4aWish/eurorack_electronics) · [commit d86dfe5](https://github.com/Eight4aWish/eurorack_electronics/commit/d86dfe5055807ebe6b10ea70a02fddfeda662a41) · [noise test](https://github.com/Eight4aWish/eurorack_electronics/blob/main/docs/noise_test.md) · [dead-zone checker](https://github.com/Eight4aWish/eurorack_electronics/blob/main/tools/noise_test/checks/teensy_16bit_deadzone.py) · [KiCad Teensy codec board](https://github.com/Eight4aWish/eurorack_electronics/blob/main/hardware/analogue_board/teensy/codec_audio.kicad_sch) · [hardware license](https://github.com/Eight4aWish/eurorack_electronics/blob/main/hardware/analogue_board/LICENSE)

## HOLD / esclusi

- **uranioEmpobrecido/NANO-Updater FUM:** il binario firmato del 20 novembre interpola per campione il tempo di delay per eliminare zipper/click chorus/flanger, ma è esplicitamente **non testato su hardware** e il repository updater non espone sorgente/build/licenza del firmware; rollback disponibile.
- **dcoredump/TeensyMIDIAudio su Codeberg:** hardware/CAD interessante, ma non è stata verificata una data-evento primaria dentro l'overlap; non promuovere la data dell'indice.
- **Soundpauli/toern** e **PZD Daisy Pod Groovebox:** ultime evidenze canoniche rispettivamente 9 e 14 novembre, fuori overlap.
- **PJRC contactless keyboard** e attività Daisy forum: reply/index date senza commit, release, sorgente o hardware nuovo non costituiscono un evento firmware.

## Tracker updates

- Nemesis aggiornato come ripetizione materiale, nuovo ultimo alert **2026-11-21**, blocco fino al **2026-12-21**.
- eurorack_electronics pubblicato come REF_PASS, blocco fino al **2026-12-21**.
- Nessuna aggiunta a selected-projects: entrambi sono utili, ma il valore è già rappresentato dal tracker e dal source registry.
- Common anti-repeat index rigenerato dai record canonici interessati; source registry e prompt state aggiornati.

## Prompt improvement for next run

Aggiungere un gate esplicito per le misure digitali sotto 1 LSB: richiedere profondità effettiva, regola di quantizzazione, istogramma degli zero e riferimento full-scale prima di confrontare noise floor fra codec o firmware.

## Feedback / Tuning Questionnaire

1. Preferire per Nemesis una futura release flashabile o una misura fisica indipendente di Slush?
2. Quanto peso dare ai benchmark host/seriali quando manca una misura audio da banco?
3. Tenere le correzioni di metodologia di misura in REF_PASS anche senza nuova funzione DSP?
4. Cercare più confronti Teensy/Daisy dello stesso codec e front-end?
5. Per Multi-Delay interessa di più spectral freeze, smear o pitch-coherent feedback?
6. Sul target Daisy Field, dare priorità a porting DSP o a procedure ripetibili di misura I/O?
7. Escludere del tutto binari non testati su hardware anche quando includono rollback?
