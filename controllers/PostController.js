import PostModel from '../models/Post.js';

export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the post'
        });
    }
}
export const getOnePost = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate({
            _id: postId
        }, {
            $inc: { viewsCount: 1 }
        }, {
            returnDocument: 'after'
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed to return article'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Article not found'
                })
            }
            res.json(doc);
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the post'
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        })
        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create the post'
        })
    }
};

export const removeOnePost = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndRemove({
            _id: postId
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed to delete article'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Article not found'
                })
            }
            res.json({
                success: true
            });
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the post'
        });
    }
}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags
        })
        res.json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to update the article"
        })
    }
}