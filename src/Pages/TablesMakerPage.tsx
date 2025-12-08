import { useState } from "react"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import ViewPage from "./ViewPage"
import DashboardLayout from "@/components/DashboardLayout"

export function TablesMakerPage() {
    // Lifted state so dashboard (editor) and ViewPage (preview) sync inside the resizable panels
    const [artist, setArtist] = useState("")
    const [album, setAlbum] = useState("")
    const [song, setSong] = useState("")
    const [style, setStyle] = useState<"Tabs" | "Chords" | "Both">("Tabs")
    const [details, setDetails] = useState("")
    const [showCapo, setShowCapo] = useState(false)
    const [capoFret, setCapoFret] = useState(1)
    const [tone, setTone] = useState<"Standard" | "Drop D" | "Half Step Down">("Standard")
    const [selectedLyrics, setSelectedLyrics] = useState<Array<{ title: string; text: string; details: string }>>([])

    return (
        <ResizablePanelGroup direction="horizontal" className="w-full h-full overflow-visible">
            <ResizablePanel defaultSize={25}>
                <div className="h-full p-6 bg-background">
                    <DashboardLayout
                        artist={artist}
                        setArtist={setArtist}
                        album={album}
                        setAlbum={setAlbum}
                        song={song}
                        setSong={setSong}
                        style={style}
                        setStyle={setStyle}
                        tone={tone}
                        setTone={setTone}
                        details={details}
                        setDetails={setDetails}
                        showCapo={showCapo}
                        setShowCapo={setShowCapo}
                        capoFret={capoFret}
                        setCapoFret={setCapoFret}
                        selectedLyrics={selectedLyrics}
                        setSelectedLyrics={setSelectedLyrics}
                    />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70}>
                <ViewPage artist={artist} album={album} song={song} style={style} details={details} showCapo={showCapo} capoFret={capoFret} tone={tone} selectedLyrics={selectedLyrics} />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
