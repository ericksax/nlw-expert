
import './app.css'
import logo from "./assets/Logo.svg"
import {
  NoteCard
} from './noteCard'
import { InitialNoteCard } from './InitialCardNote'
import { useState } from 'react'


interface Note {
  id: string
  date: Date
  content: string
}


export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {

    const savedNotes = localStorage.getItem("NLW-EXP-@notes")

    if (savedNotes) {
      return JSON.parse(savedNotes)
    }

    return []
  })

  const [term, setTerm] = useState("")

  const handleAddNewNote = (content: string) => {

    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: content
    }

    setNotes((state) => [newNote, ...state])
  }

  const handleRemoveNote = (id: string) => {
    setNotes((state) => state.filter((note) => note.id !== id))
  }

  const filteredNotes = notes.filter((note) => {
    if (term == "") {
      return notes
    }
    return note.content.toLowerCase().includes(term.toLowerCase())
  })

  return (
    <main className='flex flex-col m-auto max-w-6xl space-y-6 mt-16 p-5'>

      <img src={logo} alt="nlw expert" width={124.5} height={24} />

      <input onChange={(e) => setTerm(e.target.value)} type="text" placeholder="Busque em suas notas..." className='w-full text-slate-500 text-3xl bg-transparent placeholder:font-semibold tracking-tighter outline-none focus:placeholder-transparent' />

      <div className='h-px w-full bg-slate-500'></div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>
        <InitialNoteCard handleAddNewNote={handleAddNewNote} />
        {filteredNotes.map((note: Note) => <NoteCard key={note.id} note={note} handleRemoveNote={handleRemoveNote} />)}
      </div>
    </main>
  )
}

