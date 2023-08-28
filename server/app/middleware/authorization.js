import pkg from "jsonwebtoken";

const {verify} = pkg;
export const secretKey = 'secret-key'; 

export default async(req, res, next) => {
  // const token = req.headers.authorization;

  // if (!token) {
  //   return res.status(401).json({ message: "Authorization token not provided" });
  // }

  // verify(token, secretKey, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }
  //   next();
  // });
  console.log(req)
  const username = req.user;
  const isUser = await User.findOne({username})
  if (!isUser) {
    return res.status(401).json({ message: "Invalid token" });
  }
  
  next();
};
