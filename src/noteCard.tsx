interface NoteCardProps {
    nota: {
        title: string
        content: string
    }

}

export const NoteCard = ({ nota }: NoteCardProps) => {
    return (
        <button className='flex flex-col text-left bg-slate-800 p-4 gap-3 relative outline-none hover:ring-2 hover:ring-slate-600  focus-visible:ring-2 focus-visible:ring-lime-400'>
            <span className='text-slate-300 text-md text-[14px]'>{nota.title}</span>
            <article className='text-slate-400 text-md text-[14px]'>
                {nota.content}
            </article>
            <div className='absolute bottom-0 left-0 h-1/2 bg-gradient-to-t from-slate-950 w-full z-10 '></div>
        </button>
    )
}