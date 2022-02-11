import { model, Schema } from 'mongoose'
import { CommentInterface } from './comment.interface'

const commentSchema = new Schema<CommentInterface>({
   id: {type: String, unique: true, required: true},
   idPost: {type: String, unique: true, required: true},
   author: {type: String, unique: true, required: true},
   body: {type: String, unique: true, required: true},
   date_created: {type: Date, unique: true, required: true}
})

export const modelComment = model('Comment', commentSchema)