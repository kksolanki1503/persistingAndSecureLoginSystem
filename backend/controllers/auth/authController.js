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
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ code: 400, message: "All fields required" });
    }

    let user = await query("select * from user where email = ?", [email]);
    if (!user.length) {
      return res
        .status(401)
        .json({ code: 401, message: "User Is not registered with this email" });
    }

    user = user[0];
    // console.log(user);
    let isPasswordMatch = await comparePassword(password, user.password);
    // console.log(isPasswordMatch, "password");
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ code: 401, message: "Password is not correct" });
    }
    const userData = { name: user.name, email: user.email };
    let token = jwt.sign(
      {
        data: userData,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    // console.log(req.cookie, "cookies");
    res.cookie("databaseToken", token, {
      httpOnly: true,
      secure: true,
      // expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      code: 200,
      message: "login Successfull",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "server Error", error: error.message });
  }
};

exports.authentication = async (req, res, next) => {
  try {
    const databaseToken = req?.cookies?.databaseToken;
    const decoded = jwt.verify(databaseToken, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({ code: 400, message: "not Authorized !" });
    }
    // console.log(decoded.data, "decoded");
    res.userData = decoded.data;
    next();
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
