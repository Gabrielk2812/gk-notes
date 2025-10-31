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
    "rgba(255,245,180,0.7)",  // light yellow
    "rgba(255,210,240,0.7)",  // cotton candy
    "rgba(190,245,255,0.7)",  // ice blue
    "rgba(255,220,190,0.7)",  // apricot
    "rgba(210,255,210,0.7)",  // soft lime
    "rgba(240,240,240,0.7)",  // pearl gray
    "rgba(250,230,255,0.7)",  // orchid pink
    "rgba(255,230,220,0.7)",  // peach mist
    "rgba(220,255,250,0.7)"   // seafoam
];


const darkModeColors = [
    "rgba(120,50,220,0.7)",   // deep amethys
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
    "rgba(150,255,200,0.7)",  // light green
    "rgba(255,100,150,0.7)",  // neon pink
    "rgba(100,180,255,0.7)",  // electric blue
    "rgba(80,255,180,0.7)",   // aqua glow
    "rgba(255,255,150,0.7)",  // soft neon yellow
    "rgba(160,70,255,0.7)",   // cosmic purple
    "rgba(255,120,90,0.7)",   // fiery coral
    "rgba(0,150,255,0.7)",    // digital blue
    "rgba(255,200,80,0.7)"    // amber glow
];




var selectedIndex; //to keep track of which color index is selected

