import React from 'react';
import { Modal } from '.';
import { LoadingCube } from './LoadingCube';

export const LoadingOverlay: React.FC = () => {
  return (
    <Modal show={true} onClose={() => {}}>
      <div className="w-full, h-full flex items-center justify-center">
        <LoadingCube />
      </div>
    </Modal>
  );
};
