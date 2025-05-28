import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to create a post!"))
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields!'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};


// export const getposts = async (req, res, next) => {
//     try {
//         const startIndex = parseInt(req.query.startIndex) || 0;
//         const limit = parseInt(req.query.limit) || 9;
//         const sortDirection = req.query.sort === 'desc' ? -1 : 1;
//         const searchTerm = req.query.searchTerm || '';
//         const category = req.query.category || '';
//         const slug = req.query.slug || '';

//         if (slug) {
//             const post = await Post.findOne({ slug });
//             if (!post) return res.status(404).json({ message: 'Post not found' });
//             return res.status(200).json({ post });
//         }

//         const query = {};

//         if (searchTerm) {
//             query.title = { $regex: searchTerm, $options: 'i' };
//         }

//         if (category && category !== 'uncategorized') {
//             query.category = category;
//         }

//         const posts = await Post.find(query)
//             .sort({ createdAt: sortDirection })
//             .skip(startIndex)
//             .limit(limit);

//         const totalPosts = await Post.countDocuments(query);

//         res.status(200).json({
//             posts,
//             totalPosts,
//         });
//     } catch (error) {
//         next(error);
//     }
// };




export const getposts = async (req, res, next) => {
    try {
        const { postId, slug } = req.query;

        // ✅ First handle postId query
        if (postId) {
            const post = await Post.findById(postId);
            if (!post) return res.status(404).json({ message: 'Post not found' });
            return res.status(200).json({ posts: [post] }); // wrap in array for consistency
        }

        // ✅ Then handle slug query
        if (slug) {
            const post = await Post.findOne({ slug });
            if (!post) return res.status(404).json({ message: 'Post not found' });
            return res.status(200).json({ post });
        }

        // ✅ Default list logic
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;
        const searchTerm = req.query.searchTerm || '';
        const category = req.query.category || '';

        const query = {};

        if (searchTerm) {
            query.title = { $regex: searchTerm, $options: 'i' };
        }

        if (category && category !== 'uncategorized') {
            query.category = category;
        }

        const posts = await Post.find(query)
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments(query);

        res.status(200).json({
            posts,
            totalPosts,
        });
    } catch (error) {
        next(error);
    }
};




// export const getposts = async (req, res, next) => {
//     try {
//         const startIndex = parseInt(req.query.startIndex) || 0;
//         const limit = parseInt(req.query.limit) || 9;
//         const sortDirection = req.query.sort === 'desc' ? -1 : 1;
//         const searchTerm = req.query.searchTerm || '';
//         const category = req.query.category || '';
//         const query = {};

//         if (searchTerm) {
//             query.title = { $regex: searchTerm, $options: 'i' }; // case-insensitive search
//         }

//         if (category && category !== 'uncategorized') {
//             query.category = category;
//         }

//         const posts = await Post.find(query)
//             .sort({ createdAt: sortDirection })
//             .skip(startIndex)
//             .limit(limit);

//         const totalPosts = await Post.countDocuments(query);

//         res.status(200).json({
//             posts,
//             totalPosts,
//         });
//     } catch (error) {
//         next(error);
//     }
// };



export const deletepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has been deleted.');
    } catch (error) {
        next(error);
    }
};


export const updatepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image,
                }
            }, { new: true })

        res.status(200).json(updatedPost);

    } catch (error) {
        next(error);
    }
};