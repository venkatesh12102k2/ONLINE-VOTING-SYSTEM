const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('../model/User');
const keys = require("../config/keys");
//i added the below line on mhy own
//const keys = {secretOrKey: 'app-keys'};
// const config = {
//     mongoURI : 'mongodb://venkatesh:testdatabase@ac-cyau7tl-shard-00-00.ycconnz.mongodb.net:27017,ac-cyau7tl-shard-00-01.ycconnz.mongodb.net:27017,ac-cyau7tl-shard-00-02.ycconnz.mongodb.net:27017/?ssl=true&replicaSet=atlas-dex15i-shard-0&authSource=admin&retryWrites=true&w=majority'
// }
const opts = {};
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    console.log(opts);
    passport.use(
        
        new JwtStrategy(opts, (jwtPayload, done) => {
            console.log("inside passport use");
            User.findById(jwtPayload.id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err) => {
                    throw err;
                });
                console.log("inside passport use 2")
        }));
        console.log("inside passport use 3")
};