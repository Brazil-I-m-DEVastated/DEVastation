/* eslint-disable complexity */
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';
import User from '../models/user.js';

function verifyPassword(password, hashPassword) {
    const comparison = bcryptjs.compareSync(password, hashPassword);
    return comparison;
}

function generateToken(user) {
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '15m' });
    return token;
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
}, async (email, userPassword, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user || !verifyPassword(userPassword, user.password)) {
            return done(null, false, {
                message: 'Check your credentials and try again!',
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));

passport.use(new BearerStrategy(
    async (token, done) => {
        try {
            const payload = jwt.verify(token, process.env.APP_SECRET);
            done(null, payload, { token });
        } catch (err) {
            done(err);
        }
    },
));

export const authLocal = (req, res, next) => {
    passport.authenticate(
        'local',
        { session: false },
        (err, data, info) => {
            if (!data) {
                return res.status(401).json({ info });
            }
            req.user = data;
            return next();
        },
    )(req, res, next);
};

export const authBearer = (req, res, next) => {
    passport.authenticate(
        'bearer',
        { session: false },
        (error, user) => { 
            if (error && error.name === 'JsonWebTokenError') { 
                return res.status(400).json({ error: error.message }); 
            } 
            if (error && error.name === 'TokenExpiredError') { 
                return res.status(401).json({ error: error.message, expiredAt: error.expiredAt }); 
            } 
            if (error) { 
                return res.status(500).json({ error: error.message }); 
            } 
            if (!user) { 
                return res.status(401).json(); 
            }
            req.user = user;
            return next();
        })(req, res, next);
};

export default generateToken;