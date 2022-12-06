const cors = require("cors");

function initCorsMiddleware() {
  const corsOptions = {
    origin: "http://localhost:3000/",
    credentials: true,
  };

  return cors(corsOptions);
}

module.exports = initCorsMiddleware;
