"use client"

import React from "react"
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LogOut, User } from "lucide-react"

type NextLikeLinkProps = React.ComponentPropsWithoutRef<"a"> & { href: string }
const Link = React.forwardRef<HTMLAnchorElement, NextLikeLinkProps>(
    ({ href, children, ...props }, ref) => {
        return (
            <a href={href} ref={ref} {...props}>
                {children}
            </a>
        )
    }
)
Link.displayName = "Link"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Cupones de gasolina",
        href: "/beneficios",
        description:
            "Consulta y administra tus cupones de gasolina exclusivos para usuarios PaySafe.",
    },
    {
        title: "Entradas a eventos exclusivos",
        href: "/beneficios",
        description:
            "Alguna vez te imaginaste asistir a un concierto de tu artista favorito gratis? Con PaySafe es posible.",
    },
    {
        title: "Entradas de cine",
        href: "/beneficios",
        description:
            "Consulta y adquiere entradas para las mejores películas en cartelera.",
    },
    {
        title: "Creditos Banorte",
        href: "/beneficios",
        description: "Consulta tu Score Banorte y mejora tus beneficios.",
    },
    {
        title: "Fondo de inversión",
        href: "/beneficios",
        description:
            "Consulta y adquiere fondos de inversión exclusivos para usuarios PaySafe.",
    },
    {
        title: "Seguro de auto",
        href: "/beneficios",
        description:
            "Consulta y adquiere seguros de auto exclusivos para usuarios PaySafe.",
    },
]

export default function NavigationComp() {
    return (
        <nav className="w-full bg-background border-b sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center gap-6 h-16">
                    {/* Logo a la izquierda */}
                    <div className="flex items-center gap-4">
                        <a href="/" className="text-lg">
                            TabsMaker
                        </a>
                    </div>

                    <div className="ml-6">
                        <NavigationMenu viewport={false} className="overflow-visible">
                            <NavigationMenuList className="flex items-center gap-2">
                                <NavigationMenuItem className="relative p-2">
                                    <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                                    <NavigationMenuContent className="absolute left-0 top-full mt-2 z-50 w-[500px]">
                                        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="/"
                                                        className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none transition-all duration-200 select-none focus:shadow-md"
                                                    >
                                                        <div className="mb-2 text-lg font-medium mt-4 text-white">
                                                            PaySafe
                                                        </div>
                                                        <p className=" text-sm leading-tight text-white">
                                                            Disfrute de ingresos pasivos mientras explora el potencial de PaySafe.
                                                        </p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>

                                            <ListItem href="/" title="Introduccion" className="text-white">
                                                Conoce como funciona PaySafe y comienza a usarlo.
                                            </ListItem>
                                            <ListItem href="/" title="Proposito">
                                                Conoce el proposito detras de PaySafe y su impacto en la seguridad vial.
                                            </ListItem>
                                            <ListItem href="/" title="Funcionamiento">
                                                Conoce el funcionamiento de PaySafe y como nuestro dispositivo manda datos.
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem className="relative">
                                    <NavigationMenuTrigger>Creation</NavigationMenuTrigger>
                                    <NavigationMenuContent className="absolute left-0 top-full mt-2 z-50 w-[600px]">
                                        <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {components.map((component) => (
                                                <ListItem key={component.title} title={component.title} href={component.href}>
                                                    {component.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Controles a la derecha (esquina derecha) */}
                    <div className="ml-auto flex items-center gap-4">
                        <div className="hidden sm:block">
                            <Input type="email" placeholder="Search..." />
                        </div>
                        <div className="flex items-center gap-2">

                            <Link href="/profile">
                                <Button variant="ghost" className="px-2">
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </Button>
                            </Link>



                            <Button variant="ghost" className="px-2">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; title: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-muted/50 hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground"
                >
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}