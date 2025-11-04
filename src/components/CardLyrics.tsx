import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Props = {
    versesText?: string
    setVersesText?: (v: string) => void
    preChorusText?: string
    setPreChorusText?: (v: string) => void
    chorusText?: string
    setChorusText?: (v: string) => void
    bridgeText?: string
    setBridgeText?: (v: string) => void
    outroText?: string
    setOutroText?: (v: string) => void
    onInsert?: () => void
    rawText?: string
    // structured sections: key -> array of section texts (e.g. verses: [v1, v2], chorus: [c1])
    sections?: Record<string, string[]>
    // callback with current arrangement (id, title, text, chords)
    onArrange?: (arranged: { id: string; title: string; text: string; chords: string }[]) => void
}

export default function CardLyrics({
    versesText = "",
    setVersesText = () => { },
    preChorusText = "",
    setPreChorusText = () => { },
    chorusText = "",
    setChorusText = () => { },
    bridgeText = "",
    setBridgeText = () => { },
    outroText = "",
    setOutroText = () => { },
    onInsert,
    rawText,
    sections,
    onArrange,
}: Props) {
    // If structured sections are provided, render a draggable arranger with chords above each section
    if (sections) {
        const formatSectionKey = (k: string) => {
            if (k === 'verses') return 'Verse'
            if (k === 'pre_chorus' || k === 'pre-chorus') return 'Pre-Chorus'
            if (k === 'chorus') return 'Chorus'
            if (k === 'bridge') return 'Bridge'
            if (k === 'outro') return 'Outro'
            return k.charAt(0).toUpperCase() + k.slice(1)
        }

        const initial = Object.entries(sections).flatMap(([key, arr]) =>
            arr.map((text, idx) => ({ id: `${key}-${idx}`, title: `${formatSectionKey(key)}${arr.length > 1 ? ' ' + (idx + 1) : ''}`, text, chords: '' }))
        )

        const [items, setItems] = useState(initial)

        const formatItemsForParent = (newItems: typeof items) => {
            onArrange && onArrange(newItems.map((it) => ({ id: it.id, title: it.title, text: it.text, chords: it.chords })))
        }

        const handleDragStart = (e: React.DragEvent, idx: number) => {
            e.dataTransfer.setData('text/plain', String(idx))
            e.dataTransfer.effectAllowed = 'move'
        }

        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'move'
        }

        const handleDrop = (e: React.DragEvent, toIdx: number) => {
            e.preventDefault()
            const fromIdx = Number(e.dataTransfer.getData('text/plain'))
            if (Number.isNaN(fromIdx)) return
            if (fromIdx === toIdx) return
            setItems((prev) => {
                const copy = [...prev]
                const [moved] = copy.splice(fromIdx, 1)
                copy.splice(toIdx, 0, moved)
                formatItemsForParent(copy)
                return copy
            })
        }

        const updateChords = (idx: number, val: string) => {
            setItems((prev) => {
                const copy = [...prev]
                copy[idx] = { ...copy[idx], chords: val }
                formatItemsForParent(copy)
                return copy
            })
        }

        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Arrange Sections</CardTitle>
                    <CardDescription>Drag to reorder sections. Add chords above each section.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {items.map((it, idx) => (
                            <div key={it.id} className="bg-card p-3 rounded-md border">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="font-medium">{it.title}</div>
                                    <div className="text-xs text-muted-foreground">drag · drop</div>
                                </div>
                                <div
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, idx)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, idx)}
                                    className="space-y-2"
                                >
                                    <textarea
                                        placeholder="Chords (one line per chord line)"
                                        value={it.chords}
                                        onChange={(e) => updateChords(idx, e.target.value)}
                                        className="w-full resize-none rounded-md border p-2 text-sm bg-muted"
                                        rows={2}
                                    />
                                    <div className="whitespace-pre-wrap text-sm">{it.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        )
    }

    // If rawText is provided, render a read-only lyrics view (user requested lyrics only, not editable)
    if (rawText) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Lyrics</CardTitle>
                    <CardDescription>Credits to Genius and his contributors for the Lyrics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none whitespace-pre-wrap text-sm text-foreground">{rawText}</div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Lyrics / Sections</CardTitle>
                <CardDescription>Edit the different sections of the song</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3">
                    <div>
                        <Label>Verses</Label>
                        <Textarea value={versesText} onChange={(e) => setVersesText(e.target.value)} className="resize-none" />
                    </div>
                    <div>
                        <Label>Pre-Chorus</Label>
                        <Textarea value={preChorusText} onChange={(e) => setPreChorusText(e.target.value)} className="resize-none" />
                    </div>
                    <div>
                        <Label>Chorus</Label>
                        <Textarea value={chorusText} onChange={(e) => setChorusText(e.target.value)} className="resize-none" />
                    </div>
                    <div>
                        <Label>Bridge</Label>
                        <Textarea value={bridgeText} onChange={(e) => setBridgeText(e.target.value)} className="resize-none" />
                    </div>
                    <div>
                        <Label>Outro</Label>
                        <Textarea value={outroText} onChange={(e) => setOutroText(e.target.value)} className="resize-none" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex w-full justify-end gap-2">
                    <Button onClick={onInsert}>Insert sections</Button>
                </div>
            </CardFooter>
        </Card>
    )
}
