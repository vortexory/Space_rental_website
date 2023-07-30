'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}
const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryActionLabel,
  secondaryAction,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose(), 300;
    });
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="
          overflow-x-hidden
          overflow-y-hidden
          fixed 
          inset-0 
          z-50 
          bg-neutral-800/70   "
      >
        <div className="   rounded-lg h-full flex items-center  2xl:mt-0 ">
          <div
            className={`translate duration-300  w-full md:max-w-lg xl:max-w-xl mx-auto ${
              showModal
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0 '
            }`}
          >
            <div
              className="  translate border-0  rounded-lg 
              shadow-lg  flex flex-col w-full   bg-white overflow-y-auto max-h-[98vh] min-h-[80vh] scroll-smooth"
            >
              {/* HEADER */}
              <div
                className=" flex 
                items-center 
                rounded-t    
                px-6 py-3
                justify-between
                border-b-[1px]"
              >
                <div className="text-xl font-bold">{title}</div>
                <button
                  onClick={handleClose}
                  className="  p-1
                    border-0 
                    hover:opacity-70
                    transition
                    hover:bg-neutral-200 rounded-full"
                >
                  <IoMdClose size={24} />
                </button>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 px-6 pb-6  ">
                <div className="flex items-center self-start gap-4  w-full  ">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      // Icon={IoMdClose}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    // Icon={IoMdClose}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
