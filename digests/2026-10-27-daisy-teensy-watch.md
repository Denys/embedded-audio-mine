# Daisy + Teensy Watch — 2026-10-27

## Esito

1. **Peteranthony1st/PZD-Daisy-Pod-Groovebox v3.4.0 + v3.4.1 — STRONG_PASS** — repeat materiale a un giorno da v3.3.0: il mix/output path cambia davvero e la patch successiva corregge una regressione di stato UI capace di alterare i preset.

## Finestra e metodo

- Data Europe/Zurich: **2026-10-27**; cutoff anti-repeat 30 giorni: **2026-09-27**; overlap: **2026-10-24–2026-10-27**, dall'ultimo scan riuscito del 2026-10-26.
- Profilo: `daily_broad`. Exa: **16 query / 152 risultati richiesti**, più fetch delle pagine primarie; nessun errore di connessione o rate limit.
- Angoli distinti: Daisy Community Projects/Examples e Latest; PJRC Audio Projects e thread mirati; release, compare, commit e sorgenti GitHub; Codeberg, GitLab, SourceHut, Hackaday, altstrument e pagine progetto.
- Gli indici, le date di risposta forum e le pagine cache sono stati usati solo come discovery. Date e delta promossi derivano da release, compare, sorgenti e asset primari.
- Il record PZD pubblicato il 2026-10-26 bloccava il repeat fino al 2026-11-25. L'eccezione è ammessa perché v3.4.0 modifica gain staging/master DSP e v3.4.1 corregge un bug che mutava parametri senza input.

## Finding qualificato

### 1. PZD-Daisy-Pod-Groovebox v3.4.0/v3.4.1 — STRONG_PASS

**Eventi verificati:** [v3.4.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.4.0), pubblicata il **2026-10-26 10:40:01 UTC**, e [v3.4.1](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.4.1), pubblicata il **2026-10-26 17:52:11 UTC**. [Confronto v3.3.0…v3.4.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.3.0...v3.4.0) e [v3.4.0…v3.4.1](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.4.0...v3.4.1).

**Che cosa cambia**

- v3.4.0 centralizza una legge di pan equal-power `cos/sin` per quattro layer, motori e bypass: il centro passa dal vecchio −6 dB lineare a −3 dB e una sorgente registrata in un layer non paga più due attenuazioni successive.
- Aggiunge un soft limiter sul master, meter da −48 a 0 dBFS e controlli separati Master Vol / Bypass Vol. È un cambiamento di gain staging e osservabilità, non un ritocco cosmetico.
- v3.4.1 introduce un vero stato di pickup per i knob quando si cambia pagina. Prima, arrivare su una pagina poteva far prendere il controllo a un potenziometro fermo e, nel caso Dexed, cambiare perfino l'algoritmo del preset; ora il parametro resta immutato finché il knob non viene mosso.
- I compare confermano **un commit per release**: v3.4.0 tocca 15 file inclusi `src/pan_law.h`, mixer/UI, layer ed engine; v3.4.1 modifica `src/ui.cpp`, `src/ui.h` e `DESIGN.md`.

**Build/flash e hardware**

- Target dichiarato: **Daisy Pod**, con OLED I²C 128×64 e socket microSD aggiunti. Non esiste target o prova di compatibilità Daisy Field.
- Asset v3.4.1: `main.bin` (855,336 byte), bootloader `dsy_bootloader_v6_4-intdfu-2000ms.bin` e `sdcard-template.zip`.
- Path pratico: bootloader una tantum via DFU/web programmer; poi `main.bin` sulla root FAT32 e power-cycle per il flash in QSPI. Il repository documenta anche il build da sorgente.
- Licenza firmware: **MIT**. Le dipendenze/vendored DSP mantengono i rispettivi notice.

**Perché vale la pena**

La coppia release mostra due pattern riusabili in firmware audio piccolo ma denso: una policy di gain coerente dall'engine all'output e una state machine di controllo fisico che impedisce salti distruttivi attraversando pagine. Entrambi sono immediatamente pertinenti a un pedale multi-effetto con molte pagine e path dry/wet.

**Adattamento proposto**

Per **Custom Pedals Multi-Delay**, estrarre tre componenti indipendenti: helper equal-power per dry/wet e pan, limiter/meter master con soglie dBFS, e pickup/arming dei controlli per pagina. Su **Daisy Field** usarli come esperimento di porting, aggiungendo un adapter BSP/UI e testando callback budget, headroom, latenza dry/wet e comportamento dei potenziometri; il sorgente non dimostra compatibilità Field.

**Caveat**

Il cambio di pan rende i progetti esistenti circa 3 dB più forti al centro; serve una prova A/B con headroom e limiter reduction misurati. Il fix v3.4.1 è importante ma molto fresco. Asset e build path sono verificati, non è stata eseguita una riproduzione hardware indipendente.

## Candidati trattenuti o esclusi

- **Eight4aWish Mirth:** commit del 2026-10-25 aggiungono nuovi “not-amps” e metadati v1.1.0, ma il progetto era già pubblicato il 2026-10-21 e non c'è una release GitHub/asset nuovo verificato dopo l'ultimo scan; niente backfill.
- **electro-smith/oopsy:** risultati recenti rinviano a prerelease storiche e attività del repository; nessun nuovo tag/release sostanziale verificato. In ogni caso sarebbe `FOUNDATION_UPDATE`.
- **curiosa/sereia / thread PJRC contactless keyboard:** sorgente Teensy 4.1, forja build/upload, Hall sensors e MPE sono concreti, ma l'ultimo commit canonico è del **2026-06-16**; una risposta forum recente non costituisce nuovo firmware.
- **Daisy Community Projects/Examples:** nessun altro evento firmware primario post-overlap ha superato le soglie.
- **Bigorna e altri indici recenti:** nessun nuovo asset firmware o delta architetturale dopo le versioni già coperte.

## Persistenza

- `data/published-repo-log.csv`: PZD aggiornato a v3.4.0/v3.4.1; nuova eleggibilità **2026-11-26**.
- `data/common-anti-repeat-index.csv`: record derivato PZD rigenerato.
- `data/hidden-gems-source-registry.csv`: Daisy, PJRC, PZD e altstrument revalidati al 2026-10-27.
- `data/selected-projects.csv`: invariato; il progetto è già noto e questo è un update, non un nuovo riferimento eccezionale.

## Link primari

- [Repository](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox)
- [Release v3.4.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.4.0)
- [Release v3.4.1](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.4.1)
- [Compare v3.3.0…v3.4.0](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.3.0...v3.4.0)
- [Compare v3.4.0…v3.4.1](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.4.0...v3.4.1)
- [Sorgente pan law](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/blob/v3.4.1/src/pan_law.h)
- [Thread Daisy](https://community.daisy.audio/t/pzd-daisy-pod-4-track-looper/9677)
