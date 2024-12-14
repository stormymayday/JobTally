import { AreaChart, Layers, AppWindow, Settings2 } from "lucide-react";

type NavLink = {
    href: string;
    label: string;
    icon: React.ReactNode;
};

const links: NavLink[] = [
    {
        href: "/add-job",
        label: "add job",
        icon: <Layers />,
    },
    {
        href: "/jobs",
        label: "all jobs",
        icon: <AppWindow />,
    },
    {
        href: "/stats",
        label: "stats",
        icon: <AreaChart />,
    },
    {
        href: "/settings",
        label: "settings",
        icon: <Settings2 />,
    },
];

export default links;
