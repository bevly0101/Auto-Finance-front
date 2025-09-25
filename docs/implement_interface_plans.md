quero que crie um novo botão no sidebar escrito "plano" que leve para uma pagina na rota /myplan
e nela mostre informações do plano da pessoa. a coluna plano_id da tabela users indica o plano da pessoa
se é 1 = premium
se é 2 = admin do família
se é 3 = membro do família
se é 4 = período gratuito

# Plano Premium
se é plano premium a verificação da data de expiração deve ser feita buscando a tabela premium_plans, na mesma coluna user_id = id do usuario logado, a coluna expire_data mostra a data que o plano vai expirar. 

# Plano Familia
se é plano família, a verificação da data de expiração deve ser feita buscando a tabela planos_familiares, na mesma coluna admin_id = id do usuario logado, a coluna expire_data mostra a data que o plano vai expirar.
a coluna id da tabela planos_familiares servirá para buscar os membros do plano familia.

para mostrar os membros do plano familia para o admin poder vizualizar, deve fazer uma busca na tabela `membros_plano_familiar` e buscar pelas colunas plano_familiar_id que são iguais ao id da tabela planos_familiares. As rows retornadas terão a coluna membro_id que faz referencia com a tabela users. Para o admin aparecerá o nome deles.

# Plano Membro
Para o membro deve aparecer apenas que ele está no plano familia.