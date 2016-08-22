export default function LoadBalancer(db, DataTypes) {


  return db.define('LoadBalancer', {
    ip: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

};
