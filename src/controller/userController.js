import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import * as v from "valibot";

export const getAllUsers = async (req, res) => {
  try {
    const result = await prisma.user.findMany();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.user.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching user." });
  }
};

export const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;

    const result = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching user." });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const nameValidation = v.pipe(v.string(), v.minLength(3), v.maxLength(50));
    const emailValidation = v.pipe(v.string(), v.email());
    const passwordValidation = v.pipe(
      v.string(),
      v.minLength(8),
      v.maxLength(50)
    );

    const nameError = nameValidation(name);
    const emailError = emailValidation(email);
    const passwordError = passwordValidation(password);

    if (nameError || emailError || passwordError) {
      return res.status(400).json({
        error: "Validation failed",
        details: { nameError, emailError, passwordError },
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
};
