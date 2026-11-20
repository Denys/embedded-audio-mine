# Daisy + Teensy Watch — 2026-11-20

## Executive summary

Quattro aggiornamenti superano la soglia: **StillRez/BluemchenFX v0.6.0 — STRONG_PASS**, **vincentltm/TouchBends v0.9.1 — STRONG_PASS**, **sfaber02/CHOMPI-MULTI-FIRMWARE launcher 1.8.2 — STRONG_PASS** e **SandroGrassia/Lilla_Audio_Sampler v7.3.1 — PASS**. I primi due sono firmware Daisy Seed indipendenti con build/flash e architetture DSP riusabili; CHOMPI introduce un protocollo robusto per installare firmware e relativi file su SD via USB MIDI; LILLA mostra un aggiornamento Teensy 4.1 concreto per ridurre il traffico display senza alterare il percorso audio.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano attivi i gate su data canonica dell'evento, licenza, build/flash, prova hardware, anti-repeat di famiglia e separazione fra target reali e adattamenti proposti.

## Pre-flight / discovery audit

- Data Europe/Zurich: **2026-11-20**; cutoff anti-repeat: **2026-10-21**; overlap: **2026-11-19–2026-11-20**, dall'ultimo scan riuscito del 19 novembre.
- Verificati README, AGENTS, regole v0.3/hidden-gems/common anti-repeat/feedback, registri published/selected/common, source registry, prompt state, digest del 19 novembre e history Codex/portable settimanali.
- Profilo: `daily_broad`. Discovery Exa: **120 risultati richiesti** in 12 ricerche distinte, con angoli separati Daisy forum, PJRC/Teensy, GitHub release/commit, host alternativi, build log, hardware artifact, DSP/delay e pagine personali. Sono stati ispezionati **23 repository plausibili** e quattro corsie primarie aggiuntive.
- Copertura non-GitHub: Daisy Community, PJRC forum, Codeberg, GitLab, SourceHut, Hackaday, Hackster, PCBKit/Gopcb, pagine personali e aggregatori usati solo come discovery. Le date di indice e i reply forum non sono stati trattati come eventi firmware.
- Daisy Community Projects non mostra una nuova release canonica: l'attività del 19 novembre su DaisyPodUsbAudio è un reply con link diretto al binario già pubblicato. PJRC Audio Projects non ha prodotto un nuovo evento source-backed qualificante; l'aggiornamento indicizzato del Design Tool++ è stato verificato separatamente ma non ha una licenza repository esplicita.
- Nessuno dei quattro repository classificati compare nei tracker WebGPT, Codex weekly o portable weekly. La famiglia CHOMPI era stata pubblicata il 3 ottobre, fuori dalla finestra di 30 giorni; il nuovo fork aggiunge inoltre un delta autonomo e materiale.

## Ranked entries

### 1. StillRez/BluemchenFX v0.6.0 — STRONG_PASS

**Che cosa è cambiato:** release **v0.6.0**, pubblicata il **2026-11-19 15:58 CET**, tag/commit **05a44f90c87bf839e76f74d8b926b64a09f2fa9f**, con asset `BluemchenFX.bin` da 138.612 byte. Rispetto alle versioni iniziali del 18 novembre aggiunge una catena seriale di quattro slot, UI di catena, sostituzione/bypass click-free e limiter sempre attivo; le fasi della catena e il limiter sono documentati come verificati sul modulo.

**Implementazione:** ogni slot implementa una piccola interfaccia `Effect`, riceve un'arena SDRAM dedicata da 8 MB e può ospitare delay o reverb anche più volte. Un pool condiviso da 24 MB resta disponibile per effetti grandi. Cambi di tipo, bypass e caricamento preset usano crossfade di circa 10 ms; parametri, routing knob/CV, MIDI e preset testuali su SD sono separati dal layer hardware. I test host compilano DSP, catena, preset e UI con `g++`, iniettano impulsi, rumore e segnali a estremi/random e precedono la build firmware in CI.

