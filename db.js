import mongoose from "mongoose";
import User from "./models/User.js";

const admin = {
  name: "admin",
  password: "Abc123",
  email: "adminberkay@gmail.com",
  role: "admin",
};

const db = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Dizi-Film-Diyarı");
    const isAdminRegistered = await User.findOne({ email: admin.email });
    if (isAdminRegistered) {
      console.log("Admin mevcut");
    } else {
      const newAdmin = await User.create(admin);
      if (!newAdmin) {
        throw new Error("Admin oluşturulamadı");
      }
      console.log("Admin kaydedildi");
    }
  } catch (error) {
    console.error("Database bağlantı hatası:", error);
    throw new Error(error);
  }
};

export default db;
