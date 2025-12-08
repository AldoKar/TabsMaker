import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type CardItem = {
    id: string
    title: string
    content: string
}

export default function DashboardCards({
    artist,
    album,
    song,
}: {
    artist: string
    album: string
    song: string
}) {
    const [cards, setCards] = useState<CardItem[]>([
        { id: "c1", title: song || "Chords / Tabs", content: "" },
    ])

    function addCard() {
        setCards((s) => [...s, { id: `c${Date.now()}`, title: "New Card", content: "" }])
    }

    function updateCard(id: string, patch: Partial<CardItem>) {
        setCards((s) => s.map((c) => (c.id === id ? { ...c, ...patch } : c)))
    }

    function removeCard(id: string) {
        setCards((s) => s.filter((c) => c.id !== id))
    }

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Artist: {artist} — Album: {album} — Song: {song}</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={addCard}>Add card</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {cards.map((c) => (
                    <Card key={c.id} className="w-full">
                        <CardHeader>
                            <CardTitle>
                                <Input
                                    value={c.title}
                                    onChange={(e) => updateCard(c.id, { title: e.target.value })}
                                    className="w-full"
                                />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <textarea
                                className="w-full h-40 rounded-md border p-2 text-sm"
                                value={c.content}
                                onChange={(e) => updateCard(c.id, { content: e.target.value })}
                                placeholder="Enter chords or tabs here"
                            />
                        </CardContent>
                        <CardFooter>
                            <div className="w-full flex justify-end gap-2">
                                <Button variant="destructive" onClick={() => removeCard(c.id)}>
                                    Remove
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
