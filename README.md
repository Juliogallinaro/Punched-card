# Seção de Perfuração

Simulação 3D, no navegador, de uma seção de perfuração de cartões em 1968: Fundição Tamanduateí Ltda., Santo André.

Você perfura pedidos de venda na **IBM 029**, confere as contas na somadora **Olivetti Summa 15**, classifica o maço na **IBM 083**, tabula na **IBM 407** com painel de controle fiado, reproduz saldos na **IBM 514** e fecha o balancete do dia. O comportamento das máquinas segue os manuais da IBM.

- Jogar (produção, branch `main`): https://juliogallinaro.github.io/Punched-card/
- Versão de teste (branch `dev`): https://juliogallinaro.github.io/Punched-card/test/
- Arquivo único: `index.html` (Three.js r170 via jsDelivr, módulo ES). Abra no navegador, só desktop.
- Idiomas: português e inglês (Menu ▸ Idioma · Language).
- Tutorial completo ou por etapa (029, Summa, 083, 407/514, contabilidade).

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | O jogo inteiro (HTML, CSS e JS) |
| `i18n/` | Textos capturados (`keys_all.json`) e traduções EN (`en_*.txt`, `índice<TAB>tradução` ou `"chave"<TAB>tradução`) |
| `tools/build_en.py` | Monta o dicionário EN e embute em `index.html` |
| `tools/check-syntax.js` | Confere a sintaxe do script |
| `tests/` | Testes Playwright headless |
| `tools/build-pages.sh`, `.github/workflows/pages.yml` | Publica no GitHub Pages a cada push na `main` |

## Testes

```bash
npm install                         # playwright e three 0.170.0
npm run check                       # sintaxe
npm test                            # tutorial completo; deve terminar com "Todas as contas conferem."
node tests/tutorial-etapa.js 083    # uma etapa: 029, summa, 083, 407, acct
```

## Fontes

IBM 29 Card Punch Reference Manual (GA24-3332) e Theory of Operation; IBM 82/83/84 Sorters Reference Manual; IBM 407 Accounting Machine Manual of Operation; IBM Automatic Punches General Information Manual (514); fluxo F20-0074; manuais da Olivetti Summa 15 (jaapsch.net).

## Teste e produção

O trabalho novo entra na branch `dev` e aparece em `/test/`, com uma faixa "TEST VERSION". Quando estiver aprovado, `dev` é mesclada na `main` e vai para a raiz do site. Os dois endereços ficam na mesma origem, então recorde e idioma salvos no navegador valem para ambos.
