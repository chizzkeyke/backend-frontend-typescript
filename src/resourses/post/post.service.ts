import { modelPost } from './post.model'
import { PostInterface } from './post.interface'
import { modelUser } from '../user/user.model'
import { nanoid } from 'nanoid'
import { deleteAllCommentsChoosesPost } from '../comment/comment.service'


export async function getNewPosts(): Promise<PostInterface[] | []> {
    const posts = await modelPost.find()
    const reversePosts = posts.reverse()
    const data: PostInterface[] = []

    reversePosts.forEach(post => data.push(post))

    return data
}

export async function getOnePost(idPost: string): Promise<PostInterface | null> {
    const findedPost = await modelPost.findOne({ id: idPost })

    return findedPost
}

export async function createPost(title: string, body: string, token: string): Promise<PostInterface | string> {
    const user = await modelUser.findOne({ token })
    const id: string = nanoid()

    if (!user) {
        return 'This user is not undefined.'
    }

    const newPost = await modelPost.create({
        id,
        title,
        body,
        author: user.username
    })

    newPost.save()

    return newPost
}

export async function updatePost(idPost: string, body: string, title: string, token: string): Promise<PostInterface > {
    try {
        const user = await modelUser.findOne({ token })
        const findPost = await modelPost.findOne({ id: idPost })

        if (!user) {
            throw 'This user is not undefined.'
        }

        if (!findPost) {
            throw 'Post is not a find.'
        }

        if (user.username !== findPost.author) {
            throw 'Author is not have this post.'
        }

        const updatingPost = await modelPost.findOneAndUpdate({ id: idPost }, { body, title }, {
            new: true
        })

        if (!updatingPost) {
            throw 'Не удалось обновить пост'
        }

        return {
            id: updatingPost.id,
            title: updatingPost.title,
            body: updatingPost.body,
            author: updatingPost.author
        }
        
    } catch (e) {
        throw e
    }
}

export async function deletePost(idPost: string, token: string): Promise<string> {
    try {
        const user = await modelUser.findOne({token})
        const post = await modelPost.findOne({id: idPost})

        if (!user) {
            throw 'Такого пользователя нет'
        }

        if (!post) {
            throw 'Такого поста нет.'
        }

        if (user.username !== post.author) {
            throw "User can't delete this post."
        }

        await post.deleteOne({id: idPost})
        await deleteAllCommentsChoosesPost(idPost)

        return 'Post delete successfull.'

    } catch (error) {
        throw error
    }
}

export async function getPostsAuthUser(token: string): Promise<PostInterface[]> {
    const user = await modelUser.findOne({token})

    if (!user) {
        throw 'Пользователь не найден'
    }

    const posts = await modelPost.find({author: user.username})

    return posts
}
