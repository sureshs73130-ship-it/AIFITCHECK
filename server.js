const dns = require("dns");

// Fix MongoDB Atlas SRV DNS resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);

  server.close(() => {
    process.exit(1);
  });
});