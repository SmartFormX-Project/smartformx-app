"use client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Snippet,
} from "@nextui-org/react";

import { toPng } from "html-to-image";
import { Download } from "lucide-react";

import { useQRCode } from "next-qrcode";
import { useRef } from "react";

const ShareFormModal = ({
  isOpen,
  code,
  onOpenChange,
}: {
  isOpen: boolean;
  code: string;
  onOpenChange: () => void;
}) => {
  const { SVG } = useQRCode();
  const url = process.env.NEXT_PUBLIC_FORM_URL + code;
  const DonwloadQr = () => htmlToImageConvert();
  let elementRef = useRef(null);

  const htmlToImageConvert = () => {
    toPng(elementRef.current!, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "smartformx-qrcode.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal isOpen={isOpen} placement={"bottom"} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalBody className="mt-6">
              <div className="flex justify-center" ref={elementRef}>
                <SVG
                  text={url}
                  options={{
                    width: 250,
                    margin: 1,

                    // color: {
                    //   dark: "#010599FF",
                    //   light: "#FFBF60FF",
                    // },
                  }}
                />
              </div>
              <Snippet
                tooltipProps={{
                  color: "foreground",
                  content: "Copie o link",
                  disableAnimation: true,
                  placement: "right",
                  closeDelay: 0,
                }}
                className="m-auto w-fit"
                codeString={url}
              >
                Link para o formulario
              </Snippet>
              <span className="mb-4 text-center">
                Use o qr-code ou copie e envie o link! ;)
              </span>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                startContent={<Download />}
                fullWidth
                // onPress={() => onSubmit(onClose)}
                onClick={DonwloadQr}
              >
                Download
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ShareFormModal;
