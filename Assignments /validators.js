
/*
   Name: Michael Adams
   Date: 11/8/2026
   Assignment: Module 8
   Course: JavaScript
*/

"use strict";

import { getCourseGrade } from "./calculations.js";

// Validate input
export const validateInput = (
    studentNameInput,
    completedModulesInput,
    studyDayInput,
    output
) => {
    const studentName = studentNameInput.value.trim();
    const completedCount = Number(completedModulesInput.value);
    const studyDay = studyDayInput.value.trim();

    if (studentName === "") {
        output.textContent = "Please enter your name.";
        return false;
    }

    if (
        completedModulesInput.value === "" ||
        !Number.isInteger(completedCount) ||
        completedCount < 0 ||
        completedCount > 10
    ) {
        output.textContent = "Enter a number of completed modules from 0 to 10.";
        return false;
    }

    if (studyDay === "") {
        output.textContent = "Please enter your preferred study day.";
        return false;
    }

    return true;
};

// Run unit tests
export const runUnitTests = () => {
    console.log("Running Unit Tests...");

    console.assert(getCourseGrade(95) === "A", "Test A failed");
    console.assert(getCourseGrade(85) === "B", "Test B failed");
    console.assert(getCourseGrade(75) === "C", "Test C failed");
    console.assert(getCourseGrade(65) === "D", "Test D failed");
    console.assert(getCourseGrade(50) === "F", "Test F failed");

    console.log("Unit Tests Complete.");
};
