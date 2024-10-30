const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models/User');
const { v4: uuidv4 } = require('uuid');

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  callbackURL: process.env.CALLBACKURL,
}, async (accessToken, refreshToken, profile, done) => {
  const uuid = uuidv4();
  try {
    let user = await User.findOne({ where: { email: profile.emails[0].value } });
    if (!user) {
      user = await User.create({ uuid, email: profile.emails[0].value, password: '' });
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));