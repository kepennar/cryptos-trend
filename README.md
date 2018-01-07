# graphQL-server-starter
# Start

Simple:

```bash
npm install
npm start
```

## Developing

With a file watcher (`nodemon`)

```bash
npm run start:dev
```

## Production

Api starter use [PM2](https://github.com/Unitech/pm2). You can start it with the
[Dockerfile](https://github.com/kepennar/graphQL-server-starter/blob/master/Dockerfile)
provided

```bash
docker build -t api-starter .
docker run -p 80:3000 -d api-starter:latest
```

## Config

Easily customizable configuration.

With a `.env` file in the project root folder

```bash
#.env

PORT=3210
```

Or with environment variables

```bash
# Export a variable
export PORT=3210
npm start

# Directly in one command
PORT=3210 npm start
```

# Healthcheck

The awesome GraphQL-starter provide an healthcheck mecanism By default
`http://localhost:3000/health`

```json
{
  "name": "api-starter",
  "version": "0.0.1",
  "checkers": [{ "name": "status", "value": "OK" }]
}
```

Healthcheck path can be configured

```javascript
app.use(health('/ping')
```

Custom checkers can easily be added

```javascript
app.use(health('/ping', [
  async (ctx, next) => {
    const status = await fetch(serviceUrl).then(res => res.json())
    ctx.body = {
      name: 'custom-check',
      status
    };
    next();
  }
])
```
