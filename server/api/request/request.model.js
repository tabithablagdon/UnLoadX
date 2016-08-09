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
//
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
//
//summaryData = {
// 	latency: [0, 1, 2, 4, 1],
// 	averageLat: 2,
// 	minLat: 0,
// 	maxLat: 2,
// 	latStdDev: .2,
// 	numSuccess: 100,
// 	numFailures: 0,
// 	totalReqs: 100
// }
