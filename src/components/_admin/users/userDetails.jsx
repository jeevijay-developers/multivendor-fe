'use client';
import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
// mui-ui components
import { Card } from '@mui/material';
// component
import Table from 'src/components/table/table';
import OrderList from 'src/components/table/rows/orderList';
import ProfileCover from 'src/components/_main/profile/profileCover';
// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';

UserProfile.propTypes = { id: PropTypes.string.isRequired };

const TABLE_HEAD = [
  { id: 'name', label: 'Product' },
  { id: 'total', label: 'total' },
  { id: 'inventoryType', label: 'Status' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'date', label: 'Date' },
  { id: '', label: 'Actions' }
];
export default function UserProfile({ id }) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['user-details', id, pageParam],
    queryFn: () => api.getUserByAdmin(`${id}?page=${pageParam || 1}`),
    enabled: !!id,
    retry: false
  });
  const user = (function () {
    if (isLoading) {
      return null;
    } else {
      const { user } = data;
      return user;
    }
  })();
  const orders = (function () {
    if (isLoading) {
      return null;
    } else {
      const { orders } = data;
      return orders;
    }
  })();
  const tableData = { data: orders, count: data?.count };

  return (
    <>
      <Card sx={{ mb: 3, height: 280, position: 'relative' }}>
        <ProfileCover data={user} isLoading={isLoading} />
      </Card>

      <Table headData={TABLE_HEAD} data={tableData} isLoading={isLoading} row={OrderList} isUser />
    </>
  );
}
