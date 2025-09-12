import { readPost, updateRating, deletePost } from "./api/content.js";

let posts = [];

export async function initializeCards() {
    posts = await readPost();

    const cardGrid = document.getElementById("grid");
    cardGrid.innerHTML = "";

    posts.map((cardData) => {
        const card = document.createElement("div");
        card.className = "card";

        // store the MongoDB ID
        card.dataset.id = cardData._id;

        const cardHeader = document.createElement("p");
        const cardDescription = document.createElement("p");
        const cardTags = document.createElement("div");
        const cardRating = document.createElement("div");

        
        cardHeader.className = "card-header";
        cardHeader.innerHTML = cardData.title;
        card.appendChild(cardHeader);

        cardDescription.className = "card-description";
        cardDescription.innerHTML = cardData.description;
        card.appendChild(cardDescription);

        cardTags.className = "tags";
        JSON.parse(cardData.tags).map((tag) => {
            const cardTag = document.createElement("span");
            cardTag.className = "tag";
            cardTag.innerHTML = tag;
            cardTags.appendChild(cardTag);
        });
        card.appendChild(cardTags);

        cardRating.className = "rating";
        cardRating.innerHTML = `⭐️ <span>${cardData.rating}</span>`;
        card.appendChild(cardRating);

        // Add Prefer/Not Prefer buttons
        const cardActions = document.createElement("div");
        cardActions.className = "card-actions";
        const preferBtn = document.createElement("button");
        preferBtn.className = "prefer-btn";
        preferBtn.innerText = "Prefer";
        const notPreferBtn = document.createElement("button");
        notPreferBtn.className = "not-prefer-btn";
        notPreferBtn.innerText = "Not Prefer";
        cardActions.appendChild(preferBtn);
        cardActions.appendChild(notPreferBtn);
        card.appendChild(cardActions);

        preferBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const newRating = cardData.rating + 1;
            await updateRating(card.dataset.id, newRating);
            cardData.rating = newRating;
            cardRating.innerHTML = `⭐️ <span>${cardData.rating}</span>`;
        });
        notPreferBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const newRating = cardData.rating - 1;
            if (newRating < 0) {
                await deletePost(card.dataset.id);
                card.remove();
            } else {
                await updateRating(card.dataset.id, newRating);
                cardData.rating = newRating;
                cardRating.innerHTML = `⭐️ <span>${cardData.rating}</span>`;
            }
        });

        cardGrid.appendChild(card);
    });
}