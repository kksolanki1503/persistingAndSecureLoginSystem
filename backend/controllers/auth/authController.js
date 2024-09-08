const { query } = require("../../util/mysqlDb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userExist = async (email) => {
  const q = "SELECT 1 FROM user WHERE email = ? limit 1";
  const result = await query(q, [email]);
  return result.length > 0;
};

const comparePassword = async (password, databaseP) => {
  let isEqualPassword = await bcrypt.compare(password, databaseP);
  // console.log(isEqualPassword, "compare");
  return isEqualPassword;
};

exports.signup = async (req, res) => {
  // console.log(req.body);
  try {
    const { name, email, password } = req.body;
    // console.log(name, email, password, "userData");
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ code: 400, message: "All fields required" });
    }

    if (email) {
      const isuserExist = await userExist(email);
      if (isuserExist) {
        return res
          .status(400)
          .json({ code: 400, message: "Email already exists" });
      }
    }

    let hashpassword = await bcrypt.hash(password, 12);
    let userData = { name, email, password: hashpassword };
    let q = "insert into user set ?";
    let result = await query(q, [userData]);

    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({ code: 200, message: "User Registered Successfully" });
    } else {
      return res.status(400).json({ code: 400, message: "Error Occured" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "server Error", error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password, visitorId } = req.body;

    if (!email || !password || !visitorId) {
      return res
        .status(400)
        .json({ code: 400, message: "All fields required" });
    }

    let user = await query("select * from user where email = ? && active = 1", [
      email,
    ]);
    if (!user.length) {
      return res
        .status(400)
        .json({ code: 400, message: "User Is not registered with this email" });
    }

    user = user[0];
    // console.log(user);
    let isPasswordMatch = await comparePassword(password, user.password);
    // console.log(isPasswordMatch, "password");
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ code: 400, message: "Password is not correct" });
    }
    const userData = { name: user.name, email: user.email };

    const refreshToken = jwt.sign(
      {
        name: user.name,
        email: email,
        password: password,
        roles: user?.roles?.split(",").map(Number),
        visitorId: visitorId,
      },
      process.env.SECRET_KEY_REFRESS,
      {
        expiresIn: "1h",
      }
    );
    const accessToken = jwt.sign(userData, process.env.SECRET_KEY_ACCESS, {
      expiresIn: "15m",
    });

    // let token = jwt.sign(
    //   {
    //     data: userData,
    //   },
    //   process.env.SECRET_KEY,
    //   { expiresIn: "1h" }
    // );
    // console.log(req.cookie, "cookies");
    res.cookie("RefressToken", refreshToken, {
      httpOnly: true,
      secure: true,
      // expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      sameSite: "none",
      maxAge: 1 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      code: 200,
      message: "login Successfull",
      accessToken: accessToken,
      roles: user?.roles?.split(",").map(Number),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "server Error", error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const data = res.userData;

    // console.log(data, "req data");
    return res.status(200).json({ code: 200, data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "server Error", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await query("select * from user");
    // console.log(result);
    if (!result.length) {
      return res.status(400).json({ code: 404, message: "No user found" });
    }
    return res.status(200).json({ code: 200, data: result });
  } catch (error) {
    return res.status(500).json({ code: 500, message: "server error" });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization");

    const decoded = jwt.verify(
      accessToken.split(" ")[1],
      process.env.SECRET_KEY_ACCESS
    );
    // console.log(decoded, "decoded");
    if (!decoded) {
      return res.status(401).json({ code: 401, message: "Unauthorized" });
    }
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  }
};

exports.RefreshToken = async (req, res) => {
  const { visitorId } = req.body;
  try {
    const refreshToken = req?.cookies?.RefressToken;
    // console.log(refreshToken, "refreshToken comming");
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESS);
    // console.log(decoded, "refreshtoken ");
    console.log(decoded.visitorId, "decoded Visitor Id");
    console.log(visitorId, "device Visitor Id");
    if (decoded.visitorId !== visitorId) {
      return res.status(401).json({ message: "Device Not Recognized" });
    }

    const accessToken = jwt.sign(
      { email: decoded.name, name: decoded.name },
      process.env.SECRET_KEY_ACCESS,
      {
        expiresIn: "10s",
      }
    );
    // console.log(accessToken, "accessToken");
    return res.status(200).json({ accessToken, roles: decoded.roles });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "server Error", error: error.message });
  }
};

exports.logout = async (req, res) => {
  const cookies = req.cookies;
  // console.log(cookies, "cookies");
  if (!cookies?.RefressToken) return res.sendStatus(204);
  const refreshToken = cookies.RefressToken;

  res.clearCookie("RefressToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};
