# Daisy + Teensy Watch — 2026-11-02

## Esito

1. **ejtb76/Amenity v1.0.0 — REF_PASS** — primo pacchetto installabile del firmware live-jungle per M-VAVE FM-1, con engine DSP integer, clock MIDI bidirezionale e PLL testato contro clock inviato a burst.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano invariati hard anti-repeat, priorità ai progetti community con artefatti primari e Daisy Field come target di riferimento senza compatibilità presunta.

## Finestra e metodo

- Data Europe/Zurich: **2026-11-02**; cutoff anti-repeat 30 giorni: **2026-10-03**; overlap: **2026-10-30–2026-11-02**, dall'ultimo scan riuscito del 2026-11-01.
- Profilo: `daily_broad`. Exa: **28 query / 264 risultati richiesti**, più fetch primari e GitHub API; nessun errore di connessione o rate limit.
- Angoli distinti: Daisy Community Projects/Examples/Latest/Software; PJRC Audio Projects e thread correlati; GitHub release/commit; GitLab, Codeberg, SourceHut, Hackaday, altstrument e pagine personali.
- Le date degli indici e delle reply sono state usate solo per discovery. Il finding è ancorato a tag, commit, asset con hash, sorgenti, test host, build script e licenza.
- Nessun record Amenity compareva in published log, selected projects, common index o history settimanali. L'indice altstrument ha portato al progetto, ma la data qualificante è quella della release primaria.

## Finding qualificato

### 1. Amenity v1.0.0 — REF_PASS

