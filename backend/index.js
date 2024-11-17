const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes'); 
const cors=require('cors')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/', userRoutes);
app.listen(8080, () => {
    console.log('Server started on port 8080');
});
