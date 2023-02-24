import express from "express";
import request from "request";
import "dotenv/config";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const api = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

app.get("/currency", (req, res) => {
  request({ url: api }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: "error", message: error.message });
    }

    res.json(JSON.parse(body));
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
