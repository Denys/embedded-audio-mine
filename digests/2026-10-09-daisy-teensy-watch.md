# Daisy + Teensy Watch — 2026-10-09

## Sintesi

Due voci superano verifica primaria e anti-repeat:

1. **skngh/RidgeField — PASS / nuovo progetto** — annuncio Daisy Community del **2026-10-08**; baseline sorgente `8424879` del **2026-10-02 21:14 UTC**. Pedale Daisy Seed con catena delay/pitch/bitcrusher/reverb, controller chitarra BLE separato, bridge UART-DMA, due PCB KiCad, Gerber, BOM, CAD meccanico e firmware completi.
2. **FrankBoesing/ESP-beatsy-Audio-Library — REF_PASS / delta materiale entro 30 giorni** — head `2dcef25` del **2026-10-08 21:10 UTC**, otto commit oltre il baseline pubblicato ieri: nuovo target Freenove ESP32-S3 Display 2.8 con codec ES8311, profili codec/PA configurabili, percorso mixer ottimizzato e harness di benchmark.

Il repeat ESP-beatsy è ammesso perché introduce un nuovo target hardware e cambia l'implementazione del mixer, non per attività generica. La testa corrente contiene però una probabile regressione di compilazione nel profilo ES8388 esistente; la voce resta quindi reference, non release pronta al flash.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Sono rimasti invariati i criteri di novità, verifica primaria, anti-repeat e rilevanza per DSP/audio firmware.

## Pre-flight / discovery audit

- Profilo: `daily_broad`.
- Data: 2026-10-09 Europe/Zurich; cutoff anti-repeat: 2026-09-09; overlap dal controllo riuscito del 2026-10-08.
- Main verificato a `fd8ef62b853d432e1243af4bf26c947c9ca79da6`; ispezionati README, AGENTS, regole v0.3, protocollo hidden-gems, policy anti-repeat, feedback state, registri pubblicati/selezionati/comuni, registry sorgenti, digest recenti e cronologia Codex/portable pertinente.
- Exa Search/Fetch: **410 slot di risultato** complessivi; connessione riuscita, nessun rate limit.
- Corsie distinte: Daisy Community Projects/Examples, PJRC Audio Projects, GitHub Daisy, GitHub Teensy, release/commit recheck, Hackaday, Adafruit, pagine personali, package/vendor pages e host alternativi.
- Domini/classi: almeno sette domini e cinque classi; forum specialistici, repository/commit, articoli tecnici, pagine progetto e registri/vendor. Più della metà delle corsie di discovery era non-GitHub.
- Pool: oltre dieci candidati plausibili, inclusi RidgeField, PZD, DSPi, il controller MIDI contactless del forum PJRC, Spore, daisy-rs, daisy-embassy, HexeFX, CHORALE, seq--23, TouchVink e FireFlow.
- Registry: aggiunto RidgeField; ricontrollati Daisy Community Projects, PJRC Audio Projects ed ESP-beatsy.
- Stop rule: dopo la prima promozione sono state eseguite corsie indipendenti PJRC, host alternativi e recheck commit/release; soltanto ESP-beatsy ha prodotto un secondo delta qualificante.

## 1. skngh/RidgeField — PASS

### Evento verificato

