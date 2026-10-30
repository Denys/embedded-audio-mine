# Daisy + Teensy Watch — 2026-10-30

## Esito

1. **Peteranthony1st/PZD-Daisy-Pod-Groovebox v3.5.2 + v3.5.3 — STRONG_PASS** — repeat materiale verificato dopo l'alert v3.5.1: snapshot multi-engine e schema preset/MIDI, editor DX7 completo, correzioni sonore FM, polifonia configurabile fino a 16 voci e voice stealing senza click.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano invariati verifica primaria, hard anti-repeat, priorità alla community e valore riusabile per DSP/audio firmware.

## Finestra e metodo

- Data Europe/Zurich: **2026-10-30**; cutoff anti-repeat 30 giorni: **2026-09-30**; overlap: **2026-10-27–2026-10-30**, dall'ultimo scan riuscito del 2026-10-29.
- Profilo: `daily_broad`. Exa: **18 query / 168 risultati richiesti**, più fetch primari e GitHub API; nessun errore di connessione o rate limit.
- Angoli distinti: Daisy Community Projects/Examples/Latest; PJRC Audio Projects, Blog Project Submission e Latest; release/compare/commit/sorgenti GitHub; GitLab, Codeberg, SourceHut, Hackaday, altstrument e pagine progetto.
- Le date di reply, gli indici e le cache sono serviti solo per discovery. Il finding è ancorato a release, compare, commit, asset e sorgenti primarie.
- PZD era bloccato fino al 2026-11-28. L'eccezione è ammessa perché v3.5.2/v3.5.3 introducono stato/persistenza multi-engine, cambi reali al core FM e gestione di polifonia/voice stealing: un delta molto più ampio di documentazione o UI cosmetica.

## Finding qualificato

### 1. PZD-Daisy-Pod-Groovebox v3.5.2 + v3.5.3 — STRONG_PASS

**Eventi verificati:** [v3.5.2](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.5.2), pubblicata il **2026-10-29 19:13:17 UTC**, e [v3.5.3](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.5.3), pubblicata il **2026-10-29 20:46:15 UTC**, tag finale sul commit **567a84e**. Il [compare v3.5.1…v3.5.3](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.5.1...v3.5.3) è avanti di **6 commit**, modifica **18 file** e contiene 2.817 aggiunte / 679 rimozioni.

**Che cosa cambia**

- **v3.5.2:** `Global:Snap` salva e ripristina insieme Grains, Dexed, Ensemble e Sampler: suono, Mix, canale MIDI, destinazione mod-wheel, on/off, modalità SMPVO/SMPDR e anche l'audio catturato da Grains. Gli snapshot hanno directory e gestione SD dedicate.
- I canali MIDI e la destinazione mod-wheel passano nei preset dei singoli engine; Grains aggiunge Level, Pan, Gain e Delay send. I file precedenti restano compatibili tramite campi/versioni con default espliciti.
- Dexed ottiene 16 pagine di editing DX7, inclusi operatori, EG, key scaling, LFO, transpose, operator on/off e grafici. Il core ora applica parametri prima memorizzati ma ignorati e implementa correttamente i loop di feedback multi-operatore degli algoritmi 4 e 6.
- **v3.5.3:** Dexed passa da 10 a **16 voci massime**, parte a 12 e permette 1–16 voci dalla pagina MIDI. Il limite è persistito in preset/snapshot; ridurlo rilascia le voci eccedenti.
- Quando una nota ruba o riavvia una voce ancora attiva, la coda viene spostata su uno slot libero e sfumata per circa **5 ms**, eliminando il click di hard cut. La release dichiara circa 20% CPU a 12 voci e 27% a 16 note tenute, misure dell'autore e non indipendenti.

**Implementazione e valore**

Il compare mostra modifiche runtime in `src/ui.cpp`, `performance_store.*`, nei quattro engine e nel core `msfa`. La parte più riusabile è la separazione fra snapshot globale e preset locali con versioning compatibile: lo stato di routing/MIDI resta vicino all'engine, mentre lo snapshot coordina l'intera scena. Sul DSP, il fade di voice steal è un pattern semplice per evitare discontinuità quando risorse limitate impongono riassegnazioni.

**Build/flash, licenza e hardware**

- v3.5.3 include `main.bin` (**918.460 byte**, SHA-256 `a7537c3f…e9da6c5`), bootloader (**130.188 byte**) e `sdcard-template.zip` (**11.735.392 byte**); il template è invariato dalla v3.5.2.
- Percorso pratico: bootloader una tantum via DFU/web programmer, poi `main.bin` su SD FAT32 e power-cycle per il flash QSPI. Il repository mantiene Makefile e sorgenti per build con toolchain Arm GNU/libDaisy.
- Licenza root **MIT**; il core msfa vendorizzato è Apache-2.0 e altre dipendenze/contenuti hanno termini propri.
- Target dichiarato: **Daisy Pod** con OLED I2C e microSD aggiunti. Non esiste target o prova di compatibilità Daisy Field.

**Perché vale la pena**

