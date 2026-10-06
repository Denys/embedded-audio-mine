# Daisy + Teensy Watch — 2026-10-06

## Sintesi

Tre aggiornamenti superano le verifiche di data, sorgente, build/flash, licenza e anti-repeat:

1. **peculis/SPinMicroDexed — STRONG_PASS** — prerelease **v0.1.0**, pubblicata il **2026-10-05** dal commit `6eadf11`: primo pacchetto flashabile del port MicroDexed per Teensy 4.0, con HEX, source ZIP, schema, istruzioni e record di test CAT.
2. **peculis/SPinSynth-T-LCD — REF_PASS** — release **V1.1**, pubblicata il **2026-10-06**: rende disponibile come release il firmware stereo Freeverb, aggiunge schema/foto hardware e pubblica misure CPU/temperatura. Il codice DSP risale al commit `9e117eb` del 2026-08-07; la novità verificata è la release e il pacchetto di documentazione, non un nuovo commit DSP.
3. **algomusic/M16 — PASS (repeat con delta materiale)** — commit `bd0b813` del **2026-10-05**: dopo la pubblicazione del monitor precedente aggiunge un target hardware testato, Waveshare AI Smart Speaker/ESP32-S3, con bring-up ES8311/ES7210/TCA9555 e due esempi audio. È una ripetizione entro 30 giorni ammessa perché introduce un nuovo target e un livello codec/I/O riutilizzabile.

Nessun nuovo progetto Daisy forum o PJRC forum ha fornito, nell’overlap, un evento firmware primario comparabile. I timestamp di reply sono rimasti lead e non sono stati trattati come release.

## 1. peculis/SPinMicroDexed — STRONG_PASS

**Evento verificato**

