# Daisy / Teensy Watch — 2026-11-27

## Esito

Una sola novità supera la soglia di pubblicazione. Data di esecuzione: **2026-11-27** (Europe/Zurich); cutoff anti-repeat: **2026-10-28**; overlap dalla scansione riuscita precedente: **2026-11-26**.

## 1. ampactor-labs/sonido — PASS

- **Evento verificato:** commit [`d4b5816`](https://github.com/ampactor-labs/sonido/commit/d4b5816743169a502856a96e749b5d28e1ae2c6b), 2026-11-26 23:06 UTC.
- **Cosa cambia:** corregge un difetto reale del passaggio al bootloader Daisy. La richiesta `0xB0074EFA` scritta nella backup SRAM poteva restare nella cache write-back e andare persa al reset, facendo apparire la modalità DFU solo per circa 2,5 secondi. Il nuovo percorso mappa i 4 KiB di backup SRAM come non-cacheable, esegue scrittura volatile e pulizia della cache line, quindi resetta con gli interrupt mascherati.
- **Implementazione:** il nuovo modulo condiviso `sonido_daisy::bootloader` sostituisce il codice privato di `sonido_pedal`; `grid_pedal` riceve lo stesso gesto di recovery con entrambi i footswitch all'accensione. La CI ora esegue il lint di tutti gli esempi firmware e tratta i warning della documentazione come errori.
- **Build/flash e prova fisica:** `grid_pedal` documenta `cargo objcopy --example grid_pedal --release` e `dfu-util` verso `0x90040000`. L'autore ha verificato su Cleveland Music Co. Hothouse che il bootloader resti in attesa DFU dopo 15 secondi e che `sonido pedal update fw.bin` completi flash e riavvio.
- **Perché vale l'esame:** trasforma un recovery fragile in una primitiva condivisa e verificata, riducendo il rischio di rendere inutilizzabile un pedale durante gli aggiornamenti. La separazione MPU tra SDRAM, SRAM DMA e backup SRAM è inoltre un riferimento concreto per firmware audio con buffer lunghi.
- **Adattamento al Custom Pedals Multi-Delay:** portare la stessa primitiva di boot request e la disciplina MPU nel target-specific layer; sul Daisy Field usarla solo come **piano di test di porting**, mappando il gesto di recovery ai controlli Field e verificando persistenza DFU per 15–30 s, coerenza cache/DMA dei buffer delay e recupero dopo interruzione di alimentazione. Non esiste evidenza di compatibilità Field nel progetto.
- **Hardware/elettronica:** validazione dichiarata su Hothouse/Daisy Seed; nessuna nuova revisione hardware.
- **Caveat:** commit su `main`, senza tag, release o binario associato; prova fisica lato autore e non indipendente; nessun target/build Daisy Field; il bootloader Daisy non consente readback della flash; licenza AGPL-3.0-or-later oppure commerciale.
- **Fonti primarie:** [repository](https://github.com/ampactor-labs/sonido), [commit](https://github.com/ampactor-labs/sonido/commit/d4b5816743169a502856a96e749b5d28e1ae2c6b), [bootloader.rs](https://github.com/ampactor-labs/sonido/blob/d4b5816743169a502856a96e749b5d28e1ae2c6b/crates/sonido-daisy/src/bootloader.rs), [sdram.rs](https://github.com/ampactor-labs/sonido/blob/d4b5816743169a502856a96e749b5d28e1ae2c6b/crates/sonido-daisy/src/sdram.rs), [grid_pedal.rs](https://github.com/ampactor-labs/sonido/blob/d4b5816743169a502856a96e749b5d28e1ae2c6b/crates/sonido-daisy/examples/grid_pedal.rs), [licenza](https://github.com/ampactor-labs/sonido/blob/d4b5816743169a502856a96e749b5d28e1ae2c6b/LICENSE).

## Controlli anti-repeat e provenienza

Sonido era stato pubblicato l'ultima volta il 2026-10-23 ed era nuovamente eleggibile dal 2026-11-22. Il commit sopra è successivo e costituisce un delta materiale distinto: recovery/aggiornamento firmware, memoria MPU condivisa, secondo ingresso firmware e prova Hothouse. Il nuovo blocco anti-repeat termina il **2026-12-27**.

La scoperta ha coperto separatamente forum Daisy Projects/Examples, forum PJRC/Teensy Audio Projects, GitHub commit/release e host alternativi: 120 risultati Exa e 120 slot di ricerca commit GitHub, seguiti da verifica sulle pagine primarie. Sono stati esclusi, fra gli altri: GhettoRack (UI/installer aggiornati ma licenza assente e blocker runtime ancora aperti), hvcc (pulizia di tipi/nomi non materiale), LILLA v7.4.0 (fuori overlap e già bloccato dopo pubblicazione recente), attività forum senza nuovo artefatto firmware e manutenzione cosmetica o documentale.

## Discovery audit

- **Profilo:** `daily_broad`, con data locale 2026-11-27, overlap dal 2026-11-26 e cutoff anti-repeat 2026-10-28.
- **Domini e classi:** `community.daisy.audio` e `forum.pjrc.com` (forum/community); `github.com` (repository, commit, release, sorgenti e licenze); `codeberg.org` (repository alternativi); `pjrc.com`, `tone3000.com` e pagine personali/progetto (documentazione e host primari).
- **Famiglie di query:** Daisy Projects/Examples; Daisy Seed/Patch/Field/Pod indipendenti; PJRC Audio Projects e Teensy 4.x; release/commit GitHub; delay/looper; foundation/core; host alternativi e pagine personali. Sono state eseguite 12 query Exa da 10 risultati e 6 ricerche commit GitHub da 20 slot, più recheck diretti dei repository candidati.
- **Pool candidati:** 15 lead unici dopo deduplica, fra cui Sonido, GhettoRack, LILLA, LoopSmith, hvcc, DaisyPodUsbAudio, TONE3000, BroTracker, PZD, SoundStudio, daisy-tone-trixter, slabcloud/reverb, M16 e il progetto PJRC Parametric Audio Equalizer.
- **Registro fonti:** 0 nuove righe; 1 riga revalidata e aggiornata (Sonido, stato `active` invariato); GhettoRack riesaminato senza promozione e senza cambio di stato.
- **Pagine bloccate/dead/moved:** nessun blocco Exa, reconnect o rate limit e nessuna pagina morta/mossa determinante. I risultati forum privi di artefatto primario sono rimasti discovery-only; repository senza licenza esplicita sono stati mantenuti in HOLD.
- **Stop rule:** dopo la promozione di Sonido sono state completate sweep indipendenti su Daisy forum, PJRC/Teensy, GitHub e host alternativi. Nessun secondo candidato ha superato insieme novità, sorgente/build, licenza e delta materiale; gli ultimi sweep hanno prodotto solo repeat bloccati, manutenzione cosmetica o lead con gate irrisolti.
- **Debito prossima scansione:** riesaminare Sonido solo oltre il 2026-12-27 salvo eccezioni materiali; mantenere GhettoRack in HOLD finché licenza e rischi runtime non sono risolti; ampliare Codeberg/GitLab/SourceHut e pagine personali continuando a verificare gli artefatti primari.

## Aggiornamenti tracker

- `data/published-repo-log.csv`: Sonido aggiornato a PASS, ultima pubblicazione 2026-11-27, eleggibile dopo 2026-12-27.
- `data/common-anti-repeat-index.csv`: riga canonica daily riallineata.
- `data/hidden-gems-source-registry.csv`: provenienza e caveat Sonido verificati sul commit corrente.
- `data/prompt-evolution-state.yaml`: stato della scansione, overlap, cutoff e blocker della prossima verifica aggiornati.
- `data/selected-projects.csv`: invariato; il delta è importante per il monitor ma non aggiunge una nuova reference eccezionale.


## Previous questionnaire feedback applied

Nessuna risposta esplicita era disponibile; non è stata inferita alcuna preferenza dal silenzio. Restano quindi invariati soglia di novità, rigore sulle fonti primarie, separazione delle lane e profondità tecnica.

## Prompt improvement for next run

1. **Miglioramento:** la scansione ha separato data di indicizzazione, reply recente ed evento firmware, promuovendo solo un commit datato e verificato su sorgente, build, licenza e prova hardware.
2. **Debolezza residua:** la validazione del recovery è lato autore e limitata a Hothouse; mancano replica indipendente, asset versionato e prova su interruzione di alimentazione.
3. **Lane rumorose/sottoutilizzate:** i forum hanno prodotto soprattutto resurfacing e attività senza artefatto; Codeberg, GitLab, SourceHut e pagine personali restano da ampliare senza abbassare il gate primario.
4. **Regole:** nessuna nuova regola permanente. Conservare la distinzione fra fix di aggiornamento/recovery e novità DSP; un fix critico può qualificare solo con percorso riproducibile e prova hardware esplicita.
5. **Recheck:** Sonido bloccato fino al 2026-12-27 salvo release/asset, nuovo target o DSP, build Field, verifica indipendente o ulteriore delta materiale di recovery/memoria/realtime. GhettoRack resta HOLD per licenza e blocker runtime.
6. **Delta compatto:** cercare eventi post-2026-11-26; verificare prima tag/commit e asset; per boot/update richiedere persistenza DFU, recovery e target esatto; mantenere Daisy Field come banco di porting dichiarato, mai come compatibilità inferita.

## Tuning questionnaire

Rispondere, se utile, nel formato `Q1=B Q2=A Q3=C Q4=A Q5=B Q6=D Q7=A`. Ogni scelta modifica concretamente la prossima scansione.

1. **Direzione generale**
   - A — continua con questo equilibrio;
   - B — aumenta la verifica hardware/flash;
   - C — alza ancora la soglia di novità;
   - D — dai più spazio a DSP e meno a tooling/recovery.
2. **Tipo di progetto da favorire**
   - A — delay/looper e routing realtime;
   - B — synth/sampler;
   - C — audio I/O, USB e codec;
   - D — updater, bootloader e infrastruttura firmware.
3. **Gate per prove hardware dell'autore**
   - A — sufficienti se riproducibili;
   - B — richiedi sempre replica indipendente per STRONG_PASS;
   - C — accettale solo con misure quantitative;
   - D — declassa a REF_PASS senza release binaria.
4. **Soglia per fix critici senza nuova funzione audio**
   - A — PASS con bug, diff e prova fisica;
   - B — HOLD finché non esiste un tag/release;
   - C — pubblica solo se evita perdita dati o brick;
   - D — escludi: solo DSP/audio feature.
5. **Daisy Field come target di adattamento**
   - A — mantieni piano di test senza compatibilità presunta;
   - B — cita Field solo con build esistente;
   - C — richiedi una prova Field prima di qualsiasi promozione;
   - D — usa Seed/Hothouse come riferimento principale.
6. **Profondità del digest**
   - A — più compatto;
   - B — invariato;
   - C — più dettagli su memoria/cache/DMA;
   - D — più dettagli su build, flashing e recovery.
7. **Lane da espandere**
   - A — Codeberg/GitLab/SourceHut;
   - B — forum specialistici e thread storici;
   - C — Hackaday e pagine personali;
   - D — release/commit GitHub con meno forum.
