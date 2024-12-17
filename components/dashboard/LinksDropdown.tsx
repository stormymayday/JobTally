"use client";

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import links from "@/utils/links";
import Link from "next/link";

function LinksDropdown() {
    const [open, setOpen] = useState(false);

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                    <AlignLeft />
                    <span className="sr-only">Toggle links</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-52 lg:hidden"
                align="start"
                sideOffset={25}
            >
                {links.map((link) => {
                    return (
                        <DropdownMenuItem key={link.href}>
                            <Link
                                href={link.href}
                                className="flex items-center gap-x-2"
                                onClick={handleLinkClick}
                            >
                                {link.icon}{" "}
                                <span className="capitalize">{link.label}</span>
                            </Link>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
export default LinksDropdown;
