import UserService from "@/app/(backend)/services/UserServices";
import { Button } from "@nextui-org/button";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

const ReportModal = ({
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
  const { register, handleSubmit } = useForm();
  const categories = [
    "Denúncia",
    "Bug",
    "Sugestão de melhoria",
    "Feedback",
    "Outro",
  ];
  const onFormSubmit = (data: any, onClose: any) => {
    const { title, category, description } = data;

    UserService.sendReport({ title, category, description, userId }).then(
      (res: any) => {
        if (res.status == 201) onSubmit(onClose);
      }
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      placement={"bottom"}
      onOpenChange={onOpenChange}
      hideCloseButton
    >
      <ModalContent>
        {(onClose: any) => (
          <form onSubmit={handleSubmit((data) => onFormSubmit(data, onClose))}>
            <ModalHeader>
              <h2 className="font-bold text-2xl">Entrar em contato</h2>
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                label="Titulo"
                placeholder="Enter a title"
                isRequired
                className="max-w-xs"
                labelPlacement="outside"
                {...register("title")}
              />
              <Select
                labelPlacement={"outside"}
                label="Categoria"
                placeholder="Selecione"
                className="max-w-xs"
                fullWidth
                isRequired
                {...register("category")}
              >
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </Select>
              {/* <label htmlFor="attachments" className="mt-2 text-sm">Anexos: </label>
              <div id="attachments" className="flex gap-2">
                <UploadCard onChange={(p) => console.log(p)} />
              </div> */}
              <Textarea
                fullWidth
                label="Nos conte o que aconteceu:"
                labelPlacement="outside"
                placeholder="Enter your description"
                className="mt-2"
                isRequired
                {...register("description")}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                Enviar
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

const UploadCard = ({ onChange }: { onChange: (path: string) => void }) => {
  return (
    <div className="flex items-center justify-center w-full tap-highlight-transparent">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-24 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            (MAX. 800x400px)
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
};

export default ReportModal;
