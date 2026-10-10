# Daisy + Teensy Watch — 2026-10-10

## Sintesi

Una voce supera verifica primaria e anti-repeat:

1. **FrankBoesing/ESP-beatsy-Audio-Library — REF_PASS / delta materiale entro 30 giorni** — head verificato `5f6ffe0` del **2026-10-09 12:20 UTC**, dodici commit e 34 file oltre il baseline `2dcef25` pubblicato il 9 ottobre. Il delta aggiunge un delay a otto uscite con ring buffer PSRAM, oscillatori sine e sine hi-res, una base comune `AudioPlayer` e ripristina l'istanza ES8388 che risultava assente al controllo precedente.

Il repeat è ammesso perché introduce nuovi oggetti DSP/sintesi e corregge un blocco concreto del target hardware esistente. Resta una reference WIP: nessun tag, release, CI o prova hardware pubblica; l'esempio del delay non compila nello stato corrente.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Sono rimasti invariati i criteri di novità, verifica primaria, anti-repeat e rilevanza per DSP/audio firmware.

## Pre-flight / discovery audit

- Profilo: `daily_broad`.
- Data: 2026-10-10 Europe/Zurich; cutoff anti-repeat: 2026-09-10; overlap dal controllo riuscito del 2026-10-09.
- Main verificato a `30664eb717f4ad42620ca277978e80ba4bf1abc9`; ispezionati README, AGENTS, regole v0.3, protocollo hidden-gems, policy anti-repeat, feedback state, registri pubblicati/selezionati/comuni, registry sorgenti, digest recenti e cronologia Codex/portable pertinente.
- Exa Search/Fetch: **330 slot di risultato** in discovery più recupero diretto delle pagine primarie; connessione riuscita, nessun rate limit.
- Corsie distinte: Daisy Community Projects/Examples, PJRC Audio Projects, GitHub Daisy, GitHub Teensy, release/commit recheck, Hackaday, pagine personali, package/vendor pages e host alternativi.
- Domini/classi: almeno sette domini e cinque classi; forum specialistici, repository/commit, articoli tecnici, pagine progetto e registri/package. Più della metà delle corsie di discovery era non-GitHub.
- Pool: oltre dieci candidati plausibili, inclusi ESP-beatsy, RidgeField, PZD, DSY-OTT, Ziforge/daisy-patch-algos, Hoopi Pedal, seedBox, NI404, DaisySP_Teensy, CHORALE e seq--23.
- Stop rule: dopo il primo delta potenzialmente pubblicabile sono state completate corsie indipendenti forum, host alternativi e recheck commit/release. Nessun secondo candidato ha prodotto un evento nuovo verificabile.
- Le date dei reply e dell'indicizzazione non sono state usate come prova di release o firmware.

## FrankBoesing/ESP-beatsy-Audio-Library — REF_PASS

### Evento verificato

- [Repository](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library).
- [Head 5f6ffe0](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/5f6ffe0be41085d7061c7daee3077206721b76ad), **2026-10-09 12:20 UTC**.
- [Confronto dal baseline pubblicato 2dcef25](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/compare/2dcef25c859e7dfe9a2a12de72cd50a17f800b6a...5f6ffe0be41085d7061c7daee3077206721b76ad): 12 commit, 34 file.
- [Commit delay 65323e5](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/65323e57f5cdac0cd6603ca15f7d75c8ca4876e4), **2026-10-09 09:44 UTC**.
- [Commit synth_sine 9ed1542](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/9ed154235c8034945b4888e30116922c730f491b), **2026-10-09 10:16 UTC**.
- [Licenza MIT](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/blob/5f6ffe0be41085d7061c7daee3077206721b76ad/LICENSE).
- [Nessuna release pubblicata](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/releases).

### Perché il repeat è consentito

Il record del 2026-10-09 aveva baseline `2dcef25` del 2026-10-08 21:10 UTC. La testa `5f6ffe0` è dodici commit oltre quella baseline. Non si tratta di README, stelle o attività generica: sono entrati nuovi oggetti DSP, un'astrazione player riusabile e il fix del simbolo `codec` ES8388 che ieri rendeva il target principale apparentemente non compilabile.

### Cosa è cambiato

- **`AudioEffectDelay`**: ring buffer di campioni `int16_t`, allocazione lazy fino a 4000 ms, preferenza PSRAM con fallback RAM interna, otto tap indipendenti e zero-fill quando manca l'ingresso. Il buffer include un blocco extra per evitare che la lettura massima cada sui campioni in scrittura.
- **`AudioSynthWaveformSine`**: accumulatore di fase a 32 bit e tabella sinusoidale; la fase continua anche quando il pool non consegna un blocco.
- **`AudioSynthWaveformSineHires`**: uscita Q1.31 divisa in due stream da 16 bit, con calcolo `sinf` e avanzamento di fase anche in mute o allocation failure.
- **`AudioPlayer`**: interfaccia comune per MP3/AAC/WAV/Opus, match MIME, posizione/durata, errori e metriche opzionali; l'esempio radio seleziona MP3 o AAC senza branch codec-specifici.
- **Target ES8388 ripristinato**: `src/main.cpp` istanzia nuovamente `AudioControlES8388 codec({...})` sotto `AUDIO_CODEC_ES8388`, risolvendo la regressione osservata al baseline precedente.
- Il percorso I2S conserva il callback esterno al clock audio, una coda non bloccante che scarta il blocco più vecchio in overflow e un task TX separato.

