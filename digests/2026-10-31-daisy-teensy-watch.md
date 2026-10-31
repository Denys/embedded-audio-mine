# Daisy + Teensy Watch — 2026-10-31

## Esito

1. **Eight4aWish Mirth v1.1.0 — STRONG_PASS** — repeat materiale verificato dopo l'alert source-only del 21 ottobre: release canonica con firmware flashabile, import A2 `.nam` sul modulo, layer di auto-oscillazione Swords, metadati di controllo per filtro e accesso FILTERS anche nella build Lite.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano invariati verifica primaria, hard anti-repeat, priorità alla community e valore riusabile per DSP/audio firmware.

## Finestra e metodo

- Data Europe/Zurich: **2026-10-31**; cutoff anti-repeat 30 giorni: **2026-10-01**; overlap: **2026-10-28–2026-10-31**, dall'ultimo scan riuscito del 2026-10-30.
- Profilo: `daily_broad`. Exa: **22 query / 200 risultati richiesti**, più fetch primari e GitHub API; nessun errore di connessione o rate limit.
- Angoli distinti: Daisy Community Projects/Examples/Latest; PJRC Audio Projects e thread correlati; release/compare/commit/sorgenti GitHub; GitLab, Codeberg, SourceHut, Hackaday, altstrument e pagine progetto.
- Date di reply, indici e cache sono serviti solo per discovery. Il finding è ancorato a tag, release, asset, compare, Makefile e sorgenti primarie.
- Il repository era bloccato fino al 2026-11-20. L'eccezione è ammessa perché l'alert del 21 ottobre descriveva Wasp FILTERS e scheduler granulari **source-only**, mentre v1.1.0 aggiunge un percorso flash/install reale e delta successivi su storage, DSP, UI e build Lite.

## Finding qualificato

### 1. Eight4aWish Mirth v1.1.0 — STRONG_PASS

