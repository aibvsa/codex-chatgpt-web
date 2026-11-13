$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $repoRoot
$upstream = "miuuyy/codex-chatgpt-web"
$branch = "lumkojn-sdlc-isolation-engine"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI (gh) is required. Install it, then run gh auth login."
}
gh auth status
if ($LASTEXITCODE -ne 0) { throw "GitHub CLI is not authenticated. Run gh auth login and retry." }

$login = gh api user --jq ".login"
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($login)) {
  throw "Could not determine the authenticated GitHub login."
}
$fork = "$login/codex-chatgpt-web"

# The personal fork must already exist. This script publishes the prepared local branch to it.
# Keeping fork creation separate avoids treating a 404 response as a PowerShell success path.
$repoInfo = gh api "repos/$fork" --jq "{full_name: .full_name, parent: .parent.full_name}"
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($repoInfo)) {
  throw "Personal fork $fork was not found. Create the fork first, then rerun this script."
}
$repoInfoObject = $repoInfo | ConvertFrom-Json
if ($repoInfoObject.parent -ne $upstream) {
  throw "$fork exists but its parent is not $upstream. Refusing to push."
}

# Ensure the local branch is isolated from upstream main.
$current = git branch --show-current
if ($current -ne $branch) {
  $exists = git branch --list $branch
  if ($exists) { git switch $branch } else { git switch -c $branch }
  if ($LASTEXITCODE -ne 0) { throw "Could not switch to local fork branch." }
}

# Require a configured local author identity; never invent one.
if ([string]::IsNullOrWhiteSpace((git config user.name))) { throw "Set git config user.name before publishing." }
if ([string]::IsNullOrWhiteSpace((git config user.email))) { throw "Set git config user.email before publishing." }

$remotes = git remote
if ($remotes -contains "upstream") {
  $upstreamUrl = git remote get-url upstream
  if ($upstreamUrl -notmatch "miuuyy/codex-chatgpt-web") { throw "Existing upstream remote points somewhere unexpected." }
} else {
  git remote add upstream "https://github.com/$upstream.git"
  if ($LASTEXITCODE -ne 0) { throw "Could not add upstream remote." }
}
if ($remotes -contains "fork") {
  git remote set-url fork "https://github.com/$fork.git"
} else {
  git remote add fork "https://github.com/$fork.git"
}
if ($LASTEXITCODE -ne 0) { throw "Could not configure personal fork remote." }

git add .agents .codex SDLC-ISOLATION-ENGINE.md docs/sdlc-isolation-engine.md scripts/sdlc-isolation tests/sdlc-isolation-engine.test.mjs
if ($LASTEXITCODE -ne 0) { throw "Could not stage the SDLC Isolation Engine files." }
git diff --cached --quiet
if ($LASTEXITCODE -eq 1) {
  git commit -m "Maintain isolated SDLC evaluation tooling"
  if ($LASTEXITCODE -ne 0) { throw "Commit failed." }
} elseif ($LASTEXITCODE -ne 0) {
  throw "Could not inspect staged changes."
}

git push -u fork $branch
if ($LASTEXITCODE -ne 0) { throw "Push failed. Local branch and commit are preserved." }

Write-Output "FORK_PUBLISHED https://github.com/$fork/tree/$branch"
