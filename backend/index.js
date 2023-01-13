const connectToMongo = require ('./db');
var express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000


// allow cors origin requests

app.use(cors());
app.use(express.json())
 // available routs

app.use ('/api/auth', require('./routes/auth'))
app.use ('/api/notes', require('./routes/notes'))



app.listen(port, () => {
  console.log(`iNotebook backend listening at port ${port}`)
})
