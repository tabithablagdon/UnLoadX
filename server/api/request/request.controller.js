import { Test, NodeServer, Request } from '../../db/db';
import { handleError } from '../../config/utils';

const requestController = {};

requestController.getTestRequests = (req, res) => {
  // TO DO: Get the testId somehow
  const testId = 1; // should populate from params for req.body

  Request.findAll({where: {testId: testId}})
    .then(requests => res.json(requests))
    .catch(handleError(res));
};

export default requestController;
