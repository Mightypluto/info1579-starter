/*
   Name: Michael Adams
   Date: 9/27/2026
   Assignment: #2
   Quarter: 1
   Instructor: Lisa
*/


"use strict";

// Course modules
const courseModules = [
    "Module 1",
    "Module 2",
    "Module 3",
    "Module 4",
    "Module 5",
    "Module 6",
    "Module 7",
    "Module 8",
    "Module 9",
    "Module 10"
];

// Capture DOM elements
const studentNameInput = document.getElementById("studentName");
const completedModulesInput = document.getElementById("completedModules");
const studyDayInput = document.getElementById("studyDay");
const generateButton = document.getElementById("generateButton");
const resetButton = document.getElementById("resetButton");
const output = document.getElementById("output");

// Calculate course grade
const getCourseGrade = (percentComplete) => {
    if (percentComplete >= 90) return "A";
    if (percentComplete >= 80) return "B";
    if (percentComplete >= 70) return "C";
    if (percentComplete >= 60) return "D";
    return "F";
};

// Calculate course progress
const getCourseProgress = (percentComplete) => {
    if (percentComplete >= 75) return "On Track";
    if (percentComplete >= 25) return "Making Progress";
    return "Getting Started";
};

// Get the study plan
const getStudyPlan = (studyDay) => {
    const plans = {
        Monday: "Review notes and plan your weekly goals.",
        Tuesday: "Study a new module and take notes.",
        Wednesday: "Practice concepts from previous modules.",
        Thursday: "Complete exercises and review difficult topics.",
        Friday: "Review your progress and practice key concepts.",
        Saturday: "Catch up on unfinished modules.",
        Sunday: "Review the week and prepare for next week."
    };

    return plans[studyDay];
};

// Display a list of modules
const displayModules = (modules) => {
    const list = document.createElement("ul");

    for (let i = 0; i < modules.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = modules[i];
        list.appendChild(listItem);
    }

    return list;
};

// Display remaining modules
const displayRemainingModules = (completedModules) => {
    const remainingModules = courseModules.slice(completedModules);
    const remainingModulesList =
        document.getElementById("remainingModulesList");

    remainingModulesList.replaceChildren(
        displayModules(remainingModules)
    );

    if (remainingModules.length === 0) {
        remainingModulesList.textContent =
            "Congratulations! All modules are complete.";
    }
};

// Apply dashboard background color
const applyDashboardColor = (percentComplete) => {
    if (percentComplete >= 75) {
        output.style.backgroundColor = "#d4edda";
    } else if (percentComplete >= 25) {
        output.style.backgroundColor = "#fff3cd";
    } else {
        output.style.backgroundColor = "#f8d7da";
    }
};

// Generate dashboard
const generateDashboard = () => {
    const studentName = studentNameInput.value.trim() || "Student";

    let completedModules = Number(completedModulesInput.value);

    // Keep the entered number within the valid range
    completedModules = Math.max(
        0,
        Math.min(courseModules.length, completedModules || 0)
    );

    completedModulesInput.value = completedModules;

    const studyDay = studyDayInput.value;

    const totalStudyHours = courseModules.length * 2;
    const percentComplete =
        (completedModules / courseModules.length) * 100;
    const percentRemaining = 100 - percentComplete;

    const dailyStudyHours = 2;
    const dailyStudyMinutes = dailyStudyHours * 60;

    const grade = getCourseGrade(percentComplete);
    const progress = getCourseProgress(percentComplete);
    const studyPlan = getStudyPlan(studyDay);

    displayDashboard(
        studentName,
        completedModules,
        totalStudyHours,
        percentComplete,
        percentRemaining,
        grade,
        progress,
        studyDay,
        studyPlan,
        dailyStudyHours,
        dailyStudyMinutes
    );

    // Create the remainingModulesList before using it
    displayRemainingModules(completedModules);

    applyDashboardColor(percentComplete);
};

// Display dashboard summary
const displayDashboard = (
    studentName,
    completedModules,
    totalStudyHours,
    percentComplete,
    percentRemaining,
    grade,
    progress,
    studyDay,
    studyPlan,
    dailyStudyHours,
    dailyStudyMinutes
) => {
    output.innerHTML = `
        <div class="dashboard-card">
            <h2>My Study Dashboard</h2>

            <p><strong>Name:</strong> ${studentName}</p>
            <p><strong>Total Modules:</strong> ${courseModules.length}</p>
            <p><strong>Completed Modules:</strong> ${completedModules}</p>
            <p><strong>Total Study Hours:</strong> ${totalStudyHours}</p>
            <p><strong>Percent Complete:</strong> ${percentComplete.toFixed(0)}%</p>
            <p><strong>Percent Remaining:</strong> ${percentRemaining.toFixed(0)}%</p>
            <p><strong>Current Grade:</strong> ${grade}</p>
            <p><strong>Progress Status:</strong> ${progress}</p>
            <p><strong>Study Day:</strong> ${studyDay}</p>
            <p><strong>Today's Plan:</strong> ${studyPlan}</p>
            <p><strong>Daily Study Goal:</strong>
                ${dailyStudyHours} hours (${dailyStudyMinutes} minutes)
            </p>

            <p><strong>Remaining Modules:</strong></p>
            <div id="remainingModulesList"></div>
        </div>
    `;
};

// Reset dashboard
const resetDashboard = () => {
    studentNameInput.value = "";
    completedModulesInput.value = 0;
    studyDayInput.selectedIndex = 0;
    output.innerHTML = "";
    output.style.backgroundColor = "";
};

// Handle button clicks
generateButton.addEventListener("click", generateDashboard);
resetButton.addEventListener("click", resetDashboard);
