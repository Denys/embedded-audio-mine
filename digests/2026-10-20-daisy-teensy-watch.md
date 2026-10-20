# Daisy + Teensy Watch — 2026-10-20

## Executive summary
Tre elementi qualificano il monitor: due progetti community e un aggiornamento di infrastruttura Daisy con test su hardware. Nessuna compatibilità Daisy Field è dichiarata senza build sul target.

## Previous questionnaire feedback applied
none recorded; nessuna preferenza è stata dedotta dal silenzio.

## Pre-flight / discovery audit
- Data Europe/Zurich: 2026-10-20; cutoff 30 giorni: 2026-09-20; ultimo scan: 2026-10-17; overlap: 2026-10-14–2026-10-20.
- Ispezionati README, AGENTS, regole v0.3, hidden-gems, anti-repeat, feedback loop, prompt state, source registry, publication log, selected projects, common index, digest 17 ottobre e Codex weekly history.
- Pool: 18 candidati; Daisy Projects/Software, PJRC Audio Projects, GitHub release/commit, Codeberg, Hackaday e forum indipendenti. Almeno 8 domini non GitHub.
- Revalidate le pagine Daisy/PJRC; nuove pagine primarie per Squatch DSP, DSPi, libDaisy fix thread e MicroDexed-touch.
- Blocchi: fetch PJRC categoria restituisce l'indice generale; Codeberg blocca README/commit con pagina anti-bot. Exa operativo, nessun rate limit/errore di connessione.
- Common index: quattro selected-reference canonici mancanti e status/note obsoleti; viene rigenerato dalle fonti canoniche.

## Ranked entries

