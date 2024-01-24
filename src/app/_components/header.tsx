import { FileText } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { DrawerMenu } from "./drawer-menu";

export const Header = () => (
  <header className="w-full flex items-center justify-between p-2 bg-primary-foreground rounded-lg">
    <div className="md:hidden">
      <DrawerMenu />
    </div>
    <h1 className="text-xl text-primary font-bold inline-flex gap-1 items-center">
      <FileText size="1em" strokeWidth={2} />
      <span>Text Tools</span>
    </h1>
    <ThemeToggle />
  </header>
);
