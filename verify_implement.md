# verificação do código
Após o cadastro do usário, é criado um código aleatorio que é enviado na raw_app_meta_data, apos isso o usuário é direcionado para uma página de verificação do código que é enviado no whatsapp do usuário. Essa página não existe, então pode criar com o mesmo estilo que é presente no projeto. 
- A página de verificação do código será composta por um input para digitar um código, e um botão de enviar. Será enviado uma requisição POST pro meu backend (https://webhook.autosfinance.com.br/webhook/b438fe04-5903-4099-b386-d18821003ce5) junto com um json no body da requisição:
{
	"code":"CODIGO DIGITADO",
  	"id":"ID_DO_USUÁRIO"
}
se a requisição retornar:
{
    "status": false
}
significa que o código está incorreto.
se a requisição retornar:
{
    "status": true
}
significa que o código está correto.
# verificação no login
O usuário só poderá efetuar o login se a coluna `verified_code` na tabela public.users estiver definida como TRUE.
Caso esteja Definida como FALSE, o usuário será direcionado para a página de verificação do código.