# Daisy & Teensy Watch — 2026-11-25

## Executive summary

Un solo progetto supera la soglia: **tone-3000/t3k-diy-pedal — STRONG_PASS**. Il lancio pubblico del **24 novembre 2026** espone nello stesso repository firmware Daisy Seed3, binario flashabile, app WebUSB, DSP NAM A2-Lite con budget misurati e hardware completo KiCad/Gerber/BOM/enclosure sotto MIT. Nessun nuovo progetto Teensy 4.x ha prodotto nel periodo un evento canonico con pari evidenza; GhettoRack ha un delta real-time materiale ma resta HOLD per licenza assente e binario non aggiornato.

## Previous questionnaire feedback applied

None recorded.

## Pre-flight / discovery audit

- **Data locale:** 2026-11-25 (Europe/Zurich); cutoff 30 giorni: 2026-10-26; overlap dal 2026-11-24.
- **Profilo:** `daily_broad`.
- **Stato letto:** README, AGENTS, regole v0.3/hidden-gems/anti-repeat/feedback, published/selected/common index, registry, prompt state, digest Daisy/Teensy del 2026-11-24 e cronologie Codex/portable weekly.
- **Ricerca:** 120 risultati Exa in 12 query distinte più 120 risultati da sei ricerche commit GitHub; angoli separati per forum Daisy, forum PJRC, GitHub, host alternativi, pagine progetto, foundation e delay/looper.
- **Copertura:** community.daisy.audio, forum.pjrc.com, GitHub, tone3000.com, daisy.audio, Tayda, Hackaday/Hackster e ricerche mirate Codeberg/GitLab/SourceHut; forum, repository, project/build pages, release assets e hardware artifacts.
- **Candidate pool:** TONE3000 DIY Pedal, GhettoRack, daisy-tone-trixter, slabcloud/reverb, OndaKit, ds-ide, PZD, LILLA, PJRC/Teensyduino, libDaisy e vari thread PJRC recenti. Solo il primo supera insieme data, licenza, build/flash e riuso.
- **Stop rule:** due batch indipendenti successivi al candidato qualificante non hanno aggiunto un secondo progetto promuovibile; le attività PJRC recenti erano supporto, annunci foundation o progetti già bloccati.

## Ranked entry

### 1. tone-3000/t3k-diy-pedal — STRONG_PASS · firmware + open hardware

