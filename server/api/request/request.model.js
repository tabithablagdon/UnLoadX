export default function Request(db, DataTypes) {

  return db.define('Request', {
    latency: DataTypes.STRING,
    CPU: DataTypes.STRING,
    GPU: DataTypes.STRING,
    memory: DataTypes.STRING
  });

}
