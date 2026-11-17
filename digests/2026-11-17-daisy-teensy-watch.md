# Daisy + Teensy Watch — 2026-11-17

## Executive summary

Quattro voci superano la soglia: **Ninety-Days/DaisyPodUsbAudio — STRONG_PASS**, **Rastapopolix/andamento-fw — PASS (repeat materiale)**, **myklemykle/tweacman — REF_PASS** e **bobpuley/ds-ide — REF_PASS**. La prima offre un trasporto USB audio/MIDI flashabile e misurato; Andamento aggiunge un vero motore Plaits e corregge il budget DTCM; le altre due sono riferimenti adiacenti con forte valore di riuso. Nessuna prova compatibilità Daisy Field.

## Pre-flight / discovery audit

- Data Europe/Zurich: **2026-11-17**; cutoff anti-repeat: **2026-10-18**; overlap: **2026-11-16–2026-11-17**, dall'ultimo scan riuscito del 16 novembre.
- Verificati README, AGENTS, regole v0.3/hidden-gems/common anti-repeat, registri published/selected/common, source registry, digest Daisy/Teensy del 16 novembre e history Codex settimanale disponibile.
- Discovery: **181 risultati Exa richiesti** su angoli distinti Daisy forum, PJRC Audio Projects, GitHub, release/commit, host alternativi e pagine progetto; ulteriore verifica primaria su repository, release, file build, licenze e commit.
- Date di indice e reply usate solo per discovery. DaisyPodUsbAudio è stato annunciato il 16 novembre, ma il firmware pubblicato è la release del 28 ottobre.
- Andamento ricade nella finestra: entra soltanto per i commit materiali 85cc7f7 e d4ee427, con blocco ripetizione azzerato al 17 dicembre.

## Ranked entries

### 1. Ninety-Days/DaisyPodUsbAudio — STRONG_PASS

**Evento verificato:** nuovo annuncio Daisy Community del **2026-11-16 18:21 UTC**. La release firmware resta **2026-10-28**, tag omonimo al commit e565316, con ZIP flashabile, binario e licenze; il successivo commit 8fbce4 del 9 novembre corregge solo la frequenza CPU nella documentazione e non viene contato come release.

**Che cosa offre:** Daisy Pod come UAC1 bidirezionale 2-in/2-out, 24 bit/48 kHz, più USB MIDI, driverless su Windows/macOS/Linux. Il confine di clock usa resampler frazionario Q16, sinc windowed 32 tap × 128 fasi, ring buffer con controllo proporzionale del fill e pacchetti invarianti da 48 frame.

**Evidenza:** test duplex di 160 s senza underrun, overrun o deviazioni di packet size. Il clock osservato passa da circa 242 ppm stock a 59 ppm con patch PLL3; margine minimo da 102 frame/2,1 ms a 273 frame/5,7 ms. Errore interpolatore a 10 kHz: sinc −97,2 dB contro −24,5 dB Catmull-Rom e −13,7 dB lineare.

**Build, hardware e licenza:** Makefile arm-none-eabi-gcc con libDaisy separata; Web Programmer per il binario. Codice originale MIT, USB ST sotto SLA0044, HAL BSD-3 e CMSIS Apache. UAC1 fisso a 48 kHz perché Seed usa USB full-speed. Sul Pod Rev5 l'uscita cuffie mostra un tono di modulazione d'alimentazione; LINE OUT e ritorno registrato risultano puliti secondo le misure dell'autore.

**Perché conta / Multi-Delay:** è una base rara per esporre il pedale come insert hardware DAW, con MIDI di controllo, reamping e diagnostica clock/ring. Per Daisy Field il piano è portare transport, drift correction e soak test al BSP/codec/USB del Field, non assumere compatibilità.

**Caveat:** target Pod, non Field; 48 kHz fisso; la patch PLL3 è opzionale e va verificata con read_sai_clock.py; licenza composita ST.

