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
import AttributesRow from 'src/components/table/rows/attributes';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false, sort: true },
  { id: 'name', label: 'Attribute', alignRight: false, sort: true },
  { id: 'values', label: 'Values', alignRight: false },
  { id: '', label: 'Actions', alignRight: true }
];

export default function AttributesList() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [open, setOpen] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [id, setId] = useState(null);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['Attributes', apicall, searchParam, pageParam],
    queryFn: () => api.getAttributesByAdmin(+pageParam || 1, searchParam || '')
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
          endPoint="deleteAttributeByAdmin"
          type={'Attribute deleted'}
          deleteMessage={
            'Are you sure you want to delete this Attribute? Please consider carefully before making irreversible changes.'
          }
        />
      </Dialog>
      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={AttributesRow}
        handleClickOpen={handleClickOpen}
        isSearch
      />
    </>
  );
}