### Hardware ed eseguibilità

`platformio.ini` mantiene due ambienti: ESP32 Audio Kit/ES8388 e Freenove ESP32-S3 Display 2.8/ES8311, con pin I²C/I²S, polarità PA, flash e PSRAM dichiarati. La libreria è MIT e il codice del delay conserva l'avviso/licenza del Teensy Audio Library originale.

Non risultano tag, asset firmware, workflow CI o status di commit. Il nuovo esempio `examples/effect-delay/main.cpp` non è un percorso di build affidabile: dichiara l'adapter ES8388/ES8311 come `codec`, ma in `setup()` chiama `sgtl5000_1.enable()` e `sgtl5000_1.volume()` mentre l'istanza SGTL5000 è commentata. La prova hardware del delay e del sine hi-res non è documentata.

### Perché vale l'esame

Il delay porta nel modello Teensy Audio un confine utile per un pedale multi-tap: un solo storage circolare, otto lettori con offset indipendente e allocazione esplicita della memoria lunga. La gestione della fase negli oscillatori mostra inoltre un comportamento deterministico quando il pool audio è sotto pressione. L'interfaccia `AudioPlayer` è un esempio di separazione fra sorgente/decoder e graph audio.

### Adattamento per Custom Pedals / Daisy Field

Per il Multi-Delay conviene prototipare la stessa separazione su Daisy Field come **esperimento di porting**, non come compatibilità dichiarata:

1. spostare il buffer lungo in SDRAM e mantenere nel callback solo indici e letture contigue;
2. usare una struttura tap con delay, gain, pan, feedback e stato di smoothing;
3. aggiungere interpolazione frazionaria e crossfade quando il tempo cambia;
4. misurare cicli, cache miss, memoria e dropout a 48 kHz per 1/2/4/8 tap;
5. mappare encoder, potenziometri e display Field con un adapter BSP separato dal core DSP.

Il repository è ESP32/Arduino e non contiene target, BSP o build Daisy Field: **nessuna compatibilità Field è dimostrata**.

### Caveat

- Progetto WIP adiacente, non firmware Daisy/Teensy nativo.
- Nessun tag, release binaria, CI, status o log di compilazione pubblicato.
- L'esempio del delay contiene il riferimento SGTL5000 residuo e non compila così com'è.
- Il delay usa offset interi: niente interpolazione, smoothing o feedback interno.
- L'allocazione avviene alla prima chiamata `delay()`; va tenuta fuori dal percorso real-time.
- Sine hi-res usa `sinf` per campione: occorre misurare il costo sul target reale.
- Nessun risultato di benchmark o prova hardware pubblicato per i nuovi oggetti.

## HOLD / esclusioni principali

- **RidgeField** — reply recente, ma repository ancora fermo a `8424879` del 2 ottobre; nessun delta materiale dopo la pubblicazione.
- **PZD** — attività forum del 7 ottobre, ma nessun nuovo commit/release primario post-scan verificato.
- **Ziforge/daisy-patch-algos** — build-9 e pacchetto di 99 binari sono del 1 marzo 2026; infrastruttura interessante ma non un evento corrente.
- **DSY-OTT** — sorgente GPL e percorso Daisy reale, ma il progetto risale a maggio e non è emerso un evento del 9–10 ottobre.
- **Helix 511** — pagina secondaria del 9 ottobre senza repository canonico e con specifiche Daisy incongruenti; respinta per assenza di artefatto primario credibile.
- **PJRC Audio Projects** — risultati recenti erano reply/indicizzazione di thread precedenti; nessuna release o modifica firmware datata è stata verificata.
- **CHORALE, seq--23 e gli altri record recenti** — nessun commit/release materiale successivo alle rispettive baseline.

## Prompt improvement for next run

- Bloccare ESP-beatsy fino al 2026-11-09 salvo tag/release, CI/build log, fix dell'esempio delay, prova hardware o nuovo oggetto DSP sostanziale con percorso compilabile.
- Cercare esplicitamente risultati di benchmark e issue/PR che correggano l'esempio `effect-delay`.
- Continuare a separare data del reply forum, data del commit e data della release.

## Feedback richiesto

Quale direzione è più utile per i prossimi alert: **DSP riusabile**, **hardware verificabile** o **release pronte da flashare**?
