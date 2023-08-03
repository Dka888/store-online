import pkg from "jsonwebtoken";

const {verify} = pkg;
export const secretKey = 'secret-key'; 

export default (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token not provided" });
  }

  verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next();
  });
};