- [Release v0.1.0](https://github.com/peculis/SPinMicroDexed/releases/tag/v0.1.0), pubblicata 2026-10-05 21:05 UTC, prerelease.
- [Commit 6eadf11](https://github.com/peculis/SPinMicroDexed/commit/6eadf11e78b49f0775114391cc4d82ac64169d7d), 2026-10-05 20:45 UTC, +136/−18 in 24 file.
- [Repository](https://github.com/peculis/SPinMicroDexed).
- Licenze preservate: [GPL-3.0](https://github.com/peculis/SPinMicroDexed/blob/main/LICENSE-GPL3.txt) per il derivato MicroDexed e [Apache-2.0](https://github.com/peculis/SPinMicroDexed/blob/main/LICENSE-APACHE2.txt) per componenti MSFA.

**Cosa è cambiato**

La v0.1.0 è il primo rilascio parziale installabile del port SPinMicroDexed: una singola istanza DX7-compatible su Teensy 4.0, con uscita simultanea Audio Shield e USB Audio. La release consolida:

- correzione del puntatore render-core non inizializzato che causava crash alla prima nota;
- rimozione dell’animazione LCD MIDI e cache dei contenuti invariati per ridurre traffico I2C e lavoro nel foreground;
- attese UI cooperative che continuano a servire MIDI durante messaggi temporizzati;
- confine `PLAYABLE` spostato dopo il lavoro iniziale della schermata voce e skip dei lookup banca quando la SD manca;
- velocity MIDI non più scalata da uno stato EEPROM obsoleto;
- salvataggi storage preparati in staging e record CAT separati per configurazioni, performance e banche.

Il motore FM non è nuovo: deriva da MicroDexed/Dexed/MSFA e mantiene l’aritmetica DX7-compatible. Il valore del delta è nell’integrazione hardware, nella disciplina di scheduling UI/MIDI/storage e nel pacchetto di validazione.

**Build, flash e hardware**

Target dichiarato e vincolato: Teensy 4.0 a 600 MHz, PJRC Audio Shield Rev D/D2 con SGTL5000, LCD1602 KEYES 3,3 V su I2C 0x27, due encoder, MIDI DIN, USB MIDI/Audio e microSD dello shield.

Percorso Arduino documentato:

1. aprire `SPinMicroDexed.ino`;
2. selezionare Teensy 4.0, 600 MHz, **Faster**, USB **Serial + MIDI + Audio**;
3. compilare e caricare con Teensyduino 1.62.0.

La release allega `SPinMicroDexed-0.1.0.hex` (773,6 KB), source ZIP (5,2 MB) e record di rilascio. Sono riportati bench case accettati per DIN/USB MIDI, USB Audio, caricamento banche e save/reload/overwrite di configurazioni e performance, incluso reload dopo riavvio.

**Perché vale l’esame**

È raro trovare un port Teensy di synth completo con binario flashabile, configurazione precisa, circuito hardware, record di accettazione progressivi e caveat espliciti. Le ottimizzazioni più trasferibili non sono nel core FM ma nel coordinamento fra callback audio, servizio MIDI, UI I2C e storage.

**Adattamento per Custom Pedals / Daisy Field**

Per il Multi-Delay, riusare come pattern il caching della UI, le attese cooperative e lo staging delle scritture preset/SD, mantenendo callback audio e mutazioni storage separati. Su Daisy Field il test di riferimento dovrebbe implementare solo questi pattern sopra libDaisy, con una coda parametri/preset e misure di dropout durante save/load. **Non esiste build o compatibilità Daisy Field**: il progetto dipende da Teensy Audio Library, SGTL5000 e specifico hardware SPinSynth.

**Caveat**

- È una prerelease con una sola istanza; effetti, USB Host MIDI e dual-instance sono disabilitati.
- Salvataggio nuove voice-bank, ricezione SysEx, errore no-card, latenza worst-case dei cambi patch, endurance della build finale e power-loss recovery non sono tutti bench-accettati.
- Il run di oltre 24 ore non identifica esattamente firmware e attività e non convalida le modifiche successive.
- Il source ZIP omette media patch con diritti di redistribuzione non stabiliti.

## 2. peculis/SPinSynth-T-LCD — REF_PASS

**Evento verificato**

- [Release V1.1](https://github.com/peculis/SPinSynth-T-LCD/releases/tag/V1.1), pubblicata 2026-10-06 01:44 UTC.
- [Commit firmware 9e117eb](https://github.com/peculis/SPinSynth-T-LCD/commit/9e117eb22da185ec16197465fa7e578fea0d7a03), 2026-08-07, +84/−10 in quattro file.
- [Commit release eb7bc65](https://github.com/peculis/SPinSynth-T-LCD/commit/eb7bc65783f5a3084f4fbead13fc9b1c63f887bd), 2026-10-06, con release notes, schema PDF e foto hardware.
- [Repository](https://github.com/peculis/SPinSynth-T-LCD).

**Cosa è cambiato**

V1.1 porta il segnale del synth monofonico in `AudioEffectFreeverbStereo`; MIDI CC36 e il parametro HMI **REVERB MIX** regolano dry/wet 0–100%. L’avvio resta completamente dry, room size e damping sono fissi a 0,5, e USB Audio e Audio Shield ricevono lo stesso stereo mix.

La release pubblica inoltre schema del circuito, fotografie PCB/enclosure, impostazioni di compilazione e misure del percorso reverb: massimo Audio CPU 7,00%, reverb CPU 4,49%, temperatura 57,5–58,1 °C. Il codice reverb è quello del 7 agosto; il 6 ottobre è verificata la confezione come release V1.1 con evidenza hardware/documentale.

**Build e hardware**

Arduino IDE/Teensyduino: Teensy 4.0, 600 MHz, Faster, USB Serial + MIDI + Audio, LiquidCrystal_I2C. Hardware dichiarato: Audio Shield Rev D2, LCD1602 3,3 V, due encoder e MIDI DIN isolato. Il repository contiene sketch e sorgenti C/C++, non un asset firmware binario separato.

**Perché vale l’esame**

È un riferimento compatto per inserire un effetto stereo globale dopo un engine mono, esporre il mix su MIDI/HMI e duplicare coerentemente l’uscita verso codec e USB. Le misure esplicite rendono più utile il confronto rispetto a un semplice esempio Freeverb.

**Adattamento per Custom Pedals / Daisy Field**

Per il Multi-Delay, provare una coda reverb stereo post-delay con mix controllato e confronto CPU fra effect always-on/mix zero e bypass reale. Su Daisy Field mappare il parametro a un controllo locale e misurare tail, click, headroom e CPU nel callback libDaisy. **Non è dichiarata né provata compatibilità Daisy Field**; serve un port del grafo e della UI.

**Caveat**

- Nessuna licenza open-source è stata selezionata: il README limita il codice alla consultazione sotto copyright ordinario.
- Il DSP V1.1 non è un commit nuovo dell’overlap; la promozione si basa sulla release appena pubblicata e sul nuovo pacchetto hardware/validation.
- La compilazione del 6 ottobre non è una nuova accettazione fisica; il test di cinque ore appartiene alla baseline V1.0.
- Factory preset e dump parametri on-demand restano esclusi; nessun binario allegato è stato individuato.

## 3. algomusic/M16 — PASS (delta materiale entro 30 giorni)

**Evento verificato**

- [Commit bd0b813](https://github.com/algomusic/M16/commit/bd0b8130ab7581cfc02eb43abaece49fc5d7b22d), 2026-10-05 04:54 UTC.
- [Repository](https://github.com/algomusic/M16).
- La pubblicazione precedente del monitor è del 2026-10-05 e riguardava hard-sync, fase 16.16 e waveshaping. Questo commit è successivo a quel controllo e introduce un **nuovo target hardware**, quindi supera l’anti-repeat con un delta esplicito.

**Cosa è cambiato**

M16 aggiunge `CODECS.h` e un bring-up Arduino/Wire per:

- ES8311: setup DAC, volume −95…+32 dB e mute;
- ES7210: setup ADC stereo, PGA microfono e digital gain;
- TCA9555: enable dell’amplificatore con latch impostato prima della direzione per evitare impulsi;
- pin I2S/MCLK specifici della Waveshare AI Smart Speaker Development Board;
- esempi `Sinewave_WS` e `AudioPassthrough_WS`, dichiarati testati sulla scheda.

Il codice limita volutamente le sequenze attuali a 44,1 kHz, 16-bit Philips I2S e MCLK 256fs.

**Perché vale l’esame**

Il delta separa trasporto DSP e inizializzazione codec, rende esplicito il sequencing sicuro dell’amplificatore e fornisce un percorso minimo da microfoni analogici a speaker. È un buon riferimento adiacente per portare uno stesso engine su I/O diversi senza contaminare `audioUpdate()` con I2C o power sequencing.

**Adattamento per Custom Pedals / Daisy Field**

Per il Multi-Delay, copiare l’idea di un adapter board/codec esterno al core DSP e il fail-safe “amp off finché clock e codec non sono pronti”. Daisy Field usa il proprio BSP e codec: il valore è architetturale, non una portabilità diretta. Verificare separatamente sample-rate, word length, startup pop e gestione errori.

**Caveat**

- Il nuovo target è ESP32-S3, non Teensy o Daisy; viene incluso soltanto per la forte rilevanza dell’astrazione audio-I/O.
- Nessun tag, release, asset binario o CI accompagna il commit.
- La prova hardware è dichiarata nei commenti degli esempi, non accompagnata da log o misure.
- Licenza dichiarata M16: **CC BY-NC-SA 4.0**; riuso commerciale richiede permesso e manca un file LICENSE standalone.

## HOLD / non ripetuti

- **hmsl-daisy (GitLab)** — progetto Daisy Patch tecnicamente forte, con Forth/HMSL live, synth a otto voci e HIL; la cronologia primaria di `main` si ferma però al 2026-10-02, fuori dall’overlap corrente. Non è stato usato per riempire il digest.
- **Daisy Community** — le pagine correnti di Projects/Software riportano GSP, hvcc e altri thread già registrati o anteriori; nessun nuovo evento sorgente/release del 4–6 ottobre.
- **PJRC Audio Projects** — l’indice corrente mostra il thread sulla tastiera MIDI contactless già HOLD; non sono emersi repository, schema o firmware primari nuovi.
- **RobCZart82/SAWSTAR** — falso positivo: synth VST3 desktop, non firmware embedded.
- **Capicola, GSP, CHOMPI, DSP-Guitar-MultiFX, hvcc, t-dsp, FireFlow, TouchVink, alchemy-sdk e TeensyAudio-rs** — nessun delta materiale ulteriore verificato.

## Audit di scoperta

- Profilo: daily_broad.
- Data run: 2026-10-06 Europe/Zurich; cutoff 30 giorni: 2026-09-06; overlap fresco dal 2026-10-04.
- Regole/stato: README, AGENTS, digest-rules-v0.3, hidden-gems protocol, common anti-repeat policy, feedback state, source registry, tracker pubblicati/selezionati, indice comune, digest 2026-10-05 e cronologie settimanali pertinenti.
- Exa Search/Fetch: query distinte per Daisy forum, PJRC forum, GitHub Daisy, GitHub Teensy, release, Daisy Field, Codeberg, GitLab, Hackaday e pagine primarie; oltre 80 risultati/schede esaminati, senza rate limit o richiesta di riconnessione.
- Classi/domini: forum specialistici, repository/release, forge alternativi, pagine progetto, documentazione core e hardware; almeno nove domini e maggioranza non-GitHub nelle corsie di discovery.
- Query family: forum/host-specific, activity/date, artifact/build-led, target hardware, alternative-host e recheck anti-repeat.
- Pool: oltre 15 candidati plausibili. Le date finali sono state ricontrollate sulle release, sui commit e sulle cronologie primarie; due passate indipendenti oltre GitHub non hanno prodotto un quarto candidato serio.
- Nuove sorgenti riusabili: nessuna; GitLab/Codeberg/Hackaday sono già nel registry.
- Search debt: ricontrollare SPinMicroDexed dopo bench acceptance di bank/SysEx e final-build endurance; ricontrollare SPinSynth solo dopo nuova accettazione fisica o licenza; ricontrollare M16 dopo tag/test/CI del target Waveshare.

## Miglioramento per il prossimo run

- Bloccare SPinMicroDexed e SPinSynth-T-LCD fino al 2026-11-05 salvo delta materiale.
- Bloccare M16 fino al 2026-11-05; una nuova ripetizione richiede release, ulteriore target o test/measurement sostanziale.
- Continuare a distinguere data della release, data del codice firmware e data di un reply forum.

Questionario omesso perché questa è un’esecuzione schedulata non interattiva.
