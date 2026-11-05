import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Brand from  "./brand.js";
import _Customer from  "./customer.js";
import _ItemCategory from  "./item_category.js";
import _ItemOrder from  "./item_order.js";
import _ItemType from  "./item_type.js";
import _Item from  "./item.js";
import _Model from  "./model.js";
import _Order from  "./order.js";
import _Store from  "./store.js";

export default function initModels(sequelize) {
  const Brand = _Brand.init(sequelize, DataTypes);
  const Customer = _Customer.init(sequelize, DataTypes);
  const ItemCategory = _ItemCategory.init(sequelize, DataTypes);
  const ItemOrder = _ItemOrder.init(sequelize, DataTypes);
  const ItemType = _ItemType.init(sequelize, DataTypes);
  const Item = _Item.init(sequelize, DataTypes);
  const Model = _Model.init(sequelize, DataTypes);
  const Order = _Order.init(sequelize, DataTypes);
  const Store = _Store.init(sequelize, DataTypes);

  Item.belongsTo(Brand, { as: "brand", foreignKey: "brand_id"});
  Brand.hasMany(Item, { as: "items", foreignKey: "brand_id"});
  Model.belongsTo(Brand, { as: "brand", foreignKey: "brand_id"});
  Brand.hasMany(Model, { as: "models", foreignKey: "brand_id"});
  Order.belongsTo(Customer, { as: "customer", foreignKey: "customer_id"});
  Customer.hasMany(Order, { as: "orders", foreignKey: "customer_id"});
  Item.belongsTo(ItemCategory, { as: "categ", foreignKey: "categ_id"});
  ItemCategory.hasMany(Item, { as: "items", foreignKey: "categ_id"});
  Item.belongsTo(ItemType, { as: "type", foreignKey: "type_id"});
  ItemType.hasMany(Item, { as: "items", foreignKey: "type_id"});
  ItemOrder.belongsTo(Item, { as: "item", foreignKey: "item_id"});
  Item.hasMany(ItemOrder, { as: "item_orders", foreignKey: "item_id"});
  Item.belongsTo(Model, { as: "model", foreignKey: "model_id"});
  Model.hasMany(Item, { as: "items", foreignKey: "model_id"});
  ItemOrder.belongsTo(Order, { as: "order", foreignKey: "order_id"});
  Order.hasMany(ItemOrder, { as: "item_orders", foreignKey: "order_id"});
  Item.belongsTo(Store, { as: "store", foreignKey: "store_id"});
  Store.hasMany(Item, { as: "items", foreignKey: "store_id"});

  return {
    Brand,
    Customer,
    ItemCategory,
    ItemOrder,
    ItemType,
    Item,
    Model,
    Order,
    Store,
  };
}
