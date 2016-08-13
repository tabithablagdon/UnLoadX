import express from 'express';
import testController from './test.controller';

const testRouter = express.Router();

testRouter.get('/:id', testController.getTests);

export default testRouter;
