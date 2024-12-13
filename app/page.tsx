import { Button } from "@/components/ui/Button";
import LoginButton from "@/components/auth/LoginButton";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import LandingImg from "@/public/main.svg";
import logo from "@/public/logo.svg";

export default function Home() {
    return (
        <main>
            <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-between">
                <Image src={logo} alt="logo" />
                {/* <div>JobTally</div> */}
                <ModeToggle />
            </header>
            <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
                <div>
                    {/* <h1 className="text-4xl md:text-7xl font-bold"> */}
                    <h1 className="capitalize text-4xl md:text-7xl font-bold">
                        <span className="text-primary">Stay</span> on Track
                        <br />
                        Land the <span className="text-primary">Job</span>
                    </h1>
                    {/* </h1> */}

                    <LoginButton mode="modal" asChild>
                        <Button className="mt-4" size="lg">
                            Get Started
                        </Button>
                    </LoginButton>
                </div>
                <Image
                    src={LandingImg}
                    alt="landing"
                    className="hidden lg:block "
                />
            </section>
        </main>
    );
}
