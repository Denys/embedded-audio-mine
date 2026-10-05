# Daisy + Teensy Watch — 2026-10-05

## Sintesi

Due aggiornamenti indipendenti Teensy superano le verifiche di data, sorgente, percorso di build, licenza e anti-repeat:

1. **MahmoudBasio/DSP-Guitar-MultiFX — PASS** — commit 0fa40894193a667b490a2ec143032e2c0e5c9ec3 del **2026-10-03**: separa il dry non filtrato dal ramo wet del chorus, amplia UI e limiti DSP, sposta il lavoro dei footswitch fuori dagli ISR e aggiunge test host.
2. **algomusic/M16 — PASS** — commit b61691cc7af44011ad7f2cf7cb5ac660ce69c08a e fcf6b896e5496c5ea316194c75150d4ff9863700 del **2026-10-03**: hard-sync a fase o zero-crossing, accesso alla fase 16.16 e waveshaper live; la libreria dichiara Teensy 4.x e il pinout I2S/PJRC Audio Board.

La qualità ha imposto un digest di due voci. Nessun nuovo progetto Daisy ha superato GSP e Capicola del 2 ottobre; i reply recenti sui forum non sono stati trattati come release. La piccola correzione CD4021 di hvcc è stata verificata ma resta HOLD per anti-repeat e impatto limitato.

## 1. MahmoudBasio/DSP-Guitar-MultiFX — PASS

**Evento verificato**

