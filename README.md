# Jogo de Caça-Níqueis com Angular - README

Bem-vindo ao projeto do Jogo de Caça-Níqueis desenvolvido com Angular! Este é um aplicativo web que consiste em três componentes principais: a página de Login e Registro, a página Inicial e a página do Jogo. O jogo permite que os usuários joguem na máquina de caça-níqueis, façam apostas e ganhem prêmios com base em sequências específicas na matriz 3x3.

## Índice

- [Introdução](#introdução)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [Regras do Jogo](#regras-do-jogo)
- [Contribuições](#contribuições)
- [Licença](#licença)

## Introdução

O Jogo de Caça-Níqueis é um aplicativo web baseado no framework Angular. Ele utiliza o armazenamento local do navegador para autenticação do usuário, garantindo que apenas usuários registrados possam acessar as páginas Inicial e do Jogo. O jogo em si envolve fazer apostas e tentar obter sequências específicas na matriz 3x3 para ganhar recompensas.

## Pré-requisitos

Antes de executar este projeto, verifique se você possui o seguinte:

- Node.js e npm instalados em seu computador.

## Instalação

1. Clone o repositório do projeto para o seu computador usando o seguinte comando:

```
git clone https://github.com/your-username/slot-machine-game.git
```

2. Navegue até o diretório do projeto:

```
cd slot-machine-game
```

3. Instale as dependências do projeto:

```
npm install
```

4. Inicie o servidor de desenvolvimento:

```
ng serve
```

5. Abra o aplicativo no seu navegador acessando `http://localhost:4200/`.

## Uso

1. **Página de Login e Registro**: Ao abrir o aplicativo, você será redirecionado para a página de Login e Registro. Se você é um novo usuário, clique no botão "Registrar" para criar uma conta. Se você já é um usuário registrado, insira suas credenciais e clique em "Login" para acessar as páginas Inicial e do Jogo.

2. **Página Inicial**: Após fazer o login com sucesso, você será direcionado para a página Inicial. Aqui, você pode verificar o saldo atual e prosseguir para a página do Jogo para jogar na máquina de caça-níqueis.

3. **Página do Jogo**: Na página do Jogo, você pode fazer sua aposta selecionando o valor desejado nas opções disponíveis. Clique no botão "Girar" para iniciar a máquina de caça-níqueis. Se a sequência na matriz corresponder a uma das seguintes combinações, você ganha:
   - [0][0], [0][1], [0][2]
   - [0][0], [1][1], [2][2]
   - [1][0], [1][1], [1][2]
   - [2][0], [2][1], [2][2]
   - [2][0], [1][1], [0][2]

   Se sua aposta contiver todas as sequências listadas acima, seu prêmio será multiplicado por 10 e adicionado ao seu saldo.

## Regras do Jogo

- Os valores mínimos e máximos das apostas são predefinidos e exibidos na página do Jogo.
- Você não pode prosseguir para as páginas Inicial ou do Jogo sem fazer login ou registrar-se com sucesso.
- A máquina de caça-níqueis gera valores aleatórios na matriz 3x3 a cada giro.
- As sequências vencedoras devem corresponder exatamente como descrito na seção de [Uso](#uso).
- Se você ficar sem saldo, não poderá fazer apostas até adicionar fundos.

## Contribuições

Contribuições para este projeto são bem-vindas! Se você encontrar problemas ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou criar uma pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE). Sinta-se à vontade para usar e modificar o código de acordo com os termos da licença.