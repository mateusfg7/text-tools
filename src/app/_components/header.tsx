import { ThemeToggle } from "./theme-toggle";

export const Header = () => (
  <header className="w-full flex items-center justify-between p-2 bg-primary-foreground rounded-lg">
    <h1 className="text-xl text-primary">Text Tools</h1>
    <ThemeToggle />
  </header>
);
