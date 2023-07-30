'use client';
import React, { useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';



const RentModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen: isRentOpen, onClose: onRentClose } = useRentModal();

  return (
    <Modal
      disabled={isLoading}
      isOpen={isRentOpen}
      title="You Home"
      actionLabel="Continue"
      onClose={onRentClose}
      onSubmit={() => {}}
      body={<div>body rent modal</div>}
      footer={<div>footer</div>}
    />
  );
};

export default RentModal;
