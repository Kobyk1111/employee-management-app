import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import Admin from "../models/Admin.js";
import Employee from "../models/Employee.js";

export async function authenticateTokenOfAdmin(req, res, next) {
  try {
    const { adminAccessCookie, adminRefreshCookie } = req.cookies;

    if (!adminAccessCookie && !adminRefreshCookie) {
      throw new Error("Authentication required. Please log in.");
    }

    let token = adminAccessCookie;
    let isAccessToken = true;

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const foundAdmin = await Admin.findById(id);
      if (!foundAdmin) {
        throw new Error("Admin not found");
      }
      req.user = foundAdmin;
      return next();
    } catch (err) {
      isAccessToken = false;
    }

    if (!isAccessToken && adminRefreshCookie) {
      console.log("access token expired");
      token = adminRefreshCookie;
      const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const foundAdmin = await Admin.findById(id);
      if (!foundAdmin) {
        throw new Error("Admin not found");
      }

      const newAccessToken = jwt.sign({ id: foundAdmin._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
      res.cookie("adminAccessCookie", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 15,
      });

      console.log("New access token created");

      req.user = foundAdmin;
      next();
    } else {
      throw new Error("Invalid token. Please log in again.");
    }
  } catch (error) {
    next(createHttpError(401, error.message));
  }
}

export async function authenticateTokenOfEmployee(req, res, next) {
  try {
    const { employeeAccessCookie, employeeRefreshCookie } = req.cookies;

    if (!employeeAccessCookie && !employeeRefreshCookie) {
      throw new Error("Authentication required. Please log in.");
    }

    let token = employeeAccessCookie;
    let isAccessToken = true;

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const foundEmployee = await Employee.findById(id);
      if (!foundEmployee) {
        throw new Error("Employee not found");
      }
      req.user = foundEmployee;
      return next();
    } catch (err) {
      isAccessToken = false;
    }

    if (!isAccessToken && employeeRefreshCookie) {
      console.log("access token expired");
      token = employeeRefreshCookie;
      const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const foundEmployee = await Employee.findById(id);
      if (!foundEmployee) {
        throw new Error("Employee not found");
      }

      const newAccessToken = jwt.sign({ id: foundEmployee._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
      res.cookie("employeeAccessCookie", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 15,
      });

      console.log("New access token created");

      req.user = foundEmployee;
      next();
    } else {
      throw new Error("Invalid token. Please log in again.");
    }
  } catch (error) {
    next(createHttpError(401, error.message));
  }
}
