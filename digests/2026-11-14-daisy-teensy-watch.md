# Daisy + Teensy Watch — 2026-11-14

## Executive summary

Tre aggiornamenti superano la soglia. **pixelscript/athanor v0.5.0 — STRONG_PASS** aggiunge un pitch/time shifter melodico a step, recorder, clock analogico/MIDI robusto e asset flashabili. **PZD Daisy Pod Groovebox v4.0.0 — STRONG_PASS** è un repeat materiale: porta otto tracce MIDI, scene, song mode, arpeggiatori e, per la prima volta, il sorgente completo. **Rastapopolix/tessera — PASS** introduce un nuovo target Daisy Seed per il core Tessera/Andamento, con build QSPI, audio a 48 kHz e memory placement ITCM/DTCM verificato dalla CI; resta però non provato su hardware.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano attivi hard anti-repeat, verifica primaria di data/build/licenza e Daisy Field come solo target di adattamento, senza compatibilità presunta.

## Pre-flight / discovery audit

- Data Europe/Zurich: **2026-11-14**; cutoff anti-repeat: **2026-10-15**; overlap: **2026-11-13–2026-11-14**, dall’ultimo scan riuscito del 13 novembre.
- Profilo: `daily_broad`. Ispezionati README, AGENTS, regole v0.3/hidden-gems/common anti-repeat/feedback, prompt state, source registry, registri published-selected-common, digest del 13 novembre e history Codex settimanale più recente.
- Discovery: **28 query Exa / 240 risultati richiesti**, più fetch primari e ricerca commit GitHub. Angoli separati: Daisy forum, PJRC Audio Projects, GitHub commit/release e host alternativi/pagine progetto.
- Copertura: almeno 8 domini e 6 classi di sorgente; oltre metà dei domini non GitHub. Pool di 12 lead: Athanor, PZD, Tessera, volfovich/teensy41, seq--23, Tone Trixter, Eight4aWish, Bigorna, stubby-rack, dirtyloader, willbearfruits/daisypatcher e ICIO500.
- Promossi Athanor, PZD e Tessera. HOLD o esclusi: volfovich/teensy41 e seq--23 per licenza assente; Tone Trixter ancora senza licenza; Eight4aWish perché i nuovi drum/latency commit non superano il repeat del giorno precedente; Bigorna per fix della pagina backup; stubby-rack perché desktop/Godot e senza port embedded; dirtyloader perché software-only e hardware non ancora arrivato; ICIO500 perché skeleton iniziale.
- Forum: Daisy Projects non mostra nuovi thread dopo il 12 novembre; l’indice PJRC mostra solo attività editoriale/supporto. Nessuna data di reply è stata usata come evento.
- Stop rule: chiusa dopo i quattro angoli obbligatori e due batch indipendenti senza ulteriori candidati promuovibili.
- Registry: revalidati Daisy Projects, PJRC Audio Projects e Altstrument; aggiunti Tessera/Andamento e volfovich/teensy41 come nuove superfici riusabili.

## Ranked entries

### 1. pixelscript/athanor v0.5.0 — STRONG_PASS — repeat materiale

