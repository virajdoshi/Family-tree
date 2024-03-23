import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    root: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: mongoose.Schema.Types.Date
    },
    childrenIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
}, {
    timestamps: true
})

export const user = mongoose.model('user', userSchema);
