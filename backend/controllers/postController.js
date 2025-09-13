import Post from "../models/postModel.js";

// Validate post data
function validatePostData(data) {
    if (!data.title || typeof data.title !== "string") return false;
    if (data.likes !== undefined && typeof data.likes !== "number") return false;
    if (data.dislikes !== undefined && typeof data.dislikes !== "number") return false;
    return true;
}

export async function createPost(req, res) {
    try {
        if (!validatePostData(req.body)) {
            return res.status(400).json({ error: "Invalid post data." });
        }
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(200).json({ message: "OK" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function getPosts(req, res) {
    try {
        const sort = req.query.sort || "";
        const tag = req.query.tag || "";
        let sortOption = {};

        if (sort === "likes" || sort === "popular") sortOption = { likes: -1 };
        else if (sort === "dislikes") sortOption = { dislikes: -1 };
        else if (sort === "title") sortOption = { title: 1 };
        else if (sort === "date" || sort === "created_at") sortOption = { created_at: -1 };

        let filter = {};
        if (tag) {
            filter.tags = { $regex: tag, $options: "i" };
        }

        const posts = await Post.find(filter).sort(sortOption);
        res.status(200).json(posts);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function updateRating(req, res) {
    try {
        const { id } = req.params;
        let { likes = 0, dislikes = 0 } = req.body; // default to 0 if not provided
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                $inc: { likes: likes, dislikes: dislikes } // increment instead of replace
            },
            { new: true } // return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(updatedPost);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function deletePost(req, res) {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error." });
    }
}