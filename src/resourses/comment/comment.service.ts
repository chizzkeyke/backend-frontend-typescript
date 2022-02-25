import { modelComment } from "./comment.model"
import { CommentInterface } from "./comment.interface"
import { modelPost } from "../post/post.model"
import { modelUser } from "../user/user.model"
import { nanoid } from "nanoid"

export async function getCommentsSelectedPost(idPost: string): Promise<CommentInterface[] | []> {
    try {
        const comments = await modelComment.find({ idPost })

        if (!comments) {
            throw 'Posts is undefined.'
        }

        return comments.reverse()

    } catch (error) {
        throw error
    }
}

export async function createCommentSelectedPost(idPost: string, author: string, body: string): Promise<CommentInterface> {
    try {
        const post = await modelPost.find({ id: idPost })
        const user = await modelUser.find({ username: author })

        if (!post) {
            throw 'Post if not a find.'
        }

        if (!user) {
            throw 'User is not find.'
        }

        const comment = await modelComment.create({
            id: nanoid(),
            idPost,
            author,
            body,
            date_created: Date.now()
        })

        await comment.save()

        return comment

    } catch (error) {
        throw error
    }
}

export async function updateCommentSelectedPost(idPost: string, idComment: string, author: string, newBody: string): Promise<CommentInterface | null> {
    try {
        const post = await modelPost.findOne({ id: idPost })
        const comment = await modelComment.findOne({ id: idComment })

        if (!post) throw 'Post is not a find.'

        if (!comment) throw 'Comment is not a find.'

        if (comment.author !== author) throw "This user can't update this comment."

        const updatingComment = await modelComment.findOneAndUpdate({ id: idComment }, { body: newBody }, {
            new: true
        })

        if (!updatingComment) throw "Can't update comment."

        return updatingComment

    } catch (error) {
        throw error
    }
}

export async function deleteSelectedComment(token: string, idComment: string): Promise<string> {
    try {
        const user = await modelUser.findOne({ token })
        const comment = await modelComment.findOne({ id: idComment })

        if (!user) throw 'User is not find.'
        if (!comment) throw 'Comment us not a find.'
        if (user.username !== comment.author) throw "This user can't delete this comment."

        await modelUser.findOneAndDelete({ id: idComment })

        return 'Post delete succesfull.'
    } catch (error) {
        throw error
    }
}

export async function deleteAllCommentsChoosesPost(idPost: string): Promise<string> {    
    try {
        await modelComment.deleteMany({idPost})

        return 'All posts delete.'

    } catch (error) {
        throw error
    }
}



