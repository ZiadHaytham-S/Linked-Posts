import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function CardPostBody({ body, image }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {body && <p className="mb-3 dark:text-gray-200">{body}</p>}
      {image && <img onClick={onOpen} className="w-full h-80 object-cover cursor-pointer" src={image} alt="" />}

      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark:bg-gray-800">
        <ModalContent className="dark:bg-gray-800">
          
            <>
              <img src={image} alt="" />
            </>
          
        </ModalContent>
      </Modal>
    </>
  );
}
