# Criação de crud de gerenciamento de funcionários

## Tecnologias utilizadas

- [x] nextjs@13.5.2
- [x] vercel@postgres

## Como rodar o projeto

```bash
# Clone este repositório
$ git clone git@github.com:FlavioZanoni/crud-funcionarios.git
```

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd crud-funcionarios
```

```bash
# Instale as dependências
$ npm install
```

(como é utulizado o @vercel/postgres, não é necessário instalar o postgres localmente, porém é necessario fazer o link dele no projeto, o tutorial pode ser encontrado [aqui](https://vercel.com/docs/storage/vercel-postgres)
)

```bash
# Execute a aplicação em modo de desenvolvimento
$ npm run dev
```

```bash
# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

## O serviço está disponível em [prod](https://crud-funcionarios-liard.vercel.app/api/)

## Endpoints

- funcionarios (GET, POST, PUT)
- funcionarios?id={id} (GET, DELETE)

## Exemplo de requisição

```bash
# GET
$ curl https://crud-funcionarios-liard.vercel.app/api/funcionarios
```

```bash
# POST
$ curl -X POST -H "Content-Type: application/json" -d '{"nome":"nome","email":"email", "department":"department"}'
```

```bash
# PUT
$ curl -X PUT -H "Content-Type: application/json" -d '{"id":1, "nome":"nome","email":"email", "department":"department"}'
```

```bash
# DELETE
$ curl -X DELETE https://crud-funcionarios-liard.vercel.app/api/funcionarios?id=1
```

## Autor

Flávio Zanoni
