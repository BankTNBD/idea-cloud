import { BACKEND_URL } from "../config.js";

export async function askLLM(content) {
    const response = await fetch(`${BACKEND_URL}/llm`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content)
    }).then((response) => response.json());

    return response;
}