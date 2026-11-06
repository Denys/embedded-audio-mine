# Daisy + Teensy Watch — 2026-11-06

## Esito

1. **pixelscript/athanor v0.4.0 — STRONG_PASS** — prima release flashabile per Alchemy Lab V2: catena stereo performance-oriented con tape/age, drive e space, asset binari hashati e build riproducibile.
2. **joebmz98/GLOOP — STRONG_PASS** — il 5 novembre il looper Daisy Seed ha aggiunto grain cloud polifonica, pitch per-grain, filtri LP/HP/BP, chorus e risonatore modale con gestione esplicita di CPU e transizioni anti-click.
3. **dotrodeo/rodeo — STRONG_PASS** — il motore demo Rev B guadagna FM, ladder ZDF 24/12 dB, mono legato/glide, envelope e preset estesi dentro un SDK Daisy con 4×4 audio e test host.
4. **luigismith/ichosynth — PASS** — il primo prototipo Teensy 4.1 ha prodotto due correzioni meccaniche misurate e testate: isolamento OLED/pin 41 e spostamento del LINE IN per evitare la collisione della spina con l'Audio Shield.

## Finestra e metodo

- Data Europe/Zurich: **2026-11-06**; cutoff anti-repeat: **2026-10-07**; overlap: **2026-11-04–2026-11-06**, dall'ultimo scan riuscito del 5 novembre.
- Discovery: **28 query Exa / 264 risultati richiesti** in tre passaggi, separando Daisy forum, PJRC/Teensy forum, GitHub release/commit e host alternativi. Nessun errore di connessione o rate limit.
- Le date Exa e le reply dei forum sono state usate solo come lead. Ogni promozione è ancorata a release o commit primario, sorgenti, build/flash, licenza e hardware dichiarato.
- Nessun finding era già presente in published, selected, common index o history settimanali. PZD resta bloccato fino al 5 dicembre: nessun delta successivo a v3.6.0.

## Finding qualificati

### 1. Athanor v0.4.0 — STRONG_PASS

