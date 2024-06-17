import createHttpError from "http-errors";

export default function authorizeRole(authorizedRole) {
  return function (req, res, next) {
    if (req.user.role !== authorizedRole) {
      return next(createHttpError(403, "You are not authorized to perform this action"));
    }

    next();
  };
}
