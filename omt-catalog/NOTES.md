# Flagged / oddity notes

- **berg** — Q1-Q14 use per-item ordinal 0-4 scales with varying label text per item; labels were NOT extracted. NEEDS_MANUAL_FILL: per-question scale labels.
- **fab** — Each item scored 0-4 with per-item ordinal descriptions; label text per value was NOT extracted. NEEDS_MANUAL_FILL: per-value labels.
- **tinetti** — Per-item ordinal scales vary (some 0-1, some 0-2); label text per value was NOT extracted. NEEDS_MANUAL_FILL: per-item scale min/max + labels.
- **dash** — Per-question 1-5 scales with differing label semantics per block (Q1-21 difficulty, Q22 interference, Q23 limitation, Q24-28 severity, Q29 sleep, Q30 agreement). 'NT' (Not Tested) option available. NEEDS_MANUAL_FILL: per-question labels.
- **mcgpques** — Categorical string answers, not numeric. Multi-select per question (user may pick one of several word descriptors). Backend maps strings to numeric codes.
- **urdisin** — Dual-part questions: each row posts Q{i}_PRESENCE (Yes/No) AND Q{i}_BOTHER (0-3, conditional on presence=Yes).
- **pfimqsf** — Matrix format: 7 questions × 3 columns (Bladder, Bowel, Vagina). Each cell posts as Q{i}_{COLUMN}. Uniform 0-3 scale.
- **vuvpfunque** — Questions 1-10 share the same prompt 'Because of my pelvic pain' but each has a unique set of 4 radio options. Each option's text IS the answer content; the scale value is its index.
- **dizzhinv** — Non-monotonic scoring: only values 0/2/4 are used (Yes=4, Sometimes=2, No=0).
