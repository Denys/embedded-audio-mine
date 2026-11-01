# Daisy + Teensy Watch — 2026-11-01

## Esito

1. **nzimas/Bigorna build 79/80 — REF_PASS** — repeat materiale dopo build 69: subtrack persistenti per le tracce DRUM, stato sequencer/mix/send per lane, loop con identità di subtrack e sidechain selezionabile per subtrack.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano invariati hard anti-repeat, priorità a progetti community con artefatti primari e Daisy Field come target di riferimento senza compatibilità presunta.

## Finestra e metodo

- Data Europe/Zurich: **2026-11-01**; cutoff anti-repeat 30 giorni: **2026-10-02**; overlap: **2026-10-29–2026-11-01**, dall'ultimo scan riuscito del 2026-10-31.
- Profilo: `daily_broad`. Exa: **22 query / 200 risultati richiesti**, più fetch primari e GitHub API; nessun errore di connessione o rate limit.
- Angoli distinti: Daisy Community Projects/Examples/Latest/Software; PJRC Audio Projects, related thread e Blog Project Submission; GitHub release/commit; GitLab, Codeberg, SourceHut, Hackaday, altstrument e pagine personali.
- Le date degli indici e delle reply sono state usate solo per discovery. Il finding è ancorato a commit, compare, package manifest, sorgenti, test, build scripts e licenza.
- Bigorna era bloccato fino al 2026-11-24. Il repeat è ammesso perché builds 79/80 introducono una nuova gerarchia runtime/persistenza e routing audio-control, non un aggiornamento cosmetico.

## Finding qualificato

### 1. Bigorna build 79/80 — REF_PASS

