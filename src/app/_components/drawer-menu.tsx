import { Menu } from "lucide-react";
import { Button } from "~/shared/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "~/shared/components/drawer";
import { Navbar } from "./navbar";

export function DrawerMenu() {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Button variant="outline" size="icon" className="bg-transparent">
          <Menu size="1em" strokeWidth={1.5} className="text-xl" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Navbar isOnDrawer />
      </DrawerContent>
    </Drawer>
  );
}