**Evento verificato:** [release `v1.0.0`](https://github.com/ejtb76/amenity/releases/tag/v1.0.0) pubblicata il **2026-11-01 10:13:04 UTC**. Il tag annotato risolve al commit [`cf2836e4d1746171f5eeb2579ec14cb0105f5bea`](https://github.com/ejtb76/amenity/commit/cf2836e4d1746171f5eeb2579ec14cb0105f5bea) del **2026-11-01 00:04:59 UTC**.

**Che cosa cambia**

- Firmware live-jungle: Amen break diviso in sedici ottavi, roll/build/echo/stretch sui tasti bianchi, one-shot sui neri, pattern auto-variabile e fill di fine frase.
- Catena audio dichiarata: stretch → lo-fi → feedback/comb → EQ a quattro bande → saturazione → compressione → DJ filter, con effetti level-matched.
- Clock MIDI in/out. Il commit del tag introduce un **PLL del secondo ordine**: l'engine continua sul proprio clock e corregge fase/frequenza invece di seguire ogni pulse.
- I test host inviano clock in burst da **512–2048 frame** per simulare DAW bufferizzate; il commit documenta il peggior cambio tra ottavi da **33 ms a 0,6 ms**.
- L'audio gira in interruzione con aritmetica intera. I test host renderizzano WAV e pannelli PNG e controllano timing, click e livelli.

**Build/flash, licenza e hardware**

- Asset verificati: `AMENITY-V10-installer.html`, **2.575.979 byte**, SHA-256 `b530b2c9da245113f621e33aa8986bc98ecda97835d90bee1a55d44175d9553f`; `AMENITY-V10.fwsc`, **487.988 byte**, SHA-256 `eb7f77948cd93ad4bbd0c3d5661ee83b3e6d7d524c9be78dbde2ba330f4f8e52`.
- Build Windows x64 con JieLi toolchain 2.5.3, Python/numpy/scipy e tool C di Visual Studio; `tools\jungle\build_release.bat <source-archive-url>` produce gli artefatti. Sono presenti `build_host.bat`, `build_panel.bat` e percorso WASI per i test web.
- Target: **M-VAVE FM-1 / AC791N** tramite FM1 Open SDK. Il browser installer usa USB e include il loader M-VAVE per il ripristino a V15.
- Se il sample bank non contiene AMEN, il firmware usa una copia embedded a 20 kHz; l'installer può scrivere una bank a 32 kHz, sostituendo gli otto slot.
- Codice **GPL-3.0-only** con eccezione di linking FM1 SDK. Il binary engine SDK conserva termini separati.
- La registrazione Amen inclusa è esplicitamente esclusa dalla licenza del progetto: i diritti restano ai titolari originali.

**Perché vale la pena**

Il valore riusabile non è il sample player, ma il confine fra clock esterno irregolare e timeline audio interna. Il PLL assorbe i burst di una DAW senza spostare bruscamente gli eventi musicali, e il progetto accompagna l'algoritmo con un harness ripetibile che produce una metrica temporale concreta.

**Adattamento proposto**

Per **Custom Pedals Multi-Delay**, riusare il modello di clock: timestamp dei pulse MIDI, stima iniziale rapida, oscillatore interno continuo e correzione limitata di fase/frequenza. Il test con burst da 512–2048 frame può diventare un test di tap quantizzati, cambio tempo e ricampionamento delle teste delay, misurando jitter e discontinuità fra ottavi.

Su **Daisy Field** l'adattamento richiede un port nativo: adapter BSP/UI, conversione o sostituzione dell'engine integer, handoff control/audio senza lock, buffer delay in SDRAM e misure di callback, jitter e latenza. Amenity non contiene target, build o prova di compatibilità Field.

**Caveat**

- È un riferimento adiacente FM-1, non Daisy o Teensy, e non pubblica hardware aperto.
- Flash non ufficiale con rischio di brick; il percorso di ripristino riduce ma non elimina il rischio.
- La sample bank completa sostituisce tutti gli otto slot.
- Il firmware è vicino al limite flash e non pubblica misure fisiche di CPU, latenza o jitter MIDI.
- Il sample incluso crea un rischio concreto di redistribuzione: separare codice, fixture sintetiche e audio di test prima di riuso o CI.

## Candidati trattenuti o esclusi

- **Daisy Community:** nessun nuovo thread Projects dopo il 29 ottobre. Le attività del 30–31 ottobre sono domande o reply, non release firmware verificate.
- **PJRC / T-DSP:** il thread recente ha risurfaced un ecosistema già pubblicato a luglio; i repository non mostrano un evento materiale post-overlap. Escluso per anti-repeat.
- **billwolfhub/plooper:** il commit del 30 ottobre modifica solo `.gitignore`; l'implementazione DSP è precedente al cutoff del monitor. Escluso come housekeeping cosmetico.
- **Mirth MultiOsc:** i commit del 1 novembre aggiungono un gesto UI hold-B7 per la scelta del percorso; nessuna nuova release/asset o architettura sufficiente a superare il blocco fino al 30 novembre.
- **PZD, Bigorna e Teensy Audio Library:** nessun commit o release materiale successivo all'ultimo evento già pubblicato.
- **Host alternativi:** nessun secondo evento Daisy/Teensy post-scan ha superato insieme novità, build, licenza e anti-repeat.

## Persistenza

- `data/published-repo-log.csv`: aggiunto Amenity REF_PASS; eleggibilità **2026-12-02**.
- `data/common-anti-repeat-index.csv`: record derivato rigenerato.
- `data/hidden-gems-source-registry.csv`: aggiunti repository primario e pagina progetto altstrument.
- `data/prompt-evolution-state.yaml`: finestra, recheck queue, regola temporanea e search debt aggiornati.
- `data/selected-projects.csv`: invariato; il valore è forte ma adiacente e gravato dal confine sui diritti audio.

## Link primari

- [Repository](https://github.com/ejtb76/amenity)
- [Release v1.0.0](https://github.com/ejtb76/amenity/releases/tag/v1.0.0)
- [Commit PLL del tag](https://github.com/ejtb76/amenity/commit/cf2836e4d1746171f5eeb2579ec14cb0105f5bea)
- [Browser installer](https://ejtb76.github.io/amenity/)
- [README build e installazione](https://github.com/ejtb76/amenity/blob/v1.0.0/README.md)
- [Licenza](https://github.com/ejtb76/amenity/blob/v1.0.0/LICENSE)
- [Boundary del sample](https://github.com/ejtb76/amenity/blob/v1.0.0/assets/third-party/amen/README.md)

## Prompt improvement for next run

- **Migliorato:** l'indice low-SEO ha scoperto il progetto, mentre tag, asset e commit hanno stabilito data e novità reali.
- **Debole:** forum e aggregatori continuano a risurfacing progetti già pubblicati senza un nuovo evento primario.
- **Regola proposta, temporanea:** per un progetto adiacente scoperto via indice, richiedere tag/commit primario, pacchetto o build verificabile e revisione esplicita dei diritti degli asset inclusi.
- **Recheck:** Amenity bloccato fino al 2026-12-02 salvo nuovo target, architettura DSP, misura hardware o risoluzione materiale dei diritti del sample.
- **Delta compatto:** `index date ≠ release date; primary tag + package hashes + timing test + asset-rights boundary`.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze. Risposta compatta possibile: `Q1=B Q2=C Q3=A Q4=B Q5=A Q6=C`.

- **Q1 — Direzione:** A continua così; B più verifica dei diff; C soglia novità più alta; D più finding quando reggono.
- **Q2 — Ecosistema:** A più Daisy; B più Teensy; C bilanciato; D più adiacenti adattabili.
- **Q3 — Valore:** A clock/jitter/delay; B UI/preset/storage; C audio I/O; D hardware aperto.
- **Q4 — Evidenza:** A richiedere asset taggato; B accettare package hashato con source diff/test; C privilegiare misure hardware.
- **Q5 — Repeat:** A mantenere override solo per delta materiale; B solo release maggiore/target; C anche fix audio-state critici.
- **Q6 — Fonti:** A Daisy forum; B PJRC; C GitHub release/compare; D host alternativi; E pagine personali/indici low-SEO.
