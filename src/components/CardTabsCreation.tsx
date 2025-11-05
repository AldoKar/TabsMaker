import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
    selectedLyrics?: Array<{ title: string; text: string; details: string }>
    onAddTab?: (sectionTitle: string, tab: string) => void
}

const STRINGS = ['e', 'B', 'G', 'D', 'A', 'E']

export default function CardTabsCreation({ selectedLyrics = [], onAddTab }: Props) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [tabsData, setTabsData] = useState<Record<number, Record<string, string>>>({})

    const currentSection = selectedLyrics[currentSlide]

    // Generate default tab line with brackets
    const getDefaultTabLine = () => {
        return ' - - ' + Array(5).fill('[]').join(' - - ') + ' - - '
    }

    const handleStringChange = (stringName: string, value: string) => {
        setTabsData(prev => ({
            ...prev,
            [currentSlide]: {
                ...(prev[currentSlide] || {}),
                [stringName]: value
            }
        }))
    }

    const getCurrentTabLines = () => {
        const defaultLine = getDefaultTabLine()
        return tabsData[currentSlide] || {
            e: defaultLine,
            B: defaultLine,
            G: defaultLine,
            D: defaultLine,
            A: defaultLine,
            E: defaultLine
        }
    }

    const handleAddToPreview = () => {
        const currentLines = getCurrentTabLines()
        // Process each line: replace [number] with number, [] with -
        // Always print all strings, even if empty
        const formattedTab = STRINGS.map(str => {
            const line = currentLines[str] || getDefaultTabLine()
            const processed = line.replace(/\[(\d+)\]/g, '$1').replace(/\[\]/g, '-')
            return `${str}|${processed}|`
        }).join('\n')
        const withName = currentSection ? `${currentSection.title}:\n${formattedTab}` : formattedTab
        onAddTab && onAddTab(currentSection?.title || '', withName)
    }

    const handleClear = () => {
        setTabsData(prev => {
            const newData = { ...prev }
            delete newData[currentSlide]
            return newData
        })
    }

    const handlePrevSlide = () => {
        if (currentSlide > 0) setCurrentSlide(currentSlide - 1)
    }

    const handleNextSlide = () => {
        if (currentSlide < selectedLyrics.length - 1) setCurrentSlide(currentSlide + 1)
    }

    if (!selectedLyrics || selectedLyrics.length === 0) {
        return (
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle>Create Tabs</CardTitle>
                    <CardDescription>Select sections in the lyrics card to create tabs</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No sections selected. Check the boxes in the lyrics card to start creating tabs.
                    </p>
                </CardContent>
            </Card>
        )
    }

    const currentTabLines = getCurrentTabLines()

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Create Tabs</CardTitle>
                        <CardDescription>
                            {currentSection?.title} ({currentSlide + 1} of {selectedLyrics.length})
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handlePrevSlide}
                            disabled={currentSlide === 0}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleNextSlide}
                            disabled={currentSlide === selectedLyrics.length - 1}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {currentSection?.details && (
                        <div className="text-xs text-muted-foreground italic bg-muted/30 p-2 rounded">
                            {currentSection.details}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label>Strings</Label>
                        {STRINGS.map((stringName) => (
                            <div key={stringName} className="flex items-center gap-2">
                                <span className="w-6 font-mono text-sm font-semibold">{stringName}|</span>
                                <Input
                                    value={currentTabLines[stringName] || getDefaultTabLine()}
                                    onChange={(e) => handleStringChange(stringName, e.target.value)}
                                    placeholder="[]-[]-[]-[]-[]-[]-[]-[]-[]-[]"
                                    className="font-mono text-sm"
                                />
                                <span className="font-mono text-sm">|</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={handleAddToPreview} className="flex-1">
                            Add to Preview
                        </Button>
                        <Button onClick={handleClear} variant="outline">
                            Clear
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
