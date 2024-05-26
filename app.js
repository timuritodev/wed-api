const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const { errors } = require("celebrate");
const cors = require("cors");
const mailerRoutes = require("./routes/mailers");
const NotFoundError = require("./errors/NotFoundError");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const rateLimiter = require("./middlewares/rateLimit");

const { PORT = 3001 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: '*',
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

const config = {
  JWT_SALT: process.env.JWT_SALT,
};

app.set("config", config);
app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use(mailerRoutes);

app.use((req, res, next) => next(new NotFoundError("Страница не найдена")));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
