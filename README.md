## Readme - Projeto Laravel-Vue

**Introdução**

Este projeto demonstra uma aplicação integrada utilizando Laravel para o backend e Vue.js para o frontend. O objetivo deste README é fornecer instruções para configuração e execução do projeto localmente.

**Pré-requisitos**

* Docker instalado em sua máquina.

**Configuração**

1. Clone o repositório do GitHub:

```bash
git clone https://github.com/FabioWendel/laravel-vue.git
cd laravel-vue
```

2. Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

3. Edite o `.env` e configure as variáveis de ambiente de acordo com seu ambiente:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=2024
```

* Substitua `127.0.0.1` pelo endereço IP do seu servidor MySQL.

4. Inicie o projeto com o seguinte comando, incluindo a construção inicial:

```bash
docker-compose up --build
```

**Acesso à Aplicação**

Após a inicialização, você poderá acessar o projeto através do seguinte link:

`http://localhost:8000/login`

**Credenciais de Login**

* Email: `admin@gmail.com`
* Senha: `2024`

**Funcionalidades**

O sistema possui um navbar com as seguintes seções:

* Início
* Categoria
* Produto
* Usuário

Além disso, há opção de logout disponível.

**Tecnologias Utilizadas**

* **Laravel:** Backend da aplicação.
* **Vue.js:** Frontend da aplicação.
* **MySQL:** Banco de dados relacional.
* **Bootstrap:** Biblioteca de design.
* **vue3-toastify:** Biblioteca para feedbacks visuais com toasts.
