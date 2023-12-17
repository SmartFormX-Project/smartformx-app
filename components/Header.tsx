"use client";

import {
  Avatar,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { PiSignOut } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import ProfileModal from "./ProfileModal";
import ReportModal from "./ReportModal";
import Image from "next/image";
import { sfx_full, sfx_full_light } from "@/assets";

const Header = ({
  name,
  busId,
  userId,
}: {
  name: string;
  userId: string;
  busId: string;
}) => {
  const modalProfile = useDisclosure();
  const modalReport = useDisclosure();

  return (
    <header className="block text-center w-full">
      <div className="flex justify-between items-center">
        {/* <div>
          {" "}
          <h1 className="flex font-bold text-3xl text-black">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              {" "}
              Smart
              <br />
            </span>
            FormX
          </h1>
        </div> */}

        <Image src={sfx_full_light} alt="SmartFormX" className="w-1/6"/>
        <Dropdown>
          <DropdownTrigger>
            <Chip
              variant="flat"
              color="secondary"
              size="lg"
              classNames={{
                base: "cursor-pointer border-small border-black bg-transparent py-4 px-1",
                content: "text-black font-light px-4",
              }}
              avatar={
                <Avatar
                  size="lg"
                  showFallback
                  classNames={{
                    base: "bg-black",
                    icon: "text-white/80",
                  }}
                  icon={<FiUser />}
                />
              }
            >
              {name}
            </Chip>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            // onSelectionChange={(key) =>
            //   key.toString() == "report" ? onChangeMenu : ""
            // }
          >
            <DropdownItem key="data" onClick={modalProfile.onOpen}>
              Meus dados
            </DropdownItem>
            <DropdownItem key="report" onClick={modalReport.onOpen}>
              Precisa de ajuda?
            </DropdownItem>

            <DropdownItem
              color="danger"
              key="signout"
              onClick={() => signOut()}
              startContent={<PiSignOut />}
            >
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <ProfileModal
        isOpen={modalProfile.isOpen}
        onOpenChange={modalProfile.onOpenChange}
        busId={busId}
        userName={name}
      />
      <ReportModal
        isOpen={modalReport.isOpen}
        onOpenChange={modalReport.onOpenChange}
        onSubmit={(close) => close()}
        userId={userId}
      />
    </header>
  );
};

export default Header;
// import React from "react";
// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   Link,
//   Button,
// } from "@nextui-org/react";

// export default function App() {
//   return (
//     <Navbar position="static">
//       <NavbarBrand>
//         <p className="font-bold text-inherit">ACME</p>
//       </NavbarBrand>
//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem>
//           <Link color="foreground" href="/home">
//             Home
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive>
//           <Link href="/forms" >
//             Forms
//           </Link>
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         <NavbarItem className="hidden lg:flex">
//           <Link href="#">Login</Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Button as={Link} color="primary" href="#" variant="flat">
//             Sign Up
//           </Button>
//         </NavbarItem>
//       </NavbarContent>
//     </Navbar>
//   );
// }
