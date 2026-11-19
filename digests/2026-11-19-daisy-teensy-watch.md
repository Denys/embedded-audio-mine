# Daisy + Teensy Watch — 2026-11-19

## Executive summary

Una sola voce supera la soglia: **newdigate/rt1176-evkb + nosh-dev-board + Audio — REF_PASS (repeat materiale di famiglia)**. Il 18 novembre Nosh è passato da riferimento simulato/EVKB a piattaforma fisica verificata su due schede: full-duplex SGTL5000 attraverso il grafo Teensy Audio, fix SAI1 necessario, misure audio e stress display/SDRAM. È un riferimento adiacente RT1176, non firmware per Teensy 4.x e non un target Daisy Field.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano attivi i gate su data canonica dell'evento, licenza, build/flash, prova hardware, anti-repeat di famiglia e separazione fra target reali e adattamenti proposti.

## Pre-flight / discovery audit

- Data Europe/Zurich: **2026-11-19**; cutoff anti-repeat: **2026-10-20**; overlap: **2026-11-18–2026-11-19**, dall'ultimo scan riuscito del 18 novembre.
- Verificati README, AGENTS, regole v0.3/hidden-gems/common anti-repeat/feedback, registri published/selected/common, source registry, prompt state, digest del 18 novembre e history Codex settimanale.
- Profilo: `daily_broad`. Discovery Exa: **120 risultati richiesti** in 12 ricerche distinte, con angoli separati Daisy forum, PJRC/Teensy, GitHub release/commit, host alternativi, build log, hardware artifact, DSP architecture e pagine personali; eseguiti inoltre tre controlli mirati indipendenti su forum e famiglia RT1176.
- Le date di indice e i reply forum sono stati usati solo per discovery; commit, file, licenze e misure sono stati verificati sulle pagine primarie.
- Daisy Community Projects non mostra un evento canonico post-overlap qualificante; PJRC Audio Projects ha thread recenti, ma nessuno con una nuova release/source delta verificata abbastanza forte.
- Source registry: aggiunti Nosh e il fork Audio RT1176; nessuna pagina bloccata, morta o spostata.

## Ranked entries

### 1. newdigate/rt1176-evkb + nosh-dev-board + Audio — REF_PASS · repeat materiale di famiglia

**Che cosa è cambiato:** dopo l'alert `newdigate/rt1176-evkb` dell'8 novembre, il blocker registrato richiedeva proprio una prova fisica Nosh. I commit Nosh del **2026-11-18**, fino a **8e605609f76bc00cb27dd7a4edab1b62b228614b**, completano il bring-up di una seconda scheda, l'audio full-duplex e lo stress display/SDRAM. Il fix firmware correlato è **newdigate/Audio 0db101dcdbd10b10dde08163922b601b71f92937**, sempre del 18 novembre. È quindi un repeat entro 30 giorni ammesso da un delta materiale esplicito e già previsto dallo stato canonico.

**Implementazione:** il grafo Teensy Audio su RT1176 usa SGTL5000 e SAI1. La creazione congiunta di `AudioOutputI2S` e `AudioInputI2S` richiamava `config_i2s()` due volte: il secondo soft reset cancellava `FRDE`, fermando il DMA TX e quindi `update_all()`. Il commit 0db101d porta sul ramo RT1176 la guardia già usata su IMXRT1062: ritorno immediato se TX o RX è attivo. Il percorso CMake/pin manifest resta nel progetto `rt1176-evkb` con toolchain Nosh e dipendenze fissate; il repository hardware aggiunge script di flash/reset e log di bring-up riproducibili.

**Misure e hardware:** su J8 line-out collegato a J9 line-in, 1 kHz sinistro e 1,5 kHz destro a −6 dBFS hanno prodotto 344 blocchi in 997 ms per canale, livello −6,5/−6,4 dBFS, THD −72/−73 dB, crosstalk −80/−84 dB e idle floor −85/−84 dBFS, senza blocchi persi. Il display RK055 720×1280 ha registrato zero underrun a 16 e 32 bpp mentre CPU, PXP ed eDMA copiavano SDRAM; il caso più pesante arriva a circa 340 MB/s sul SEMC a 132 MHz. La board offre RT1176 dual-core, 128 MB SDRAM, 512 Mb QSPI, SGTL5000 line I/O, MIPI DSI/touch, microSD, USB host/device e M.2; il repository include KiCad 10 a sei layer, BOM, CPL, Gerber e note JLCPCB. Licenze MIT per hardware e aggiunte RT1176 Audio.

