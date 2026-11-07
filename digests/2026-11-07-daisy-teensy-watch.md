# Daisy + Teensy Watch — 2026-11-07

## Executive summary

Un solo finding supera la soglia: **sscheidl/Daisy-Seed Looper v0.6.1 — PASS**. Il 6 novembre il progetto ha sostituito lo stack SD del looper con un profilo scrivibile condiviso FatFs R0.16 per FAT32/exFAT, campagne host di fault/power-loss e policy dei simboli; poche ore dopo v0.6.1 ha chiuso una race reale nella consegna della scheda a Windows che poteva perdere un undo/erase appena impartito. La qualità del codice e dei test è alta, ma il finding resta PASS: niente release asset, v0.6.1 non ha ancora un ARM build registrato e tutto il percorso SD è ancora non misurato su hardware.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano attivi hard anti-repeat, priorità a sorgenti/build verificabili e Daisy Field come target di adattamento senza compatibilità presunta.

## Pre-flight / discovery audit

- Data Europe/Zurich: **2026-11-07**; cutoff anti-repeat: **2026-10-08**; overlap: **2026-11-05–2026-11-07**, dall'ultimo scan riuscito del 6 novembre.
- Profilo: `daily_broad`. Ispezionati README, AGENTS, regole v0.3/hidden-gems/common anti-repeat/feedback, registri published-selected-common, stato, registry, digest del 6 novembre e history settimanali.
- Discovery: **23 query Exa / 214 risultati richiesti**, senza errori di connessione o rate limit. Passaggi separati per Daisy forum, PJRC/Teensy forum, GitHub release/commit e GitLab/pagine progetto; le date d'indice e le reply sono rimaste discovery-only.
- Pool serio: 7 lead (`sscheidl/Daisy-Seed`, `Eight4aWish/eurorack_modules`, `darrenji/hmsl-daisy`, due thread PJRC, `trigcondition/sidecar-firmware` e `B1narySolutions/amp-hardware`). Solo uno possiede un evento post-overlap, sorgenti/build/licenza e un delta architetturale sufficiente.
- Registry: aggiunti il workspace `sscheidl/Daisy-Seed`, il progetto GitLab `hmsl-daisy` e l'indice personale Eight4aWish Modules.
- Stop rule: chiusa dopo i tre angoli obbligatori, un passaggio GitHub globale, un passaggio host alternativi e follow-up primario di tutti i lead con attività recente.

## Ranked entry

### 1. sscheidl/Daisy-Seed — Looper v0.6.1 — PASS

