# Daisy + Teensy Watch — 2026-11-15

## Executive summary

Un solo aggiornamento supera la soglia: **spamatica/DaisySeedProjects v1.0.0 — STRONG_PASS**. È un fork firmware sostanziale della piattaforma pedale Daisy Seed di bkshepherd: aggiunge selezione e generazione delle build, catene di effetti, caricamento NAM A2, telemetria CPU/memoria e oltre venti nuovi effetti. L'annuncio è del **2026-11-14**; il repository offre sorgente, Make/DFU, licenza e misure, ma non una tag GitHub né binari precompilati.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano attivi hard anti-repeat, verifica primaria di data/build/licenza, e Daisy Field come target di valutazione senza compatibilità presunta.

## Pre-flight / discovery audit

- Data Europe/Zurich: **2026-11-15**; cutoff anti-repeat: **2026-10-16**; overlap: **2026-11-14–2026-11-15**, dall'ultimo scan riuscito del 14 novembre.
- Profilo: `daily_broad`. Verificati README, AGENTS, regole v0.3/hidden-gems/common anti-repeat, registri published/selected/common, source registry, digest Daisy/Teensy del 14 novembre, history Codex settimanale e portable-weekly del 14 novembre.
- Discovery: **19 query Exa / 200 risultati richiesti**, più fetch primari e ricerca commit GitHub. Angoli separati: Daisy forum, PJRC Audio Projects, GitHub commit/release e host alternativi/pagine progetto.
- Il forum Daisy ha fornito il lead; data e delta sono stati verificati sul repository. Le date di indice/reply PJRC non sono state trattate come release.
- Stop rule: chiusa dopo i quattro angoli obbligatori e batch indipendenti senza un secondo candidato pubblicabile.
- Anti-repeat: l'upstream `bkshepherd/DaisySeedProjects` è stato pubblicato il 2026-10-11 ed è fuori dalla finestra; il fork non era presente nei tre registri e il delta v1.0.0 è materiale.

## Ranked entry

### 1. spamatica/DaisySeedProjects v1.0.0 — STRONG_PASS

**Evento verificato:** il post Daisy Community #320 annuncia “Firmware fork release!” e **v1.0.0** il **2026-11-14 20:31 CET**. Il repository contiene la release note v1.0.0 e il commit corrente [bfc449f](https://github.com/spamatica/DaisySeedProjects/commit/bfc449f496ee0dbfe4fab99dffc3d22b3d438f79), datato **2026-11-14 19:59:18 UTC**. Non esistono tag o asset GitHub Releases: l'evento canonico è l'annuncio, verificato contro sorgente e documentazione.

**Che cosa cambia:** elaborazione a blocchi e livelli normalizzati; `pedal_setup` seleziona hardware, effetti e catene; unità dei parametri e font auto-resize; caricamento di modelli NAM A2 da `.nam`/`.zip` con calibrazione host. Arrivano oltre venti effetti o port: duck compressor, test tone con misura di latenza, Screamer/Muff/HM-2, wavefolder antialiased, Chebyshev exciter, tape saturation/wear, spring reverb fisico 2–6 molle, multi-phaser, formant/vowel, dirty reverb e la famiglia FunBox. Il runtime aggiunge gain globale, trails, knob lock, mapping footswitch e diagnostica CPU peak/average, heap e OOM.

**Build e flash:** licenza root MIT; alcuni effetti opzionali sono GPLv3 e vanno selezionati consapevolmente. Il percorso documentato usa ARM GCC 15.3, submodule libDaisy/DaisySP/q/gcem, `./ci/build_libs.sh`, `./pedal_setup`, `make -j4`, quindi `make program-boot` o `make program-dfu`. Target firmware: 125B, 1590B, 1590B_SMD, Terrarium e FunBox. Non vengono distribuiti binari perché le combinazioni sono numerose.

**Evidenza real-time:** `effects-resource-usage.json` espone budget DTCM/RAM_D2/SRAM/SDRAM e misure per effetto. Il callback base è circa 2,3%; esempi dichiarati: Venus 20,8% medio/76,6% picco, Jupiter 43,2/49,2, Neptune 53,2/59,8 e CloudSeed 50,8/59,0. La maggior parte deriva da `CpuLoadMeter` sul pedale; alcune righe sono stime o report host/build e non vanno confuse con misure hardware indipendenti.

