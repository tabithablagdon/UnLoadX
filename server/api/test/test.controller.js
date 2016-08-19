import { NodeServer, Test, User } from '../../db/db';
import { handleError } from '../../config/utils';

const testController = {};


testController.getTests = (req, res) => {
  Test.findAll()
    .then(tests => res.json(tests))
    .catch(handleError(res));

};

export default testController;
