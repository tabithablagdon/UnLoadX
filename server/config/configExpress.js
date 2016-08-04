import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

export default app => {

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

};
