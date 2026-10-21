# Daisy + Teensy Watch — 2026-10-21

## Sintesi

Un solo aggiornamento supera verifica primaria e anti-repeat:

1. **Eight4aWish/eurorack_daisy_patch_init — PASS** — il 2026-10-20 Mirth ha aggiunto una banca **FILTERS** per Daisy Patch.Init con modelli GRU-16 del filtro Wasp e uno strato granulare STFT opzionale; il lavoro è stato poi rischedulato in dieci slice e spostato in DTCMRAM dopo che la prima versione aveva prodotto glitch sul banco.

È un repeat entro 30 giorni, consentito da un delta materiale verificato rispetto all'avviso fallback del 2026-10-17, che riguardava invece le release Wish/Beads v1.0.0.

## Pre-flight / discovery audit

- Data: 2026-10-21 Europe/Zurich; cutoff anti-repeat: 2026-09-21; overlap dal 2026-10-17 rispetto all'ultimo controllo riuscito del 2026-10-20.
- Main verificato a `3688cd9b5b5bbc3f123835bf300239c227bd9526`; ispezionati README, AGENTS, regole v0.3, protocollo hidden-gems, policy anti-repeat, feedback state, registry, tracker pubblicati/selezionati/comuni, digest Daisy/Teensy recenti e cronologie Codex/portable pertinenti.
- Le pubblicazioni fallback del 16, 17 e 20 ottobre sono state trattate come hard evidence anche quando la relativa branch non era stata integrata in main.
- Exa: 15 query riuscite più un batch di fetch primari, con workstream distinti per Daisy Community, PJRC Audio Projects, GitHub Daisy/Teensy e host/pagine alternative.
- Le date di indicizzazione e dei reply sono state usate soltanto come lead. Nessun thread PJRC recente ha fornito un evento firmware/hardware qualificante verificabile.

## 1. Mirth: Wasp neural filter + granular layer — PASS

### Evento verificato e delta anti-repeat

