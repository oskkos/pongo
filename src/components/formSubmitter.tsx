import { i18n } from '@/lib/i18n';

import type { Dispatch, SetStateAction } from 'react';
import type { ToastData } from './useToast';

export async function onSubmit<T>(
  data: T,
  action: (data: T) => Promise<{ status: 'error'; error: string } | undefined>,
  setToast?: Dispatch<SetStateAction<ToastData>>,
  onAfterSubmit?: () => void
) {
  let onAfterSubmitCalled = false;
  try {
    const ret = await action(data);

    if (ret?.status === 'error') {
      setToast?.({ visible: true, message: ret.error, type: 'alert-error' });
    }
    onAfterSubmit?.();
    onAfterSubmitCalled = true;
  } catch (e) {
    console.error(e);
    if (e instanceof Error && e.message === 'NEXT_REDIRECT') {
      // If action redirects, onAfterSubmit is not called, instead error is thrown. Call it here anyways
      if (!onAfterSubmitCalled) {
        onAfterSubmit?.();
      }
      return;
    }
    setToast?.({ visible: true, message: i18n.Error, type: 'alert-error' });
  }
}
