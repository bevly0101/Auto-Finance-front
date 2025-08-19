# 📜 Regras e Diretrizes para Assistência de IA neste Projeto

Este documento serve como um guia para a IA que auxilia no desenvolvimento deste projeto. Siga estas diretrizes para garantir que o código seja escalável, manutenível e consistente.

---

## 🎯 Princípios Fundamentais (Regras Gerais)

*   **Linguagem:** Responda sempre em Português do Brasil (pt-BR).
*   **Simplicidade (KISS):** Prefira sempre a solução mais simples e clara.
*   **Não se Repita (DRY):** Antes de escrever código novo, verifique se já existe funcionalidade semelhante no projeto que possa ser reutilizada.
*   **Consciência de Ambiente:** O código deve considerar os diferentes ambientes (`development`, `test`, `production`). Use variáveis de ambiente para configurações sensíveis ou que mudam entre ambientes.
*   **Cuidado com Alterações:** Seja cauteloso. Implemente apenas as mudanças solicitadas ou aquelas que você tem certeza de que são bem compreendidas e relacionadas ao escopo atual.
*   **Evolução Consciente:** Ao corrigir um bug, não introduza um novo padrão ou tecnologia sem antes esgotar as opções da implementação existente. Se uma nova tecnologia for introduzida, remova completamente a implementação antiga para evitar duplicação.
*   **Organização:** Mantenha o código e a estrutura de arquivos sempre bem organizados.
*   **Refatoração:**
    *   Arquivos não devem ultrapassar **200-300 linhas**. Refatore arquivos longos.
    *   Funções não devem ser muito longas. Divida funções complexas em funções menores e com responsabilidade única.
*   **Dados Simulados (Mocks):** Dados simulados são exclusivamente para testes (`*.test.ts`, etc.). Nunca use dados simulados nos ambientes de `development` ou `production`.
*   **Arquivos Sensíveis:** Nunca sobrescreva arquivos de configuração sensíveis como `.env` sem minha permissão explícita.

---

## 📝 Processo de Desenvolvimento e Planejamento

Quando eu solicitar a implementação de uma nova funcionalidade ("Modo Planejador"):

1.  **Análise Profunda:** Reflita sobre as mudanças solicitadas. Analise o código existente para mapear o escopo completo e os impactos das alterações.
2.  **Perguntas Esclarecedoras:** Antes de propor uma solução, faça de 4 a 6 perguntas para esclarecer todos os pontos e confirmar suas descobertas.
3.  **Plano de Ação:** Após as respostas, elabore um plano de ação detalhado, dividido em etapas claras.
4.  **Aprovação:** **Peça minha aprovação para o plano.** Não comece a implementação antes de eu aprovar.
5.  **Implementação por Etapas:** Após a aprovação, implemente o plano passo a passo. A cada etapa concluída, informe:
    *   O que foi feito.
    *   Qual é o próximo passo.
    *   Quais fases ainda restam.

---

## 🐛 Processo de Depuração (Debugging)

Quando eu solicitar ajuda para depurar um problema ("Modo Depurador"), siga esta sequência rigorosamente:

1.  **Hipóteses:** Reflita sobre 5 a 7 possíveis causas para o problema.
2.  **Redução:** Analise e reduza a lista para as 2 a 3 causas mais prováveis.
3.  **Validação com Logs:**
    *   Sugira `console.log`s ou outros logs adicionais para validar suas suposições e rastrear a transformação dos dados ao longo do fluxo.
    *   Peça para usar as ferramentas do navegador (`getConsoleLogs`, `getNetworkLogs`, `getNetworkErrors`) para obter mais contexto.
    *   Se os logs do servidor forem relevantes e acessíveis, peça para que eu os cole no chat.
4.  **Análise e Correção:**
    *   Com base nos logs, faça uma análise abrangente do que pode estar errado.
    *   Se o problema persistir, sugira novos logs para investigar mais a fundo.
    *   Após a correção ser implementada, **peça minha aprovação para remover os logs de depuração adicionados**.

---

## ✍️ Pós-Codificação e Revisão

1.  **Reflexão Crítica:** Após escrever qualquer código, reflita profundamente sobre a **escalabilidade** e a **manutenibilidade** da sua solução.
2.  **Relatório de Alteração:** Produza uma análise de 1 a 2 parágrafos sobre a alteração que você fez.
3.  **Sugestão de Melhorias:** Com base na sua reflexão, sugira possíveis melhorias ou próximos passos para refinar ainda mais o código.

---

## 📄 Uso de Documentos de Referência (PRDs)

*   Se eu fornecer arquivos Markdown (como PRDs - Documentos de Requisitos de Produto), use-os como **referência** para entender a estrutura e os requisitos.
*   **Não atualize** os arquivos Markdown, a menos que eu solicite explicitamente.
*   Use-os apenas como base para o código que você irá gerar.
