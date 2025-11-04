import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import songsData from "../data/songs.json"

type CardArtistProps = {
    artist: string
    setArtist: (v: string) => void
    album: string
    setAlbum: (v: string) => void
    song: string
    setSong: (v: string) => void
    onConfirm?: () => void
}

export function CardArtist({
    artist,
    setArtist,
    album,
    setAlbum,
    song,
    setSong,
    onConfirm,
}: CardArtistProps) {
    const artists = Object.keys(songsData)
    const albums = artist && (songsData as any)[artist] ? Object.keys((songsData as any)[artist]) : []
    const songs = artist && album && (songsData as any)[artist] && (songsData as any)[artist][album] ? (songsData as any)[artist][album] : []

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Song, Artist & Album</CardTitle>
                <CardDescription>Choose artist, album and song</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="artist">Artist</Label>
                        <Select
                            value={artist}
                            onValueChange={(v) => {
                                setArtist(v)
                                setAlbum("")
                                setSong("")
                            }}
                        >
                            <SelectTrigger id="artist-select">
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
                        <Label htmlFor="album">Album</Label>
                        <Select
                            value={album}
                            onValueChange={(v) => {
                                setAlbum(v)
                                setSong("")
                            }}
                        >
                            <SelectTrigger id="album-select">
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
                        <Label htmlFor="song">Song</Label>
                        <Select
                            value={song}
                            onValueChange={(v) => {
                                setSong(v)
                            }}
                        >
                            <SelectTrigger id="song-select">
                                <SelectValue placeholder="Select song" />
                            </SelectTrigger>
                            <SelectContent>
                                {songs.map((s: any) => (
                                    <SelectItem key={s.cancion} value={s.cancion}>
                                        {s.cancion}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="button" disabled={!song} onClick={() => onConfirm && onConfirm()}>
                    Confirm
                </Button>
            </CardFooter>
        </Card>
    )
}
