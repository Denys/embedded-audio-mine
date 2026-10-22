# Daisy + Teensy Watch — 2026-10-22

## Sintesi

Un aggiornamento supera verifica primaria e anti-repeat:

1. **Squatch-Stack/squatch-dsp — STRONG_PASS** — il 2026-10-21 il motore ha aggiunto sostituzione live di cabinet IR e modelli Neural Amp Modeler, mantenendo il percorso audio senza allocazioni o lock, più un GateStage con handover anti-click verificato da test.

È un repeat entro 30 giorni. L'avviso fallback del 2026-10-20 riguardava il nuovo convolver per IR lunghe e i benchmark Daisy Seed3; i tre commit del 21 ottobre aggiungono invece una nuova architettura di cambio runtime e un nuovo stadio DSP, quindi il delta è materiale.

## Previous questionnaire feedback applied

Nessuna risposta esplicita è registrata (`explicit_questionnaire_answers: {}`). Non sono state inferite preferenze dal silenzio; restano invariati soglia di novità, verifica primaria, anti-repeat e rilevanza per DSP/audio firmware.

## Pre-flight / discovery audit

- Data: 2026-10-22 Europe/Zurich; cutoff anti-repeat: 2026-09-22; overlap dal 2026-10-20 rispetto all'ultimo controllo riuscito del 2026-10-21.
- Main verificato a `216da030488c2e0f55da18ebe7e6116d54274c6f`; ispezionati README, AGENTS, regole v0.3, protocollo hidden-gems, policy anti-repeat, tracker pubblicati/selezionati/comuni, stato prompt, digest recenti e cronologie Codex/portable pertinenti.
- Le pubblicazioni fallback recenti sono state trattate come hard evidence anche se non ancora presenti nel log canonico.
- Profilo: `daily_broad`, ristretto al monitor Daisy/Teensy.
- Exa Search/Fetch: **21 query riuscite**, fino a **236 slot richiesti**, più un batch di fetch primari; nessun rate limit, errore di connessione o pagina primaria bloccante.
- Copertura: **7 famiglie di query indipendenti** (Daisy forum, PJRC, GitHub Daisy, GitHub Teensy, firmware adiacente, forge/host alternativi, recheck mirati); almeno **7 domini espliciti**, di cui **6 non-GitHub**.
- Classi di fonte: categorie e thread forum, repository/commit/release, workflow/check, forge alternative e pagine progetto/personali.
- Pool di shortlist: **13 entità** (10 repository e 3 thread PJRC) sottoposte a controllo data/artefatto; 1 promossa, 12 in HOLD/escluse.
- Registry: **1 aggiunta** (Squatch DSP) e **2 revalidazioni** (Daisy Community Projects e PJRC Audio Projects).
- Stop condition: tre batch finali indipendenti — PJRC mirato, GitHub datato e host alternativi — non hanno prodotto un secondo candidato qualificante. Search debt: recall debole per URL PJRC esatti e forge GitLab/SourceHut, da rieseguire con query più strette.
- Date di indicizzazione e reply sono state usate solo come lead. I thread PJRC recenti non hanno fornito un evento firmware/hardware qualificante verificabile; il reply del 21 ottobre al post Squatch del 19 non è stato usato come data di release.

## 1. Squatch DSP: live model/cabinet swap + gate anti-click — STRONG_PASS

### Evento verificato e delta anti-repeat

