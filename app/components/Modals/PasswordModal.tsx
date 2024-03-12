"use client"
import { Button } from "@nextui-org/button";
import {
    Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

const PasswordModal = ({
  onSubmit,
  isOpen,
  onOpenChange,
}: {
  onSubmit: (pass:string, onClose: any) => void;
  isOpen: boolean;
  onOpenChange: () => void;
}) => {

    const [pass,setPass] = useState<string>("");

  return (
    <Modal
      isOpen={isOpen}
      placement={"bottom"}
      onOpenChange={onOpenChange}
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader>
              <h3 className="text-xl font-semibold">Confirme sua conta</h3>
            </ModalHeader>
            <ModalBody>
              <Input
                type="password"
                label="Digite sua senha"
                radius="sm"
                placeholder="Sua senha possui 8 ou mais caracteres"
                size="lg"
                fullWidth
                labelPlacement="outside"
                onChange={(el)=>setPass(el.target.value)}
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                onClick={() => onSubmit(pass,onClose)}
              >
                Concluir
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PasswordModal;
