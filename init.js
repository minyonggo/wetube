import app from './app';

const PORT = 2000;

const handleListening = () => {
    console.log(`Listening Start on : http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);