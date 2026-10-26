
"use strict";

const jokeContainer = document.getElementById("jokeContainer");
const quoteContainer = document.getElementById("quoteContainer");

const getJoke = async () => {
    const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
    );

    if (!response.ok) {
        throw new Error("Joke API request failed: " + response.status);
    }

    return await response.json();
};

const displayJoke = async () => {
    jokeContainer.textContent = "Loading joke...";

    try {
        const joke = await getJoke();
        jokeContainer.innerHTML = `
            <p>${joke.setup}</p>
            <p>${joke.punchline}</p>
        `;
    } catch (error) {
        jokeContainer.textContent = "Could not load joke.";
        console.error("Joke error:", error);
    }
};

const getQuote = async () => {
    const response = await fetch(
        "https://dummyjson.com/quotes/random"
    );

    if (!response.ok) {
        throw new Error("Quote API request failed: " + response.status);
    }

    return await response.json();
};

const displayQuote = async () => {
    quoteContainer.textContent = "Loading quote...";

    try {
        const quote = await getQuote();
        quoteContainer.innerHTML = `
            <p>"${quote.quote}"</p>
            <p>— ${quote.author}</p>
        `;
    } catch (error) {
        quoteContainer.textContent = "Could not load quote.";
        console.error("Quote error:", error);
    }
};

displayJoke();
displayQuote();
