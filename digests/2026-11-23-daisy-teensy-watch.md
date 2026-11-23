# Daisy & Teensy Watch — 2026-11-23

## Executive summary

Un solo aggiornamento supera la soglia: **Peteranthony1st/PZD-Daisy-Pod-Groovebox v4.0.5–v4.0.7 — STRONG_PASS (repeat materiale)**. Dopo l’alert del 16 novembre, il firmware aggiunge sidechain ducking, sedici performance FX sul master bus e due release flashabili; è quindi un delta DSP/audio-graph verificato, non attività generica. Nessun nuovo progetto PJRC/Teensy ha superato i gate di licenza, data e riuso.

## Previous questionnaire feedback applied

None recorded.

## Pre-flight / discovery audit

- **Data locale:** 2026-11-23 (Europe/Zurich); cutoff 30 giorni: 2026-10-24; overlap dal 2026-11-22.
- **Profilo:** `daily_broad`.
- **Stato letto:** README, AGENTS, regole v0.3/hidden-gems/anti-repeat, published/selected/common index, registry, prompt state, digest 2026-11-21 e cronologie weekly recenti.
- **Ricerca:** 120 risultati Exa in 12 query distinte (forum Daisy, forum PJRC, GitHub commit/release, host alternativi, foundation) più 120 risultati da sei ricerche commit GitHub e fetch primari mirati.
- **Esito forum:** il thread PZD ha condotto alle release canoniche; nessun nuovo evento tecnico PJRC datato nel periodo utile.
- **Host alternativi:** Codeberg/Hackaday/Hackster/pagine personali non hanno prodotto un evento canonico nuovo verificabile nel periodo.
- **Stop rule:** coperti forum, forge, alternative host e foundation; i lead tecnici recenti sono stati verificati fino a licenza, build, hardware e delta.

## Ranked entry

### 1. Peteranthony1st/PZD-Daisy-Pod-Groovebox v4.0.5–v4.0.7 — STRONG_PASS · repeat materiale

**Che cosa è cambiato e data verificata.** Il commit [`fa19674`](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/fa19674957aa825663fa88a1c3d23e03837924f7) del **2026-11-21 18:26:50 UTC** aggiunge `Global:Duck`, con sorgente selezionabile e ducking applicabile ai canali del mixer. Il commit [`91c2a41`](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/91c2a4123e6b8b941cc64c3c246cf212f777112d) del **2026-11-21 20:44:17 UTC** porta la release [v4.0.6](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v4.0.6), con sedici Live FX sul master bus. [v4.0.7](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v4.0.7), commit [`8cc3f58`](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/8cc3f58145900e842ffaf15519598864ae2d09e1), è pubblicata il **2026-11-22 07:56:43 UTC** e corregge la semantica dei knob/list selector e del pickup rapido.

**Perché il repeat entro 30 giorni è ammesso.** L’ultimo record del 16 novembre riguardava Supersaw, mixer e ottimizzazioni. Il nuovo delta aggiunge due sottosistemi audio riusabili: sidechain e una macchina di performance FX tempo-sincrona. Il [compare v4.0.3…v4.0.7](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v4.0.3...v4.0.7) contiene cinque commit e, tra gli altri, i nuovi `src/duck.h` e `src/live_fx.h`.

**Implementazione.** `LiveFx` mantiene un ring stereo int16 in SDRAM, congela la registrazione per repeat/reverse, avvia l’effetto sul successivo sedicesimo, usa fade-in da 3 ms e fade-out da 5 ms e persiste effetto/parametri nella Performance. I sedici algoritmi comprendono repeat, stutter/fade/drop, reverse, tape stop, scratch, sweep LP/HP, crush, gate e throw. La build resta libDaisy `BOOT_QSPI`, linker con sezione ITCM, `-O3 -ffast-math -flto`.

**Hardware e flash.** Target documentato: Daisy Pod con OLED I²C e microSD. Entrambe le release includono `main.bin` (~1.2 MB), bootloader v6.4, template SD e manuali. Il percorso è: installazione una tantum del bootloader via web programmer, poi copia di `main.bin` sulla SD e power-cycle.

**Perché vale la pena esaminarlo.** È un riferimento concreto per separare gesto/UI, scheduling musicale e DSP sample-local. Per **Custom Pedals Multi-Delay**, le parti più interessanti sono ring condiviso, quantizzazione dell’ingaggio, crossfade anti-click, throw/reverse/tape-stop e persistenza dei parametri.

**Adattamento Daisy Field.** Usare Field solo come target di prova: estrarre `LiveFx` e una sorgente di clock indipendente dalla UI Pod, mappare A-row/B-row e knob secondo il controllo Field, quindi verificare linker/memoria, callback budget, aliasing e click. Il repository **non** contiene una build Field, quindi non viene dichiarata compatibilità.

**Caveat.** PolyForm Noncommercial 1.0.0 (uso commerciale del firmware richiede accordo); release dichiarata “active testing”; nessuna misura indipendente del worst-case con tutti gli engine e Live FX; UI e storage sono Pod-specifici.

**Fonti primarie:** [repository](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox) · [release v4.0.6](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v4.0.6) · [release v4.0.7](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v4.0.7) · [Live FX source](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/8cc3f58145900e842ffaf15519598864ae2d09e1/src/live_fx.h) · [license](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/8cc3f58145900e842ffaf15519598864ae2d09e1/LICENSE)

## HOLD / esclusi

- **dylangmiles/daisy-tone-trixter [`74896d6`](https://github.com/dylangmiles/daisy-tone-trixter/commit/74896d6a6d94a8127f5ce82dbdaeeb097668c7ec):** UAC2 passa da quattro a cinque canali e il banco conferma enumerazione/registrazione, ma manca ancora una licenza esplicita; inoltre CH-B wet è per ora uguale al dry e il reamp con RxFIFO ridotto resta da riprovare.
- **BIM4GIB/GhettoRack [`2e66dd7`](https://github.com/BIM4GIB/GhettoRack/commit/2e66dd7176bf7b5798b9b756e5327c8e1d4093f4):** OLED via DMA elimina stall dichiarati da 52 ms e aggiunge controllo remoto, ma il repository appena pubblicato non ha licenza.
- **anguslmm/pocket-groove:** il bench on-device e le varianti ITCM sono tecnicamente materiali, ma il blocker di licenza resta irrisolto.
- **PZD v4.0.7 isolata:** il solo miglioramento knob/pickup non avrebbe superato la soglia; è incluso perché accompagna il nuovo sottosistema DSP di v4.0.6 e gli asset aggiornati.

## Prompt-improvement delta

Per il prossimo run: cercare esplicitamente “new license” sui HOLD ad alta qualità e separare le release UI-only dalle release che accompagnano un delta DSP già verificato.
