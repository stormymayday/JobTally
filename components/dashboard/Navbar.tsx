import LinksDropdown from "@/components/dashboard/LinksDropdown";
import UserButton from "@/components/auth/UserButton";
import { ModeToggle } from "@/components/mode-toggle";

function Navbar() {
    return (
        <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
            <div>
                <LinksDropdown />
            </div>
            <div className="flex items-center gap-x-4">
                <ModeToggle />
                <UserButton />
            </div>
        </nav>
    );
}
export default Navbar;
