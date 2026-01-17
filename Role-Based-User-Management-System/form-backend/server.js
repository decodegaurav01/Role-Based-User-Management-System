const express = require('express');
const cors = require('cors');
require('dotenv').config();;

const authRoutes =require("./routes/authRoutes");
const adminRoutes =require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/user", userRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT,'localhost', () => {
    console.log(`server running on port ${PORT}........!`);

})