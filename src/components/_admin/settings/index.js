'use client';
import React from 'react';
// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';
import SettingsForm from '@/components/forms/settings';

export default function SettingsMain() {
  const { data } = useQuery({
    queryKey: ['get-setting-by-admin'],
    queryFn: () => api.getSettingsByAdmin()
  });
  return (
    <>
      <SettingsForm currentSetting={data?.data} />
    </>
  );
}
