
import User from "../models/user.js";
import { hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";

const {sign} = pkg;

const secretKey = 'secret-key';

export async function registerUser(req, res) {
  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ email, password, username });
      await newUser.save();
      res.status(201).json({ message: 'Registration successful' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during registration' });
  }
  // try {
  //   const { username, password, email } = req.body;
  //   const hashedPassword = await hash(password, 10);
  //   const user = new User({ username, password: hashedPassword, email });
  //   await user.save();
  //   res.status(201).json({ message: "User registered successfully!" });
  // } catch (error) {
  //   res.status(500).json({ error: "Error while registering user" });
  // }
}

export async function loginUser(req, res) {
    const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ username });
    const isPasswordValid = await user.password === password.toString();
    
    if (user && isPasswordValid) {
      res.status(200).json({ message: 'Login successful', user});
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
 
  // try {
  //   const { username, password, email } = req.body;
  //   const user = await User.findOne({ username });

  //   if (!user && !email) {
  //     return res.status(404).json({ message: "User not found" });
  //   }

  //   const isPasswordValid = await compare(password, user.password);

  //   if (!isPasswordValid) {
  //     return res.status(401).json({ message: "Invalid" });
  //   }

  //   const token = sign({ username: user.username }, secretKey, {
  //     expiresIn: "1h",
  //   });

  //   res.status(200).json({ token });
  // } catch (error) {
  //   console.error("Error during login:", error);
  //   res.status(500).json({ error: "Error while logging in" });
  // }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error while updating user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting user" });
  }
};