**Fonti:** [annuncio](https://community.daisy.audio/t/daisy-pod-as-a-class-compliant-usb-audio-midi-interface-firmware-with-source-and-dsp-demos/9968) · [repository](https://github.com/Ninety-Days/DaisyPodUsbAudio) · [release 2026-10-28](https://github.com/Ninety-Days/DaisyPodUsbAudio/releases/tag/2026-10-28) · [clocking](https://github.com/Ninety-Days/DaisyPodUsbAudio/blob/main/docs/CLOCKING.md) · [interpolazione](https://github.com/Ninety-Days/DaisyPodUsbAudio/blob/main/docs/INTERPOLATION.md)

### 2. Rastapopolix/andamento-fw — PASS · repeat materiale

**Evento e delta anti-repeat:** dopo la pubblicazione del 16 novembre, [85cc7f7](https://github.com/Rastapopolix/andamento-fw/commit/85cc7f7a746afe4269198972dd1daf0558927007) del **2026-11-16 08:58 UTC** abilita Plaits nel target Daisy e aggiunge le regole di build per Plaits/stmlib; [d4ee427](https://github.com/Rastapopolix/andamento-fw/commit/d4ee42718517cf959284407cd43ee0ee44552293) del **13:45 UTC** sposta un audio arena da 20 KiB da DTCM ad AXI SRAM quando lo stato a otto tracce supera il budget. È un nuovo motore di sintesi più un cambiamento di memoria reale, non attività cosmetica.

**Implementazione:** MELODEE_PLAITS=1, regola C/C++ dedicata, workaround del conflitto TEST introdotto dal forced include libDaisy e -fno-math-errno. La QSPI cresce da 474.520 a 504.036 byte; ITCM resta stabile. Il linker/memcheck riporta DTCM a circa 84,8 KiB sotto il limite di 96 KiB.

**Build e hardware:** GPL-3.0-only, Make/libDaisy. Il progetto dichiara ancora “no hardware yet”; SPI/shift register, UART MIDI, DAC e gate contengono stub. Nessun asset release o target Field.

**Perché conta / Multi-Delay:** mostra come integrare un motore Mutable complesso senza rompere il budget delle memorie veloci e come separare stato, arena audio e codice QSPI. Sul Field il test utile è riprodurre le sezioni linker, portare un solo voice path e profilare callback, cache e SDRAM prima di integrarlo nel grafo Multi-Delay.

**Fonti:** [repository](https://github.com/Rastapopolix/andamento-fw) · [commit Plaits](https://github.com/Rastapopolix/andamento-fw/commit/85cc7f7a746afe4269198972dd1daf0558927007) · [commit memoria](https://github.com/Rastapopolix/andamento-fw/commit/d4ee42718517cf959284407cd43ee0ee44552293) · [build Daisy](https://github.com/Rastapopolix/andamento-fw/tree/main/platform/daisy)

### 3. myklemykle/tweacman — REF_PASS · piattaforma adiacente

**Evento verificato:** pagina Hackster pubblicata il **2026-11-16**; nello stesso giorno [a4fc290](https://github.com/myklemykle/tweacman/commit/a4fc290d) aggiunge stato errore corretto, timeout, contatori e validator byte-per-byte per SD, mentre [edcf0ff](https://github.com/myklemykle/tweacman/commit/edcf0ffb) allinea schema/BOM al filtro d'uscita costruito.

**Implementazione e hardware:** scrub WAV 0,001×–1024× avanti/indietro, pitch e speed indipendenti, echo, HP/LP, cache decimate anti-alias, WebBLE e due encoder assoluti RV112FF. Driver SD misurato da 2,2 a 18,5 MB/s. Due unità costruite e usate dal vivo secondo l'autore; KiCad 4 layer e OpenSCAD presenti. RA6M5 con DAC stereo interno a 12 bit.

**Licenze:** librerie LGPL-3.0+, software GPL-3.0+, hardware CERN-OHL-S-2.0 e documentazione CC-BY-SA.

**Perché conta / Multi-Delay:** riuso diretto di cache multi-rate, burn-in SD, gestione timeout, scrub tattile e validazione del filtro d'uscita. Su Field vanno sostituiti DAC/BSP e misurati SD/cache/audio; non esiste un port Field.

**Caveat:** piattaforma adiacente, uscita medium-fi 12 bit, nessun live input, nessuna release binaria.

**Fonti:** [pagina progetto](https://www.hackster.io/myklemykle/tweacman-a-sample-scrubber-31f50a) · [repository](https://github.com/myklemykle/tweacman) · [firmware](https://github.com/myklemykle/tweacman/tree/main/SDResampleDemo) · [hardware](https://github.com/myklemykle/tweacman/tree/main/hardware)

### 4. bobpuley/ds-ide 0.25.0 — REF_PASS · strumento adiacente

**Evento verificato:** primo preview pubblico annunciato il **2026-11-16 15:52 UTC**; versione 0.25.0/tag al commit 6efffb70, con pubblicazione Marketplace al commit 7b5368c6. Non c'è una GitHub Release.

**Implementazione:** esegue sul Mac il normale callback libDaisy tramite compatibility layer; offre scope, waveform/spectrum, peak/RMS, clip/denormal/underrun, controlli virtuali, MIDI, OLED, SD, wiring editor con conflitti pin e debugger. Cinque esempi includono tremolo/filtro e synth MIDI. Lo stesso progetto può poi passare al Makefile hardware e DFU.

**Licenza e limiti:** PolyForm Shield 1.0.0; gli effetti creati possono essere venduti, ma il riuso per un IDE concorrente è limitato. Solo macOS Apple Silicon; non è cycle-accurate e non valida CPU/RAM o equivalenza bit-exact.

**Perché conta / Multi-Delay:** abbrevia i test funzionali di callback, controlli, MIDI, storage e mapping pin prima della prova reale. Per il Field serve un backend esplicito e il profiling resta obbligatorio; il progetto è Seed-only.

**Fonti:** [annuncio](https://community.daisy.audio/t/daisy-seed-ide-a-vs-code-extension-to-run-debug-and-flash-daisy-effects-first-public-preview/9967) · [repository](https://github.com/bobpuley/ds-ide) · [README](https://github.com/bobpuley/ds-ide/blob/main/README.md) · [licenza](https://github.com/bobpuley/ds-ide/blob/main/LICENSE)

## HOLD / esclusi

- **HotPTgz/Limoncello:** commit del 16 novembre consegna firmware Teensy 4.1, KiCad/Gerber/BOM, enclosure e app Pi 5, ma il sistema completo non è stato costruito; solo la scheda test a quattro tasti è in fabbricazione e l'audio gira sul Pi. HOLD fino a prova fisica audio/UI/control.
- **PJRC Audio Projects:** nessun nuovo thread ha portato un evento canonico post-overlap con sorgente o release sufficiente.
- **wsjk vocal-fx-processor:** resta un piano senza firmware audio-capable, licenza root o prova callback.
- **libDaisy:** nessun aggiornamento foundation corrente nel periodo; l'attività ufficiale non sostituisce le voci community.

## Tracker updates

- Hard block al **2026-12-17** per tutte e quattro le voci; Andamento documenta il delta materiale che autorizza il repeat.
- DaisyPodUsbAudio entra anche in selected come riferimento eccezionale per clock-domain USB audio misurato e flashabile.
- Rigenerati indice comune, source registry e prompt state.

## Prompt improvement for next run

- Distinguere sempre data dell'annuncio community dalla data effettiva di release/commit.
- Per USB audio richiedere invarianti di packet size, gestione drift, soak test e licenze vendor separate.
- Per strumenti host classificare il valore come reference finché non modellano timing e risorse del target.