var currentlyEditingNoteCard = null; //to keep track of which note is being edited



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
        renderColorButtons();

    } else {
        document.body.classList.remove("dark-mode");
        this.textContent = "🌙";
        document.getElementById("siteIcon").src = "./assets/icon_whitecircle.png";
        selectColorIndex();
        setRandomNoteCardColor();
        setRandomProfileColor();
        setRandomProfileTextColor();
        renderColorButtons();
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

function renderColorButtons() {
    const container = document.querySelector(".colorButtonsContainer");
    container.innerHTML = "";
    let profileColors = isDarkMode ? darkModeColors : lightModeColors;

    profileColors.forEach((color) => {
        const btn = document.createElement("button");
        btn.classList.add("rounded-circle", "me-2");
        btn.style.height = "50px";
        btn.style.width = "50px";
        btn.style.backgroundColor = color;
        btn.title = color;

        container.appendChild(btn);
    });

    const btnRandom = document.createElement("button");
    btnRandom.classList.add("rounded-circle", "me-2");
    btnRandom.style.height = "50px";
    btnRandom.style.width = "50px";
    btnRandom.style.backgroundColor = "black";
    btnRandom.title = "Random Color";
    btnRandom.innerHTML = '<i class="bi bi-shuffle" style="color: white; font-size: 24px;"></i>';

    container.appendChild(btnRandom);
}



//modal opening functions
function openProfileEditingModal() {
    const modal = document.querySelector('.profileEditingModal');
    modal.classList.remove('d-none');

    void modal.offsetWidth;
    modal.classList.add('added');

    document.querySelector("#editUsername").value = localStorage.getItem("username");
    document.querySelector("#editPassword").value = localStorage.getItem("password");
}

function openNoteCreationModal() {
    const modal = document.querySelector(".noteCreationModal");
    modal.classList.remove("d-none");

    void modal.offsetWidth;
    modal.classList.add("added");

    document.querySelector(".currentLetterCount").innerText = "0";
}

function openNoteEditingModal(e) {
    const modal = document.querySelector(".noteEditingModal");
    modal.classList.remove("d-none");

    void modal.offsetWidth;
    modal.classList.add("added");

    const parentNoteCard = e.target.closest(".noteCard");
    const noteTitle = parentNoteCard.querySelector(".noteHeader").innerText;
    const noteContent = parentNoteCard.querySelector(".noteContent").innerText;

    currentlyEditingNoteCard = parentNoteCard;

    document.querySelector("#editNoteTitle").value = noteTitle;
    document.querySelector("#editNoteContent").value = noteContent;
    document.querySelector(".editCurrentLetterCount").innerText = noteContent.length;
}




//note operations
function editNote() {
    const modal = document.querySelector(".noteEditingModal");

    const noteCard = currentlyEditingNoteCard

    let noteTitle = document.getElementById("editNoteTitle").value;
    let noteContent = document.getElementById("editNoteContent").value;

    noteCard.querySelector(".noteHeader").innerHTML = noteTitle;
    noteCard.querySelector(".noteContent").innerText = noteContent;

    modal.classList.remove('added');
    modal.classList.add('closed');
    setTimeout(() => {
        modal.classList.add("d-none");
    }, 100);

    
    modal.classList.remove('closed');
    currentlyEditingNoteCard = null;
}

function saveNote() {
    const modal = document.querySelector(".noteCreationModal");

    let noteTitle = document.getElementById("noteTitle").value;
    let noteContent = document.getElementById("noteContent").value;
    let dateCreated = new Date().toLocaleDateString();
    let timeCreated = new Date().toLocaleTimeString();
    let contentNum = document.getElementById("noteContent").value.length;


    while (noteContent === "" || noteTitle === "") {
        alert("Please fill in all fields note fields.");
        return;
    }

    document.querySelector(".noteCreationModal").classList.add("d-none");

    document.querySelector(".notesCountStatus").classList.add("d-none");

    if (contentNum > 180) {
        document.querySelector(".notesGrid").innerHTML += `
        <div class="noteCard p-3 rounded-4 shadow-sm collapsed added" 
            style="background-color: ${isDarkMode ? darkModeColors[selectedIndex] : lightModeColors[selectedIndex]};">
            <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="m-0 noteHeader">${noteTitle}</h5>
            <small class="text-muted">${dateCreated} ${timeCreated}</small>
            </div>

            <p class="noteContent" style="overflow: visible">${noteContent}</p>

            <div class="d-flex justify-content-end mt-3">
                <button class="editNoteBtn btn btn-sm border-0 bg-transparent text-muted" onclick="openNoteEditingModal(event)"><i class="bi bi-pencil-square" style="width:25px; height:25px;"></i></button>
                <button class="deleteNoteBtn btn btn-sm border-0 bg-transparent text-muted" onclick="deleteNote(event)"><i class="bi bi-trash3" style="width:25px; height:25px;"></i></button>
                <button class="expandBtn btn btn-sm border-0 bg-transparent text-muted">...</button>
            </div>
        </div>
        <br>
`;
    }
    else {
        document.querySelector(".notesGrid").innerHTML += `
        <div class="noteCard p-3 rounded-4 shadow-sm added" 
            style="background-color: ${isDarkMode ? darkModeColors[selectedIndex] : lightModeColors[selectedIndex]}; blur: 0px;">
            <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="m-0 noteHeader">${noteTitle}</h5>
            <small class="text-muted">${dateCreated} ${timeCreated}</small>
            </div>

            <p class="noteContent" style="blur: none">${noteContent}</p>

            <div class="d-flex justify-content-end mt-3">
                <button class="editNoteBtn btn btn-sm border-0 bg-transparent text-muted" onclick="openNoteEditingModal(event)"><i class="bi bi-pencil-square" style="width:25px; height:25px;"></i></button>
                <button class="deleteNoteBtn btn btn-sm border-0 bg-transparent text-muted" onclick="deleteNote(event)"><i class="bi bi-trash3" style="width:25px; height:25px;"></i></button>
            </div>
        </div>
        <br>
`;
    }



    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
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

    setTimeout(() => {
        document.querySelectorAll('.noteCard.added').forEach(note => {
            note.classList.remove('added');
        });
    }, 400);

    modal.classList.remove('added');
    modal.classList.add('closed');
    setTimeout(() => {
        modal.classList.add("d-none");
    }, 100);

    modal.classList.remove('closed');
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

function countEditLetters() {
    let content = document.getElementById("editNoteContent").value;
    let letterCount = content.length;
    document.querySelector(".editCurrentLetterCount").textContent = letterCount;

    if (letterCount >= 1000) {
        document.getElementById("editNoteContent").value = content.substring(0, 1000);
        document.querySelector(".editCurrentLetterCount").textContent = 1000;
    }
}

function deleteNote(e) {
    const parentNoteCard = e.target.closest(".noteCard");

    parentNoteCard.classList.add("deleted");

    setTimeout(() => {
        parentNoteCard.remove();

        const notesLeft = document.querySelectorAll('.noteCard').length;

        if (notesLeft === 0) {
            console.log("there are no more notes")
            document.querySelector(".notesCountStatus").classList.remove("d-none");
        }
    }, 400)

}



//user profile functions
function getUsernameDisplay(name) {

    const parts = name.split(/[\.\_\-\+\@]/);

    let displayName = parts[0];

    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    return displayName;
}

function ReadUserData() {
    const username = localStorage.getItem("username") || "Guest";
    const password = localStorage.getItem("password") || "";
    let displayUsername = getUsernameDisplay(username);


    let info = document.getElementById("usernameTitle");
    info.innerText = displayUsername;

    let pfpName = document.getElementById("usernamePfp");
    pfpName.innerText = username;

    let pfpShortName = displayUsername.charAt(0).toUpperCase();
    document.getElementById("profile-pill-span").innerText = pfpShortName;

    this.document.title = displayUsername + "'s Notes | GK NOTES";
}

function saveProfileChanges() {
    let modal = document.querySelector('.profileEditingModal');
    let newUsername = document.getElementById("editUsername").value.trim();
    let newPassword = document.getElementById("editPassword").value;


    if (newUsername) {
        let shortName = newUsername.split("@")[0];
        newUsername = shortName.charAt(0).toUpperCase() + shortName.slice(1);

        localStorage.setItem("username", newUsername);
    }

    if (newPassword) {
        localStorage.setItem("password", newPassword);
    }

    ReadUserData();

    modal.classList.remove('added');
    modal.classList.add('closed');
    setTimeout(() => {
        modal.classList.add("d-none");
    }, 100);

    modal.classList.remove('closed');

    alert("Profile updated successfully!");
}
