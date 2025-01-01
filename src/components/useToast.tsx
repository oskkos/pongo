import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface ToastData {
  visible: boolean;
  message: string;
  type: string;
}

function onToastDataChange(toast: ToastData, setToast: Dispatch<SetStateAction<ToastData>>) {
  if (toast.visible) {
    const timer = setTimeout(() => {
      setToast({ visible: false, message: '', type: '' });
    }, 3000);
    return () => clearTimeout(timer);
  }
}

export function useToast() {
  const [toast, setToast] = useState({ visible: false, message: '', type: '' });
  useEffect(() => {
    onToastDataChange(toast, setToast);
  }, [toast]);
  return [toast, setToast] as const;
}
