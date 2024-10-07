import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

// Json
app.use(express.json());

// Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Route
app.get("/test", (req, res) => {
  try {
    res.status(200).json({ message: "Api is working" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single user
app.get("api/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
});

// Create User
app.post("/api/users", async (req, res) => {
  const { email, name } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit User
app.put("/api/users/:id", async (req, res) => {
  const { email, name } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        email,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete User
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res
      .status(200)
      .json({ message: `User with ID ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("App is running on PORT:", port);
});
