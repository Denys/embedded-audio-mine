# Daisy + Teensy Watch — 2026-10-28

## Esito

1. **Peteranthony1st/PZD-Daisy-Pod-Groovebox v3.4.2 + v3.5.0 — STRONG_PASS** — repeat materiale verificato dopo v3.4.1: nuovo sottosistema multisample/import e una revisione misurata del budget real-time che elimina il sovraccarico nel worst case dichiarato.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano invariati verifica primaria, hard anti-repeat, priorità alla community e valore riusabile per DSP/audio firmware.

## Finestra e metodo

- Data Europe/Zurich: **2026-10-28**; cutoff anti-repeat 30 giorni: **2026-09-28**; overlap: **2026-10-25–2026-10-28**, dall'ultimo scan riuscito del 2026-10-27.
- Profilo: `daily_broad`. Exa: **22 query / 204 risultati richiesti**, più fetch delle pagine primarie; nessun errore di connessione o rate limit.
- Angoli distinti: Daisy Community Projects/Examples e Latest; PJRC Audio Projects/Announcements e thread mirati; release, compare, commit e sorgenti GitHub; altstrument e host alternativi.
- Date di risposta forum, indici e cache sono state usate solo per discovery. Le date e i delta promossi provengono da release, compare, commit, sorgenti e asset primari.
- PZD era bloccato fino al 2026-11-26 per l'alert v3.4.0/v3.4.1. L'eccezione è ammessa perché v3.4.2 aggiunge un vero formato multisample/import e v3.5.0 cambia il profilo real-time con misure, profiler e asset flashabili.

## Finding qualificato

### 1. PZD-Daisy-Pod-Groovebox v3.4.2/v3.5.0 — STRONG_PASS

**Eventi verificati:** [v3.4.2](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.4.2), pubblicata il **2026-10-27 16:50:53 UTC**, commit tag **ebe32a3**; [v3.5.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.5.0), pubblicata il **2026-10-27 22:05:30 UTC**, commit tag **388898a**. Entrambe sono successive allo scan precedente.

**Che cosa cambia**

- v3.4.2 introduce banchi `MULTISMP`: fino a 24 WAV nominati per nota, selezione della registrazione più vicina e circa 33 s di audio. Kit, break e sound possono essere preparati sul computer e copiati direttamente sulla SD, con WAV 8–192 kHz e 24-bit accettati.
- Il browser/importer distingue Sound, Multi, Kit e Break, consente destinazione in un banco nuovo o esistente e include una migrazione automatica dei vecchi `.snd`. Il compare v3.4.1…v3.4.2 contiene **4 commit** e modifica codice DSP/storage/UI, documentazione e template SD.
- v3.5.0 porta il core a **480 MHz**, aggiunge fast path/idle skip agli engine, sposta setup di filtri/effetti dal sample al blocco, copia i buffer DMA codec in DTCM una volta per blocco, alleggerisce limiter/AutoWah/Tremolo/Phaser e rende deterministico il Phaser.
- Aggiunge un profiler DWT per stage nella pagina Mixer. Il progetto dichiara che il full worst case passa da oltre 100% con crackle/dropout a picchi nell'ordine dell'**85%**; il compare v3.4.2…v3.5.0 contiene **10 commit**, aggiunge `src/profiler.h`, `src/fast_math.h` e `src/layer_fx.h`, e modifica i principali engine.
- L'ottimizzazione Grains è dichiarata bit-identica su 20.000 grain casuali; l'idle scende dal 4% all'1%. Sono misure dell'autore, non riprodotte indipendentemente.

**Build/flash, licenza e hardware**

- Target dichiarato: **Daisy Pod** con OLED I²C 128×64 e socket microSD aggiunti. Non esiste target o prova di compatibilità Daisy Field.
- Ogni release include `main.bin`, `dsy_bootloader_v6_4-intdfu-2000ms.bin` e `sdcard-template.zip`; per v3.5.0 `main.bin` è 884.076 byte.
- Path pratico: bootloader una tantum via DFU/web programmer, quindi `main.bin` sulla root FAT32 e power-cycle per il flash QSPI; il repository conserva anche sorgenti e build Make/libDaisy.
- Licenza root **MIT**. Restano separati i termini delle dipendenze/vendored DSP e dei sample inclusi.

**Perché vale la pena**

È un caso concreto di come far convivere looper, granular, FM, ensemble, sampler, delay e reverb su STM32H7 senza perdere osservabilità. Il valore non è soltanto “più CPU”: il profiler per stage, il passaggio per-block, l'uso DTCM e gli idle fast path formano una strategia riusabile di budgeting real-time. Il multisample mostra inoltre una pipeline SD semplice ma abbastanza robusta per contenuti utente.

**Adattamento proposto**

