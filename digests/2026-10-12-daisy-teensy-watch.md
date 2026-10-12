# Daisy + Teensy Watch — 2026-10-12

## Sintesi

Due aggiornamenti superano verifica primaria e anti-repeat; entrambi sono repeat consentiti da un delta materiale verificato:

1. **Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper — STRONG_PASS** — release flashabili **v2.1.0** e **v2.2.0** del 2026-10-11: nuovo riverbero Dattorro, undo dell'overdub senza copia bulk, count-in, routing MIDI per motore e correzione dei limiti di loop.
2. **FrankBoesing/ESP-beatsy-Audio-Library — REF_PASS** — head **895d5a2** del 2026-10-11 22:08 UTC: 128 commit e 32 file oltre il baseline pubblicato, con trasporto I2S condiviso e nuovi output PDM e S/PDIF per il grafo AudioStream.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano invariati i criteri di novità, verifica primaria, anti-repeat e rilevanza per DSP/audio firmware.

## Pre-flight / discovery audit

- Profilo: \`daily_broad\`, ristretto al monitor Daisy/Teensy.
- Data: 2026-10-12 Europe/Zurich; cutoff anti-repeat: 2026-09-12; overlap dal 2026-10-10 rispetto all'ultimo controllo riuscito del 2026-10-11.
- Main verificato a \`fd5e40f97a1c9012b88bda5b284995d12882ac01\`; ispezionati README, AGENTS, regole v0.3, protocollo hidden-gems, policy anti-repeat, feedback state, registry, log pubblicati/selezionati/comuni, digest recenti e cronologie Codex/portable pertinenti.
- Exa Search/Fetch: **144 slot di ricerca riusciti** in quattro workstream, più recupero delle pagine primarie; nessun rate limit o problema di connessione.
- Corsie distinte: Daisy Community Projects/Examples, PJRC Audio Projects, GitHub Daisy/Teensy/release/commit, pagine progetto e host alternativi.
- Le date dei reply e dell'indicizzazione sono state usate solo come lead. Il reply PZD è stato promosso soltanto dopo la verifica di release, asset e commit.
- Pool: oltre dodici candidati plausibili; la qualità ha imposto un digest di due voci.

## 1. PZD Daisy Pod 4 Track Looper — STRONG_PASS

### Evento verificato e delta anti-repeat

- [Repository](https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper).
- [Release v2.1.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper/releases/tag/v2.1.0), pubblicata **2026-10-11 09:47 UTC**, con \`main.bin\` da 611.028 byte e commit [1937f27](https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper/commit/1937f274a6e0874ec6909edfc16f47450ceb8405).
- [Release v2.2.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper/releases/tag/v2.2.0), pubblicata **2026-10-11 19:23 UTC**, con \`main.bin\` da 612.652 byte e head [2982f34](https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper/commit/2982f3435e51d2baaff0fa082c0727341aa1c25c).
- [Confronto dal baseline 0ae3e9e](https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper/compare/0ae3e9e3b238e4b19bd76f5593d4580b4e5e63f9...2982f3435e51d2baaff0fa082c0727341aa1c25c): otto commit e 17 file.
- [Thread Daisy](https://community.daisy.audio/t/pzd-daisy-pod-4-track-looper/9677): il reply dell'11 ottobre è stato trattato come discovery, non come prova.
- [Licenza MIT](https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper/blob/2982f3435e51d2baaff0fa082c0727341aa1c25c/LICENSE).

Il progetto era hard-blocked dalla pubblicazione v2.0.0 del 21 settembre. Il repeat è consentito perché v2.1.0/v2.2.0 introducono un nuovo algoritmo DSP, due release con asset firmware, una modifica della memoria/real-time path e nuove funzioni di looper/MIDI.

### Cosa è cambiato

- \`ReverbSc\` è sostituito da un port float della topologia plate figure-8 di Dattorro: 11 delay buffer statici, mono-in/stereo-out, sette parametri reali e memoria dichiarata di circa **166 KB** contro circa **386 KB**.
- Il port è stato confrontato off-target con l'implementazione double su una risposta all'impulso di 15.000 campioni, con errore relativo dichiarato di circa \`1.5e-7\`.
- L'undo dell'ultimo overdub usa un solo buffer SDRAM condiviso e copia i campioni durante la scrittura: la precedente pre-copia bulk provocava un glitch udibile sull'hardware.
- L'overdub riceve count-in e stop automatico dopo un passaggio; Dexed e Grains ricevono filtri MIDI separati Omni/1–16.
- Il limite Bars diventa funzione del BPM per evitare il troncamento silenzioso del loop; il formato performance sale a v13 mantenendo lettura di v11/v12.
- Drive, Bitcrush, Chorus, Tremolo, Phaser, AutoWah, Flanger e SVF vengono collocati in ITCM. Il Makefile mantiene \`BOOT_QSPI\`, linker custom e build libDaisy/DaisySP.

### Hardware, valore e adattamento

Il firmware è per **Daisy Pod**, con OLED I2C, SD FAT32 e bootloader separato; la release documenta anche il flash da SD. Per Custom Pedals Multi-Delay vale soprattutto la struttura send condivisa: un plate Dattorro più leggero può diventare un bus post-tap comune, con PreDelay/PreFilter/Diffusion/Damping come macro di coda. Su Daisy Field il test corretto è estrarre il reverb in un harness 48 kHz, mappare i controlli tramite un adapter Field separato e misurare callback, SDRAM e click durante l'automazione; il repository non contiene un target Field, quindi **nessuna compatibilità Daisy Field è dimostrata**.

### Caveat

- I parametri del riverbero non sono smussati e possono cliccare con energia nella tank.
- La stabilità di Decay vicino al 100% non è validata.
- L'undo è un solo slot globale, non una cronologia per layer.
- Il binario richiede il setup Pod/bootloader/OLED/SD previsto dal progetto; non è un asset Field.

## 2. ESP-beatsy Audio Library — REF_PASS

### Evento verificato e delta anti-repeat

- [Repository](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library).
- Head [895d5a2](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/895d5a2a0ef507571de75defd1dabd995ccf1dfe), **2026-10-11 22:08 UTC**.
- [Confronto dal baseline 4e1157d](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/compare/4e1157d6728ae6f91fbd657a91c67aac3b782ccb...895d5a2a0ef507571de75defd1dabd995ccf1dfe): **128 commit e 32 file**.
- [Commit documentazione PDM/S/PDIF 58c9ca4](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/58c9ca4c8e66fc33434fcd65e6b3869b1b85aba0), **2026-10-11 21:33 UTC**.
- [Licenza MIT](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/blob/895d5a2a0ef507571de75defd1dabd995ccf1dfe/LICENSE).

La baseline \`4e1157d\` era stata pubblicata il giorno precedente. Il nuovo head non è attività cosmetica: aggiunge trasporto audio, backend fisici e documentazione elettrica/API, quindi supera il gate di delta materiale entro 30 giorni.

### Cosa è cambiato

- \`AudioI2SPort\` centralizza allocazione controller/canale, pin, DMA callback, start/stop, ownership del clock e riconfigurazione del sample rate.
- Nuovi \`AudioInputI2S\` e output I2S2/I2S3 espongono controller multipli mantenendo un solo scheduler globale.
- \`AudioOutputPDM\` usa il convertitore hardware PCM→PDM di ESP-IDF: mono a una linea o stereo a due linee sui SoC compatibili, 16–48 kHz e cambio rate coordinato con coda/task audio.
- \`AudioOutputSPDIF1\` genera consumer IEC 60958 a 16 bit: BMC software, preamboli B/M/W, parity e channel status su I2S0; solo il pin DATA viene portato fuori.
- \`platformio.ini\` fornisce ambienti ESP32 Audio Kit/ES8388 e Freenove ESP32-S3/ES8311; l'API resta modellata sul grafo Teensy Audio.

### Hardware, valore e adattamento

PDM è un flusso 1-bit ad alta frequenza: richiede filtro passa-basso e amplificazione, non va collegato direttamente a un altoparlante. L'uscita S/PDIF è logic-level: per coax servono driver/impedenza/trasformatore adeguati, per ottico un trasmettitore compatibile. PDM, S/PDIF e I2S0 TX non possono convivere sullo stesso controller.

Per il Multi-Delay il valore è la separazione netta tra grafo DSP e backend di trasporto: può ispirare un'interfaccia di audio I/O sostituibile e un recorder/digital-out di test. Su Daisy Field l'adattamento è architetturale, non un port diretto: mantenere il DSP indipendente dal driver, usare il BSP/libDaisy per codec e callback, e validare latenza/clock con loopback. **Nessun build Field è presente.**

### Caveat

- È un riferimento ESP32 WIP, non firmware Daisy/Teensy nativo.
- Nessun tag, release asset, CI, benchmark o validazione hardware automatizzata.
- PDM è limitato dalle feature del SoC; la modalità stereo diretta non è disponibile su ogni ESP32.
- S/PDIF è solo TX su I2S0; niente RX, TDM o varianti controller 1/2.

## HOLD / esclusioni principali

- **PJRC Audio Projects** — thread/reply recenti, ma nessun nuovo commit/release primario qualificante.
- **DaisySeedProjects** — invariato a \`8e9f468\` dopo la pubblicazione del 2026-10-11.
- **RidgeField, CHORALE, seq--23, M16, hvcc, t-dsp** — nessun delta materiale post-baseline verificato.
- **Ziforge/daisy-patch-algos, spore, daisy-rs, daisy-embassy, willbearfruits/daisypatcher** — utili come riferimenti, ma senza evento firmware/hardware datato nel periodo di overlap.

## Prompt improvement for next run

- Bloccare PZD e ESP-beatsy fino al 2026-11-11 salvo release/asset, nuovo target, nuovo sottosistema DSP/I/O o prova hardware/measurement verificabile.
- Per PZD, controllare in particolare smoothing dei parametri Dattorro, stabilità Decay e un eventuale target oltre Pod.
- Per ESP-beatsy, richiedere prova hardware o CI prima di promuovere ulteriori rifiniture dei backend digitali.
- Continuare a separare reply forum, commit, release e asset firmware.
