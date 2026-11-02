/*
   Name: Michael Adams
   Date: 11/1/2026
   Assignment: Module 7
   Course: JavaScript
*/

"use strict";

// Course information
const totalModules = 10;
const enrolled = true;
const hoursPerWeek = 6;

// Course module objects
const courseModules = [
    { moduleName: "Module 1", hoursRequired: 6, topic: "JavaScript fundamentals" },
    { moduleName: "Module 2", hoursRequired: 6, topic: "Conditionals, arrays" },
    { moduleName: "Module 3", hoursRequired: 8, topic: "Functions, scope, loops" },
    { moduleName: "Module 4", hoursRequired: 5, topic: "DOM" },
    { moduleName: "Module 5", hoursRequired: 5, topic: "Debugging, error handling" },
    { moduleName: "Module 6", hoursRequired: 6, topic: "APIs" },
    { moduleName: "Module 7", hoursRequired: 7, topic: "Objects, iterators" },
    { moduleName: "Module 8", hoursRequired: 6, topic: "Modular JS, code organization, final project planning" },
    { moduleName: "Module 9", hoursRequired: 7, topic: "Modern tools, final project development" },
    { moduleName: "Module 10", hoursRequired: 10, topic: "Final project, deployment" }
];

// Completed modules
const completedModules = [
    "Module 1",
    "Module 2",
    "Module 3",
    "Module 4",
    "Module 5",
    "Module 6"
];

// Display all modules
const displayModules = (modules) => {

    const list = document.createElement("ul");

    for (let i = 0; i < modules.length; i++) {

        const listItem = document.createElement("li");

        listItem.textContent = modules[i].moduleName;

        list.appendChild(listItem);
    }

    return list;
};

// Display remaining modules
const displayRemainingModules = remainingModules => {

    const remainingList = document.getElementById("remainingModulesList");

    remainingList.innerHTML = "";

    remainingList.appendChild(displayModules(remainingModules));

};

// Display dashboard
const displayDashboard = (
    totalStudyHours,
    remainingHours,
    remainingModules
) => {

    document.getElementById("dashboard").innerHTML = `
        <p><strong>Total Modules:</strong> ${totalModules}</p>

        <p><strong>Enrolled:</strong> ${enrolled ? "Yes" : "No"}</p>

        <p><strong>Hours Per Week:</strong> ${hoursPerWeek}</p>

        <p><strong>Total Study Hours:</strong> ${totalStudyHours}</p>

        <p><strong>Remaining Study Hours:</strong> ${remainingHours}</p>
    `;

    displayRemainingModules(remainingModules);

};

// Generate dashboard
const generateDashboard = () => {

    // Calculate total study hours
    const totalStudyHours = courseModules.reduce(
        (total, module) => total + module.hoursRequired,
        0
    );

    // Use map() to create module names
    const moduleNames = courseModules.map(
        module => module.moduleName
    );

    // Use filter() to find remaining modules
    const remainingModules = courseModules.filter(
        module => !completedModules.includes(module.moduleName)
    );

    // Use reduce() to calculate remaining hours
    const remainingHours = remainingModules.reduce(
        (total, module) => total + module.hoursRequired,
        0
    );

    // Console logs
    console.log("Module Names:", moduleNames);

    console.log("Remaining Modules:", remainingModules);

    console.log("Remaining Hours:", remainingHours);

    console.log("Total Study Hours:", totalStudyHours);

    // Display all modules
    document.getElementById("allModulesList").innerHTML = "";

    document.getElementById("allModulesList")
        .appendChild(displayModules(courseModules));

    // Display dashboard
    displayDashboard(
        totalStudyHours,
        remainingHours,
        remainingModules
    );

};

// Random joke API
const getJoke = async () => {

    try {

        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        if (!response.ok) {
            throw new Error("Unable to retrieve joke.");
        }

        const data = await response.json();

        document.getElementById("joke").textContent =
            `${data.setup} ${data.punchline}`;

    } catch (error) {

        console.error("Joke API Error:", error);

        document.getElementById("joke").textContent =
            "Unable to load a joke.";

    }

};

// Random quote API
const getQuote = async () => {

    try {

        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        if (!response.ok) {
            throw new Error("Unable to retrieve quote.");
        }

        const data = await response.json();

        document.getElementById("quote").textContent =
            `"${data.quote}" - ${data.author}`;

    } catch (error) {

        console.error("Quote API Error:", error);

        document.getElementById("quote").textContent =
            "Unable to load a quote.";

    }

};

// Event listeners
document.getElementById("jokeButton").addEventListener(
    "click",
    getJoke
);

document.getElementById("quoteButton").addEventListener(
    "click",
    getQuote
);

// Initialize application
generateDashboard();

getJoke();

getQuote();