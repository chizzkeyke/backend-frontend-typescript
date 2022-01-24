import { PostInterface } from './post.interface'
import { model, Schema } from 'mongoose'

const PostSchema = new Schema<PostInterface>({
   title: {type: String, required: true},
   body: {type: String, required: true},
   author: {type: String, required: true}
})

export const modelPost = model('Post', PostSchema)