Per **Custom Pedals Multi-Delay**, estrarre prima il profiler DWT per misurare separatamente tap, modulazioni, feedback matrix, filtri e reverb; poi applicare precomputazione per blocco, buffer hot in DTCM e bypass/idle realmente economici. Il loader WAV/bank può diventare una base per impulse, texture o preset audio. Su **Daisy Field** usarli soltanto come esperimento di porting con un adapter BSP/UI e test di callback budget, cache/DMA, latenza e SDRAM: il sorgente PZD non dimostra compatibilità Field.

**Caveat**

- Il progetto dichiara esplicitamente di essere in active testing e di pubblicare release rapide.
- I numeri CPU e il test bit-identico non sono stati riprodotti su hardware indipendente; 480 MHz, placement DTCM e comportamento DMA richiedono verifica termica/stabilità e controllo delle sezioni linker.
- La UI e la mappa hardware sono Pod-specifiche; il template SD cresce per i sample demo.
- I termini dei factory DX7 preset e di alcuni contenuti audio richiedono attenzione separata dalla licenza MIT del firmware.

## Candidati trattenuti o esclusi

- **rainybit-code/spore:** sorgente, CI e release asset sono concreti, ma l'ultimo rilascio sostanziale resta v0.5.4 del 2026-10-12; l'attività overlap è un bump di submodule, non un nuovo DSP/release.
- **Teensyduino 1.62:** il forum mostra reply recenti, ma la release canonica è del 2026-06-18; nessun nuovo evento foundation-level nel periodo.
- **PJRC Audio Projects/UAC2:** attività recente su un thread UAC2, ma nessun nuovo repository, tag o asset riproducibile post-scan è stato verificato; niente promozione da sola.
- **Daisy Community Projects/Examples:** nessun altro evento firmware primario post-scan ha superato le soglie.
- **altstrument recent:** usato come discovery; le versioni non Daisy/Teensy o già pubblicate non sono state riciclate.

## Persistenza

- `data/published-repo-log.csv`: PZD aggiornato a v3.4.2/v3.5.0; nuova eleggibilità **2026-11-27**.
- `data/common-anti-repeat-index.csv`: record derivato PZD rigenerato.
- `data/hidden-gems-source-registry.csv`: Daisy, PJRC, PZD e altstrument revalidati al 2026-10-28.
- `data/selected-projects.csv`: invariato; è un update rapido di un progetto già noto, non un nuovo riferimento eccezionale.

## Link primari

- [Repository](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox)
- [Release v3.4.2](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.4.2)
- [Release v3.5.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.5.0)
- [Compare v3.4.1…v3.4.2](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.4.1...v3.4.2)
- [Compare v3.4.2…v3.5.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.4.2...v3.5.0)
- [Design notes v3.5.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/v3.5.0/DESIGN.md)
- [Thread Daisy](https://community.daisy.audio/t/pzd-daisy-pod-4-track-looper/9677)

## Prompt improvement for next run

- **Migliorato:** la regola proposta “ultimo tag alertato → tag corrente entro 48 ore” ha catturato due release realmente materiali senza scambiare reply forum per eventi firmware.
- **Debole:** PJRC continua a esporre titoli e reply recenti con date canoniche molto più vecchie; la ricerca esatta dell'URL thread resta rumorosa.
- **Regola proposta, non ancora permanente:** conservare il confronto rapido dei tag per due ulteriori run, ma richiedere sempre almeno uno fra nuovo DSP/storage, asset, target, misura o fix critico audio-state.
- **Recheck:** PZD bloccato fino al 2026-11-27 salvo nuovo target/engine, misura indipendente o altra architettura release-level; Spore richiede un tag post-v0.5.4; PJRC UAC2 richiede sorgente/build riproducibile.
- **Delta compatto:** `for recently alerted repos compare alerted_tag...current_tag; accept only source-backed release-level DSP/storage/measurement/target changes; forum activity remains discovery-only`.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze. Risposta compatta possibile: `Q1=B Q2=A Q3=C Q4=B Q5=A Q6=D`.

- **Q1 — Direzione:** A continua così; B verifica più profonda; C soglia novità più alta; D più finding quando reggono.
- **Q2 — Ecosistema:** A più Daisy; B più Teensy; C bilanciato.
- **Q3 — Valore tecnico:** A DSP delay/granular; B UI/preset/storage; C audio I/O, clock e gain staging; D hardware open.
- **Q4 — Evidenza:** A richiedere sempre asset flashabile; B accettare source-only con build riproducibile; C privilegiare misure hardware.
- **Q5 — Repeat:** A mantenere l'attuale eccezione materiale; B ammettere solo nuovo target/release maggiore; C ammettere anche fix critici di stato/audio.
- **Q6 — Lane da espandere:** A Daisy forum; B PJRC; C GitHub release/compare; D Codeberg/GitLab/SourceHut; E pagine personali/indici low-SEO.
