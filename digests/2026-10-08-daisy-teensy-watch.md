# Daisy + Teensy Watch — 2026-10-08

## Sintesi

Un solo aggiornamento supera la verifica primaria e l'anti-repeat:

1. **FrankBoesing/ESP-beatsy-Audio-Library — REF_PASS / delta materiale entro 30 giorni** — il merge `a558189` del **2026-10-07 20:47 UTC**, successivo al controllo precedente, aggiunge negoziazione del sample rate fra decoder MP3/AAC e uscita I²S, riconfigurazione live del clock hardware, parsing incrementale dei metadati ICY e pinout codec/I²S configurabile.

La ripetizione è ammessa perché il delta cambia il confine fra decoder, scheduler e trasporto audio; non è un aggiornamento cosmetico. Nessun nuovo progetto o rilascio Daisy/Teensy nativo ha raggiunto lo stesso livello di evidenza nel periodo post-scan.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Sono rimasti invariati i criteri di novità, verifica primaria, anti-repeat e rilevanza per DSP/audio firmware.

## Pre-flight / discovery audit

- Profilo: `daily_broad`.
- Data: 2026-10-08 Europe/Zurich; cutoff anti-repeat: 2026-09-08; overlap dal 2026-10-06.
- Main verificato a `be73e5766b0dbfc07ed78a2515963698b43335d9`; ispezionati README, AGENTS, regole v0.3, protocollo hidden-gems, policy anti-repeat, feedback state, registri pubblicati/selezionati/comuni, registry sorgenti, digest recenti e cronologia Codex/portable pertinente.
- Exa Search/Fetch: **390 slot di risultato** complessivi, incluse ripetizioni/retry richiesti dalla skill; nessun rate limit o problema di connessione.
- Corsie distinte: Daisy Community Projects/Software, PJRC Audio Projects, GitHub Daisy, GitHub Teensy, release, Codeberg, GitLab, SourceHut, Hackaday, pagine personali e recheck dei progetti già pubblicati.
- Domini/classi: almeno dieci domini; forum specialistici, repository/release, forge alternativi, blog personali/build log e pagine vendor/community. La maggioranza delle corsie di discovery era non-GitHub.
- Pool: oltre 15 candidati plausibili, fra cui daisy-rs, Spore, PENDA, DSPi, AMEN_MINI, haptic-fields, PC-1, PZD Looper e i recenti progetti bloccati.
- Registry: aggiunta la categoria primaria Daisy Community Projects; indice PJRC Audio Projects ricontrollato.
- Stop rule: due batch indipendenti dopo il candidato promosso — forum/host alternativi e recheck delle cronologie primarie — non hanno prodotto una seconda voce qualificante.

## 1. FrankBoesing/ESP-beatsy-Audio-Library — REF_PASS (delta materiale entro 30 giorni)

### Evento verificato

- [Repository](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library).
- [Merge a558189](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/a55818903d5139944cac5c6052f8873caa5d546a), 2026-10-07 20:47 UTC, **+339/−202 in 15 file**.
- [I²S setSampleRate c3c1881](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/c3c18811a21d363bf60773c018a548cef22bd187), 2026-10-07 12:10 UTC.
- [Decoder/sample-rate bridge 9447580](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/9447580e257bf1f093ff258df9153f375d5632be), 2026-10-07 18:44 UTC.
- [ICY parser 634e40a](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/634e40a713a1b40ba0341dd0960795fe330d80ee), 2026-10-07 19:54 UTC.
- [Codec/I²S pin configuration 15008ad](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/15008ad30456c9fc5d79cb3cf3c19d731f78e0ae), 2026-10-07 20:46 UTC.
- [Licenza MIT](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/blob/main/LICENSE).

### Perché il repeat è consentito

Il digest del 7 ottobre aveva fermato la verifica al commit `7fb23d7` del 6 ottobre: graph/block scheduler, ADSR thread-safe e demo polifonica. Tutti i commit sopra sono successivi a quella baseline e modificano il percorso runtime di streaming e clock. L'override deriva quindi da un delta architetturale verificato, non da README, stelle o metadata.

### Cosa è cambiato

