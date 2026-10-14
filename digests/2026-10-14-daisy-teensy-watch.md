# Daisy + Teensy Watch — 2026-10-14

## Sintesi
Una voce supera verifica primaria e anti-repeat: **a7v7/libDaisy — FOUNDATION_UPDATE**. I fix community del 2026-10-13 correggono job SPI persi e attese DMA ottimizzate via in SPI/I2C/UART. Le patch sono ancora su branch del fork, non integrate nell'upstream.

## Previous questionnaire feedback applied
Nessuna risposta esplicita registrata; nessuna preferenza è stata inferita.

## Pre-flight / discovery audit
- Profilo `daily_broad`; data Europe/Zurich **2026-10-14**, cutoff a 30 giorni **2026-09-14**, overlap dal **2026-10-10** dopo lo scan riuscito del **2026-10-12**.
- Main sincronizzato: `8620fa27bf59d88aa05bd2a13fc69a09544eb464`. Letti README, AGENTS, regole v0.3, protocollo hidden-gems, anti-repeat policy, tracker, selected projects, common index, registry, digest recenti e Codex/portable weekly pertinenti.
- Corsie distinte: Daisy Projects/Examples, PJRC Audio Projects, GitHub source/commit/release, pagine hardware ufficiali e host alternativi. Domini emersi: `community.daisy.audio`, `forum.pjrc.com`, `github.com`, `daisy.audio`, `docs.daisy.audio`, `synthanatomy.com`, `hackaday.io`, `newreleases.io`, `discourse.zynthian.org`, `forum.electro-smith.com`.
- Pool: oltre 10 lead (libDaisy, Seed3 Dev Kits, PZD, ESP-beatsy, DaisySeedProjects, RidgeField, CHOMPI, seq--23, OndaKit, PC-1, hvcc, Plaitsy e Teensy USB multicanale). Due batch indipendenti aggiuntivi non hanno prodotto un secondo evento materiale.
- Exa Search/Fetch riuscito senza rate limit o errori di connessione. La skill Exa non era esposta da `skills__list`; seguite le istruzioni dei tool.
- Aggiornati i due indici forum e aggiunte pagine primarie per thread, fork, upstream e Seed3. Nessuna pagina necessaria morta/spostata.
- PZD ed ESP-beatsy restano bloccati fino al **2026-11-11** senza delta materiale. Il thread Teensy USB multicanale è storico con reply recente, senza nuovo codice/release. I Seed3 Dev Kits furono annunciati il 2026-09-29; nessun delta hardware datato dopo il 2026-10-12.

## 1. libDaisy: callback audio e code DMA — FOUNDATION_UPDATE

