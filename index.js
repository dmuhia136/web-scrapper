const express = require("express");
const axios = require("axios");
const app = express();
const cheerio = require("cheerio");
const PORT = 8000;

var url = "https://www.pdfdrive.com/living-in-the-light-a-guide-to-personal-transformation-d10172273.html";
var articles = [];
app.get("/", (req, res) => {
  axios(url).then((response) => {
    const data = response.data;
    const $ = cheerio.load(data);
    $(".text-center", data).each(function () {
      const title = $(this).text();
      const urls = $(this).find("a").attr("href");
      articles.push({
        title,
        urls,
      });
    });
    res.send(articles);
  });
});

app.listen(PORT, () => {
  console.log("====================================");
  console.log(`You are listening to ${PORT}`);
  console.log("====================================");
});
