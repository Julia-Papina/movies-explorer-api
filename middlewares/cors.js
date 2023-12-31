const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'localhost:3000',
  'localhost:3001',
  'http://papina-movies.nomoreparties.co',
  'http://api.papina-movies.nomoreparties.co',
  'https://papina-movies.nomoreparties.co',
  'https://api.papina-movies.nomoreparties.co',
  'https://api.nomoreparties.co/beatfilm-movies',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};

module.exports = cors;
