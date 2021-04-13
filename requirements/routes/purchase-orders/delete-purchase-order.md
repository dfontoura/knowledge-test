# Deletar pedido de compra

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **DELETE** na rota **/api/orders/:id**
2. ✅ Valida o dado obrigatório **id**
3. ✅ **Deleta** o pedido de compra com o id fornecido
4. ✅ Retorna **202**, com a informação do id excluído

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se id não for fornecido pelo client
3. ✅ Retorna erro **500** se der erro ao tentar criar o pedido de compra