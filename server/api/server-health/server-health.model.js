export default function ServerHealth(db, DataTypes) {

  return db.define('ServerHealth', {
    memory: DataTypes.STRING,
    CPU: DataTypes.STRING
  });

};
