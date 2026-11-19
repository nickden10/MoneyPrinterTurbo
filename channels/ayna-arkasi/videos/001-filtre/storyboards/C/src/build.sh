#!/usr/bin/env bash
# Tüm kareleri ve iletişim sayfasını yeniden üretir. Kullanım: bash build.sh
set -e; cd "$(dirname "$0")"
export NODE_PATH=${NODE_PATH:-$(npm root -g)}
for f in f1 f2 f3 f4; do node shot.js $f.html ../$f.png; done
node sheet.js
