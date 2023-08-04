'use client';

import { useEffect } from 'react';

import EmptyState from '@/app/components/EmptyState';

interface ErrorStateProps {
  error: Error;
}

const ErrorState = ({ error }:ErrorStateProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Ooops!"
      subtitle="Something went wrong!"
    />
  );
};

export default ErrorState;
