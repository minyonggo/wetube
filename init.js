import app from "./app";
import "./db";

const PORT = 3000;

const handleListening = () => {
  console.log(`Listening Start on : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
