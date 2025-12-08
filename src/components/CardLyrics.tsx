import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

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
    // callback with current arrangement (title, text, details)
    onArrange?: (arranged: { title: string; text: string; details: string }[]) => void
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
    // Build a typed items array from sections. Hooks must be at top-level so we construct state here.
    type Item = { id: string; title: string; text: string; selected: boolean; details: string }

    const buildInitial = (s?: Record<string, string[]>) => {
        if (!s) return [] as Item[]
        const formatSectionKey = (k: string) => {
            if (k === 'verses') return 'Verse'
            if (k === 'pre_chorus' || k === 'pre-chorus') return 'Pre-Chorus'
            if (k === 'chorus') return 'Chorus'
            if (k === 'bridge') return 'Bridge'
            if (k === 'outro') return 'Outro'
            return k.charAt(0).toUpperCase() + k.slice(1)
        }
        return Object.entries(s).flatMap(([key, arr]) =>
            arr.map((text, idx) => ({ id: `${key}-${idx}`, title: `${formatSectionKey(key)}${arr.length > 1 ? ' ' + (idx + 1) : ''}`, text, selected: false, details: '' }))
        )
    }

    const [items, setItems] = useState<Item[]>(() => buildInitial(sections))

    // Reset items when sections prop changes
    useEffect(() => {
        setItems(buildInitial(sections))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sections])

    const formatItemsForParent = (newItems: Item[]) => {
        const filtered = newItems.filter((it) => it.selected)
        onArrange && onArrange(filtered.map((it) => ({ title: it.title, text: it.text, details: it.details })))
    }

    function updateSelected(idx: number, val: boolean) {
        setItems((prev) => {
            const copy = [...prev]
            copy[idx] = { ...copy[idx], selected: val }
            formatItemsForParent(copy)
            return copy
        })
    }

    function updateDetails(idx: number, val: string) {
        setItems((prev) => {
            const copy = [...prev]
            copy[idx] = { ...copy[idx], details: val }
            formatItemsForParent(copy)
            return copy
        })
    }

    // If rawText is provided, render a read-only lyrics view (user requested lyrics only, not editable)
    if (sections) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Arrange Sections</CardTitle>
                    <CardDescription>Select sections to include in your tab.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {items.map((it, idx) => (
                            <div key={it.id} className="bg-card p-3 rounded-md border">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Checkbox 
                                            checked={it.selected} 
                                            onCheckedChange={(checked) => updateSelected(idx, !!checked)} 
                                        />
                                        <div className="font-medium">{it.title}</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {it.selected && (
                                        <Textarea
                                            placeholder="Details for this section (e.g., strumming pattern, notes, etc.)"
                                            value={it.details}
                                            onChange={(e) => updateDetails(idx, e.target.value)}
                                            className="w-full resize-none rounded-md border p-2 text-sm bg-muted"
                                            rows={2}
                                        />
                                    )}
                                    <div className="whitespace-pre-wrap text-sm">{it.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        )
    }

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
