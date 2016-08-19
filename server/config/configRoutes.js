import path from 'path';
import nodeRouter from '../api/node-server/node-server.router';
import requestRouter from '../api/request/request.router';
import serverHealthRouter from '../api/server-health/server-health.router';
import testRouter from '../api/test/test.router';
import userRouter from '../api/user/user.router';


export default app => {

  app.use('/api/nodeserver', nodeRouter);
  app.use('/api/request', requestRouter);
  app.use('/api/serverhealth', serverHealthRouter);
  app.use('/api/test', testRouter);
  app.use('/api/user', userRouter);

  /**
   * Serves index.html from home directory
   */
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../client/www/index.html')));

  /**
   * Serves assets to front-end
   */
  app.route('/*').get((req, res) => res.sendFile(path.join(__dirname, '../../', req.url)));

  /**
   * Sends status 404 for requests made to unhandled paths
   */
  app.route('/:url(api|node_modules|client)/*').get((req, res) => {
    res.sendStatus(404);
  });
};
