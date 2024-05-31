import Admin from "../models/Admin.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export async function createAdmin(req, res, next) {
  try {
    const foundAdmin = await Admin.find({});

    if (foundAdmin.length < 1) {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await Admin.create({ ...req.body, password: hashedPassword });

      res.status(201).json({
        id: admin._id,
        username: admin.firstname,
      });
    } else {
      return next(createHttpError(401, "You cannot register as an admin"));
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    next(createHttpError(500, "Failed to register as admin"));
  }
}

export async function loginAdmin(req, res, next) {
  const { email, password } = req.body;
  try {
    const foundAdmin = await Admin.findOne({ email });

    if (foundAdmin) {
      const matchPassword = await bcrypt.compare(password, foundAdmin.password);

      if (!matchPassword) {
        return next(createHttpError(400, "Wrong password, please try again!"));
      }

      res.json({
        id: foundAdmin._id,
      });
    } else {
      return next(createHttpError(404, "No Admin found"));
    }
  } catch (error) {
    next(createHttpError(500, "Failed to log in"));
  }
}
