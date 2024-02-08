
import './app.css'
import logo from "./assets/Logo.svg"
import {
  NoteCard
} from './noteCard'
import { InitialNoteCard } from './InitialCardNote'
import { Title } from '@radix-ui/react-dialog'

export function App() {
  return (
    <main className='flex flex-col m-auto max-w-6xl space-y-6 mt-16'>

      <img src={logo} alt="nlw expeert" width={124.5} height={24} />

      <input type="text" placeholder="Busque em suas notas..." className='w-full text-slate-500 text-3xl bg-transparent placeholder:font-semibold tracking-tighter outline-none focus:placeholder-transparent' />

      <div className='h-px w-full bg-slate-500'></div>

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <InitialNoteCard nota={{ title: "Title", content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Ducimus laboriosam accusantium provident placeat voluptatum sed nam optio architecto nihil illo beatae molestiae iusto vitae et autem, saepe ad laudantium maiores!" }} />
        <NoteCard nota={{ title: "Title", content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Ducimus laboriosam accusantium provident placeat voluptatum sed nam optio architecto nihil illo beatae molestiae iusto vitae et autem, saepe ad laudantium maiores!" }} />
        <NoteCard nota={{ title: "Title", content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Ducimus laboriosam accusantium provident placeat voluptatum sed nam optio architecto nihil illo beatae molestiae iusto vitae et autem, saepe ad laudantium maiores!" }} />
        <NoteCard nota={{ title: "Title", content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Ducimus laboriosam accusantium provident placeat voluptatum sed nam optio architecto nihil illo beatae molestiae iusto vitae et autem, saepe ad laudantium maiores!" }} />


      </div>
    </main>
  )
}