- [Repository](https://github.com/Eight4aWish/eurorack_daisy_patch_init).
- [Commit 5f8d8b0](https://github.com/Eight4aWish/eurorack_daisy_patch_init/commit/5f8d8b014551bc3c0a5679939ec909b616d92ab4), **2026-10-20 12:21 UTC**: integra lo strato granulare nel nuovo bank FILTERS e il formato `.grnb` v2.
- [Commit 0654694](https://github.com/Eight4aWish/eurorack_daisy_patch_init/commit/065469447c01f142495a7b4f549c689169cc0dad), **2026-10-20 13:24 UTC**: porta il lavoro FFT da tre a dieci slice e colloca array/twiddle in DTCMRAM dopo il test hardware.
- [Commit e64ab53](https://github.com/Eight4aWish/eurorack_daisy_patch_init/commit/e64ab53f0a8a974aef131c4024f8f60b9f8f3f57), **2026-10-20 13:50 UTC**: registra il nuovo worst block e l'ascolto del layer.
- [Pagina Mirth](https://eight4awish.com/modules/mirth/) e [README tecnico](https://github.com/Eight4aWish/eurorack_daisy_patch_init/blob/2c1bbd9fd054256a5a595fc321bb7216f857d476/daisy_neural/README.md).
- [Licenza MIT con note sui componenti terzi](https://github.com/Eight4aWish/eurorack_daisy_patch_init/blob/2c1bbd9fd054256a5a595fc321bb7216f857d476/LICENSE).

Il repository era stato segnalato il 17 ottobre per le release Wish/Beads. Questo repeat è ammesso perché aggiunge un nuovo algoritmo e signal path a Mirth, nuovi formati di capture, scheduling real-time e misure hardware successive: non è documentazione o attività generica.

### Cosa è cambiato

- La banca FILTERS carica dal microSD modelli GRU-16 del Wasp; i GRU-24 sono esclusi perché superano il budget del Daisy.
- Un file `.grnb` v2 può includere, dopo la rete, uno strato granulare derivato dalle variazioni tra registrazioni: STFT da 2.048 punti, hop 512, guadagni spettrali dipendenti dalla risonanza e dry path ritardato per mantenere l'allineamento.
- Il payload viene letto direttamente in un buffer SDRAM da 4 MB e rifiutato integralmente se parsing/caricamento falliscono. Il cambio filtro e il bypass azzerano l'audio stale.
- La prima implementazione in tre slice occupava in media circa il 72%, ma richiedeva circa 11.000 cicli per campione nei blocchi pesanti contro un budget di 10.000 e glitchava. La versione in dieci slice porta la latenza a **53,7 ms** e il worst block documentato a **7.637 cicli** (circa 8.600 con i gain).
- Il motore C++ è confrontato con il riferimento Python; la documentazione riporta ESR circa `1e-12` e identità entro `1.2e-7` sul layer sintetico.
- Il progetto conserva build Make/libDaisy, `BOOT_SRAM`, flash DFU o update da microSD tramite Daisy bootloader. La release Mirth v1.0.0 del 3 ottobre offre binari, ma **precede** questa banca FILTERS: il delta del 20 ottobre è sorgente non ancora taggato.

### Hardware, valore e adattamento

Il target verificato è **Daisy Patch.Init()**; Mirth completo usa anche un OLED SSD1306 64×48. Mirth Lite compila per Patch.Init stock, ma al momento non espone la terza banca FILTERS. Non esiste un target Daisy Field.

Per Custom Pedals Multi-Delay il valore riusabile è il pattern di scheduling: suddividere un'elaborazione spettrale pesante tra callback, separare FFT hot in DTCMRAM e payload lungo in SDRAM, e ritardare il dry path esattamente quanto il wet. Un esperimento su Daisy Field dovrebbe estrarre `gran_layer.h` in un harness dedicato e usare il layer come colorazione spettrale modulata nel feedback di un tap; vanno misurati worst-case callback, latenza, uso DTCM/SDRAM e stabilità durante il cambio preset. Questa è una proposta di porting, **non compatibilità Field dimostrata**.

### Caveat

- Nessun tag o asset binario include ancora il bank FILTERS.
- La latenza di 53,7 ms è adatta a texture/feedback, non a un percorso dry/wet non compensato.
- I risultati sono documentati sul Patch.Init dell'autore; non risultano CI né riproduzione indipendente.
- Il formato e il layer sono ancora sviluppo post-v1.0.0; Mirth Lite non può selezionarli.
- La licenza root è MIT, ma i subprogetti e dati vendorizzati conservano licenze proprie.

## HOLD / esclusioni principali

- **Squatch-Stack/squatch-dsp**, **WeebLabs/DSPi** e **a7v7/libDaisy** — già pubblicati il 2026-10-20; nessun delta successivo qualificante.
- **PZD**, **Wish/Beads**, **a7v7/floret** e **RidgeField** — bloccati dai record recenti; Mirth/Wasp è l'unica eccezione per nuovo DSP e misura hardware.
- **FrankBoesing/ESP-beatsy-Audio-Library** — l'API atomica `restart()` per gli oscillatori del 20 ottobre è utile ma troppo circoscritta per giustificare un secondo repeat a pochi giorni dal grande aggiornamento I/O.
- **PJRC Audio Projects** — indice recente ma nessuna release/commit primaria qualificante verificata; i reply e le pagine cache non sono stati trattati come prova.
- **Daisy forum** — i nuovi post nell'overlap sono Squatch già coperto o assistenza tecnica, non nuove release.

## Prompt improvement for next run

- Bloccare `Eight4aWish/eurorack_daisy_patch_init` fino al 2026-11-20 salvo release con binario FILTERS, nuovo target, correzione real-time misurata o cambiamento DSP materiale.
- Controllare se la banca FILTERS viene taggata e se Mirth Lite riceve una modalità verificata per raggiungerla.
- Continuare a separare data del forum, data del commit, data della release e presenza effettiva dell'asset firmware.
