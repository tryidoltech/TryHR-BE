const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, "192.168.1.17", () => console.log(`Server running on port ${PORT}`));
