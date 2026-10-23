# Daisy + Teensy Watch — 2026-10-23

## Sintesi

Tre aggiornamenti superano verifica primaria e anti-repeat:

1. **ampactor-labs/sonido — STRONG_PASS** — commit `d46d4c3` del 2026-10-22: misure complete dei 36 kernel su Daisy Seed, budget real-time nel pedale Hothouse e correzioni DSP udibili.
2. **smartin77/BroTracker — PASS** — commit `64a3898` del 2026-10-21: synth realtime a otto canali su Teensy 4.1, storage fisso, eventi sample-accurate e verifica hardware.
3. **deemonoise/D-TRK — REF_PASS** — commit `b4f3cf4` del 2026-10-22: otto scene, morph A/B e handoff atomico verso l'audio task; è ESP32-S3, quindi entra solo come architettura adattabile.

`sonido` è un repeat entro 30 giorni rispetto alla storia Codex del 2026-09-30. Il delta è materiale: misure M7/Hothouse nuove, protezione del budget della callback, nuova tabella costi completa e correzioni ADAA/parametri che cambiano il comportamento audio e il valore di riuso.

## Previous questionnaire feedback applied

Nessuna risposta esplicita è registrata (`explicit_questionnaire_answers: {}`). Non sono state inferite preferenze dal silenzio; restano invariati gate di evidenza, anti-repeat e priorità Daisy/Teensy.

## Pre-flight / discovery audit

- Data Europe/Zurich: **2026-10-23**; cutoff 30 giorni: **2026-09-23**; overlap dal **2026-10-21** rispetto all'ultimo scan riuscito del 2026-10-22.
- La PR #30 del run precedente è stata revisionata senza rilievi, mergiata e verificata su `main` al commit `cd20737c6950770c92fedcb5f338ce40d86d4c3a`.
- Ispezionati README, AGENTS, regole v0.3, protocollo hidden-gems, policy anti-repeat, publication/selected/common trackers, source registry, stato prompt, digest del 22 ottobre e storia Codex pertinente.
- Profilo `daily_broad`: **20 query Exa** su 6 famiglie indipendenti, fino a **194 slot** più un batch di 9 fetch primari. Nessun errore di connessione o rate limit.
- Corsie distinte: Daisy Community, PJRC Audio Projects, GitHub Daisy, GitHub Teensy, recheck mirati, GitLab/Codeberg/SourceHut/Hackaday.
- Classi di fonte: forum/category, repository, commit/diff, build config, test, licenza, check-run e documentazione hardware.
- Shortlist approfondita: Sonido, BroTracker, D-TRK, OpenIFW-fm1, daisy-rs, DaisySeedProjects e MicroDexed-touch; tre promossi.
- Date di reply/indice forum usate solo come discovery. Gli eventi pubblicati derivano da commit primari datati.
- Stop condition: i pass mirati Daisy forum, PJRC, GitHub Teensy e forge alternative non hanno prodotto altri candidati con data, licenza, build e delta materiale verificabili.

## 1. ampactor-labs/sonido — Daisy pedal profiling and real-time budget guards — STRONG_PASS

### Evento verificato e delta anti-repeat

