function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  tryCatchWrapper,
};
