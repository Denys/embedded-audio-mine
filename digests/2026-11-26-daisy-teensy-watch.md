# Daisy & Teensy Watch — 2026-11-26

## Executive summary

Un solo aggiornamento supera la soglia: **smartin77/BroTracker — PASS**. Dopo la pubblicazione del 23 ottobre, il progetto Teensy 4.1 è passato da un synth proof-of-concept a un tracker con sample instrument streaming; il commit canonico **e59ebf4 del 2026-11-25 23:23 UTC** aggiunge root note e fine tune persistenti, applicazione per-trigger, compatibilità delle sessioni e validazione fisica Windows + Teensy. Non emerge un nuovo progetto Daisy qualificante: SoundStudio contiene soltanto un piano hardware; GhettoRack resta HOLD nonostante il BIN v13.31 e nuove prove sul rig, perché manca una licenza esplicita e rimangono fault aperti.

## Previous questionnaire feedback applied

None recorded.

## Pre-flight / discovery audit

- **Data locale:** 2026-11-26 (Europe/Zurich); cutoff 30 giorni: 2026-10-27; overlap dal 2026-11-25.
- **Profilo:** `daily_broad`.
- **Stato letto:** README, AGENTS, regole v0.3/hidden-gems/anti-repeat/feedback, prompt state, registry, published/selected/common index, digest Daisy/Teensy del 25 novembre e cronologie Codex/portable pertinenti. Il main verificato prima della patch era `fc11d8b`.
- **Ricerca:** 24 chiamate Exa su 12 angoli distinti (240 slot, inclusa la ripetizione tecnica delle query per acquisire il testo restituito) più 120 risultati da sei ricerche commit GitHub.
- **Copertura:** forum Daisy Projects ed Examples, PJRC Audio Projects e thread correlati, GitHub, Codeberg/GitLab/SourceHut, pagine personali/progetto, foundation e delay/looper.
- **Candidate pool:** BroTracker, SoundStudio, GhettoRack, TONE3000, daisy-tone-trixter, slabcloud/reverb, ds-ide, PZD e aggiornamenti foundation.
- **Stop rule:** due batch indipendenti dopo BroTracker non hanno prodotto un secondo progetto con data canonica, licenza, build/flash e delta riusabile verificabili.

## Ranked entry

### 1. smartin77/BroTracker — PASS · Teensy 4.1 tracker / sampler

