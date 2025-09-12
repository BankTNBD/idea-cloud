import { LLM_URL, LLM_MODEL } from "../config.js";

const LLM_API_KEY = process.env.LLM_API_KEY;

export async function getIdeas(req, res) {
    
    const { message } = req.body;
    let response = { answer: "", tags: [] };
    const answer = await fetch(`${LLM_URL}/chat/completions`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${LLM_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": LLM_MODEL,
            "messages": [
                {
                    "role": "user",
                    "content": `Please give me an idea from topic that i give you. Please respond with HTML-formatted text only without css or styling, not Markdown.  Do not use triple backticks or markdown syntax.  Example: <h1>Title</h1><p>Description</p><ul><li>Item</li></ul>. topic: "${message}"`
                }
            ]
        })
    }).then((response) => response.json());
    response.answer = answer.choices[0].message.content;

    const tags = await fetch(`${LLM_URL}/chat/completions`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${LLM_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": LLM_MODEL,
            "messages": [
                {
                    "role": "user",
                    "content": `From this idea: "${response.answer}", give 1 to 3 tags that related to the idea in json array format (for me to convert to array using JSON.Parse) Do not use triple backticks or markdown syntax, for example [ "tag1", "tag2" ]`
                }
            ]
        })
    }).then((response) => response.json());
    try {
        JSON.parse(tags.choices[0].message.content);
        response.tags = tags.choices[0].message.content;
    } catch (e) {
        response.tags = "[]";
    }
    
    res.status(200).json(response);
}   