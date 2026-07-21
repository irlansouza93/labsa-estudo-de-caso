---
name: ui-ux-pro-max
description: Orientações de UI/UX extremamente compactas e responsivas para evitar transbordamento vertical em viewports restritos (laptops e mobile).
---

# UI/UX Pro Max — Compactação de Altura

Esta skill fornece diretrizes de design para garantir que seções de páginas de apresentação ou painéis caibam inteiramente na altura visível do navegador (*viewport*), eliminando barras de rolagem desnecessárias e cortes de imagem em telas de laptops de 15.6" (alturas úteis de 550px a 680px).

## Diretrizes de Altura e Espaçamento

1. **Paddings de Seção Estritos:**
   - Em desktop, limite o padding vertical de seções focadas em slides/apresentação a no máximo `20px` (ex: `padding: 20px 0;`).
   - Evite gaps e margens superiores/inferiores exagerados em cabeçalhos internos. Use no máximo `12px` de margem entre títulos e parágrafos.

2. **Dimensionamento de Imagens:**
   - Imagens clínicas, comparadores de tela e mídias nunca devem ter alturas estáticas grandes. Use limites rígidos como `max-height: 280px` ou `max-height: 300px` para garantir compatibilidade vertical.
   - Use `object-fit: cover` ou `contain` com caixas flexíveis de tamanho controlado.

3. **Elemento Interativos de Mapa (iFrames):**
   - iFrames do Google Maps e cards de localização em desktops devem ter sua altura máxima restrita a `260px` ou `280px` para evitar que a seção inteira do mapa estoure o scroll vertical.

4. **Abas e Linhas de Tempo:**
   - A distância entre as abas e o painel de exibição deve ser compactada. Use margens de no máximo `16px`.
   - Limite a altura total de painéis com duas colunas (ex: foto de um lado, texto do outro) a no máximo `300px` no desktop.

5. **Títulos Compactos:**
   - Use tamanhos de fonte de títulos (`h2`, `h3`) limitados a no máximo `32px` em telas normais de laptop.
