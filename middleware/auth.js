const { User } = require("../models/User");
let auth = (req, res, next) => {
  // 인증 처리

  // client cookie에서 token 가져옴
  let token = req.cookies.x_auth;
  // token 복호화 -> 유저 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });
    req.token = token;
    req.user = user;
    next();
  });
  // 유저 있다면 인증 Okay

  // 유저 없다면 인증 No !
};

module.exports = { auth };
