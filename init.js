import dotenv from "dotenv";
import app from "./app";
import "./db";
import "./models/Video";
import "./models/Comment";
dotenv.config();

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`Listening Start on : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
