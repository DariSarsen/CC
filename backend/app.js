const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');

const authMiddleware = require("./middlewares/authMiddleware");
const router = express.Router();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");


//db
const db = require("./config/db");


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: "*",
  allowedHeaders: "*",
  credentials: true 
};
app.use(cors(corsOptions));


//routes
app.use("/users", userRoutes); 
app.use("/auth", authRoutes);
app.use("/resumes", resumeRoutes);


//for testing
app.use(router.get("/dashboard", authMiddleware(), (req, res) => {
  res.json({ message: "Добро пожаловать в панель управления!", user: req.user });
}));


//server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
