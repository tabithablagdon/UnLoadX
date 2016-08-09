export default function Request(db, DataTypes) {

  return db.define('Request', {
    statusCode: DataTypes.STRING,
    latency: DataTypes.STRING,
    method: DataTypes.STRING,
    CPU: DataTypes.STRING,
    GPU: DataTypes.STRING,
    memory: DataTypes.STRING
  });

}


// Return JSON array for /GET request from api/requests/:testId
// [
//   { id: 1,
//     statusCode: '200',
//     latency: '0.00',
//     size: '862',
//     method: 'GET',
//     CPU: null,
//     GPU: null,
//     memory: null,
//     createdAt: 'datestring',
//     testID: 2
//   },
//   { id: 1,
//     statusCode: '200',
//     latency: '0.00',
//     size: '862',
//     method: 'GET',
//     CPU: null,
//     GPU: null,
//     memory: null,
//     createdAt: 'datestring',
//     testID: 2
//   }
// ]
