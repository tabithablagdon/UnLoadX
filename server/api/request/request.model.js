export default function Request(db, DataTypes) {

  return db.define('Request', {
    statusCode: DataTypes.STRING,
    latency: DataTypes.STRING,
    method: DataTypes.STRING
  });

}
