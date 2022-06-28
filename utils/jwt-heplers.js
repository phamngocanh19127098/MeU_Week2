import jwt from "jsonwebtoken";

function jwtTokens({ login_name, password, role_name, id }) {
  const user = { login_name, password, role_name, id };
  let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2h",
  });
  let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5h",
  });
  accessToken = "Bearer " +accessToken;
  refreshToken = "Bearer "+refreshToken;
  return { accessToken, refreshToken };
}

export { jwtTokens };
