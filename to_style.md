# Estilização do site
- todas as páginas devem ter um padrão de bordas, espaçamento, posicionamento.
- toda a estilização deve ser refeita
- 


# Modo Dark
O Modo Dark será ativado quando quando o botão superior do dashbard (indicado com um icone de lua) for clicado.
todas as cores e visuais das páginas /dashboard /transactions /reminders /accounts /settings serão afetados
## Guia de Estilo Visual - Estilo "AutoFinance"

Este documento detalha a identidade visual extraída da landing page "AutoFinance". Use-o como um guia para replicar a estética "Dark Mode Tech" em outros projetos.

## 1. Paleta de Cores

A paleta é baseada em um fundo de alto contraste com cores de destaque vibrantes.

| Cor                       | Hex Code (Aproximado) | Uso Principal                                                              |
| :------------------------ | :-------------------- | :------------------------------------------------------------------------- |
| **Fundo Principal (Escuro)** | `#0D0C1D`             | O fundo principal de todo o site. É um azul/roxo muito escuro.             |
| **Roxo Vibrante (Destaque)** | `#6E41FF`             | Cor primária para CTAs, links, títulos e efeitos de brilho (glow).         |
| **Azul (Secundário)** | `#3C82F6`             | Usado dentro dos mockups do app para gráficos, ícones e elementos de UI.     |
| **Rosa/Magenta (Destaque)** | `#E83D84`             | Usado como um destaque secundário, como na borda de um dos cards.         |
| **Fundo dos Cards** | `#1A193B`             | Um tom levemente mais claro que o fundo principal para criar profundidade.   |
| **Branco Puro** | `#FFFFFF`             | Textos principais, títulos e ícones de alto contraste.                     |
| **Cinza Claro (Texto)** | `#BCC2D6`             | Textos secundários e parágrafos para um contraste mais suave.              |
| **Verde (Semântico)** | `#10B981`             | (Visto no app) Cor para indicar valores positivos, sucesso, etc.           |

## 2. Tipografia

A fonte é um Sans-Serif moderno, geométrico e de fácil leitura.

* **Fontes Sugeridas:** `Inter`, `Poppins`, `Manrope`.
* **Espaçamento entre linhas (Corpo):** `1.6` para melhor legibilidade.

### Hierarquia de Texto

* **Títulos Principais (H1):** Peso **Bold** ou **ExtraBold**.
* **Subtítulos (H2):** Peso **SemiBold** ou **Bold**.
* **Texto de Corpo (Parágrafos):** Peso **Regular** ou **Medium**.
* **Botões e Links:** Peso **SemiBold**.

## 3. Estilização de Componentes

### Botões (Buttons)

* **Principal (Call-to-Action):**
    * Background: `background-color: #6E41FF;`
    * Cantos: `border-radius: 999px;` (totalmente arredondados)
    * Sombra/Brilho: `box-shadow: 0px 0px 25px 5px rgba(110, 65, 255, 0.4);`

* **Secundário (Login):**
    * Fundo: `background-color: transparent;`
    * Borda: `border: 1px solid #FFFFFF;`
    * Cantos: `border-radius: 999px;`

### Cards

* **Fundo:** `background-color: #1A193B;`
* **Cantos:** `border-radius: 24px;`
* **Padding:** `padding: 32px;` (espaçamento interno generoso)

## 4. Efeitos Visuais e Layout

### Efeitos Principais

* **Brilhos / Glows (`box-shadow`):** O efeito de brilho suave é a assinatura visual. É aplicado a botões e elementos interativos.
    ```css
    /* Exemplo para o botão roxo */
    box-shadow: 0px 0px 25px 5px rgba(110, 65, 255, 0.4);
    ```

* **Efeito de Vidro (Glassmorphism):** Usado em elementos sobrepostos para criar um efeito de vidro fosco.
    ```css
    /* Exemplo de card com efeito de vidro */
    background: rgba(26, 25, 59, 0.5); /* Cor do card com opacidade */
    backdrop-filter: blur(10px);
    ```

* **Gradientes:** Usados sutilmente no fundo, em ícones e em bordas de cards para adicionar profundidade e dinamismo.

### Layout

* **Espaço Negativo:** Use margens e paddings generosos para separar as seções e focar a atenção do usuário.
* **Alinhamento Central:** A maior parte do conteúdo é centralizada para uma experiência de leitura direta.
* **Camadas:** Os elementos são sobrepostos (fundo -> brilhos -> cards -> conteúdo) para criar uma sensação de profundidade.

## 5. Resumo para Replicar

1.  **Fundo:** Comece com o fundo `#0D0C1D`.
2.  **Cores:** Use `#6E41FF` como a cor primária para todas as ações.
3.  **Tipografia:** Escolha uma fonte Sans-Serif moderna e defina uma hierarquia clara.
4.  **Formas:** Arredonde cantos de botões e cards de forma generosa.
5.  **Efeitos:** O efeito de `box-shadow` para criar brilho é essencial.
6.  **Espaçamento:** Não tenha medo de deixar os elementos "respirarem".