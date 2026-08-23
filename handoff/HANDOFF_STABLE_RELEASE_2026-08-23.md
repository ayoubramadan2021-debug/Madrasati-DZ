<!-- STABLE_RELEASE_2026_08_23 -->
# Taalim DZ — Stable Release Handoff — 2026-08-23

## Release decision
Development/migration work stops at this checkpoint because the full lesson set is currently working correctly.

## Confirmed runtime state
- Complete lesson range: **1–116**.
- **Lesson 116 is final. Never create Lesson 117.**
- Lessons 25–32 no longer fall through to Lesson 1 exercises.
- The real routing fix is in `src/pages/LessonExercisesPage.tsx`, where lessons 25–32 are dispatched to their dedicated exercise pages.
- `exercisePath` is also present for lessons 25–32 using `/lesson-v2/25/exercises` through `/lesson-v2/32/exercises`.
- Lesson 52 unified migration completed successfully.
- Build must remain green with `npm run build`.
- `src/features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2.tsx` is protected.

## Architecture rule
**DATA CHANGES / ENGINE STAYS UNIFIED**

Use the shared lesson/exercise orchestration. Custom activity components should own only the interaction/evaluation they genuinely need.

## Git / release policy at this checkpoint
- Commit the current safe source/public/handoff changes.
- Do not stage unrelated historical deletions.
- Push the current branch to `origin`.
- Build production assets.
- Deploy `dist/` to the linked Netlify production site.
- Preserve the existing full Android Downloads backup and targeted snapshots.

## Resume point
If future work is required, start by reproducing a concrete runtime issue. Do not reopen a broad 1–116 migration merely for cleanup.

Prepared: 2026-08-23 14:11
