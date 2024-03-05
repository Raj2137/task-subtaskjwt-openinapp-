const mongoose= require('mongoose');

const subTaskSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    task_id: {type: mongoose.Schema.Types.ObjectId, ref: 'task', require: true },
    desc: {type: String, required: true},
    Status: {type: String, required: true},
    created_at: {type: Date},
    updated_at: {type: Date},
    deleted_at: {type: Date},
    isDeleted: {
        type: Boolean,
        default: false,
      },

})

module.exports= mongoose.model('subtask', subTaskSchema);