- [Commit 0fa4089](https://github.com/MahmoudBasio/DSP-Guitar-MultiFX/commit/0fa40894193a667b490a2ec143032e2c0e5c9ec3), 2026-10-03, 27 file, +304/−109.
- [Repository](https://github.com/MahmoudBasio/DSP-Guitar-MultiFX).
- Licenza repository: [MIT](https://github.com/MahmoudBasio/DSP-Guitar-MultiFX/blob/main/LICENSE).

**Cosa è cambiato**

Il delta corregge un problema architetturale reale: il percorso dry non attraversa più il vecchio low-pass globale a 3,2 kHz. Il filtro diventa un ingresso wet opzionale del chorus, mentre il segnale diretto resta non filtrato. In parallelo:

- il chorus passa da uno a due ingressi, porta il buffer da 2048 a 4096 campioni e vincola base/depth per non uscire dalla storia disponibile;
- la UI espone rate, depth, base, wet e attivazione del filtro wet, mostrando valori fisici anziché percentuali grezze;
- il livello line-in SGTL5000 ora viene applicato esplicitamente;
- i tre footswitch hanno debounce indipendente e gli ISR registrano solo eventi, applicati poi nel loop;
- gli aggiornamenti dei parametri DSP vengono raggruppati fra AudioNoInterrupts/AudioInterrupts;
- sono aggiunti test host del chorus e una nota di validazione dedicata.

**Build, firmware e hardware**

Il target è Teensy 4.1 con Teensy Audio Board/SGTL5000. Il repository contiene firmware C++ modulare, platformio.ini con board = teensy41, directory separate per audio/core/DSP/effects/UI, PCB KiCad editabile, schema PDF, Gerber ZIP, BOM XLSX e CAD meccanico STEP/DXF/SolidWorks.

Percorso dichiarato:

    git clone https://github.com/MahmoudBasio/DSP-Guitar-MultiFX.git
    cd DSP-Guitar-MultiFX/firmware
    pio run
    pio run --target upload

Per questa revisione risultano passati i test host del chorus e la compilazione separata dei 19 sorgenti con toolchain Teensy 4.1; il link PlatformIO completo e il comportamento sul dispositivo non sono stati verificati dall’autore a causa di uno stallo della shell Windows.

**Perché vale l’esame**

È un aggiornamento riutilizzabile di signal routing e real-time control, non semplice rifinitura: preserva la banda del dry, rende il tone shaping selettivo sul solo delay modulato e rimuove mutazioni complesse dal contesto interrupt. La separazione fra grafo audio, wrapper degli effetti, stato parametri e UI è abbastanza chiara da servire come riferimento per pedali multi-effetto.

**Adattamento per Custom Pedals / Daisy Field**

Per il Multi-Delay, copiare il principio dry intatto + ramo wet filtrabile, insieme alla pubblicazione atomica dei parametri e alla coda minima di eventi footswitch. Su Daisy Field il test di riferimento dovrebbe ricostruire il grafo nel callback libDaisy/DaisySP e mappare encoder/pad sulla UI, poi misurare risposta in frequenza, gain staging, CPU e click durante i cambi di stato. **Non esiste evidenza di build o compatibilità Daisy Field**: il codice attuale dipende da Teensy Audio Library e SGTL5000.

**Caveat**

- Nessun tag o asset firmware per questo delta.
- Il full link e il flash della revisione 0fa4089 non sono dimostrati; i test sono host e compilation-unit.
- Le misure CPU pubblicate (massimo 5,01% a 44,1 kHz / 128 campioni) precedono il nuovo routing e devono essere ripetute.
- Il bypass è digitale, non relay true-bypass né garanzia di unity gain.
- Sono presenti sorgenti/fabbricazione hardware, ma questa esecuzione non ha fabbricato né misurato la scheda.

## 2. algomusic/M16 — PASS

**Evento verificato**

- [Commit b61691c](https://github.com/algomusic/M16/commit/b61691cc7af44011ad7f2cf7cb5ac660ce69c08a), 2026-10-03: hardSync, oscSync e waveShaperLive.
- [Commit fcf6b89](https://github.com/algomusic/M16/commit/fcf6b896e5496c5ea316194c75150d4ff9863700), 2026-10-03: getter/setter della fase raw 16.16.
- [Repository](https://github.com/algomusic/M16) e [scheda PlatformIO](https://registry.platformio.org/libraries/algomusic/M16).
- Il commit successivo [f445e45](https://github.com/algomusic/M16/commit/f445e454a6437b7ba5fa4a1300d14a76a25fb7d7), 2026-10-04, annota soltanto pin SD alternativi nell’esempio SamplePlayback e non è il motivo della promozione.

**Cosa è cambiato**

M16 aggiunge due percorsi di sync:

- hardSync rileva il rising zero-crossing con isteresi e interpola la frazione di campione prima di resettare lo slave;
- oscSync usa il wrap della fase del master e il suo overshoot frazionario per posizionare la fase dello slave, senza dipendere dalla forma d’onda.

Osc espone ora getPhaseRaw, getPhaseIncrementRaw e setPhaseRaw sulla fase 16.16, con accessi atomici per ESP32/RP2040 e mascheramento del ciclo. waveShaperLive effettua un crossfade fixed-point fra campione dry e valore di shaping audio-rate fornito dal chiamante.

**Build e I/O**

library.properties dichiara M16 1.0.1 per esp8266, esp32, rp2040, rp2350 e teensy4. La libreria usa il modello Arduino: includere M16.h, implementare audioUpdate() e terminare il blocco con audioBlockWrite(left, right). Il repository contiene esempi per oscillatori, envelope, filtri, delay, chorus, wav playback, sync e altri blocchi.

Per Teensy 4 il README corrente documenta I2S su DIN 8, LRCLK 20, BCLK 21 e MCLK 23 quando richiesto; Teensy Audio Board richiede l’oggetto di controllo SGTL5000 e audioInputStart() abilita la cattura.

**Perché vale l’esame**

Il valore è nella piccola API di fase deterministica e nei due approcci di sync esplicitamente separati. È materiale adattabile per oscillatori embedded, reset di LFO e modulazioni audio-rate senza legare l’algoritmo al graph scheduler di PJRC.

**Adattamento per Custom Pedals / Daisy Field**

Per il Multi-Delay, provare il bookkeeping di fase per riallineare LFO o teste modulate a un evento/zero-crossing e usare waveShaperLive come morph controllato nel solo ramo feedback. Il riferimento Daisy Field deve essere un port isolato del DSP, con test host e misura di aliasing/click/CPU; **M16 non fornisce un target o una build Daisy Field**.

**Caveat**

- Nessuna release/tag o asset binario associato ai commit.
- Non sono presenti CI o test specifici per hard-sync/waveshaper; l’implementazione sorgente è verificata, non il risultato acustico su Teensy.
- Licenza dichiarata nei sorgenti/README: **CC BY-NC-SA 4.0**; non è adatta a riuso commerciale senza permesso e non è presente un file LICENSE standalone.
- È una libreria multi-MCU adiacente, non un’estensione della PJRC Audio Library; l’integrazione con altro scheduling real-time va misurata.

## HOLD / non ripetuti

- **Wasted-Audio/hvcc** — commit [8c96f79](https://github.com/Wasted-Audio/hvcc/commit/8c96f7960aa330d2fe93a77208dfd799a0d31216), 2026-10-04, aggiunge delay_ticks (default 10) alla configurazione CD4021 e aggiorna l’header atteso Daisy Field. È un fix utile, ma tocca tre file, non ha release/tag e hvcc è stato segnalato il 2026-10-03: delta insufficiente per ripeterlo entro 30 giorni.
- **Velocity-sensitive contactless MIDI keyboard** sul forum PJRC — thread fresco, ma non sono stati recuperati repository, firmware, schema o pacchetto hardware primario; promozione possibile quando l’autore pubblica sorgenti e percorso di build.
- **A pair of polysynths** sul forum PJRC — il titolo compare nell’indice corrente, ma Exa non ha risolto un post primario completo né sorgenti; nessuna data firmware è stata inferita dal timestamp del reply.
- **Daisy forum** — attività fino al 4 ottobre su Alchemy, hvcc e GSP, ma nessun nuovo rilascio originale dopo gli eventi già registrati.
- **Atmospheric-Phantoms** — attività del 3 ottobre composta da caricamenti e correzioni README; escluso come attività cosmetica/non verificata.
- **Capicola, GSP, CHOMPI, t-dsp, FireFlow, TouchVink, alchemy-sdk e TeensyAudio-rs** — nessun nuovo delta oltre lo stato già pubblicato.

## Audit di scoperta

- Profilo: daily_broad.
- Data run: 2026-10-05 Europe/Zurich; cutoff 30 giorni: 2026-09-05; overlap fresco dal 2026-10-03.
- Regole/stato: README, AGENTS, digest-rules-v0.3, hidden-gems protocol, common anti-repeat policy, feedback state, source registry, tracker pubblicati/selezionati, indice comune, digest 2026-10-04 e cronologia settimanale pertinente.
- Exa Search/Fetch: oltre **180 risultati** in query distinte per forum Daisy, forum PJRC, GitHub Daisy, GitHub Teensy, Daisy Field, host alternativi, fondazioni e recheck esatti; connessione riuscita senza autenticazione o rate limit.
- Classi/domìni: forum specialistici, repository/package registry, pagine tecniche personali, pagine progetto primarie e core documentation; almeno nove domini, con maggioranza non-GitHub nelle corsie di scoperta.
- Query family: host-specific/forum, artifact/build-led, repository activity/date, lineage/recheck e alternative-host.
- Pool: oltre 20 candidati plausibili; date finali ricontrollate su commit e pagine primarie. Due batch indipendenti successivi non hanno prodotto un terzo candidato serio.
- Nuova sorgente registrata: pagina PlatformIO di M16. Nessuna sorgente marcata dead/moved/blocked.
- Search debt: verificare un eventuale tag M16 con test Teensy; ricontrollare MultiFX soltanto dopo full link/flash e nuove misure; promuovere i thread PJRC solo quando compaiono sorgenti primarie.

## Miglioramento per il prossimo run

- Bloccare entrambe le voci fino al 2026-11-04 salvo release, hardware target o misura/build materialmente nuova.
- Per M16 distinguere sempre supporto dichiarato teensy4 da prova compilata su Teensy e da integrazione PJRC Audio Library.
- Per MultiFX richiedere full link, flash e misure aggiornate prima di una ripetizione.
- Continuare a trattare reply recenti e date di indicizzazione come lead, non come eventi firmware.

Questionario omesso perché questa è un’esecuzione schedulata non interattiva.
