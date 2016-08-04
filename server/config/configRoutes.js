import path from 'path';

export default app => {

  app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../client/www/index.html')));

  app.route('/*').get((req, res) => res.sendFile(path.join(__dirname, '../../', req.url)));

};
