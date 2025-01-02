import { i18n } from '@/lib/i18n';

import type { Dispatch, SetStateAction } from 'react';
import type { ToastData } from './useToast';

export async function onSubmit<T>(
  data: T,
  action: (data: T) => Promise<{ status: 'error'; error: string } | undefined>,
  setToast?: Dispatch<SetStateAction<ToastData>>,
  onAfterSubmit?: () => void
) {
  try {
    const ret = await action(data);

    if (ret?.status === 'error') {
      setToast?.({ visible: true, message: ret.error, type: 'alert-error' });
    }
    onAfterSubmit?.();
  } catch (e) {
    console.error(e);
    setToast?.({ visible: true, message: i18n.Error, type: 'alert-error' });
  }
}
