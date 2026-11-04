#!/usr/bin/env bash
set -euo pipefail

repository_root="$(git rev-parse --show-toplevel)"
cd "$repository_root"

existing_hooks_path="$(git config --local --get core.hooksPath || true)"

if [[ -n "$existing_hooks_path" && "$existing_hooks_path" != "tools/hooks" ]]; then
  echo "Existing core.hooksPath is '$existing_hooks_path'; review it before replacing." >&2
  exit 1
fi

git config --local core.hooksPath tools/hooks

echo "Repository hooks enabled through core.hooksPath=tools/hooks"
echo "Hooks remain local and bypassable; trusted CI is authoritative."
