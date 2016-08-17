export default function LoadBalancer(db, DataTypes) {

  return db.define('LoadBalancer', {
    ip: DataTypes.STRING
  });

};
