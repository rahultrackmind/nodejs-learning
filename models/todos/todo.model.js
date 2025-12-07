import mongoose from 'mongoose';
const todoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,    //used to give the reference of the schema to point another schema
            ref: 'User' //reference should be same as defined model name
        },
        subTodos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubTodo'
            }
        ]
    }, { timestamps: true }
)

export const Todo = mongoose.model('Todo', todoSchema);