import express from 'express';
import testController from './test.controller';


const testRouter = express.Router();

testRouter.get('/', testController.getTests);

export default testRouter;
