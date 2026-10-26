# Daisy + Teensy Watch — 2026-10-26

## Executive summary

Un solo aggiornamento supera la verifica primaria e l'anti-repeat:

1. **Peteranthony1st/PZD-Daisy-Pod-Groovebox v3.3.0 — STRONG_PASS** — repeat materiale a un giorno da v3.0.0: v3.2.0 introduce un bus delay stereo riusabile e v3.3.0 sostituisce tutti i filtri con un SVF trapezoidale più leggero, con nuovi asset flashabili.

La ripetizione entro 30 giorni è giustificata da due release firmware, 18 commit e 46 file cambiati rispetto a v3.0.0. Non sono stati promossi thread con sole risposte recenti, commit cosmetici o firmware FM-1 adiacenti senza un delta più utile per Daisy/Teensy.

## Previous questionnaire feedback applied

none recorded. Il silenzio non modifica le preferenze: restano prioritari verifica primaria, anti-repeat e valore concreto per DSP/audio firmware.

## Pre-flight / discovery audit

- Data Europe/Zurich: 2026-10-26; cutoff 30 giorni: 2026-09-26; overlap: 2026-10-23–2026-10-26.
- Ispezionati README, AGENTS, regole v0.3, hidden-gems e common anti-repeat, prompt state, publication/selected/common tracker, digest del 2026-10-25 e storie Codex/portable weekly.
- Profilo: `daily_broad`. Exa: 16 query, 154 slot richiesti e fetch primari; nessun errore di connessione o rate limit.
- Angoli distinti: Daisy Projects/Examples e Latest, PJRC Audio Projects e thread mirati, GitHub release/commit, Codeberg, GitLab, SourceHut, Hackaday, altstrument e pagine progetto.
- Pool plausibile: PZD v3.2.0/v3.3.0, Bigorna post-build-69, ACID FM, FM1 Field, MetaModule surge build, PJRC UAC2 async, Jeannie, tastiera contactless Teensy, Daisy forum latest e firmware FM-1 recenti. Un solo elemento promosso.
- Daisy Community non mostra un nuovo thread/progetto con evento firmware primario nel periodo. PJRC mostra attività recente, ma le date dell'indice e delle risposte non dimostrano una release; i thread UAC2 e Jeannie restano senza un evento sorgente post-overlap verificabile.
- Bigorna ha soprattutto cambiamenti demo/sito dopo build 69, non un nuovo delta firmware sufficiente.
- Stop rule: una seconda passata mirata su PJRC, Daisy e gli upstream recenti non ha prodotto un secondo candidato comparabile.
- Search debt: risolvere l'URL canonico PJRC UAC2 e richiedere repository/build; non ripetere PZD prima del 2026-11-25 salvo nuovo target, motore, misura indipendente o release architetturale.

## Ranked entry

### 1. PZD-Daisy-Pod-Groovebox v3.3.0 — STRONG_PASS

**Eventi verificati:** [v3.2.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.2.0), pubblicata il **2026-10-25 12:12:16 UTC**, e [v3.3.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.3.0), pubblicata il **2026-10-25 17:15:32 UTC**. [Confronto v3.0.0…v3.3.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.0.0...v3.3.0): 18 commit, 46 file.

**Cosa è cambiato**

- Il commit [5d7bc6a](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/5d7bc6aada62cdbca91e34403b010c4c4819f2ed) centralizza delay live ed export WAV in `SharedDelay::Bus`: stereo, 20 ms–3 s, feedback incrociato, ping-pong continuo, filtro sui repeat, sync 1/16–1/2 e send delay→reverb.
- Le impostazioni delay vengono salvate nelle performance e nei default di avvio; il live input ottiene send Reverb e Delay separati.
- Il working set dei motori è spostato nella memoria più veloce; v3.2.0 dichiara circa 4% CPU in meno a pieno carico.
- Il commit [ba148e9](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/ba148e97b9839b60beba3e020cef72b14313f0ea) sostituisce tutti i `daisysp::Svf` con un TPT/SVF trapezoidale stabile e a singolo passaggio. Il test dell'autore passa da **73/85% a 65/76%** CPU medio/picco.
- Ensemble aggiunge gain 0…+12 dB nel limiter e 16 preset riscritti; i preset factory Ensemble/Dexed funzionano senza SD.
- v3.3.0 include `main.bin` (834,3 KB), bootloader v6.4 (127,1 KB) e template SD (9,1 MB). Licenza MIT e build Make/libDaisy restano presenti.

