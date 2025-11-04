import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import songsData from "../data/songs.json"

type Props = {
    artist?: string
    album?: string
    song?: string
    onUse?: (content: string) => void
}

function toEmbedUrl(raw?: string | null) {
    if (!raw) return null
    try {
        if (raw.includes('youtu.be/')) {
            const id = raw.split('youtu.be/')[1].split(/[?&]/)[0]
            return `https://www.youtube.com/embed/${id}`
        }
        if (raw.includes('watch?v=')) {
            const id = raw.split('watch?v=')[1].split(/[?&]/)[0]
            return `https://www.youtube.com/embed/${id}`
        }
        if (raw.includes('youtube.com/embed/')) return raw
        return raw
    } catch (e) {
        return null
    }
}

const CardVideo: React.FC<Props> = ({ artist, album, song }) => {
    let embedUrl: string | null = null
    if (artist && album && song) {
        const list = (songsData as any)[artist]?.[album] || []
        const found = list.find((s: any) => s.cancion === song)
        const raw = found?.video || (found?.letra && found.letra.video) || null
        embedUrl = toEmbedUrl(raw)
    }

    if (!embedUrl) {
        const soft = (songsData as any)["The Neighbourhood"]
            ? Object.values((songsData as any)["The Neighbourhood"]).flat().find((s: any) => s.cancion === 'Softcore')
            : null
        const raw = (soft as any)?.video || null
        embedUrl = toEmbedUrl(raw)
    }

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Video</CardTitle>
                <CardDescription>Official / related video (from songs.json)</CardDescription>
            </CardHeader>
            <CardContent>
                {embedUrl ? (
                    <div className="relative" style={{ paddingTop: '56.25%' }}>
                        <iframe
                            title={song ? `${song} - video` : 'video'}
                            src={embedUrl}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute left-0 top-0 w-full h-full rounded-md"
                        />
                    </div>
                ) : (
                    <div>No video available for this selection</div>
                )}
            </CardContent>
        </Card>
    )
}

export default CardVideo
