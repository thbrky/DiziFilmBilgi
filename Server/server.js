import express from "express";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import authRouters from "./routes/authRouters.js";
import db from "./db.js";
import cors from "cors"; // Cors middleware'ini ekleyin

const app = express();
const MongoDBStore = connectMongoDBSession(session);

const startServer = async () => {
  try {
    // DB bağlantısı
    await db();

    // Middleware
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ limit: "10mb", extended: true }));

    // CORS middleware'ini kullanın
    app.use(cors());

    const store = new MongoDBStore({
      uri: "mongodb://127.0.0.1:27017/Dizi-Film-Diyarı",
      collection: "sessions",
    });

    store.on("error", (error) => {
      console.log("Session store error:", error);
    });

    app.use(
      session({
        secret: "8E3933B1D28FC2C1B36719BD29A68",
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
          secure: false,
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        },
      })
    );

    // Routes
    app.use("/auth", authRouters);

    const port = 5000;
    app.listen(port, () => {
      console.log(`Server ${port} portunda çalışıyor`);
    });
  } catch (error) {
    console.log("Server başlatılamadı:", error);
  }
};

startServer();
