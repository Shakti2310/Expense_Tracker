import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { PanelsTopLeft } from "lucide-react";
import Logo from "../customUI/Logo.jsx";
import { NavLink } from "react-router";

function SideMenuMobile() {
  return (
    <>
      {" "}
      <div className="md:hidden flex">
        <Drawer swipeDirection="left">
          <DrawerTrigger
            render={
              <button>
                <PanelsTopLeft className="dark:text-white size-5" />
              </button>
            }
          />
          <DrawerContent className="dark:bg-black w-[70%]">
            <DrawerHeader>
              <DrawerTitle className="dark:text-white">
                <Logo />
              </DrawerTitle>
              <DrawerDescription className="text-gray-500 dark:text-gray-400">
                want to know more about XseTrack? check out the about page!
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4 mt-5">
              <div className="size-full gap-5 justify-start flex-col flex dark:text-white text-black">
                <NavLink to="/about">
                  <DrawerClose className="text-lg font-medium hover:underline">
                    About
                  </DrawerClose>
                </NavLink>
                <NavLink to="/contact">
                  <DrawerClose className="text-lg font-medium hover:underline">
                    Contact
                  </DrawerClose>
                </NavLink>

                <NavLink to="/authentication/register">
                  <DrawerClose
                    render={
                      <Button variant="default" className="w-full rounded-full">
                        Get Started
                      </Button>
                    }
                  />
                </NavLink>
                <NavLink to="/authentication/login">
                  <DrawerClose
                    render={
                      <Button variant="outline" className="w-full rounded-full">
                        Sign In
                      </Button>
                    }
                  />
                </NavLink>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose
                render={<Button className="rounded-full">Close</Button>}
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default SideMenuMobile;
