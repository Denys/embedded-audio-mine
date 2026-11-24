# Daisy & Teensy Watch — 2026-11-24

## Executive summary

Un solo aggiornamento supera la soglia: **bobpuley/ds-ide 0.27.4 — REF_PASS (repeat materiale)**. Dopo la preview macOS pubblicata il 17 novembre, Daisy Seed IDE aggiunge Windows x64 e corregge contratti real-time che influenzano direttamente la validità dei test DSP host-side: dimensione esatta del callback, telemetria concorrente, sostituzione WAV, replay e riconfigurazione audio. Nessun progetto PJRC/Teensy ha prodotto nel periodo un evento canonico nuovo con licenza e riuso sufficienti.

## Previous questionnaire feedback applied

None recorded.

## Pre-flight / discovery audit

- **Data locale:** 2026-11-24 (Europe/Zurich); cutoff 30 giorni: 2026-10-25; overlap dal 2026-11-23.
- **Profilo:** daily_broad.
- **Stato letto:** README, AGENTS, regole v0.3/hidden-gems/anti-repeat, published/selected/common index, source registry, prompt state, digest Daisy/Teensy del 2026-11-23, stato Codex weekly e portable weekly.
- **Ricerca:** 120 risultati Exa in 12 query separate (forum Daisy, forum PJRC, GitHub, host alternativi, project host, DSP/delay e foundation) più 120 risultati da sei ricerche commit GitHub e fetch primari mirati.
- **Forum:** l’evento tecnico nuovo è l’annuncio Windows di Daisy Seed IDE del 23 novembre. L’attività OndaKit è un reply su invito Discord, non una release. Le pagine PJRC recenti non hanno fornito un nuovo commit/release canonico qualificante.
- **Stop rule:** forum, forge, host alternativi e foundation coperti; due batch indipendenti non hanno aggiunto altri candidati promuovibili.

## Ranked entry

### 1. bobpuley/ds-ide 0.27.4 — REF_PASS · developer tooling / repeat materiale

