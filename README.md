## Uso

### Despliegue

Instala las dependencias con:

```
npm install
```

Luego compila el proyecto usando:

```
tsc
```

Después, despliega el proyecto con:

```
serverless deploy
```

Al ejecutar el comando de despliegue, deberías ver un resultado similar a este:

```bash
Deploying aws-node-express-dynamodb-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-express-dynamodb-api-project-dev (196s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-node-express-dynamodb-api-project-dev-api (766 kB)
```

### Invocación

Después de un despliegue exitoso, puedes crear un nuevo usuario llamando al endpoint correspondiente:

```bash
curl --request POST 'https://xxxxxx.execute-api.us-east-1.amazonaws.com/users' --header 'Content-Type: application/json' --data-raw '{"name": "John", "userId": "someUserId"}'
```
