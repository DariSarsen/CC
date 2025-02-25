const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const sequelize = require("./config/db");



const app = express();
const port = process.env.PORT || 3000;


//database
sequelize.sync() 
    .then(() => console.log("Database synchronized"))
    .catch(err => console.error("Sync error:", err));


app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
  origin: ['http://localhost:4200'],
  methods: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
};
app.use(cors(corsOptions));



//server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