- [Annuncio Daisy Community](https://community.daisy.audio/t/made-a-bluetooth-guitar-pedal-using-the-daisy-all-the-files-are-available-for-free/9831), pubblicato il **2026-10-08**.
- [Repository RidgeField](https://github.com/skngh/RidgeField).
- [Baseline sorgente 8424879](https://github.com/skngh/RidgeField/commit/84248799c394b6eb5f874a9bd562d2a1a1d75cd8), **2026-10-02 21:14 UTC**.
- [Licenza MIT](https://github.com/skngh/RidgeField/blob/main/LICENSE).
- [Firmware Daisy](https://github.com/skngh/RidgeField/tree/main/Code/Daisy), [firmware ESP32-C3](https://github.com/skngh/RidgeField/tree/main/Code/ESP32), [hardware](https://github.com/skngh/RidgeField/tree/main/Hardware) e [file meccanici](https://github.com/skngh/RidgeField/tree/main/Enclosure).

La novità verificata è l'annuncio del 2026-10-08, successivo al controllo precedente; la data non viene attribuita al codice. Il sorgente corrente era già fermo al 2 ottobre ma non risultava pubblicato nei registri comuni.

### Architettura e DSP

- Un XIAO ESP32-C3 sulla chitarra legge MCP3208, due potenziometri, LDR, joystick e pulsante a 50 Hz; applica deadband e invia notifiche BLE solo quando i controlli cambiano.
- Un secondo XIAO ESP32-C3 nel pedale riceve BLE e inoltra al Daisy via UART a 115200 baud.
- Il frame UART è di 14 byte: sync `AA55`, cinque valori `uint16_t`, switch e checksum XOR.
- Sul Daisy USART1 usa RX DMA e ring buffer da 256 byte; il parser espone l'ultimo snapshot al callback audio.
- Il DSP gira a 48 kHz con blocchi da quattro campioni: delay → pitch shift → bitcrusher → riverbero Moorer con soft clip → dry/wet, in mono.
- I controlli remoti modulano delay time/feedback, riverbero via LDR, pitch e bitcrush via joystick; sono presenti latch e calibrazione LDR persistita in QSPI.

### Hardware ed eseguibilità

Il repository comprende due progetti KiCad 10 modificabili, Gerber pronti, BOM e file di posizionamento, FreeCAD/STL, template di foratura e parts list. La scheda pedale integra Daisy Seed, XIAO ESP32-C3, buffer I/O, TPS62163, TL072, mix e footswitch; il controller remoto integra XIAO, MCP3208, batteria e sensori.

Il percorso dichiarato richiede clone ricorsivo, Arduino IDE con pacchetto ESP32 e NimBLE-Arduino 2.x per i due sketch, quindi toolchain Daisy standard per il Makefile. Il Makefile si aspetta `libDaisy` e `DaisySP` due directory sopra; non sono documentati comandi DFU completi né un binario precompilato.

### Perché vale l'esame

È una reference rara e concreta per tenere radio e stack BLE fuori dal processore audio: due endpoint ESP32 isolano il controllo wireless e consegnano al Daisy un protocollo piccolo, mentre firmware, PCB ed enclosure restano ispezionabili. La separazione è direttamente riusabile in pedali dove RF, UI indossabile e callback real-time hanno domini di rischio diversi.

### Adattamento per Custom Pedals / Daisy Field

Per il Multi-Delay, il controller XY può pilotare coppie come delay-time/feedback, morph fra tap, freeze e diffusione. Prima del riuso conviene aggiungere:

1. sequence number monotono e timestamp;
2. timeout con failsafe su disconnessione;
3. snapshot atomico dei controlli per il callback;
4. smoothing e rate limit;
5. telemetria per perdita frame, jitter e riconnessione.

Il Daisy Field è soltanto il target di prova di riferimento: occorrono un nuovo adattatore BSP/pin/UI, una build Field esplicita e misure di jitter, rumore RF, glitch e budget CPU. **Il repository non contiene né dimostra compatibilità Daisy Field.**

### Caveat

- L'autore documenta beep udibili durante i trasferimenti dati.
- Manca il filtro passa-basso in uscita; il rumore ultrasonico può aliasare in looper a valle.
- L'hardware corrente è una revisione funzionante ma imperfetta; è pianificata una V2 a quattro layer.
- Nessun tag, release binaria, CI, misura di latenza/dropout/RF o caratterizzazione audio quantitativa.
- Il parser non usa lo stato `Connected()`: una disconnessione può lasciare valori di controllo obsoleti.
- Checksum XOR, assenza di sequence/timestamp e path assoluti in alcuni modelli KiCad richiedono irrobustimento.

## 2. FrankBoesing/ESP-beatsy-Audio-Library — REF_PASS (delta materiale entro 30 giorni)

### Evento verificato

- [Repository](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library).
- [Head 2dcef25](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/2dcef25c859e7dfe9a2a12de72cd50a17f800b6a), **2026-10-08 21:10 UTC**.
- [Nuovo target e mixer/benchmark 5c7c5ba](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/5c7c5ba9e3ee02aafc738e1aff72ffb72505da9e), **2026-10-08 14:05 UTC**.
- [Pin e polarità PA e68e522](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/e68e522cf4149f07aa08620ff4c9e6ea040319d4), **2026-10-08 19:57 UTC**.
- [Helper MIME radio 83bf6f6](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/83bf6f6f62703e9d8fb8d01ff28686b33823012b), **2026-10-08 21:09 UTC**.
- [Licenza MIT](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/blob/main/LICENSE).

### Perché il repeat è consentito

Il record del 2026-10-08 aveva baseline `a558189` del 7 ottobre. La testa attuale è otto commit oltre quella baseline e modifica 17 file. Il nuovo target Freenove ESP32-S3 Display 2.8/ES8311, la configurazione codec/PA e il percorso mixer sono delta materiali verificati successivi alla pubblicazione, quindi l'override dei 30 giorni è esplicito.

### Cosa è cambiato

- Nuovo ambiente PlatformIO `freenove_esp32_s3_display` per ESP32-S3 N16R8, flash 16 MiB e OPI PSRAM.
- Nuovo profilo codec ES8311 con pin I²C/I²S e amplifier-enable active-low; il profilo ESP32 Audio Kit resta ES8388 con PA active-high.
- Gli adapter ES8311/ES8388 ricevono polarità PA configurabile e mappatura I²C corretta.
- `AudioMixerN` aggiunge un fast path zero-copy quando esiste un solo ingresso a guadagno unitario e passa ad accumulo float channel-major con saturazione finale.
- `src/main.inomixerbench` misura deterministicamente cinque kernel, da 1 a 32 canali, 1000 run più 20 warm-up.
- Il softcodec rende più robusti reset, write-lock e wrap del producer buffer.
- L'esempio radio separa la classificazione MIME in `radiohelpers.h`, normalizza il content-type e mantiene il routing MP3/AAC.

### Perché vale l'esame

Il valore non è il porting ESP32 in sé, ma due confini riusabili: profilo scheda → adapter codec → trasporto I²S → graph audio, e mixer N-canali con fast path misurabile. Sono utili quando il numero di tap attivi cambia dinamicamente e il costo di somma/saturazione diventa parte del budget del callback.

### Adattamento per Custom Pedals / Daisy Field

Per il Multi-Delay conviene ricreare su Cortex-M7 il benchmark 1/2/4/8 tap, confrontando accumulo float, saturazione finale e bypass zero-copy, includendo cicli, memoria, denormal e clipping. Sul Daisy Field serve un profilo libDaisy specifico e test hardware separati; il codice ESP32/ES8311 non è portabile direttamente e **non dimostra compatibilità Field**.

### Caveat

- La testa corrente sembra rompere l'ambiente ES8388 esistente: sotto `AUDIO_CODEC_ES8388` la dichiarazione concreta di `codec` in `src/main.cpp` è commentata, ma il simbolo viene usato più avanti.
- Il nuovo profilo ES8311 e quello ES8388 non sono stati compilati o flashati in questo controllo.
- Il benchmark è presente come harness, ma non sono inclusi risultati misurati.
- Progetto WIP adiacente ESP32, non firmware Daisy/Teensy nativo.
- Nessun tag, release binaria, CI o prova hardware del nuovo target.

## HOLD / esclusioni principali

- **PZD** — nuova attività forum, ma repository fermo al 27 settembre; reply recenti non sono un evento firmware.
- **Velocity-sensitive contactless MIDI keyboard (PJRC)** — thread riemerso con attività recente, ma nessuna nuova release/repository primario post-scan è stata verificata.
- **DSPi** — articolo Adafruit dell'8 ottobre, ma nessun nuovo evento sorgente corrispondente; ripubblicazione editoriale di lavoro precedente.
- **seq--23** — unico cambiamento post-pubblicazione ancora cosmetico nel README.
- **CHORALE, M16, SPinMicroDexed/SPinSynth, TouchVink e FireFlow** — nessun commit/release materiale successivo ai rispettivi baseline.
- **Spore, daisy-rs, daisy-embassy, HexeFX e altri risultati ricorrenti** — sorgenti anteriori all'overlap o senza data primaria nuova.
- **Daisy/PJRC forum** — usati come discovery; date di reply e indicizzazione non sono state trattate come release.

## Prompt improvement for next run

- Bloccare RidgeField fino al 2026-11-08 salvo V2 hardware, misure, release/asset o protocollo fail-safe verificato.
- Bloccare ESP-beatsy fino al 2026-11-08 salvo fix verificato dell'ambiente ES8388, release/tag, prova hardware Freenove o risultati di benchmark.
- Continuare il recheck commit-level dei progetti pubblicati nelle 24 ore precedenti, ma richiedere sempre un delta materiale esplicito.
- Conservare la distinzione fra annuncio forum, data del sorgente e data di articolo.
- Search debt: approfondire host alternativi Teensy e promuovere il controller contactless PJRC solo dopo sorgenti/build/hardware pubblici.

Questionario omesso perché questa è un'esecuzione schedulata non interattiva.
