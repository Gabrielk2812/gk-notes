const lightModeColors = [
    "rgba(157,107,255,0.7)",  // lavender
    "rgba(244,239,255,0.7)",  // pale lilac
    "rgba(255,147,147,0.7)",  // soft coral
    "rgba(255,206,150,0.7)",  // warm peach
    "rgba(196,223,230,0.7)",  // light cyan
    "rgba(214,178,255,0.7)",  // pastel purple
    "rgba(255,240,200,0.7)",  // soft cream
    "rgba(200,255,210,0.7)",  // mint green
    "rgba(255,200,220,0.7)",  // soft pink
    "rgba(180,220,255,0.7)",  // sky blue
    "rgba(230,230,255,0.7)",  // pale blue
    "rgba(255,245,180,0.7)"   // light yellow
];

const darkModeColors = [
    "rgba(75,30,143,0.7)",    // violet
    "rgba(107,63,191,0.7)",   // medium violet
    "rgba(58,123,213,0.7)",   // soft blue
    "rgba(0,183,162,0.7)",    // teal
    "rgba(255,147,147,0.7)",  // soft coral
    "rgba(255,206,150,0.7)",  // warm peach
    "rgba(200,120,255,0.7)",  // medium lavender
    "rgba(120,200,255,0.7)",  // bright blue
    "rgba(0,200,180,0.7)",    // bright teal
    "rgba(255,180,120,0.7)",  // warm orange
    "rgba(220,150,255,0.7)",  // soft violet
    "rgba(150,255,200,0.7)"   // light green
];


var selectedIndex;

function switchDarkMode() {
    isDarkMode = !isDarkMode;

    localStorage.setItem("darkmode", isDarkMode);

    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        this.textContent = "☀️";
        document.getElementById("siteIcon").src = "./assets/icon_purplecircle.png";
        selectColorIndex();
        setRandomNoteCardColor();
        setRandomProfileColor();
        setRandomProfileTextColor();

    } else {
        document.body.classList.remove("dark-mode");
        this.textContent = "🌙";
        document.getElementById("siteIcon").src = "./assets/icon_whitecircle.png";
        selectColorIndex();
        setRandomNoteCardColor();
        setRandomProfileColor();
        setRandomProfileTextColor();
    }
}

function selectColorIndex() {
    selectedIndex = Math.floor(Math.random() * darkModeColors.length);
}

function setRandomProfileColor() {
    const profileCircle = document.querySelector(".profile-circle");
    const profilePill = document.querySelector(".profile-pill");

    if (isDarkMode) {
        profileCircle.style.backgroundColor = darkModeColors[selectedIndex];
        profilePill.style.backgroundColor = darkModeColors[selectedIndex];
    }
    else {
        profileCircle.style.backgroundColor = lightModeColors[selectedIndex];
        profilePill.style.backgroundColor = lightModeColors[selectedIndex];
    }

}

function setRandomProfileTextColor() {
    if (isDarkMode) {
        document.querySelector("#usernameTitle").style.color = darkModeColors[selectedIndex];
    }
    else {
        document.querySelector("#usernameTitle").style.color = lightModeColors[selectedIndex];
    }

}

function setRandomNoteCardColor() {
    let allCards = document.querySelectorAll(".noteCard");

    allCards.forEach(card => {
        if (isDarkMode) {
            card.style.backgroundColor = darkModeColors[selectedIndex];
        }
        else {
            card.style.backgroundColor = lightModeColors[selectedIndex];
        }

    });
}