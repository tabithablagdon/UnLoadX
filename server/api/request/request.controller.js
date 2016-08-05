import { Test, NodeServer, Request } from '../../db/db';
import { handleError } from '../../config/utils';

const requestController = {};

requestController.createRequest = (req, res) => {
  // TO DO: Figure out what the body of this request will look like - will need server and test id somehow
  const serverId = undefined;
  const testId = undefined;
  // TO: Find Server by ID
  // TO: Find Test by ID

  Request.create({
    latency: req.body.latency,
    CPU: req.body.CPU || null,
    GPU: req.body.GPU || null,
    memory: req.body.memory || null,
    serverId: serverId,
    testId: testId
  })
  .catch(handleError(res));

};

requestController.getTestRequests = (req, res) => {
  // TO DO: Get the testId somehow
  const testId = 1; // should populate from params for req.body

  Request.findAll({where: {testId: testId}})
    .then(requests => res.json(requests))
    .catch(handleError(res));
};

export default requestController;