- `AudioOutputI2S::setSampleRate(float)` svuota la coda, disabilita il canale I²S, riconfigura il clock, riabilita l'hardware e aggiorna lo stato globale solo dopo successo.
- `AudioDecoderStream` espone una callback di negoziazione; i decoder MP3/AAC possono richiedere il rate della sorgente invece di rifiutare automaticamente stream non uguali al rate corrente.
- La sorgente di rete mantiene un ring da 128 KiB in PSRAM e ora estrae `StreamTitle` incrementalmente in chunk limitati, con doppio buffer da 256 byte, senza conservare l'intero blocco ICY.
- Pin I²C, amplifier-enable e I²S sono portati in strutture/configurazione PlatformIO, separando meglio il core audio dalla scheda ES8388 concreta.
- L'esempio radio collega decoder e cambio rate tramite callback e non forza più a priori 48 kHz.

### Perché vale l'esame

Il punto utile è il contratto esplicito fra tre domini con tempi diversi: decoder software, graph audio a blocchi e periferica I²S. È un problema reale nei player embedded: il formato sorgente può cambiare mentre il callback audio deve rimanere non bloccante e la periferica possiede il clock.

### Adattamento per Custom Pedals / Daisy Field

Per il Multi-Delay conviene riusare il pattern come **state machine di reconfigurazione**, non portare il codice ESP32:

1. richiesta di cambio formato fuori dal callback;
2. mute/crossfade;
3. drain o invalidazione controllata dei blocchi;
4. riconfigurazione del trasporto;
5. reset dei buffer delay dipendenti dal sample rate;
6. riavvio con telemetria di underrun e tempo di transizione.

Sul Daisy Field il codec e il BSP sono diversi e normalmente il progetto dovrebbe mantenere un sample rate fisso. Un test Field utile sarebbe quindi simulare la transizione o il cambio preset/formato e verificare ownership dei blocchi, assenza di click e validità dei coefficienti. **Il repository non contiene né dimostra una build Daisy Field.**

### Build e hardware

Resta il percorso PlatformIO/Arduino per ESP32 Audio Kit V2.2 con PSRAM, ES8388, SD_MMC e 48 kHz come baseline. Il commit rende configurabili i pin codec/I²S e aggiunge il cambio rate runtime, ma non introduce un nuovo target Teensy o Daisy.

### Caveat

- Progetto esplicitamente Work in Progress su ESP32, non firmware Teensy/Daisy.
- Nessun tag, release binaria o asset flashabile accompagna il delta.
- Non sono presenti workflow CI o nuove misure hardware di latenza, glitch, underrun o stabilità durante il cambio rate.
- Il merge è verificato a livello sorgente; il comportamento fisico del passaggio MP3/AAC fra rate diversi non è documentato con log o acquisizioni.
- La licenza root è MIT; i file derivati dalla PJRC Audio Library mantengono i notice upstream.

## HOLD / esclusioni principali

- **seq--23** — il solo commit post-scan `76eb980` rinomina “Digitakt” in “EXT IN” nel README; delta cosmetico.
- **CHORALE** — nessun commit successivo allo stato `e2b6ae3` già pubblicato.
- **TouchVink** — il target release aggiunto il 6 ottobre è packaging; hardware v0.2 resta non verificato e non giustifica una nuova segnalazione.
- **DSPi** — articoli del 7 ottobre, ma il repository primario si ferma al 5 agosto; la data della notizia non è un evento firmware.
- **daisy-rs, Spore, PENDA, AMEN_MINI, daisypatcher e haptic-fields** — pagine riemerse nelle ricerche, ma le cronologie primarie sono anteriori all'overlap.
- **Daisy Community/PJRC Audio Projects** — nessun nuovo rilascio o repository primario post-scan; i timestamp dei reply sono rimasti segnali di scoperta.
- **Capicola, GSP, M16, SPinMicroDexed, SPinSynth-T-LCD, hvcc, t-dsp, FireFlow e Alchemy SDK** — nessun ulteriore delta materiale dopo gli stati già pubblicati.

## Prompt improvement for next run

- Mantenere ESP-beatsy bloccato fino al 2026-11-07: una nuova ripetizione richiede release/tag, prova hardware del cambio rate, nuovo target o misure quantitative.
- Continuare il recheck commit-level dei progetti pubblicati nelle 24 ore precedenti: ha individuato il delta odierno che le query generiche non classificavano bene.
- Conservare la distinzione fra data dell'articolo, attività del forum e data primaria di commit/release.
- Search debt: cercare firmware Teensy con sorgenti su host alternativi; promuovere il thread PJRC contactless-keyboard solo dopo repository/schema/build pubblici.

Questionario omesso perché questa è un'esecuzione schedulata non interattiva.
