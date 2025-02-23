console.log("Welcome to Notes!")

//DOM Elements
const createNoteBtn = document.querySelector("#create-note-btn")
const currentNoteContainer = document.querySelector('.current-note-container')
const storedNote = document.querySelector(".stored-note")

let notes = []

// IMPORTANT IF YOU MESS UP LOCAL STORAGE //
// ===================================== //
// 1. Un-Comment below code and insert something into Storage
// 2. Comment out renderNotes function

// let notes = [
//     {
//         title: "JavaScript Notes",
//         body: "Took a Intro Class today here are my notes."
//     }
// ]
// localStorage.setItem("stored-notes", JSON.stringify(notes))
// ===================================== //


console.log("notes before Render:", notes)

function renderNotes() {
    let storedNotes = localStorage.getItem("stored-notes")
    let parseNotes = JSON.parse(storedNotes)
    notes = parseNotes

    // Render in Notes Container
    // ----- <>
    notes.forEach((note, index) => {
        const renderNote = document.createElement('div')
        renderNote.classList.add('note')
        renderNote.innerHTML = 
        `
        <div class="note">
            <div class="note-title">${note.title}</div>
            <div class="note-info-container">
            <p class="note-info">${note.body}</p>
            <div class="btn-container">
                <button class="modify-btn">Modify</button>
                <button class="save-btn">Save</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
        `
        currentNoteContainer.append(renderNote)
        // ----- <>

        // Short Render is Left Container
        // ----- <>
        const renderShortNote = document.createElement('div')
        renderShortNote.classList.add("stored-note")
        renderShortNote.innerHTML = 
        `<div class="stored-note-title">${note.title}</div>`

        storedNote.append(renderShortNote)
        // ----- <>

        // Delete button
        // ----- <>
        const deleteBtn = document.querySelectorAll(".delete-btn")
        deleteBtn.forEach((btn, index) => {
            btn.addEventListener("click",() => deleteNote(index))
        })
        
        // Modify Button
        // ----- <>
        const modifyBtn = document.querySelectorAll(".modify-btn")
        modifyBtn.forEach((modBtn, index) => {
            modBtn.addEventListener("click", () => modifyNote(index))
        })
        

    })
}


// Add A New Note //
// ----- <>
function addNote(){
    console.log("Create! Button Works!")
    const createNote = document.createElement('div')
    createNote.classList.add('note')
    createNote.innerHTML = 
    `<div class="add-note-container">
        <input type="text" id="add-note-title" placeholder="Note Title">
        <input type="text" id="add-note-body" placeholder="Your new note!">
        <button id="add-save-note-btn">Save</button>
    </div>`  
    currentNoteContainer.append(createNote)

    // Save Button
    // ----- <>
    const addSaveNoteBtn = document.querySelector("#add-save-note-btn")

    function saveNewNote(){
        const addNoteTitle = document.querySelector("#add-note-title").value
        const addNoteBody = document.querySelector("#add-note-body").value
        notes.push({"title": addNoteTitle, "body": addNoteBody})
        console.log("notes after add:", notes)

        let sendNotesStorage = JSON.stringify(notes)
        localStorage.setItem("stored-notes", sendNotesStorage)

        currentNoteContainer.innerHTML= ""
        storedNote.innerHTML = ""
        renderNotes()
    }   
    addSaveNoteBtn.addEventListener("click", saveNewNote)   
}
createNoteBtn.addEventListener("click", addNote)
// ----- <>

// Function Delete Note!
// ----- <>
function deleteNote(index){
    console.log(index)
    console.log("before splice", notes)
    notes.splice(index, 1)
    console.log("after splice:", notes)
    localStorage.setItem("stored-notes", JSON.stringify(notes))

    currentNoteContainer.innerHTML= ""
    storedNote.innerHTML = ""
    
    renderNotes()
}
// ----- <>

// Function Modify Note!
// ----- <>
function modifyNote(index){
    console.log(notes[index])

    const createNote = document.createElement('div')
    createNote.classList.add('note')

    createNote.innerHTML = 
    `<div class="add-note-container">
        <input type="text" id="add-note-title" value="${notes[index].title}">
        <input type="text" id="add-note-body" value="${notes[index].body}">
        <button id="add-save-note-btn">Save</button>
    </div>`  
    currentNoteContainer.append(createNote)

    const addSaveNoteBtn = document.querySelector("#add-save-note-btn")

    function saveNewNote(){
        notes.splice(index, 1)
        const addNoteTitle = document.querySelector("#add-note-title").value
        const addNoteBody = document.querySelector("#add-note-body").value
        notes.push({"title": addNoteTitle, "body": addNoteBody})
        console.log("notes after add:", notes)

        let sendNotesStorage = JSON.stringify(notes)
        localStorage.setItem("stored-notes", sendNotesStorage)
      
        currentNoteContainer.innerHTML= ""
        storedNote.innerHTML = ""
        renderNotes()
    }   
    addSaveNoteBtn.addEventListener("click", saveNewNote) 
}

renderNotes()
console.log("notes AFTER Render:", notes)

// ========== //
// GRAVEYARD //
// ========== //

