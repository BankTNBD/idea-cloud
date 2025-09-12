import { createPost } from "./api/content.js";
import { askLLM } from "./api/llm.js";
import { initializeCards } from "./cards.js";

// document
//     .getElementById("sort-select")
//     .addEventListener("change", (e) => {
//         console.log("selected:", e.target.value);
//     });


const sampleCards = [
    {
        title: "Test Title",
        description: "Test Description",
        tags: ["tags1", "tags2"],
        rating: 5
    },
    {
        title: "Test Title",
        description: "Test Description",
        tags: ["tags1", "tags2"],
        rating: 5
    },
    {
        title: "Test Title",
        description: "Test Description",
        tags: ["tags1", "tags2"],
        rating: 5
    },
]


initializeCards();

// Generate idea
const generateBtn = document.getElementById("generateIdeaButton");
const ideaInput = document.getElementById("ideaInput");
const preCard = document.getElementById("pre-card");
const preCardHeader = document.getElementById("pre-card-header");
const preCardDescription = document.getElementById("pre-card-description");
const preCardTags = document.getElementById("pre-card-tags");
const preCardDeleteButton = document.getElementById("pre-card-delete-button");
const preCardAddButton = document.getElementById("pre-card-add-button");
let post = {};

generateBtn.addEventListener("click", async (e) => {
    const idea = ideaInput.value;
    if (!idea) {    
        return;
    }
    generateBtn.disabled = true;
    preCard.style.display = "block";
    preCardHeader.innerHTML = idea;
    preCardDescription.innerHTML = "Generating...";
    preCardTags.innerHTML = "";
    try {
        const llm = await askLLM({ message: idea });
        preCardDescription.innerHTML = llm.answer;
        preCardTags.innerHTML = "";
        JSON.parse(llm.tags).forEach(tag => {
            const tagSpan = document.createElement("span");
            tagSpan.className = "tag";
            tagSpan.innerHTML = tag;
            preCardTags.appendChild(tagSpan);
        });

        post = {
            title: idea,
            description: llm.answer,
            tags: llm.tags,
            rating: 0,
        }
    } catch (err) {
        preCardDescription.innerHTML = "Error generating idea. Please try again.";
        console.log(err)
    } finally {
        generateBtn.disabled = false;
    }
});

preCardDeleteButton.addEventListener("click", async (e) => {
    preCard.style.display = "none";
})

preCardAddButton.addEventListener("click", async (e) => {
    await createPost(post);
    post = {};
    preCard.style.display = "none";
    await initializeCards();
})

