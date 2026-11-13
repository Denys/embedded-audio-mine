# Daisy + Teensy Watch — 2026-11-13

## Executive summary

Tre aggiornamenti superano la soglia. **Eight4aWish/eurorack_modules — STRONG_PASS** porta il motore caotico Secret su un nuovo hardware Teensy 4.1, con dodici modelli, build PlatformIO, prova su modulo e misure CPU/rumore. **modularev/Nemesis — STRONG_PASS** aggiunge un Juno-106 FAUST misurato contro lo strumento reale e un layer polifonico piccolo, testato bit-identico. **sscheidl/Daisy-Seed — PASS** è un repeat materiale esplicito: non ripubblica il Looper del 7 novembre, ma un nuovo prodotto Cumulonimbus/Toy Piano con quattordici correzioni su concorrenza, freeze, grain cap, fallback dry e telemetria. Tone Trixter resta HOLD nonostante un eccellente delta UAC2/reamp: il repository non espone una licenza.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano attivi hard anti-repeat, priorità a sorgenti/build verificabili e Daisy Field come target di adattamento senza compatibilità presunta.

## Pre-flight / discovery audit

- Data Europe/Zurich: **2026-11-13**; cutoff anti-repeat: **2026-10-14**; overlap: **2026-11-08–2026-11-13**, dall'ultimo scan riuscito dell'8 novembre.
- Profilo: `daily_broad`. Ispezionati README, AGENTS, regole v0.3/hidden-gems/common anti-repeat/feedback, registri published-selected-common, prompt state, source registry, digest Daisy/Teensy dell'8 novembre e history Codex/portable più recenti.
- Discovery: **25 query Exa / 220 risultati richiesti**, senza errori di connessione o rate limit, più fetch primari. Piste separate: Daisy forum, PJRC Audio Projects, GitHub commit/release, pagine progetto e host alternativi.
- Pool serio: almeno 10 lead. Promossi Secret/Teensy Chaos, Nemesis e Cumulonimbus; HOLD o esclusi Tone Trixter per licenza assente, PZD 3.6.7 e Spore 0.5.4 perché antecedenti all'ultimo scan, Gamma per data evento non dimostrata, AMEN_MINI/NI404/Dryftor per assenza di commit post-overlap, Rodeo per refactor USB byte-identico e support replies forum senza release.
- Stop rule: chiusa dopo gli angoli obbligatori, due batch mirati aggiuntivi e verifica primaria di build, licenze, hardware, misure e delta.
- Registry: aggiunti/aggiornati Eight4aWish, Nemesis, sscheidl e Tone Trixter come lead HOLD.

## Ranked entries

### 1. Eight4aWish/eurorack_modules — Secret su Teensy Chaos — STRONG_PASS

