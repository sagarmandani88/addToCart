const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

const app = express();
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.json({
        message: 'Arise MERN developers'
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/files', express.static("files"));
require("./mongoose.js")(app);
require('./routerHandler')(app)
