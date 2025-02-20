function loadContent(section) {
    const content = {
        "intro": `
            <h2>Welcome to My Notepad!</h2>
            <div class="profile-container">
                <img src="your-image.jpg" alt="Profile Picture" class="profile-pic">
                <p class="profile-info">Giannah Gilyn Vicariato</p>
                <p class="profile-info">IT3R8</p>
                <p class="profile-info">Application Development and Emerging Technologies</p>
            </div>
            <p>Select a topic from the sidebar.</p>
        `,
        "notes": `
            <h2>Notes</h2>
            <button onclick="createNewNote()">Create New Note</button>
            <ul id="note-list"></ul>
        `,
        "usage": "<h2>Usage</h2><p>Click 'Create New Note' to add a new entry. You can also edit or delete notes.</p>",
    };

    document.getElementById("content").innerHTML = content[section] || "<h2>Not Found</h2><p>Section not available.</p>";
    document.getElementById("breadcrumbs").innerText = `Home > ${section.charAt(0).toUpperCase() + section.slice(1)}`;

    if (section === "notes") {
        loadNotes(); // Load existing notes
    }
}

function createNewNote() {
    const noteName = prompt("Enter note title:");
    if (noteName) {
        const timestamp = new Date().toLocaleString();
        const note = { title: noteName, time: timestamp };

        saveNote(note);
        loadNotes();
    }
}

function saveNote(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const noteList = document.getElementById("note-list");
    noteList.innerHTML = "";
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("note-item");

        listItem.innerHTML = `
            <div class="note-text">
                <strong>${note.title}</strong>
                <small>${note.time}</small>
            </div>
            <div class="note-actions">
                <span class="edit-icon" onclick="editNote(${index})">✏️</span>
                <span class="delete-icon" onclick="deleteNote(${index})">🗑️</span>
            </div>
        `;

        noteList.appendChild(listItem);
    });
}

function editNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    const newTitle = prompt("Edit note title:", notes[index].title);

    if (newTitle) {
        notes[index].title = newTitle;
        notes[index].time = new Date().toLocaleString();
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    }
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}
