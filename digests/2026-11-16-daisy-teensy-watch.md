# Daisy + Teensy Watch — 2026-11-16

## Executive summary

Tre aggiornamenti superano la soglia: **Electrotechnique/Momentum V2.00 — STRONG_PASS**, **Peteranthony1st/PZD-Daisy-Pod-Groovebox v4.0.1–v4.0.3 — STRONG_PASS (repeat materiale)** e **Rastapopolix/andamento-fw — PASS (continuazione materiale di Tessera/Andamento)**. Tutti hanno sorgente e percorso di build verificabili; Momentum aggiunge anche un HEX rilasciato. Nessuno dichiara un target Daisy Field, quindi le proposte Field restano piani di porting e prova.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano attivi hard anti-repeat, verifica primaria di data/build/licenza e Daisy Field come target di valutazione senza compatibilità presunta.

## Pre-flight / discovery audit

- Data Europe/Zurich: **2026-11-16**; cutoff anti-repeat: **2026-10-17**; overlap: **2026-11-15–2026-11-16**, dall'ultimo scan riuscito del 15 novembre.
- Verificati README, AGENTS, regole v0.3/hidden-gems/common anti-repeat, registri published/selected/common, source registry, digest Daisy/Teensy del 15 novembre, history Codex settimanale e portable-weekly recente.
- Discovery: **20 query Exa / 181 risultati richiesti**, più fetch primari e ricerche commit GitHub. Angoli separati: Daisy forum, PJRC Audio Projects, GitHub commit/release e host alternativi/pagine progetto.
- Le date di indice e reply sono state usate solo per discovery; versione, data e delta provengono da release, commit e file primari.
- Anti-repeat: PZD e la famiglia Tessera/Andamento ricadono nella finestra. Entrano soltanto perché i delta sotto indicati sono architetturali e verificati; il reset del blocco è esplicito.

## Ranked entries

### 1. Electrotechnique/Momentum V2.00 — STRONG_PASS

