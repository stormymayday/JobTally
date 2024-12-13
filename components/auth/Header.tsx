// import { Roboto } from "next/font/google";
// import { cn } from "@/lib/utils";
import logo from "@/public/logo.svg";
import Image from "next/image";

// const font = Roboto({
//     subsets: ["latin"],
//     weight: "700",
// });

interface HeaderProps {
    label: string;
}

function Header({ label }: HeaderProps) {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            {/* <h1 className={cn("text-3xl font-semibold", font.className)}>
                💼 JobTally
            </h1> */}
            <Image src={logo} alt="logo" />
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    );
}
export default Header;
