import Sequelize from 'sequelize';
import dbHost from '../../config/config';

const db = new Sequelize(`postgres://postgres@${dbHost.db}/unloadx`,{dialect: 'postgres'});
 // const db = new Sequelize('unloadx', 'root', 'mainstreet', {dialect: 'mysql'});

/**
 * CONNECT TO THE DATABASE
 */
db.authenticate()
  .then(err => console.log('Connection to database has been established successfully.'), err => console.log(`Unable to connect to the database: ${err}`));

/**
 * IMPORT TABLE MODELS
 */
export const LoadBalancer = db.import('../api/loadbalancer/loadbalancer.model');
export const NodeServer = db.import('../api/node-server/node-server.model');
export const Request = db.import('../api/request/request.model');
export const ServerHealth = db.import('../api/server-health/server-health.model');
export const Test = db.import('../api/test/test.model');
export const User = db.import('../api/user/user.model');

/**
 * DEFINE RELATIONSHIPS BETWEEN TABLES
 */

// NodeServer Table - add foreign key to User
NodeServer.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

// Request Table - add foreign key to NodeServer and Test
Request.belongsTo(Test, {foreignKey: 'testId', targetKey: 'id'});

// ServerHealth - add foreign key to NodeServer and Test
ServerHealth.belongsTo(NodeServer, {foreignKey: 'serverId', targetKey: 'id'});
ServerHealth.belongsTo(Test, {foreignKey: 'testId', targetKey: 'id'});

// Test Table - add foreign key to User
Test.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

// User Table - add foriegn key to LoadBalancer instance
User.belongsTo(LoadBalancer, {foreignKey: 'loadbalancerId', targetKey: 'id'});

export default db;
