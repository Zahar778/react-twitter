// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const { Post } = require('../class/post')
// const test = require('./test')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
router.post('/post-create', function(req, res) {
    try {
        const { username, text, postId } = req.body

        if (!username || !text) {
            return res.status(400).json({
                message:
                'Потрiбно передати вci данi для створення поста',
            })
        }

        let post = null

        console.log(postId, 'postId')

        if(postId) {
            post = Post.getById(Number(postId))
            console.log('post', post)

            if(!post) {
                return res.status(400).json({
                    message:
                    'Пост з таким Id не iснуэ',
            })
        }
    } 
    const replyPost = Post.create(usetname, text, post)

    return res.status(400).json({
        post: {
            id: replyPost.id,
            text: replyPost.text,
            username: replyPost.username,
            data: replyPost.data,
        },
    })
} catch (e) {
    return res.status(400).json({
        message: e.message,
    })
}
})

// Експортуємо глобальний роутер
module.exports = router
