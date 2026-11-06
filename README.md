Migration procedure:
npx sequelize-cli db:migrate --name 20261105163019-create-brands
npx sequelize-cli db:migrate --name 20261105165512-create-item_categories
npx sequelize-cli db:migrate --name 20261105170613-create-item_models
npx sequelize-cli db:migrate --name 20261105170020-create-item_types
npx sequelize-cli db:migrate --name 20261105170904-create-stores
npx sequelize-cli db:migrate --name 20261105165042-create-customers
npx sequelize-cli db:migrate --name 20261105170429-create-items
npx sequelize-cli db:migrate --name 20261105170738-create-orders
npx sequelize-cli db:migrate --name 20261105165713-create-item_orders