**Delta verificato entro 30 giorni:** release [v0.5.0](https://github.com/pixelscript/athanor/releases/tag/v0.5.0) pubblicata il **2026-11-13 12:50:10 UTC**. Rispetto alla v0.4.0 già pubblicata il 6 novembre, il [compare v0.4.0…v0.5.0](https://github.com/pixelscript/athanor/compare/v0.4.0...v0.5.0) contiene **12 commit e 28 file**, non un ritocco cosmetico.

**Che cosa cambia:** nuovo shifter melodico a intervalli puri (quarta/quinta/ottave) con due testine crossfade e latenza dichiarata 10–40 ms tipica, sempre entro circa 50 ms; recorder stereo su SD; clock analogico auto-rilevato a 1 PPQN o 24 PPQN, MIDI clock/CC, bypass globale e delay divisions. La cattura degli edge usa una coda SPSC non bloccante dal callback, mentre `TempoLock` filtra jitter e conferma i cambi tempo. Il drive aggiunge loudness matching stereo-linked e shaping antialiased.

**Build e asset:** firmware AGPL-3.0 per Hermetic Modular Alchemy Lab V2; Make/libDaisy tramite SDK pinned, probe host per clock, divisioni, recorder, shifter e drive. La release pubblica `athanor-v0.5.0.bin`, ELF e SHA256.

**Perché vale la pena:** è un delta release-level direttamente rilevante a delay, pitch, recording e clock sync, con confini DSP/control-loop riusabili.

**Adattamento Daisy Field / Multi-Delay:** portare prima `PulseClock`/`TempoLock`, la coda edge SPSC e lo shifter come kernel isolati; poi collegarli alla matrice delay del Multi-Delay e misurare callback, latenza e SD contention sul Field. Il repository non contiene un target Field.

**Caveat:** misure CPU/latency indipendenti non pubblicate; target hardware specifico Alchemy V2; AGPL sul derivato.

**Fonti primarie:** [release](https://github.com/pixelscript/athanor/releases/tag/v0.5.0) · [repository](https://github.com/pixelscript/athanor) · [shifter](https://github.com/pixelscript/athanor/blob/v0.5.0/src/shifter.cpp) · [clock input](https://github.com/pixelscript/athanor/blob/v0.5.0/src/clock_in.h) · [licenza](https://github.com/pixelscript/athanor/blob/v0.5.0/LICENSE)

### 2. PZD Daisy Pod Groovebox v4.0.0 — STRONG_PASS — repeat materiale

**Delta verificato entro 30 giorni:** release [v4.0.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v4.0.0) pubblicata il **2026-11-13 18:12:25 UTC**, commit [b07c7f4](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/b07c7f40895fd90816d8d2dc6563faab7783f5b2). L’alert del 5 novembre riguardava v3.6.0 e il dual-Dexed/granular rewrite; qui cambia il livello di prodotto e viene pubblicato il sorgente completo.

**Che cosa cambia:** otto tracce MIDI con record/overdub/undo, grid drum/piano-roll, quantize/swing, otto pattern e chain; 16 scene con switch al downbeat; song mode a 64 step; arpeggiatore per ogni engine e pattern con chord/phrase/ratchet; stampa MIDI verso audio e live/song WAV export. Il sorgente comprende sequencer e arpeggiatore, Makefile libDaisy, persistence e tutti gli engine.

**Build, flash e asset:** target Daisy Pod + OLED/SD; GNU Arm + Make, submodule libDaisy/DaisySP, `APP_TYPE=BOOT_QSPI`. La release offre bootloader 127,1 KB, `main.bin` 1,1 MB e SD template 28,4 MB; il firmware si aggiorna copiando `main.bin` sulla SD. Licenza **PolyForm Noncommercial 1.0.0** con vendita della musica consentita ma non del firmware/hardware.

**Perché vale la pena:** scene quantizzate, pattern, song render e stato multi-engine costituiscono una vera architettura di performance/persistenza, non una funzione isolata.

**Adattamento Daisy Field / Multi-Delay:** riusare il modello scene/pattern e il commit al downbeat per snapshot di tap, send e routing; aggiungere un render WAV deterministico per confrontare preset e automazioni. Il Field richiede BSP, mapping controlli, storage e profiling propri: nessuna compatibilità è dimostrata.

**Caveat:** non commerciale; progetto ancora “active testing”; nessuna misura indipendente del worst-case con tutti gli engine; solo Pod.

**Fonti primarie:** [release](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v4.0.0) · [repository](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox) · [Makefile](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/b07c7f40895fd90816d8d2dc6563faab7783f5b2/src/Makefile) · [licenza](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/b07c7f40895fd90816d8d2dc6563faab7783f5b2/LICENSE)

### 3. Rastapopolix/tessera — Tessera/Andamento su Daisy Seed — PASS

**Evento verificato:** commit [9d05680](https://github.com/Rastapopolix/tessera/commit/9d05680fb9aba4bd2427fa8a08ea0bb7ed177d2a) del **2026-11-13 01:34:58 UTC** introduce il target; [5fb8f96](https://github.com/Rastapopolix/tessera/commit/5fb8f96e218dd163c5833465287262421c334087) del **2026-11-13 07:39:50 UTC** aggiunge memory placement e gate di link. È un nuovo progetto per questo tracker, senza hard repeat.

**Che cosa cambia:** il core portabile Tessera — engine, voice, mod, mixer, sequencer e generatori — viene compilato per Daisy Seed a **48 kHz / blocchi da 32**. Il linker QSPI seleziona a build time hot path per ITCM, mette tabelle/stato in DTCM e usa `memcheck.py` per fallire se una sezione non viene inizializzata. Il callback espone peak CPU per debugger.

**Build e flash:** GPL-3.0-only; Make/libDaisy, ARM GCC 13.2, `BOOT_QSPI`; output dichiarato 373 KiB code e 328 KiB AXI RAM. CI costruisce il target e il binario si programma via bootloader/DFU. Sono esplicitamente assenti UI, MIDI e storage; il board non è ancora arrivato e l’audio fisico non è validato. Alcuni coefficienti 808/PHYS restano tarati a 44,1 kHz.

**Perché vale la pena:** è un esempio concreto di separazione core/board e di budget linker per portare un engine grande su STM32H7 senza lasciare il percorso audio in QSPI.

**Adattamento Daisy Field / Multi-Delay:** riusare `itcm_pick.py` + `memcheck.py` per classificare callback, interpolatori e tap multipli del Multi-Delay, poi misurare `CpuLoadMeter` su Field. Serve comunque un target Field dedicato; Seed non prova compatibilità Field.

**Caveat:** nessun test hardware/audio, nessuna release Daisy, demo fissa C4–E4–G4, feature I/O incomplete e coefficienti non tutti retuned a 48 kHz.

**Fonti primarie:** [repository](https://github.com/Rastapopolix/tessera) · [target README](https://github.com/Rastapopolix/tessera/blob/5fb8f96e218dd163c5833465287262421c334087/platform/daisy/README.md) · [Makefile](https://github.com/Rastapopolix/tessera/blob/5fb8f96e218dd163c5833465287262421c334087/platform/daisy/Makefile) · [licenza](https://github.com/Rastapopolix/tessera/blob/5fb8f96e218dd163c5833465287262421c334087/LICENSE)

## HOLD / esclusi

- **volfovich/teensy41:** catena Teensy 4.1 eccellente — NAM A2-Lite 32,4% CPU, catena completa 55,3% media/67,9% max, I2S 24-bit, PlatformIO e test host/hardware — ma nessun file o testo di licenza è presente: HOLD.
- **zakmachachi/seq--23 v1.5.0:** delta sostanziale e flashato su Teensy/Daisy, ma il README dichiara che non è garantita alcuna licenza formale; non ripubblicabile come codice riusabile.
- **dylangmiles/daisy-tone-trixter:** IR picker, SD bench e trasferimento CDC async sono materialmente interessanti, ma il blocker licenza del 13 novembre resta irrisolto.
- **Eight4aWish/eurorack_modules:** Teensy Move aggiunge drum out e misura 1,5–3 ms a 96 kHz, ma il repository è stato pubblicato ieri per Secret; il delta non giustifica un secondo alert consecutivo.
- **nzimas/bigorna d31ea61:** corregge il parsing della versione nella pagina backup; non è un delta DSP/audio/firmware sufficiente.
- **buddha314/stubby-rack:** ottima architettura lock-free/sample-accurate MIT, ma oggi resta un engine Godot desktop senza port o budget MCU.
- **Daisy/PJRC forum:** nessun nuovo progetto/source event verificabile dopo il 12 novembre.

## Tracker updates

- Aggiornati Athanor e PZD come repeat materiali con nuovi blocchi fino al **2026-12-14**.
- Aggiunto Tessera/Andamento; `data/selected-projects.csv` resta invariato.
- Indice comune rigenerato; registry e prompt state aggiornati.

## Prompt improvement for next run

- **Confermato:** release con sorgente appena pubblicato e nuovo sottosistema sequencer/song supera il repeat; licenza non commerciale resta un caveat forte, non una licenza assente.
- **Regola mantenuta:** misure hardware senza licenza non autorizzano la ripubblicazione del codice.
- **Ricerca successiva:** recheck Athanor/PZD/Tessera solo su Field, misure indipendenti o release/feature architetturali ulteriori; tenere volfovich e Tone Trixter HOLD fino a licenza esplicita.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze.

- **Q1:** A continua così; B più hardware; C più architettura.
- **Q2:** A più Daisy; B più Teensy; C bilanciato.
- **Q3:** A richiedere release; B accettare build/test forti; C solo hardware misurato.
- **Q4:** A DSP; B USB/audio I/O; C storage; D UI/telemetria.
- **Q5:** A repeat solo release; B repeat anche nuovo prodotto/target con delta materiale.
- **Q6:** A forum; B GitHub compare; C host alternativi.
