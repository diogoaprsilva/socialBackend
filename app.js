const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const assert = require("assert");
const {
    routes
} = require('./routes/routes');

const {adminRoutes} = require('./routes/adminRoutes')
const {vendorRoutes} = require('./routes/vendorRoutes')

const app = express();


// Load config
const stage = process.env.NODE_ENV || 'production';
const env = dotenv.config({
    path: `${stage}.env`
});
assert.equal(null, env.error);
app.set('env', stage);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(cors());

app.get("/", function (req, res) {
    res.send("node is running")
})

app.use('/api/', routes)
app.use('/cp/api/', adminRoutes)
app.use('/vd/api/', vendorRoutes)

if (module === require.main) {
var server = app.listen(process.env.PORT || 8000, function () {
//   var server = httpsServer.listen(process.env.PORT || 6029, function () {
        var port = server.address().port;
        console.log("App listening on port %s", port);
    });
}