import { NodeServer, Test, User } from '../../db/db';
import { handleError } from '../../config/utils';

const testController = {};

testController.getTests = (req, res) => {
  Test.findAll()
    .then(tests => res.json(tests))
    .catch(handleError(res));

};

testController.getTests = (req, res) => {
  console.log('received post')
  console.log(req.body);

};

export default testController;