**Evento verificato:** commit [5139312](https://github.com/Eight4aWish/eurorack_modules/commit/513931231a4239f5748928c280711bb1a1d95aa5) del **2026-11-11 22:40 UTC**, preceduto dai commit di bench/rumore [9b2dd9c](https://github.com/Eight4aWish/eurorack_modules/commit/9b2dd9c2d3b33ff31256a8524ddee3bd0c348572) e [404b132](https://github.com/Eight4aWish/eurorack_modules/commit/404b1325342ed173194db63453bea8875939c4db). Il repository era già stato pubblicato il 6 giugno: il nuovo target firmware e la prova hardware sono un delta materiale, oltre 30 giorni.

**Che cosa cambia:** Teensy Chaos ora esegue **Secret**, dodici attrattori RK4 suonabili in pitch con parametro TAME, envelope Drone/Gated e avvio delle note allo zero crossing. I jack vengono rimappati su GATE, V/OCT, TUNE CV e CHAOS CV; X/Y alimentano audio e CV. Il display si spegne completamente dopo 20 s per eliminare la charge pump dal percorso di rumore.

**Build, test e hardware:** `pio run -e teensy_chaos -t upload` per Teensy 4.1 con Audio Shield/SGTL5000, OLED 128×64, ADS1115 e MCP4822; firmware taggato `teensy-chaos-final`, flashato e suonato il 2026-11-11. Il bench misura **43–51% di un blocco** a TAME 1; il display acceso aggiungeva circa 11 dB di rumore con riga a 5,7 kHz/−76 dB, mentre spento l'uscita arriva a −85,5 dB(A). Codice originale MIT; NOTICE con licenze per modulo.

**Perché vale la pena:** è un port cross-platform con budget real-time misurato, una UI fisica compatta e un esempio concreto di mitigazione EMI/rumore dal display.

**Adattamento Daisy Field / Multi-Delay:** separare governor per modello, zero-crossing retrigger e spegnimento display in componenti host-testabili; sul Field usarli solo dopo aver rifatto BSP, mapping controlli e misure di callback/rumore. Il repository non contiene un target Field.

**Caveat:** nessun asset binario di release; audio-in non usato; il target è hardware Teensy Chaos specifico.

**Fonti primarie:** [repository](https://github.com/Eight4aWish/eurorack_modules) · [documentazione Teensy Chaos](https://github.com/Eight4aWish/eurorack_modules/blob/main/docs/TEENSY_CHAOS.md) · [PlatformIO](https://github.com/Eight4aWish/eurorack_modules/blob/main/platformio.ini) · [licenza](https://github.com/Eight4aWish/eurorack_modules/blob/main/LICENSE)

### 2. modularev/Nemesis — Juno 0.17 + nemesis-poly — STRONG_PASS

**Evento verificato:** commit [99a0322](https://github.com/modularev/Nemesis/commit/99a0322a6af5acc939e9bcf3e74d69f81fd223e9) e [89b0fd1](https://github.com/modularev/Nemesis/commit/89b0fd1c2d3d37ea54804dd01779b0af1643e844), entrambi del **2026-11-12 11:54 UTC**.

**Che cosa cambia:** il programma Juno 0.17 acquisisce curve misurate da un Juno-106/KR-106: cutoff, envelope, LFO, sub/noise, risonanza, HPF/bass boost, chorus e VCA; corregge fase pulse/saw, mix oscillatori, livelli, factory bank e modi Poly 1/Poly 2/Unison. `nemesis-poly.h` diventa un sostituto leggero di FAUST `poly-dsp.h`: MIDI channel-aware, panic/CC120/123, retrigger, voice stealing e gli stessi path UI.

**Build, test e hardware:** Teensy 4.1 con CS42448, 8×8 TDM a slot 32 bit/24 bit audio; PlatformIO + FAUST, upload con Teensy Loader. Il Juno usa **73% CPU con 12 voci a 48 kHz** o **76% con 6 voci a 96 kHz**; contro A11–A18 reali, 6 patch su 8 restano entro ±0,1 ottava di brightness. Il layer poly supera 24 controlli host con audio bit-identico a `poly-dsp.h`. Software GPL-3.0; hardware CC BY-NC-SA 4.0.

**Perché vale la pena:** combina misure di strumento reale, generazione FAUST, polifonia riusabile e un percorso multicanale a bassa latenza (1,8 ms round-trip a blocchi da 32).

**Adattamento Daisy Field / Multi-Delay:** riusare il metodo “curve grezze → smoothing → verifica acustica” e il layer MIDI/poly come riferimento; per il Multi-Delay lo schema è utile per modulazioni e preset misurati. Field richiede un backend audio/UI separato e verifica CPU: nessuna compatibilità è dimostrata.

**Caveat:** nessuna release/tag o binario precompilato; obblighi GPL sul software derivato e licenza hardware non commerciale; target Nemesis specifico.

**Fonti primarie:** [repository](https://github.com/modularev/Nemesis) · [software/build](https://github.com/modularev/Nemesis/blob/hw-rev-2/software/README.md) · [commit Juno](https://github.com/modularev/Nemesis/commit/99a0322a6af5acc939e9bcf3e74d69f81fd223e9) · [commit poly](https://github.com/modularev/Nemesis/commit/89b0fd1c2d3d37ea54804dd01779b0af1643e844)

### 3. sscheidl/Daisy-Seed — Cumulonimbus/Toy Piano 0.1.2 — PASS — repeat materiale

**Delta verificato entro 30 giorni:** l'alert del 7 novembre riguardava Looper 0.6.1 e la persistenza SD. I nuovi commit [d4b89be](https://github.com/sscheidl/Daisy-Seed/commit/d4b89beaf3a102d150ad777f5f6269e9048d6e33), [18c422c](https://github.com/sscheidl/Daisy-Seed/commit/18c422cfd6a0b2dec6a28faaee42a7b259debad4), [9075282](https://github.com/sscheidl/Daisy-Seed/commit/9075282d0e29412dc70f7134012330f989b8b553) e merge [a97569f](https://github.com/sscheidl/Daisy-Seed/commit/a97569f2636ed5fe33ccaf52b21b956c646e1913), tra **2026-11-11 20:17 UTC** e **2026-11-12 21:12 UTC**, introducono un altro prodotto e un diverso confine real-time: quindi il repeat è materiale.

**Che cosa cambia:** Toy Piano su Cumulonimbus/Clouds e firmware FX standalone 0.1.2 passano a mailbox atomiche per sorgente, grain cap globale, freeze crossfade sui campioni realmente acquisiti, retry CRC corretto, telemetria con snapshot/window metadata e contatori atomici. `WetHost` richiede un ritorno booleano e restituisce **dry esatto** se Cumulonimbus, Echo Delay o SC Reverb rifiutano un blocco.

**Build/test:** licenza MIT; suite host normali + ASan/UBSan, polling browser, build ARM e manifest passano. Sei immagini 0.1.2 sono archiviate come candidati; SC Reverb è solo syntax-checked perché DaisySP-LGPL era assente nell'ambiente. Hardware **non misurato**.

**Perché vale la pena:** è un pattern riusabile per impedire che UI/editor, freeze, overflow o FX non pronti contaminino l'audio callback. Il valore nuovo non è cosmetico e non ripete la storia del Looper.

**Adattamento Daisy Field / Multi-Delay:** portare prima `WetHost`, mailbox per sorgente, exact-dry fallback e snapshot telemetria; poi eseguire sul Field una matrice D32/D48 con freeze/retrigger e overload. Il repository punta Seed3 Desktop Kit, non Field.

**Caveat:** nessuna release pubblica o asset scaricabile; hardware/Field non verificati; alcune componenti dipendono da DaisySP-LGPL.

**Fonti primarie:** [repository](https://github.com/sscheidl/Daisy-Seed) · [Cumulonimbus](https://github.com/sscheidl/Daisy-Seed/tree/main/effects/cumulonimbus) · [commit R9–R12](https://github.com/sscheidl/Daisy-Seed/commit/18c422cfd6a0b2dec6a28faaee42a7b259debad4) · [commit R13–R14](https://github.com/sscheidl/Daisy-Seed/commit/9075282d0e29412dc70f7134012330f989b8b553)

## HOLD / esclusi

- **dylangmiles/daisy-tone-trixter:** tra il 10 e il 12 novembre aggiunge UAC2, ring-control a due rate, priorità OTG sopra SAI DMA, clock SAI corretto a 48 kHz, telemetria e reamp digitale bit-exact provati su Seed3. È tecnicamente eccellente e molto rilevante per Multi-Delay, ma non esiste un file/licenza dichiarata: HOLD fino a chiarimento esplicito.
- **dotrodeo/rodeo:** il nuovo SDK centralizza descrittori MIDI/CDC/UAC1 e li verifica byte-per-byte, ma il comportamento audio resta invariato; entro il blocco di 30 giorni non supera la soglia materiale.
- **PZD 3.6.7:** release canonica del 7 novembre, quindi antecedente all'ultimo scan riuscito; non viene riciclata per riempire il digest.
- **Spore 0.5.4:** release del 12 ottobre, fuori cutoff; build e sorgenti validi ma nessun evento post-overlap.
- **Daisy/PJRC forum:** attività del 9–12 novembre è supporto, resurfacing o thread vecchi; nessuna nuova release/source event verificabile collegata.

## Tracker updates

- Aggiornati tre record: Eight4aWish e sscheidl sono repeat materiali con delta esplicito; Nemesis è nuovo.
- `data/selected-projects.csv` invariato: nessun item raggiunge ancora la soglia di riferimento eccezionale con release completa.
- Indice comune rigenerato; registry e prompt state aggiornati.

## Prompt improvement for next run

- **Confermato:** la data di activity del forum e l'etichetta “latest release” di un aggregatore non sostituiscono la data canonica.
- **Regola mantenuta:** un repeat monorepo può passare se cambia prodotto/target e il diff introduce nuovi confini DSP o real-time verificabili; la sola rifattorizzazione byte-identica resta esclusa.
- **Ricerca successiva:** monitorare Tone Trixter prima di tutto per una licenza; cercare release/asset per Secret e Nemesis; richiedere hardware/Field validation per Cumulonimbus.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze.

- **Q1:** A continua così; B più hardware; C più architettura.
- **Q2:** A più Daisy; B più Teensy; C bilanciato.
- **Q3:** A richiedere release; B accettare build/test forti; C solo hardware misurato.
- **Q4:** A DSP; B USB/audio I/O; C storage; D UI/telemetria.
- **Q5:** A repeat solo release; B repeat anche nuovo prodotto/target con delta materiale.
- **Q6:** A forum; B GitHub compare; C host alternativi.
