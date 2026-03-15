import { supabase } from "../config/supabaseClient.js";

export const getBalance = async (req, res) => {
  const userId = req.user;

  const { data, error } = await supabase
    .from("users")
    .select("balance,name,email")
    .eq("id", userId)
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

export const getUsers = async (req, res) => {
  const currentUser = req.user;

  const { data, error } = await supabase
    .from("users")
    .select("id,name,email")
    .neq("id", currentUser);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

export const transferMoney = async (req, res) => {
  const senderId = req.user;
  const { receiverId, amount } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const { data: sender } = await supabase
    .from("users")
    .select("*")
    .eq("id", senderId)
    .single();

  const { data: receiver } = await supabase
    .from("users")
    .select("*")
    .eq("id", receiverId)
    .single();

  if (!receiver) {
    return res.status(404).json({ message: "Receiver not found" });
  }

  if (sender.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  const newSenderBalance = sender.balance - amount;
  const newReceiverBalance = receiver.balance + amount;

  await supabase
    .from("users")
    .update({ balance: newSenderBalance })
    .eq("id", senderId);

  await supabase
    .from("users")
    .update({ balance: newReceiverBalance })
    .eq("id", receiverId);

  await supabase.from("transactions").insert({
    sender_id: senderId,
    receiver_id: receiverId,
    amount,
    transaction_type: "debit",
  });

  await supabase.from("transactions").insert({
    sender_id: senderId,
    receiver_id: receiverId,
    amount,
    transaction_type: "credit",
  });

  res.json({ message: "Transfer successful" });
};

export const getStatement = async (req, res) => {

  const userId = req.user;

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const { data: users } = await supabase
    .from("users")
    .select("id,name");

  const userMap = {};
  users.forEach(user => {
    userMap[user.id] = user.name;
  });

  const formatted = transactions.map(t => ({
    ...t,
    sender_name: userMap[t.sender_id] || "Unknown",
    receiver_name: userMap[t.receiver_id] || "Unknown"
  }));

  res.json(formatted);
};
