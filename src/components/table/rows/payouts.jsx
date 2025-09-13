import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from '@bprogress/next';

// mui
import { TableRow, Skeleton, TableCell, Stack, IconButton, Tooltip, Chip } from '@mui/material';

// components

// utils
import { fCurrency } from 'src/utils/formatNumber';
import { fDateShort } from 'src/utils/formatTime';

// icons
import { MdEdit } from 'react-icons/md';
import { IoEye } from 'react-icons/io5';

IncomeList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        cover: PropTypes.string,
        imageUrl: PropTypes.string,
        cover: PropTypes.string
      })
    ).isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    }),
    createdAt: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.oneOf(['delivered', 'ontheway', 'pending']).isRequired,
    total: PropTypes.number.isRequired,
    orders: PropTypes.array.isRequired,
    totalIncome: PropTypes.number.isRequired,
    totalCommission: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  handleClickOpen: PropTypes.func
};

export default function IncomeList({ isLoading, row, handleClickOpen }) {
  // const theme = useTheme();

  const router = useRouter();
  return (
    <TableRow hover key={Math.random()}>
      <TableCell>{isLoading ? <Skeleton variant="text" /> : row.orders.length}</TableCell>
      <TableCell>{isLoading ? <Skeleton variant="text" /> : fCurrency(row.total)}</TableCell>
      <TableCell>{isLoading ? <Skeleton variant="text" /> : fCurrency(row.totalIncome)}</TableCell>

      <TableCell>{isLoading ? <Skeleton variant="text" /> : fCurrency(row.totalCommission)}</TableCell>
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Chip
            size="small"
            label={row.status}
            color={
              (row?.status === 'paid' && 'success') ||
              (row?.status === 'hold' && 'error') ||
              (row?.status === 'pending' && 'info') ||
              'error'
            }
          />
        )}
      </TableCell>
      <TableCell>{isLoading ? <Skeleton variant="text" /> : <>{fDateShort(row.date).slice(3)}</>}</TableCell>
      <TableCell align="right">
        <Stack direction="row" justifyContent="flex-end">
          {isLoading ? (
            <Skeleton variant="circular" width={34} height={34} sx={{ mr: 1 }} />
          ) : (
            <Tooltip title="Edit">
              <IconButton onClick={() => handleClickOpen(row)}>
                <MdEdit />
              </IconButton>
            </Tooltip>
          )}
          {isLoading ? (
            <Skeleton variant="circular" width={34} height={34} sx={{ mr: 1 }} />
          ) : (
            <Tooltip title="Edit">
              <IconButton onClick={() => router.push(`/admin/payments/${row._id}`)}>
                <IoEye />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
