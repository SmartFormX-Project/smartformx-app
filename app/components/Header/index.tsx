"use client";
import { minimalist_logo } from "@/assets";
import {
  Dropdown,
  DropdownTrigger,
  Chip,
  Avatar,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import { ChevronDown, LogOut, User2Icon, UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import ProfileModal from "../Modals/ProfileModal";
import { usePathname, useRouter } from "next/navigation";

export default function HeaderComponent() {

  const path = usePathname()

  // if (path != "/" && path != "/single") return null;

  const ProfileModalDisclosure = useDisclosure();
  return (
    <div className="flex justify-between bg-[#F1F0FF] rounded-small p-3">
      <Image src={minimalist_logo} alt="sfx icon" className="w-36" />
      <Dropdown>
        <DropdownTrigger>
          <Chip
            variant="flat"
            color="secondary"
            size="lg"
            endContent={<ChevronDown size={18} />}
            classNames={{
              base: "cursor-pointer  bg-transparent py-4 px-1",
              content: "text-black font-semibold px-4",
            }}
            avatar={
              <Avatar
              isBordered
              // radius="sm"
                size="lg"
                showFallback
                classNames={{
                  base: "bg-white",
                  icon: "text-black/80 p-[3px]",
                }}
                icon={<User2Icon />}
              />
            }
          >
            Jackson Aguiar
          </Chip>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="data" onClick={ProfileModalDisclosure.onOpen}>
            Meus dados
          </DropdownItem>

          <DropdownItem
            color="danger"
            key="signout"
            onClick={() => signOut()}
            startContent={<LogOut size={18} />}
          >
            Sair
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ProfileModal
        isOpen={ProfileModalDisclosure.isOpen}
        onOpenChange={ProfileModalDisclosure.onOpenChange}
      />
    </div>
  );
}
