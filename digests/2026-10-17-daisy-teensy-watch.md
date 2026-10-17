# Daisy + Teensy Watch — 2026-10-17

Audit: cutoff Zurich 2026-09-17, overlap dal 2026-10-10; letti README/AGENTS/regole, tracker/index e digest recenti/Codex/portable. Oltre 15 candidati. PJRC fetch diretto Exa: CRAWL_NOT_FOUND.

- **PZD v2.5.0, STRONG_PASS** ([release](https://github.com/Peteranthony1st/PZD-Daisy-Pod-4-Track-Looper/releases/tag/v2.5.0), 2026-10-16): buffer reverb ~166 KB in SRAM, scratch WAV ~196 KB in SDRAM; CPU reverb ~30% -> ~11%, carico looper+Dexed+grains ~70%. Multi-Delay: profilare callback/memory tier sul Daisy Field. Pod-only.
- **Wish/Beads v1.0.0, PASS** ([repo](https://github.com/Eight4aWish/eurorack_daisy_patch_init), 2026-10-12): due firmware Daisy, DSP granular/freeze/reverse, binari e bench. Governor: 104/114% worst senza, 61/83% con. Multi-Delay: modalità texture; Patch.Init save/load non testato, no Field.
- **Floret 3f2f41d, PASS** ([repo](https://github.com/a7v7/floret), 2026-10-13): kernel C11, telemetry ST-Link, UAC2 stereo. Autore: callback late 24.9% stock vs zero con IRQ table; USB ~2.5% CPU. Multi-Delay: stress test; Linux/Field non testati.

HOLD: RidgeField fino 2026-11-08; ESP-beatsy fino 2026-11-11. PC-1: firmware privato. Prossimo run: Wish save/load, Floret Linux/Field, retry PJRC. Questionnaire: Q1 direzione; Q2 priorità; Q3 gate evidenza; Q4 target; Q5 repeat; Q6 adattamento.
