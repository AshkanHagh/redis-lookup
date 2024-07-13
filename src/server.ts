import app from './app';

const PORT = process.env.PORT || 7861;

app.listen(PORT, () => console.log(`Started server on ${PORT}`));