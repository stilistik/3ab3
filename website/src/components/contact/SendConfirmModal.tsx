import React from 'react';
import { Modal } from 'Components/utility';
import { CloseButton } from 'Components/buttons';

interface SendConfirmModalProps {
  show: boolean;
  name: string;
  onClose: () => void;
}

export const SendConfirmModal: React.FC<SendConfirmModalProps> = ({
  show,
  name,
  onClose,
}) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="absolute top-0 right-0 mt-1 mr-1">
        <CloseButton onClick={onClose} />
      </div>
      <div className="text-center text-2xl font-black p-10">
        <p>Hallo {name}</p>
        <br />
        <p>
          Danke für deine Nachricht. Wir melden uns sobald wie möglich bei dir.
        </p>
        <br />
        <p>Liebe Grüsse</p>
        <p>Das 3ab3 Team</p>
      </div>
    </Modal>
  );
};