**Che cosa è cambiato e data verificata.** TONE3000 ha pubblicato il kit e il relativo [annuncio Daisy forum](https://community.daisy.audio/t/tone3000-x-daisy-diy-pedal-kit/9996) il **2026-11-24 17:13 UTC**. Il merge del kit [8f548cd](https://github.com/tone-3000/t3k-diy-pedal/commit/8f548cde4a99879b3e6604007200650dfa0c88ed) e la correzione BOM finale [488ffed](https://github.com/tone-3000/t3k-diy-pedal/commit/488ffedc870593c2f957895bee6e03cd3b456b8e) sono entrati su main il 24 novembre. La release [v0.0.1](https://github.com/tone-3000/t3k-diy-pedal/releases/tag/v0.0.1), pubblicata il 13 novembre, contiene `t3k_pedal.bin` da **148,9 KB**; il lancio rende ora pubblico il percorso completo kit → flash → preset.

**Implementazione.**

- Daisy Seed3 / STM32H750 a 480 MHz, 48 kHz e blocchi da 48 frame; firmware `BOOT_QSPI` compilabile con libDaisy e toolchain ARM.
- Quattro preset in una regione QSPI separata dal firmware. Ogni preset usa un A2-Lite, oppure due modelli in serie, oppure A2-Lite + cabinet IR.
- Codice caldo A2, convolver e FFT in ITCM; istanze/catture e tabelle veloci in DTCM; ring e spettri in AXI SRAM.
- Convoluzione zero-latency non uniforme da 4096 tap: blocchi interni da 16 campioni, partizioni 16×16 + 30×128, tre chiamate per callback.
- Budget dichiarato e misurato sul Seed3, zero overrun: circa **42%** per un A2-Lite, **54%** per A2-Lite + IR, **83%** per due A2-Lite.
- L’app companion costruisce e scrive preset e installa bootloader + firmware via WebUSB; il workflow CI ricompila ogni push e allega il BIN ai tag `v*`.

**Hardware / elettronica.** Repository MIT con KiCad 10 nativo, schematico, PCB quattro layer through-hole, Gerber/Excellon, BOM con riferimenti, enclosure 1590XX, drill/print files e modelli CAD. L’I/O è mono, con buffer TL072, trimmer analogico, alimentazione 9 V center-negative, sei potenziometri, footswitch momentaneo e selettore a quattro posizioni.

**Perché vale la pena esaminarlo.** È raro trovare inferenza neurale misurata, gestione memoria STM32, asset flashabile, aggiornamento browser e hardware fabbricabile nello stesso progetto permissivo. Per **Custom Pedals Multi-Delay** sono direttamente riusabili la separazione firmware/preset QSPI, il provisioning WebUSB, il layout ITCM/DTCM/AXI e il convolver partizionato come riferimento per IR, multitap o code lunghe.

**Adattamento Daisy Field.** Usare Field solo come target di prova: estrarre DSP, preset bank e install path in una build Field separata, mappare controlli e I/O Field, poi misurare callback, RAM/flash, aliasing, click e carico con più delay line. Il repository è Seed3/pedal-specifico e **non** contiene un target Field; nessuna compatibilità Field viene dichiarata.

**Caveat.** Nessuna misura indipendente o analyzer-grade; la cartella hardware dichiara che le immagini pubblicate sono render. Il README segnala che il TL072 a singola alimentazione 5 V può clipparsi circa 3 dB prima del full-scale del codec e che il trimmer è dopo il buffer, quindi non lo protegge. La tabella del build guide menziona ancora 256 tap mentre sorgente e README correnti implementano 4096: prevale il codice, ma la documentazione va riallineata.

**Fonti primarie:** [repository](https://github.com/tone-3000/t3k-diy-pedal) · [release v0.0.1](https://github.com/tone-3000/t3k-diy-pedal/releases/tag/v0.0.1) · [build guide](https://www.tone3000.com/guides/diy-pedal) · [hardware source](https://github.com/tone-3000/t3k-diy-pedal/tree/main/hardware) · [license](https://github.com/tone-3000/t3k-diy-pedal/blob/main/LICENSE) · [annuncio](https://www.tone3000.com/blog/tone3000-daisy-diy-pedal-kit)

## HOLD / esclusi

- **BIM4GIB/GhettoRack [c06ee1c](https://github.com/BIM4GIB/GhettoRack/commit/c06ee1c4f9d8f37ccf7d33ba74c81fd47554bd6a):** abbassa la priorità delle IRQ SAI; il rig dell’autore passa da circa 3% di audio USB perso a 90 s / 76% CPU / 48.012 frame/s senza pacchetti saltati. Resta HOLD: licenza assente, fix non presente nel BIN rilasciato e lockup a pieno overload irrisolto.
- **dylangmiles/daisy-tone-trixter** e **slabcloud/reverb:** nessuna nuova licenza; i blocker di riuso restano invariati.
- **OndaKit:** nessuna versione, sorgente o prova di build nuova nel periodo.
- **PJRC/Teensy:** Teensyduino 1.62 è foundation e non ha prodotto un progetto community qualificante; i thread Audio Projects recenti erano supporto o resurfacing.
- **ds-ide 0.27.4 e PZD v4.0.5–v4.0.7:** già pubblicati rispettivamente il 24 e il 23 novembre; nessun delta post-alert verificato.

## Tracker updates

- Published: `tone-3000/t3k-diy-pedal`, repeat bloccato fino al 2026-12-25 salvo delta materiale.
- Selected reference: aggiunto perché l’integrazione DSP + WebUSB + hardware completo è un’ancora eccezionale.
- Registry: aggiunti forum topic, build guide e repository; aggiornato GhettoRack con il commit IRQ e i blocker residui.

## Prompt-improvement delta

Nel prossimo run: cercare prima release/binari successivi al lancio TONE3000 e una prova fisica indipendente; sui progetti HOLD, trattare misure real-time come promozione possibile solo dopo licenza esplicita e asset rilasciato.