È un update sostanziale per architettura di stato, compatibilità dei preset e qualità audio in condizioni limite. Lo snapshot multi-engine mostra come richiamare una scena complessa senza mescolare ogni responsabilità in un unico file monolitico; il controllo di polifonia rende esplicito lo scambio CPU/voicing; il fade di 5 ms elimina un artefatto udibile con costo contenuto.

**Adattamento proposto**

Per **Custom Pedals Multi-Delay**, usare lo stesso modello per snapshot di scena: per ogni tap salvare tempo, feedback, pan, filtro, gain/send e MIDI mapping; nello snapshot globale salvare routing, mute/enable, clock source e stato FX. Versionare i record con campi trailing/default per non rompere preset esistenti. Applicare un crossfade breve quando un tap cambia buffer, tempo o slot e misurare il costo nel callback. Su **Daisy Field** trattare il codice solo come riferimento: occorrono adapter BSP/UI, mapping controlli e misure proprie di callback budget, cache/DMA, latenza e SDRAM.

**Caveat**

- Il progetto è esplicitamente in active testing e pubblica release molto ravvicinate.
- Le percentuali CPU e il miglioramento anti-click non hanno benchmark o registrazioni indipendenti.
- Snapshot più completi aumentano il rischio di migrazioni di schema e di riferimenti SD mancanti; il Sampler salva riferimenti per nome, non incorpora tutti i sample.
- UI, OLED, SD e flash sono Pod-specifici; nessuna compatibilità Daisy Field è dimostrata.

## Candidati trattenuti o esclusi

- **Daisy forum Projects/Examples:** nessun nuovo thread post-2026-10-29 con evento firmware/hardware primario distinto; l'attività più recente resta PZD o reply/assistenza.
- **Electro-Smith Oopsy:** activity del thread prerelease, ma nessun nuovo tag/release verificato post-scan.
- **PJRC Audio Projects / Blog Project Submission:** l'indice mostra thread recenti come “Midi data filer” e post generici, senza release, commit o hardware audio verificato post-2026-10-29.
- **Teensy GitHub:** i risultati recenti rimandano a core/library o progetti già noti, senza un delta community sostanziale e verificabile nel periodo.
- **Host alternativi:** nessun evento Daisy/Teensy post-scan ha superato soglia di novità, build, licenza e anti-repeat.

## Persistenza

- `data/published-repo-log.csv`: record PZD aggiornato a v3.5.2/v3.5.3; nuova eleggibilità **2026-11-29**.
- `data/common-anti-repeat-index.csv`: record derivato PZD rigenerato.
- `data/selected-projects.csv`: invariato; è un update di un riferimento già noto, non un nuovo watch eccezionale.

## Link primari

- [Repository](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox)
- [Release v3.5.2](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.5.2)
- [Release v3.5.3](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.5.3)
- [Compare v3.5.1…v3.5.3](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.5.1...v3.5.3)
- [Commit snapshot/editor 73341c3](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/73341c3cbaf1c398d9c7200e37bc48c8657f61aa)
- [Commit 16 voci/anti-click 0481bdc](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/0481bdc30c61a3196aa736ecf741cff8dfcb6da7)
- [Commit tag v3.5.3 567a84e](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/567a84ec7b0bc40fbb549eb7342325e100d09dbe)
- [Thread Daisy](https://community.daisy.audio/t/pzd-daisy-pod-groovebox/9677)

## Prompt improvement for next run

- **Migliorato:** interrogare direttamente il feed release del repository in repeat block ha catturato due tag non ancora riflessi negli indici Exa/altstrument.
- **Debole:** gli indici PJRC restano poveri di date-evento e mescolano thread nuovi con reply.
- **Regola proposta, non permanente:** per repository in active testing già alertati, controllare direttamente release e compare dall'ultimo tag; consolidare nello stesso digest i tag ravvicinati che formano un unico delta architetturale.
- **Recheck:** PZD bloccato fino al 2026-11-29 salvo nuovo target/engine, fix audio-state critico, misura indipendente o altra architettura release-level; PJRC richiede commit/tag/asset successivo al 2026-10-29.
- **Delta compatto:** `direct release feed for blocked repos; consolidate same-day tags; primary event date over index date`.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze. Risposta compatta possibile: `Q1=B Q2=A Q3=C Q4=B Q5=A Q6=D`.

- **Q1 — Direzione:** A continua così; B verifica più profonda; C soglia novità più alta; D più finding quando reggono.
- **Q2 — Ecosistema:** A più Daisy; B più Teensy; C bilanciato.
- **Q3 — Valore tecnico:** A DSP delay/granular; B UI/preset/storage; C audio I/O, clock e gain staging; D hardware open.
- **Q4 — Evidenza:** A richiedere sempre asset flashabile; B accettare source-only con build riproducibile; C privilegiare misure hardware.
- **Q5 — Repeat:** A mantenere l'attuale eccezione materiale; B ammettere solo nuovo target/release maggiore; C ammettere anche fix critici di stato/audio.
- **Q6 — Lane da espandere:** A Daisy forum; B PJRC; C GitHub release/compare; D Codeberg/GitLab/SourceHut; E pagine personali/indici low-SEO.
