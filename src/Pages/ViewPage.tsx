// ViewPage: preview-only component (receives props from parent)

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

function TablaturePreview({ tabLines }: { tabLines: string[] }) {
    return (
        <div className="w-full overflow-auto rounded-md border bg-muted p-4">
            <pre className="font-mono text-sm leading-5 whitespace-pre">{tabLines.join("\n")}</pre>
        </div>
    )
}

export default function ViewPage({
    artist,
    album,
    song,
    style,
    details,
    showCapo,
    tone
}: {
    artist?: string
    album?: string
    song?: string
    style?: "Tabs" | "Chords" | "Both"
    details?: string
    showCapo?: boolean
    tone?: "Standard" | "Drop D" | "Half Step Down"
}) {
    // Datos falsos para mostrar la estructura de una tablatura
    const fakeArtist = "The Neighbourhood"
    const fakeAlbum = "Wiped Out!"
    const fakeSong = "Sweater Weather"

    const exampleTab = [
        `Song: ${song || fakeSong}`,
        `Artist: ${artist || fakeArtist}    Album: ${album || fakeAlbum}`,
        "",
        "e|------------------0---0---2---3---|",
        "B|------------------1---1---3---0---|",
        "G|------------------0---2---2---0---|",
        "D|------------------2---2---0---0---|",
        "A|--0---0---0---0---3---0-------2---|",
        "E|--3---3---3---3----------------3--|",
        "",
        "Intro:  | G  | Em | C  | D  |",
        "",
        "Verse:",
        "e|--3-3-3-3--0-0-0-0--0-0-0-0--2-2-2-2-|",
        "B|--3-3-3-3--0-0-0-0--1-1-1-1--3-3-3-3-|",
        "G|--0-0-0-0--0-0-0-0--0-0-0-0--2-2-2-2-|",
        "D|-------------------------------------|",
        "A|-------------------------------------|",
        "E|-------------------------------------|",
        "",
        "(capo optional)",
    ]

    return (
        <div className="flex h-full w-full p-6 gap-4">
            {/* Preview as card */}
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>Here is how your tabs will look like</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex items-center gap-4">
                        <div className="mb-4">
                            <div className="text-sm text-gray-500">Song</div>
                            <div className="text-lg mb-3">{song || fakeSong}</div>
                        </div>

                        <div className="mb-4">
                            <div className="text-sm text-gray-500">Artist</div>
                            <div className="text-lg mb-3">{artist || fakeArtist}</div>
                        </div>

                        <div className="mb-4">
                            <div className="text-sm text-gray-500">Album</div>
                            <div className="text-lg mb-3">{album || fakeAlbum}</div>
                        </div>
                    </div>
                    <div className="mb-4 flex items-center gap-4">
                        <div className="mb-4">
                            <div className="text-sm text-gray-500">Style</div>
                            <div className="text-lg mb-3">{style}</div>
                        </div>
                        <div className="mb-4">
                            <div className="text-sm text-gray-500">Tone</div>
                            <div className="text-lg mb-3">{tone}</div>
                        </div>
                        <div className="mb-4">
                            <div className="text-sm text-gray-500">Capo</div>
                            <div className="text-lg mb-3">{showCapo ? "On" : "Off"}</div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="text-sm text-gray-500">Details</div>
                        <div className="prose max-w-none text-sm">{details || "No details provided."}</div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-md font-medium mb-2">Tablature</h3>
                        <TablaturePreview tabLines={exampleTab} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}