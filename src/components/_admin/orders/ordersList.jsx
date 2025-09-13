'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
// components
import Table from 'src/components/table/table';
import OrderList from 'src/components/table/rows/orderList';
import DeleteDialog from 'src/components/dialog/delete';
import PropTypes from 'prop-types';
// mui
import { Dialog } from '@mui/material';
// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';
const TABLE_HEAD = [
  { id: 'name', label: 'User', alignRight: false },
  { id: 'total', label: 'Total', alignRight: false, sort: true },
  { id: 'items', label: 'items', alignRight: false },
  { id: 'payment', label: 'Paid Via', alignRight: false },
  { id: 'inventoryType', label: 'status', alignRight: false, sort: true },
  { id: 'createdAt', label: 'Date', alignRight: false, sort: true },
  { id: '', label: 'actions', alignRight: true }
];
export default function OrdersAdminList({ isVendor, shops }) {
  const searchParams = useSearchParams();
  const [apicall, setApicall] = useState(false);
  const { data, isPending: loadingList } = useQuery({
    queryKey: ['orders', apicall, searchParams.toString()],
    queryFn: () => api[isVendor ? 'getOrdersByVendor' : 'getOrdersByAdmin'](searchParams.toString())
  });
  const [open, setOpen] = useState(false);

  const [id, setId] = useState(null);

  const handleClickOpen = (props) => () => {
    setId(props);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isLoading = loadingList;
  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth={'xs'}>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={setApicall}
          endPoint="deleteOrderByAdmin"
          type={'Order deleted'}
        />
      </Dialog>
      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={OrderList}
        handleClickOpen={handleClickOpen}
        isVendor={isVendor}
        isSearch
        filters={
          isVendor
            ? [{ ...SHOP_STATUS_FILTERS }]
            : [{ name: 'Shop', param: 'shop', data: shops }, { ...SHOP_STATUS_FILTERS }]
        }
      />
    </>
  );
}
OrdersAdminList.propTypes = { isVendor: PropTypes.boolean };

const SHOP_STATUS_FILTERS = {
  name: 'Status',
  param: 'status',
  data: [
    {
      name: 'Pending',
      slug: 'pending'
    },
    {
      name: 'On the way',
      slug: 'on-the-way'
    },
    {
      name: 'In Review',
      slug: 'in-review'
    },
    {
      name: 'Delivered',
      slug: 'delivered'
    },
    {
      name: 'Canceled',
      slug: 'canceled'
    },
    {
      name: 'Returned',
      slug: 'returned'
    }
  ]
};
