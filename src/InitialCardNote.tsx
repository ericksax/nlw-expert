import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, X } from "lucide-react"
import { ChangeEvent, useRef, useState } from "react"
import { toast } from "sonner"
interface InitialNoteCardProps {
    handleAddNewNote: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export const InitialNoteCard = ({ handleAddNewNote }: InitialNoteCardProps) => {
    const [ShouldBeWriten, setShouldBeWriten] = useState(true)
    const [IsRecordingVoice, setIsRecordingVoice] = useState(false)
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
    function handleSubmitNote() {

        handleAddNewNote(content)

        setContent("")
        setShouldBeWriten((state) => !state)

        toast.success("Nota adicionada com sucesso!")
    }

    function handleStopTranscription() {

        setIsRecordingVoice((state) => !state)

        if (content == "") {
            setShouldBeWriten((state) => !state)
        }

        speechRecognition?.stop()

    }

    function handleStartRecording() {
        setIsRecordingVoice((state) => !state)
        setShouldBeWriten((state) => !state)
        const isSpeechRecognitionAPIAvaliable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

        if (!isSpeechRecognitionAPIAvaliable) {
            toast.error("Nenhuma API de reconhecimento de fala disponível")
            return
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        speechRecognition = new SpeechRecognition()

        speechRecognition.lang = "pt-BR"
        speechRecognition.continuous = true
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true


        speechRecognition.start()
        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript)
            }, "")

            setContent(transcription)
        }

    }


    return (
        <Dialog.Root>
            <Dialog.Trigger className='flex flex-col gap-3 items-start text-left bg-slate-600 p-5 relative outline-none hover:ring-2 hover:ring-slate-600  focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='absolute top-0 right-0 p-1 bg-slate-800'>
                    <ArrowUpRight size={20} className='text-slate-600' />
                </span>
                <span className='text-slate-300 text-md text-[14px]'>Adicionar uma nota</span>
                <textarea className="w-full text-slate-400 text-[14px] bg-transparent placeholder:font-semibold tracking-tighter outline-none focus:placeholder-transparent resize-none">
                    Grave uma nota em áudio que será convertida para texto automaticamente.
                </textarea>

            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/60" />
                <Dialog.Content className="fixed inset-0 md:inset-auto md:max-w-[640px] md:w-full md:h-[60vh]  md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-slate-700 p-5 z-10 flex flex-col md:rounded-md overflow-x-hidden">
                    <div className="flex flex-1 flex-col gap-3 p-5 ">
                        <Dialog.Close >
                            <button ref={ref} className="absolute top-0 right-0 p-1 bg-slate-800 text-slate-600">
                                <X size={20} />
                            </button>
                        </Dialog.Close>
                        <form>
                            <span className="text-slate-200 text-md text-[14px]">
                                Adicionar nota
                            </span>
                            {ShouldBeWriten ? (
                                <p className="text-slate-400 text-[14px] w-full">
                                    Comece {" "}
                                    <button onClick={handleStartRecording} type="button" className="text-lime-400">
                                        gravando uma nota
                                    </button>
                                    {" "} em audio ou se preferir {" "}
                                    <button type="button" className="text-lime-400" onClick={handleInputText}>
                                        utilize apenas texto
                                    </button>.
                                </p>
                            ) : (
                                <textarea
                                    autoFocus
                                    onChange={handleInputChange}
                                    value={content}
                                    className="text-slate-400 text-[14px] w-full  outline-none resize-none bg-transparent"></textarea>
                            )}

                            {IsRecordingVoice ? (
                                <button
                                    type="button"
                                    className="flex justify-center items-center gap-2 p-3 bg-slate-800 w-full absolute bottom-0 left-0 text-slate-300 font-semibold text-[14px]"
                                    onClick={handleStopTranscription}
                                >

                                    <div className="bg-red-500  h-2 w-2 rounded-full animate-pulse" />
                                    Gravando nota... (clique p/ interromper)</button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmitNote}
                                    disabled={content == ""}
                                    className="p-3 bg-lime-400 w-full absolute bottom-0 left-0 text-lime-950 font-semibold text-[14px] disabled:cursor-not-allowed disabled:bg-lime-700">Salvar nota</button>
                            )}
                        </form>
                    </div>
                </Dialog.Content>
            </Dialog.Portal >

        </Dialog.Root >

    )
}