**Evento verificato:** commit [7e7b02c](https://github.com/sscheidl/Daisy-Seed/commit/7e7b02cb403fd290558701de7d9b08cf9e43c445) del **2026-11-06 21:26:06 UTC** (Looper 0.6.0 e profilo SD scrivibile) seguito da [b7517b5](https://github.com/sscheidl/Daisy-Seed/commit/b7517b5ffb692084bdce3259f68843c4fd60b1d8) del **2026-11-06 21:49:37 UTC** (Looper 0.6.1, decisione SHARE finale).

**Che cosa cambia:** il looper passa a un unico stack FatFs R0.16 configurabile read-only/writable, con FAT32 ed exFAT, write IDMA multi-blocco via bounce buffer SDRAM da 32 KiB, attese limitate, `CTRL_SYNC` reale e reset RCC su fault. Le campagne host interrompono ogni block write: 143 cut point FAT32 e 137 exFAT, poi verificano recall del loop vecchio/nuovo e un salvataggio successivo. La 0.6.1 corregge una race tra rampa di undo/redo/erase, pressioni key/CC e richiesta SHARE: ferma gli edit, attende almeno un intero callback, ricalcola lo stato e accetta il passaggio a Windows solo se la decisione resta valida. Il nuovo test esegue il `main.cpp` di produzione e riproduce il difetto prima del fix.

**Implementazione e build:** workspace C++17 per **Seed3 Desktop Development Kit**, libDaisy/DaisySP pinati e toolchain xPack GCC 13.2.1. Percorso riproducibile: `make PROJECT=looper test`, `test-sanitize`, `make PROJECT=looper` e build MOD separata. Per 0.6.0 sono documentati BIN locali verificati (188.896 e 222.600 byte), test host/sanitizer, ARM build, controllo ELF e 334 test Python; non sono release asset. La 0.6.1 ha test host regolare/MOD e golden hash, ma l'ARM build è esplicitamente **NOT MEASURED**. Licenza root **MIT**.

**Perché vale la pena:** è un raro esempio embedded di persistenza audio che documenta non solo il happy path, ma i confini di perdita dati, l'ownership della scheda tra firmware e host e la coerenza tra callback audio, UI e storage.

**Adattamento:** per Custom Pedals Multi-Delay, separare il salvataggio di preset/tap/loop metadata dal callback, introdurre uno stato “edit in flight” e rendere finale il passaggio SD/USB solo dopo un callback quiescente. Su **Daisy Field** il primo esperimento dovrebbe essere un adapter BSP/UI minimo più un harness che inietta footswitch, MIDI CC e power cut attorno al commit dello stato; il repository non contiene un target Field e non prova che pinout, storage o timing siano trasferibili.

**Hardware/elettronica:** microSD del Seed3 Desktop Kit; nessuna scheda custom. Il percorso multi-block write non è mai stato eseguito sul kit. Il Mount può ancora bloccarsi in libDaisy se la scheda sparisce durante l'inizializzazione.

**Caveat:** nessuna misura hardware; nessuna release o binario 0.6.1 pubblicato; nota una finestra rara in cui un rename fallito seguito da retry può troncare l'unica copia temporanea, più un caso non testato di due nomi cross-linked; compatibilità Daisy Field assente.

**Fonti primarie:** [repository](https://github.com/sscheidl/Daisy-Seed) · [Looper README](https://github.com/sscheidl/Daisy-Seed/tree/main/instruments/looper) · [report SD 2026-11-06](https://github.com/sscheidl/Daisy-Seed/blob/main/docs/SD_WRITABLE_REBUILD_2026-11-06.md) · [persistence boundaries](https://github.com/sscheidl/Daisy-Seed/blob/main/instruments/looper/docs/SD_PERSISTENCE.md)

## HOLD / non promossi

- **darrenji/hmsl-daisy:** architettura notevole (Forth/HMSL live, scheduler sample-clock, 8 voci, HIL su Daisy Patch e Alchemy Lab), ma l'ultimo commit canonico è del **2 novembre**, fuori dall'overlap. Recheck al prossimo evento materiale.
- **Eight4aWish/eurorack_modules:** il commit del 6 novembre registra che l'audio in attraversa Warps sul Teensy Move, ma modifica solo `docs/TEENSY_MOVE.md`; nessun delta di firmware/build nel commit.
- **PJRC voice changer / auto-BPM looper:** titoli recenti nella pagina latest, ma Exa non ha risolto URL canonici con repository o sorgenti riproducibili. Nessuna promozione basata su indicizzazione relativa.
- **trigcondition/sidecar-firmware:** fix dei default machine-list troppo stretto per cambiare il valore di riuso audio.
- **B1narySolutions/amp-hardware:** attività documentale senza nuovo firmware, target o misura.

## Analysed resources

Daisy Community Projects/Examples e Latest; PJRC latest/Project Guidance e query Audio Projects; commit/release GitHub Daisy, DaisySP, libDaisy e Teensy; GitLab `hmsl-daisy`; Eight4aWish Modules; repository e commit dei lead sopra. Athanor, GLOOP, Rodeo e ichosynth restano bloccati fino al 6 dicembre; PZD fino al 5 dicembre.

## Tracker updates

- Aggiunto `sscheidl/Daisy-Seed` a `data/published-repo-log.csv`; repeat bloccato fino al **2026-12-07**.
- `data/selected-projects.csv` invariato: il progetto è utile ma non ancora un riferimento hardware eccezionale.
- Rigenerato `data/common-anti-repeat-index.csv`.
- Aggiornati registry sorgenti e stato del monitor.

## Prompt improvement for next run

- **Migliorato:** il controllo del diff ha distinto una riga documentale Eight4aWish da una race storage/audio realmente corretta e coperta da test.
- **Debole:** le pagine PJRC latest hanno titoli freschi ma URL indicizzati errati; richiedere thread canonico o repository collegato prima di spendere verifica profonda.
- **Regola temporanea:** un fix piccolo può superare la soglia se chiude un confine di perdita dati/real-time, include riproduzione prima-del-fix e test sul percorso di produzione; il numero di file non è un proxy.
- **Recheck:** `sscheidl/Daisy-Seed` dopo il 7 dicembre salvo release asset, hardware/Field validation o altro delta architetturale; `hmsl-daisy` al prossimo evento post-overlap.
- **Delta compatto:** `Looper SD writable + power-loss boundaries + final SHARE handoff`.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze. Formato: `Q1=B Q2=C Q3=A Q4=B Q5=A Q6=C`.

- **Q1 — Direzione:** A continua così; B più verifica dei diff; C soglia novità più alta.
- **Q2 — Ecosistema:** A più Daisy; B più Teensy; C bilanciato.
- **Q3 — Evidenza:** A richiedere hardware; B accettare host/ARM test ben delimitati; C solo release asset.
- **Q4 — Valore:** A storage/persistence; B DSP/delay; C UI/preset; D audio I/O.
- **Q5 — Fix piccoli:** A promuovere se chiudono data-loss/real-time con regression test; B solo release/feature.
- **Q6 — Fonti:** A Daisy forum; B PJRC; C GitHub compare; D GitLab/Codeberg/pagine personali.
