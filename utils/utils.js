const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const emailRegex = /^[a-z0-9-]+@[a-z0-9-.]+/i;

const allowedCors = [
  'https://localhost:5173',
  'https://localhost:5174',
  'https://timur-eva.ru',
];

module.exports = {
  emailRegex,
  urlRegex,
  allowedCors,
  pool,
};
