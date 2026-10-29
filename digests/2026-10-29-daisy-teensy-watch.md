# Daisy + Teensy Watch — 2026-10-29

## Esito

1. **Peteranthony1st/PZD-Daisy-Pod-Groovebox v3.5.1 — STRONG_PASS** — repeat materiale verificato: nuova release flashabile che amplia il gain staging e l'osservabilità della catena audio rispetto alla v3.5.0 pubblicata ieri.

## Previous questionnaire feedback applied

Nessuna risposta esplicita registrata. Restano invariati verifica primaria, hard anti-repeat, priorità alla community e valore riusabile per DSP/audio firmware.

## Finestra e metodo

- Data Europe/Zurich: **2026-10-29**; cutoff anti-repeat 30 giorni: **2026-09-29**; overlap: **2026-10-26–2026-10-29**, dall'ultimo scan riuscito del 2026-10-28.
- Profilo: `daily_broad`. Exa: **26 query / 263 risultati richiesti**, più fetch primari e verifica GitHub API; nessun errore di connessione o rate limit.
- Angoli distinti: Daisy Community Projects/Examples e Latest; PJRC Audio Projects/Blog Project Submission e thread mirati; release, compare, commit e sorgenti GitHub; host alternativi e pagine progetto.
- Date di reply forum, indici e cache sono state usate solo per discovery. Il finding deriva da release, compare, commit e asset primari.
- PZD era bloccato fino al 2026-11-27. L'eccezione è ammessa perché v3.5.1 è una release post-scan con modifiche reali a gain staging, monitoraggio, persistenza e controllo del delay, non attività cosmetica.

## Finding qualificato

### 1. PZD-Daisy-Pod-Groovebox v3.5.1 — STRONG_PASS

**Evento verificato:** [v3.5.1](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.5.1), pubblicata il **2026-10-28 20:37:17 UTC**, tag sul commit **9dd2b24**. Il [compare v3.5.0…v3.5.1](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.5.0...v3.5.1) contiene **2 commit** e modifica 13 file, inclusi i tre engine, persistenza e UI.

**Che cosa cambia**

- Dexed, Ensemble, SMPVO/SMPDR e Grains ricevono pagine Mix coerenti con scope live e meter con clip cap.
- Ogni engine ha **Gain da 0 a +12 dB prima del soft limiter**: separa l'allineamento del livello interno dal volume nel mix e consente di spingere intenzionalmente il limiter.
- Filter, Reverb, RevTone, RevDiff, Dly-Rev, Delay e DlyTone mostrano lo scope del mix finale; Bypass ha scope e meter propri.
- Il Delay espone B1 = Sync Off e B2 = Sync On, con stato/BPM sempre visibile.
- Il gain entra nella persistenza Dexed (preset v4) e SMPVO/SMPDR (v2/v3); i preset vecchi caricano a 0 dB. Il gain Grains resta di sessione. Questo è il delta materiale che giustifica il repeat entro 30 giorni.

**Build/flash, licenza e hardware**

- Release con `main.bin` (**886.968 byte**), `dsy_bootloader_v6_4-intdfu-2000ms.bin` e `sdcard-template.zip`; quest'ultimo è invariato dalla v3.5.0.
- Percorso pratico invariato: bootloader una tantum via DFU/web programmer, poi `main.bin` su SD FAT32 e power-cycle per il flash QSPI; il repository mantiene Make/libDaisy per la build da sorgente.
- Licenza root **MIT**. Target dichiarato **Daisy Pod** con OLED e microSD aggiunti. Non esiste target o prova di compatibilità Daisy Field.

**Perché vale la pena**

Il valore tecnico è la separazione esplicita fra trim pre-limiter, level/pan di mix e metering. È un pattern riusabile per evitare che preset, sample e motori eterogenei arrivino alla matrice delay/reverb con headroom incoerente. Gli scope distribuiti rendono inoltre osservabili i confini engine → limiter → master FX senza introdurre un debugger nel callback audio.

**Adattamento proposto**

Per **Custom Pedals Multi-Delay**, aggiungere un trim pre-saturazione per ingresso/tap, meter peak+clip a valle di ciascun tap e uno scope o statistiche sul bus finale prima del limiter. Persistenza versionata con default 0 dB consente di introdurre il gain staging senza rompere preset esistenti. Su **Daisy Field** trattare il codice soltanto come riferimento: creare un adapter BSP/UI e misurare callback budget, cache/DMA, latenza e SDRAM; il sorgente PZD non prova compatibilità Field.

**Caveat**

