const express = require("express")
const router = express.Router()

router.post("/intradayfx", async (req, res) => {
      const fromFX = req.body.fromFX
      const toFX = req.body.toFX

      const results = await fetch(`https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${fromFX}&to_symbol=${toFX}&interval=5min&outputsize=full&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`)
      const data = await results.json()

      console.log(data)
})