**Hardware/elettronica:** riusa la famiglia pedale Daisy Seed di bkshepherd con target 125B/1590B, Terrarium e FunBox; questa voce classifica il firmware, non una nuova revisione PCB.

**Perché vale la pena:** è una delle rare basi community che lega catalogo DSP, composizione della firmware image, budget di risorse, diagnostica real-time e percorso DFU in un unico progetto riusabile.

**Adattamento Daisy Field / Custom Pedals Multi-Delay:** riusare `pedal_setup`, il manifest di risorse e i gate CPU/heap/OOM per costruire una variante Multi-Delay con tape wear, duck compressor e dirty reverb; portare inoltre catene, trails e mapping footswitch come snapshot di scena. Il repository **non contiene un target Daisy Field**: servono BSP/control mapping, verifica codec/audio-I/O e profiling sul Field prima di dichiarare compatibilità.

**Caveat:** sorgente-only; molte combinazioni non sono testate; MIDI è dichiarato non testato; picchi molto alti di alcuni effetti riducono il margine di catena; licenze miste per gli effetti opt-in; misure non indipendenti.

**Fonti primarie:** [annuncio forum](https://community.daisy.audio/t/my-daisy-guitar-pedal-designs-on-github/3641/320) · [repository](https://github.com/spamatica/DaisySeedProjects) · [release note v1.0.0](https://github.com/spamatica/DaisySeedProjects/blob/main/Software/GuitarPedal/ReleaseNote_v1.0.0.md) · [build/flash](https://github.com/spamatica/DaisySeedProjects/blob/main/Software/GuitarPedal/docs/GENERATE_AND_DEPLOY_FIRMWARE.md) · [setup](https://github.com/spamatica/DaisySeedProjects/blob/main/Software/GuitarPedal/docs/SETUP.md) · [resource usage](https://github.com/spamatica/DaisySeedProjects/blob/main/Software/GuitarPedal/effects-resource-usage.json) · [licenza](https://github.com/spamatica/DaisySeedProjects/blob/main/LICENSE)

## HOLD / esclusi

- **Electrotechnique/TSynth-Teensy4.1 v3.01:** release del 14 novembre con HEX, blocchi da 64 sample, filtri/oscillatori/ensemble riscritti e forte riduzione CPU, ma nessuna licenza esplicita trovata nel repository: HOLD.
- **anguslmm/pocket-groove:** nuovi commit Daisy Seed con core portabile, QSPI/SRAM, simulatore, fault-test di persistenza, pad/touch/line-in e path float-codec; manca una licenza esplicita e l'hardware non è ancora validato: HOLD.
- **mplsartindustry/daisy:** il risultato indicizzato come recente risale canonicamente al 6 novembre: escluso dal periodo.
- **PJRC:** il thread tastiera contactless e la discussione USB multicanale non hanno fornito un nuovo evento sorgente/release verificabile nel periodo.
- **tomcoolpxl/CoolSynth:** commit JUCE desktop con test allocazione/NaN; nessun port o budget embedded, sotto soglia per questo watch.

## Tracker updates

- Pubblicato `spamatica/DaisySeedProjects` con hard repeat fino al **2026-12-15**.
- `data/selected-projects.csv` resta invariato: l'upstream bkshepherd è già il riferimento selezionato e duplicare il fork non aggiunge valore.
- Aggiornati indice comune, source registry e prompt state.

## Prompt improvement for next run

- **Regola mantenuta:** un annuncio forum può fissare l'evento, ma solo se release note, sorgente, build e licenza confermano il delta.
- **Nuovo debito:** recheck TSynth e pocket-groove solo dopo comparsa della licenza; per pocket-groove richiedere anche prova hardware.
- **Test Field:** usare manifest CPU/memoria e una catena Multi-Delay ridotta come banco, senza inferire compatibilità.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze.

- **Q1:** A continua così; B più hardware; C più architettura.
- **Q2:** A più Daisy; B più Teensy; C bilanciato.
- **Q3:** A richiedere release; B accettare build/test forti; C solo hardware misurato.
- **Q4:** A DSP; B USB/audio I/O; C storage; D UI/telemetria.
- **Q5:** A repeat solo release; B repeat anche nuovo prodotto/target con delta materiale.
- **Q6:** A forum; B GitHub compare; C host alternativi.
