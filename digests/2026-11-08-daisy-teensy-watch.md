# Daisy + Teensy Watch — 2026-11-08

## Executive summary

Tre finding superano la soglia. **AlexKokoschka/StepDaddy v1.0.0 — STRONG_PASS** è una release Teensy 4.1 realmente installabile: firmware HEX, updater desktop, sorgenti riproducibili, CI verde e hardware aperto separato ma completo. **joebmz98/GLOOP — STRONG_PASS** è un repeat materiale esplicito: dopo l'alert del 6 novembre aggiunge comb accordato, LFO/envelope follower, routing FX a due slot e una riscrittura block-based che preserva l'output entro −120 dB nei test host. **newdigate/rt1176-evkb — REF_PASS** porta il grafo Teensy Audio su un RT1176/SGTL5000 alternativo e aggiunge gate QEMU sample-exact; è un riferimento architetturale, non firmware per Teensy 4.x o Daisy.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano attivi hard anti-repeat, priorità a sorgenti/build verificabili e Daisy Field come target di adattamento senza compatibilità presunta.

## Pre-flight / discovery audit

- Data Europe/Zurich: **2026-11-08**; cutoff anti-repeat: **2026-10-09**; overlap: **2026-11-06–2026-11-08**, dall'ultimo scan riuscito del 7 novembre.
- Profilo: `daily_broad`. Ispezionati README, AGENTS, regole v0.3/hidden-gems/common anti-repeat/feedback, registri published-selected-common, prompt state, source registry, digest Daisy/Teensy del 7 novembre e history Codex/portable più recenti.
- Discovery: **13 query Exa / 114 risultati richiesti**, senza errori di connessione o rate limit, più fetch primari. Piste separate: Daisy forum, PJRC Audio Projects, GitHub commit/release e host alternativi.
- Pool serio: 8 lead. Promossi StepDaddy, GLOOP e rt1176-evkb; HOLD o esclusi KzX_Version1, hmsl-daisy, MicroDexed-touch 2.0.5, i titoli PJRC voice-changer/auto-BPM looper e attività Daisy forum non collegata a release.
- Stop rule: chiusa dopo i tre angoli obbligatori, GitLab/Codeberg, ricerca globale commit e verifica primaria di build, asset, licenze, hardware e delta.
- Registry: aggiunte le pagine StepDaddy, StepMother, rt1176-evkb e MicroDexed-touch releases; aggiornata GLOOP.

## Ranked entries

### 1. AlexKokoschka/StepDaddy v1.0.0 — STRONG_PASS

