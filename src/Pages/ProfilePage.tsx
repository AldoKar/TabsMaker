import { useState } from "react"

type Profile = {
    name: string
    handle: string
    location?: string
    bio?: string
    genres: string[]
    topArtists: string[]
    topSongs: string[]
    followers: number
    following: number
}

type UserTab = {
    id: string
    title: string
    song: string
    rating: number
    likes: number
    createdAt: string
}

export default function ProfilePage() {
    const [editing, setEditing] = useState(false)
    const [profile, setProfile] = useState<Profile>({
        name: "Aldo Karim",
        handle: "@aldokarim",
        location: "Monterrey, Mexico",
        bio: "Apasionado por el indie y el lo-fi. Siempre en busca de guitarras con carácter.",
        genres: ["Indie", "Lo‑fi", "Alternative", "Electronica"],
        topArtists: ["The Neighbourhood", "Tame Impala", "Beach House"],
        topSongs: ["Sweater Weather", "The Less I Know The Better", "Myth"],
        followers: 1240,
        following: 312,
    })

    const [userTabs] = useState<UserTab[]>([
        { id: "t1", title: "Sweater Weather - Full Tab", song: "Sweater Weather", rating: 4.9, likes: 342, createdAt: "2024-03-12" },
        { id: "t2", title: "Wiped Out! - Intro Riff", song: "Wiped Out!", rating: 4.8, likes: 210, createdAt: "2024-05-01" },
        { id: "t3", title: "Lo-Fi Arpeggios", song: "Original", rating: 4.7, likes: 187, createdAt: "2024-02-20" },
        { id: "t4", title: "Ambient Chords (Both)", song: "Original", rating: 4.6, likes: 143, createdAt: "2024-01-10" },
        { id: "t5", title: "Simple Bassline", song: "Cover", rating: 4.5, likes: 98, createdAt: "2023-12-05" },
        { id: "t6", title: "Experimental Tab", song: "Original", rating: 4.1, likes: 32, createdAt: "2024-06-15" },
    ])

    const [form, setForm] = useState(profile)

    function startEdit() {
        setForm(profile)
        setEditing(true)
    }

    function save() {
        setProfile(form)
        setEditing(false)
    }

    function renderStars(rating: number) {
        const full = Math.floor(rating)
        const half = rating - full >= 0.5
        const empty = 5 - full - (half ? 1 : 0)
        return (
            <span className="text-yellow-400">
                {"★".repeat(full)}
                {half ? "⯪" : ""}
                {"☆".repeat(empty)}
            </span>
        )
    }

    const top5 = [...userTabs].sort((a, b) => b.rating - a.rating).slice(0, 5)

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 flex items-center justify-center text-xl font-semibold text-white">
                    {profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-2xl font-bold">{profile.name}</h1>
                            <div className="text-sm text-gray-500">{profile.handle}</div>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <button className="px-3 py-1 border rounded-md text-sm hover:bg-muted/10">Follow</button>
                            <button
                                className="px-3 py-1 bg-primary text-white rounded-md text-sm hover:opacity-90"
                                onClick={editing ? save : startEdit}
                            >
                                {editing ? "Save" : "Edit profile"}
                            </button>
                        </div>
                    </div>

                    <div className="mt-2 text-sm text-gray-500 flex gap-4">
                        <div>{profile.location}</div>
                        <div>{profile.followers} followers</div>
                        <div>{profile.following} following</div>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <section className="md:col-span-2 bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">About</h2>
                        <div className="text-sm text-gray-500">{profile.topArtists.length} favorite artists</div>
                    </div>

                    {!editing ? (
                        <>
                            <p className="text-sm text-gray-500 mb-4">{profile.bio}</p>

                            <div className="mb-4">
                                <h3 className="text-sm font-medium mb-2">Favorite genres</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.genres.map((g) => (
                                        <span key={g} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                            {g}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-sm font-medium mb-2">Top artists</h3>
                                <ul className="list-inside list-disc text-sm space-y-1">
                                    {profile.topArtists.map((a) => (
                                        <li key={a} className="text-sm">{a}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-sm font-medium mb-2">Top songs</h3>
                                <ol className="list-inside list-decimal text-sm space-y-1">
                                    {profile.topSongs.map((s) => (
                                        <li key={s} className="text-sm">{s}</li>
                                    ))}
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-3">Top 5 tabs (mejor valoradas)</h3>
                                <div className="space-y-3">
                                    {top5.map((t) => (
                                        <div key={t.id} className="flex items-center justify-between p-3 border rounded-md">
                                            <div>
                                                <div className="font-medium">{t.title}</div>
                                                <div className="text-xs text-gray-500">{t.song} • {new Date(t.createdAt).toLocaleDateString()}</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col items-end">
                                                    <div className="text-sm">{renderStars(t.rating)}</div>
                                                    <div className="text-xs text-gray-500">{t.rating.toFixed(1)}</div>
                                                </div>
                                                <div className="text-xs text-gray-500">{t.likes} likes</div>
                                                <button className="text-sm px-3 py-1 border rounded-md bg-gray-50">View</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-3">
                                <div>
                                    <label className="block text-sm mb-1">Name</label>
                                    <input
                                        className="w-full px-3 py-2 border rounded-md input"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-1">Handle</label>
                                    <input
                                        className="w-full px-3 py-2 border rounded-md input"
                                        value={form.handle}
                                        onChange={(e) => setForm({ ...form, handle: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-1">Location</label>
                                    <input
                                        className="w-full px-3 py-2 border rounded-md input"
                                        value={form.location}
                                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-1">Bio</label>
                                    <textarea
                                        className="w-full px-3 py-2 border rounded-md textarea"
                                        value={form.bio}
                                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-1">Genres (comma separated)</label>
                                    <input
                                        className="w-full px-3 py-2 border rounded-md input"
                                        value={form.genres.join(", ")}
                                        onChange={(e) =>
                                            setForm({ ...form, genres: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-1">Top artists (comma separated)</label>
                                    <input
                                        className="w-full px-3 py-2 border rounded-md input"
                                        value={form.topArtists.join(", ")}
                                        onChange={(e) =>
                                            setForm({ ...form, topArtists: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-1">Top songs (comma separated)</label>
                                    <input
                                        className="w-full px-3 py-2 border rounded-md input"
                                        value={form.topSongs.join(", ")}
                                        onChange={(e) =>
                                            setForm({ ...form, topSongs: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                                        }
                                    />
                                </div>

                                <div className="flex gap-2 mt-2">
                                    <button
                                        className="px-3 py-1 bg-primary text-white rounded-md"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            save()
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="px-3 py-1 border rounded-md"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setEditing(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </section>

                <aside className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium mb-3">Activity</h3>
                    <div className="text-sm text-gray-500 mb-4">Recent likes, follows and shares will appear here.</div>

                    <div className="space-y-3">
                        <div className="text-sm">
                            <div className="font-medium">Liked</div>
                            <div className="text-gray-500 text-xs">21 tracks</div>
                        </div>

                        <div className="text-sm">
                            <div className="font-medium">Playlists</div>
                            <div className="text-gray-500 text-xs">3 public</div>
                        </div>

                        <div className="text-sm">
                            <div className="font-medium">Joined</div>
                            <div className="text-gray-500 text-xs">Mar 2024</div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}