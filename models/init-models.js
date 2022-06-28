import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _orderDetail from  "./orderDetail.js";
import _order from  "./order.js";
import _product from  "./product.js";
import _user from  "./user.js";

export default function initModels(sequelize) {
  const orderDetail = _orderDetail.init(sequelize, DataTypes);
  const order = _order.init(sequelize, DataTypes);
  const product = _product.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  orderDetail.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(orderDetail, { as: "order_details", foreignKey: "order_id"});
  orderDetail.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(orderDetail, { as: "order_details", foreignKey: "product_id"});
  order.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order, { as: "orders", foreignKey: "user_id"});
  product.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(product, { as: "products", foreignKey: "user_id"});

  return {
    orderDetail,
    order,
    product,
    user,
  };
}
