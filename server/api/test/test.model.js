export default function Test(db, DataTypes) {
  
  return db.define('Test', {
    volume: DataTypes.INTEGER
  });
}
