# Daisy + Teensy Watch — 2026-10-04

## Sintesi

Due release indipendenti superano le verifiche di data, sorgente, build, licenza e anti-repeat:

1. **heavylight-industries/capicola — STRONG_PASS** — prima release pubblica **v1.0.0**, pubblicata il **2026-10-02** dal commit `120b0b843c18bda373d96eb79d49805545f61556`, con binario DFU, build CMake e test host.
2. **Guitar-Sound-Processing/GSP — PASS** — GSP **1.0.0** annunciato sul forum Daisy il **2026-10-02**; repository CC0 con firmware Daisy, bridge ESP32/Bluetooth, app Android e quattro schede audio/controllo in sorgente Eagle.

Nessun progetto Teensy/PJRC ha mostrato nel periodo 2–4 ottobre una nuova release o un delta firmware/hardware verificabile che superi la soglia. Le date dei risultati di ricerca sono state ricontrollate su commit, release e post primari.

## 1. heavylight-industries/capicola — STRONG_PASS

**Evento verificato**

- [Release Capicola v1.0.0](https://github.com/heavylight-industries/capicola/releases/tag/v1.0.0), pubblicata 2026-10-02, con asset `capicola.bin`.
- [Commit 120b0b8](https://github.com/heavylight-industries/capicola/commit/120b0b843c18bda373d96eb79d49805545f61556), 2026-10-02.
- [Repository](https://github.com/heavylight-industries/capicola) e [pagina tecnica primaria](https://hermeticmodular.com/blog/capicola-time-stretch-daisy).

**Cosa è cambiato**

La v1.0.0 è la prima release pubblica e rende bidirezionali sia il time-stretch sia il pitch:

- stretch bipolare: reverse, forward e freeze reale al centro;
- pitch granulare lineare da −2× a +2×, con stop reale e detent a ±1×;
- cambio di direzione “ping-pong” che scambia i due grain head durante il crossfade, invece di invertire una testina attiva;
- riancoraggio con fade completo quando freeze/reverse esauriscono lo spazio utile del ring buffer;
- correzione delle finestre che prima avanzavano soltanto in direzione positiva e dei crossfade che non terminavano a pitch negativo.

**Implementazione e build**

Il DSP è separato dall’hardware: `lib/KeyframeRecorder.h` contiene il metodo di keyframe time stretching; `src/audio/` possiede routing e motore; `src/main.cpp` implementa la UI Alchemy. Due ring di keyframe da circa 24 MB condividono i 64 MB SDRAM. Il repository include test host nativi per interpolazione, sparse-line/window search, detector TKEO, invarianti del grain engine e fuzz del ring buffer.

Build verificabile:

```sh
git submodule update --init --recursive
cmake --preset arm
cmake --build --preset arm
```

Produce `build-arm/capicola.{elf,bin,hex}`. Per test host: `cmake --preset host`, build e `ctest --preset host`. La release si installa via DFU su `0x90040000`.

**Hardware**

Target dichiarato: **Alchemy Lab V2**, basato su **Daisy Seed 2 DFM / STM32H750**, con sei potenziometri ad anello LED, tre pulsanti, I/O stereo e jack CV riconfigurabili. Il firmware usa il BSP e bootloader specifici Alchemy; non è un binario generico Daisy.

**Perché vale l’esame**

È un raro algoritmo di stretch embedded con architettura e test riutilizzabili, non soltanto una demo: il motore evita FFT e cross-correlazione, espone un percorso host-testabile e documenta i punti delicati di reverse, freeze, grain handoff e buffer exhaustion.

**Adattamento per Custom Pedals / Daisy Field**

Per il Multi-Delay, il valore immediato è estrarre la logica ring/keyframe e il grain handoff per una modalità “freeze/reverse delay” sincronizzata ai transienti, mantenendo la UI Field separata. **Compatibilità Daisy Field non dimostrata**: il target sorgente è Alchemy Lab V2/Seed 2 DFM. Prima prova consigliata: eseguire i test host, costruire un adapter I/O Field, ridurre/parametrizzare i due ring e misurare SDRAM, CPU, deadline del callback e click ai cambi di direzione.

**Caveat**

- Licenza **AGPL-3.0** per Capicola; SDK Alchemy e libDaisy venduto mantengono MIT.
- Le preset pre-release non sono compatibili con v1.0.0.
- Gli esempi audio pubblicati documentano il motore base, non ancora l’intero firmware Capicola.
- Build, asset e test sorgente sono stati ispezionati; questa esecuzione non ha flashato il modulo né rifatto le misure audio.

## 2. Guitar-Sound-Processing/GSP — PASS

**Evento verificato**

- [Annuncio Daisy Community](https://community.daisy.audio/t/gsp-was-released/9808), 2026-10-02.
- [Repository GSP](https://github.com/Guitar-Sound-Processing/GSP), ultimo commit di consolidamento documentale [cf24521](https://github.com/Guitar-Sound-Processing/GSP/commit/cf24521a3b0cddcfd06b1341a2d23c5db7133501), 2026-10-02.
- [Wiki primaria](https://github.com/Guitar-Sound-Processing/GSP/wiki).
- Il repository non ha una GitHub Release/tag/binario: l’evento è il rilascio pubblico del bundle sorgente **GSP 1.0.0**.

**Cosa è cambiato**

Il progetto è ora pubblicato come sistema completo, non come singolo effetto:

- firmware Daisy Seed a 48 kHz con catena SISO riordinabile e 19 effetti;
- delay/echo, chorus e pitch path su buffer SDRAM; callback audio e DSP in classi separate;
- protocollo ASCII per inserimento, bypass, ordine e parametri degli effetti;
- ESP32/Wrover come bridge UART/Bluetooth e lettore fino a otto expression pedal;
- app Android/Kotlin per playlist, song, chain e preset;
- quattro PCB documentate: Daisy shield, driver audio analogico, shield ESP32 e I/O board.

**Build e hardware**

`gsp_daisy/src/Makefile` dichiara `TARGET = gsp.bin`, `APP_TYPE = BOOT_SRAM`, `-O3` e libDaisy 8.1.0, con il core risolto da una checkout DaisyExamples esterna. Il firmware richiede il Daisy bootloader. Gli effetti sono elencati esplicitamente nel Makefile e il main usa 262144 campioni SDRAM per chorus/delay più 8192 per il riverbero.

Il front-end analogico usa LM324 e NE570 con compressore/espansore, trim separati per ingresso, ADC, DAC e uscita, più bypass hardware. Le quattro schede hanno sorgenti Eagle in archivi ZIP e schemi; il progetto preferisce componenti through-hole e collegamenti configurabili tramite jumper.

**Perché vale l’esame**

Il punto forte non è un singolo algoritmo, ma la separazione fra catena DSP comandabile, transport/protocollo, memoria di preset sul device esterno, controllo wireless e analog front-end. È un riferimento utile per un pedale multi-effetto dove il motore audio deve restare deterministico mentre UI e storage evolvono separatamente.

**Adattamento per Custom Pedals / Daisy Field**

Riutilizzare lo schema comando → shadow state → chain update per il Multi-Delay, ma applicare i cambi di routing fuori dal callback e introdurre una coda lock-free o double-buffered. Su Daisy Field si può prototipare soltanto il livello DSP/protocollo sostituendo completamente BSP, codec, GPIO e UI. **Non esiste evidenza di build Field**, quindi non si afferma compatibilità.

**Caveat**

- Licenza repository **CC0-1.0**, ma le dipendenze esterne conservano le proprie licenze.
- Nessun tag/release binaria e nessun log di CI o build riproducibile trovato.
- Gli archivi hardware contengono sorgenti Eagle, ma non è stato trovato un pacchetto Gerber/BOM consolidato né misure THD+N, rumore, crosstalk o latenza.
- La documentazione dichiara bassa latenza, ma il block size effettivo non è fissato dal Makefile e non sono pubblicate misure.
- Il percorso relativo di libDaisy richiede una struttura di checkout precisa; il bundle non è stato compilato o flashato in questa esecuzione.

## HOLD / non ripetuti

- **mcbronkowitch/fireflow** — commit del 2026-10-03 valida il coupon della scansione pannello e corregge rotazioni CPL in anteprima JLC. È progresso hardware reale, ma il progetto è già stato segnalato il 2026-09-30 e il full Rev-A audio/control board non risulta ancora fabbricato e acceso: delta insufficiente per una ripetizione entro 30 giorni.
- **t-dsp/t-dsp_software** — nessun commit dopo `8b25477` del 2026-10-02 già segnalato; nessun nuovo delta.
- **CHOMPI, hvcc, TouchVink, alchemy-sdk, TeensyAudio-rs** — nessun commit/release successivo al rispettivo stato già registrato.
- **bkshepherd/DaisySeedProjects** — release indicizzate, ma HEAD resta al 2026-09-27; nessun evento fresco 2–4 ottobre.
- **PJRC/Teensy forum e PaulStoffregen/Audio** — nessuna nuova release/progetto verificabile nel periodo; le pagine indicizzate erano thread o repository precedenti.

## Audit di scoperta

- Profilo: `daily_broad`.
- Data run: 2026-10-04 Europe/Zurich; cutoff 30 giorni: 2026-09-04; overlap fresco dal 2026-10-02.
- Exa: **156 risultati restituiti** in 12 query distinte: forum Daisy, forum PJRC, GitHub Daisy, GitHub Teensy, host alternativi/non-GitHub, Daisy Field, fondazioni e recheck mirati.
- Domini/classi coperti: community.daisy.audio e forum.pjrc.com; GitHub release/commit/repository; hermeticmodular.com; Hackaday e blog tecnici; GitLab/Codeberg/SourceHut e mirror/indici come discovery lead.
- Pool candidati >10. Dopo la prima scoperta qualificata sono proseguite quattro query mirate; nessun terzo candidato ha superato data, sorgente e anti-repeat.
- Date di GSP e Capicola verificate su post, release e commit primari; nessuna data di indicizzazione è stata usata come data dell’evento.
- Exa Search e Fetch hanno risposto senza errore di autenticazione o rate limit.

## Miglioramento per il prossimo run

- Trattare Capicola come repeat-block fino al 2026-11-03 salvo nuova release/materiale target.
- Ricontrollare GSP soltanto per una release binaria/tag, istruzioni build riproducibili, Gerber/BOM o misure audio.
- Ricontrollare FireFlow alla prima alimentazione e prova audio del Rev-A completo, non per ulteriori export/preflight.
- Continuare a distinguere release pubbliche da semplici commit datati e da reply recenti su thread vecchi.

Questionario omesso perché questa è un’esecuzione schedulata non interattiva.
