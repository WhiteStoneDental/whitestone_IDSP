import HomeNavButton from "./HomeNavButton";
import ResourceNavButton from "./ResourceButton";
import SettingsNavButton from "./SettingsNavButton";

export default function NavBar() {
    return (
        <div className="">
            <SettingsNavButton>
            </SettingsNavButton>
            <HomeNavButton>
            </HomeNavButton>
            <ResourceNavButton>
            </ResourceNavButton>
        </div>
    );
}