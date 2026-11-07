#!/bin/sh
# Monta o site do GitHub Pages:
#   _site/index.html       ← produção (branch main)
#   _site/test/index.html ← teste (branch dev), com faixa "TEST VERSION"
# Uso: sh tools/build-pages.sh <pasta da main> [pasta da dev]
set -e
PROD=${1:-.}; DEV=$2
wrap() { # $1 = fragmento index.html, $2 = saída, $3 = "teste" para a faixa
  mkdir -p "$(dirname "$2")"
  {
    printf '<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    [ "$3" = teste ] && printf '<meta name="robots" content="noindex">\n'
    printf '</head>\n<body>\n'
    cat "$1"
    [ "$3" = teste ] && printf '\n<div style="position:fixed;right:0;bottom:0;z-index:99999;background:#c8472c;color:#fff;font:700 12px/1 Arial,sans-serif;letter-spacing:.08em;padding:6px 10px;pointer-events:none">TEST VERSION · dev</div>\n'
    printf '\n</body>\n</html>\n'
  } > "$2"
}
rm -rf _site; mkdir -p _site
wrap "$PROD/index.html" _site/index.html
if [ -n "$DEV" ] && [ -f "$DEV/index.html" ]; then wrap "$DEV/index.html" _site/test/index.html teste; fi
touch _site/.nojekyll
echo "site gerado:"; find _site -name index.html
