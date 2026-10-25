# Daisy + Teensy Watch — 2026-10-25

## Executive summary

Due elementi superano la verifica primaria e l'anti-repeat:

1. **Peteranthony1st/PZD-Daisy-Pod-Groovebox v3.0.0 — STRONG_PASS** — release del 2026-10-24 con due nuovi motori, sampler/OP-1 import, Grains a 16 voci e asset flashabili.
2. **nzimas/bigorna build 69 — REF_PASS** — nuovo firmware community per M-VAVE FM-1 con sei tracce, sequencer/pattern state, loop, DSP e test host/hardware; entra come architettura adiacente, non come compatibilità Daisy/Teensy.

PZD è un repeat entro 30 giorni dello stesso progetto rinominato. Il delta rispetto a v2.5.0 è materiale: nuovi motori e signal path, nuova gestione della libreria sample, ottimizzazione misurata di Grains, fix SD e nuovi asset firmware.

## Previous questionnaire feedback applied

none recorded. Nessuna preferenza è stata dedotta dal silenzio; restano invariati verifica primaria, anti-repeat e priorità Daisy/Teensy.

## Pre-flight / discovery audit

- Data Europe/Zurich: 2026-10-25; cutoff 30 giorni: 2026-09-25; overlap: 2026-10-22–2026-10-25.
- Ispezionati README, AGENTS, regole v0.3, hidden-gems, common anti-repeat, prompt state, publication/selected/common tracker, digest recenti, storia Codex weekly e portable weekly.
- La PR #31 del monitor 2026-10-23 è stata ricontrollata, i tre thread risultavano risolti/outdated, il commit non aveva status CI falliti e la PR era mergeable; è stata unita prima di creare questo branch.
- Profilo: `daily_broad`. Exa: 23 query, 216 slot richiesti, fetch primari; nessun errore di connessione o rate limit.
- Domini/superfici: Daisy Community, PJRC forum, GitHub, Codeberg, GitLab, SourceHut, Hackaday.io, altstrument e pagine personali/progetto. Più del 50% delle famiglie di dominio cercate non erano GitHub.
- Classi: forum specialistici, repository host, release/commit pages, indici firmware/RSS, build log/pagine personali.
- Famiglie query: forum/host-specific, release/commit datati, artifact/build, alternative host, lineage/recheck.
- Pool plausibile: **12** — PZD v3.0.0, Bigorna, ACID FM 0.2, Eight Bells 3.0.0, GHOULBOX 2.4, LOOM-8 0.7, Synthesthetic 0.2-beta, FM-1 Open, PJRC UAC2 async, Jeannie Teensy 4.1, Oopsy prerelease, PZD forum update. Due promossi; dieci HOLD/rejected.
- Registry: URL PZD aggiornato al rename; aggiunti Bigorna e altstrument Recent. Daisy/PJRC revalidati.
- Stop rule: dopo PZD/Bigorna, le lane GitLab/SourceHut/Hackaday e i recheck mirati non hanno prodotto un terzo candidato con evidenza e rilevanza comparabili.
- Search debt: recuperare l'URL canonico PJRC UAC2 e verificare un repository collegato; recheck Bigorna solo su release/tag o nuova misura; non ripetere PZD prima del 2026-11-24 senza delta materiale.

## Ranked entries

### 1. PZD-Daisy-Pod-Groovebox v3.0.0 — STRONG_PASS

**Evento verificato:** [v3.0.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.0.0), pubblicata il **2026-10-24 09:52:57 UTC**.

- Due motori nuovi: Ensemble a otto voci e SampleSynth, esposto come sampler cromatico o drum sampler a 24 slice.
- Import diretto di pack OP-1 `.aif/.aiff`, con splice e pitch dai metadata; libreria SD in bank numerati.
- Grains passa a 16 grains sovrapposti e la release dichiara circa **40% CPU in meno** rispetto alla precedente configurazione a 10.
- Fix SD per letture/scritture grandi disallineate e fix voce sampler in [db3779c](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/db3779c57b806517a161cca31a76bb53f9973979).
- Sorgente C/C++, [Makefile](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/main/src/Makefile), note di architettura e licenza MIT.
- Asset: `main.bin` 808,2 KB, bootloader 127,1 KB e template SD 9,1 MB. Flash via bootloader QSPI/SD o DFU.

**Hardware/elettronica:** Daisy Pod, OLED I2C SSD1306/SSD1309 su D11/D12, microSD FAT32 e MIDI opzionale. Gli ingressi Pod sono line-level: chitarra passiva o microfono richiedono front-end esterno.

**Perché vale l'esame:** è una dimostrazione concreta di memory tiering, più motori simultanei, storage audio e mixer/preset UI su STM32H7.

