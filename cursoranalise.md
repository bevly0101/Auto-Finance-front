# Lógica do Inspetor Visual de Componentes (Cursor de Análise)

Este documento descreve a metodologia utilizada para criar a ferramenta de inspeção visual de componentes, que permite identificar o nome e o caminho de um componente ao passar o cursor sobre ele no ambiente de desenvolvimento.

## O Desafio

A tarefa era criar uma forma rápida e visual de identificar os componentes React renderizados na tela, facilitando a comunicação e a solicitação de alterações. Fazer isso inspecionando o código-fonte manualmente a cada vez seria lento e propenso a erros.

## Metodologia: O "Wrapper de Inspeção"

Para resolver esse desafio, adotamos uma abordagem de "Wrapper de Inspeção", onde criamos um componente invólucro que adiciona a funcionalidade de inspeção visual.

1.  **Criação do Wrapper (`DevInspectorWrapper.tsx`):**
    *   Foi criado um componente chamado `DevInspectorWrapper` que recebe duas propriedades principais: `componentName` (o nome do componente) e `filePath` (o caminho do arquivo).
    *   Ele envolve o componente alvo (filho).

2.  **Visibilidade Condicional (Apenas em Desenvolvimento):**
    *   A lógica de inspeção é ativada **apenas em ambiente de desenvolvimento**, verificando a variável de ambiente `import.meta.env.DEV`.
    *   Em produção, o wrapper simplesmente renderiza seu `children` sem adicionar nenhuma sobrecarga, garantindo que o código de inspeção nunca chegue ao ambiente de produção.

3.  **Lógica de Interação (React `useState` e Eventos):**
    *   O hook `useState` gerencia o estado `isHovered` para saber se o cursor está sobre o componente.
    *   Os eventos `onMouseEnter` e `onMouseLeave` atualizam esse estado.
    *   Quando `isHovered` é `true`, uma sobreposição visual (borda tracejada e uma etiqueta com nome/caminho) é renderizada sobre o componente.
    *   Um evento `onClick` foi adicionado para copiar o caminho do arquivo para a área de transferência, agilizando ainda mais o fluxo de trabalho.

4.  **Integração na Página:**
    *   Na página principal (ex: `Index.tsx`), cada seção que precisava ser inspecionável foi envolvida pelo `DevInspectorWrapper`.
    *   Exemplo de uso:
        ```jsx
        import DevInspectorWrapper from "./components/DevInspectorWrapper";
        import Hero from "./sections/Hero";

        <DevInspectorWrapper componentName="Hero" filePath="src/sections/Hero.tsx">
          <Hero />
        </DevInspectorWrapper>
        ```

5.  **Finalização e Limpeza (Reversão):**
    *   Para desativar a funcionalidade, basta remover o `DevInspectorWrapper` dos componentes na página principal e, opcionalmente, excluir o arquivo do wrapper. Os componentes originais permanecem inalterados.

## Código do Componente (`DevInspectorWrapper.tsx`)

```typescriptreact
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface DevInspectorWrapperProps {
  children: React.ReactNode;
  componentName: string;
  filePath: string;
}

const DevInspectorWrapper: React.FC<DevInspectorWrapperProps> = ({ children, componentName, filePath }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  // Este componente não faz nada em produção.
  if (!import.meta.env.DEV) {
    return <>{children}</>;
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  const handleCopyPath = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(filePath);
    toast({
      title: "Caminho Copiado!",
      description: `${filePath} foi copiado para a área de transferência.`,
    });
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleCopyPath} style={{ cursor: 'copy' }}>
      {children}
      {isHovered && (
        <div className="pointer-events-none absolute inset-0 z-[9998] border-2 border-dashed border-blue-500 shadow-[0_0_0_9999px_rgba(66,153,225,0.1)]">
          <div className="absolute -top-5 left-0 z-[9999] rounded-t-md bg-blue-500 px-2 py-0.5 text-xs font-mono text-white">{componentName} <span className="opacity-70">({filePath})</span></div>
        </div>
      )}
    </div>
  );
};

export default DevInspectorWrapper;
```

## Conclusão

Este método de criar um "wrapper de inspeção" que funciona apenas em desenvolvimento é uma técnica eficaz e segura para facilitar a identificação e a discussão sobre componentes específicos da interface, melhorando a colaboração e a velocidade do desenvolvimento.