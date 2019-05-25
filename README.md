# Movie App

Aplicação que lista filmes em categorias

### Pré-requisitos

```
NPM é necessário para executar o app: https://www.npmjs.com/get-npm
```

### Comandos

**Comando**                       | **Descrição**
------------------------------|---------------------------------------------------------------------------------------
npm install                   | Instala dependências do projeto(necessário apenas 1 vez)
npm start                     | Roda o app em `http://localhost:4200/`
npm run build [-- --env=prod] | Roda o lint no código e cria um publish na pasta `dist/`
npm test                      | Roda os testes unitários com Karman
npm run e2e                   | Roda os testes e2e com Protractor


## Estrutura do Projeto

```
dist/                        versão compilada
e2e/                         testes e2e
src/                         fonte do projeto
|- app/                      componentes do app
|  |- core/                  serviços singleton, componentes de uso único
|  |- shared/                modulos compartilhados(components comuns, diretivas ae pipes)
|  |- app.component.*        raiz do app
|  +- ...                    modulos e componentes adicionais
|- assets/                   assets(imagens, fontes, etc)
|- environments/             variaveis de ambiente(dev/prod)
|- theme/                    css global e variaveis css
|- translations/             arquivos de traduço i18n
|- index.html                ponto de entrada html
|- main.scss                 ponto de entrada global do css
|- main.ts                   ponto de entrada do app
|- polyfills.ts              polyfills
+- test.ts                   ponto de entrada dos testes unitários
reports/                     relatórios de teste
proxy.conf.js                configurtação de proxy
```

## To-do

- Geral
    * Logo pro APP
    * Mostrar rating dos filmes em seus posters
    * Watchlist - filmes que o usuário marcar para assistir
    * Ajustar tamanho de posters para manter padrão
    * Pesquisa de filmes por Nome do Filme, Diretor, Ator.

- Tela Inicial:
    * Lista de filmes populares
    * Opção de adicionar filme ao Watchlist
    * Lista de Watchlist disponiveis no cinema do usuário

- Tela de listagem de filmes:
    * Opção para ordenar listagem de filmes
    * Ajuste tamanho de posters

- Tela de detalhes do filme:
    * Mais dados do filme: Diretor, Roteirista, Trailer do filme, etc.
    * Ao clicar em Envolvidos no filme em questão, levar o usuário até uma tela listando todos os filmes com envolvimento dessa pessoa.

- Novas telas:
    * Tela para todos os filmes e filtrar combinando categorias/ano

- Testes:
    * Escrever testes unitários de todas as chamadas de API
    * Escrever testes E2E para navegar por categorias


## License

This project is licensed under the MIT License
