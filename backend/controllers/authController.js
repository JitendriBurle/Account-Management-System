import bcrypt from "bcryptjs";
import { supabase } from "../config/supabaseClient.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {

  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword }])
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({
    message: "User created",
    token: generateToken(data[0].id),
  });
};

export const login = async (req, res) => {

  const { email, password } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!data) {
    return res.status(400).json({ message: "User not found" });
  }

  const valid = await bcrypt.compare(password, data.password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: generateToken(data.id),
  });
};