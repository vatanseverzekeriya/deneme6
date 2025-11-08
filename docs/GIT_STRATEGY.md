# Git Branching Strategy

## Overview
This project follows a feature-branch workflow with automated deployments.

## Branch Structure

### Main Branches

- `main` - Production-ready code
  - Always stable and deployable
  - Protected branch (requires PR reviews)
  - All commits must be merged via Pull Requests

- `develop` - Integration branch for features
  - Latest development changes
  - Features merge here first
  - Regularly synced with main

### Supporting Branches

#### Feature Branches
- **Naming**: `feature/<feature-name>` or `claude/<sprint-name-session-id>`
- **Purpose**: Develop new features or enhancements
- **Lifetime**: Created from `develop`, merged back to `develop`
- **Example**: `feature/player-inventory`, `claude/sprint-0-setup-123`

#### Bugfix Branches
- **Naming**: `bugfix/<bug-description>`
- **Purpose**: Fix non-critical bugs
- **Lifetime**: Created from `develop`, merged back to `develop`
- **Example**: `bugfix/skill-cooldown-not-working`

#### Hotfix Branches
- **Naming**: `hotfix/<critical-issue>`
- **Purpose**: Emergency fixes for production
- **Lifetime**: Created from `main`, merged to both `main` and `develop`
- **Example**: `hotfix/game-crash-on-load`

#### Release Branches
- **Naming**: `release/<version>`
- **Purpose**: Prepare for production release
- **Lifetime**: Created from `develop`, merged to both `main` and `develop`
- **Example**: `release/v1.0.0`

## Workflow

### Creating a Feature

```bash
# Start from develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/new-character-class

# Work on feature...
git add .
git commit -m "Add new character class"

# Push to remote
git push -u origin feature/new-character-class

# Create Pull Request to develop
```

### Merging a Feature

1. Create Pull Request on GitHub
2. Code review by team members
3. Ensure CI/CD checks pass
4. Squash and merge to develop
5. Delete feature branch

### Creating a Release

```bash
# Create release branch
git checkout -b release/v1.0.0 develop

# Update version numbers, changelog
# Test thoroughly

# Merge to main
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"

# Merge back to develop
git checkout develop
git merge --no-ff release/v1.0.0

# Delete release branch
git branch -d release/v1.0.0
```

### Hotfix Process

```bash
# Create from main
git checkout -b hotfix/critical-bug main

# Fix the issue
git commit -am "Fix critical bug"

# Merge to main
git checkout main
git merge --no-ff hotfix/critical-bug
git tag -a v1.0.1 -m "Hotfix 1.0.1"

# Merge to develop
git checkout develop
git merge --no-ff hotfix/critical-bug

# Delete hotfix branch
git branch -d hotfix/critical-bug
```

## Commit Message Convention

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI/CD changes

### Examples

```bash
feat(player): add character class selection screen

Implemented character selection with 4 classes:
- Warrior
- Ninja
- Shaman
- Sura

Closes #123
```

```bash
fix(skills): correct skill cooldown calculation

Skill cooldowns were not properly resetting after use.
Fixed by tracking remaining time in milliseconds.

Fixes #456
```

## Best Practices

1. **Keep branches short-lived**: Merge feature branches within 1-2 days
2. **Commit often**: Small, focused commits are better than large ones
3. **Pull before push**: Always sync with remote before pushing
4. **Write descriptive commit messages**: Help others understand your changes
5. **Review your own PR first**: Check diffs before requesting reviews
6. **Delete merged branches**: Keep repository clean
7. **Use git rebase for local cleanup**: But never rebase public branches
8. **Tag releases**: Use semantic versioning (v1.0.0, v1.1.0, etc.)

## Protected Branches

The following branches are protected and require:
- At least 1 approval review
- All CI checks must pass
- No force pushes allowed
- Must be up-to-date before merging

Protected branches:
- `main`
- `develop`

## CI/CD Integration

Every push triggers:
- Automated tests
- Linting checks
- Build verification
- Code quality analysis

Merges to `main` trigger:
- Production deployment
- Version tagging
- Changelog generation

## Troubleshooting

### Sync Conflicts

```bash
# Update local develop
git checkout develop
git pull origin develop

# Rebase feature on latest develop
git checkout feature/my-feature
git rebase develop

# Resolve conflicts, then:
git add .
git rebase --continue
```

### Undo Last Commit

```bash
# Keep changes
git reset --soft HEAD~1

# Discard changes
git reset --hard HEAD~1
```

### Recover Deleted Branch

```bash
# Find commit hash
git reflog

# Recreate branch
git checkout -b recovered-branch <commit-hash>
```
