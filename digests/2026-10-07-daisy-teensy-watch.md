# Daisy + Teensy Watch — 2026-10-07

## Sintesi

Quattro aggiornamenti superano la verifica primaria e l'anti-repeat:

1. **zakmachachi/seq--23 — PASS** — la baseline sorgente v1.4.0 è confluita su main il **2026-10-06 22:59 UTC** (localmente 7 ottobre): nuovo motore kick/FX Daisy Seed, ottimizzazione RAM/CPU e correzione hardware del whine legato alla frequenza dei blocchi.
2. **theotherson/chorale — STRONG_PASS** — nuova community firmware CHOMPI, con commit sostanziali del **2026-10-06** e ultimo stato verificato il **2026-10-06 23:55 UTC**: armonizzatore live, slice engine, sequencer e granular delay TEMPO su sorgente CHOMPI/TAPE/SING.
3. **FrankBoesing/ESP-beatsy-Audio-Library — REF_PASS** — commit **7fb23d7** del **2026-10-06 16:21 UTC**: amplia il port ESP32 dell'API Teensy Audio con scheduler AudioStream/FreeRTOS, ADSR thread-safe e demo polifonica a 16 voci.
4. **peculis/SPinSynth-T-LCD — REF_PASS, repeat con delta materiale** — commit **462bb17** del **2026-10-06 02:01 UTC**, successivo di 19 secondi alla pubblicazione precedente: aggiunge licenza MIT e NOTICE esplicito. Non è un nuovo DSP, ma cambia concretamente il valore di riuso.

Le attività recenti dei forum sono state usate come lead, non come data di rilascio. PZD Looper, Perseids, dreamosc e le pagine PJRC non hanno fornito un nuovo evento primario qualificante nel periodo post-scan.

## 1. zakmachachi/seq--23 — PASS

**Evento verificato**

