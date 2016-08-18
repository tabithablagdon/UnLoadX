export default function ServerHealth(db, DataTypes) {

  return db.define('ServerHealth', {
    memory: DataTypes.FLOAT,
    CPU: DataTypes.FLOAT,
    available: DataTypes.BOOLEAN
  });

};
