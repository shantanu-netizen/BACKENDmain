import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.mjs";
import userModel from "../models/userModel.mjs";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, username, dob, gender, phone, address } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      username,
      dob,
      gender,
      phone,
      address,
    });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.secretToken,
      { expiresIn: "1h" },
    );
    res.send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Error logging in", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching user", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await userModel
      .findByIdAndUpdate(req.params.id, updates, { new: true })
      .select("-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating user", error: error.message });
  }
};

export { registerUser, getUser, login, updateUser };
