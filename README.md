# Repósitorio dedicado a construção de uma Api-rest usando Nest.js
## Conceitos Fundamentais do Nest.js

### Para executar localmente:
1. Clone o repositório:
   ```bash
   git clone <link-do-repositorio>
2. Execute as migrations:
   ```bash
   npx prisma migrate dev
3. Execute o projeto:
   ```bash
   npm run start:dev
4. Certifque de configurar o provider do sqlite:
5. Todas as rotas estao nessa rota com suas devidas informações, é possivel testar por la, ou até mesmo por o insomnia.

### Banco de dados utilizado foi o Sqlite

### Bootstrap
No contexto do Nest.js, o conceito de Bootstrap refere-se ao processo de inicialização da aplicação. Apesar de compartilhar o nome com o famoso framework de CSS, seu significado aqui é diferente. O bootstrap da aplicação é configurado no arquivo `main.ts`, seguindo o padrão de organização de pastas do Nest.js. Este arquivo é responsável por instanciar e configurar o módulo principal da aplicação.

### Decorators
Decorators são uma funcionalidade do TypeScript que permitem modificar o comportamento de classes e métodos em tempo de execução. O Nest.js faz uso extensivo de decorators para definir metadados e aplicar lógica adicional. Alguns dos decorators mais comuns no Nest.js incluem:
- `@Module`: Define um módulo da aplicação.
- `@Controller`: Define um controller responsável por gerenciar requisições HTTP.
- `@Injectable`: Marca uma classe como um provedor que pode ser injetado em outras classes.
- `@Get`, `@Post`, `@Put`, `@Delete`: Definem rotas HTTP dentro de um controller.

### Module
No Nest.js, um módulo é uma forma de organizar o código da aplicação em segmentos reutilizáveis e coesos. Inspirado pelo Angular, cada módulo agrupa controllers, providers e outros módulos relacionados a uma funcionalidade específica. Por exemplo, um módulo de usuários pode conter todas as classes relacionadas à gestão de usuários, encapsulando as regras de negócio e implementações pertinentes.

### Controllers
Controllers são responsáveis por manipular as requisições HTTP e devolver respostas apropriadas. Eles definem as rotas da aplicação e especificam como as requisições devem ser tratadas. Cada método de um controller é geralmente associado a um decorator que define a rota e o método HTTP (GET, POST, PUT, DELETE).

### Services
Services são componentes que encapsulam a lógica de negócio da aplicação. Eles são utilizados pelos controllers para processar dados, interagir com bancos de dados e realizar outras operações necessárias antes de enviar uma resposta ao cliente. Services são marcados com o decorator `@Injectable` para permitir que sejam injetados em outras classes.

### Pipes
Pipes são classes que implementam a interface `PipeTransform` e são utilizadas para transformar ou validar dados. Eles podem ser aplicados a rotas, parâmetros de métodos ou a nível global. O Nest.js fornece pipes padrão como `ValidationPipe`, `ParseIntPipe` e `ParseUUIDPipe`, mas também permite a criação de pipes personalizados.

### Middlewares
Middlewares são funções executadas antes do manipulador de rota. Eles têm acesso aos objetos de solicitação e resposta e podem modificar ou interromper o fluxo da requisição. No ciclo de solicitação-resposta do Nest.js, middlewares são usados para adicionar lógica comum como autenticação, logging ou manipulação de dados.

### Interceptors
Interceptors são usados para interceptar e modificar a execução de métodos ou a resposta retornada. Eles implementam a interface `NestInterceptor` e podem ser utilizados para adicionar lógica adicional como logging, caching, transformação de dados e manipulação de erros.

### Guards
Guards são classes que implementam a interface `CanActivate` e são usadas para determinar se uma requisição deve ser processada pelo manipulador de rota. Eles são utilizados principalmente para implementar lógica de autorização, verificando permissões e roles de usuários. Ao contrário dos middlewares, guards têm acesso ao contexto de execução, permitindo uma verificação mais precisa do que será executado em seguida.

### Autorização RBAC
RBAC (Role-Based Access Control) é uma estratégia de autorização que define permissões com base em funções atribuídas aos usuários. No Nest.js, isso permite definir o que cada usuário pode ou não fazer na aplicação, como um administrador tendo permissões para criar, editar e excluir recursos, enquanto um usuário comum pode apenas visualizar. O Nest.js facilita a implementação de RBAC através de guards e decorators.

### Circular Dependency
Dependências circulares ocorrem quando dois ou mais módulos ou serviços dependem uns dos outros, criando um loop que impede a inicialização correta. Para resolver esse problema no Nest.js, é possível utilizar o decorator `forwardRef` ao importar módulos com dependências circulares. Isso permite que os módulos referenciem uns aos outros sem causar um ciclo de dependência direto, garantindo a inicialização correta da aplicação. Refatorar o código para reduzir dependências bidirecionais e utilizar injeção de dependência de forma eficaz também são práticas recomendadas.

### Limitação de Taxa (Rate Limiting)
A limitação de taxa é uma técnica comum utilizada para proteger aplicações contra ataques de força bruta, limitando o número de requisições que um usuário pode fazer em um determinado período de tempo. Isso ajuda a prevenir abusos e garante o uso justo dos recursos. No NestJS, você pode implementar a limitação de taxa usando o pacote `@nestjs/throttler`.