- [Commit d46d4c3](https://github.com/ampactor-labs/sonido/commit/d46d4c3ab9cf553b45e1c0045db7f1ed209c8aa9), **2026-10-22 13:43 UTC**, +29.307/-23.044 su 230 file.
- [README tecnico](https://github.com/ampactor-labs/sonido/blob/d46d4c3ab9cf553b45e1c0045db7f1ed209c8aa9/README.md) e [guida embedded](https://github.com/ampactor-labs/sonido/blob/d46d4c3ab9cf553b45e1c0045db7f1ed209c8aa9/docs/EMBEDDED.md).
- Licenza **AGPL-3.0-or-later** o commerciale per integrazione closed-source.

### Cosa è cambiato

- Il benchmark DWT ora copre tutti i **36 kernel** su Daisy Seed a 480 MHz, 48 kHz e blocchi da 32 campioni. Ogni kernel rientra singolarmente nel budget; il riverbero pesa 53% medio/55% worst.
- La catena pedal più pesante misurata, reverb + distortion + bitcrusher, occupa 72,6% del budget kernel; il pedale completo nel Hothouse misura **78% medio e 89% peak**, senza callback oltre deadline.
- `sonido_pedal` limita le tail quando il carico supera 70% e salta durante lo scrolling gli effetti oltre 85%, evitando circa tre secondi di overruns che prima seguivano ogni cambio con riverbero.
- Le antiderivate ADAA di soft-clip e tape sono state corrette: il margine del segnale quieto passa da 16–27 dB ad almeno 93 dB sopra il rumore numerico. Aggiunti test e golden aggiornati.
- La stessa architettura kernel/parametri alimenta plugin CLAP/VST3, editor a grafo e firmware; delay, reverb e chorus usano heap SDRAM, mentre callback e control buffer restano separati.

### Perché vale l'esame / Multi-Delay

È un riferimento raro che unisce DSP portabile, grafo di effetti, tabella costi M7 e guardie operative della UI. Per il Multi-Delay, riuserei la strategia di costo per nodo e un admission controller: calcolare il costo worst-case di ogni tap/filtro/modulatore e impedire combinazioni che superano una soglia, lasciando margine per UI, MIDI e storage.

Sul Daisy Field la prova corretta è un adapter dedicato, non una dichiarazione di compatibilità: due/tre tap in SDRAM, meter DWT per callback, soglie 70/85% e test di cambio preset sotto carico.

### Caveat

- Il firmware ARM è escluso dalla CI e viene verificato manualmente su Seed/Hothouse.
- Nessun target Daisy Field o asset firmware nuovo.
- Il patch loader QSPI compila ma il firmware shipping non esegue ancora un rig esportato dall'editor.
- AGPL forte: per un pedale proprietario serve licenza commerciale.

## 2. smartin77/BroTracker — fixed-storage Teensy synth foundation — PASS

### Evento verificato

- [Commit 64a3898](https://github.com/smartin77/BroTracker/commit/64a3898d8b11ebf7babf8b2f4860ef1721bdc010), **2026-10-21 19:46 UTC**, +830/-91.
- [Contratto DSP e validazione](https://github.com/smartin77/BroTracker/blob/64a3898d8b11ebf7babf8b2f4860ef1721bdc010/docs/SYNTH_FOUNDATION.md).
- [Build/flash PlatformIO](https://github.com/smartin77/BroTracker/blob/64a3898d8b11ebf7babf8b2f4860ef1721bdc010/platformio.ini): `pio run -e teensy41_dev -t upload`.
- GPL-3.0-or-later; check `build-and-test` riuscito.

### Implementazione

- Sostituisce il beeper con un synth sinusoidale realtime su **otto canali monofonici**, usando storage fisso, nessuna allocazione/file I/O/lock nel renderer.
- Conserva eventi sample-accurate e note MIDI-compatible: A=440 Hz al valore 69.
- Envelope smoothstep: 15 ms attack, decadimento totale di un secondo, 15 ms NOTE OFF.
- Retrigger o sostituzione Sample↔Synth usa un handover limitato a **88 campioni / 1,995 ms** a 44,1 kHz, catturando l'ultimo valore PCM per evitare discontinuità.
- Validazione: 304 casi core, 30 control/protocol, nove SD, 36 casi output/IRQ, sei build firmware; firmware caricato su Teensy 4.1 e handshake USB bridge START/STOP verificato.

### Perché vale l'esame / Multi-Delay

Il pattern utile è il renderer bounded: comandi ordinati con offset nel blocco, storage fisso per voce e transizioni anti-click con durata esatta. Sul Field può diventare un harness per variazioni sample-accurate di delay time/tap state, mantenendo massimo numero di eventi per blocco e testando l'indipendenza dal block size.

### Hardware / caveat

- Target reale Teensy 4.1; output USB bridge o PT8211. Il progetto è ancora proof-of-concept.
- Non c'è release binaria e restano aperti rapid-retrigger e ascolto manuale completo.
- Il mix di sample forti e otto voci può saturare: la documentazione non ridefinisce la policy di gain.
- L'adattamento Field richiede un backend audio separato; nessuna compatibilità Field dichiarata.

## 3. deemonoise/D-TRK — atomic scene morphing for an embedded audio task — REF_PASS

### Evento verificato

- [Commit b4f3cf4](https://github.com/deemonoise/D-TRK/commit/b4f3cf43698068c2a0fa001580a9d42ead8e61b1), **2026-10-22 12:10 UTC**.
- [Repository/build](https://github.com/deemonoise/D-TRK/blob/b4f3cf43698068c2a0fa001580a9d42ead8e61b1/README.md): PlatformIO USB/OTA e test native.
- [Test delle scene](https://github.com/deemonoise/D-TRK/blob/b4f3cf43698068c2a0fa001580a9d42ead8e61b1/test/test_scene/test_main.cpp).
- Firmware GPL-3.0-only; enclosure/wiring CERN-OHL-S-2.0; tre check CodeQL riusciti.

### Implementazione

- Otto scene memorizzano lock di traccia/master; un crossfader A/B calcola i valori efficaci, lasciando bit-identico il parametro base quando entrambe le scene non lo sovrascrivono.
- I parametri continui interpolano; quelli discreti cambiano alla soglia 64.
- `syncSceneLive()` pubblica prima i valori e poi le mask con fence release, così l'audio task non vede una mask nuova associata a dati vecchi.
- Il firmware è un tracker a 16 tracce con synth, sampler, delay/reverb e SD; build con `pio run -e wt32 -t upload`, test core con `pio test -e native`.

### Perché vale l'esame / Multi-Delay

Per Multi-Delay è una buona base concettuale per scene A/B di tap, mix, pan, feedback e filtri. Sul Field conviene tradurre le scene in snapshot immutabili prevalidati e pubblicare un indice/versione atomico; i cambi discreti vanno gestiti con crossfade o state handover, non con il semplice threshold usato qui.

### Caveat

- È **ESP32-S3**, non Daisy o Teensy; entra solo come REF_PASS adiacente.
- Il commit non fornisce misure di callback o prova hardware specifica della nuova funzione.
- La protezione mostrata è una pubblicazione a due fasi con fence, non uno snapshot atomicamente copiato; il port va verificato rispetto al modello di memoria STM32.
- Nessuna compatibilità Daisy Field dichiarata.

## HOLD / esclusioni principali

- **rcell233/OpenIFW-fm1** — ottimizzazioni DSP e pacchetti release candidate nell'overlap, ma target/hardware e riproducibilità audio fisica restano meno chiari dei tre promossi; hardware root cause dichiarata non confermata.
- **twitzelbos/daisy-rs** — ambiente Rust Daisy interessante, ma nessun evento materiale datato nell'overlap verificato.
- **bkshepherd/DaisySeedProjects** — commit NAM/IR emersi dalla ricerca, ma il repository è bloccato fino al 2026-11-10 e non è stato verificato un delta sufficiente oltre il recente recall/MIDI.
- **MicroDexed-touch / Codeberg** — nessun nuovo delta firmware primario verificato nel periodo.
- **Daisy/PJRC forum** — nuove activity date e video/tutorial non costituiscono release firmware; nessun ulteriore artefatto qualificante.
- **Daisypatcher v0.5.5** — correzioni a tre disegni di board, non un delta audio/DSP o target firmware materiale.

## Analysed resources

- Daisy Community Projects & Examples e Latest; thread recenti trattati come lead.
- PJRC Audio Projects, indice/forum e pagine progetto correlate; URL canonici cercati direttamente.
- GitHub commit/release search datata per Daisy/Seed/DSP e Teensy/AudioStream.
- Primary source approfondito: Sonido, BroTracker, D-TRK; recheck OpenIFW-fm1, daisy-rs, DaisySeedProjects, MicroDexed-touch e Daisypatcher.
- Alternative host/project pages: Codeberg, GitLab, SourceHut, Hackaday e pagine personali emerse.
- Stato interno: publication log, selected-projects, common index, registry, prompt state, digest recenti e storia Codex.

## Tracker updates

- `data/published-repo-log.csv`: tre righe ranked.
- `data/common-anti-repeat-index.csv`: tre nuovi record hard; Sonido conserva anche il precedente record Codex.
- `data/hidden-gems-source-registry.csv`: tre repository aggiunti e Daisy/PJRC revalidati.
- `data/prompt-evolution-state.yaml`: avanzato al 2026-10-23 con hold e search debt.
- `data/selected-projects.csv`: nessuna modifica; i tre elementi restano monitorati dai record pubblicati.

## Prompt improvement for next run

- Bloccare Sonido e BroTracker fino al 2026-11-22 salvo release, target o misure materiali; D-TRK solo dopo una prova hardware/callback o un cambio architetturale.
- Cercare release/asset successivi ai commit sorgente e verificare se Sonido porta il build ARM in CI.
- Sul PJRC forum recuperare URL di thread diretti da titoli/ID, senza usare l'indice come prova.
- Nei progetti adiacenti richiedere sempre una mappa di adattamento concreta verso Field o Teensy; non promuovere genericamente architetture desktop.

## Interactive Feedback / Tuning Questionnaire

Rispondere, se utile, con codici come `Q1=B Q2=A`; il silenzio non modifica le regole.

- **Q1 — Direzione:** A continua; B più build/benchmark; C più novità; D più hardware.
- **Q2 — Target:** A Daisy; B Teensy; C MCU adiacenti; D bilanciato.
- **Q3 — Repeat:** A solo release; B architettura misurata; C algoritmo sorgente; D vietati.
- **Q4 — Evidenza:** A sorgente+build+licenza; B aggiungere CI; C richiedere misura hardware; D REF_PASS con caveat.
- **Q5 — Multi-Delay:** A delay/feedback; B preset/UI; C I/O/clock; D scheduling/memoria.
- **Q6 — Fonti:** A Daisy forum; B PJRC; C GitLab/Codeberg/SourceHut; D pagine personali.
- **Q7 — Output:** A più conciso; B invariato; C più diff/test; D più hardware.
