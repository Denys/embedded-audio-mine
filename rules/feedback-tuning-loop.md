# Feedback Tuning Loop

This rule applies to both discovery streams unless a task explicitly disables it:

- Embedded Audio Mine daily
- Analog Audio Mine weekly

Its purpose is to make each run leave behind better search priorities, stricter failure handling, and a compact next-run state instead of merely producing another static digest.

## Stable kernel + mutable state

Do not grow the main prompt indefinitely. Treat the research system as four layers:

```text
stable rules
+ data/prompt-evolution-state.yaml
+ last-run critique
+ next-run search queue
```

The rule files hold durable behavior. `data/prompt-evolution-state.yaml` holds compact mutable state such as active focus, explicit user feedback, recheck queues, temporary boosts/penalties, and search debt.

Candidate rows in the mutable state are research leads only. They are never publication evidence. Canonical anti-repeat state remains the publication trackers and committed ranked digests.

## End-of-run self-improvement block

Every digest must end with a concise `Prompt improvement for next run` section containing:

1. What improved in the current run.
2. What failed or remained weak.
3. Search lanes that were underused or noisy.
4. New or changed promotion/exclusion rules justified by explicit feedback or observed failure modes.
5. Recheck queue changes.
6. A compact next-run prompt delta.

Record durable rule proposals in this shape:

```yaml
rule_change:
  date: YYYY-MM-DD
  stream: daily|weekly_analog|shared
  change:
  failure_mode_fixed:
  expected_improvement:
  regression_risk:
  test_case:
  acceptance_criteria:
  keep_or_remove_decision:
```

Do not silently promote a temporary preference into a permanent hard rule. Explicit user feedback has priority; observed failure patterns may create a proposed rule that should be tested on the next run.

## Interactive Feedback / Tuning Questionnaire

Attach a short multiple-choice questionnaire to every digest. It is an engineering-control surface for the research process, not a satisfaction survey.

Requirements:

- 6–8 questions maximum;
- answer codes such as `Q1=B Q2=A Q3=D`;
- every answer maps to a concrete next-run action: ranking boost, penalty, exclusion, evidence gate, source-lane priority, output-depth change, or recheck priority;
- keep the stable core questions when useful, but rotate 1–2 questions to target the current run's failure modes;
- never ask redundant questions whose answers would not change the next run;
- never infer an answer from silence.

The next run must begin with:

```markdown
## Previous questionnaire feedback applied
```

and list the exact changes caused by the previous answers.

### Stable question families

1. Overall direction: continue / deeper verification / too obvious / too shallow / wrong direction.
2. Project type to boost.
3. Evidence or hardware-source strictness.
4. Scope-definition strictness, such as standalone versus carrier/module tolerance.
5. Novelty threshold.
6. Physical-control or UI preference.
7. Evidence/engineering depth.
8. Search lanes to expand.

### Mapping rules

Examples:

```yaml
Q1=C:
  action: raise_novelty_threshold
Q3=A:
  action: require_strict_primary_artifact_gate
Q5=A:
  action: prefer_obscure_even_if_less_polished
Q7=D:
  action: require_engineering_critique_and_adaptation_plan
Q8=E:
  action: expand_specialist_forums_and_low_seo_sources
```

Store the latest explicit answers and resulting temporary changes in `data/prompt-evolution-state.yaml` when repository persistence is authorized.

## Regression control

A self-improving loop can also self-degrade, because apparently humans were not enough and now prompts can accumulate folklore too. Prevent that by checking each rule change against at least one regression case.

Examples:

- Raising novelty must not allow source-thin projects to outrank complete hidden hardware.
- Tightening hardware licensing must not erase valuable `REF_PASS` literature or manufacturer reference designs from non-hardware lanes.
- A daily standalone preference must not narrow the weekly analog stream, which intentionally allows Eurorack and reusable subassemblies.
- Expanding a source lane must not weaken primary-artifact verification.

If a rule performs poorly, record a rollback or downgrade it from hard gate to scoring preference.

## Persistence contract

When a run changes durable state and writes are authorized:

- update `data/prompt-evolution-state.yaml`;
- update rule files only for genuinely durable behavior changes;
- do not add provisional candidates to publication trackers;
- refresh `data/common-anti-repeat-index.csv` only when canonical published/selected state actually changes.

If writes are unavailable, return exact proposed state/rule changes and clearly mark them as unpersisted.