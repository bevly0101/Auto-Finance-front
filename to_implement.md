# Implementar no calendário
- os dias do mês que estão com lembretes, conseguem mostrar apenas 2, caso o dia tenha mais que 2 lembretes, deve haver um um indicador do tipo "+Xlembretes" no canto superior direito do mês.
- Quando o usuário clicar sobre o dia do mês ou da semana do calendário, será levado para a sessão "Dia" no dia que ele tenha clicado, por exemplo, se el clicar no dia 10 de agosto, ele será levado para a sessão Dia e na barra superior estará como "domingo, 10 de agosto de 2025". Nessa sessão indica os horários dos lembretes que estão registrado nesse determinado dia. O horário do lembrete é indicado na coluna `val_time` da tabela `lembretes_pagamento` do supabase, e so lembretes que contem essa coluna vazia, devem, por padrão estar definido no horário de 5h da manhã na sessão Dia do calendário, caso contrário, utilize o horário registrado na coluna `val_time` da tabela `lembretes_pagamento` do supabase.
- os lembretes que estão definidos como recorrentes, devem aparecer no mesmo dia de todo mês.

- a mesma dinâmica de clicar no dia do Mês e ser direcionado para a sessão dia deve ser aplicado na sessão semana.

# implementar no container "Próximos lembretes"
- no container Próximos lembretes deve mostrar os lembretes que estão mais próximo da data atual, numa distância de 30 dias.

# Pop-Up de detalhes do lembrete
- Quando determinado lembrete for clicado na sessão dia ou no lembrete indicado no "Próximos lembretes", quero que apareça um pop-up mostrando os detalhes do lembrete, sendo mostrado informações especficas puxada do banco de dados. Isso inclui:
titulo, valor, descricao, data_vencimento, val_time, recorrente.
formato de input de cada campo do pop-up:
titulo: input text
valor: input float 
descricao: input text
data_vencimento: input date
val_time: input time
recorrente: input checkbox (true/false)
- Os detalhes do lembrete mostrados no pop-up devem ser editaveis, ou seja, devem aaprecer em inputs, cujo tenha uma alteração, um botao na parte inferior do pop-up escrito "Salvar" estará clicável.
- terá dois botões na parte inferior do pop-up:
"salvar" e "fechar".
o botão salvar só estará disponivel para salvar caso todos os campos estejam preenchidas e alterados. e quando clicado ele atualiza o registro no banco de dados.
o botão fechar apenas fecha o pop-up sem salvar nada
- quando pop-up aberto e o usuário clicar fora do pop-up e sem alterar nada nos campos, ele deve fechar. Caso tenha clicado fora e tenha alguma alteração, deve perguntar se quer realmente fechar o pop-up.
- deve haver terceiro botão na parte inferior para deletar o lembrete. e quando clicado deve aparecer uma confirmação para apagar.

# Histórico de transações
Implementações para o container Histórico de transações na página transactions.
- quando clicado no botão "Excluir" da lista de transações, aparecerá um pop-up de confirmação de remoção da transação no banco de dados.
- quando o usuário clicar em determinada transação da lista, aparecerá um pop-up com os detalhes da transação, e ser possível editar cada campo do cadastro para aleterar na tabela que foi puxada do banco de dados. se for um gasto, será editado/excluido da tabela public.gastos. Se for um registro de entrada, será editado/excluido da tabela public.entradas.

