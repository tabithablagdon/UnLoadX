export default function User(sequelize, DataTypes) {
  return sequelize.define('User', {
    name: DataTypes.STRING,
    authUserId: {
      type: DataTypes.STRING,
      unique: true
    },
    email: DataTypes.STRING
  });
  
}
