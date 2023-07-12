const config = {
  dbUri:
    process.env.DB_URI ||
    "mongodb+srv://Yoshi:yoshi@mydb.rk8laua.mongodb.net/?retryWrites=true&w=majority",
  port: process.env.PORT || 3000,
  host: process.env.HOST || "http://127.0.0.1",
  publicRoute: process.env.PUBLIC_ROUTE || "/",
  filesRoute: process.env.FILES_ROUTE || "files",
};

module.exports = config;
