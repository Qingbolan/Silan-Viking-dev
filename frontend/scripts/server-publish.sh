#!/usr/bin/env bash
set -euo pipefail

mode="${1:-}"
case "$mode" in
  prepare|publish) ;;
  *)
    echo "usage: server-publish.sh prepare|publish" >&2
    exit 64
    ;;
esac

: "${SILAN_FRONTEND_STATE_ROOT:?SILAN_FRONTEND_STATE_ROOT is required}"
: "${SILAN_PUBLIC_ORIGIN:?SILAN_PUBLIC_ORIGIN is required}"

source_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
published_root="$SILAN_FRONTEND_STATE_ROOT/published"
releases_root="$published_root/releases"
current_link="$published_root/current"
previous_link="$published_root/previous"
dist="$source_root/dist"

if [[ "$mode" == "prepare" ]]; then
  cd "$source_root"
  npm ci --no-audit --no-fund
  echo "[frontend:server] build environment ready"
  exit 0
fi

cd "$source_root"
export VITE_PUBLIC_ORIGIN="$SILAN_PUBLIC_ORIGIN"
npm run build

test -s "$dist/index.html"
test -s "$dist/sitemap.xml"
test -s "$dist/llms.txt"
grep -q "Silan Hu builds and studies AI systems" "$dist/index.html"

release_id="$(date -u +%Y%m%dT%H%M%SZ)-$$"
next_release="$releases_root/.${release_id}.next"
release="$releases_root/$release_id"
next_current="$published_root/.current.next"
next_previous="$published_root/.previous.next"

mkdir -p "$releases_root"
rm -rf "$next_release"
rm -f "$next_current" "$next_previous"
mkdir -p "$next_release"
rsync -a --delete "$dist/" "$next_release/"
mv "$next_release" "$release"

if [[ -L "$current_link" ]]; then
  current_release="$(readlink -f "$current_link")"
  ln -s "$current_release" "$next_previous"
  mv -Tf "$next_previous" "$previous_link"
fi

ln -s "$release" "$next_current"
mv -Tf "$next_current" "$current_link"

echo "[frontend:server] release=$release"
