export const handleError = (res, statusCode) => {
  statusCode = statusCode || 500;
  return err => {
    console.log(err);
    res.status(statusCode).send(err);
  };
};