**Evento verificato:** [release v0.4.0](https://github.com/pixelscript/athanor/releases/tag/v0.4.0), pubblicata il **2026-11-04 20:52:27 UTC**. Asset: 'athanor-v0.4.0.bin' (248.232 byte, SHA-256 'b87dada0…1191cd'), '.elf' e 'SHA256SUMS.txt'.

**Che cosa cambia:** prima release del firmware stereo per Hermetic Modular Alchemy Lab V2. Tre righe indipendenti — Speed/Age, Drive, Space — hanno deadband neutra, crossfade delle varianti, attenuverter CV persistenti e tail che continuano dopo il bypass. Il DSP include keyframe engine Capicola, wow/flutter e usura tape/vinyl, saturazione/fuzz/bit-crush, plate Dattorro, delay stereo con cross-feed, chorus/tremolo/phaser/flanger e clock esterno.

**Build e hardware:** Makefile libDaisy, submodule Alchemy SDK v0.12.0, 'make libdaisy && make && make test'; DFU con 'make program-dfu'. Il target dichiarato è **Alchemy Lab V2** ('BOARD=v2'), non Daisy Field. Licenza **AGPL-3.0**.

**Perché vale la pena:** interfaccia a deadband e transizioni di variante sono una buona architettura per effetti “throw-and-return”; persistence, crash report e asset ELF migliorano la manutenibilità sul palco.

**Adattamento:** per Custom Pedals Multi-Delay, riusare il modello send-close/return-open per preservare le code, le divisioni clockate e la separazione amount/modifier. Su Daisy Field servirebbe un adapter BSP/UI, mappatura CV/knob e misura di callback/headroom; il repository non prova compatibilità Field.

**Caveat:** v0.x e prima release; nessuna misura indipendente di latenza o CPU; copyleft AGPL.

### 2. GLOOP — STRONG_PASS

**Evento verificato:** serie di commit del **2026-11-05**, culminata nel salto DSP [a1ab014](https://github.com/joebmz98/GLOOP/commit/a1ab014eb5ddadbc15aa7a43ed26ce1dac0d9344) alle 16:50 UTC. Nello stesso giorno: grain layering e limiter ('7daa457'), pitch per-grain ('f7bb2f3'), chorus/mute fade ('8475eb0'), dirty-band display ('39c07de') e filtri crossfaded ('06f498f').

**Che cosa cambia:** due tracce 'tape loop → grain cloud → LP/HP/BP → chorus → resonator', poi reverb condiviso. Fino a 12 grani per traccia, pitch ±24 semitoni, equal-power mix, fair CPU valve, filtro crossfade 5 ms e mute fade ~4 ms. Il risonatore a 16 modi deriva dall'algoritmo DaisySP/Rings, calcola i coefficienti una volta per blocco, ha level-match/soft clip e costo nullo a mix zero. Il display ST7789 usa flush per bande sporche a 25 MHz.

**Build e hardware:** sorgente Arduino/DaisyDuino, target board **Daisy Seed**, upload DFU tramite STM32CubeProgrammer; README con impostazioni esatte, pinout completo, stereo I/O, quattro encoder, pulsanti e TFT. Licenza **MIT**. Nessun asset di release.

**Perché vale la pena:** è un esempio compatto di looper/granulare a risorse bounded con telemetry CPU, UI non bloccante e transizioni audio senza click.

**Adattamento:** il pool di grani, il rate limit per carico, il reverb condiviso e la separazione audio interrupt/display sono direttamente applicabili a freeze e shimmer del Multi-Delay. Per Daisy Field occorre sostituire pinout/UI, portare la build da Arduino al BSP Field e validare SDRAM, callback e I/O; nessuna compatibilità Field è dichiarata.

**Caveat:** sample browser ancora stand-in, SD non implementata; build documentata ma senza CI o binario taggato; nessuna misura indipendente.

### 3. Rodeo demo / SDK Rev B — STRONG_PASS

**Evento verificato:** commit [555fb5f](https://github.com/dotrodeo/rodeo/commit/555fb5f21a247173db56271377497250537aae2b) del **2026-11-04 05:00:01 UTC**.

**Che cosa cambia:** quattro preset classici sostituiscono i demo e il motore aggiunge forma FM a due coppie di seni, ladder zero-delay-feedback 24/12 dB con drive, HPF, key tracking, decay/sustain configurabili, attack separato per l'envelope filtro e mono legato/glide. I vecchi preset restano compatibili; otto voci sono dichiarate intorno al 70% CPU.

**Build e hardware:** SDK libDaisy/DaisySP con 'make deps', app autonome e 'make program-dfu'; test host per logica pura. La carrier Rev B documenta due codec / **4 ingressi + 4 uscite**, MIDI, SD, USB audio 4×4, satellite chain e KiCad/JLC fabrication files. Software **MIT**, hardware **CERN-OHL-W-2.0**, documentazione **CC-BY-SA-4.0**.

**Perché vale la pena:** separa pin/topologia, DSP host-testable, app e bring-up per sottosistema; il ladder ZDF evita il costo dichiarato del ladder DaisySP oversampled.

**Adattamento:** isolare nel Multi-Delay i blocchi math/state testabili su host, riusare preset text-based e introdurre esempi di bring-up per codec, SD e USB. La Field può essere target di test solo dopo un board adapter e profiling reale; Rodeo usa una carrier Seed proprietaria.

**Caveat:** Rev B è in riscrittura e le nuove schede erano appena ordinate; il dato CPU è author-reported, non benchmark indipendente.

### 4. ichosynth — PASS

**Evento verificato:** commit [a0b00e2](https://github.com/luigismith/ichosynth/commit/a0b00e2046803ed36fd8f9f59b14d12be4815717) del **2026-11-04 10:57:31 UTC** e [9d7aef5](https://github.com/luigismith/ichosynth/commit/9d7aef5c82762be2e9e7b5a61cc61169e789f03c) del **2026-11-05**.

**Che cosa cambia:** dopo il primo prototipo, l'OLED è spostato 3 mm per portare la distanza dai pin Teensy a 2,72 mm, con soglia automatica ≥2,5 mm e mutation test 14/14. Il jack LINE IN passa da v=150 a v=124: il modello include una spina da 32 mm e verifica ≥2 mm dalla Teensy/Audio Shield; la distanza risultante è 4 mm. STL e progetti slicer sono rigenerati.

**Build e hardware:** groovebox Teensy 4.1 + Audio Shield, matrice RGB 16×16, encoder, OLED e case stampato; repository con firmware, HEX, SD image, manuali, wiring e CAD parametrico. [Release v1.0](https://github.com/luigismith/ichosynth/releases/tag/v1.0) del 30 ottobre offre HEX, flasher, STL/3MF e PDF hashati. Licenza root MIT, con dipendenze proprie e Mapf GPL-3.0.

**Perché vale la pena:** le correzioni derivano da collisioni fisiche reali e diventano controlli geometrici ripetibili, non note manuali.

**Adattamento:** adottare la stessa disciplina model→clearance check→mutation test per jack, OLED, footswitch e cablaggi del Multi-Delay. Non è un port Field; il valore è nel processo elettromeccanico e nel packaging Teensy.

**Caveat:** la revisione corretta non risulta ristampata; i render non sono stati rigenerati; gli asset v1.0 precedono questi commit.

## Esclusi / HOLD

- **petits-chapeaux/seed-patcher:** build e host render concreti, ma nessuna licenza e solo due commit iniziali; HOLD.
- **Daisy forum SITL/HITL:** reply recente su thread del 2 marzo, senza nuovo rilascio.
- **willbearfruits/daisypatcher, twitzelbos/daisy-rs, WeebLabs/DSPi:** sorgenti interessanti ma ultimo evento primario antecedente all'overlap.
- **PJRC:** i lead recenti erano editoriali o reply senza release/commit sorgente verificabile.
- **MoonLight e rt1176-evkb:** aggiornamenti reali ma adiacenti; rispettivamente piattaforma luci audio-reactive con audio Teensy stub e port RT1176 senza nuovo firmware audio.

## Persistenza

- Aggiunti i quattro alert a 'data/published-repo-log.csv'; repeat bloccato fino al **2026-12-06**.
- Rigenerato 'data/common-anti-repeat-index.csv'.
- Registrate le quattro fonti primarie in 'data/hidden-gems-source-registry.csv'.
- Aggiornato 'data/prompt-evolution-state.yaml'.
- 'data/selected-projects.csv' invariato: finding forti, ma nessun nuovo riferimento eccezionale oltre la pubblicazione.

## Link primari

- [Athanor repository](https://github.com/pixelscript/athanor) · [release v0.4.0](https://github.com/pixelscript/athanor/releases/tag/v0.4.0)
- [GLOOP repository](https://github.com/joebmz98/GLOOP) · [firmware README](https://github.com/joebmz98/GLOOP/blob/main/src/gloop_fw/README.md)
- [Rodeo repository](https://github.com/dotrodeo/rodeo) · [SDK](https://github.com/dotrodeo/rodeo/tree/main/rodeo-sdk)
- [ichosynth repository](https://github.com/luigismith/ichosynth) · [release v1.0](https://github.com/luigismith/ichosynth/releases/tag/v1.0)
