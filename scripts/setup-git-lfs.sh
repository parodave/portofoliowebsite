#!/usr/bin/env bash
set -euo pipefail

if ! command -v git-lfs >/dev/null 2>&1; then
  echo "Git LFS not found. Installing..."
  if command -v apt-get >/dev/null 2>&1; then
    sudo apt-get update && sudo apt-get install -y git-lfs
  elif command -v brew >/dev/null 2>&1; then
    brew install git-lfs
  else
    echo "Please install Git LFS manually."
    exit 1
  fi
fi

git lfs install
