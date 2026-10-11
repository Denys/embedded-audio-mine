# Daisy + Teensy Watch — 2026-10-11

## Sintesi

Due aggiornamenti superano verifica primaria e anti-repeat:

1. **bkshepherd/DaisySeedProjects — PASS** — commit `8e9f468` del **2026-10-10 19:10 UTC**: richiamo combinato effetto/preset via MIDI Bank Select + Program Change, sincronizzazione UI/autosave corretta e CI `Build All` riuscita.
2. **FrankBoesing/ESP-beatsy-Audio-Library — REF_PASS / delta materiale entro 30 giorni** — head `4e1157d` del **2026-10-10 21:23 UTC**, 106 commit e 82 file oltre il baseline `5f6ffe0` pubblicato ieri: FFT 256/1024, RMS, numerosi effetti/filtri e nuovi generatori Karplus–Strong, drum, PWM, wavetable e noise.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano invariati i criteri di novità, verifica primaria, anti-repeat e rilevanza per DSP/audio firmware.

## Pre-flight / discovery audit

- Profilo: `daily_broad`.
- Data: 2026-10-11 Europe/Zurich; cutoff anti-repeat: 2026-09-11; overlap dal 2026-10-09 rispetto all'ultimo controllo riuscito del 2026-10-10.
- Main verificato a `0efefde0d4e9821c674e374c87f16c7056bb6cd9`; ispezionati README, AGENTS, regole v0.3, protocollo hidden-gems, policy anti-repeat, feedback state, registri pubblicati/selezionati/comuni, registry sorgenti, digest recenti e cronologia Codex/portable pertinente.
- Exa Search/Fetch: almeno **192 slot di risultato riusciti** più recupero delle pagine primarie. Un primo burst ha ricevuto HTTP 429 per il limite di 10 richieste/s; tutte le corsie interessate sono state ritentate in sequenza con successo, quindi non resta un blocco di copertura.
- Corsie distinte completate: Daisy Community Projects/Examples, PJRC Audio Projects, GitHub Daisy, GitHub Teensy, release/commit recheck, pagine personali/progetto e host alternativi.
- Pool: oltre dieci candidati plausibili. Le date dei reply e dell'indicizzazione non sono state usate come prova di release o firmware.

## 1. bkshepherd/DaisySeedProjects — PASS

### Evento verificato

