export NODE_OPTIONS=--openssl-legacy-provider

cd my-app
npm run build
cd ..
cd api
npm run build
mkdir -p my-app/dist
cp -r ../my-app/dist/* ./my-app/dist/

zip -r api.zip *

# todo: update with resource group name and app name
az webapp deploy --resource-group vue-sample --name vue-test-application --src-path api.zip