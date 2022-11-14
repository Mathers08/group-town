import React, { FC, ReactNode } from 'react';
import './Modal.scss';
import { CoupleColorEnum } from "../../redux/schedule/types";

interface IModal {
  active: boolean;
  setActive: (active: boolean) => void;
  color?: string;
  width?: number;
  height?: number;
}

interface ModalProps {
  props: IModal;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ props, children }) => {
  return (
    <div className={props.active ? 'modal active' : 'modal'} onClick={() => props.setActive(false)}>
      <div
        style={{
          background: props.color ? props.color : '#fff',
          width: props.width,
          height: props.height
        }}
        className={props.active ? 'modal__content active' : 'modal__content'}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;