const noteHTML = `
    <h2 class="title">--title--</h2>
    <p class="text">--text--</p>
    <div class="buttons">
        <button class="delete">Delete</button>
        <button class="edit">edit</button>
    </div>
`

const noteTemplate = (note) => {
    return noteHTML.replace(/--title--/g, note.title)
        .replace(/--text--/g, note.text)
        .replace(/\n/g, '<br>')
}


const saveNotesInLocalStorage = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

const getNotesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('notes'))
}

const notes = getNotesFromLocalStorage() || []

const deleteNote = (id) => {
    console.log(id)
    const note = notes.findIndex(note => note.id === id)
    notes.splice(note, 1)
    saveNotesInLocalStorage(notes)
    renderNotes()
}

const addNote = (note) => {
    notes.push(note)
    saveNotesInLocalStorage(notes)
    renderNotes()
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const title = e.target.querySelector('input').value
    const text = e.target.querySelector('textarea').value
    const note = {
        id : notes.length + 1,
        title,
        text
    }
    addNote(note)
    e.target.querySelector('input').value = ''
    e.target.querySelector('textarea').value = ''
})


const renderNotes = () => {
    const notesContainer = document.querySelector(".notes")
    notesContainer.innerHTML = ""
    console.log(notes)
    notes.forEach(note => {
        const noteHTML = noteTemplate(note)
        const noteDiv = document.createElement('div')
        noteDiv.className = "note"
        noteDiv.id = note.id
        noteDiv.innerHTML = noteHTML
        notesContainer.appendChild(noteDiv)
        noteDiv.querySelector('.delete').addEventListener('click', () => {
            deleteNote(note.id)
        })
        noteDiv.querySelector('.edit').addEventListener('click', () => {
            modalPrompt(note.title, note.text, (title, text) => {
                note.title = title
                note.text = text
                saveNotesInLocalStorage(notes)
                renderNotes()
            })
        })
    }
    )
}

const modalPrompt = (title, text, callback) => {

    const overlay = document.createElement('div')
    overlay.className = "overlay"
    document.body.appendChild(overlay)
    const modal = document.createElement('div')
    modal.className = "modal"
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Edit note</h2>
            </div>
            <input class="title" value="${title}"></input>
            <textarea class="text" cols="30" rows="10">${text}</textarea>
            <div class="buttons">
                <button class="cancel">Cancel</button>
                <button class="ok">Ok</button>
            </div>
        </div>
    `
    const remove = () => {
        modal.remove()
        overlay.remove()
    }

    
    document.body.appendChild(modal)
    modal.querySelector('.cancel').addEventListener('click', () => {
        remove()
    }
    )

    overlay.addEventListener('click', remove)

    modal.querySelector('.ok').addEventListener('click', () => {
        const title = modal.querySelector('.title').value
        const text = modal.querySelector('.text').value
        callback(title, text)
        remove()
    }
    )
}



const editNote = (id, title, text) => {
    const note = notes.find(note => note.id === id)
    note.title = title
    note.text = text
    saveNotesInLocalStorage(notes)
    renderNotes()
}


renderNotes()