- Il progetto è dichiarato in active testing e sta pubblicando release ravvicinate.
- La nuova release è soprattutto un cambiamento di UI, gain staging e persistenza: non aggiunge un nuovo motore DSP né un nuovo target hardware.
- Nessuna misura indipendente documenta overhead di scope/meter o comportamento del limiter con +12 dB.
- UI, OLED, microSD e percorso di flash sono Pod-specifici; la licenza MIT del firmware non sostituisce i termini di dipendenze e contenuti audio.

## Candidati trattenuti o esclusi

- **Electro-Smith Oopsy:** il thread è stato riattivato, ma le release primarie restano beta del 2021; nessun nuovo tag o commit post-scan verificato.
- **palmerr23/Teensy8x8AudioBoard + control_TLV320AIC3104:** reply recente nel thread “Updated 8x8 and 16x16 audio”, ma gli ultimi commit verificati restano del 2026-10-21 e 2026-10-17, già coperti dal digest Codex weekly del 2026-10-28; nessun delta materiale successivo.
- **Jeannie / “New Teensy 4.1 DIY Synthesizer”:** thread originario del 2020, riemerso per una risposta recente; nessun nuovo evento firmware verificato.
- **nikhilt0203/SandBox:** post forum recente, ma repository senza release, senza licenza dichiarata e fermo al commit README del 2026-02-22; fuori overlap come evento sorgente.
- **PJRC “Improvements to FFT”:** attività forum recente senza commit post-scan nei repository Audio verificati.
- **Daisy Community Projects/Examples e altri risultati GitHub/host alternativi:** nessun altro evento primario post-scan ha superato novità, build e anti-repeat.

## Persistenza

- `data/published-repo-log.csv`: record PZD aggiornato a v3.5.1; nuova eleggibilità **2026-11-28**.
- `data/common-anti-repeat-index.csv`: record derivato PZD rigenerato.
- `data/selected-projects.csv`: invariato; update rapido di un riferimento già noto, non un nuovo watch eccezionale.

## Link primari

- [Repository](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox)
- [Release v3.5.1](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/releases/tag/v3.5.1)
- [Compare v3.5.0…v3.5.1](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/compare/v3.5.0...v3.5.1)
- [Commit implementativo 11f277f](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/11f277f77514065beaeb959796dc5ec43a8786d7)
- [Commit tag 9dd2b24](https://github.com/Peteranthony1st/PZD-Daisy-Pod-Groovebox/commit/9dd2b24219eb37ca4b61ec3cd7e8c147283d36a5)
- [Thread Daisy](https://community.daisy.audio/t/pzd-daisy-pod-4-track-looper/9677)

## Prompt improvement for next run

- **Migliorato:** il confronto “ultimo tag alertato → tag corrente” ha catturato una release pubblicata dopo la scansione del giorno precedente.
- **Debole:** gli indici forum PJRC continuano a confondere reply recenti con progetti nuovi; la data primaria resta obbligatoria.
- **Regola proposta, non permanente:** per repository in repeat block, promuovere patch release solo se il compare modifica codice runtime/persistenza/hardware e la release offre un asset o un build path verificabile.
- **Recheck:** PZD bloccato fino al 2026-11-28 salvo nuovo target/engine, fix audio-state critico, misure hardware o altra architettura release-level; PJRC richiede un commit/tag/asset successivo al 2026-10-28.
- **Delta compatto:** `compare alerted_tag...current_tag; accept patch releases only with runtime/persistence/hardware delta plus asset/build evidence; forum replies remain discovery-only`.

## Feedback / Tuning Questionnaire

Nessuna risposta è richiesta; il silenzio non modifica le preferenze. Risposta compatta possibile: `Q1=B Q2=A Q3=C Q4=B Q5=A Q6=D`.

- **Q1 — Direzione:** A continua così; B verifica più profonda; C soglia novità più alta; D più finding quando reggono.
- **Q2 — Ecosistema:** A più Daisy; B più Teensy; C bilanciato.
- **Q3 — Valore tecnico:** A DSP delay/granular; B UI/preset/storage; C audio I/O, clock e gain staging; D hardware open.
- **Q4 — Evidenza:** A richiedere sempre asset flashabile; B accettare source-only con build riproducibile; C privilegiare misure hardware.
- **Q5 — Repeat:** A mantenere l'attuale eccezione materiale; B ammettere solo nuovo target/release maggiore; C ammettere anche fix critici di stato/audio.
- **Q6 — Lane da espandere:** A Daisy forum; B PJRC; C GitHub release/compare; D Codeberg/GitLab/SourceHut; E pagine personali/indici low-SEO.
