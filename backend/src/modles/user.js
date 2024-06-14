const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRY, jWT_REFERESH_EXPIRES_IN, REFRESH_TOKEN_SECRET } = require('../config/serverConfig');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }
}, {
    timestamps: true
});


userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

userSchema.pre('save', async function (next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptPassword;
    next();
});

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

userSchema.methods.generateJWT = function generate() {
    try {
        console.log(typeof JWT_SECRET, typeof JWT_EXPIRY)
        const accessToken = jwt.sign({ id: this._id, email: this.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRY
        });
        console.log("hello" + typeof REFRESH_TOKEN_SECRET, typeof jWT_REFERESH_EXPIRES_IN)
        const refreshToken = jwt.sign({ id: this._id, email: this.email },REFRESH_TOKEN_SECRET , {
            expiresIn: '1d'
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log('error in generateJWT', error);
        console.log(error);
        throw new Error(error);
    }
}

const User = mongoose.model('User',userSchema)


module.exports = User