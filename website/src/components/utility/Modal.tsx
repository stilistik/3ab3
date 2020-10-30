import React from 'react';
import ReactDOM from 'react-dom';
import { useClickAway } from 'Components/index';

import styles from './Modal.module.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, show, onClose }) => {
  const elementRef = React.useRef(document.createElement('div'));

  useClickAway(elementRef, onClose);

  React.useEffect(() => {
    const appRoot = document.getElementById('app-root');
    const modalRoot = document.getElementById('modal-root');
    const element = elementRef.current;

    if (show) {
      element.classList.add(styles.modal);

      modalRoot.appendChild(element);
      appRoot.classList.add(styles.backdrop);
    }
    return () => {
      if (modalRoot.contains(element)) modalRoot.removeChild(element);
      appRoot.classList.remove(styles.backdrop);
    };
  }, [show]);

  return ReactDOM.createPortal(children, elementRef.current);
};
