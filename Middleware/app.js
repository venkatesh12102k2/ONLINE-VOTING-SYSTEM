const express = require('express');
const morgan = require("morgan");
const passport = require("passport");
const db = require("./src/config/db");
const addElectionCommissionerUser = require('./src/config/seed');

const port = process.env.PORT || 3000;
const app = express();
let cors = require('cors');
app.use(cors());
//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
require("./src/config/passport")(passport);

app.use("/api/v1", require("./src/routes"));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });



app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});

db.once('open', () => {
    addElectionCommissionerUser();
});

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === "development") {
    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(500).send('Internal Server Error');
    });
}