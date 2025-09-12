import Post from "../models/postModel.js";

export async function createPost(req, res) {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(200).json({ message: "OK" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error." });
    }
};

export async function getPosts(req, res) {
    const posts = await Post.find();

    res.status(200).json(posts);
}

export async function updateRating(req, res) {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        if (typeof rating !== "number") {
            return res.status(400).json({ error: "Rating must be a number" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { rating },
            { new: true } // return updated document
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

