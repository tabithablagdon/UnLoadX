export default function NodeServer(db, DataTypes) {


  return db.define('NodeServer', {
    ip: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    port: DataTypes.STRING,
    application_type: DataTypes.STRING
  });

};