**Che cosa è cambiato e data verificata.** Il package.json su main dichiara **0.27.4** e il commit finale [4cdf535](https://github.com/bobpuley/ds-ide/commit/4cdf535d79fb0f39f2f679369c9bed7d2b37d3c9) è del **2026-11-23 17:28:45 UTC**. L’autore ha annunciato la prima preview Windows sul [forum Daisy](https://community.daisy.audio/t/daisy-seed-ide-a-vs-code-extension-to-run-debug-and-flash-daisy-effects-first-public-preview/9967) il **2026-11-23 17:54 UTC**; il workflow “Publish to Marketplace” risulta completato con successo lo stesso giorno. Le versioni 0.27.2–0.27.4 sono tutte datate 23 novembre.

**Perché il repeat entro 30 giorni è ammesso.** Il record del 17 novembre copriva la preview 0.25.0 macOS-arm64. Il blocker canonico ammetteva esplicitamente Windows o un delta importante di modellazione/streaming. Ora arrivano entrambi: pacchetto win32-x64, backend WASAPI/WinMM e correzioni che cambiano la fedeltà temporale e la sicurezza concorrente dell’emulatore.

**Implementazione.**

- Windows 10/11 x64: clang/MinGW, IPC TCP loopback, WASAPI via RtAudio, debugger lldb-dap, MIDI WinMM e VSIX separati per macOS ARM64 e Windows x64. Il toolchain gestito scarica llvm-mingw, CMake e Ninja con controllo SHA-256.
- [6613a6d](https://github.com/bobpuley/ds-ide/commit/6613a6dfa68bcce556330d4ed26e16dd9483d2c6) inserisce un BlockAdapter non allocante: l’audio callback dell’effetto riceve sempre il SetAudioBlockSize() configurato, indipendentemente dal buffer host.
- [86a4094](https://github.com/bobpuley/ds-ide/commit/86a4094d14255ffba07263ee693970b12e35a6df) rende LED/RGB latest-state atomici e MIDI una coda MPSC bounded, utilizzabile da callback e main loop.
- [dbfdb37](https://github.com/bobpuley/ds-ide/commit/dbfdb375bee74993ba0c75b123356598340ef5d4), [2578de8](https://github.com/bobpuley/ds-ide/commit/2578de8ab5027636f0506290d0236584b741c735) e [1a6a6df](https://github.com/bobpuley/ds-ide/commit/1a6a6df5d1ed348c4808a91ecd413adef4b48c04) chiudono race su WAV/replay e riconfigurazione audio/shutdown; sono presenti stress test TSAN/ASAN e test IPC→engine.

**Hardware / misure.** Il README riporta, sul PC Windows provato dall’autore, **0 xrun** e circa **12–16 ms** in WASAPI shared mode. Il percorso hardware resta Makefile libDaisy + ARM GNU + dfu-util; Build & Flash su Windows e il MIDI bridge con controller fisico non sono ancora verificati.

**Perché vale la pena esaminarlo.** Per **Custom Pedals Multi-Delay** è un banco host utile per verificare LFO, envelope, debounce e delay-line con la stessa granularità di callback configurata sul firmware. Replay deterministico, sostituzione WAV sicura e coda MIDI/LED concorrente sono riferimenti direttamente riusabili per test e telemetria.

**Adattamento Daisy Field.** Usarlo come infrastruttura di test, aggiungendo un target Field e la relativa mappa controlli/pin solo dopo verifica del compatibility layer. Il repository è orientato a Daisy Seed e **non** fornisce una build Field: nessuna compatibilità Field viene dichiarata.

**Caveat.** PolyForm Shield 1.0.0; preview; Linux/Intel Mac non supportati; non cycle-accurate e incapace di qualificare budget CPU/RAM STM32; audio host non bit-exact; flashing Windows e MIDI fisico ancora da validare.

**Fonti primarie:** [repository](https://github.com/bobpuley/ds-ide) · [package 0.27.4](https://github.com/bobpuley/ds-ide/blob/4cdf535d79fb0f39f2f679369c9bed7d2b37d3c9/package.json) · [changelog](https://github.com/bobpuley/ds-ide/blob/4cdf535d79fb0f39f2f679369c9bed7d2b37d3c9/CHANGELOG.md) · [workflow runs](https://github.com/bobpuley/ds-ide/actions) · [Marketplace](https://marketplace.visualstudio.com/items?itemName=daisy-ide.ds-ide) · [license](https://github.com/bobpuley/ds-ide/blob/4cdf535d79fb0f39f2f679369c9bed7d2b37d3c9/LICENSE)

## HOLD / esclusi

- **BIM4GIB/GhettoRack v13.17:** v13.16 aggiunge slot da 16 s e blocchi di riserva, v13.17 corregge lo stop del bridge e documenta prove Wi-Fi multi-browser sul rig; resta HOLD perché il repository non ha una licenza di progetto.
- **dylangmiles/daisy-tone-trixter:** i commit del 23 novembre correggono reamp RxFIFO/no-WET, raddoppiano il ring USB input e aggiungono gain CH-B/watchdog/fault capture; l’assenza di licenza resta bloccante.
- **slabcloud/reverb [924eb54](https://github.com/slabcloud/reverb/commit/924eb5438e1239e6329bcc2ff18a7ce5522bb41b):** nuovo pedal DSP Daisy Seed 3 + ESP32-S3 con sorgenti estese, ma nessuna licenza di progetto e diritti del sample vocal integrato non documentati.
- **OndaKit:** il reply del 23 novembre segnala soltanto un invito Discord non valido; nessuna nuova versione, sorgente o evidenza di build datata.
- **PJRC Audio Projects:** i thread correnti sono supporto/reply; nessun evento firmware o hardware canonico successivo all’ultima scansione è stato verificato.

## Prompt-improvement delta

Nel prossimo run: controllare prima licenze e release asset dei tre HOLD recenti; per gli emulatori host, promuovere soltanto delta che cambiano i contratti temporali/concorrenti o aggiungono una piattaforma realmente pubblicata.
