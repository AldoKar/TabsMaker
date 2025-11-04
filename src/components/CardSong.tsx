import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

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
    onConfirm,
}: Props) {
    const [createMode, setCreateMode] = useState(false)

    // local temp values when creating a new song
    const [newArtist, setNewArtist] = useState(artist)
    const [newAlbum, setNewAlbum] = useState(album)
    const [newSong, setNewSong] = useState(song)

    function toggleCreateMode(checked: boolean) {
        setCreateMode(checked)
        if (checked) {
            // clear shared state so inputs start empty
            setArtist("")
            setAlbum("")
            setSong("")
            setNewArtist("")
            setNewAlbum("")
            setNewSong("")
        } else {
            // cancel creation: keep local new values but do not apply
        }
    }

    function applyNew() {
        // apply the local new values to the shared state
        setArtist(newArtist)
        setAlbum(newAlbum)
        setSong(newSong)
    }

    const canConfirm = createMode ? newArtist && newAlbum && newSong : !!song

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Song selector</CardTitle>
                <CardDescription>Choose artist, album and song — or create a new one</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
                            <Checkbox
                                id="toggle-2"
                                className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                                onCheckedChange={(checked) => toggleCreateMode(!!checked)}
                            />
                            <div className="grid gap-1.5 font-normal">
                                <p className="text-sm leading-none font-medium">
                                    Create the tab of your own song
                                </p>
                            </div>
                        </Label>
                    </div>

                    {createMode ? (
                        <div className="grid gap-2">
                            <div className="grid gap-2">
                                <Label>Artist</Label>
                                <Input value={newArtist} onChange={(e) => setNewArtist(e.target.value)} placeholder="Artist name" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Album</Label>
                                <Input value={newAlbum} onChange={(e) => setNewAlbum(e.target.value)} placeholder="Album name" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Song</Label>
                                <Input value={newSong} onChange={(e) => setNewSong(e.target.value)} placeholder="Song name" />
                            </div>
                        </div>
                    ) : (
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
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
