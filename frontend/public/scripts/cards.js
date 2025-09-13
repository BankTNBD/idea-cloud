import { readPost, updateRating, deletePost } from "./api/content.js";
import { askLLMMore } from "./api/llm.js";

let posts = [];

export async function initializeCards(sortBy = "", tag = "") {
    posts = await readPost(undefined, sortBy, tag);
    const cardGrid = document.getElementById("grid");
    cardGrid.innerHTML = "";
    posts.forEach((cardData) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = cardData._id;
        const cardHeader = document.createElement("p");
        cardHeader.className = "card-header";
        cardHeader.textContent = cardData.title;
        card.appendChild(cardHeader);
        const cardDescription = document.createElement("p");
        cardDescription.className = "card-description";
        cardDescription.innerHTML = cardData.description;   
        card.appendChild(cardDescription);
        const cardGenerator = document.createElement("p");
        cardGenerator.className = "card-generator";
        cardGenerator.innerHTML = `Author: ${cardData.generator}`;
        card.appendChild(cardGenerator);
        const cardTags = document.createElement("div");
        cardTags.className = "tags";
        try {
            JSON.parse(cardData.tags).forEach((tag) => {
                const cardTag = document.createElement("span");
                cardTag.className = "tag";
                cardTag.textContent = tag;
                cardTags.appendChild(cardTag);
            });
        } catch (e) {
            // fallback if tags are not JSON
        }
        card.appendChild(cardTags);
        const cardRating = document.createElement("div");
        cardRating.className = "rating";
        cardRating.innerHTML = `⭐️ <span>${cardData.rating}</span>`;
        card.appendChild(cardRating);
        // Prefer/Not Prefer buttons
        const cardActions = document.createElement("div");
        cardActions.className = "card-actions";
        const preferBtn = document.createElement("button");
        preferBtn.className = "prefer-btn";
        preferBtn.textContent = "👍🏻 Like";
        const notPreferBtn = document.createElement("button");
        notPreferBtn.className = "not-prefer-btn";
        notPreferBtn.textContent = "👎🏻 Dislike";
        // Share button
        const shareBtn = document.createElement("button");
        shareBtn.className = "share-btn";
        shareBtn.textContent = "🔗 Copy";
        cardActions.appendChild(preferBtn);
        cardActions.appendChild(notPreferBtn);
        cardActions.appendChild(shareBtn);
        card.appendChild(cardActions);
        preferBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const newRating = cardData.rating + 1;
            try {
                await updateRating(card.dataset.id, newRating);
                cardData.rating = newRating;
                cardRating.innerHTML = `⭐️ <span>${cardData.rating}</span>`;
            } catch (err) {
                alert("Failed to update rating");
            }
        });
        notPreferBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const newRating = cardData.rating - 1;
            if (newRating < 0) {
                try {
                    await deletePost(card.dataset.id);
                    card.remove();
                } catch (err) {
                    alert("Failed to delete post");
                }
            } else {
                try {
                    await updateRating(card.dataset.id, newRating);
                    cardData.rating = newRating;
                    cardRating.innerHTML = `⭐️ <span>${cardData.rating}</span>`;
                } catch (err) {
                    alert("Failed to update rating");
                }
            }
        });
        // Ask AI section
        const aiSection = document.createElement("div");
        aiSection.className = "ai-section";
        const aiInput = document.createElement("input");
        aiInput.type = "text";
        aiInput.placeholder = "Ask AI more about this idea...";
        aiInput.className = "ai-input";
        const aiBtn = document.createElement("button");
        aiBtn.textContent = "Ask AI";
        aiBtn.className = "ai-btn";
        const aiAnswer = document.createElement("div");
        aiAnswer.className = "ai-answer";
        aiSection.appendChild(aiInput);
        aiSection.appendChild(aiBtn);
        aiSection.appendChild(aiAnswer);
        card.appendChild(aiSection);
        aiBtn.addEventListener("click", async () => {
            aiBtn.disabled = true;
            aiAnswer.textContent = "Thinking...";
            try {
                const question = aiInput.value;
                const context = cardData.title + cardData.description;
                const llm = await askLLMMore({ message: question + "\nContext: " + context });
                aiAnswer.innerHTML = llm;
            } catch (err) {
                aiAnswer.textContent = "AI error. Please try again.";
            } finally {
                aiBtn.disabled = false;
            }
        });
        shareBtn.addEventListener("click", async () => {
            // Get plain text for title and description
            const titleText = cardHeader.textContent;
            const descText = cardDescription.textContent;
            let tagsText = "";
            try {
                tagsText = JSON.parse(cardData.tags).join(", ");
            } catch (e) {
                tagsText = cardData.tags;
            }
            const shareText = `Idea: ${titleText}\nDescription: ${descText}\nTags: ${tagsText}`;
            try {
                await navigator.clipboard.writeText(shareText);
                shareBtn.textContent = "✅ Copied!";
                setTimeout(() => { shareBtn.textContent = "🔗 Copy"; }, 1500);
            } catch (err) {
                alert("Failed to copy to clipboard");
            }
        });
        cardGrid.appendChild(card);
    });
}

// Handle sort dropdown
const sortSelect = document.getElementById("sort-select");
if (sortSelect) {
    sortSelect.addEventListener("change", async (e) => {
        await initializeCards(e.target.value);
    });
}
// Handle tag search
const tagSearchBtn = document.getElementById("tagSearchButton");
const tagSearchInput = document.getElementById("tagSearchInput");
if (tagSearchBtn && tagSearchInput) {
    tagSearchBtn.addEventListener("click", async () => {
        await initializeCards(undefined, tagSearchInput.value.trim());
    });
}