
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
  const [notes, setNotes] = useState<Note[]>([])

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

  return (
    <main className='flex flex-col m-auto max-w-6xl space-y-6 mt-16'>

      <img src={logo} alt="nlw expeert" width={124.5} height={24} />

      <input type="text" placeholder="Busque em suas notas..." className='w-full text-slate-500 text-3xl bg-transparent placeholder:font-semibold tracking-tighter outline-none focus:placeholder-transparent' />

      <div className='h-px w-full bg-slate-500'></div>

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <InitialNoteCard handleAddNewNote={handleAddNewNote} />
        {notes.map((note: Note) => <NoteCard key={note.id} note={note} handleRemoveNote={handleRemoveNote} />)}
      </div>
    </main>
  )
}

