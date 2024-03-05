const mongoose= require('mongoose');

const taskSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    description: {type: String, required: true},
    due_date: {type: Number, required: true},
    status: {type: String, required: true},
    isDeleted: {
        type: Boolean,
        default: false,
      },

})

module.exports= mongoose.model('task', taskSchema);