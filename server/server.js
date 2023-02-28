const express = require('express');
const dotenv = require('dotenv')
const path = require('path');
const routes = require('./routes')
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const cors = require('cors')

dotenv.config()
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin:"http://localhost:3000",
    methods:["GET", "POST", "PUT", "DELETE"],
  })
)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.use(authMiddleware)


// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build/index.html')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


db().then(() => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  })
})


