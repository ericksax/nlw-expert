import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, DoorClosed, PanelBottomClose, X } from "lucide-react"
import { useState } from "react"
interface InitialNoteCardProps {
    nota: {
        title: string
        content: string
    }
}
export const InitialNoteCard = ({ nota }: InitialNoteCardProps) => {
    const [ShouldBeWriten, setShouldBeWriten] = useState(true)
    function handleInputText() {
        setShouldBeWriten((state) => !state)
    }
    return (
        <Dialog.Root>
            <Dialog.Trigger className='flex flex-col gap-3 items-start text-left bg-slate-600 p-5 relative outline-none hover:ring-2 hover:ring-slate-600  focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='absolute top-0 right-0 p-1 bg-slate-800'>
                    <ArrowUpRight size={20} className='text-slate-600' />
                </span>
                <span className='text-slate-300 text-md text-[14px]'>{nota.title}</span>
                <article className='text-slate-400 text-[14px]'>
                    {nota.content}
                </article>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/60" />
                <Dialog.Content className="fixed max-w-[640px] h-[60vh]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 p-5 z-10 flex flex-col rounded-md overflow-x-hidden">
                    <div className="flex flex-1 flex-col gap-3 p-5 ">
                        <Dialog.Close><span className="absolute top-0 right-0 p-1 bg-slate-800 text-slate-600"><X size={20} /></span></Dialog.Close>
                        <span className="text-slate-200 text-md text-[14px]"> Adicionar nota</span>
                        {ShouldBeWriten ? (
                            <p className="text-slate-400 text-[14px]">Comece <span className="text-lime-400">gravando uma nota</span> em audio ou se preferir <span className="text-lime-400" onClick={handleInputText}>utilize apenas texto</span>.</p>
                        ) : (
                            null
                        )}
                        <button className="p-3 bg-lime-400 w-full absolute bottom-0 left-0 text-lime-950 font-semibold text-[14px]">Salvar nota</button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal >

        </Dialog.Root >

    )
}