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
import { useTranslation } from "@/app/i18n/client";

export default function HeaderComponent({
  my_info_text,
  signout_text,
  lang
}: {
  my_info_text: string;
  signout_text: string;
  lang: string;
}) {
  const path = usePathname();

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
            {my_info_text}
          </DropdownItem>

          <DropdownItem
            color="danger"
            key="signout"
            onClick={() => signOut()}
            startContent={<LogOut size={18} />}
          >
            {signout_text}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ProfileModal
        lng={lang}
        isOpen={ProfileModalDisclosure.isOpen}
        onOpenChange={ProfileModalDisclosure.onOpenChange}
      />
    </div>
  );
}
