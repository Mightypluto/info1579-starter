
/*
   Name: Michael Adams
   Date: 11/8/2026
   Assignment: Module 8
   Course: JavaScript
*/

"use strict";

// Import course data
import {
    courseModules,
    completedModules
} from "./data.js";

// Import calculations
import {
    calculateStudyHours
} from "./calculations.js";

// Import validators
import {
    validateInput,
    runUnitTests
} from "./validators.js";

// Import dashboard functions
import {
    resetDashboard,
    displayModules,
    displayDashboard
} from "./dashboard.js";

// Import API functions
import {
    getJoke,
    getQuote
} from "./api.js";

// Get HTML elements
const dashboard = document.getElementById("dashboard");
const allModulesList = document.getElementById("allModulesList");
const remainingModulesList = document.getElementById("remainingModulesList");

const studentNameInput = document.getElementById("studentName");
const completedModulesInput = document.getElementById("completedModules");
const studyDayInput = document.getElementById("studyDay");
const output = document.getElementById("output");

const dashboardForm = document.getElementById("dashboardForm");
const resetButton = document.getElementById("resetButton");

// Generate dashboard
const generateDashboard = (completedCount) => {
    const totalStudyHours = calculateStudyHours();

    // Get completed module names
    const completedModuleNames = courseModules
        .slice(0, completedCount)
        .map(module => module.moduleName);

    // Use map() to create module names
    const moduleNames = courseModules.map(
        module => module.moduleName
    );

    // Use filter() to create remaining modules
    const remainingModules = courseModules.filter(
        module => !completedModuleNames.includes(module.moduleName)
    );

    // Use reduce() to calculate remaining study hours
    const remainingHours = remainingModules.reduce(
        (total, module) => total + module.hoursRequired,
        0
    );

    // Console logs
    console.log("Module Names:", moduleNames);
    console.log("Completed Modules:", completedModuleNames);
    console.log("Remaining Modules:", remainingModules);
    console.log("Remaining Hours:", remainingHours);
    console.log("Total Study Hours:", totalStudyHours);

    // Display all modules
    allModulesList.innerHTML = "";
    allModulesList.appendChild(displayModules(courseModules));

    // Display dashboard
    displayDashboard(
        dashboard,
        remainingModulesList,
        totalStudyHours,
        remainingHours,
        remainingModules,
        completedCount
    );
};

// Handle form submission
dashboardForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
        validateInput(
            studentNameInput,
            completedModulesInput,
            studyDayInput,
            output
        )
    ) {
        const completedCount = Number(completedModulesInput.value);

        generateDashboard(completedCount);

        output.textContent =
            `Dashboard updated for ${studentNameInput.value.trim()}. Preferred study day: ${studyDayInput.value.trim()}.`;
    }
});

// Reset button
resetButton.addEventListener("click", () =>
    resetDashboard(studentNameInput, completedModulesInput, studyDayInput, output)
);

// Joke button
document.getElementById("jokeButton").addEventListener("click", getJoke);

// Quote button
document.getElementById("quoteButton").addEventListener("click", getQuote);

// Run unit tests
runUnitTests();

// Initialize application
generateDashboard(completedModules.length);
getJoke();
getQuote();
