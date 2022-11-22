import express from "express";
import { keys } from "./sources/keys.js";
import fetch from "node-fetch";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.end("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const city = req.body.cityName;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keys.API_KEY}`
    
  )
    .then((response) => response.json())
    .then((data) => {
      if (city) {
        res.json({
          weatherText: `${data.name} , ${Math.round(data.main.temp)} °C`,
        });
      } else {
        res.status(400).json({ weatherText: "City is not found!" });
      }
    });
});

export default app;
