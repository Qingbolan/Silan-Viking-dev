#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE_HOST="43.106.17.64"
REMOTE_USER="root"
SSH_KEY="${HOME}/.ssh/silan-root-43.106.17.64.pem"
REMOTE_DIR="/www/wwwroot/silan.dev"
DOMAIN="https://silan.dev"

cd "$ROOT"
npm --prefix frontend run build

test -s frontend/dist/index.html
test -s frontend/dist/sitemap.xml
grep -q "Silan Hu builds and studies AI systems" frontend/dist/index.html

artifact_hash="$(
  find frontend/dist -type f -print0 \
    | sort -z \
    | xargs -0 shasum -a 256 \
    | shasum -a 256 \
    | awk '{print $1}'
)"

ssh_cmd=(ssh -i "$SSH_KEY" -o BatchMode=yes -o StrictHostKeyChecking=accept-new "${REMOTE_USER}@${REMOTE_HOST}")
rsync_ssh="ssh -i $SSH_KEY -o BatchMode=yes -o StrictHostKeyChecking=accept-new"

"${ssh_cmd[@]}" "set -e;
  test -d /www/wwwroot/silan.tech;
  mkdir -p '$REMOTE_DIR';
  backup_root='/www/backup/silan.dev';
  mkdir -p \"\$backup_root\";
  if test -n \"\$(find '$REMOTE_DIR' -mindepth 1 -maxdepth 1 -print -quit 2>/dev/null)\"; then
    tar -C '$REMOTE_DIR' -czf \"\$backup_root/pre-deploy-$(date -u +%Y%m%dT%H%M%SZ).tar.gz\" .;
  fi"

rsync -az --delete \
  --exclude '.user.ini' \
  --exclude 'api/' \
  --exclude '_deploy/' \
  -e "$rsync_ssh" \
  frontend/dist/ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/"

"${ssh_cmd[@]}" "set -e;
  find '$REMOTE_DIR' -mindepth 1 ! -name '.user.ini' -exec chown www:www {} +;
  find '$REMOTE_DIR' -type d -exec chmod 0755 {} +;
  find '$REMOTE_DIR' -type f ! -name '.user.ini' -exec chmod 0644 {} +;
  printf '%s\n' '$artifact_hash' > '$REMOTE_DIR/.silan-dev-artifact';
  chown www:www '$REMOTE_DIR/.silan-dev-artifact';
  nginx -t >/dev/null"

curl -fsS --max-time 15 "$DOMAIN/" >/dev/null
curl -fsS --max-time 15 "$DOMAIN/work" >/dev/null
curl -fsS --max-time 15 "$DOMAIN/llms.txt" >/dev/null

echo "deployed silan.dev artifact $artifact_hash"