**Evento verificato:** [Mirth v1.1.0](https://github.com/Eight4aWish/eurorack_daisy_patch_init/releases/tag/mirth-v1.1.0), pubblicata il **2026-10-29 16:16:47 UTC**. Il tag annotato del 29 ottobre punta al commit **[a291b97](https://github.com/Eight4aWish/eurorack_daisy_patch_init/commit/a291b97ba64e6be5360ab3928c4de30bdd2b8211)**. Rispetto al commit `0654694` incluso nell'alert precedente, il compare è avanti di 82 commit; il monorepo contiene lavoro parallelo, ma il delta Mirth è identificabile nei sorgenti `daisy_neural/`.

**Che cosa cambia**

- Al boot Mirth importa modelli **NAM A2-Lite `.nam`** dalla root della microSD, estrae e valida architettura/pesi, calcola CRC, livella il modello con il proprio engine e scrive il formato runtime `.a2nb`. I file vengono spostati in `nam_done/` oppure `nam_refused/` con causa visibile; la release indica circa tre secondi per file.
- Il filtro Swords aggiunge un layer procedurale di **auto-oscillazione**: onset con isteresi, fase casuale alla partenza, armoniche misurate, ducking con l'ingresso e phase locking. Lo stesso codice C++ può essere eseguito dall'host tool per verifica.
- Il mapping dei controlli diventa per-modello; FREQ/RES e feedback vengono calibrati separatamente. Mirth Lite ottiene la navigazione della banca FILTERS, assente nel finding precedente.
- La UI passa a sei righe con banca/posizione, controlli, CPU e cicli per sample. DRIVE è disponibile in ogni banca e B7 gestisce patch e cambio banca.
- La release consolida sette filtri, diciannove “not-amps”, starter capture ribilanciate con loudness A-weighted e misure dell'autore sul target Patch.Init.

**Implementazione e valore**

Il percorso più riusabile è `src/nam_import.cpp` (**423 righe nuove**) insieme a `capture_store.*`: conversione offline al boot, formato binario compatto, CRC, normalizzazione e quarantena dei file non validi, senza spostare parsing JSON o I/O SD nel callback audio. `nam/osc_layer.h` (**201 righe nuove**) mostra invece come affiancare a una rete neurale un layer DSP deterministico per ricostruire un comportamento — qui l'auto-oscillazione — che la sola rete non cattura bene. Makefile e splash includono il commit in esecuzione, utile per evitare ambiguità durante test con card/firmware diversi.

**Build/flash, licenza e hardware**

- La release include `mirth-v1.1.0.bin` (**213.364 byte**, SHA-256 `b2de3aa0…963cf`), `mirth-v1.1.0-card.zip` (**1.458.357 byte**, SHA-256 `383f71d9…0d40cc`) e notices completi.
- Installazione dichiarata: Daisy bootloader una tantum; microSD con una sola partizione **FAT32 ≤2 GB**; bin e contenuto dello zip nella root; power-cycle.
- Build riproducibile in `daisy_neural/Makefile`: `make` per Mirth OLED, `make LITE=1` per stock Patch.Init senza display, `BOOT_SRAM` predefinito e `APP_TYPE=BOOT_NONE` mantenuto per sanity check.
- Target documentato: **Daisy Patch.Init()** con microSD; la variante Mirth usa OLED 64×48, Lite no. Licenza root **MIT**, con notices e licenze separate per capture/dati.
- Non esiste target, BSP o prova di compatibilità **Daisy Field**.

**Perché vale la pena**

È più di una release di packaging: chiude il percorso dal file scaricato al modello eseguibile sul modulo, espone errori senza bricking, separa I/O/validazione dal realtime e documenta limiti di CPU/latency. L'ibrido rete + layer DSP è un pattern interessante quando un modello appreso è efficace sul carattere timbrico ma perde dinamiche instabili o controllabili.

**Adattamento proposto**

Per **Custom Pedals Multi-Delay**, riusare l'architettura boot-time per importare preset/tap profiles o curve di filtro da SD: validazione, versione/CRC, normalizzazione, compilazione in un formato binario rapido e quarantena dei file difettosi. Applicare metadati per-algoritmo a range, unità e mapping dei controlli, così UI e DSP restano disaccoppiati. Sul **Daisy Field** usarlo solo come riferimento: creare un adapter BSP/UI, mappare controlli e display, mantenere SD fuori dal callback e misurare budget per blocco, latenza e collocazione SDRAM/DTCM sul firmware Field prima di qualsiasi port.

**Caveat**

- I picchi CPU dichiarati arrivano a **84%**; FLT4 introduce **54 ms** e alcuni RATE not-amps ritardi dipendenti dal rate. Sono misure dell'autore, non riproduzioni indipendenti.
- CV è campionata una volta per blocco, circa 1 kHz, quindi non è audio-rate.
- Il tag è annotato ma non firmato. Gli asset hanno digest SHA-256 pubblicati.
- Il compare globale include altri subprogetti del monorepo; per il port va isolata `daisy_neural/`.
- La procedura FAT32 ≤2 GB e la dipendenza dal Daisy bootloader sono vincoli operativi reali.

## Candidati trattenuti o esclusi

- **Daisy forum SITL/HITL simulator:** il thread è del 2026-03-02; l'attività del 30 ottobre è una richiesta di aggiornamento. Non risultano source/build o release collegati, quindi nessun nuovo evento.
- **PZD-Daisy-Pod-Groovebox:** nessun commit o release successivo a v3.5.3 del 29 ottobre, già pubblicato il 30 ottobre; resta in blocco.
- **PJRC multichannel USB thread:** l'indice recente non ha portato a un nuovo tag, asset o commit audio verificabile dopo lo scan precedente; una reply non basta.
- **twitzelbos/daisy-rs:** architettura interessante (Rust/Renode/UAC1), ma ultima attività verificata ad agosto 2026 e nessun evento nella finestra.
- **Host alternativi e risultati Teensy GitHub:** nessun nuovo evento community post-scan ha superato insieme soglia di novità, build, licenza e anti-repeat.

## Persistenza

- `data/published-repo-log.csv`: record Eight4aWish aggiornato a Mirth v1.1.0; nuova eleggibilità **2026-11-30**.
- `data/common-anti-repeat-index.csv`: record derivato rigenerato.
- `data/selected-projects.csv`: invariato; il progetto è già un riferimento noto e questo è un update materiale, non un nuovo watch eccezionale.

## Link primari

- [Repository](https://github.com/Eight4aWish/eurorack_daisy_patch_init)
- [Release Mirth v1.1.0](https://github.com/Eight4aWish/eurorack_daisy_patch_init/releases/tag/mirth-v1.1.0)
- [Compare dal precedente finding](https://github.com/Eight4aWish/eurorack_daisy_patch_init/compare/065469447c01f142495a7b4f549c689169cc0dad...mirth-v1.1.0)
- [Import NAM sul modulo](https://github.com/Eight4aWish/eurorack_daisy_patch_init/blob/mirth-v1.1.0/daisy_neural/src/nam_import.cpp)
- [Layer di auto-oscillazione Swords](https://github.com/Eight4aWish/eurorack_daisy_patch_init/blob/mirth-v1.1.0/daisy_neural/nam/osc_layer.h)
- [Makefile Mirth/Mirth Lite](https://github.com/Eight4aWish/eurorack_daisy_patch_init/blob/mirth-v1.1.0/daisy_neural/Makefile)
- [Guida Mirth](https://eight4awish.com/modules/mirth/)
- [Guida FILTERS](https://eight4awish.com/modules/mirth-filters/)

## Prompt improvement for next run

- **Migliorato:** il controllo diretto delle release dei repository già in repeat block ha recuperato un tag/asset non ancora ben rappresentato dagli indici.
- **Debole:** gli indici PJRC continuano a confondere reply recente ed evento firmware.
- **Regola proposta, non permanente:** per un finding source-only, verificare nei dieci giorni successivi se compare una release canonica; ripetere solo quando il tag aggiunge un percorso flash/install e almeno un delta runtime post-alert.
- **Recheck:** Eight4aWish bloccato fino al 2026-11-30 salvo nuovo target hardware, release con DSP sostanzialmente nuovo, fix realtime critico o misure indipendenti.
- **Delta compatto:** `source-only → canonical asset; boot-time import; hybrid learned/procedural DSP; primary event date over index date`.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze. Risposta compatta possibile: `Q1=B Q2=A Q3=A Q4=B Q5=A Q6=C`.

- **Q1 — Direzione:** A continua così; B verifica più profonda; C soglia novità più alta; D più finding quando reggono.
- **Q2 — Ecosistema:** A più Daisy; B più Teensy; C bilanciato.
- **Q3 — Valore tecnico:** A DSP delay/granular/neural; B UI/preset/storage; C audio I/O, clock e gain staging; D hardware open.
- **Q4 — Evidenza:** A richiedere sempre asset flashabile; B accettare source-only con build riproducibile; C privilegiare misure hardware.
- **Q5 — Repeat:** A mantenere l'attuale eccezione materiale; B ammettere solo nuovo target/release maggiore; C ammettere anche fix critici di stato/audio.
- **Q6 — Lane da espandere:** A Daisy forum; B PJRC; C GitHub release/compare; D Codeberg/GitLab/SourceHut; E pagine personali/indici low-SEO.
