const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    db: process.env.DATABASE_URL || 'localhost'
  },
  production: {
    db: process.env.DATABASE_URL || 'pgcontainer'
  }
};



module.exports = config[env];