- [Repository](https://github.com/bkshepherd/DaisySeedProjects).
- [Commit 8e9f468](https://github.com/bkshepherd/DaisySeedProjects/commit/8e9f468ab0d35b87fafa33b9da2f017a0e6a865b), **2026-10-10 19:10 UTC**, “Midi support for preset switching”.
- [Confronto da v1.6.1](https://github.com/bkshepherd/DaisySeedProjects/compare/v1.6.1...8e9f468ab0d35b87fafa33b9da2f017a0e6a865b): tre commit, sei file.
- [CI Build All riuscita](https://github.com/bkshepherd/DaisySeedProjects/actions/runs/38078746702), completata il **2026-10-10 19:15 UTC**.
- [Ultima release v1.6.1](https://github.com/bkshepherd/DaisySeedProjects/releases/tag/v1.6.1), **2026-09-26**, con asset firmware per 125B, 1590B, 1590B-SMD, Funbox e Terrarium; il commit MIDI non è ancora incluso.
- [Licenza MIT](https://github.com/bkshepherd/DaisySeedProjects/blob/8e9f468ab0d35b87fafa33b9da2f017a0e6a865b/LICENSE).

### Cosa è cambiato

- `PendingMidiBank` memorizza CC0/CC32; il successivo Program Change consuma il bank e richiama `SetActiveEffectAndPreset()`.
- Il sorgente implementa **Program Change = indice effetto** e **CC0×128 + CC32 = preset**. Un Program Change senza bank conserva la selezione effetto legacy.
- Il caricamento preset riallinea il tracking autosave e la UI evita che un valore menu obsoleto sovrascriva subito il preset richiamato.
- CC0 e CC32 diventano riservati; Multi Delay sposta Tap Mode da CC32 a CC33 e Reverb Delay rimappa il conflitto.
- La CI compila il commit corrente, quindi il delta ha un percorso di build verificato sul progetto.

### Hardware / eseguibilità

Il Makefile mantiene il target Daisy Seed con `BOOT_SRAM`, libDaisy/DaisySP e varianti 125B, 1590B, 1590B-SMD, Terrarium e Funbox; il target predefinito è 125B e `program-dfu` usa `dfu-util -w`. Gli asset v1.6.1 rendono credibile la catena build/flash, ma il nuovo mapping MIDI è soltanto su `main`.

### Perché vale l'esame

È un aggiornamento riusabile del control plane di un pedale multi-effetto: separa selezione algoritmo e selezione scena/preset senza rompere il comportamento Program Change esistente. La gestione UI/autosave risolve un dettaglio pratico importante nei recall live.

### Adattamento per Custom Pedals / Daisy Field

Come esperimento sul Multi-Delay, usare Program Change per scegliere la topologia o il blocco effetto e Bank Select per richiamare una scena di tap (tempi, feedback, pan, filtri, routing). Su Daisy Field il mapping va provato tramite un adapter MIDI/UI separato dal DSP e con test di recall atomico nel main loop; il repository non contiene un target Field, quindi **nessuna compatibilità Daisy Field è dichiarata**.

### Caveat

- Il nuovo codice non è ancora in una release o asset firmware.
- `USER_MANUAL_125B.md` descrive il mapping al contrario: bank come effetto e Program Change come preset. Sorgente e README confermano invece Program Change = effetto, bank = preset.
- Un bank parziale resta attivo fino al Program Change successivo; il controller deve inviare la sequenza completa per recall deterministico.
- La licenza principale è MIT, ma i moduli opzionali Dattorro restano GPL-3.0-or-later quando abilitati.

## 2. FrankBoesing/ESP-beatsy-Audio-Library — REF_PASS

### Evento verificato

- [Repository](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library).
- [Head 4e1157d](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/4e1157d6728ae6f91fbd657a91c67aac3b782ccb), **2026-10-10 21:23 UTC**.
- [Confronto dal baseline pubblicato 5f6ffe0](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/compare/5f6ffe0be41085d7061c7daee3077206721b76ad...4e1157d6728ae6f91fbd657a91c67aac3b782ccb): **106 commit, 82 file**.
- [Karplus–Strong 67b56fb](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/67b56fb), **2026-10-10 19:01 UTC**.
- [Effects pass 77bbee0](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/77bbee0), **2026-10-10 20:53 UTC**.
- [Licenza MIT](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/blob/4e1157d6728ae6f91fbd657a91c67aac3b782ccb/LICENSE); [nessuna release](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/releases).

### Perché il repeat è consentito

La pubblicazione del 2026-10-10 aveva baseline `5f6ffe0`. Il nuovo head non è attività cosmetica: aggiunge analizzatori, nuovi generatori e un ampio set di effetti/filtri con API Teensy-like; supera nettamente la soglia di delta materiale entro 30 giorni.

### Cosa è cambiato

- Analizzatori FFT256/FFT1024 con overlap 50%, RMS/print e backend comune: ESP-DSP radix-4 quando disponibile, fallback float radix-2 portabile altrimenti.
- Nuovi effetti e filtri includono bitcrusher, chorus, combine, Freeverb, mid/side, rectifier, reverb, wavefolder, waveshaper, ladder e state-variable.
- Nuovi generatori includono Karplus–Strong thread-safe, SimpleDrum, PWM, pink noise, tone sweep e wavetable.
- La documentazione ora espone task FreeRTOS, blocchi PCM, code I²S, decoder/network path, memoria FFT e lifetime dinamico del graph.
- Il vecchio esempio delay con simbolo SGTL5000 indefinito è stato rimosso e sostituito da `examples/Effects/Effect-Delay/Effect_Delay.cpp`, che usa ES8388/ES8311 e il delay PSRAM.

### Hardware / eseguibilità

`platformio.ini` conserva ambienti ESP32 Audio Kit/ES8388 e Freenove ESP32-S3/ES8311 con pin I²C/I²S, PSRAM, flash e codec dichiarati. Il progetto non pubblica release, asset firmware, workflow CI, check di commit, benchmark o prova hardware per il delta.

### Perché vale l'esame

Il valore è nell'architettura riusabile: grafo a blocchi 16-bit stile Teensy, separazione fra task audio/decoder/I²S, gestione esplicita del pool, FFT con fallback e una rapida espansione della superficie DSP. Karplus–Strong e SimpleDrum mostrano anche protezioni di stato fra controllo e task audio.

### Adattamento per Custom Pedals / Daisy Field

Usare Daisy Field soltanto come banco di porting: estrarre il backend FFT e uno o due effetti senza dipendenze ESP32, sostituire mutex/FreeRTOS con aggiornamenti di parametro lock-free o double-buffer, mantenere allocazioni fuori callback e misurare CPU, memoria e dropout a 48 kHz. Per il Multi-Delay, FFT/RMS possono alimentare metering o feedback ducking; Freeverb/wavefolder possono essere blocchi opzionali nei rami tap. Il repository non contiene BSP/build Field: **nessuna compatibilità Field è dimostrata**.

### Caveat

- Reference ESP32 WIP, non firmware Daisy/Teensy nativo.
- Nessun tag, release, CI, binary, benchmark o validazione hardware pubblica.
- L'esempio delay sostitutivo rimuove il blocco SGTL5000, ma conserva un oggetto `AudioOutputI2S i2s1` ridondante e non esiste prova automatica di compilazione.
- FFT1024 trattiene 8 blocchi da 128 campioni (16 con blocchi da 64); `AudioMemory()` va dimensionato di conseguenza.
- Molto codice deriva dall'API Teensy: verificare attribuzioni dei singoli file oltre alla licenza root.

## HOLD / esclusioni principali

- **Daisy forum** — la categoria Projects/Examples non offre un nuovo evento firmware verificabile dopo il controllo precedente; un reply recente non è stato trattato come release.
- **PJRC Audio Projects** — attività di thread senza nuovo commit/release primario verificato.
- **Ziforge/daisy-patch-algos** — README con conteggio superiore, ma l'ultima release resta build-9 del 1 marzo 2026; nessun evento corrente.
- **PZD, RidgeField, CHORALE, seq--23** — nessun delta materiale successivo alle baseline già pubblicate.
- **willbearfruits/daisypatcher, daisy-embassy, Phantasmagoria, spore** — fonti tecniche valide ma senza evento datato nel periodo di overlap.

## Prompt improvement for next run

- Bloccare DaisySeedProjects fino al 2026-11-10 salvo release/asset del nuovo MIDI mapping, correzione del manuale o ulteriore delta materiale.
- Bloccare ESP-beatsy fino al 2026-11-10 salvo tag/release, CI/build log, prova hardware o nuovo sottosistema DSP verificabile.
- Continuare a separare reply forum, commit, release e asset firmware.
