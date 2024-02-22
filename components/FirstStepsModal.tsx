"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Select,
  SelectItem,
  Textarea,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";

const UpdatePlanModal = ({
  onSubmit,
  isOpen,
  userId,
  onOpenChange,
}: {
  onSubmit: (onClose: any) => void;
  isOpen: boolean;
  userId: string;
  onOpenChange: () => void;
}) => {

    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
      if (current < pages.length - 1) setCurrent((prev) => ++prev);
    };
  
    const prevSlide = () => {
      if (current != 0) setCurrent((prev) => --prev);
    };
    const pages = [
      {
        info: "Primeiro passo: Crie seu primeiro smartform",
        img: "",

      }, 
      {
        info: "Primeiro passo: Crie seu primeiro smartform",
        img: "",

      } 
    ];

  return (
    <Modal
      isOpen={isOpen}
      placement={"bottom"}
      onOpenChange={onOpenChange}
      hideCloseButton
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader>
              <h2 className="font-bold text-2xl">Bem vindo ao smartformx</h2>
              <span className="font-normal text-xl">
                Vou te ajudar no passo a passo a entender como a aplicação
                funciona.
              </span>
            </ModalHeader>
            <ModalBody>
              <div className="z-50 flex items-center justify-center">
           {pages.map((e,i)=>{

            return <div key={i}>
                <h2>Primeiro passo: Crie seu primeiro smartformx</h2>

            </div>;
           })}

     
    </div>
            </ModalBody>
            <ModalFooter>
              <Button fullWidth color="primary" type="submit">
                Próximo
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdatePlanModal;
