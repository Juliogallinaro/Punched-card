#!/bin/sh
# Gera _site/index.html (documento completo) a partir de index.html, que é um fragmento no formato do artifact.
set -e
mkdir -p _site
{
  printf '<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head>\n<body>\n'
  cat index.html
  printf '\n</body>\n</html>\n'
} > _site/index.html
touch _site/.nojekyll
echo "_site/index.html gerado"