**Adattamento Multi-Delay / Daisy Field:** riusare il modello di send condivisi, mixer per motore, gestione SD e meter CPU per un banco di delay/tap. Il Field è solo il target di prova proposto: il repository non contiene una build Field; servono adapter BSP/UI e misure callback/memoria proprie.

**Caveat:** la release richiede rinominare cartelle v2.x; il dato “40% CPU in meno” è dell'autore, non riprodotto indipendentemente. Nessun target Field.

### 2. Bigorna build 69 — REF_PASS

**Evento verificato:** commit di pubblicazione [8cc680d](https://github.com/nzimas/bigorna/commit/8cc680de4a8b0836f73c49ad9759dd5a5c4e7212), **2026-10-24 19:30:44 UTC**; il precedente [c1efec3](https://github.com/nzimas/bigorna/commit/c1efec30556c6f4a43bfdc2cecd869a3061286fc) introduce AB NOISE e tre tipi di overdrive.

- Sei tracce, quattro macchine, 12 voci condivise su due core, step sequencer, parameter locks, pattern state e tre loop per traccia.
- Build 65–69 allinea mute, ingresso dei loop, transposition e salvataggio pattern al confine temporale corretto.
- DSP riusabile come riferimento: FM/noise, RAT-style clipping, wavefolder, slicer, delay/reverb/chorus send.
- Build/install: `setup.sh`, `build.sh`, `install.sh`; test host con Clang renderizzano DSP, schermate, pattern, loop e protocollo backup.
- Hardware documentato: USB MIDI, TRS MIDI, USB audio stereo 16-bit/44,1 kHz; l'autore riporta 1,8% CPU USB su Mac e prova su telefono Android.
- Licenza firmware GPL-3.0-only; sito/logo MIT.

**Perché vale l'esame:** mostra come pubblicare state di pattern, loop e parametri senza sfasare il render audio, con test host e telemetry.

**Adattamento Multi-Delay / Daisy Field:** usare pattern state e parameter locks come modello per snapshot di tap, feedback e filtri; usare transizioni al boundary e crossfade per evitare salti. Portare solo i contratti DSP/state, non HAL/toolchain JieLi. Nessuna compatibilità Field è dichiarata.

**Caveat:** target M-VAVE FM-1/AC791N, non Daisy/Teensy; nessun tag/release GitHub stabile ispezionato, e molte funzioni derivano da Tonitor/Felucca/SLOOP. REF_PASS, non firmware da flashare sul target di riferimento.

## HOLD / rejected

- **ACID FM 0.2:** build e prova device esistono, ma il commit indicizzato 7f1dd30 è una modifica di spec e BREAK/TAPE/generator sono ancora roadmap; HOLD.
- **Eight Bells, GHOULBOX, LOOM-8, Synthesthetic, Blue Hare:** activity/versione recente nell'indice FM-1, ma nessuna evidenza migliore dei due promossi per adattamento Daisy/Teensy in questa scansione.
- **PJRC UAC2 async 32-bit/786 kHz:** thread recente visibile nell'indice, ma URL canonico e repository/build collegato non sono stati recuperati; nessuna promozione.
- **Jeannie Teensy 4.1:** nuova attività forum, ma nessun commit firmware post-overlap verificato.
- **Oopsy prerelease:** attività del thread, senza evento primario nuovo verificato.
- **Sonido, BroTracker, D-TRK, Squatch, Mirth, PZD v2.5:** hard hold; nessun delta ulteriore oltre gli eventi già pubblicati, eccetto PZD v3.0.0.

## Analysed resources

Daisy Projects/Software/Latest, PJRC Audio Projects e ricerche thread dirette, release/commit GitHub, Codeberg, GitLab, SourceHut, Hackaday.io, altstrument Recent e repository primari dei candidati.

## Tracker updates

- `data/published-repo-log.csv`: PZD rinominato/aggiornato a v3.0.0; nuova riga Bigorna.
- `data/common-anti-repeat-index.csv`: righe equivalenti aggiornate.
- `data/hidden-gems-source-registry.csv`: canonical rename PZD; aggiunti Bigorna e altstrument.
- `data/selected-projects.csv`: invariato.

## Prompt improvement for next run

Migliorato: l'indice altstrument ha individuato la release PZD prima che GitHub Search la indicizzasse. Debole: PJRC continua a restituire l'indice senza URL canonico. Prossimo test: usare title-to-thread resolution e poi richiedere sorgente/repo prima di contare il candidato come verificato.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze.

- Q1: più Daisy / più Teensy / bilanciato.
- Q2: privilegiare release asset / misure / architettura.
- Q3: più DSP delay-granular / UI-storage / audio I/O-clock.
- Q4: mantenere massimo 2–3 finding / ampliare quando la qualità regge.
- Q5: repeat ancora più conservativo / attuale delta materiale.
- Q6: più forum / più alternative host / più commit-release.
