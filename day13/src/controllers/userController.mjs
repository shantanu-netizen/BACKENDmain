import express from 'express';
import userModel from '../models/userModel.mjs';

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  );
}

function validateUsername(username) {
  return /^[a-zA-Z0-9_]{3,15}$/.test(username);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(String(phone));
}

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
          return res
            .status(400)
            .send({
              message: "failed",
              error:
                "Need strong password which includes uppercase, lowercase, number and special character",
            });
        }
        if (!validateUsername(username)) {
          return res
            .status(400)
            .send({
              message: "failed",
              error:
                "Username can only contain alphanumeric characters and underscores, and must be 3-15 characters long",
            });
        }
        if (!validatePhone(phone)) {
          return res
            .status(400)
            .send({
              message: "failed",
              error: "Phone number must be 10 digits long",
            });
        }
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
           return res
             .status(400)
             .send({ message: "failed", error: error.message });
         } else if (error.message.includes("duplicate")) {
           return res
             .status(400)
             .send({ message: "failed", error: error.message });
         } else {
           return res
             .status(500)
             .send({ message: "failed", error: "Internal Server Error" });
         }
    }
}
const getUser = async (req, res) => {
    try {
         const { id } = req.params;
         const user = await userModel.findById(id);
         if (!user) {
           res
             .status(400)
             .send({ message: "failed", error: "user id not found" });
         }
         res.status(200).send({ message: "success", data: user });
    } catch (error) {
        return res
          .status(500)
          .send({ message: "failed", error: "Internal get" });
    }
   
}

export { userCreate, getUser};