# Adicionar Transação
- Ao lado do "Transações" na página `transactions` deve haver um botão "Adicionar Transação".
- Quando o botão "Adicionar Transação" for clicado, deve aparecer um pop-up para o usuário preencher campos para adicionar uma nova transação no banco de dados.
## campos do pop-up:
    - tipo de transaçao: input com duas opções (Entrada e Gasto) indica se será registrado na tabela public.gastos ou public.entradas
    - nome da transação: input de texto | coluna name da tabela gastos/entradas
    - valor: input float | coluna valor da tabela gastos/entradas
    - data do registro | coluna data_gasto da tabela gastos/entradas
    - categoria: input de varias opções. Para obter as opçoes de categorias deve-se analisar 2 coisas:
    dependendo de qual opção do tipo de transação for marcado, muda as categorias.
    se o tipo de transação marcado for "gastos", deve-se puxar as categorias do json da coluna expenses_categories da tabela public.users. se o tipo da transação for "entradas", deve-se puxar as categorias do json da coluna income_categories da tabela public.users.
    - forma de pagamento: input de opção (Débito, Crédito, Pix, Cédula, Outros).
    - Conta usada: input de opção que mostra as contas do usuário
- o registro nunca será criado se algum campo estiver vazio.
- enquanto nao for possivel criar, o botão "adicionar" estará inativo.
## como as categorias devem ser importadas
Na tabela public.users, existe duas tabelas: expenses_categories e income_categories.
expenses_categories: mostra um json cujo o nome de cada chave indica o nome da categoria e dentro está a descrição da categoria
income_categories: mostra um json cujo nome de cada chave indica o nome da categoria e dentro está a descrição da categoria

# Detalhes na inteface
- Na página `dashboard` e `transactions`, deve existir, no container no cartão conta, um "cartão" que mostre os gastos sem nenhuma conta relacionada, ou seja, as transações com a coluna `user_bank_id` vazia na tabela public.gastos e public.entradas. O nome do cartão pode se chamar "Transações sem conta".


# Configurações do usuário (página "settings")
mudanças:
## sessão `Geral`
- elimine o container foto de perfil
### Informações pessoais
- mude o nome do campo "sobrenome" para "apelido"
- todos os dados escritos nos inputs devem fazer relação à auth.users
     me pergunte e de opções de onde cada campo deve puxar informação da tabela.
## Sessão `Notificações`
- elimine as opções de Alertas de Segeurança, Atualização do Produto, Comentários e Mensões
- elimine todo o container de Notificações Push
## Sessão `Privacidade de segurança`
- Elimine o container de Visibilidade de perfil.
- No container de Segurança de Conta, deixe a opção "Autentificação de dois fatores" como inativa e uma aviso de "em breve"
- No container der Dados de Privacidade, elimine as duas opções de Coleta de dados e Analytics.
- Na parte de Gerenciamento de Dados, deixe a opção "Baixar seus Dados" inativa e com aviso de "em breve".
e mude a descriçao do botão de "obtenha uma cópia de todos os seus dados" para "Exporte seus dados, trasanções, fluxo de caixa como csv ou pdf.
## Sessão `Categorias`
- No container "Categoria de Despesas" deve aparecer as categorias de despesas. Na tabela public.users, na coluna `exepenses_catagories` será mostrado todas as categorias de despesas do usuário. A informação estará em json, onde o nome da chave é a categoria, e dentro dela há uma descrição da categoria.
- No container "Categoria de Receitas" deve aparecer as categorias de receitas. Na tabela public.users, na coluna `income_catagories` será mostrado todas as categorias de receitas do usuário. A informação estará em json, onde o nome da chave é a categoria, e dentro dela há uma descrição da categoria.
- As categorias serão listadas em cada container que a pertence. 
- Terá um botão em cada linha da lista que o usuário poderá remover a categoria. No banco de dados essa chave que pertence a categoria será eliminado. Ou seja, se apagar no front, será apagado no banco de dados.
- Terá um botão acima dos dois containers, (adicionar categoria de entrada e adicionar categoria de Despesa). Onde quando clicado aparecerá um pop-up com doi campos:
Nome da categoria: input text | 
Descrição da categoria: input text
Quando clicado no botão "Adicionar", será incrementado no json existente na tabela public.users, na coluna "income_categories" (se for uma adição de categoria de receita) ou na coluna "expenses_categories" (se for uma adição de categoria de despesa).
- O botão só estará disponivel par ser clicado apos todos os campos estarem preenchidos.


