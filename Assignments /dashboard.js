
/*
   Name: Michael Adams
   Date: 11/8/2026
   Assignment: Module 8
   Course: JavaScript
*/

"use strict";

import {
    totalModules,
    enrolled,
    hoursPerWeek,
    courseModules,
    completedModules
} from "./data.js";

import {
    calculatePercentComplete,
    calculateStudyHours,
    getCourseGrade,
    getCourseProgress,
    getStudyPlan
} from "./calculations.js";

// Reset dashboard
export const resetDashboard = (
    studentNameInput,
    completedModulesInput,
    studyDayInput,
    output
) => {
    studentNameInput.value = "";
    completedModulesInput.value = completedModules.length;
    studyDayInput.value = "";
    output.textContent = "";

    const remainingModules = courseModules.filter(
        module => !completedModules.includes(module.moduleName)
    );

    const remainingHours = remainingModules.reduce(
        (total, module) => total + module.hoursRequired,
        0
    );

    displayDashboard(
        document.getElementById("dashboard"),
        document.getElementById("remainingModulesList"),
        calculateStudyHours(),
        remainingHours,
        remainingModules,
        completedModules.length
    );
};

// Display all modules
export const displayModules = (modules) => {
    const list = document.createElement("ul");

    for (let i = 0; i < modules.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = modules[i].moduleName;
        list.appendChild(listItem);
    }

    return list;
};

// Display remaining modules
export const displayRemainingModules = (
    remainingModules,
    remainingModulesList
) => {
    remainingModulesList.innerHTML = "";
    remainingModulesList.appendChild(displayModules(remainingModules));
};

// Apply dashboard color
export const applyDashboardColor = (
    dashboard,
    percentComplete
) => {
    if (percentComplete >= 75) {
        dashboard.style.backgroundColor = "#d4edda";
    } else if (percentComplete >= 50) {
        dashboard.style.backgroundColor = "#fff3cd";
    } else {
        dashboard.style.backgroundColor = "#f8d7da";
    }
};

// Display dashboard
export const displayDashboard = (
    dashboard,
    remainingModulesList,
    totalStudyHours,
    remainingHours,
    remainingModules,
    completedCount
) => {
    const percentComplete = calculatePercentComplete(completedCount);
    const courseGrade = getCourseGrade(percentComplete);
    const courseProgress = getCourseProgress(completedCount);
    const studyPlan = getStudyPlan(remainingHours);

    dashboard.innerHTML = `
        <p><strong>Total Modules:</strong> ${totalModules}</p>
        <p><strong>Enrolled:</strong> ${enrolled ? "Yes" : "No"}</p>
        <p><strong>Hours Per Week:</strong> ${hoursPerWeek}</p>
        <p><strong>Total Study Hours:</strong> ${totalStudyHours}</p>
        <p><strong>Remaining Study Hours:</strong> ${remainingHours}</p>
        <p><strong>Course Progress:</strong> ${courseProgress}</p>
        <p><strong>Percentage Complete:</strong> ${percentComplete.toFixed(1)}%</p>
        <p><strong>Progress Grade:</strong> ${courseGrade}</p>
        <p><strong>Estimated Weeks Remaining:</strong> ${studyPlan}</p>
    `;

    applyDashboardColor(dashboard, percentComplete);

    displayRemainingModules(
        remainingModules,
        remainingModulesList
    );
};
