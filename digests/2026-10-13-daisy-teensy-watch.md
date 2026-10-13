# Daisy + Teensy Watch — 2026-10-13

## Sintesi / audit
Quattro delta qualificanti: Wish/Beads su due Daisy (STRONG_PASS), MusicBrain Beads su Teensy (PASS), Capicola v1.1.0 (STRONG_PASS, repeat materiale) e VERBtrix ottimizzato (REF_PASS, repeat materiale).

Data Europe/Zurich 2026-10-13; cutoff 30 giorni 2026-09-13; overlap dal 2026-10-11. Main letto a `8620fa27bf59d88aa05bd2a13fc69a09544eb464`. Ispezionati README/AGENTS, regole digest/hidden-gems/anti-repeat/feedback, log, selected, indice, source registry, digest 10/12 e storici Codex/portable; nessun match cross-stream. Circa 20 candidati triagiati su Daisy Projects, PJRC Audio Projects, GitHub release/commit/source, hub indipendenti e host alternativi. Exa senza rate limit; nessun URI della skill Exa era esposto, quindi usati direttamente search/fetch Exa. Le date dei reply sono state solo segnali di scoperta.

## 1. Wish / Beads — STRONG_PASS
Due release v1.0.0 del 2026-10-12: [Alchemy Lab V2](https://github.com/Eight4aWish/eurorack_daisy_patch_init/releases/tag/wish-v1.0.0) e [Daisy patch.Init()](https://github.com/Eight4aWish/eurorack_daisy_patch_init/releases/tag/wish_patch_init-v1.0.0), dopo il commit upstream Beads MIT [d8f4739](https://github.com/pichenettes/eurorack/commit/d8f4739). BIN flashabili 397.7 KB e 263.4 KB; Makefile/submodule pinned; Alchemy via Hermetic Web Programmer/DFU, patch.Init via `make program-dfu` o SD FAT32 documentata.

Il port usa 768 KiB SDRAM per tre delay buffer e 64 KiB reverb in D2/heap. Un governor riduce i nuovi grani oltre l'80% di carico e li ripristina sotto il 60%; i grani attivi restano invariati. Dirty-tape usa 48 kHz perché il codec Alchemy non offre 24 kHz. Patch.Init testato sul banco ai passi 1–5; load/save non verificati.

**Multi-Delay:** riusare governor, freeze/seed e separazione DSP/BSP; su Field sostituire BSP/UI e misurare SDRAM/cache e deadline worst-case. Nessuna compatibilità Field dimostrata. Il repo ha licenze miste, ma questi due target Beads sono MIT e includono notice. [Annuncio Daisy](https://community.daisy.audio/t/mutable-beads-on-two-daisies/9843) · [sorgente/governor](https://github.com/Eight4aWish/eurorack_daisy_patch_init/blob/main/daisy_beads/src/wish.cpp).

## 2. MusicBrain Beads — PASS
Tag [fw-0.5.112](https://github.com/MarkWestbroek/MusicBrain/releases/tag/fw-0.5.112) pubblicato 2026-10-12 23:15 UTC (13 ottobre a Zurigo), HEX 5.3 MB. Aggiunge Beads al patcher Teensy 4.1/PSRAM con DSP condiviso fra WASM e wrapper `AudioStream`; PlatformIO `teensy41` pinning Teensy 5.1.0/GCC 11 e workflow taggato.

Memoria: 768 KiB capture via FxMem/PSRAM + cache 32 KiB; reverb 64 KiB heap; conversione 24/32/48 kHz verso 44.1 kHz. Release log del maintainer, test 2026-10-13: grani 9–17% CPU, wavetable 14%, delay 54–58% (Tape+ 29%). Sono misure riportate dall'autore, non riprodotte qui. Il README/plan è indietro rispetto al release log; CV liberamente assegnabile e AGC originale non implementati.

**Multi-Delay:** buon riferimento per DSP portabile + wrapper hardware sottile; misurare separatamente tap e feedback. Il delay al 54–58% è un warning; nessun port Field. [Wrapper](https://github.com/MarkWestbroek/MusicBrain/blob/main/firmware/app-modular-brain/src/BeadsModule.h) · [PlatformIO](https://github.com/MarkWestbroek/MusicBrain/blob/main/firmware/app-modular-brain/platformio.ini) · [risultati CPU](https://github.com/MarkWestbroek/MusicBrain/blob/main/doc/RELEASE-LOG.md) · [MIT](https://github.com/MarkWestbroek/MusicBrain/blob/main/LICENSE).

## 3. Capicola v1.1.0 — STRONG_PASS, repeat materiale
[Release v1.1.0](https://github.com/heavylight-industries/capicola/releases/tag/v1.1.0), 2026-10-09, ripetizione ammessa dopo l'alert v1.0.0: nuovo firmware taggato e delta sostanziale. Trig1/Env1 diventano CV2/CV3; Trig2/Env2 portano follower selezionabili; aggiunti livelli live, 16 slot save history, load/reset da pannello, SHIFT snap e manuale interattivo. BIN 233.4 KB; CMake ARM e DFU USB-C documentati.

**Multi-Delay:** riusare routing puro/host tests e snapshot preset. Caveat: preset v1.0.0 incompatibili; AGPL-3.0; target Alchemy Lab V2, non Field. [Routing](https://github.com/heavylight-industries/capicola/blob/main/src/jack_routing.h) · [build/flash](https://github.com/heavylight-industries/capicola/blob/main/README.md) · [licenza](https://github.com/heavylight-industries/capicola/blob/main/LICENSE).

## 4. VERBtrix — REF_PASS, repeat materiale
Commit [ef2ae5d](https://github.com/basscheffers/VERBtrix/commit/ef2ae5dfc195be787bc7315ef7402ff02b7f61ed), 2026-10-04, aggiorna l'alert draft del 21 settembre: inlining/unrolling M7 e target interi per allpass/pre-delay. Conteggio istruzioni riferito dal maintainer 2069→1556 per campione stereo (-25%); test host RT60 broadband entro ~5% a size 0.2/0.5/1.5 e freeze drift ~-1 dB/30 s. Libreria Arduino MIT Teensy 4.x, core float, wrapper AudioStream, esempi e harness RT60/stabilità/parameter-sweep.

**Multi-Delay:** utile per testare fractional taps/decay; evitare interpolazione frazionaria quando il delay è fermo. Versione precedente misurata 13% CPU su Teensy 4.1; ~10% ottimizzata è stima. Il codice nuovo non è ancora stato flashato/ascoltato e non esiste release tag. [Repo/build](https://github.com/basscheffers/VERBtrix) · [MIT](https://github.com/basscheffers/VERBtrix/blob/main/LICENSE).

## HOLD / non promossi
- ESP-beatsy: commit `94f3324` (2026-10-12 19:23 UTC) aggiunge mute PCM S/PDIF in un solo file; troppo stretto per ripetere l'alert di ieri, senza release/CI/prova hardware.
- AMEN_MINI: sample player bloccato da guasto SGTL5000/I²C riportato; firmware attualmente MIDI-only e licenza CC BY-NC 4.0.
- Seed3 Pedal Dev Kit: ultimo update source/licenza 2026-10-06, fuori overlap; nessun nuovo evento hardware oggi. DaisyPatcher, PJRC, DaisySeedProjects, PZD, CHOMPI e CHORALE non hanno un delta qualificante oltre le baseline.

## Tracker / prossima scansione
Log: Capicola aggiornato a last_published 2026-10-13; aggiunti Wish, MusicBrain e VERBtrix. Selected: aggiornato Capicola; aggiunti Wish, MusicBrain, VERBtrix e Beads upstream come riferimenti eccezionali. Indice comune rigenerato con blocchi fino al 2026-11-12. Source registry revalidato/esteso con pagine primarie; prompt state aggiornato, nessuna regola durevole cambiata.

Prossimo run: Wish, cercare test load/save e adapter Field; MusicBrain, seguire CPU delay e allineamento release log/README; Capicola/VERBtrix non ripetere prima del 2026-11-12 salvo delta materiale. Questionario differito per run schedulato non interattivo; nessuna preferenza inferita.
