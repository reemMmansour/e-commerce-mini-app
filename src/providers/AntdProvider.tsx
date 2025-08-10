'use client';
import { ConfigProvider } from 'antd';
import { useParams } from 'next/navigation';
import arEG from 'antd/locale/ar_EG';
import enUS from 'antd/locale/en_US';
import { ReactNode } from 'react';

export function AntdProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const locale = params?.locale as string;
  const antdLocale = locale === 'ar' ? arEG : enUS;

  return (
    <ConfigProvider
      locale={antdLocale}
      direction={locale === 'ar' ? 'rtl' : 'ltr'}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}