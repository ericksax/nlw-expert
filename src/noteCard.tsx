import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react";

interface NoteCardProps {
    note: {
        id: string
        date: Date
        content: string
    }

    handleRemoveNote: (id: string) => void
}

export const NoteCard = ({ note, handleRemoveNote }: NoteCardProps) => {
    const time = formatDistance(new Date(), note.date, { addSuffix: true, locale: ptBR })
    return (
        <Dialog.Root>

            <Dialog.Trigger className='flex flex-col text-left bg-slate-800 p-4 gap-3 relative outline-none hover:ring-2 hover:ring-slate-600  focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='text-slate-300 text-md text-[14px]'>{time}</span>
                <article className='text-slate-400 text-md text-[14px]'>
                    {note.content}
                </article>
                <div className='absolute bottom-0 left-0 h-1/2 bg-gradient-to-t from-slate-950 w-full z-10 '></div>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/60" />
                <Dialog.Content className="fixed inset-0 md:max-w-[640px] md:w-full md:h-[60vh]  md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-slate-700 p-5 z-10 flex flex-col md:rounded-md overflow-x-hidden">
                    <div className="flex flex-1 flex-col gap-3 p-5 ">
                        <Dialog.Close><span className="absolute top-0 right-0 p-1 bg-slate-800 text-slate-600">
                            <X size={20} />
                        </span></Dialog.Close>
                        <span className="text-slate-200 text-md text-[14px]">{time}</span>

                        <textarea className="w-full text-slate-400 text-[14px] bg-transparent placeholder:font-semibold tracking-tighter outline-none focus:placeholder-transparent h-full w-full resize-none">
                            {note.content}
                        </textarea>

                        <button onClick={() => handleRemoveNote(note.id)} className="p-3 bg-slate-800 w-full absolute bottom-0 left-0 font-semibold text-[14px] group">
                            Deseja{" "}
                            <span className="text-red-400 
                            group-hover:underline">
                                apagar essa nota
                            </span>
                            ?
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal >

        </Dialog.Root >
    )
}