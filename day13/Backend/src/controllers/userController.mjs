import express from "express";
import userModel from "../models/userModel.mjs";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateUsername,
} from "../utilis/valid.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../Backend/config.mjs";

const userCreate = async (req, res) => {
  try {
    let { name, email, password, username, dob, gender, phone, address } =
      req.body;
    if (!validateEmail(email)) {
      return res
        .status(400)
        .send({ message: "failed", error: "Invalid email format" });
    }
    if (!validatePassword(password)) {
      return res.status(400).send({
        message: "failed",
        error:
          "Need strong password which includes uppercase, lowercase, number and special character",
      });
    }
    if (!validateUsername(username)) {
      return res.status(400).send({
        message: "failed",
        error:
          "Username can only contain alphanumeric characters and underscores, and must be 3-15 characters long",
      });
    }
    if (!validatePhone(phone)) {
      return res.status(400).send({
        message: "failed",
        error: "Phone number must be 10 digits long",
      });
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .send({ message: "failed", error: "Email already exists" });
    }
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .send({ message: "failed", error: "Username already exists" });
    }
    const newUser = await userModel.create({
      name,
      email,
      password,
      username,
      dob,
      gender,
      phone,
      address,
    });
    return res.status(201).send({ message: "success", data: newUser });
  } catch (error) {
    if (error.message.includes("validation")) {
      return res.status(400).send({ message: "failed", error: error.message });
    } else if (error.message.includes("duplicate")) {
      return res.status(400).send({ message: "failed", error: error.message });
    } else {
      return res
        .status(500)
        .send({ message: "failed", error: "Internal Server Error" });
    }
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "failed", error: "user not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .send({ message: "failed", error: "password not matched" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).send({ message: "success", token, data: user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "failed", error: "Internal login error" });
  }
};
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(400)
        .send({ message: "failed", error: "user id not found" });
    }
    return res.status(200).send({ message: "success", data: user });
  } catch (error) {
    return res.status(500).send({ message: "failed", error: "Internal get" });
  }
};
let updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await userModel.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res
        .status(404)
        .send({ message: "failed", error: "User not found" });
    }
    return res.status(200).send({ message: "success", data: user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "failed", error: "Internal update Error" });
  }
};

export { userCreate, getUser, login, updateUser };
