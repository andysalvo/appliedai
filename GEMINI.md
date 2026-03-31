# Gemini Instructions

Read `AGENTS.md` first. It is the canonical instruction file.

## Gemini-specific rules

- Always run `node scripts/review.mjs <file>` on any document in `docs/` before committing. Do not mark a doc as reviewed unless the script has actually been run.
- Follow `content/VOICE_BRIEF.md` for all public-facing copy.

## Gemini CLI tool mappings

- File search: use `glob` (not find or ls)
- Content search: use `grep` (not grep or rg)
- Read files: use `read_file` (not cat/head/tail)
- Edit files: use `edit_file` (not sed/awk)
- Write files: use `write_file` (not echo/cat)