**Perché vale la pena / Multi-Delay:** è raro vedere insieme correzione del lifecycle I²S, prova full-duplex, misure del percorso analogico e stress della memoria condivisa. Per il Custom Pedals Multi-Delay la rilevanza concreta è metodologica: adottare una guardia idempotente nell'inizializzazione codec/SAI, un test loopback che verifichi realmente il movimento dei blocchi e un carico SDRAM concorrente durante delay lunghi, UI e DMA. Sul Daisy Field il test va ricreato con BSP, codec, clock e DMA propri; non esiste evidenza di compatibilità Field.

**Caveat:** Nosh è una piattaforma community adiacente basata su i.MX RT1176, non Teensy 4.x; il core deriva dal modello Teensy ma usa CMake e pin/clock specifici. Nessuna release taggata o binario firmware; misure e validazione sono dell'autore, non replicate indipendentemente. La board è complessa da fabbricare (MAPBGA-289, sei layer, doppia assemblea) e non è un sostituto drop-in per Daisy o Teensy.

**Fonti primarie:** [Nosh hardware e bring-up](https://github.com/newdigate/nosh-dev-board) · [commit audio loopback 67baa65](https://github.com/newdigate/nosh-dev-board/commit/67baa658d2d3b908e623ee44863c159440ed922e) · [commit display/SDRAM 8e60560](https://github.com/newdigate/nosh-dev-board/commit/8e605609f76bc00cb27dd7a4edab1b62b228614b) · [fix Audio 0db101d](https://github.com/newdigate/Audio/commit/0db101dcdbd10b10dde08163922b601b71f92937) · [core e build RT1176](https://github.com/newdigate/rt1176-evkb)

## HOLD / esclusi

- **mrarm84/customFWVersioNE9in1:** nessun delta dopo il HOLD del 18 novembre; restano assenti licenza esplicita e prova hardware, mentre il README dichiara che il firmware non è ancora testato su Versio.
- **crotabiasetti/CarryOn-Hybrid-MIDI-Synth-ESP32-DaisySeed:** repository del 18 novembre con tre archivi ZIP, immagini e PCB, ma senza README, licenza o sorgenti navigabili; non è possibile verificare build, lineage o comportamento.
- **newdigate/Audio come voce autonoma:** il fix 0db101d è incluso nella voce Nosh/RT1176; non va duplicato come FOUNDATION_UPDATE separato.
- **bkshepherd/DaisySeedProjects v1.5.5:** la release emersa dall'indice è del 16 maggio, non dell'overlap; nessun nuovo evento canonico.
- **Daisy Community Projects e PJRC Audio Projects:** attività recente e reply non hanno prodotto un'altra release, commit o hardware qualificante verificato nel periodo.

## Analysed resources

Electro-Smith Daisy Community Projects/Examples, PJRC Teensy Audio Projects e thread correlati, GitHub repository/release/commit search, Codeberg/GitLab/SourceHut, Hackaday/Hackster, build log e pagine personali; sorgenti primarie Nosh, RT1176 core e Audio fork.

## Tracker updates

- `newdigate/rt1176-evkb` aggiornato come repeat materiale con ultimo alert **2026-11-19** e blocco fino al **2026-12-19**.
- `newdigate/nosh-dev-board` aggiunto a selected come riferimento eccezionale per hardware RT1176, full-duplex audio e stress SDRAM/display.
- Indice anti-repeat comune, source registry e prompt state aggiornati.

## Prompt improvement for next run

Mantenere un blocker material-delta verificabile per le famiglie multi-repository: una prova fisica prevista può riaprire entro 30 giorni, ma firmware, hardware e fork di libreria devono essere consolidati in una sola voce.

## Feedback / Tuning Questionnaire

1. Tenere gli RT1176/Teensy-derived nella corsia REF_PASS?
2. Dare più peso a misure audio o a release flashabili?
3. Preferire piattaforme complete o firmware direttamente portabili?
4. Quanto spazio dare a bring-up hardware complessi?
5. Cercare più thread PJRC solo quando linkano sorgenti canoniche?
6. Conservare una sola voce quando la qualità non giustifica filler?
