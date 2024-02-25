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
import { sfx_icon, sfx_full_light, stars } from "@/assets";
import UpdatePlanModal from "./UpdatePlanModal";
import { useCallback, useEffect, useState } from "react";

const Header = () => {
  var { data, status } = useSession();
  const modalProfile = useDisclosure();
  const modalReport = useDisclosure();
  const UpdatePlanDisclosure = useDisclosure();
  const [isMobile, setMobileMode] = useState<boolean>(false);

  const VerifyTokenExpired = useCallback(async () => {
    if (data) {
      const now = new Date().getTime();
      const expire = new Date(data.expires).getTime()+600000;
      const isExpired = now >= expire;

      if (isExpired) {
        await signOut();
        location.reload();
      }
    }
    return true;
  }, [data]);

  useEffect(() => {
    if (window) {
      setMobileMode(window.matchMedia("(max-width: 600px)").matches);
    }

    VerifyTokenExpired();
  }, [VerifyTokenExpired]);

  // const chatwootBtn = document.querySelector(`.woot-widget-bubble`);
  return status != "loading" ? (
    <header className="block text-center w-full">
      <div className="flex justify-between items-center">
        <Image
          src={isMobile ? sfx_icon : sfx_full_light}
          alt="SmartFormX"
          className={isMobile ? "w-1/12" : "w-1/6"}
        />
        {data?.user?.plan?.toLocaleLowerCase()==="free" && !isMobile && (
          <div
            onClick={UpdatePlanDisclosure.onOpen}
            className="flex flex-col justify-between cursor-pointer p-[1.5px] transition-all bg-gradient-to-r hover:from-[#21D6CC] hover:to-[#7D21CF] rounded-lg"
          >
            <div className="flex flex-col bg-white justify-between h-full w-full px-2 py-[2px] rounded-md">
              <div className="flex items-center justify-between space-x-2">
                <Image src={stars} alt="" width={20} height={20} />
                <span className="font-light text-start text-[11px] text-black md:w-[250px]">
                  Descubra novos recursos, e impulsione seu negócio.{" "}
                  <b>Assine agora!</b>
                </span>
              </div>
            </div>
          </div>
        )}

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
              {data?.user?.name}
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
            {/* <DropdownItem key="report" onClick={modalReport.onOpen}>
              Precisa de ajuda?
            </DropdownItem> */}

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
      />
      <ReportModal
        isOpen={modalReport.isOpen}
        onOpenChange={modalReport.onOpenChange}
        onSubmit={(close) => close()}
      />
      <UpdatePlanModal
        isOpen={UpdatePlanDisclosure.isOpen}
        onOpenChange={UpdatePlanDisclosure.onOpenChange}
      />
      {data?.user?.plan?.toLocaleLowerCase()==="free" && isMobile && (
        <div
          onClick={UpdatePlanDisclosure.onOpen}
          className="flex mt-2 flex-col max-w-[350px] m-auto justify-between cursor-pointer p-[1.5px] transition-all bg-gradient-to-r hover:from-[#21D6CC] hover:to-[#7D21CF] rounded-lg"
        >
          <div className="flex flex-col bg-white justify-between h-full w-full px-2 py-[2px] rounded-md">
            <div className="flex items-center justify-between space-x-2">
              <Image src={stars} alt="" width={20} height={20} />
              <span className="font-light text-start text-[11px] text-black md:w-[250px]">
                Descubra novos recursos, e impulsione seu negócio.{" "}
                <b>Assine agora!</b>
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  ) : (
    <span></span>
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
