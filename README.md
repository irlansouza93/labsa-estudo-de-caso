# LABSA — Estudo de Caso Clínico & Apresentação Interativa

Uma aplicação web moderna, ultra-compacta e interativa desenvolvida para apresentação de estudos de caso clínicos de alta precisão. 

Este projeto nasceu a partir de uma necessidade real da **LABSA (Soluções em Diagnóstico)** para documentar e demonstrar a evolução clínica da lesão de um paciente tratado com a tecnologia **UrgoClean Ag**. Posteriormente, a estrutura foi aprimorada e disponibilizada como um modelo de código aberto para profissionais, desenvolvedores e instituições que buscam inspiração no desenvolvimento de aplicações médicas e apresentações de dados clínicos.

---

## 🌟 Destaques do Projeto

- **Design Clínico Premium**: Identidade visual baseada na marca LABSA, utilizando paleta de cores moderna, tipografia fluida e elementos visuais de alta definição.
- **Dobra Única (Fit-to-Screen / Ultra-Compact)**: Arquitetura de layout projetada para caber perfeitamente na janela útil (*viewport*) de laptops de 15.6" e telas compactas sem estourar rolagem vertical desnecessária.
- **Linha do Tempo Interativa de Evolução**: Navegação cronológica por registros fotográficos do acompanhamento de 9 dias com transição suave (*cross-fade*), informações técnicas e botão de ampliação (*lightbox*).
- **Navegador de Imagens Ampliado (Lightbox)**: Modal de tela cheia com navegação lateral por botões ou setas do teclado, permitindo percorrer toda a evolução do paciente.
- **Comparador Antes & Depois**: Slider interativo de sobreposição para comparação direta entre a admissão (Dia 0) e a granulação/cicatrização (Dia 9).
- **Mecanismo de Ação do Medicamento**: Apresentação dos pilares tecnológicos da cobertura UrgoClean Ag, com visualizador interativo dos folhetos informativos em alta resolução.
- **Menu Inteligente (Auto-Hide)**: Cabeçalho compacto que recolhe suavemente ao rolar para baixo e reaparece ao rolar para cima.
- **Modo Standalone (Arquivo Único)**: Inclui versão compilada em arquivo HTML único ([LABSA-estudo-de-caso-standalone.html](./LABSA-estudo-de-caso-standalone.html)) contendo todo o CSS, JavaScript e ativos embutidos para apresentações offline ou sem servidor.

---

## 📂 Estrutura de Arquivos

```text
labsa-estudo-de-caso/
├── index.html                           # Estrutura HTML5 semântica principal
├── styles.css                           # Sistema de design, variáveis e responsividade
├── app.js                              # Lógica interativa (Timeline, Lightbox, Slider, Header)
├── case-data.js                        # Dados estruturados do estudo clínico
├── LABSA-estudo-de-caso-standalone.html # Versão compilada de arquivo único
├── assets/                              # Imagens do caso, fotos de produtos e marcas
│   ├── brand/                          # Logotipos e marcas LABSA / Urgo
│   ├── case/                           # Fotografias registradas da evolução clínica
│   └── product/                        # Material informativo e produto
└── README.md                           # Documentação do projeto
```

---

## 🚀 Como Executar Localmente

Como se trata de um projeto web estático puro, você não precisa instalar dependências pesadas.

1. **Clone ou baixe este repositório**:
   ```bash
   git clone https://github.com/SEU-USUARIO/labsa-estudo-de-caso.git
   cd labsa-estudo-de-caso
   ```

2. **Abra no navegador**:
   - Basta abrir o arquivo `index.html` diretamente no seu navegador de preferência.
   - Ou utilize uma extensão como **Live Server** (VS Code) ou um servidor HTTP simples:
     ```bash
     npx serve .
     # ou
     python -m http.server 8000
     ```

---

## 🌐 Deploy na Vercel

Para colocar o site online na Vercel:

### Via Interface (GitHub + Vercel)
1. Suba este repositório para a sua conta no **GitHub**.
2. Acesse [vercel.com](https://vercel.com/) e faça login.
3. Clique em **Add New Project** e selecione este repositório do GitHub.
4. Clique em **Deploy**. A Vercel detectará automaticamente que é um site estático e publicará em segundos.

### Via Vercel CLI
```bash
npx vercel
```

---

## 👨‍💻 Autor & Créditos

- **Projeto Original & Conceito**: LABSA — Soluções em Diagnóstico.
- **Desenvolvimento & Experiência Digital**: Irlan Pereira.
- **Licença**: Código aberto para fins de estudo, inspiração e adaptação clínica.
