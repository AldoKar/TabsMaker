import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

type Props = {
    style: "Tabs" | "Chords" | "Both"
    setStyle: (v: "Tabs" | "Chords" | "Both") => void
    tone: string
    setTone: (v: string) => void
    details: string
    setDetails: (v: string) => void
    showCapo: boolean
    setShowCapo: (v: boolean) => void
    capoFret?: number
    setCapoFret?: (v: number) => void
}

export default function CardStyleDetails({ style, setStyle, tone, setTone, details, setDetails, showCapo, setShowCapo, capoFret, setCapoFret }: Props) {
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Style & Details</CardTitle>
                <CardDescription>Configure tabs/chords styling and extra notes</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3">
                    <div>
                        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
                            <Checkbox
                                id="toggle-2"
                                checked={showCapo}
                                className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                                onCheckedChange={(checked) => setShowCapo(!!checked)}
                            />
                            <div className="grid gap-1.5 font-normal">
                                <p className="text-sm leading-none font-medium">
                                    If you are using Capo, check this option
                                </p>
                            </div>
                        </Label>
                        {showCapo && (
                            <div className="pt-2">
                                <FieldLabel htmlFor="capo-fret">Capo Fret</FieldLabel>
                                <Input
                                    id="capo-fret"
                                    type="text"
                                    value={capoFret ?? ''}
                                    onChange={(e) => setCapoFret && setCapoFret(parseInt(e.target.value) || 0)}
                                    className="w-24"
                                    placeholder="1"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <FieldLabel htmlFor="style-select">Style</FieldLabel>
                        <Select value={style} onValueChange={(v) => setStyle(v as any)}>
                            <SelectTrigger id="style-select">
                                <SelectValue placeholder="Tabs" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Tabs">Tabs</SelectItem>
                                <SelectItem value="Chords">Chords</SelectItem>
                                <SelectItem value="Both">Both</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <FieldLabel htmlFor="tone-select">Tone</FieldLabel>
                        <Select value={tone} onValueChange={(v) => setTone(v)}>
                            <SelectTrigger id="tone-select">
                                <SelectValue placeholder="Standard" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Standard">Standard</SelectItem>
                                <SelectItem value="Drop D">Drop D</SelectItem>
                                <SelectItem value="Half Step Down">Half Step Down</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <FieldLabel htmlFor="details">Details</FieldLabel>
                        <Textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} />
                    </div>

                </div>
            </CardContent>

        </Card>
    )
}
