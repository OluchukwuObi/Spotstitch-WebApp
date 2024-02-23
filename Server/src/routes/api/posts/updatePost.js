const { Post } = require('../../../model');
const logger = require('../../../logger');
const { createErrorResponse } = require('../../../response');

/**
 * Update an existing post with new data.
 * Specific posts are found with their id in the links params
 */
module.exports = async (req, res) => {
    try {
        const { postId } = req.params
        const { postData } = req.body

        // add validation here

        const post = await Post.getPost(postId)
        if (!post) throw new Error('Could not find post')

        post.updatePost(postData)

        res.status(201).json(post);
    } catch (e) {
        logger.error({ e }, e.message)
        res.status(400).json(e)

    }
}