**Che cosa è cambiato e data verificata.** Dal precedente alert sul synth fixed-storage (commit `64a3898`, 21 ottobre), BroTracker ha aggiunto un percorso Sample Instrument streaming e un terminale separato per Windows/ArkOS. Il delta canonico nell’overlap è [e59ebf4](https://github.com/smartin77/BroTracker/commit/e59ebf45250cdd760f53eb08dae092ac10251c83), committato il **2026-11-25 23:23 UTC**: aggiunge Root Note C-0…G-8 e Fine Tune 0…99 cent, persistenza nelle sessioni BTM v5/v6, migrazione delle versioni 1–4, rollback Keep/Cancel e applicazione alle sole nuove note. Il commit dichiara build firmware Teensy e BTX riuscite e una prova fisica Windows + Teensy di edit, rollback, riavvio/persistenza e stabilità della waveform.

**Implementazione.**

- Teensy 4.1 come motore real-time a 44,1 kHz; firmware PlatformIO in `firmware/teensy`, core/test host separati e terminali Windows/ArkOS.
- Sample streaming a memoria fissa con voci e ring buffer; pitch step in Q32.32 composto da sample-rate ratio, intervallo di nota e `2^(cents/1200)`.
- Il tuning viene catturato al trigger: le voci già attive conservano pitch/rate, evitando mutazioni retroattive nel callback.
- Il browser ascolta il WAV alla velocità originale; il parametro dell’instrumento entra solo nel renderer normale.
- Sessioni versionate e CRC: v5 senza lineage, v6 con lineage; record Sample esteso con root/fine tune e default retrocompatibile C-3/00.
- Test coprono centesimi a 22.050/44.100 Hz con tolleranza Q32.32, migrazione sessioni, persistenza, edit live, rifiuto/rollback, UI e accelerazione del fine tune.
- Il commit [aabe4c4](https://github.com/smartin77/BroTracker/commit/aabe4c46252fef656e61889452b3eb2f5e559191) dello stesso giorno aggiunge anche lo swap stereo configurabile sui percorsi USB bridge, PT8211 e Audio Shield.

**Hardware / elettronica.** Il target è esplicitamente Teensy 4.1; l’uscita supporta USB bridge, PT8211 e Teensy Audio Shield. Il repository fornisce build/upload PlatformIO e pacchetti terminale con SHA-256, ma non presenta una nuova scheda hardware custom né una release GitHub. Licenza **GPL-3.0-or-later**.

**Perché vale la pena esaminarlo.** Il valore non è soltanto il controllo pitch: commit e test mostrano un confine riusabile fra UI/seriale, sessioni persistenti e stato audio deterministico. Per **Custom Pedals Multi-Delay** sono interessanti il principio “parametro catturato al trigger”, i record versionati con migrazione/CRC, il protocollo capability/ack/rollback e la cache waveform separata dal percorso audio; lo stesso schema può governare tap, head, rate o scene senza cambiare in corsa una coda già attiva.

**Adattamento Daisy Field.** Usare Field esclusivamente come target di prova: estrarre renderer sample, snapshot per-trigger e codec sessione in una build libDaisy dedicata, sostituire I/O Teensy/seriale, assegnare SDRAM e misurare callback, SD throughput, click e worst-case polyphony. Il repository non contiene build o prova Field e non viene dichiarata compatibilità.

**Caveat.** Nessuna release/binario firmware GitHub; il progetto si dichiara ancora early proof-of-concept. La prova fisica riguarda Windows BTX + Teensy, mentre R36H/ArkOS resta aperto. Non sono pubblicati budget CPU/RAM o misure audio analyzer-grade per il nuovo sampler; il fine tune è soltanto positivo 0…99 cent e l’interpolazione resta lineare.

**Fonti primarie:** [repository](https://github.com/smartin77/BroTracker) · [commit e59ebf4](https://github.com/smartin77/BroTracker/commit/e59ebf45250cdd760f53eb08dae092ac10251c83) · [firmware Teensy](https://github.com/smartin77/BroTracker/tree/master/firmware/teensy) · [documentazione Sample](https://github.com/smartin77/BroTracker/blob/master/docs/SAMPLE_FORMAT.md) · [licenza](https://github.com/smartin77/BroTracker/blob/master/LICENSE)

## HOLD / esclusi

- **BIM4GIB/GhettoRack:** [v13.31 / 634cb33](https://github.com/BIM4GIB/GhettoRack/commit/634cb33a0f71160deee371cd9e1e89ee9d5e5782) aggiorna il BIN con un demo set e prova su Seed/Pi; [07621a7](https://github.com/BIM4GIB/GhettoRack/commit/07621a7d4d58fc3ede392efd47b5b699006418e9) misura SD e pass-through. Resta HOLD: nessuna licenza repository, hot-insert SD fallisce, il main loop si è fermato una volta e il salvataggio può sovrascrivere uno slot senza conferma.
- **rmg61/SoundStudio:** commit iniziale del 25 novembre con DSP browser e BOM/note per un mockup Daisy Seed; nessun firmware, build embedded o hardware verificato.
- **tone-3000/t3k-diy-pedal:** `f11d98a` cambia soltanto il footprint 78L05 per la saldatura; è un delta hardware cosmetico/minore entro il blocco fino al 25 dicembre.
- **daisy-tone-trixter** e **slabcloud/reverb:** nessuna nuova licenza; blocker invariati.
- **PZD, ds-ide e foundation:** nessun delta post-alert che cambi il valore di riuso.

## Tracker updates

- Published: aggiornato `smartin77/BroTracker`; nuovo blocco fino al 2026-12-26 salvo release/binario, nuovo backend DSP/instrument, nuova scheda/target o misura fisica/real-time materiale.
- Selected reference: invariato; questo è un repeat materiale, non una nuova eccezione da aggiungere.
- Registry/common index/prompt state: riallineati alla revisione `e59ebf4` e ai blocker correnti di GhettoRack.

## Prompt-improvement delta

Nel prossimo run, separare i delta “sample UI/storage” dai delta realmente audio: promuovere BroTracker di nuovo solo con release, nuovo motore/effetto, misure CPU/RAM/audio o validazione fisica ArkOS; su GhettoRack la licenza resta il primo gate, prima di qualsiasi ulteriore feature.
