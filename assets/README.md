# Modelos 3D para o Blender

Arquivos `.glb` exportados direto do jogo (`node tools/export-glb.js` ou `npm run export:glb`).

| Arquivo | Conteúdo |
|---|---|
| `029-perfuradora.glb` | IBM 029 com a mesa: gabinete, leito, tambor de programa, alimentador, escaninho, teclado e painel de chaves |
| `083-classificadora.glb` | IBM 083, com teclas, seletor de colunas, alimentador e bolsos |
| `514-reprodutora.glb` | IBM 514, com alimentadores, empilhadores, luzes e teclas, painel |
| `407-contabilizadora.glb` | IBM 407, com unidade de impressão, alimentador e painel de controle |
| `summa-15.glb` | Somadora Olivetti Summa 15 |
| `sala-completa.glb` | A cena inteira: sala, mesa com a 029, armário, sala de máquinas |

## No Blender

- **File ▸ Import ▸ glTF 2.0 (.glb/.gltf)**.
- Unidade: **1 = 1 polegada**, como nos manuais da IBM. A importação traz 1 pol. = 1 m; para tamanho real, escale por 0,0254.
- Cada máquina vem com a origem no ponto onde ela é colocada na sala.

## Nomes que importam

As peças que o jogo usa têm o nome da variável no código, por exemplo `srtKnob`, `srtKeys_start`, `p514hop`, `m514K_start`, `painel_srt`. As demais são `<máquina>_peca_<n>`.

Ao editar, pode deformar, remodelar e trocar material à vontade, mas **mantenha os nomes** das peças nomeadas e não as junte com outras. É pelo nome que o jogo vai religar cliques, animações e painéis quando o modelo voltar.

Os painéis com texto (`painel_*`) são desenhados ao vivo pelo jogo, inclusive com a tradução PT/EN. A textura que vem no arquivo é só um retrato do momento da exportação.

As áreas de clique invisíveis e os maços de cartões que aparecem e somem ficam de fora ou vazios.
