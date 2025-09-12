import { BACKEND_URL } from "../config.js";

export async function createPost(post) {
    await fetch(`${BACKEND_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
}

export async function readPost(id) {
    const posts = await fetch(`${BACKEND_URL}/posts/${id || ""}`).then(res => res.json());
    return posts;
}

export async function updatePost() {
    // Implement function to call api for update posts
}

export async function updateRating(id, rating) {
    await fetch(`${BACKEND_URL}/posts/${id}/rating`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: rating }),
    });
}

export async function deletePost(id) {
    // Implement function to call api for delete posts
    await fetch(`${BACKEND_URL}/posts/${id}`, {
        method: "DELETE"
    });
}