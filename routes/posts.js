const router = require('express').Router()
const Post = require('../models/Post')

//create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const post = await newPost.save();
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

//update a post

router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})
//delete a post

router.delete('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    try {
        await post.delete()
        res.status(200).json('Post has been deleted!')
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all existing posts in the database
router.get('/', async (req, res) => {
    try {
        let posts = await Post.find()
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;