**Eventi verificati:** [build 79, commit `4e5a875`](https://github.com/nzimas/bigorna/commit/4e5a875c89938f1e19d854062a28ba28f3642332) del **2026-10-31 07:37:42 UTC**; [build 80, commit `345d1c5`](https://github.com/nzimas/bigorna/commit/345d1c59fa266adc41882c45053e77caa73a0d25) del **2026-10-31 07:52:45 UTC**; package pubblicato dal commit [`1c6a61d`](https://github.com/nzimas/bigorna/commit/1c6a61dfbd2995bd88b471bd78c755371618f03f) alle **08:02:27 UTC**.

Il [compare dal build 69](https://github.com/nzimas/bigorna/compare/8cc680de4a8b0836f73c49ad9759dd5a5c4e7212...1c6a61dfbd2995bd88b471bd78c755371618f03f) contiene 22 commit. Le modifiche runtime più rilevanti sono in `tracks.c` (+378/−193), `projects.c` (+464/−243), `ui.c` (+689/−258) e nell'host harness (+767/−210).

**Che cosa cambia**

- Una traccia DRUM può avere subtrack **ST-A…ST-D**. Ogni lane conserva suono, step, lunghezza, clock, direzione, phrase, ottava, trasposizione, level, pan, send e MANGLE.
- Le tre lane aggiuntive sono una risorsa condivisa: possono essere assegnate tutte a una traccia oppure distribuite fra più tracce.
- Pattern e sessioni persistono rispettivamente step/impostazioni e suono/level/pan delle subtrack. Il looper registra anche l'identità della subtrack di ogni nota.
- Build 80 rende la sorgente del sidechain una singola subtrack, con selezione `T1-A…T1-D`, fallback al kick della traccia e migrazione delle sessioni build 79 o precedenti.
- Sessioni, pattern e loop precedenti continuano a caricarsi senza subtrack. L'host test aggiunge il caso `subtrk` accanto a test per pattern, loop, progetti, DSP e backup.

**Build/flash, licenza e hardware**

- Il browser installer espone `bigorna.fwsc` build 80: **609.992 byte**, SHA-256 `fcbde8f7acb65565e045db00386bfb28f7c4271fca76dd46c0298ea9910b2eb8`.
- Percorso sorgente: `./setup.sh`, poi `./build.sh` o `./install.sh`; richiede toolchain JieLi/AC79 SDK e Docker. I test host non richiedono FM-1.
- Firmware **GPL-3.0-only**; font SIL OFL 1.1; file SDK AC79 letti dal checkout esterno e dichiarati Apache-2.0.
- Target: **M-VAVE FM-1 / AC791N**, con il secondo core dedicato a metà voci ed effetti; USB audio class-compliant stereo 16-bit/44,1 kHz. Non sono pubblicati file hardware aperti.
- L'installazione è non ufficiale e comporta rischio di brick; sono documentati rescue e recovery.

**Perché vale la pena**

Il valore non è il nuovo suono ma la separazione fra track e lane: una risorsa secondaria diventa una voce sequenziabile e persistente senza duplicare tutte le strutture top-level. La migrazione conserva i dati precedenti e il sidechain passa da una somma generica a una sorgente audio semanticamente precisa.

**Adattamento proposto**

Per **Custom Pedals Multi-Delay**, modellare ogni tap come una lane con tempo, feedback, filtro, pan, send, modulazione e automazioni proprie, mentre mute, MIDI e sidechain restano proprietà del gruppo. Un pool limitato di lane extra permette tap “estesi” senza dimensionare ogni preset al worst case. Salvare l'identità del tap in eventi/loop e migrare i preset vecchi con default espliciti. Su **Daisy Field** serve un'implementazione nativa: snapshot immutabili o publication fence nel callback, buffer delay in SDRAM, adapter BSP/UI e misure di callback/latency; Bigorna non fornisce codice o compatibilità Field.

**Caveat**

- È un riferimento adiacente, non Daisy/Teensy, e non contiene hardware aperto.
- Non è una release taggata; l'artefatto è pubblicato dal sito con manifest e SHA-256.
- Nessuna misura hardware nuova di CPU, jitter o latenza accompagna le subtrack.
- Il compare include anche lavoro sul sito; il delta qualificante è nei sorgenti firmware, persistenza e test host.
- Flash non ufficiale con rischio di brick.

## Candidati trattenuti o esclusi

- **Daisy Community:** nessun nuovo thread Projects dopo il 29 ottobre. Il portable speaker/synth è una condivisione senza sorgente/build verificabile; il thread SITL/HITL è del 2 marzo e ha solo una reply recente.
- **PZD e Mirth:** nessun commit successivo alle release già pubblicate v3.5.3 e Mirth v1.1.0.
- **PJRC Audio Projects:** il contactless MIDI keyboard compare nell'indice, ma Exa non ha recuperato URL canonico, repository, build o licenza; l'attività resta discovery-only. Il thread USB multicanale non mostra un nuovo commit/release post-scan.
- **willbearfruits/daisypatcher:** progetto Daisy tecnicamente interessante ma fermo al push del 19 agosto e alla release v0.5.6 del 18 agosto; escluso come scoperta stale.
- **Host alternativi:** nessun evento Daisy/Teensy post-scan ha superato insieme novità, build, licenza e anti-repeat.

## Persistenza

- `data/published-repo-log.csv`: Bigorna aggiornato a build 79/80; nuova eleggibilità **2026-12-01**.
- `data/common-anti-repeat-index.csv`: record derivato rigenerato.
- `data/hidden-gems-source-registry.csv`: repository Bigorna aggiornato e changelog primario aggiunto.
- `data/prompt-evolution-state.yaml`: finestra, recheck queue e search debt aggiornati.
- `data/selected-projects.csv`: invariato; update materiale di un riferimento adiacente già noto.

## Link primari

- [Repository](https://github.com/nzimas/bigorna)
- [Changelog](https://nzimas.github.io/bigorna/changelog.html)
- [Commit build 79](https://github.com/nzimas/bigorna/commit/4e5a875c89938f1e19d854062a28ba28f3642332)
- [Commit build 80](https://github.com/nzimas/bigorna/commit/345d1c59fa266adc41882c45053e77caa73a0d25)
- [Package build 80](https://nzimas.github.io/bigorna/install.html)
- [Compare dal build 69](https://github.com/nzimas/bigorna/compare/8cc680de4a8b0836f73c49ad9759dd5a5c4e7212...1c6a61dfbd2995bd88b471bd78c755371618f03f)
- [Licensing](https://github.com/nzimas/bigorna/blob/1c6a61dfbd2995bd88b471bd78c755371618f03f/LICENSING.md)
- [Host tests](https://github.com/nzimas/bigorna/blob/1c6a61dfbd2995bd88b471bd78c755371618f03f/tests/run_tests.sh)

## Prompt improvement for next run

- **Migliorato:** il confronto diretto dal commit già pubblicato ha separato build firmware sostanziali da commit solo sito/logo.
- **Debole:** PJRC continua a esporre titoli e reply senza URL/artefatti canonici affidabili.
- **Regola proposta, ancora temporanea:** per progetti ad alta frequenza senza tag, richiedere insieme diff runtime, compatibilità dati/test e artefatto installabile con hash.
- **Recheck:** Bigorna bloccato fino al 2026-12-01 salvo nuovo engine, misure hardware o altro cambio architetturale maggiore.
- **Delta compatto:** `runtime diff + persistence migration + host test + hashed package; index date never equals firmware date`.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze. Risposta compatta possibile: `Q1=B Q2=A Q3=D Q4=B Q5=A Q6=B`.

- **Q1 — Direzione:** A continua così; B più verifica dei diff; C soglia novità più alta; D più finding quando reggono.
- **Q2 — Ecosistema:** A più Daisy; B più Teensy; C bilanciato; D più adiacenti adattabili.
- **Q3 — Valore:** A DSP delay/granular; B UI/preset/storage; C audio I/O/clock; D architettura sequencer/state.
- **Q4 — Evidenza:** A richiedere asset taggato; B accettare package hashato senza tag con source diff/test; C privilegiare misure hardware.
- **Q5 — Repeat:** A mantenere override per architettura materiale; B solo release maggiore/target; C anche fix critici audio-state.
- **Q6 — Fonti:** A Daisy forum; B PJRC; C GitHub release/compare; D host alternativi; E pagine personali/indici low-SEO.
