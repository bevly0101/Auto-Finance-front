# Lógica das Edições Visuais Interativas

Este documento descreve a metodologia utilizada para realizar as alterações visuais complexas na seção de "Features" da Landing Page.

## O Desafio

A tarefa era ajustar de forma precisa e iterativa múltiplos aspectos visuais dos componentes, como a posição e rotação de imagens, e o tamanho e formato dos cards. Fazer isso através de tentativa e erro, alterando o código e recarregando a página, seria lento e impreciso.

## Metodologia: O "Editor em Tempo Real"

Para resolver esse desafio, adotamos uma abordagem de "Editor em Tempo Real", onde transformamos temporariamente os próprios componentes em ferramentas de edição.

1.  **Injeção de Editores:** Para cada propriedade que precisava ser ajustada (ex: `posição`, `rotação`, `altura`, `arredondamento`), um controle de interface (slider) foi adicionado diretamente no componente.

2.  **Visibilidade Condicional:** Esses editores foram programados para aparecerem **apenas em ambiente de desenvolvimento** (`import.meta.env.DEV`). Isso garante que o código de edição nunca chegue ao ambiente de produção, mantendo o código final limpo e performático.

3.  **Estado Dinâmico (React `useState`):** O estado de cada propriedade ajustável foi gerenciado pelo hook `useState` do React. Os sliders modificavam o estado em tempo real, e o estado era aplicado diretamente aos estilos inline do elemento, proporcionando feedback visual instantâneo no navegador.

4.  **Processo Iterativo:** Essa abordagem permitiu um fluxo de trabalho altamente iterativo. Você pôde experimentar livremente com todas as variáveis de design (posição, tamanho, rotação, etc.), inclusive ajustando múltiplos componentes ao mesmo tempo para garantir a harmonia visual entre eles.

5.  **Finalização e Limpeza:** Uma vez que os valores finais foram definidos e aprovados por você, todo o código relacionado aos editores (estados, interface dos sliders, lógica condicional) foi completamente removido. Os valores finais foram então "congelados" e passados como propriedades (`props`) estáticas para os componentes, resultando em um código final otimizado e declarativo.

## Conclusão

Este método de criar ferramentas de edição "descartáveis" e específicas para o desenvolvedor (ou cliente, neste caso) dentro do próprio ambiente de desenvolvimento é uma técnica poderosa e eficiente para o ajuste fino de interfaces complexas, combinando a precisão do design visual com a implementação direta no código.
