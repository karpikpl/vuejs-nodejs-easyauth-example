# my-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### ERR_OSSL_EVP_UNSUPPORTED error
See [SO POST](https://stackoverflow.com/questions/70582072/npm-run-fails-with-err-ossl-evp-unsupported), so solve:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm run serve
```