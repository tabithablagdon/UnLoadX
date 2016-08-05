export default function NodeServer(db, DataTypes) {

  return db.define('NodeServer', {
    ip: DataTypes.STRING,
    port: DataTypes.STRING,
    application_type: DataTypes.STRING
  });

};
