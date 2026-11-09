
/*
   Name: Michael Adams
   Date: 11/8/2026
   Assignment: Module 8
   Course: JavaScript
*/

"use strict";

import {
    courseModules,
    totalModules,
    hoursPerWeek
} from "./data.js";

// Calculate percentage of modules completed
export const calculatePercentComplete = (completedCount) => {
    return (completedCount / totalModules) * 100;
};

// Calculate total study hours
export const calculateStudyHours = () => {
    return courseModules.reduce(
        (total, module) => total + module.hoursRequired,
        0
    );
};

// Calculate course grade
export const getCourseGrade = (percentComplete) => {
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

// Calculate course progress
export const getCourseProgress = (completedCount) => {
    return `${completedCount} of ${totalModules} modules completed`;
};

// Calculate estimated study plan
export const getStudyPlan = (remainingHours) => {
    return Math.ceil(remainingHours / hoursPerWeek);
};
