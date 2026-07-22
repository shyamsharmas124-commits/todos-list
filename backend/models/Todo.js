const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        deleted:{
            type: Boolean,
            default: false
        },
        deletedAt:{
            type: Date,
            default: null
        }
        
    },
    { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);

