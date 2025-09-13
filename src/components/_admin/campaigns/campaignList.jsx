'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
// api
import * as api from 'src/services';
// usequery
import { useQuery } from '@tanstack/react-query';
// mui
import { Dialog } from '@mui/material';
// components
import DeleteDialog from 'src/components/dialog/delete';
import Table from 'src/components/table/table';
import Campaign from 'src/components/table/rows/campaign';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false, sort: true },
  { id: 'total', label: 'Total Products', alignRight: false },
  { id: 'discount', label: 'Discount', alignRight: false },
  { id: 'startDate', label: 'Start Date', alignRight: false },
  { id: 'endDate', label: 'End Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '', label: 'Actions', alignRight: true }
];

export default function BrandList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['brands', apicall, searchParam, pageParam],
    queryFn: () => api.getCampaignsByAdmin(+pageParam || 1, searchParam || '')
  });

  const handleClickOpen = (prop) => () => {
    setId(prop);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth={'xs'}>
        <DeleteDialog
          onClose={handleClose}
          id={id}
          apicall={setApicall}
          endPoint="deleteCampaignByAdmin"
          type={'Campaign deleted'}
          deleteMessage={
            'Are you sure you want to delete this campaign? Please consider carefully before making irreversible changes.'
          }
        />
      </Dialog>
      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={Campaign}
        handleClickOpen={handleClickOpen}
        isSearch
      />
    </>
  );
}
