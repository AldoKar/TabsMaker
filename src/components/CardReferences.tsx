import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'


const mockUsers = [
    {
        id: 1,
        name: 'Ana López',
        rating: 5,
        comment: 'Muy clara y útil, clavé el riff.',
    },
    {
        id: 2,
        name: 'Miguel Torres',
        rating: 4,
        comment: 'Bien estructurada, pero falta el outro.',
    },
    {
        id: 3,
        name: 'Beth Díaz',
        rating: 5,
        comment: 'Perfecta para tocar en vivo.',
    },
]

const Stars = ({ count }: { count: number }) => {
    return (
        <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < count ? 'opacity-100' : 'opacity-30'}>★</span>
            ))}
        </div>
    )
}

type Props = {
    artist?: string
    album?: string
    song?: string
    onUse?: (content: string) => void
}

const CardReferences: React.FC<Props> = ({ artist, album, song, onUse }) => {
    return (
        <div>
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle>References & Tabs of others</CardTitle>
                    <CardDescription>{artist ? `${artist}${album ? ' / ' + album : ''}${song ? ' / ' + song : ''}` : 'Here you can guiate for another tabs that TabsMaker users made.'}</CardDescription>

                </CardHeader>
                <CardContent>

                    <div className="mt-4 space-y-3 h-full">
                        {mockUsers.map((u) => (
                            <div key={u.id} className="flex items-start gap-3 p-3 rounded-md bg-muted">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">{u.name.split(' ').map(n => n[0]).join('')}</div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-medium">{u.name}</div>
                                        <Stars count={u.rating} />
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">{u.comment}</div>
                                </div>
                                <div>
                                    <div className="flex flex-col gap-2">
                                        <Button variant="outline" size="sm" onClick={() => onUse && onUse('TAB_SNIPPET_FOR_' + u.id)}>Use this tab</Button>
                                        <Button size="sm">View</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default CardReferences
