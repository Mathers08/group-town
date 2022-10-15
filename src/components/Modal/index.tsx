import React, { FC, ReactNode } from 'react';
import './Modal.scss';
import { CoupleColorEnum } from "../../redux/schedule/types";

interface ModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
  color: CoupleColorEnum;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ active, setActive, color, children }) => {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div
        style={{ background: color }}
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;