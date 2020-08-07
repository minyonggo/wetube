import dotenv from "dotenv";
import app from "./app";
import "./db";
import "./models/Comment";
import "./models/User";
import "./models/Video";
import User from "./models/User";
dotenv.config();

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`Listening Start on : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
