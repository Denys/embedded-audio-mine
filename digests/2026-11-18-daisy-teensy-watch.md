# Daisy + Teensy Watch — 2026-11-18

## Executive summary

Una sola voce supera la soglia: **clevelandmusicco/HothouseExamples — STRONG_PASS (repeat materiale)**. La release **v26.11.02** aggiunge Neptune, un firmware Daisy Seed/Hothouse pronto da flashare che combina CloudSeed stereo con delay normale, octave-up e reverse. Il digest resta volutamente corto: il nuovo firmware Versio 9-in-1 ha sorgenti e binari ma manca di licenza esplicita e non è ancora stato provato sull'hardware; nessun evento Teensy verificato nell'overlap ha superato la soglia. Nessuna compatibilità Daisy Field viene assunta.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano attivi i gate su data canonica dell'evento, licenza, build/flash, prova hardware e separazione fra target Daisy Seed e Daisy Field.

## Pre-flight / discovery audit

- Data Europe/Zurich: **2026-11-18**; cutoff anti-repeat: **2026-10-19**; overlap: **2026-11-17–2026-11-18**, dall'ultimo scan riuscito del 17 novembre.
- Verificati README, AGENTS, regole v0.3/hidden-gems/common anti-repeat/feedback, registri published/selected/common, source registry, prompt state, digest del 17 novembre e history Codex settimanale.
- Profilo: `daily_broad`. Discovery Exa: **120 risultati richiesti** in 12 ricerche distinte, con angoli separati Daisy forum, PJRC/Teensy, GitHub release/commit, host alternativi, build log, hardware artifact, DSP architecture e pagine personali.
- Copertura: almeno 7 domini, almeno 4 classi e almeno 3 famiglie di query; oltre metà dei domini non GitHub. Ispezionati almeno 10 candidati plausibili e una corsia indipendente aggiuntiva dopo il primo candidato pubblicabile.
- Le date di indice e i reply forum sono stati usati solo per discovery; release, commit e file sono stati verificati sulle pagine primarie.
- Source registry: aggiunte le pagine Neptune e customFWVersioNE9in1; Daisy Community e PJRC Audio Projects rivalidate. Nessuna pagina bloccata, morta o spostata.
- Debito successivo: cercare una licenza e una prova hardware per customFWVersioNE9in1; risolvere nuovi thread PJRC soltanto quando puntano a sorgenti, release o hardware canonici.

## Ranked entries

### 1. clevelandmusicco/HothouseExamples — STRONG_PASS · repeat materiale

**Che cosa è cambiato:** la release **v26.11.02**, pubblicata il **2026-11-17 12:31 UTC**, porta il nuovo firmware **Neptune**; il commit sorgente è **e8cb61dee41c615b3aec0f2e439195faf2e19853** del **2026-11-17 12:14 UTC**. Il precedente alert del repository risaliva al 23 maggio, quindi il blocco di 30 giorni era già scaduto; in ogni caso il nuovo algoritmo e il nuovo asset firmware costituiscono un delta materiale verificato.

**Implementazione:** CloudSeed stereo ridotto a due delay line per lato per entrare nel budget del Seed, tre preset reverb, delay fino a 4 s in modalità normale, octave-up o reverse, tre topologie di routing (delay in parallelo, delay verso reverb, serie), bypass con trails e crossfade d'ingresso di circa 5 ms. L'ingresso predefinito è mono-in/stereo-out; `NEPTUNE_TRUE_STEREO=1` abilita il true stereo a compile time. Il codice usa SDRAM per pool CloudSeed e delay line, allineamento a 8 byte e filtri separati per i due canali.

**Build/flash e licenze:** `make` e `make program-dfu` con libDaisy/DaisySP; `BOOT_NONE`, senza Daisy bootloader. Il README dichiara circa il 93% della flash interna. La release include `neptune.bin` da **121.540 byte** con digest SHA-256 pubblicato. Il port è GPL-3.0; gli avvisi MIT per GuitarML Neptune, CloudSeed, Veno-Echo e DaisySP sono conservati.

**Hardware/elettronica:** target Hothouse, un carrier pedal stereo per Daisy Seed. Non ci sono prove sorgente/build per Daisy Field, quindi il Field resta solo un target di adattamento.

