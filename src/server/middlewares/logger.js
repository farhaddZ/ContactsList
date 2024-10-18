export default function loggerMiddleware(req, res, next) {
    console.log("request: ", req.method, req.url);
    next();
  }