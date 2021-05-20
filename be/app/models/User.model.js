import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    joined: { type: Date, default: Date.now },
    name: {
        type: String,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('User', UserSchema)
export default User;