- [Repository](https://github.com/zakmachachi/seq--23)
- [Merge v1.4.0 db635b0](https://github.com/zakmachachi/seq--23/commit/db635b077cd9d86260cdfd40199b4cc1e4109efa), 2026-10-06 22:59 UTC, +6639/−4610 in 66 file.
- [Fix hardware 58fcb19](https://github.com/zakmachachi/seq--23/commit/58fcb19fae9595efcd0b2be1a06932682982109c), 2026-10-06 22:54 UTC.
- [Istruzioni Daisy kick](https://github.com/zakmachachi/seq--23/tree/main/daisy-kick).

**Cosa è cambiato**

La v1.4.0 unisce un controller/sequencer Teensy 4.1 e un motore kick/FX separato su Daisy Seed. Il delta principale del lato Daisy comprende:

- riscrittura della voce kick con sweep 4–240 ms, morph sine/saw, tail modulation e tuning ±12 semitoni;
- menu FX con delay/loop/stutter/pitch, filtri, pump, reverb con ducking e repeat clockati, bitcrush ed erosion;
- Mackie a oversampling 4× con FIR 97 tap; calcolo di filtri/effetti spostato fuori dal callback quando possibile;
- buffer lunghi in SDRAM, con uso SRAM dichiarato sceso dal 90% al 64%;
- coda MIDI USART3 interrupt-driven da 1024 elementi e trigger/clock Eurorack su D2/D3 a 3,3 V;
- blocchi audio ridotti a 2 sample: una registrazione hardware collocava il whine a 48 kHz / block-size, quindi da 6 kHz con 8 sample a 24 kHz con 2. Sul Seed sono riportati 30–37% del budget callback peggiore a idle, senza overrun.

**Build e hardware**

Il controller principale usa Teensy 4.1, due OLED SH1106, matrice tasti, sei controlli doppi, WS2812 e MIDI Serial5. Il motore audio è un firmware libDaisy/DaisySP separato. Il percorso riproducibile è GNU Make + arm-none-eabi, poi make -C daisy-kick program-dfu; README e Makefile fissano i percorsi libDaisy/DaisySP e documentano la procedura BOOT/RESET/DFU.

**Perché vale l'esame**

Il progetto collega UI/sequencer ad alta densità e motore DSP dedicato con un protocollo MIDI esplicito. La diagnosi del whine è particolarmente utile: correla burst CPU, dimensione blocco e accoppiamento sull'uscita analogica, invece di trattare il difetto come semplice rumore digitale.

**Adattamento per Custom Pedals / Daisy Field**

Per il Multi-Delay conviene isolare tre pattern: buffer delay/reverb in SDRAM, bypass reale dei blocchi inattivi e misure di spettro/overrun al variare di block-size. Su Daisy Field il test dovrebbe partire da un piccolo banco libDaisy che mantiene la stessa catena ma rimappa codec, controlli e memoria attraverso il BSP Field. **Il repository non dichiara né dimostra una build Daisy Field.**

**Caveat**

- Non esiste un tag/release asset v1.4.0: è una baseline sorgente su main.
- Il README dichiara che l'ultima revisione non è stata caricata sulle due schede, pur riportando una conferma hardware specifica del fix whine.
- Il repository non contiene LICENSE; il README dice che non è garantita una licenza formale. La lettura è utile, ma il riuso/distribuzione richiede chiarimento.
- Il progetto è esplicitamente prototipale e AI-assisted; host test e alcune misure non sostituiscono un regression test completo sulla coppia Teensy/Seed.

## 2. theotherson/chorale — STRONG_PASS

**Evento verificato**

- [Repository](https://github.com/theotherson/chorale), creato 2026-10-05.
- [Granular delay 8974ecb](https://github.com/theotherson/chorale/commit/8974ecbaefbabd254d091c0c9ef776f666d7133f), 2026-10-06 15:34 UTC, +1508/−118.
- [Slice engine 8f34474](https://github.com/theotherson/chorale/commit/8f34474cab5ce6efd78c619cab9be04187a23446), 2026-10-06 19:18 UTC, +679/−7.
- [Sequencer 83121e5](https://github.com/theotherson/chorale/commit/83121e53a060d35571551379c846b2434d8a0ede), 2026-10-06 20:27 UTC, +439/−148.
- Stato corrente verificato al commit [e2b6ae3](https://github.com/theotherson/chorale/commit/e2b6ae39be1d78181ba6e11a5c73609075f2f33f), 2026-10-06 23:55 UTC.
- [Licenza MIT](https://github.com/theotherson/chorale/blob/main/LICENSE) e [limiti trademark](https://github.com/theotherson/chorale/blob/main/TRADEMARKS.md).

**Cosa è cambiato**

CHORALE è una firmware community non ufficiale per CHOMPI, derivata da SING/TAPE e aggiornata con componenti TEMPO:

- armonizzatore WSOLA fino a sette voci con stack, accordi, strum/glide, threshold e freeze da 0,3 s;
- slice engine fino a otto voci che legge direttamente la memoria del looper;
- sequencer con latch, arp, random e pattern di rest, sincronizzato a un clock contato in sample;
- granular delay stereo da 10 s più copia freeze, reverb, compressore ducking, bitcrush e doubler;
- separazione esplicita fra DTCM per il path per-sample e SDRAM per delay, freeze, loop e pitch-shift;
- heap dedicato in D2 SRAM per impedire che allocazioni USB escano dalla memoria libera.

**Build, flash e hardware**

Il README documenta GNU Arm Embedded 10.3-2021.10, librerie libDaisy/DaisySP/coreJSON incluse sotto code/libs e comando make da code/src. L'output atteso è code/src/build/CHORALE.bin, installabile tramite launcher multifirmware CHOMPI o aggiornamento da SD. La firmware è dichiarata testata su un CHOMPI; non è stato trovato un asset binario precompilato nel repository.

**Perché vale l'esame**

È un raro esempio di integrazione completa fra pitch shifting live, slicing della memoria del looper, clock musicale e granular delay dentro i vincoli reali della piattaforma. Le scelte di placement DTCM/SDRAM e il clock per sample sono direttamente riutilizzabili.

**Adattamento per Custom Pedals / Daisy Field**

Per il Multi-Delay, estrarre prima clockManager + granularDelay + SimpleCrossfade e misurare: jitter del clock, costo worst-case, crossfade freeze/unfreeze, headroom e pressione SDRAM. Un secondo esperimento può riusare SliceEngine come tap/slice reader sopra il buffer delay. **CHORALE è costruito per CHOMPI, non per Daisy Field**: Field richiede un adapter BSP/UI/storage, una nuova mappa RAM e validazione codec/I/O.

**Caveat**

- Prova fisica dichiarata su una sola unità; latenza delle voci trasposte verso l'alto circa 30–45 ms.
- Mic interno soggetto a click dei tasti e possibile whine LED; è consigliato un mic esterno.
- Nessuna release/tag o asset binario separato è stato individuato.
- La licenza root è MIT, ma il codice deriva da più firmware e librerie: preservare notice e termini upstream; i marchi CHOMPI sono esclusi.
- La presenza della pubblicazione CHOMPI ufficiale del 3 ottobre è stata controllata: questa non è una ripetizione dello stesso repo, ma una nuova firmware community con DSP e UI sostanzialmente nuovi.

## 3. FrankBoesing/ESP-beatsy-Audio-Library — REF_PASS

**Evento verificato**

- [Repository](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library).
- [Commit 7fb23d7](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/commit/7fb23d7aca668bd042599b01b822a9781e8e836c), 2026-10-06 16:21 UTC, +1993/−333 in 14 file.
- [Licenza MIT](https://github.com/FrankBoesing/ESP-beatsy-Audio-Library/blob/main/LICENSE); i file derivati dalla PJRC Audio Library conservano i notice originari.

**Cosa è cambiato**

Il commit aggiunge e riorganizza una compatibilità Teensy Audio su ESP32:

- AudioStream con pool di blocchi, graph AudioConnection, task FreeRTOS pinned, timer software e hook per clock esterno/I2S;
- statistiche CPU/memoria e stop sicuro del task mentre il graph è in esecuzione;
- AudioEffectEnvelope portato con stato copiato per blocco, generation counter per non sovrascrivere NoteOn/NoteOff concorrenti e aritmetica fixed-point;
- esempio a 16 oscillatori/envelope e mixer gerarchici;
- coda di playback non bloccante e percorso ES8388 separato dal trasporto I2S.

**Build e hardware**

PlatformIO definisce esp32dev/Arduino, 48 kHz, PSRAM e ottimizzazione O2. Il README fornisce un esempio SD_MMC → WAV → AudioConnection → I2S su ESP32 Audio Kit V2.2 con ES8388. Il progetto è MIT ed espone sorgente reale, ma non una release binaria.

**Perché vale l'esame**

Il valore non è un nuovo effetto, ma il confine architetturale: la stessa API graph/block di Teensy viene separata da scheduler, allocator, clock e codec specifici della piattaforma. È un riferimento utile per rendere trasportabile un engine senza trascinare dipendenze di I/O nel DSP.

**Adattamento per Custom Pedals / Daisy Field**

Per il Multi-Delay, confrontare questo boundary con libDaisy: core DSP puro, allocator/buffer pool, clock fornito dal DMA audio e adapter codec/UI. Sul Field non va portato FreeRTOS alla cieca; è più utile replicare le interfacce e verificare ownership dei blocchi, underrun e mutazioni di parametri al confine del callback. **Non esiste supporto Daisy Field nel repository.**

**Caveat**

- Target attuale ESP32 Audio Kit, non Teensy né Daisy; è incluso come riferimento adiacente alla Teensy Audio Library.
- README lo marca Work in Progress; nessun tag, release, CI o misura hardware/latency è stata trovata.
- Il clock software è una baseline: per firmware audio robusto serve validare l'handoff I2S/DMA e il comportamento sotto carico.
- La licenza root MIT non sostituisce i notice PJRC e le licenze dei file upstream.

## 4. peculis/SPinSynth-T-LCD — REF_PASS (delta materiale entro 30 giorni)

**Evento verificato**

- [Commit 462bb17](https://github.com/peculis/SPinSynth-T-LCD/commit/462bb17bd7b1b87dd2d5bacd232de4965d3d7140), 2026-10-06 02:01:50 UTC, +60/−14.
- [Licenza MIT](https://github.com/peculis/SPinSynth-T-LCD/blob/main/LICENSE).
- [NOTICE](https://github.com/peculis/SPinSynth-T-LCD/blob/main/NOTICE.md).
- [Release V1.1](https://github.com/peculis/SPinSynth-T-LCD/releases/tag/V1.1), già pubblicata nel digest precedente.

**Cosa è cambiato**

Il delta non tocca il DSP V1.1. Aggiunge una licenza MIT esplicita per software e documentazione di Ricardo Peculis, chiarisce che la policy maintainer-only non limita fork/adattamento e separa le dipendenze di terze parti dai diritti del progetto.

**Perché vale l'esame**

La pubblicazione del 6 ottobre riportava correttamente l'assenza di licenza open-source. Il commit, arrivato 19 secondi dopo il merge di quel digest, rimuove quel blocco e consente riuso, modifica e distribuzione commerciale del codice del progetto con conservazione del notice. È quindi una ripetizione entro 30 giorni ammessa come chiarimento di licenza che cambia concretamente il valore di riuso.

**Adattamento per Custom Pedals / Daisy Field**

Ora caching UI, routing dry/wet e integrazione AudioStream possono essere studiati e adattati con un perimetro legale chiaro. Restano necessari un port libDaisy e test dedicati su Daisy Field; non esiste build Field.

**Caveat**

- Nessun nuovo firmware, DSP, tag o asset.
- Le dipendenze PJRC, MIDI e LCD mantengono licenze/notice propri.
- Rimangono validi i limiti V1.1: niente nuova accettazione fisica del reverb e nessun binario separato.

## HOLD / esclusioni

- **PZD Daisy Pod 4 Track Looper** — reply forum del 5 ottobre, ma main si ferma al commit 0ae3e9e del 27 settembre; il reply non prova una nuova release.
- **xof-112/perseids** — merge cfe5c1a del 6 ottobre modifica soprattutto documentazione/configurazione; il DSP Swarm/Spectra resta quello di agosto ed è già hard-blocked dalla cronologia Codex.
- **mrkplt/dreamosc** — commit UI/ADC/OLED del 5 ottobre, prima dell'ultimo scan; niente nuovo delta post-scan e alcune modifiche non sono ancora ascoltate su hardware.
- **forrcaho/PatchGarden** — DSP e limiter interessanti, ma il target è principalmente telefono/app e non firmware Daisy/Teensy; escluso dal ranking di questo monitor.
- **Daisy forum/PJRC forum** — nessun thread recente ha fornito una nuova release primaria oltre i candidati verificati.
- **M16, SPinMicroDexed, Capicola, GSP, CHOMPI ufficiale, t-dsp e progetti degli ultimi digest** — nessun ulteriore delta materiale post-scan.

## Audit di scoperta

- Profilo: daily_broad.
- Data: 2026-10-07 Europe/Zurich; cutoff anti-repeat: 2026-09-07; overlap dal 2026-10-05.
- Exa Search/Fetch: corsie distinte Daisy forum, PJRC forum, GitHub Daisy, GitHub Teensy, release, Daisy Field, GitLab, Codeberg, SourceHut, Hackaday, pagine personali e recheck. 195 slot di risultato Exa esaminati; nessun rate limit o riconnessione.
- Classi: forum specialistici, repository/release, forge alternativi, pagine progetto/build log, package registry e documentazione hardware/core; almeno nove domini, con maggioranza non-GitHub nelle query di discovery.
- Query family: host/forum-specific, date/activity, artifact/build-led, target hardware, alternative-host e anti-repeat/recheck.
- Pool: oltre 15 candidati plausibili; quattro promossi dopo verifica di commit, sorgente/build, licenza e stato hardware.
- Nuove sorgenti persistite: repository primari seq--23, CHORALE ed ESP-beatsy.
- Stop rule: due batch indipendenti successivi non hanno prodotto un quinto candidato con evento primario e qualità comparabili.

## Miglioramento per il prossimo run

- Bloccare seq--23, CHORALE ed ESP-beatsy fino al 2026-11-06 salvo release, binary/hardware acceptance o altro delta materiale.
- Aggiornare il blocco SPinSynth-T-LCD al 2026-11-06; un'altra ripetizione richiede firmware/DSP o validazione fisica, non ulteriore polish.
- Ricontrollare CHORALE per asset binario/tag e seq--23 per licenza formale e flash della baseline v1.4.0.
- Continuare a distinguere data di reply, data del codice e data della release.

Questionario omesso perché questa è un'esecuzione schedulata non interattiva.
