import express from "express";
import { keys } from "./sources/keys.js";
import fetch from "node-fetch";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.end("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const city = req.body.cityName;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keys.API_KEY}`
    );
    const data = await response.json();
    res.json({
      weatherText: `${data.name} , ${Math.round(data.main.temp)} °C`,
    });
  } catch (err) {
    res.status(404).json({ weatherText: "Error!" });
  }
});

export default app;
