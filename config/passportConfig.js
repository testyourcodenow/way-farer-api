import passport from 'passport'
import UserModel from '../app/models/User'
import EncryptData from '../helpers/EncryptPassword'
import config from './config'

const LocalStrategy = require('passport-local').Strategy
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await UserModel.getUserEmail(email)
      if (!user) return done(null, false, { message: 'User does not exist' })
      const passwordMatch = await EncryptData.comparePassword(
        password,
        user.password,
      )
      if (passwordMatch) return done(null, user)
      return done(null, false, { message: 'Incorrect email or Password' })
    },
  ),
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secretKey,
      jsonWebTokenOptions: { maxAge: config.jwtExpiration },
    },
    (jwtPayload, done) => done(null, jwtPayload),
  ),
)

const localAuthentication = passport.authenticate('local', {
  session: false,
})

const jwtAuthentication = passport.authenticate('jwt', { session: false })

module.exports = {
  localAuthentication,
  jwtAuthentication,
}