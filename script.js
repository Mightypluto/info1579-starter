/*
   Name: Michael Adams
   Date: 9/27/2026
   Assignment: #2
   Quarter: 1
   Instructor: Lisa
*/

"use strict";

// DO NOT MODIFY
const display = (label, value) =>
  (document.getElementById("output").innerHTML += `${label}: ${value}<br>`);
// END DO NOT MODIFY


// ADD YOUR CODE BELOW


// Part 0: Arrays
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

const completedModules = [
  "Module 1",
  "Module 2",
  "Module 3"
];


// Module 1 variables
const name = "Mikey";
const totalModules = 10;
const isEnrolled = true;


// Welcome message
const welcomeMessage = `Welcome to the course, ${name}!`;


// Part 1: Percent Complete

function calculatePercentComplete(completed, total) {
  return (completed / total) * 100;
}

const percentComplete = calculatePercentComplete(
  completedModules.length,
  courseModules.length
);

const percentRemaining = 100 - percentComplete;


// Part 2: Study Hours

function calculateStudyHours(modules, hoursPerModule = 6) {
  return modules * hoursPerModule;
}

const totalStudyHours = calculateStudyHours(courseModules.length);


// Calculate daily study hours and minutes
const hoursPerWeek = 6;
const dailyStudyHours = hoursPerWeek / 7;
const dailyStudyMinutes = dailyStudyHours * 60;


// Give yourself a rest day
const adjustedDailyHours = hoursPerWeek / 6;
const adjustedDailyMinutes = adjustedDailyHours * 60;


// Part 3: Display course progress and course grade

const getCourseProgress = function (percentRemaining) {
  if (percentRemaining === 0) {
    return "Current Progress: Finished!";
  } else if (percentRemaining >= 1 && percentRemaining <= 24.99) {
    return "Current Progress: Almost Finished!";
  } else if (percentRemaining >= 25 && percentRemaining <= 74.99) {
    return "Current Progress: Making Progress";
  } else if (percentRemaining >= 75 && percentRemaining <= 100) {
    return "Current Progress: Just Getting Started";
  }
};


const getCourseGrade = (percentComplete) => {
  if (percentComplete >= 90) {
    return "A";
  } else if (percentComplete >= 80) {
    return "B";
  } else if (percentComplete >= 70) {
    return "C";
  } else if (percentComplete >= 60) {
    return "D";
  } else {
    return "F";
  }
};


// Part 4: Display all course modules

const displayModules = (modules) => {
  for (let i = 0; i < modules.length; i++) {
    display(`Module ${i + 1}`, modules[i]);
  }
};


// Part 5: Display completed modules

const displayCompletedModules = (...modules) => {
  return modules.join(", ");
};

const completedModulesList = displayCompletedModules(...completedModules);


// Part 6: Refactor switch statement

const getStudyPlan = (studyDay) => {
  let studyPlan;

  switch (studyDay) {
    case "Monday":
      studyPlan = `Study for ${dailyStudyMinutes.toFixed(2)} minutes today.`;
      break;

    case "Tuesday":
      studyPlan = "Today is your rest day.";
      break;

    case "Wednesday":
      studyPlan = `Lab day: Study for ${dailyStudyMinutes.toFixed(2)} minutes today.`;
      break;

    case "Thursday":
      studyPlan = `Applied Programming Activity: Study for ${dailyStudyMinutes.toFixed(2)} minutes today.`;
      break;

    case "Friday":
      studyPlan = "Open study day.";
      break;

    case "Saturday":
      studyPlan = "Open study day.";
      break;

    case "Sunday":
      studyPlan = "Open study day.";
      break;

    case "Complete":
      studyPlan = "Course Completed!";
      break;

    default:
      studyPlan = "Invalid day.";
      break;
  }

  return studyPlan;
};


// Ask for study day
let studyDay;

if (percentRemaining === 0) {
  studyDay = "Complete";
} else {
  studyDay = prompt("Enter your study day (Monday-Sunday): ");
}


// DISPLAY RESULTS

display("Welcome Message", welcomeMessage);
display("My Name", name);
display("Enrolled", isEnrolled);
display("Total Modules", totalModules);

displayModules(courseModules);

display("Completed Modules", completedModulesList);

display("Total Study Hours", totalStudyHours);
display("Daily Study Hours (7 days)", dailyStudyHours.toFixed(2));
display("Daily Study Minutes (7 days)", dailyStudyMinutes.toFixed(2));

display(
  "Daily Study Hours (with rest day)",
  adjustedDailyHours.toFixed(2)
);

display(
  "Daily Study Minutes (with rest day)",
  adjustedDailyMinutes.toFixed(2)
);

display("Percent Complete", percentComplete.toFixed(2) + "%");
display("Percent Remaining", percentRemaining.toFixed(2) + "%");

display("Course Progress", getCourseProgress(percentRemaining));
display("Course Grade", getCourseGrade(percentComplete));
display("Study Day", studyDay);
display("Study Plan", getStudyPlan(studyDay));