module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'medtrack',
    user: process.env.DB_USER || 'medtrack',
    password: process.env.DB_PASS || 'medtrack',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './medtrack.sqlite'
    }
  }
}