- [Repository](https://github.com/Squatch-Stack/squatch-dsp).
- [Commit 43670a5](https://github.com/Squatch-Stack/squatch-dsp/commit/43670a5031c87a9a849b13a36fc26d84fc18e047), **2026-10-21 05:43 UTC**: aggiunge `CabSwap` per cambiare IR mentre l'audio continua.
- [Commit 9e72a90](https://github.com/Squatch-Stack/squatch-dsp/commit/9e72a90259f93a8b2347a0b8e525029d5fcde776), **2026-10-21 11:02 UTC**: `NamAmp` carica e sostituisce modelli NAM live con makeup per voce.
- [Commit 8cb420b](https://github.com/Squatch-Stack/squatch-dsp/commit/8cb420bee1ae90db0ed64f8cdcb5884d04f4bfc0), **2026-10-21 11:56 UTC**: nuovo `GateStage` con handover anti-click.
- [README e build/test](https://github.com/Squatch-Stack/squatch-dsp/blob/8cb420bee1ae90db0ed64f8cdcb5884d04f4bfc0/README.md) e [licenza MIT](https://github.com/Squatch-Stack/squatch-dsp/blob/8cb420bee1ae90db0ed64f8cdcb5884d04f4bfc0/LICENSE).
- Sul commit finale risultano riusciti i quattro workflow pubblicati: Quality, Daisy, CI e Push on main.

### Cosa è cambiato

- `CabSwap` mantiene due istanze `Cabinet` dietro `ModelSwap`: copia l'IR sul thread di controllo, prepara la voce standby, la riscalda sulla storia del segnale per la lunghezza della risposta e poi effettua il crossfade. `process()` non alloca e non prende lock. Il limite dichiarato è 262.144 tap; un cambio con latenza diversa viene rifiutato.
- Il test dedicato libera il buffer IR del chiamante prima dell'uso e gira con ASan/UBSan, verificando che lo stage possieda davvero i tap.
- `NamAmp` costruisce il nuovo modello, esegue reset/prewarm e I/O file fuori dal thread audio, poi pubblica la voce standby. Ogni voce conserva il proprio makeup di loudness; controlla sample rate e latenza e inserisce un DC blocker a 5 Hz inizializzato sul bias del modello per evitare il transiente al cambio.
- `GateStage` mantiene il gate caldo anche quando è bypassato e usa fade asimmetrici documentati: 40 ms all'attivazione e 10 ms alla disattivazione. I test includono un oracle di glitch, negative control con hard switch, equivalenza tra block size 1/7/32/64/128, ParamQueue e sorveglianza allocazioni/lock.

### Perché vale l'esame

Il valore non è un altro effetto isolato, ma un pattern completo per cambiare risorse DSP pesanti durante l'esecuzione: preparazione sul control thread, doppia istanza, warm-up con storia reale, crossfade e rifiuto esplicito delle configurazioni incompatibili. È direttamente rilevante per cabinet, modelli d'amp e preset complessi; il GateStage aggiunge un esempio misurabile per evitare click e swell nei passaggi di stato ad alto guadagno.

### Adattamento a Custom Pedals Multi-Delay / Daisy Field

Per Multi-Delay, il pattern più utile è un `DelayGraphSwap`: costruire sul main/control loop una seconda rete di tap, filtri e modulazioni, preriscaldarne gli stati con una breve storia del segnale e crossfadarla senza interrompere la callback. Il principio di `GateStage` è utile anche per attivare/disattivare feedback e filtri nel loop senza click.

Come prova su Daisy Field, partire da un harness dedicato con due catene di delay semplificate, buffer preallocati in SDRAM e comandi UI accodati; misurare worst-case callback, memoria, rumore di commutazione e stabilità durante cambi preset. Il repository include un host Daisy Seed3 per altre parti del motore, ma questi tre nuovi adapter non costituiscono un target Field verificato: questa è una proposta di porting, non compatibilità dichiarata.

### Hardware / caveat

- Nessun nuovo tag o asset firmware: il delta è sorgente su `main`.
- `NamAmp` è un adapter host JACK opzionale: NeuralAmpModelerCore usa Eigen, eccezioni e allocazioni durante il load. La separazione control/audio thread è riusabile, ma il file non è firmware embedded pronto.
- `CabSwap` usa `std::vector` e `unique_ptr` sul control thread; un port MCU deve sostituirli con pool statici o un'arena esterna e dimensionare esplicitamente due cabinet/IR.
- I workflow pubblici sono verdi, ma non risultano misure hardware nuove per questi tre commit né una prova su Daisy Field.
- La licenza root è MIT; le derivazioni citate da namchain restano attribuite in `THIRD_PARTY_NOTICES.md`.

## HOLD / esclusioni principali

- **Eight4aWish/eurorack_daisy_patch_init** — nuovi appunti e prove Wasp/Swords del 21 ottobre, ma nessun nuovo tag, target o delta riusabile abbastanza distinto dal repeat Mirth/FILTERS pubblicato ieri.
- **PZD, WeebLabs/DSPi, a7v7/floret, a7v7/libDaisy e ESP-beatsy** — nessun evento successivo qualificante rispetto ai record recenti; attività documentale o delta circoscritti restano sotto soglia.
- **rainybit-code/spore** — v0.5.4 è una release sostanziale con asset, ma è del 2026-10-12 e non ha commit nell'overlap; non viene usata per riempire il digest.
- **Daisy Community** — i nuovi post nell'overlap sono supporto, stock tracking o reply a lavori già coperti.
- **PJRC Audio Projects** — gli indici mostrano attività, ma non è stata verificata una nuova release/commit/hardware artifact nel periodo; una risposta recente non è prova di firmware nuovo.
- **Codeberg/GitLab/Hackaday/pagine personali** — nessun evento datato nell'overlap ha superato sorgente, build, licenza e novità materiale.

## Prompt improvement for next run

- Bloccare `Squatch-Stack/squatch-dsp` fino al 2026-11-21 salvo release, port embedded verificato, nuovo target o un ulteriore cambio architetturale misurato.
- Controllare se CabSwap/NamAmp passano da adapter host a blocchi con storage statico riusabile su MCU.
- Continuare a distinguere data del forum, data del commit, data della release e presenza effettiva dell'asset firmware.
- Rafforzare il recupero degli URL canonici PJRC e una corsia separata GitLab/SourceHut senza abbassare il gate degli artefatti primari.

## Interactive Feedback / Tuning Questionnaire

Rispondere, se utile, con codici come `Q1=B Q2=A Q3=C`; ogni scelta modifica il run successivo.

- **Q1 — Direzione:** A continua così; B più verifica profonda; C soglia di novità più alta; D più varietà.  
  Azioni: A mantiene; B aumenta diff/test; C penalizza repeat; D amplia le famiglie di query.
- **Q2 — Tipo da favorire:** A firmware Daisy; B firmware Teensy; C hardware/audio-I/O; D librerie DSP portabili.  
  Azione: boost della corsia scelta.
- **Q3 — Repeat entro 30 giorni:** A solo release/asset; B anche nuova architettura misurata; C anche nuovi algoritmi sorgente; D vietarli.  
  Azione: modifica temporanea della soglia anti-repeat senza indebolire la verifica primaria.
- **Q4 — Evidenza minima:** A sorgente+build+licenza; B aggiungere CI/test; C richiedere misura hardware; D accettare REF_PASS con caveat.  
  Azione: alza o modula il gate di promozione.
- **Q5 — Rilevanza Multi-Delay:** A delay/feedback; B preset/UI; C audio-I/O; D scheduling/memoria.  
  Azione: priorità di ranking e profondità dell'adattamento.
- **Q6 — Corsia da espandere:** A PJRC forum; B Daisy forum; C GitLab/Codeberg/SourceHut; D pagine personali/Hackaday.  
  Azione: assegna più query e revalidation alla corsia scelta.
- **Q7 — Profondità output:** A più conciso; B invariato; C più dettagli su diff/test; D più dettagli hardware.  
  Azione: regola la densità del digest mantenendo date e caveat obbligatori.
