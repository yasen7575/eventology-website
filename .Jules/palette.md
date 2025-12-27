## 2024-05-22 - [Fixed Input Accessibility]
**Learning:** The `Input` component was rendering a visual label but missing the programmatic association (`htmlFor` + `id`), which is a critical accessibility failure for screen readers.
**Action:** When building or auditing form components, always check that `label` elements have an `htmlFor` attribute that matches the `input`'s `id`. Use `React.useId()` to auto-generate unique IDs for reusable components to ensure this link is robust without requiring manual ID prop passing.
