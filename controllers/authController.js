import User from "../models/User.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "Eksik Bilgi Girdiniz" });
    }
    const newUser = await User.create({ name, surname, email, password });
    res.status(201).json({ message: `Kullanıcı Oluşturuldu: ${newUser}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Eksik Bilgi Girdiniz" });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "Email bulunamadı" });
    }
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      return res.status(403).json({ message: "Hatalı Şifre" });
    }
    req.session.UserId = findUser._id;
    res.status(200).json({ message: "Başarıyla giriş yapıldı" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  register,
  login,
};