**Hardware/elettronica:** target documentato Daisy Pod, OLED I2C SSD1306/SSD1309 e microSD FAT32. Ingressi line-level; strumenti passivi e microfoni richiedono un front-end esterno.

**Perché vale l'esame:** il nuovo `SharedDelay::Bus` è un esempio concreto di separazione tra stato/UI, DSP real-time e rendering offline, con un unico comportamento sonoro e stato persistente. Il TPT SVF mostra inoltre un risparmio di callback significativo su un'applicazione già densa.

**Adattamento Multi-Delay / Daisy Field:** usare il contratto `Settings/Configure/Process` come base per tap stereo, divisioni musicali, tone-in-feedback e routing delay→reverb; mantenere una sola implementazione condivisa fra callback, bounce/test e preset migration. Sul Field sarebbe necessario scrivere adapter BSP/UI, allocare esplicitamente SDRAM e misurare callback, memoria e headroom: il repository non contiene una build Field, quindi non viene affermata compatibilità.

**Caveat:** i numeri CPU sono misure dell'autore, non riprodotte indipendentemente; buffer stereo 3 s circa 1,15 MB SDRAM; feedback limitato a 0,9 e nessun self-oscillation; target Pod soltanto. Le note release dichiarano generazione con Claude Code, quindi il diff e il comportamento hardware meritano revisione manuale.

## HOLD / rejected

- **Bigorna post-build-69:** commit successivi principalmente demo/sito; nessun tag, motore DSP o misura hardware nuova sufficiente per un repeat.
- **PJRC UAC2 async / Jeannie / tastiera contactless:** indice o risposte recenti, ma nessun evento firmware post-overlap con sorgente/build canonico verificato.
- **Daisy forum Projects/Examples:** nessun nuovo evento primario nel periodo; le activity date non sono state usate come release evidence.
- **Firmware FM-1 e altri indici recenti:** adiacenti o già coperti; nessun elemento supera PZD per rilevanza Daisy/Teensy e Multi-Delay.

## Analysed resources

Daisy Projects/Examples e Latest, PJRC Audio Projects e ricerche thread dirette, release/commit GitHub, Codeberg, GitLab, SourceHut, Hackaday, altstrument Recent e pagine primarie dei candidati.

## Tracker updates

- `data/published-repo-log.csv`: PZD aggiornato a v3.3.0 con repeat materiale.
- `data/common-anti-repeat-index.csv`: record derivato PZD rigenerato.
- `data/hidden-gems-source-registry.csv`: PZD, Daisy, PJRC e altstrument revalidati.
- `data/selected-projects.csv`: invariato.
- `data/prompt-evolution-state.yaml`: avanzato al 2026-10-26.

## Prompt improvement for next run

Migliorato: confronto release→commit ha distinto un vero delta architetturale da una rapida sequenza di versioni. Debole: la title resolution PJRC continua a restituire indici invece degli URL canonici. Prossimo test: risolvere thread ID tramite link diretto e richiedere sempre un upstream buildabile prima di contare la data.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze.

- Q1: più Daisy / più Teensy / bilanciato.
- Q2: privilegiare release asset / misure / architettura.
- Q3: più DSP delay-granular / UI-storage / audio I/O-clock.
- Q4: mantenere massimo 2–3 finding / ampliare quando la qualità regge.
- Q5: repeat ancora più conservativo / attuale delta materiale.
- Q6: più forum / più alternative host / più commit-release.
