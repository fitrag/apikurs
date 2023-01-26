const cheerio = require("cheerio");
const express = require("express");
const axios = require("axios");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const { response } = require("express");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "API Nilai Tukar Dollar dan Euro ke Rupiah",
    author: "Fadila Fitra Kusuma Jaya",
  });
});

app.get("/api/kurs/dollar", (req, res) => {
  const url =
    "https://www.google.com/finance/quote/USD-IDR?sa=X&ved=2ahUKEwiH_-eWmtv8AhWg1zgGHckuBbUQmY0JegQIBhAc";
  axios.get(url).then((response) => {
    const $ = cheerio.load(response.data);
    const content = $("main");

    const obj = {};
    obj.mataUang = "USD";

    content.find(".rPF6Lc").each((id, el) => {
      obj.nilai = $(".kf1m0")
        .find(".YMlKec")
        .text();
      console.log(el);
    });

    obj.author = "Fadila Fitra";
    res.json(obj);
  });
});

app.get("/api/kurs/euro", (req, res) => {
  const url =
    "https://www.google.com/finance/quote/EUR-IDR?sa=X&ved=2ahUKEwiH_-eWmtv8AhWg1zgGHckuBbUQmY0JegQIBhAc";
  axios.get(url).then((response) => {
    const $ = cheerio.load(response.data);
    const content = $("main");

    const obj = {};
    obj.mataUang = "EUR";

    content.find(".rPF6Lc").each((id, el) => {
      obj.nilai = $(".kf1m0")
        .find(".YMlKec")
        .text();
    });

    obj.author = "Fadila Fitra";
    res.json(obj);
  });
});

app.listen(PORT, function () {
  console.log("Started application on port " + PORT);
});
