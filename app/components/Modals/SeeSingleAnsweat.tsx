"use client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";

const SeeSingleAnswearModal = ({
  isOpen,
  code,
  onOpenChange,
}: {
  isOpen: boolean;
  code: string;
  onOpenChange: () => void;
}) => {

  return (
    <Modal isOpen={isOpen} placement={"bottom"} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalBody className="mt-6">
            
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SeeSingleAnswearModal;
