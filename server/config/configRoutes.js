import path from 'path';
import nodeRouter from '../api/node-server/node-server.router';

export default app => {

  app.use('/api/node', nodeRouter);

  /**
   * Serves index.html from home directory
   */

  app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../client/www/index.html')));

  /**
   * Serves assets to front-end
   */

  app.route('/*').get((req, res) => res.sendFile(path.join(__dirname, '../../', req.url)));

};