**Perché vale la pena / Multi-Delay:** la parte più riusabile è la separazione fra delay engine, routing e policy di bypass/trails. Per il Custom Pedals Multi-Delay conviene estrarre le tre delay mode dietro una stessa interfaccia, riusare la matrice parallelo/send/serie e portare il crossfade di engage prima di aggiungere preset o modulazioni. Sul Daisy Field il primo passo concreto è sostituire il BSP Hothouse, mappare audio stereo/controlli e poi misurare flash, SDRAM e callback; non va trattato come compatibile senza questa prova.

**Caveat:** firmware ottimizzato per Hothouse/Seed; CloudSeed usa un pool SDRAM da 48 MiB e il binario occupa quasi tutta la flash interna dichiarata; il cambio preset azzera i buffer e perde la coda con un mute di circa 20 ms; nessuna misura indipendente di CPU, latenza, rumore o stabilità è pubblicata.

**Fonti primarie:** [release v26.11.02](https://github.com/clevelandmusicco/HothouseExamples/releases/tag/v26.11.02) · [commit e8cb61d](https://github.com/clevelandmusicco/HothouseExamples/commit/e8cb61dee41c615b3aec0f2e439195faf2e19853) · [sorgente e README Neptune](https://github.com/clevelandmusicco/HothouseExamples/tree/main/src/Neptune) · [Makefile](https://github.com/clevelandmusicco/HothouseExamples/blob/main/src/Neptune/Makefile)

## HOLD / esclusi

- **mrarm84/customFWVersioNE9in1:** nuovo repository Daisy Seed/Noise Engineering Versio del 18 novembre con motore a otto voci, otto kit, sequencer, CTRL-ALL, MIDI/clock, sorgente C++, submodule libDaisy/DaisySP bloccati e due binari bootloader. HOLD perché il repository non dichiara una licenza e il README afferma “not yet tested on hardware”. Promozione minima: licenza esplicita più prova reale audio/trigger/UI su Versio.
- **bobpuley/ds-ide 0.25.1:** repeat dentro 30 giorni; refresh su modifiche esterne e guida AI non cambiano materialmente il valore firmware/DSP rispetto a 0.25.0.
- **Wasted-Audio/hvcc:** commit nell'overlap limitati ad aggiornamenti di dipendenze; nessun nuovo target Daisy/Teensy o asset firmware.
- **algomusic/M16:** compatibilità API filtro, esempio di voice allocation e MIDI-thru non raggiungono una nuova release o un delta architetturale abbastanza forte.
- **ejtb76/amenity / FM-1:** nuova copertura editoriale, ma il repository è già bloccato fino al 2 dicembre e non è emerso un delta primario materiale.
- **PJRC Audio Projects:** nessun nuovo thread ha prodotto un evento canonico post-overlap con sorgente, release o hardware sufficienti.

## Analysed resources

Electro-Smith Daisy Community Projects/Examples, PJRC Teensy Audio Projects e thread correlati, GitHub repository/release/commit search, Codeberg/GitLab/SourceHut, Hackaday/Hackster, Reverbose, HardLabs, PCBKit, pagine personali Static90 e dgorbunov, pagine universitarie e documentazione primaria dei candidati.

## Tracker updates

- `clevelandmusicco/HothouseExamples` aggiornato con ultimo alert **2026-11-18** e nuovo hard block fino al **2026-12-18**.
- Neptune aggiunto a selected come riferimento eccezionale per routing multi-delay/reverb, trails e build DFU.
- Indice anti-repeat comune, source registry e prompt state aggiornati.

## Prompt improvement for next run

Mantenere un gate separato per firmware “ready-to-flash ma non hardware-tested”: richiedere licenza esplicita e almeno una prova reale di audio/I/O prima del ranking, anche quando build, binari e architettura DSP sono forti.

## Feedback / Tuning Questionnaire

1. Preferire più firmware pedal-ready o più architetture DSP sperimentali?
2. Trattare i progetti senza prova hardware come HOLD automatico?
3. Quanto peso dare a binari pronti rispetto a misure CPU/audio?
4. Dare priorità a delay/reverb e routing utili al Multi-Delay?
5. Cercare più profondamente nei thread PJRC storici con nuovi commit collegati?
6. Conservare una sola voce quando la qualità non giustifica filler?
