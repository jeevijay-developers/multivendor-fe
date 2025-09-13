'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import PropTypes from 'prop-types';
// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';
// components
import Table from 'src/components/table/table';
import IncomeList from 'src/components/table/rows/income';
import EditPaymentDialog from 'src/components/dialog/editPayment';

// mui
import { Typography } from '@mui/material';
const TABLE_HEAD = [
  //   { id: 'name', label: 'Shop', alignRight: false },
  { id: 'items', label: 'Sale', alignRight: false, sort: true },
  { id: 'total', label: 'Total', alignRight: false, sort: true },
  { id: 'earning', label: 'Total Income', alignRight: false, sort: true },
  { id: 'commission', label: 'commission', alignRight: false, sort: true },

  { id: 'status', label: 'status', alignRight: false, sort: true },
  { id: 'createdAt', label: 'Created', alignRight: false },
  { id: '', label: 'actions', alignRight: true }
];
export default function ShopIcomeList({ slug, onUpdatePayment, isVendor }) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const [payment, setPayment] = useState(null);
  const [count, setCount] = useState(0);

  const { data, isPending: loadingList } = useQuery({
    queryKey: ['income', slug, pageParam, count, isVendor], // Added all dependencies
    queryFn: () => api[isVendor ? 'getIncomeByVendor' : 'getShopIncomeByAdmin'](slug, pageParam)
  });

  useEffect(() => {
    if (data) {
      onUpdatePayment(); // Handle success case
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const isLoading = loadingList;

  return (
    <>
      <Typography variant="h5" color="text.primary" my={2}>
        Income Report
      </Typography>

      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={IncomeList}
        handleClickOpen={(v) => setPayment(v)}
        isVendor={isVendor}
      />

      <EditPaymentDialog
        handleClose={() => setPayment(null)}
        open={Boolean(payment)}
        data={payment}
        setCount={setCount}
      />
    </>
  );
}
ShopIcomeList.propTypes = { isVendor: PropTypes.boolean, slug: PropTypes.string, onUpdatePayment: PropTypes.func };
