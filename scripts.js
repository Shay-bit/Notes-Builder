console.log("Welcome to Notes!")

// DOM Elements
const createNoteBtn = document.querySelector("#create-note-btn")
const currentNoteContainer = document.querySelector(".current-note-container")
const storedNote = document.querySelector(".stored-note")

// Initialize notes as an empty array or retrieve from localStorage
let notes = JSON.parse(localStorage.getItem("stored-notes")) || []

// Function to render notes
function renderNotes() {
    // Get notes from localStorage, ensuring it's an array
    let storedNotes = localStorage.getItem("stored-notes")
    let parseNotes = storedNotes ? JSON.parse(storedNotes) : []
    notes = Array.isArray(parseNotes) ? parseNotes : []

    // Clear the notes container before rendering
    currentNoteContainer.innerHTML = ""

    // Show a message if there are no notes
    if (notes.length === 0) {
        currentNoteContainer.innerHTML = "<p>No notes available. Create one!</p>"
        return
    }

    // Render each note
    notes.forEach((note, index) => {
        const renderNote = document.createElement("div")
        renderNote.classList.add("note")
        renderNote.innerHTML = 
            `<div class="note">
                <div class="note-title">${note.title}</div>
                <div class="note-info-container">
                    <p class="note-info">${note.body}</p>
                    <div class="btn-container">
                        <button class="modify-btn">Modify</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </div>
            </div>`
        
        currentNoteContainer.append(renderNote)

        // Select buttons inside this note
        const deleteBtn = renderNote.querySelector(".delete-btn")
        deleteBtn.addEventListener("click", () => deleteNote(index))

  const modifyBtn = renderNote.querySelector(".modify-btn")
        modifyBtn.addEventListener("click", () => modifyNote(index))
    })
}
// Function to add a new note
function addNote() {
    console.log("Create! Button Works!")
    
    // Create the note input fields
    const createNote = document.createElement("div")
    createNote.classList.add("note")
    createNote.innerHTML = 
        `<div class="add-note-container">
            <input type="text" id="add-note-title" placeholder="Note Title">
            <input type="text" id="add-note-body" placeholder="Your new note!">
            <button id="add-save-note-btn">Save</button>
        </div>`  
    currentNoteContainer.append(createNote)
// Handle saving the note
    document.querySelector("#add-save-note-btn").addEventListener("click", () => {
        const addNoteTitle = document.querySelector("#add-note-title").value
        const addNoteBody = document.querySelector("#add-note-body").value

        // Ensure the user entered something
        if (addNoteTitle.trim() && addNoteBody.trim()) {
            notes.push({ title: addNoteTitle, body: addNoteBody })
            localStorage.setItem("stored-notes", JSON.stringify(notes))

            // Re-render the notes
            currentNoteContainer.innerHTML = ""
            renderNotes()
        } else {
            alert("Please enter a title and note content.")
        }
    })
}
// Event listener for "Create Note" button
createNoteBtn.addEventListener("click", addNote)

// Function to delete a note
function deleteNote(index) {
    console.log("Deleting note at index:", index)

    // Remove note from array and update localStorage
    notes.splice(index, 1)
    localStorage.setItem("stored-notes", JSON.stringify(notes))

    // Clear and re-render the notes
    currentNoteContainer.innerHTML = ""
    renderNotes()
}

// Function to modify an existing note
function modifyNote(index) {
    console.log("Modifying note:", notes[index])

    // Create input fields pre-filled with existing note data
    const createNote = document.createElement("div")
    createNote.classList.add("note")
    createNote.innerHTML = 
        `<div class="add-note-container">
            <input type="text" id="add-note-title" value="${notes[index].title}">
            <input type="text" id="add-note-body" value="${notes[index].body}">
            <button id="add-save-note-btn">Save</button>
        </div>`
    currentNoteContainer.append(createNote)
// Handle saving the modified note
    document.querySelector("#add-save-note-btn").addEventListener("click", () => {
        notes[index] = {
            title: document.querySelector("#add-note-title").value,
            body: document.querySelector("#add-note-body").value
        }

        localStorage.setItem("stored-notes", JSON.stringify(notes))

        // Clear and re-render notes
        currentNoteContainer.innerHTML = ""
        renderNotes()
    })
}

// Initial render of notes when the page loads
renderNotes()
console.log("Notes AFTER render:", notes)
