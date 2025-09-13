'use client';
// react
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from '@bprogress/next';

// api
import * as api from 'src/services';
import { useSelector } from 'react-redux';
import GeneralProfileForm from '@/components/forms/general-profile';

export default function GeneralProfileMain() {
  const { user: adminUser } = useSelector(({ user }) => user);
  const pathname = usePathname();
  const router = useRouter();
  const [avatarId, setAvatarId] = React.useState(null);
  const { data, isPending: isLoading } = useQuery({ queryKey: ['user-profile'], queryFn: api.getProfile });

  const user = data?.data || null;

  React.useEffect(() => {
    if (!pathname.includes('dashboard') && adminUser?.role.includes('admin')) {
      router.push('/admin/settings/profile');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (user && user.cover?._id) {
      setAvatarId(user.cover._id);
    } else {
      setAvatarId(null);
    }
  }, [user]);

  return <GeneralProfileForm isLoading={isLoading} user={user} avatarId={avatarId} />;
}
