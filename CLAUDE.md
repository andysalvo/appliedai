# Claude Instructions

Read `AGENTS.md` first. It is the canonical instruction file.

## Claude-specific rules

- Always run `npm run build` before committing to verify static export works
- Always run `node scripts/review.mjs <file>` on any document in `docs/` before committing. Do not mark a doc as reviewed unless the script has actually been run and the output has been read.
- Use `@/` path alias for all imports from src/
- Prefer Edit tool over Write for modifying existing files
- Run `npm run format` before committing if you changed any files
- Follow `content/VOICE_BRIEF.md` for all public-facing copy
