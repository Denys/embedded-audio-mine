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

## Aggiornamenti tracker

- `data/published-repo-log.csv`: Sonido aggiornato a PASS, ultima pubblicazione 2026-11-27, eleggibile dopo 2026-12-27.
- `data/common-anti-repeat-index.csv`: riga canonica daily riallineata.
- `data/hidden-gems-source-registry.csv`: provenienza e caveat Sonido verificati sul commit corrente.
- `data/prompt-evolution-state.yaml`: stato della scansione, overlap, cutoff e blocker della prossima verifica aggiornati.
- `data/selected-projects.csv`: invariato; il delta è importante per il monitor ma non aggiunge una nuova reference eccezionale.