### 1. Squatch DSP / NAM A2-Lite su Daisy Seed3 — PASS
Post Daisy Community 2026-10-19; commit firmware/benchmark [9c4c2406e6](https://github.com/Squatch-Stack/squatch-dsp/commit/9c4c2406e63a9391fadeaaf831f4b24091090caf), 17 ottobre 23:55 UTC. MIT. La release host [v0.2.2](https://github.com/Squatch-Stack/squatch-dsp/releases/tag/v0.2.2) è del 16 ottobre; il commit Seed3 è successivo al tag, quindi il firmware Seed3 non è dimostrato nel tarball della release.
- C++17: `Block`, `Arena`, `ParamQueue` SPSC, smoothing, gate/drive/limiter/EQ/cabinet convolution e NAM A2-Lite.
- Seed3 STM32H750 480 MHz, 48 kHz/32 campioni: 148.656 cicli/blocco, 46,5% CPU per NAM; catena gate+drive+NAM+limiter 66,4% media / 69,3% worst senza callback in ritardo; ESR −123,9 dB vs float64 e 4.800 campioni bit-identici al baseline sul board.
- Build: `hosts/daisy/fetch-libdaisy`, poi `make -C hosts/daisy -j4`; flash DFU con lo script in `hosts/daisy/tools/flash.py`. Toolchain misurata GCC 15.3.1; catena al 98% dei 128 KB di flash interna. Nessun binario Seed3 pronto, una sola scheda/compiler, nessun build Field.
- Per Multi-Delay: riusare il contratto `Block`, allocazione fuori callback, coda parametri e profiling; portare un DelayBlock al Field con adapter e misure separati.
- Fonti: [forum](https://community.daisy.audio/t/neural-amp-modeler-a2-lite-in-real-time-on-a-daisy-seed-3-46-5-of-the-cpu-measurements-and-mit-firmware/9865), [repo](https://github.com/Squatch-Stack/squatch-dsp), [benchmark](https://github.com/Squatch-Stack/squatch-dsp/blob/main/docs/benchmarks/daisy-seed3.md).

### 2. DSPi v1.1.6-beta5 — REF_PASS
Release [v1.1.6-beta5](https://github.com/WeebLabs/DSPi/releases/tag/v1.1.6-beta5), 2026-10-17 02:22:47 UTC; UF2 539,5 KB RP2040 e 608,0 KB RP2350; GPL-3.0, sorgenti C/C++ e build CMake/Pico SDK.
- Soft VCXO per slave clock; S/PDIF RX con stima sample-rate su finestre lunghe e ring buffer; ring separati per ogni uscita S/PDIF/I2S; USB input 4 canali/24 bit su RP2350; feedback USB su finestra lunga; BMC S/PDIF in PIO; fix limiter e pin/preset.
- `usb_audio_ring.h`: SPSC a quattro slot fra ISR USB e DSP con `__dmb()`; `usb_feedback_controller.c`: servo fixed-point rate/fill. Fino a 4 canali output RP2040 e 8 RP2350; I2S richiede DAC esterno. Delay di allineamento fino a 85 ms, non multi-tap musicale.
- Per Multi-Delay: riferimento per clock drift, ring buffer, fill telemetry e loopback/recording; non portare driver PIO RP. Non è target Daisy/Teensy.
- Fonti: [release](https://github.com/WeebLabs/DSPi/releases/tag/v1.1.6-beta5), [repo/build](https://github.com/WeebLabs/DSPi), [ring](https://github.com/WeebLabs/DSPi/blob/v1.1.6-beta5/firmware/DSPi/usb_audio_ring.h).

### 3. Fix community libDaisy — FOUNDATION_UPDATE
Thread 13 ottobre; fork MIT, non upstream. Callback pointer reso volatile e scritto prima del DMA: [commit daf9c300](https://github.com/a7v7/libDaisy/commit/daf9c300b7ef2f8e44d57f9ac8141cbc5c1f2b01), 8 ottobre. Fix job SPI TX-only/RX-only [ff3559d9](https://github.com/a7v7/libDaisy/commit/ff3559d9cd7621c141e5e04ee4a29ef5dd33d905) e compiler barrier nei wait loop SPI/I2C/UART [44ecbfb9](https://github.com/a7v7/libDaisy/commit/44ecbfb9a5f6cbab540676e1338e0644a71b4615), entrambi 13 ottobre. Test [031ba778](https://github.com/a7v7/libDaisy/commit/031ba778db930afc331141b2ec669479f745b72e) su Daisy Seed: con GCC 15.2, CMake Release -O3/LTO, tre SPI DMA consecutivi danno callback A su stock, A,C con il primo fix, A,B,C con entrambi. Valore: bug real-time silenziosi; caveat: branch community, nessuna PR upstream corrispondente trovata. Testare su hardware prima dell'adozione.
- Fonti: [thread](https://community.daisy.audio/t/audio-callback-silently-lost-with-cmake-lto-steady-tone-instead-of-audio-cause-and-fix/9846), [test SPI](https://github.com/a7v7/libDaisy/tree/spi-dma-queue-test/tools/spi_dma_queue_test).

## HOLD / watchlist
- MicroDexed-touch 1.9.973-2 (Codeberg, 16 ottobre): HEX per Teensy 4.1, ma il delta visibile è “ambient garden #2”; commit non ispezionabile per anti-bot. Non promuovere senza delta firmware verificato. Teensy 4.1, PCM5102A, display touch ILI9341 e PSRAM; MicroDexed GPL-3.0, msfa Apache-2.0.
- PJRC FFT Musical Light Show (15 ottobre): Teensy 4.0, Audio Shield, FFT 1024 bin e 240 WS2812 via DMA, ma sorgenti/licenza/build non verificati.
- PJRC USB multichannel: repo ultimo commit 2026-05-20; reply recenti non sono delta firmware. Nuova tastiera MIDI contactless vista nel listing, ma URL e sorgenti non verificati.
- Daisy plugdata sampler/SDRAM: help thread senza sorgente/build nuovo. Hoopi Pedal: log OTA del 21 marzo, nessun delta. Seed3 Dev Kits: inventory aggiornata, nessuna revisione hardware nuova verificata.
- PZD v2.5.0, Wish/Beads v1.0.0 e Floret/UAC2 già alertati il 17 ottobre; nessun delta successivo, hold fino al 16 novembre salvo nuova release/target/feature/test.

## Analysed resources
Daisy Projects/Software/Latest; PJRC Audio Projects/forum index e blog; GitHub release/commit/source; Codeberg MicroDexed-touch; Hackaday.io Hoopi; Discourse Zynthian; Foros de Electrónica. 18 candidati; nessun altro ha superato data, sorgenti/flash path e valore di adattamento.

## Tracker updates
Tre righe publication log e tre riferimenti selezionati/infra; common index rigenerato dai tracker canonici e dalla storia Codex weekly; registry aggiornato. Persistenza completa solo dopo merge e verifica di main.

## Prompt improvement for next run
- Migliorato: benchmark Seed3 legato a commit/toolchain/build/DFU; DSPi verificato da timestamp, asset e sorgenti.
- Debole: fetch PJRC restituisce home; Codeberg blocca commit/README; libDaisy fix non upstream.
- Espandere URL diretti PJRC, Codeberg diff, Hackaday, GitLab/SourceHut. Nessuna regola dura modificata; anti-repeat e gate primario invariati.
- Recheck: Squatch/DSPi non ripetere prima del 19 novembre senza delta; libDaisy solo su PR/merge upstream o nuova prova; PZD/Wish/Floret hold fino al 16 novembre; recuperare URL diretto PJRC.

## Feedback / Tuning Questionnaire
Nessuna risposta precedente registrata; il silenzio non viene interpretato.
- Q1 Direzione: A conciso (max 3–4 voci); B più build/benchmark (test riproducibili); C più novità (penalizzare progetti ovvi); D più ampiezza (pool 20).
- Q2 Target: A Daisy (boost Seed/Field/Patch/Pod); B Teensy (boost 4.x); C MCU adiacenti (RP2040/RP2350/ESP32); D bilanciato.
- Q3 Evidenza: A sorgente+build; B anche misure; C release asset; D tutti gli artefatti primari pertinenti.
- Q4 Multi-Delay: A delay/granular; B profiling/memoria/latency; C UI/MIDI; D audio I/O/clock.
- Q5 Repeat: A hard 30 giorni; B override solo con delta materiale; C backfill importante nell'overlap; D più conservativo.
- Q6 Fonti: A forum Daisy/PJRC; B Codeberg/GitLab/SourceHut/Hackaday; C GitHub release/commit; D blog/manuali personali. Ogni scelta modifica il peso del prossimo scan.
