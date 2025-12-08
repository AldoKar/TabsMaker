import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

type Props = {
    artists?: string[]
    albums?: string[]
    songs?: any[]
    artist?: string
    setArtist?: (v: string) => void
    album?: string
    setAlbum?: (v: string) => void
    song?: string
    setSong?: (v: string) => void
    onConfirm?: () => void
}

export default function CardSong({
    artists = [],
    albums = [],
    songs = [],
    artist = "",
    setArtist = () => { },
    album = "",
    setAlbum = () => { },
    song = "",
    setSong = () => { },
}: Props) {
    // const [createMode, setCreateMode] = useState(false)

    // local temp values when creating a new song
    // const [newArtist, setNewArtist] = useState(artist)
    // const [newAlbum, setNewAlbum] = useState(album)
    // const [newSong, setNewSong] = useState(song)

    // function toggleCreateMode(checked: boolean) {
    //     setCreateMode(checked)
    //     if (checked) {
    //         // clear shared state so inputs start empty
    //         setArtist("")
    //         setAlbum("")
    //         setSong("")
    //         setNewArtist("")
    //         setNewAlbum("")
    //         setNewSong("")
    //     } else {
    //         // cancel creation: keep local new values but do not apply
    //     }
    // }

    // function applyNew() {
    //     // apply the local new values to the shared state
    //     setArtist(newArtist)
    //     setAlbum(newAlbum)
    //     setSong(newSong)
    // }

    // const canConfirm = createMode ? newArtist && newAlbum && newSong : !!song

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Song selector</CardTitle>
                <CardDescription>Choose artist, album and song — or create a new one</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    

                        <>
                            <div className="grid gap-2 ">
                                <Label className="w-full">Artist</Label>
                                <Select value={artist} onValueChange={(v) => setArtist(v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select artist" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {artists.map((a) => (
                                            <SelectItem key={a} value={a}>
                                                {a}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Album</Label>
                                <Select value={album} onValueChange={(v) => setAlbum(v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select album" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {albums.map((al) => (
                                            <SelectItem key={al} value={al}>
                                                {al}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Song</Label>
                                <Select value={song} onValueChange={(v) => setSong(v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select song" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {songs.map((s: any) => (
                                            <SelectItem key={s.cancion || s} value={s.cancion || s}>
                                                {s.cancion || s}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    
                </div>
            </CardContent>
        </Card>
    )
}
