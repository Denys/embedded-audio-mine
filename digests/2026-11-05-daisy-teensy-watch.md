# Daisy + Teensy Watch — 2026-11-05

## Esito

1. **Peteranthony1st/PZD Daisy Pod Groovebox v3.6.0 — STRONG_PASS** — repeat materiale: secondo motore Dexed con bus condiviso e split/layer, più riscrittura polifonica del granulare con pool bounded, fade di rilascio e migrazione preset.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano invariati hard anti-repeat, priorità ai progetti community con artefatti primari e Daisy Field come target di riferimento senza compatibilità presunta.

## Finestra e metodo

- Data Europe/Zurich: **2026-11-05**; cutoff anti-repeat 30 giorni: **2026-10-06**; overlap: **2026-10-31–2026-11-05**, dall'ultimo scan riuscito del 2026-11-02.
- Profilo: `daily_broad`. Exa: **25 query / 240 risultati richiesti** contando un retry; un singolo 401 transitorio è stato risolto al retry, senza gap di copertura o rate limit persistente.
- Angoli distinti: Daisy Community Projects/Examples/Latest; PJRC Audio Projects e thread correlati; GitHub release/commit; Codeberg, GitLab, Hackaday, altstrument e pagine progetto.
- Pool revisionato: oltre dieci candidati su più di sette domini e quattro classi di fonte, con prevalenza non-GitHub. Reply e date d'indice sono state usate solo per discovery.
- L'evento qualificante è ancorato a release, commit del tag, compare, asset con hash, sorgenti, Makefile, licenza e documentazione hardware/flash.

## Finding qualificato

### 1. PZD Daisy Pod Groovebox v3.6.0 — STRONG_PASS

**Evento verificato:** [release `v3.6.0`](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.6.0) pubblicata il **2026-11-03 20:13:44 UTC**. Il tag punta al commit [`70fe1eba412f0d007ace67e5f447f7395a59af4f`](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/70fe1eba412f0d007ace67e5f447f7395a59af4f) del **2026-11-03 20:12:21 UTC**. Il [compare v3.5.3…v3.6.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.5.3...v3.6.0) contiene **11 commit / 31 file**.

**Perché il repeat entro 30 giorni è ammesso**

L'alert del 30 ottobre copriva v3.5.2/v3.5.3: snapshot multi-engine, stato MIDI/preset, editing DX7 e voice stealing. v3.6.0 cambia invece il grafo audio e il modello di stato: duplica il synth Dexed, introduce pairing e bus condiviso, riscrive la gestione delle voci granulari e migra preset/snapshot. È un delta DSP, scheduling e storage, non attività cosmetica.

**Che cosa cambia**

- **Dexed A/B:** secondo engine DX7 completo, fino a 16 voci singole o 24 complessive, pagina Mix, MIDI lock/unlock, split/layer con octave shift e snapshot che salvano entrambi i motori e il pairing.
- **Bus condiviso:** filtro, fold, gain, limiter, livello, pan e send lavorano sul pair, mantenendo controllo dei singoli engine. I vecchi snapshot restano caricabili come singolo Dexed.
- **Granulare riscritto:** una cloud per voce, polifonia a quattro voci, 32 grani condivisi con fair-share stealing e release fade; Position/Spray/Scan, loop/one-shot/ping-pong, loop start/end, size/density e pitch/keymap.
- **Migrazione stato:** preset granulari v12; v10/v11 e snapshot più vecchi vengono convertiti automaticamente.
- **MIDI robusto:** sustain CC64 per Grains, Dexed A/B, Ensemble e SMPVO, polarità normal/reverse persistente, canale per engine, CC120/123 all-notes-off e gesto triple-click.
- **Ottimizzazione:** kernel con operatori DSP `SMULWB/SMMUL`, slot voice fade-only, bypass Fold a zero e un solo filtro mono sul bus. Il guadagno di circa un punto CPU è dichiarato dall'autore, non riprodotto indipendentemente.
- **Fix audio import:** correzione dello slicing stereo per kit OP-1 Field.

**Build/flash, licenza e hardware**

- Asset verificati: `bootloader`, **130.188 byte**, SHA-256 `76296b6bd625e5e5dbeba2431619a0ed90ae2c0a3a99258df00a64a0b8b9ec35`; `main.bin`, **930.432 byte**, SHA-256 `8ed17042f4d1a25482d6b52567ae53240efc1d9c48ae21e0c09e4dd2f50579c4`; `sdcard-template.zip`, **11.728.687 byte**, SHA-256 `0dac971890cfabe4c304ac18ec6565a711ca99c6d04006773765b4060e0c15c9`.
- Build C++ con libDaisy/DaisySP; [`src/Makefile`](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/v3.6.0/src/Makefile) usa `BOOT_QSPI` e il target `main`. Il repository ha licenza [MIT](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/v3.6.0/LICENSE).
- Target provato dal progetto: **Daisy Pod**, con stereo I/O, due knob, due button ed encoder; richiede OLED I2C 128×64 e microSD FAT32 cablata, MIDI IN opzionale.
- Flash: bootloader QSPI una volta via DFU/Web Programmer, poi copia di `main.bin` su SD e power-cycle secondo il [README v3.6.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/v3.6.0/README.md).

