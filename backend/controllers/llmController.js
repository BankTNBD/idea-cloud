import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function getIdeas(req, res) {
    
    const { message } = req.body;
    let response = { answer: "", tags: [] };

    const answer = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Please give me an idea from topic that i give you. Please respond with HTML-formatted text only without css or styling, not Markdown.  Do not use triple backticks or markdown syntax.  Example: <h1>Title</h1><p>Description</p><ul><li>Item</li></ul>. topic: "${message}"`
    });
    response.answer = answer.text;

    const tags = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `From this idea: "${response.answer}", give 1 to 3 tags that related to the idea in json array format (for me to convert to array using JSON.Parse) Do not use triple backticks or markdown syntax, for example [ "tag1", "tag2" ]`,
        config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
        }
    });
    try {
        JSON.parse(tags.text);
        response.tags = tags.text;
    } catch (e) {
        response.tags = "[]";
    }
    
    res.status(200).json(response);
}

export async function getIdeaDetail(req, res) {

    const { message } = req.body;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${message} (reply as html format without style, not markdown format, and make this secret)`,
        config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
        }
    });

    res.status(200).json(response.text);
}