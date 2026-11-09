
/*
   Name: Michael Adams
   Date: 11/8/2026
   Assignment: Module 8
   Course: JavaScript
*/

"use strict";

// API containers
export const jokeContainer = document.getElementById("joke");
export const quoteContainer = document.getElementById("quote");

// Get random joke
export const getJoke = async () => {
    try {
        const response = await fetch(
            "https://v2.jokeapi.dev/joke/Any?safe-mode"
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error("The joke API returned an error.");
        }

        displayJoke(data);

    } catch (error) {
        console.error("Joke API Error:", error);

        jokeContainer.textContent =
            "The joke service is currently unavailable. Please try again.";
    }
};

// Display joke
export const displayJoke = (data) => {
    if (data.type === "twopart") {
        jokeContainer.textContent =
            `${data.setup} ${data.delivery}`;
    } else {
        jokeContainer.textContent = data.joke;
    }
};

// Get random quote
export const getQuote = async () => {
    try {
        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        displayQuote(data);

    } catch (error) {
        console.error("Quote API Error:", error);

        quoteContainer.textContent =
            "Unable to load a quote. Please try again.";
    }
};

// Display quote
export const displayQuote = (data) => {
    quoteContainer.textContent =
        `"${data.quote}" - ${data.author}`;
};
