---
name: mature-git-commit
description: Produce clean, reviewable Git commits for mature front-end and open-source repositories. Use when the user asks to create, split, review, or write commits; asks for a commit message; or wants repository changes committed with professional open-source standards.
---

# Mature Git Commit

## Purpose

Create commits that a maintainer can review, bisect, revert, and explain months later. Prefer boring, precise, small commits over clever batching. The commit history is part of the project interface.

## Operating Rules

1. Inspect the repository state before deciding anything.
2. Never commit secrets, generated caches, dependency installs, build output, logs, or unrelated local work.
3. Treat unexpected changes as the user's work. Do not revert, stash, or include them unless the user explicitly asks.
4. Split commits when changes have different intent, different reviewers, or different rollback behavior.
5. Run the smallest meaningful verification for the change before committing when the repository supports it.
6. If verification cannot run, say exactly why in the final response; do not claim it passed.
7. Do not amend, rebase, force-push, reset, or delete branches unless explicitly requested.

## Initial Inspection

Run these checks, adapting only when the repository is not a Git repository:

```bash
git status --short
git diff --stat
git diff -- .
git diff --cached --stat
git diff --cached -- .
```

Also inspect untracked files that may belong to the change. Do not assume every untracked file should be added.

## Classify Changes

Group hunks by intent, not by file extension.

Good single-commit groups:

- A page/component plus the route/sidebar/import needed to expose it.
- A bug fix plus the test that fails without it.
- A dependency bump plus the lockfile update caused by that bump.
- Documentation explaining the same behavior changed in code.

Must split:

- Feature work and unrelated formatting.
- Bug fix and new feature.
- Runtime code and CI/tooling change unless the tooling is required for the runtime change.
- Refactor and behavior change.
- Generated files mixed with hand-written source unless the generated files are required artifacts.

## Commit Message Standard

Use Conventional Commits:

```text
<type>(<scope>): <subject>
```

Use imperative, outcome-focused subjects. Keep them short and specific. Do not end with a period.

### Types

- `feat`: user-visible capability, page, component, API, or content module.
- `fix`: correction of broken behavior, broken docs links, rendering failures, or wrong configuration.
- `docs`: documentation-only semantic changes.
- `style`: formatting or visual/CSS-only changes with no behavior change.
- `refactor`: internal restructuring with no behavior change.
- `perf`: measurable performance improvement.
- `test`: tests or test infrastructure only.
- `build`: dependency, package manager, bundler, or build configuration.
- `ci`: workflow and automation changes.
- `chore`: repository maintenance that does not affect source semantics.
- `revert`: revert a previous commit.

### Scope Selection

Choose the narrowest stable subsystem name already used by the repository. For a Docusaurus/front-end open-source site, prefer scopes such as:

- `docs`, `blog`, `sidebar`, `config`, `assets`, `ci`, `deps`
- content sections such as `contribute`, `courses`, `learning-path`, `open-source`, `projects`, `community`, `governance`
- source areas such as `home`, `resources`, `roadmap`, `theme`, `data`

Avoid vague scopes such as `misc`, `update`, `changes`, or `stuff`.

### Subject Examples

Good:

```text
feat(contribute): add commit standard skill
fix(sidebar): include missing contribution guide
docs(readme): clarify local preview steps
ci(validate): build docs on pull requests
build(deps): update docusaurus packages
```

Bad:

```text
update
fix bug
changes
feat: big update
wip
```

## Body and Footer

Use a body when the commit needs context that is not obvious from the diff:

```text
fix(config): avoid last-update lookup without commits

Docusaurus queries Git history when last-update metadata is enabled.
Freshly scaffolded repositories do not have HEAD yet, so local builds fail
before content validation starts.
```

Use footers for issue links and breaking changes:

```text
Closes #123
```

```text
BREAKING CHANGE: rename the public route from /learn to /docs
```

## Staging Discipline

Stage only the files or hunks belonging to the current commit.

Preferred flow:

```bash
git add <specific-files>
git diff --cached --stat
git diff --cached -- .
```

If a file contains unrelated hunks, use interactive patch staging:

```bash
git add -p <file>
```

Do not use `git add .` unless inspection proves every changed file belongs to the same commit.

## Verification

Choose verification that covers the changed behavior:

- Docs/content/navigation: run the site build or docs build command.
- Front-end components/pages: run affected unit tests and, when available, a build.
- Formatting-only changes: run the formatter check or formatter on touched files.
- CI/config changes: run the closest local equivalent or validate syntax.
- Dependency changes: run install, lockfile validation, and build/tests affected by the dependency.

Do not invent verification. Record only commands actually run and their observed result.

## Commit Creation

Before committing:

1. Re-check `git diff --cached --stat`.
2. Confirm staged changes match exactly one intent.
3. Confirm unstaged/untracked changes are either intentionally left out or planned for another commit.
4. Create the commit with the final message.

```bash
git commit -m "<type>(<scope>): <subject>"
```

For a body:

```bash
git commit -m "<type>(<scope>): <subject>" -m "<body>"
```

## Final Response

Report only grounded facts:

- commit hash and subject, if a commit was created;
- files or change groups intentionally left uncommitted;
- verification command(s) run and observed result;
- blockers, if any.

Do not include ceremonial summaries. Do not claim the repository is clean unless `git status --short` was checked after committing.
