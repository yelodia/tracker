### .env file
```
SECRET_KEY_BASE=
RAILS_MAX_THREADS=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=

RAILS_SERVE_STATIC_FILES=true
EXECJS_RUNTIME=Node
```

### Run development
```sh
yarn install
webpack-dev-server
```

### Run production
```sh
yarn install
RAILS_ENV=production bundle exec rails webpacker:compile
RAILS_ENV=production bundle exec rails assets:precompile
```