**Perché vale la pena**

È un esempio raro di crescita dell'architettura senza abbandonare compatibilità di stato: due engine condividono DSP post-processing e snapshot, mentre il granulare usa una risorsa globale limitata con fairness e transizioni anti-click. Sono pattern direttamente riusabili in firmware audio a budget deterministico.

**Adattamento proposto**

Per **Custom Pedals Multi-Delay**, il `DexedBus` suggerisce gruppi di tap con post-processing condiviso ma livello/pan individuali; lock/unlock e split/layer possono diventare gruppi di tap linkati o indipendenti. Il pool granulare fair-share con release fade è un buon modello per freeze, shimmer o transient grains senza allocazione dinamica. La migrazione v10/v11→v12 è una baseline concreta per evolvere preset e scene senza invalidare salvataggi precedenti.

Su **Daisy Field** servirebbero un adapter BSP/UI nativo, buffer delay in SDRAM, un pool bounded per tap/grani e misure di callback, jitter, latenza e headroom. Il repository non contiene target, build o prova di compatibilità Daisy Field.

**Caveat**

- Firmware in active testing; nessun test hardware indipendente eseguito in questo run.
- Il dato CPU è author-reported.
- microSD senza card-detect e cablaggio manuale aumentano il rischio operativo.
- L'hardware documentato è Daisy Pod, non Field.

## Candidati trattenuti o esclusi

- **Daisy forum:** sampler e browser serial tool hanno solo reply o thread pre-overlap senza release/source nuovo verificabile.
- **PJRC:** il post “SD Card Audio Player” del 3 novembre è un articolo editoriale su un progetto Teensy 3.1 storico; le reply ai thread multicanale non dimostrano un evento firmware.
- **curiosa/sereia:** repository Codeberg concreto, ma ultimo commit primario 2026-06-16; nessun delta post-overlap.
- **palmerr23/Teensy8x8AudioBoard:** nessun delta materiale successivo alla revisione settimanale del 4 novembre; aggiornamenti doganali/documentali non contano.
- **twitzelbos/daisy-rs:** architettura interessante ma ultimo commit verificato 2026-08-16 e nessuna release nuova.
- **Mirth:** modifiche recenti a faceplate, costo e silkscreen; nessun delta DSP/firmware o release.
- **oikoaudio/oikoaudio:** già pubblicato dal digest Codex del 4 novembre; hard anti-repeat.
- **Host alternativi e adiacenti:** nessun secondo evento Daisy/Teensy ha superato insieme novità, target, build, licenza e valore di riuso.

## Persistenza

- `data/published-repo-log.csv`: PZD aggiornato a v3.6.0; nuova eleggibilità **2026-12-05**.
- `data/common-anti-repeat-index.csv`: record derivato rigenerato.
- `data/hidden-gems-source-registry.csv`: fonti Daisy, PZD e altstrument riverificate senza duplicati.
- `data/prompt-evolution-state.yaml`: finestra, blocco repeat, recheck queue e search debt aggiornati.
- `data/selected-projects.csv`: invariato; PZD è forte ma già noto e non diventa un nuovo riferimento eccezionale.

## Link primari

- [Repository](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox)
- [Release v3.6.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.6.0)
- [Compare v3.5.3…v3.6.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.5.3...v3.6.0)
- [Commit del tag](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/70fe1eba412f0d007ace67e5f447f7395a59af4f)
- [Granular engine](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/v3.6.0/src/granular_engine.cpp)
- [Dexed bus](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/v3.6.0/src/dexed_synth.h)
- [Performance store](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/v3.6.0/src/performance_store.cpp)

## Prompt improvement for next run

- **Migliorato:** il confronto contro l'ultima release pubblicata ha separato un vero cambio di grafo/stato da reply, index freshness e housekeeping.
- **Debole:** la forte cadenza PZD può consumare discovery; non ogni tag deve diventare alert.
- **Regola temporanea:** per repeat ravvicinati, richiedere insieme compare primario e un cambiamento di grafo audio, scheduling real-time, stato migrabile, target o misura.
- **Recheck:** PZD bloccato fino al 2026-12-05 salvo target Field, nuova release con delta DSP/storage/real-time equivalente o misura indipendente.
- **Delta compatto:** `v3.5.3→v3.6.0; dual Dexed + shared bus + granular rewrite + preset migration`.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze. Risposta compatta possibile: `Q1=B Q2=C Q3=A Q4=B Q5=A Q6=C`.

- **Q1 — Direzione:** A continua così; B più verifica dei diff; C soglia novità più alta; D più finding quando reggono.
- **Q2 — Ecosistema:** A più Daisy; B più Teensy; C bilanciato; D più adiacenti adattabili.
- **Q3 — Valore:** A clock/jitter/delay; B UI/preset/storage; C audio I/O; D hardware aperto.
- **Q4 — Evidenza:** A richiedere asset taggato; B accettare package hashato con source diff/test; C privilegiare misure hardware.
- **Q5 — Repeat:** A mantenere override solo per delta materiale; B solo release maggiore/target; C anche fix audio-state critici.
- **Q6 — Fonti:** A Daisy forum; B PJRC; C GitHub release/compare; D host alternativi; E pagine personali/indici low-SEO.
