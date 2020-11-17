const express = require("express")
const next = require("next")
const mongoose = require("mongoose")

const PORT = process.env.PORT || 5000
const dev = process.env.NODE_ENV !== "production"

const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const db = mongoose.connect(process.env.MONGO_DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
})
.then(() => console.log(`Connected to MongoDB`))
.catch(err => console.error(err))

nextApp.prepare().then(() => {
      const app = express()

      const restrictAccess = (req, res, next) => {
            if(!req.isAuthenticated) {
                  res.redirect("/")
                  next()
            }
      }

      const allowAccess = (req, res, next) => {
            if(req.isAuthenticated) {
                  res.redirect("/tradefx")
                  next()
            }
      }

      app.use("/tradefx", restrictAccess)
      app.use(/^\/$/ig, allowAccess)

      app.get("*", (req, res) => {
            return handle(req, res)
      })

      app.listen(PORT, () => `Server is running on port ${PORT}`)
})
.catch(err => console.error(err))

