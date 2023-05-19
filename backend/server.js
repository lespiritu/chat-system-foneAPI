const express = require('express');
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const { notFound, errorHandler } = require('./middleware/errorMiddleware') 


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000


// routes
const userRoutes = require('./routes/userRoutes')
connectDB()

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cors());



app.get('/', (req, res) => {
    res.send("API is Running")
})

// request routes
app.use("/api/user", userRoutes);

//error handler
app.use(notFound)
app.use(errorHandler)


app.listen(5000, console.log(`Server is running at port ${PORT}`));