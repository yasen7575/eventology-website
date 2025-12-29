## PALETTE'S JOURNAL
*Tracking critical UX and accessibility learnings.*

## 2025-05-20 - Implicit Label Association
**Learning:** Found multiple instances of forms using visual proximity for labeling rather than programmatic association. This renders forms inaccessible to screen reader users who cannot determine which label belongs to which input.
**Action:** Always use `htmlFor` on labels matching the `id` of the input.
