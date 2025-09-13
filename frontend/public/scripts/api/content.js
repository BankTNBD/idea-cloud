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

export async function readPost(id, sortBy = "", tag = "") {
    let url = `${BACKEND_URL}/posts`;
    if (id) url += `/${id}`;
    const params = [];
    if (sortBy) params.push(`sort=${sortBy}`);
    if (tag) params.push(`tag=${encodeURIComponent(tag)}`);
    if (params.length > 0) url += `?${params.join("&")}`;
    const posts = await fetch(url).then(res => res.json());
    return posts;
}

export async function updatePost() {
    // Implement function to call api for update posts
}

export async function updateRating(id, rating) {
    const response = await fetch(`${BACKEND_URL}/posts/${id}/rating`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rating),
    }).then((res) => res.json());
    return response;
}

export async function deletePost(id) {
    // Implement function to call api for delete posts
    await fetch(`${BACKEND_URL}/posts/${id}`, {
        method: "DELETE"
    });
}