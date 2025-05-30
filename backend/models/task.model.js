import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    task_name: {
        type:String,
        required: true
    },
    task_description: {
        type: String,
        required: true
    },
    task_timelimit: {
        type: Date,
        required: true
    },
    task_priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    task_status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    }
},
{
    timestamps: true
}
);

const Task = mongoose.model('Task', taskSchema);
export default Task;