# language: pt
Funcionalidade: Criar pedido na cozinha

  Cenário: Sistema de pedidos cria um pedido na cozinha
    Dado que o cliente não se identifica
    Quando o sistema cria um pedido na cozinha para o cliente "Tomas" e itens
      | id   | nome         | categoria | quantidade |
      | 1    | Hambúrguer   | Comida    | 2          |
      | 2    | Batata Frita | Comida    | 1          |
    Então o pedido é criado com sucesso

  Cenário: Cliente cria um pedido com identificação por CPF
    Dado que o cliente se identifica via CPF "12345678900"
    Quando o sistema cria um pedido na cozinha para o cliente "Tomas" e itens
      | id   | nome         | categoria | quantidade |
      | 1    | Hambúrguer   | Comida    | 2          |
      | 2    | Batata Frita | Comida    | 1          |
    Então o pedido é criado com sucesso