**Evento verificato:** commit [8d18ebb](https://github.com/AlexKokoschka/StepDaddy/commit/8d18ebbdb6fd7bff5b30b7430430418c4fe07450) del **2026-11-07 16:45 UTC** e release [v1.0.0](https://github.com/AlexKokoschka/StepDaddy/releases/tag/v1.0.0) del **2026-11-07 16:59 UTC**.

**Che cosa cambia / cosa contiene:** prima release pubblica del firmware Step Mother: StepBro, sequencer MIDI, e Yummy Gummy, synth 303-style con sequencer proprio, convivono sul Teensy 4.1 e continuano a suonare mentre il pannello cambia modalità. Yummy usa un core C fixed-point a blocchi da 16 campioni: ladder ZDF a quattro poli, saw/square mono o parafonico a quattro note, accent, due distorsioni e delay sincronizzato. Il percorso USB espone MIDI e audio nativo 48 kHz.

**Build, flash e test:** build riproducibile con ARM GNU 13.2 e subset Teensyduino 1.62 vendorizzato; `build_teensy.py`, host test, voice test e verifier controllano HEX, confini flash, descrittori USB e guardie memoria. La release include HEX da 345.707 byte, updater macOS/Windows e manuali; tre run GitHub Actions risultano verdi. L'updater entra nel bootloader senza aprire il case e conserva pattern/impostazioni. Persistenza LittleFS a due journal con header scritto per ultimo, CRC, read-back e 550 interruzioni simulate.

**Hardware/elettronica:** repository [StepMother](https://github.com/AlexKokoschka/StepMother) separato con EasyEDA Pro importabile in KiCad, Gerber, BOM, pick-and-place, schematici/assembly PDF, modello 3D, STL/STEP e sorgente FreeCAD; licenza **CERN-OHL-S-2.0**. Il prodotto è dichiarato assemblato in piccoli lotti. Firmware/updater **GPL-3.0-or-later** con notice delle dipendenze.

**Perché vale la pena:** unisce release installabile, DSP riusabile, persistenza robusta, UI fisica densa e artefatti produttivi. Per Custom Pedals Multi-Delay sono utili la separazione tra sequencer/UI/audio, i bounded queue/seqlock, la telemetria di underrun e il commit a due bank.

**Adattamento Daisy Field:** estrarre il voice core e il journal come componenti host-testabili, poi costruire un BSP Field separato per callback, controlli e storage; il progetto non contiene un target Field e non dimostra compatibilità.

**Caveat:** audio solo via USB, non analogico; firmware destinato al pannello Step Mother; updater non firmato; nessuna misura THD+N/latency o prova indipendente del prodotto.

**Fonti primarie:** [repo firmware](https://github.com/AlexKokoschka/StepDaddy) · [release](https://github.com/AlexKokoschka/StepDaddy/releases/tag/v1.0.0) · [voice core](https://github.com/AlexKokoschka/StepDaddy/tree/main/firmware/StepMother/voice) · [hardware](https://github.com/AlexKokoschka/StepMother)

### 2. joebmz98/GLOOP — STRONG_PASS — repeat materiale

**Delta verificato entro 30 giorni:** il progetto era stato pubblicato il 6 novembre fino ad [a1ab014](https://github.com/joebmz98/GLOOP/commit/a1ab014eb5ddadbc15aa7a43ed26ce1dac0d9344). I nuovi commit [164cb00](https://github.com/joebmz98/GLOOP/commit/164cb00e46aed17a9ca7ecc8f4691f8172cb2b3b), [ebcbd46](https://github.com/joebmz98/GLOOP/commit/ebcbd466020ae6e7577764161b107d08022f2f3c), [1bd62ba](https://github.com/joebmz98/GLOOP/commit/1bd62ba6c0092abd8f88777ac540d17598c1a8fc) e [bbeb6cc](https://github.com/joebmz98/GLOOP/commit/bbeb6cc3b5f8981afd44cd223ed9c571cc13904a), tra **2026-11-06 21:59 UTC** e **2026-11-07 11:42 UTC**, cambiano materialmente DSP e routing.

**Che cosa cambia:** nuovo comb stereo accordato 50 Hz–12 kHz con delay interpolato, damping e soft clip; LFO per traccia o envelope follower post-FX con destinazioni su pitch, volume, grains e parametri FX; due slot FX ordinabili per traccia con dip anti-click; filtro, chorus e risonatore passano a processing block-based. Quattro modi del risonatore sono interlacciati per evitare la catena dipendente del Cortex-M7, da circa 46 a 18 cicli per modo/campione nel modello llvm-mca; l'autore stima 12–15% CPU recuperata con tre risonatori. I test host confrontano vecchio/nuovo entro **−120 dB**.

**Build/hardware:** Daisy Seed via Arduino IDE, DaisyDuino, DFU STM32CubeProgrammer, callback da 48 campioni, buffer loop in SDRAM. MIT. Nessun release asset o CI; sample browser ancora stand-in e SD non implementata.

**Perché vale la pena:** il delta è un esempio concreto di come trasformare una catena FX fissa in un piccolo grafo allocato staticamente, aggiungendo modulazione senza spostare lo stato UI e senza far collassare i grains sotto carico.

**Adattamento Daisy Field / Multi-Delay:** riusare lo schema `Params` stabile → copia `live` modulata per blocco, due slot statici e governor per distribuire tap pitch/resonator/chorus. Per Field serve un nuovo BSP/UI e una misura reale del worst block; compatibilità non provata.

**Caveat:** numeri CPU derivati da modello e test host, non da misure sul Seed; nessun binario; il routing dichiarato “tre track” è in evoluzione mentre il titolo storico dice ancora 2-track.

**Fonti primarie:** [repo](https://github.com/joebmz98/GLOOP) · [firmware](https://github.com/joebmz98/GLOOP/blob/main/src/gloop_fw/gloop_fw.ino) · [licenza](https://github.com/joebmz98/GLOOP/blob/main/LICENSE)

### 3. newdigate/rt1176-evkb — REF_PASS

**Evento verificato:** commit [3210736](https://github.com/newdigate/rt1176-evkb/commit/3210736e9a95c9d775dbc98a3bab4d7b6790ffa5) del **2026-11-07 12:14 UTC**, seguito da [9bbf58e](https://github.com/newdigate/rt1176-evkb/commit/9bbf58e009a1e22034f0b6a045e518cadbbf145a) e [b52ee12](https://github.com/newdigate/rt1176-evkb/commit/b52ee12b0b3ae47c9a2db4df75b3f8ebaebc6dff).

**Che cosa cambia:** il port Arduino/Teensyduino per i.MX RT1176 aggiunge il target indipendente Nosh con codec **SGTL5000** su LPI2C5 e porta 19 gate audio accanto al target EVKB/WM8962. Il gate SD WAV ha trovato un blocco perso deterministico quando il playback iniziava circa 450 ms dopo boot: `-icount shift=auto` rifittava il tempo QEMU e raggruppava tick SAI. Fissando `shift=5`, mono e stereo tornano sample-exact su entrambi i codec/board model.

**Implementazione e build:** Teensy Audio graph, AudioStream, SAI, SD WAV e CMSIS-DSP su RT1176; CMake, dipendenze pinate, custom QEMU e flash LinkServer. Licenza MIT con audit automatico delle dipendenze. Il repository dichiara doppia verifica QEMU/hardware sul vero EVKB; il nuovo Nosh ha gate di bring-up, ma la validazione audio del target fisico resta da distinguere dai test del modello.

**Perché vale la pena:** mostra come rendere riproducibili dropout che sembrano audio/SD ma nascono dal modello temporale del simulatore. È direttamente utile per progettare test deterministici di callback, DMA e streaming del Multi-Delay.

**Adattamento Daisy Field:** copiare il metodo, non il port: fixture WAV, cattura sample-exact e clock virtuale fisso attorno a SD/DMA. Non è firmware Daisy Field né Teensy 4.x pronto da flashare.

**Caveat:** target adiacente RT1176; toolchain e QEMU custom; nessuna release; molte dipendenze vivono in repository sibling; compatibilità Field assente.

**Fonti primarie:** [repo](https://github.com/newdigate/rt1176-evkb) · [commit target Nosh](https://github.com/newdigate/rt1176-evkb/commit/3210736e9a95c9d775dbc98a3bab4d7b6790ffa5) · [fix sample-exact](https://github.com/newdigate/rt1176-evkb/commit/9bbf58e009a1e22034f0b6a045e518cadbbf145a)

## HOLD / esclusi

- **YazKzirius/KzX_Version1:** commit del 7 novembre aggiunge reverb/pitch shift su Teensy, ma il repository non dichiara licenza, non ha release o hardware file e il messaggio stesso segnala audio ancora da regolare.
- **darrenji/hmsl-daisy:** GitLab API conferma head canonico **52fcea0 del 2 novembre**; le date relative indicizzate sono incoerenti. Nessun evento post-overlap.
- **MicroDexed-touch 2.0.5:** release Codeberg del 3 novembre, fuori overlap e già presente nella storia anti-repeat.
- **PJRC voice changer / auto-BPM looper:** Exa ha nuovamente trovato titoli nella pagina latest ma non thread canonici con sorgente/rilascio riproducibile.
- **Daisy forum:** l'unico topic nato il 6 novembre nel feed verificato è supporto MAX4466; nessun nuovo progetto/release in Projects & Examples.

## Tracker updates

- Pubblicati tre record; GLOOP aggiorna il record esistente con delta materiale e nuovo blocco fino al **2026-12-08**.
- StepDaddy aggiunto a selected come riferimento eccezionale firmware + hardware; GLOOP e rt1176-evkb restano solo nei record pubblicati.
- Indice comune rigenerato; registry e prompt state aggiornati.

## Prompt improvement for next run

- **Confermato:** una pagina “latest” non prova un evento; GitLab API ha smontato una data relativa stale.
- **Regola mantenuta:** un repeat entro 30 giorni richiede diff primario che cambi DSP, routing, target, misura o build value; GLOOP lo soddisfa con quattro delta concatenati.
- **Ricerca successiva:** risolvere i thread PJRC solo con URL canonico + sorgente; cercare hardware/CPU evidence per GLOOP e Step Mother; mantenere RT1176 come riferimento, non come falsa compatibilità Teensy/Field.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze.

- **Q1:** A continua così; B meno adjacent; C più adjacent con test.
- **Q2:** A più Daisy; B più Teensy; C bilanciato.
- **Q3:** A richiedere hardware; B accettare CI/test forti; C solo release asset.
- **Q4:** A DSP; B routing/UI; C storage; D audio I/O.
- **Q5:** A repeat solo release; B repeat anche architettura/test materialmente nuovi.
- **Q6:** A forum; B GitHub compare; C host alternativi.
