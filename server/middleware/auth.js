const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // ahora el token viene de la cookie

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized. Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username, rol } = decoded;
    req.user = { id, username, rol };
    next()
  } catch (error) {
    return res.status(401).json({msg: "Unauthorized. Please add valid token"});
  }
}

const verifyAdmin = (req, res, next) => {
  if (req.user.rol !== "Admin") {
    return res.status(403).json({ message: "Acceso denegado, no eres admin" });
  }
  next();
};


module.exports = {
  authenticationMiddleware,
  verifyAdmin
}