### Evidenza e date
- [Thread Daisy Community, 2026-10-13](https://community.daisy.audio/t/audio-callback-silently-lost-with-cmake-lto-steady-tone-instead-of-audio-cause-and-fix/9846).
- [Commit `daf9c30`](https://github.com/a7v7/libDaisy/commit/daf9c300b7ef2f8e44d57f9ac8141cbc5c1f2b01), **2026-10-08 20:54 UTC**: callback pointer `volatile` e assegnazione prima dello start DMA.
- [Commit `ff3559d`](https://github.com/a7v7/libDaisy/commit/ff3559d9cd7621c141e5e04ee4a29ef5dd33d905), **2026-10-13 16:43 UTC**: `SpiDmaJob::IsValidJob()` verifica il buffer in base alla direzione TX/RX/RX_TX.
- [Commit `44ecbfb`](https://github.com/a7v7/libDaisy/commit/44ecbfb9a5f6cbab540676e1338e0644a71b4615), **2026-10-13 16:43 UTC**: barriera compiler nei loop DMA SPI/I2C/UART.
- [Harness di test](https://github.com/a7v7/libDaisy/tree/spi-dma-queue-test/tools/spi_dma_queue_test) e [README test/build](https://github.com/a7v7/libDaisy/blob/spi-dma-queue-test/tools/spi_dma_queue_test/README.md). Licenza MIT; nessuna release o asset firmware nel fork.
- L'upstream [daisyaudio/libDaisy](https://github.com/daisyaudio/libDaisy) resta a `0808720` (v9.0.0, 2026-09-29); il PR list controllato il 2026-10-14 non mostra un fix corrispondente.

### Cosa cambia
1. **Callback audio sotto CMake/LTO:** GCC 15.2 poteva eliminare lo store del callback quando il main loop non leggeva quel puntatore. La DMA riproduceva un buffer stantio, con tono fisso. Il fix rende volatile i puntatori e li imposta prima dello start DMA.
2. **Job SPI TX-only/RX-only persi:** il vecchio `IsValidJob()` richiedeva entrambi i buffer; i job unidirezionali non risultavano validi. Ora si verifica il buffer coerente con la direzione.
3. **Attesa DMA eliminata:** GCC 10+ può rimuovere un loop su stato non-volatile modificato dall'ISR. La barriera in SPI/I2C/UART forza la rilettura della coda, evitando che il terzo job sovrascriva il secondo.

### Evidenza hardware e adattamento
Il test invia tre blocchi SPI da 64 byte (A/B/C) e verifica tre callback nello stesso ordine. Il README riporta prove su **Daisy Seed**, **Arm GNU Toolchain 15.2.Rel1**, CMake Release `-O3` con LTO il **2026-10-13**:

| Stato | Callback | Esito |
|---|---|---|
| libDaisy stock | A | B/C persi |
| Solo fix `IsValidJob()` | A, C | C sovrascrive B |
| Entrambi i fix | A, B, C | PASS |

Seriale USB, LED e analizzatore logico; pin Seed NSS D7, SCLK D8, Done D9, MOSI D10, GND. Il README documenta CMake/Ninja e flash `.hex` via ST-Link/STM32CubeProgrammer o `.bin` via Daisy Web Programmer. Risultati del maintainer, **non test rieseguiti indipendentemente**.

Non è un nuovo effetto DSP: è affidabilità audio/I/O. Per il **Custom Pedals Multi-Delay**, tenere callback e DMA test separati dal motore DSP. Con **Daisy Field** come target, verificare prima versione libDaisy, build flags e pin mapping; portare il test con un adapter verificato e ripetere CMake Release `-O3`/LTO più test SPI TX/RX, I2C e UART. Nessuna compatibilità Field è dimostrata.

### Caveat
- Fix non upstream-merged e non rilasciati; non adottarli alla cieca in produzione.
- Il test committato copre SPI TX-only; I2C/UART richiedono test specifici.
- `volatile` e compiler barrier sono fix mirati al modello ISR/toolchain, non sostituti universali della sincronizzazione C++.
- Nessun benchmark audio/DSP è dichiarato.

## HOLD / esclusioni
- **PZD** ed **ESP-beatsy**: nessun delta dopo il digest 2026-10-12; hard block fino al 2026-11-11.
- **Teensy USB multicanale**: reply su thread storico, senza nuova release/modifica primaria.
- **Seed3 Dev Kits**: lancio 2026-09-29, nessun nuovo delta hardware nel periodo di overlap.
- **OndaKit, PC-1, Plaitsy, RidgeField, CHOMPI, seq--23 e DaisySeedProjects**: nessun delta materiale post-baseline verificato.

## Prompt improvement for next run
Ricontrollare PR/merge in `daisyaudio/libDaisy`. Se i fix restano fork-only, dare priorità a un harness callback minimo con GCC 15.2/LTO e test distinti SPI TX/RX, I2C e UART. Non ripetere la voce per nuovi commenti: richiedere merge/release, nuova copertura o un altro bug riprodotto. Prompt delta: separare callback, validità job e attesa DMA come tre failure mode.

## Questionnaire
Rispondi con codici; nessuna risposta viene inferita dal silenzio.
- **Q1 Direzione:** A) continua; B) più bug core; C) più DSP; D) meno infrastruttura.
- **Q2 Priorità:** A) callback/DMA; B) DSP; C) UI/MIDI; D) audio I/O.
- **Q3 Prove:** A) test hardware; B) source+build; C) release binarie.
- **Q4 Target:** A) Field/Seed; B) Pod/Patch; C) Teensy 4.x; D) bilanciato.
- **Q5 Profondità:** A) breve; B) diff/codice; C) strumentazione.
- **Q6 Ricerca:** A) Daisy; B) PJRC; C) host alternativi; D) bilanciata.
