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


const completedModules = ["Module 1", "Module 2"];


// Module 1 variables
const name = "Mikey";
const totalModules = 10;
const isEnrolled = true;


// Welcome message
const welcomeMessage = `Welcome to the course, ${name}!`;


// Calculate total study hours
const hoursPerWeek = 6;
const totalStudyHours = totalModules * hoursPerWeek;


// Calculate daily study hours and minutes
const dailyStudyHours = hoursPerWeek / 7;
const dailyStudyMinutes = dailyStudyHours * 60;


// Give yourself a rest day
const adjustedDailyHours = hoursPerWeek / 6;
const adjustedDailyMinutes = adjustedDailyHours * 60;


// Part 1: What's my current progress?


const completedModuleCount = Number(
 prompt("Enter the number of completed modules (1-10): ")
);


let percentComplete = 0;
let percentRemaining = 100;
let courseProgress;


if (
 Number.isInteger(completedModuleCount) &&
 completedModuleCount >= 1 &&
 completedModuleCount <= totalModules
) {
 percentComplete = (completedModuleCount / totalModules) * 100;
 percentRemaining = 100 - percentComplete;


 if (percentRemaining === 0) {
   courseProgress = "Current Progress: Finished!";
 } else if (percentRemaining >= 1 && percentRemaining <= 24.99) {
   courseProgress = "Current Progress: Almost Finished!";
 } else if (percentRemaining >= 25 && percentRemaining <= 74.99) {
   courseProgress = "Current Progress: Making Progress";
 } else if (percentRemaining >= 75 && percentRemaining <= 100) {
   courseProgress = "Current Progress: Just Getting Started";
 }
} else {
 courseProgress = "Invalid entry.";
}


// Part 2: What's my grade?


let courseGrade;


if (completedModuleCount >= 1 && completedModuleCount <= totalModules) {
 if (percentComplete >= 90) {
   courseGrade = "A";
 } else if (percentComplete >= 80) {
   courseGrade = "B";
 } else if (percentComplete >= 70) {
   courseGrade = "C";
 } else if (percentComplete >= 60) {
   courseGrade = "D";
 } else {
   courseGrade = "F";
 }
} else {
 courseGrade = "Invalid entry.";
}


// Part 3: What does my study week look like?


let studyDay;
let studyPlan;


if (percentRemaining === 0) {
 studyDay = "Complete";
} else {
 studyDay = prompt(
   "Enter your study day (Monday-Sunday): "
 );
}


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


// DISPLAY RESULTS


display("Welcome Message", welcomeMessage);
display("My Name", name);
display("Enrolled", isEnrolled);
display("Total Modules", totalModules);
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


display("Course Progress", courseProgress);
display("Course Grade", courseGrade);
display("Study Day", studyDay);
display("Study Plan", studyPlan);
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


const completedModules = ["Module 1", "Module 2"];


// Module 1 variables
const name = "Mikey";
const totalModules = 10;
const isEnrolled = true;


// Welcome message
const welcomeMessage = `Welcome to the course, ${name}!`;


// Calculate total study hours
const hoursPerWeek = 6;
const totalStudyHours = totalModules * hoursPerWeek;


// Calculate daily study hours and minutes
const dailyStudyHours = hoursPerWeek / 7;
const dailyStudyMinutes = dailyStudyHours * 60;


// Give yourself a rest day
const adjustedDailyHours = hoursPerWeek / 6;
const adjustedDailyMinutes = adjustedDailyHours * 60;


// Part 1: What's my current progress?


const completedModuleCount = Number(
 prompt("Enter the number of completed modules (1-10): ")
);


let percentComplete = 0;
let percentRemaining = 100;
let courseProgress;


if (
 Number.isInteger(completedModuleCount) &&
 completedModuleCount >= 1 &&
 completedModuleCount <= totalModules
) {
 percentComplete = (completedModuleCount / totalModules) * 100;
 percentRemaining = 100 - percentComplete;


 if (percentRemaining === 0) {
   courseProgress = "Current Progress: Finished!";
 } else if (percentRemaining >= 1 && percentRemaining <= 24.99) {
   courseProgress = "Current Progress: Almost Finished!";
 } else if (percentRemaining >= 25 && percentRemaining <= 74.99) {
   courseProgress = "Current Progress: Making Progress";
 } else if (percentRemaining >= 75 && percentRemaining <= 100) {
   courseProgress = "Current Progress: Just Getting Started";
 }
} else {
 courseProgress = "Invalid entry.";
}


// Part 2: What's my grade?


let courseGrade;


if (completedModuleCount >= 1 && completedModuleCount <= totalModules) {
 if (percentComplete >= 90) {
   courseGrade = "A";
 } else if (percentComplete >= 80) {
   courseGrade = "B";
 } else if (percentComplete >= 70) {
   courseGrade = "C";
 } else if (percentComplete >= 60) {
   courseGrade = "D";
 } else {
   courseGrade = "F";
 }
} else {
 courseGrade = "Invalid entry.";
}


// Part 3: What does my study week look like?


let studyDay;
let studyPlan;


if (percentRemaining === 0) {
 studyDay = "Complete";
} else {
 studyDay = prompt(
   "Enter your study day (Monday-Sunday): "
 );
}


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


// DISPLAY RESULTS


display("Welcome Message", welcomeMessage);
display("My Name", name);
display("Enrolled", isEnrolled);
display("Total Modules", totalModules);
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


display("Course Progress", courseProgress);
display("Course Grade", courseGrade);
display("Study Day", studyDay);
display("Study Plan", studyPlan);