**Evento verificato:** release [V2.00](https://github.com/Electrotechnique/Momentum/releases/tag/V2.00), pubblicata il **2026-11-15 09:12:29 UTC** al commit [8af81d8](https://github.com/Electrotechnique/Momentum/commit/8af81d859750be9b12fa67f06f1cf96d8063d0d3). È presente l'asset flashabile `MomentumV2_00.hex` da circa 1,2 MB; la pull request [#16](https://github.com/Electrotechnique/Momentum/pull/16) documenta 22 commit, 41 file e un delta di +5657/−2491 righe.

**Che cosa cambia:** blocco audio ridotto a 64 sample, gestione note e MIDI spostata in RAM, display a slice da 1 ms con DMA/lock dedicato, heap thread-safe, scritture EEPROM differite, guardia di sovraccarico che scarta una voce invece di bloccare l'audio e sospensione delle voci silenziose. Ensemble, plate reverb stereo, oscillatore triangolare/pulse, TPT-SVF, morph del filtro, voice stealing, unison, arp/sequencer e clock MIDI sono stati riscritti o corretti. Arrivano inoltre `CPUMonitor`, CrashReport e aggiornamento firmware da qualunque `.hex` nella root SD.

**Build e flash:** sorgente MIT; PlatformIO usa `board = teensymm`, `USB_MIDI_AUDIO_SERIAL` e Teensy Audio Library con blocchi da 64 sample. Il primo caricamento dell'updater SD richiede USB; poi si può aggiornare dalla scheda. La release offre anche il percorso classico Teensy Loader/TyUploader.

**Hardware/elettronica:** Teensy MicroMod/RT1062 a 600 MHz, uscita PCM5102A 16-bit/44,1 kHz, host/client USB, MIDI TRS, TFT e SD. Repository, manuale e modelli STL rendono il percorso di assemblaggio concreto; non è una nuova revisione PCB.

**Perché vale la pena:** combina un firmware realmente flashabile con interventi riusabili su latenza, isolamento UI/audio, persistenza non bloccante, degradazione controllata sotto carico e telemetria per gruppi di oggetti audio.

**Adattamento Daisy Field / Custom Pedals Multi-Delay:** riusare come pattern il blocco da 64 sample, le scritture differite, il monitor per sottografi DSP, la guardia overload e l'isolamento display/DMA. Per Multi-Delay è particolarmente utile il modello “drop controllato” e la pipeline ensemble/reverb. **Non esiste un target Field**: Audio Library, periferiche e UI vanno reimplementate e profilate sul Field.

**Caveat:** target MicroMod, non Teensy 4.1 classico; codec a 44,1 kHz/16 bit; l'asset release non sostituisce una misura audio indipendente; l'updater SD richiede bootstrap USB.

**Fonti primarie:** [release V2.00](https://github.com/Electrotechnique/Momentum/releases/tag/V2.00) · [PR tecnica #16](https://github.com/Electrotechnique/Momentum/pull/16) · [repository](https://github.com/Electrotechnique/Momentum) · [PlatformIO](https://github.com/Electrotechnique/Momentum/blob/main/platformio.ini) · [licenza MIT](https://github.com/Electrotechnique/Momentum/blob/main/LICENSE)

### 2. Peteranthony1st/PZD-Daisy-Pod-Groovebox v4.0.1–v4.0.3 — STRONG_PASS · repeat materiale

**Evento verificato e delta anti-repeat:** dopo la v4.0.0 già pubblicata il 14 novembre, il compare [b07c7f4…14c7867](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/b07c7f40895fd90816d8d2dc6563faab7783f5b2...14c78671a2e3358d353281275360fff368476d2d) contiene cinque commit materiali. Il commit [7e85cab](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/7e85cabb8dff6c98041e9b072be999be11e6501b), **2026-11-14 08:30:47 UTC**, introduce v4.0.1; [a7d3560](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/a7d35606db7495a7c69ef153ebb645e32e1c166c), **18:59:40 UTC**, porta v4.0.2; [baef52e](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/baef52e5cdebf43fce0bd751c46f3b622e1d5f51), **20:05:58 UTC**, porta v4.0.3; [14c7867](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/14c78671a2e3358d353281275360fff368476d2d), **20:18:16 UTC**, aggiunge la guida enclosure. Questo supera la soglia: non è attività generica, ma un nuovo motore completo e misurato, mixer e documentazione di costruzione.

**Che cosa cambia:** nuovo Supersaw con sette saw, tabella/curva/mix detune JP-8000, secondo oscillatore, SVF 12/24 dB, inviluppi, LFO, poly/mono/legato/portamento, chorus stereo e 42 suoni. Il DSP usa processing a chunk, correzione wrap/PolyBLEP, controllo ogni 16 sample e loop filtro templato. `FastChorus` corregge il precedente L/R identico e viene applicato a Ensemble, Organ e Supersaw. Il mixer globale viene separato in pagine Tracks/Synths; Ensemble aggiunge LFO e risposta alla velocity.

**Evidenza real-time:** su Daisy Pod reale, caso peggiore a 10 voci: circa 32% iniziale, 28% dopo chunking, 20–21% dopo ottimizzazione control/filter, 16% con chorus mono e 18–19% con chorus stereo. I gain factory sono allineati offline con peak e loudness K-weighted BS.1770 e controllati contro drop-out.

**Build e flash:** `src/Makefile`, libDaisy/DaisySP, `BOOT_QSPI`, linker custom con ITCM, `-O3`, fast-math e LTO; `SUPERSAW_CPU_TEST=1` abilita il test CPU. Non esiste un nuovo tag/asset dopo v4.0.0: il delta è sorgente-only. Licenza PolyForm Noncommercial 1.0.0 con eccezione per la vendita di musica, non per firmware/hardware commerciale.

**Hardware/elettronica:** Daisy Pod con OLED/SD e nuova guida enclosure. Nessun target Field.

**Perché vale la pena:** è una rara traccia end-to-end da algoritmo synth a budgeting reale, correttezza stereo, loudness preset e integrazione UI/mixer.

**Adattamento Daisy Field / Custom Pedals Multi-Delay:** portare chunking, gate CPU sul caso peggiore, verifica L/R del chorus, normalizzazione BS.1770 e pagine mixer come strumenti per un Multi-Delay con modulatori e scene. Il port Field richiede BSP/control mapping, audio-I/O e profiling dedicati.

**Caveat:** repeat entro 30 giorni ammesso solo per il delta sopra; source-only; licenza non commerciale; misure dell'autore, non indipendenti.

**Fonti primarie:** [compare materiale](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/b07c7f40895fd90816d8d2dc6563faab7783f5b2...14c78671a2e3358d353281275360fff368476d2d) · [repository](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox) · [design](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/main/DESIGN.md) · [Makefile](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/main/src/Makefile) · [licenza](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/main/LICENSE)

### 3. Rastapopolix/andamento-fw — PASS · continuazione materiale Tessera/Andamento

**Evento verificato e delta anti-repeat:** repository creato il **2026-11-14 09:21 UTC** come fork esplicito del ramo Tessera `develop` a `81aa730f`. Il commit [b8201ae](https://github.com/Rastapopolix/andamento-fw/commit/b8201ae7fd30e2fac427f24d9b73b58961313a7d), **2026-11-15 08:13 UTC**, porta UI Andamento, tracce 5–8, master bus e texture engine nel target Daisy; [008ff46](https://github.com/Rastapopolix/andamento-fw/commit/008ff46e7f380bad7f574957f51e54cda10f24ea), nello stesso batch, sposta il capture texture da 192.000 byte in SDRAM separata. Rispetto al Tessera pubblicato il 14 novembre, che non aveva UI/MIDI/storage, il delta è una continuazione architetturale sostanziale, non un nuovo nome per lo stesso snapshot.

**Che cosa cambia:** catena audio separata in mix, master, texture ed external block; selezione ITCM per master/texture; core UI Andamento con otto tracce; scansione pannello e output ogni millisecondo; due display a circa 30 fps dopo bring-up; telemetria CPU media/picco su USB seriale. Il buffer texture da due secondi a 48 kHz viene collocato in `AND_SDRAM`, evitando circa 188 KiB di zero-data nell'immagine/AXI. Un gate di build trasforma le funzioni mancanti in errore.

**Build e flash:** GPL-3.0-only. Build documentata con `make -C platform/daisy LIBDAISY_DIR=/path/to/libDaisy`; esiste anche un prototipo browser Emscripten. Il target conserva il callback 48 kHz/32 frame e la strategia ITCM/DTCM del lavoro Tessera.

**Hardware/elettronica:** progetto per Daisy Seed con otto tracce, due OLED 128×64, otto encoder, 16 tasti RGB, MIDI e CV/gate. Il README dichiara però **“in development, no hardware yet”**; SPI/CS, 74HC165, UART MIDI, DAC e gate restano stub.

**Perché vale la pena:** rende concreta la separazione tra core audio, UI dual-display, control-rate, memoria SDRAM e telemetria, mostrando anche come far divergere un port embedded da un core comune senza trascinarsi memoria zero inutile.

**Adattamento Daisy Field / Custom Pedals Multi-Delay:** riusare la separazione control/audio, le pagine UI, il callback a 32 frame, il buffer texture SDRAM e la telemetria per un prototipo Multi-Delay. **Nessun target Field né prova hardware:** servono mapping controlli, codec/audio-I/O e profiling sul dispositivo.

**Caveat:** hardware non costruito; periferiche ancora stub; nessun asset release; nessun workflow run verificato nel nuovo repository; la famiglia Tessera/Andamento resta bloccata come repeat fino al 16 dicembre.

**Fonti primarie:** [repository](https://github.com/Rastapopolix/andamento-fw) · [commit integrazione](https://github.com/Rastapopolix/andamento-fw/commit/b8201ae7fd30e2fac427f24d9b73b58961313a7d) · [commit SDRAM](https://github.com/Rastapopolix/andamento-fw/commit/008ff46e7f380bad7f574957f51e54cda10f24ea) · [build Daisy](https://github.com/Rastapopolix/andamento-fw/blob/main/platform/daisy/README.md) · [Makefile](https://github.com/Rastapopolix/andamento-fw/blob/main/platform/daisy/Makefile) · [licenza GPL-3.0](https://github.com/Rastapopolix/andamento-fw/blob/main/LICENSE)

## HOLD / esclusi

- **wsjk/-vocal-fx-processor:** commit del 16 novembre aggiunge benchmark Daisy Seed per echo/freeze/reverb/harmony, ma il README dichiara che non è firmware audio-capable, non è stato provato su hardware e manca una licenza root: HOLD.
- **jpwarwick92-maker/Synth:** fix Teensy del 15 novembre su potenziometri, overload shedding e prove 96/192 kHz, ma hardware non costruito e licenza root assente: HOLD.
- **MixedMode-fX/central:** solo boot/report PSRAM; sotto soglia come delta audio.
- **DSparks156x/rnse-sdlink:** interessante rate matching Teensy/Pi, ma resta un sottosistema media automotive adiacente, non un progetto audio firmware riusabile abbastanza forte per questa classifica.
- **PJRC:** nessun thread del periodo ha fornito un nuovo evento canonico con sorgente/release verificabile.

## Tracker updates

- Aggiornati PZD e il lineage Tessera/Andamento con hard repeat fino al **2026-12-16**; aggiunto Momentum con lo stesso blocco.
- `data/selected-projects.csv` resta invariato: Momentum è un forte riferimento firmware, ma non giustifica una nuova voce selected senza una revisione hardware/editable-PCB eccezionale.
- Aggiornati indice comune, source registry e prompt state.

## Prompt improvement for next run

- Trattare fork/continuazioni come la stessa famiglia anti-repeat quando condividono il core e l'evento precedente; ammetterli solo con delta architetturale esplicito.
- Per release Teensy, separare sempre asset flashabile, percorso di bootstrap e dipendenze hardware.
- Per Field, trasformare ogni proposta in un piano di port/profiling e non in una dichiarazione di compatibilità.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze.

- **Q1:** A continua così; B più hardware; C più architettura.
- **Q2:** A più Daisy; B più Teensy; C bilanciato.
- **Q3:** A richiedere release; B accettare build/test forti; C solo hardware misurato.
- **Q4:** A DSP; B USB/audio I/O; C storage; D UI/telemetria.
- **Q5:** A repeat solo release; B repeat anche nuovo prodotto/target con delta materiale.
- **Q6:** A forum; B GitHub compare; C host alternativi.
