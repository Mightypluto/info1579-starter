
// Personal information
const aboutMeObject = {
    name: "Michael Adams",

    education: "I attended Papillion South High School. I have roughly a year and a half of coding experience through MCC, where I have worked with programming languages and technologies such as Java, JavaScript, HTML, HPP, and Python.",

    hobbies: [
        "Tabletop Games",
        "Game Design",
        "Programming",
        "Writing",
        "Worldbuilding"
    ],

    skills: [
        "Java",
        "JavaScript",
        "HTML",
        "HPP",
        "Python"
    ],

    notableThings: [
        "Creator of the Endless Wars tabletop strategy game",
        "Developing a JavaScript website to organize the Endless Wars rulebook",
        "Interested in tabletop game design and worldbuilding",
        "Working on multiple creative writing projects"
    ]
};


// Display text on the page
function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


// Display arrays as HTML lists
function fillList(id, items) {
    const list = document.getElementById(id);

    if (!list) {
        return;
    }

    list.innerHTML = "";

    items.forEach(item => {
        const li = document.createElement("li");

        li.textContent = item;

        list.appendChild(li);
    });
}


// Display personal information
function displayAboutMe() {
    setText("aboutName", aboutMeObject.name);

    setText("aboutEducation", aboutMeObject.education);

    fillList("aboutHobbies", aboutMeObject.hobbies);

    fillList("aboutSkills", aboutMeObject.skills);

    fillList("aboutNotableThings", aboutMeObject.notableThings);
}


// Get a random joke from an API
async function getRandomJoke() {
    const setupElement = document.getElementById("jokeSetup");
    const punchlineElement = document.getElementById("jokePunchline");
    const jokeButton = document.getElementById("jokeButton");

    try {
        setupElement.textContent = "Loading joke...";
        punchlineElement.textContent = "";

        jokeButton.disabled = true;

        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        if (!response.ok) {
            throw new Error("Could not retrieve a joke.");
        }

        const joke = await response.json();

        setupElement.textContent = joke.setup;
        punchlineElement.textContent = joke.punchline;

    } catch (error) {
        setupElement.textContent =
            "Unable to load a joke right now.";

        punchlineElement.textContent =
            "Please try again later.";

        console.error("Joke API Error:", error);

    } finally {
        jokeButton.disabled = false;
    }
}


// Initialize the page
document.addEventListener("DOMContentLoaded", () => {

    displayAboutMe();

    const jokeButton = document.getElementById("jokeButton");

    if (jokeButton) {
        jokeButton.addEventListener("click", getRandomJoke);
    }

});
