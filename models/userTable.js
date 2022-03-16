import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class userTable extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "user_tables_email_key"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    verified: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "0"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_tables',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_tables_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "user_tables_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
