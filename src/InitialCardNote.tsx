import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, X } from "lucide-react"
import { ChangeEvent, useRef, useState } from "react"
import { toast } from "sonner"
interface InitialNoteCardProps {
    handleAddNewNote: (content: string) => void
}
export const InitialNoteCard = ({ handleAddNewNote }: InitialNoteCardProps) => {
    const [ShouldBeWriten, setShouldBeWriten] = useState(true)
    const [content, setContent] = useState("")
    const ref = useRef<HTMLButtonElement>(null)

    function handleInputText() {
        setShouldBeWriten((state) => !state)
    }
    function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
        if (e.target.value == "") {
            setShouldBeWriten((state) => !state)
        }
        setContent(e.target.value)
    }
    function handleSubmitNote(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        handleAddNewNote(content)

        setContent("")
        setShouldBeWriten((state) => !state)
        ref.current?.click()

        toast.success("Nota adicionada com sucesso!")
    }
    return (
        <Dialog.Root>
            <Dialog.Trigger className='flex flex-col gap-3 items-start text-left bg-slate-600 p-5 relative outline-none hover:ring-2 hover:ring-slate-600  focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='absolute top-0 right-0 p-1 bg-slate-800'>
                    <ArrowUpRight size={20} className='text-slate-600' />
                </span>
                <span className='text-slate-300 text-md text-[14px]'>Adicionar uma nota</span>

            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/60" />
                <Dialog.Content className="fixed max-w-[640px] w-full h-[60vh]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 p-5 z-10 flex flex-col rounded-md overflow-x-hidden">
                    <div className="flex flex-1 flex-col gap-3 p-5 ">
                        <Dialog.Close >
                            <button ref={ref} className="absolute top-0 right-0 p-1 bg-slate-800 text-slate-600">
                                <X size={20} />
                            </button>
                        </Dialog.Close>
                        <form onSubmit={handleSubmitNote}>
                            <span className="text-slate-200 text-md text-[14px]">
                                Adicionar nota
                            </span>
                            {ShouldBeWriten ? (
                                <p className="text-slate-400 text-[14px] w-full">
                                    Comece {" "}
                                    <span className="text-lime-400">
                                        gravando uma nota {" "}
                                    </span>
                                    em audio ou se preferir {" "}
                                    <button className="text-lime-400" onClick={handleInputText}>
                                        utilize apenas texto
                                    </button>.
                                </p>
                            ) : (
                                <textarea autoFocus onChange={handleInputChange} className="text-slate-400 text-[14px] w-full h-full outline-none resize-none bg-transparent"></textarea>
                            )}
                            <button type="submit" className="p-3 bg-lime-400 w-full absolute bottom-0 left-0 text-lime-950 font-semibold text-[14px]">Salvar nota</button>
                        </form>
                    </div>
                </Dialog.Content>
            </Dialog.Portal >

        </Dialog.Root >

    )
}