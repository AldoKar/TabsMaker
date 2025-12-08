import CardSong from "@/components/CardSong"
import CardLyrics from "@/components/CardLyrics"
import CardStyleDetails from "@/components/CardStyleDetails"
import songsData from "../data/songs.json"
// UI primitives not required in this layout file
import CardReferences from "./CardReferences"
import CardVideo from "@/components/CardVideo"
import CardTabsCreation from "./CardTabsCreation"

export default function DashboardLayout({
    artist,
    setArtist,
    album,
    setAlbum,
    song,
    setSong,
    style,
    setStyle,
    tone,
    setTone,
    details,
    setDetails,
    showCapo,
    setShowCapo,
    capoFret,
    setCapoFret,
    selectedLyrics,
    setSelectedLyrics,
}: any) {
    const artists = Object.keys(songsData || {})
    const albums = artist && (songsData as any)[artist] ? Object.keys((songsData as any)[artist]) : []
    const songs = artist && album && (songsData as any)[artist] && (songsData as any)[artist][album] ? (songsData as any)[artist][album] : []
    const selectedSong = song ? songs.find((s: any) => s.cancion === song) : null
    const lyricsRaw = selectedSong?.letra?.raw || ""
    const lyricsSections = selectedSong?.letra?.sections || null

    return (
        <div className="w-full">
            <div className="grid gap-4 mb-3 items-stretch grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
                <div className="h-full">
                    <CardSong
                        artists={artists}
                        artist={artist}
                        setArtist={setArtist}
                        albums={albums}
                        songs={songs}
                        album={album}
                        setAlbum={setAlbum}
                        song={song}
                        setSong={setSong}
                    />
                </div>
                <div className="h-full">
                    <CardStyleDetails
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
                    />
                </div>
                <div className="h-full">
                    <CardReferences
                        artist={artist}
                        album={album}
                        song={song}
                        onUse={(tab: string) => setDetails((prev: string) => (prev ? prev + "\n\n" + tab : tab))}
                    />
                </div>

            </div>

            <div className="grid gap-4 mb-3 items-stretch grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
                <div className="h-full">
                    <CardLyrics
                        sections={lyricsSections}
                        rawText={lyricsRaw}
                        onArrange={(arranged) => {
                            // No longer updating details, instead updating selectedLyrics state
                            setSelectedLyrics(arranged)
                        }}
                    />
                </div>
                <div className="h-full">
                    <CardTabsCreation 
                        selectedLyrics={selectedLyrics}
                        onAddTab={(_sectionTitle, tab) => setDetails((prev: string) => (prev ? prev + "\n\n" + tab : tab))}
                    />
                </div>

                <div className="h-full">
                    <CardVideo
                        artist={artist}
                        album={album}
                        song={song}
                        onUse={(tab: string) => setDetails((prev: string) => (prev ? prev + "\n\n" + tab : tab))}
                    />
                </div>

            </div>
        </div>
    )
}
