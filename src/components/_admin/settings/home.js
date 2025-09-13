'use client';
import React from 'react';
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';
import HomeSettingsForm from '@/components/forms/home-settings';
export default function HomeMain() {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['get-setting-by-admin'],
    queryFn: () => api.getSettingsByAdmin()
  });

  return <HomeSettingsForm data={data?.data} isLoading={isLoading} />;
}
