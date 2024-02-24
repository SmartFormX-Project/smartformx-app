import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

const ConfirmActionModal = ({
  onSubmit,
  isOpen,
  onOpenChange,
}: {
  onSubmit: (onClose: any) => void;
  isOpen: boolean;
  onOpenChange: () => void;
}) => {

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

            <h3 className="text-xl font-semibold">Deseja realmente fechar o formulário?</h3> 
          </ModalHeader>
            <ModalBody>
            <span className="text-sm">Após fechado ele não poderá ser aberto novamente.</span> 
            </ModalBody>
            <ModalFooter>
              <Button color="default" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" type="submit" onClick={()=>onSubmit(onClose)}>
                Fechar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmActionModal;
