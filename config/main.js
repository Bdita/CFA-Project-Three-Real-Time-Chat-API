module.exports = {
  // Secret key for JWT signing and encryption
  secret: "shh!its a secret",
  // Database connection information
  database: "mongodb://localhost:27017/ohmDataCentre",
  // Setting port for server
  port: process.env.PORT || 3000,

  test_port: 3001,
  test_db: 'chat-App-test',
  test_env: 'test'
}
