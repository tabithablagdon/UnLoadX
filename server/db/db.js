import Sequelize from 'sequelize';
const db = new Sequelize('unloadx', 'root', 'password', {dialect: 'mysql'});
// postgres://postgres@54.67.125.238/unloadx

/**
 * CONNECT TO THE DATABASE
 */

db.authenticate()
  .then(err => console.log('Connection to database has been established successfully.'), err => console.log(`Unable to connect to the database: ${err}`));

/**
 * IMPORT TABLE MODELS
 */

export const NodeServer = db.import('../api/node-server/node-server.model');
export const User = db.import('../api/user/user.model');
export const Request = db.import('../api/request/request.model');
export const Test = db.import('../api/test/test.model');

/**
 * DEFINE RELATIONSHIPS BETWEEN TABLES
 */

// NodeServer Table - add foreign key to User table
NodeServer.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

// Request Table - add foreign key to Node-Server and Test
Request.belongsTo(NodeServer, {foreignKey: 'serverId', targetKey: 'id'});
Request.belongsTo(Test, {foreignKey: 'testId', targetKey: 'id'});

// Test Table - add foreign key to User
Test.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

// User Table (contains no foreign keys)


export default db;
