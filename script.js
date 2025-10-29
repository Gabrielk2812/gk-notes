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

//color switching logic
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

//add note btn stuff
function openNoteCreationModal() {
    document.querySelector(".noteCreationModal").classList.remove("d-none");
}

function saveNote() {
    let noteTitle = document.getElementById("noteTitle").value;
    let noteContent = document.getElementById("noteContent").value;
    let dateCreated = new Date().toLocaleDateString();
    let timeCreated = new Date().toLocaleTimeString();


    document.querySelector(".noteCreationModal").classList.add("d-none");

    document.querySelector(".notesCountStatus").classList.add("d-none");

    document.querySelector(".notesGrid").innerHTML += `
        <div class="noteCard p-3 rounded-4 shadow-sm collapsed" 
            style="background-color: ${isDarkMode ? darkModeColors[selectedIndex] : lightModeColors[selectedIndex]};">
            <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="m-0 noteHeader">${noteTitle}</h5>
            <small class="text-muted">${dateCreated} ${timeCreated}</small>
            </div>

            <p class="noteContent">${noteContent}</p>

            <div class="d-flex justify-content-end mt-3">
            <button class="expandBtn btn btn-sm border-0 bg-transparent text-secondary">...</button>
            </div>
        </div>
        <br>
`;

    setTimeout(() => {
        document.querySelectorAll('.expandBtn').forEach(btn => {
            btn.onclick = () => {
                const noteCard = btn.closest('.noteCard');
                noteCard.classList.toggle('expanded');
                noteCard.classList.toggle('collapsed');
                btn.textContent = noteCard.classList.contains('expanded') ? 'ˇ' : '...';
            };
        });
    }, 100);
}


function countLetters() {
    let content = document.getElementById("noteContent").value;
    let letterCount = content.length;
    document.querySelector(".currentLetterCount").textContent = letterCount;
    if (letterCount >= 1000) {
        document.getElementById("noteContent").value = content.substring(0, 1000);
        document.querySelector(".currentLetterCount").textContent = 1000;
    }
}