**Hardware/elettronica:** target reale **kxmx Bluemchen 4HP con Daisy Seed**, OLED, encoder, due pot, due CV, MIDI e SD. Il firmware vive in QSPI e gira dai 480 KB SRAM tramite Daisy bootloader; build riproducibile con submodule fissati, `./setup.sh`, `make` e `make program-dfu`. Licenza root MIT; `ReverbSc` arriva da DaisySP-LGPL e resta LGPL-2.1.

**Perché vale la pena / Multi-Delay:** è un riferimento compatto per separare engine DSP, allocazione SDRAM per istanza, routing controlli e persistenza. Per il Custom Pedals Multi-Delay conviene prototipare l'interfaccia `Effect`, l'arena per linea di ritardo e le transizioni click-free. Su Daisy Field servono un nuovo layer BSP/UI e misure di memoria, callback e click; non esiste una build Field verificata.

**Caveat:** supporta oggi solo delay e reverb; il parallel routing è pianificato ma non implementato. La prova hardware è dell'autore e specifica Bluemchen; non sono pubblicate misure analogiche indipendenti.

**Fonti primarie:** [repository](https://github.com/StillRez/BluemchenFX) · [release v0.6.0](https://github.com/StillRez/BluemchenFX/releases/tag/v0.6.0) · [commit/tag 05a44f9](https://github.com/StillRez/BluemchenFX/commit/05a44f90c87bf839e76f74d8b926b64a09f2fa9f) · [effect chaining](https://github.com/StillRez/BluemchenFX/blob/main/docs/design/effect-chaining.md) · [host tests](https://github.com/StillRez/BluemchenFX/blob/main/tests/README.md)

### 2. vincentltm/TouchBends v0.9.1 — STRONG_PASS

**Che cosa è cambiato:** release **v0.9.1**, pubblicata il **2026-11-19 07:24 CET**, tag che risolve al commit **634e9aec878769b55c93c6263e128d9088510b2d**. Ricostruisce la catena DSP come pipeline sample-local, fonde preamp e filtro nel loop di feedback a un campione, corregge il latch dei bend e aggiunge scrubbing durante freeze, slicing/stutter e riproduzione reverse. I test host salgono a 22; sono disponibili BIN e HEX.

**Implementazione:** audio stereo 48 kHz, blocchi da 64 campioni (~1,33 ms), controlli a circa 1 kHz trasferiti con buffer lock-free. La delay line stereo 16-bit usa SDRAM esterna e arriva a 21,8 s; stati critici e loop attivi restano in SRAM. Il modello di “circuit bending” espone nodi virtuali per clock, delay, filtro, amplificatore, feedback e alimentazione, con sag, clipping a diodi e slew limiting calibrati.

**Hardware/elettronica:** target **Synthux Touch 2 con Daisy Seed**, MPR121 I²C per 12 pad capacitivi e CD4051 per knob/fader. Build/flash: clone del ramo beta con submodule, `make setup-libs`, `make -j8`, `make program-dfu`; `make test` esegue i test host. Licenza MIT.

**Perché vale la pena / Multi-Delay:** pipeline per-campione, scrubbing freeze, reverse, stutter e feedback non lineare sono direttamente interessanti per una modalità sperimentale del Multi-Delay. Su Daisy Field l'adattamento va limitato inizialmente al core DSP e a un mapping esplicito dei controlli Field, con test di latenza e SDRAM; non esiste evidenza di compatibilità Field.

**Caveat:** interazione e calibrazione sono pensate per Touch 2; non ci sono misure THD/noise o validazione indipendente. Il ramo di default è `beta`.

**Fonti primarie:** [repository](https://github.com/vincentltm/TouchBends) · [release v0.9.1](https://github.com/vincentltm/TouchBends/releases/tag/v0.9.1) · [commit 634e9ae](https://github.com/vincentltm/TouchBends/commit/634e9aec878769b55c93c6263e128d9088510b2d) · [technical reference](https://github.com/vincentltm/TouchBends/blob/beta/manual/technical_reference.md)

### 3. sfaber02/CHOMPI-MULTI-FIRMWARE launcher 1.8.2 — STRONG_PASS

**Che cosa è cambiato:** commit **2ce64c8be1ee51c038329bd09213ebfca550a231** del 19 novembre, unito su main come **a67103a983db9456f12eb4e612afee8ad4a74480** il **2026-11-20 00:19 CET**. Il launcher può ora installare via USB MIDI non solo un `.bin`, ma anche i file propri del firmware (preset, bank e risorse) nelle rispettive cartelle. Aggiunge comandi `FILE` e `STAT`, path validation, upload temporaneo + readback + rename atomico e policy “non sovrascrivere salvo REPLACE”. Corregge inoltre la perdita della connessione USB quando l'interrupt del charger riprendeva le data line a cavo già collegato.

**Implementazione:** protocollo SysEx stop-and-wait con frame 7-bit, offset, CRC-32, chunk fino a 2048 byte e feature negotiation via `PING`. Il launcher valida vector table e limiti delle immagini `BOOT_SRAM`, copia da SD in SDRAM e usa un trampoline PIC in ITCM seguito da warm reset, evitando un salto diretto con periferiche/DMA sporchi. Le app e le risorse sono isolate in `/FIRMWARE` e cartelle per-app.

**Hardware/elettronica:** target reale **CHOMPI/Seed2 DFM**, 64 MB SDRAM, SD e USB MIDI condiviso con il charger. Il sorgente è MIT e documenta build con ARM GCC 10.3-2021.10 e `make -j8`, producendo `build/CHOMPI.bin`.

**Perché vale la pena / Multi-Delay:** il delta è prezioso per distribuire firmware, preset, IR e wavetable come unità coerente senza contaminare namespace condivisi. Per il Multi-Delay, il riuso più concreto è un installer host con CRC/readback/rename e cartella per preset/risorsa. Su Daisy Field serve un boot/update layer diverso e una validazione specifica di FatFS, memoria e USB; non c'è compatibilità Field dimostrata.

**Caveat:** il commit 1.8.2 non ha ancora una release taggata o un nuovo asset; l'ultima release scaricabile è **v1.7 del 2026-11-08**. Toolchain e handover sono CHOMPI-specifici; il fork include asset upstream con relativi notice e marchi.

**Fonti primarie:** [repository](https://github.com/sfaber02/CHOMPI-MULTI-FIRMWARE) · [commit 2ce64c8](https://github.com/sfaber02/CHOMPI-MULTI-FIRMWARE/commit/2ce64c8be1ee51c038329bd09213ebfca550a231) · [merge a67103a](https://github.com/sfaber02/CHOMPI-MULTI-FIRMWARE/commit/a67103a983db9456f12eb4e612afee8ad4a74480) · [launcher README](https://github.com/sfaber02/CHOMPI-MULTI-FIRMWARE/blob/main/firmware/chompi-launcher/README.md) · [protocol](https://github.com/sfaber02/CHOMPI-MULTI-FIRMWARE/blob/main/firmware/chompi-launcher/PROTOCOL.md)

### 4. SandroGrassia/Lilla_Audio_Sampler v7.3.1 — PASS

**Che cosa è cambiato:** release **v7.3.1**, pubblicata il **2026-11-19 02:16 CET**, commit **609934388c0b85c2120f73c21b2604691ebc0638**, con `Lilla_v7_3_1.hex` e guida PDF. Il Live Sampler confronta il canvas corrente con una copia e trasferisce solo gli span di righe cambiati; ridisegni pagina e popup forzano invece un refresh completo. Evita anche ridisegni inutili delle etichette canale.

**Implementazione:** la copia di confronto occupa 60.140 byte di PSRAM libera; capacità di registrazione, buffer audio e intervallo display da 200 ms restano invariati. La build PlatformIO `teensy41` è passata, il buffer è stato verificato in PSRAM e il firmware esportato è stato controllato. Il progetto documenta engine audio, 16 voci, flash/SD, Live Sampler circolare PSRAM, MIDI Loop multitraccia e delay stereo.

**Hardware/elettronica:** sampler hardware Teensy 4.1 a 600 MHz con display, PSRAM, flash, SD, MIDI e routing main/pre-listen. Firmware GPL-2.0; asset HEX pronto per l'hardware LILLA.

**Perché vale la pena / Multi-Delay:** è un esempio piccolo ma concreto di budget UI/PSRAM: ridurre trasferimenti display senza cambiare cadenza o buffer audio. Su Daisy Field si può prototipare un dirty-rectangle buffer nel driver display e misurare jitter callback, uso SDRAM e traffico SPI; non è una portabilità già provata.

**Caveat:** l'autore dichiara ancora **pendente** la conferma anti-flicker sull'hardware Speed_shift; il costo PSRAM è fisso. Non è una nuova funzione DSP e non modifica il motore audio.

**Fonti primarie:** [repository](https://github.com/SandroGrassia/Lilla_Audio_Sampler) · [release v7.3.1](https://github.com/SandroGrassia/Lilla_Audio_Sampler/releases/tag/v7.3.1) · [commit 6099343](https://github.com/SandroGrassia/Lilla_Audio_Sampler/commit/609934388c0b85c2120f73c21b2604691ebc0638) · [release notes](https://github.com/SandroGrassia/Lilla_Audio_Sampler/blob/main/docs/release-notes-7.3.1.md) · [firmware architecture](https://github.com/SandroGrassia/Lilla_Audio_Sampler/blob/main/FIRMWARE_ARCHITECTURE.md)

## HOLD / esclusi

- **joebmz98/Weasel-West-Coast-Synthesiser:** i commit del 19 novembre aggiungono valori 6N138/resistori e debug MIDI, ma non documentano ancora una revisione hardware assemblata o una release; il progetto era già pubblicato il 26 maggio.
- **yannseznec/STR500-stringSampler:** aggiornamento PCB/BOM utile ma prevalentemente documentale; nessun nuovo firmware, release o misura.
- **FullMoon425/teensy-nam-pedal:** il nuovo sketch integra buffer analogico, Audio Shield, UI e OLED, ma il README dichiara che inferenza NAM e signal processing finale non sono ancora implementati; hardware schematic/photo directories sono vuote.
- **rhdghcks/stm32-dsp-delay-effect:** sorgente, Makefile, test host e DFU sono concreti, ma manca una licenza e la validazione Seed reale di livelli, rumore e DMA.
- **Quasymoto/USB_Looper:** sorgente PlatformIO per Teensy 4.1 e Audio Shield, ma nessuna licenza, release o evidenza hardware.
- **hugofloresgarcia/FunBox:** il fix Cenote corregge l'inizializzazione degli switch e il wrapper hosted, con test impulso 300 ms→67,5 ms prima/dopo; utile ma troppo stretto per una nuova voce dopo la copertura recente della famiglia FunBox.
- **manicken/manicken.github.io:** il Design Tool++ ha commit recenti e valore di workflow, ma il repository non dichiara una licenza riusabile.
- **DaisyPodUsbAudio:** il post del 19 novembre aggiunge solo un link diretto al binario già noto, senza nuova release o delta firmware.

## Analysed resources

Daisy Community Projects/Examples e Software, PJRC Teensy Audio Projects e General Discussion, GitHub repository/release/commit search, Codeberg/GitLab/SourceHut, Hackaday/Hackster, PCBKit/Gopcb, pagine personali, build log e source registry; sorgenti primarie BluemchenFX, TouchBends, CHOMPI Multi-Firmware e LILLA.

## Tracker updates

- Quattro righe pubblicate con ultimo alert **2026-11-20** e blocco fino al **2026-12-20**.
- BluemchenFX e TouchBends aggiunti a selected come riferimenti eccezionali per catena DSP/memoria/preset e delay sperimentale.
- Indice anti-repeat comune, source registry e prompt state aggiornati.

## Prompt improvement for next run

Separare esplicitamente i delta “UI che protegge il tempo reale” dai soli cambi cosmetici: un refresh parziale merita PASS solo quando esistono build, budget memoria, invarianti audio e caveat hardware dichiarati.

## Feedback / Tuning Questionnaire

1. Preferire catene multi-effetto o singoli algoritmi DSP insoliti?
2. Dare priorità alle release flashabili rispetto ai commit source-only?
3. Quanto peso dare a test host senza misure analogiche?
4. Tenere gli installer/boot manager CHOMPI nella corsia embedded-audio?
5. Valorizzare ottimizzazioni UI quando proteggono il real-time audio?
6. Cercare più progetti Touch 2 come sorgente di idee per Multi-Delay?
