import React, { useState } from 'react';
import PropTypes from 'prop-types';

// mui
import { Stack, Button, Zoom, Skeleton } from '@mui/material';

// icons
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md';

SizePreview.propTypes = {
  sizes: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
  setSize: PropTypes.func.isRequired,
  isDetail: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

export default function SizePreview({ sizes, size, setSize, isDetail, loading }) {
  const [sizeCount, setSizeCount] = useState(0);
  return (
    <Stack
      direction="row"
      alignItems={'center'}
      sx={{
        button: {
          mr: 0.5
        }
      }}
    >
      {!isDetail && sizes?.length > 6 && (
        <Zoom in={sizeCount > 0}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              if (sizeCount > 0) {
                setSizeCount(sizeCount - 1);
              }
            }}
            sx={{
              minHeight: 32,
              minWidth: 33,
              height: '32px !important',
              p: 0.2,
              color: 'text.primary !important',
              display: sizeCount === 0 && 'none',
              borderWidth: 0
            }}
            disabled={sizeCount === 0}
          >
            <MdKeyboardDoubleArrowLeft size={20} />
          </Button>
        </Zoom>
      )}

      {loading
        ? Array.from(new Array(4))
        : sizes?.slice(sizeCount * 6, 6 * (sizeCount + 1)).map((v, i) => (
            <React.Fragment key={Math.random()}>
              {loading ? (
                <Skeleton variant="rounded" width={33} height={32} sx={{ mr: 0.5 }} />
              ) : (
                <Button
                  size="small"
                  variant={size === i ? 'contained' : 'outlined'}
                  onClick={() => setSize(i)}
                  sx={{
                    height: '32px !important',
                    minWidth: '32px !important',
                    px: 0.6,
                    py: 0.2,
                    textTransform: 'uppercase',
                    fontSize: size === i ? 14 : 12,
                    borderRadius: v.length > 2 ? '12px' : '50%',
                    bgcolor: size === i ? 'primary.main' : 'background.paper',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: (theme) => (size === i ? theme.palette.primary.main : theme.palette.text.primary),
                    color: size === i ? '#fff' : 'text.primary',
                    fontWeight: 600,
                    '&:hover': {
                      color: size === i ? 'text.primary' : 'primary.main'
                    }
                  }}
                >
                  {v}
                </Button>
              )}
            </React.Fragment>
          ))}
      {!isDetail && sizes?.length > 6 && (
        <Zoom in={6 * (sizeCount + 1) < sizes?.length}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              if (6 * (sizeCount + 1) < sizes?.length) {
                setSizeCount(sizeCount + 1);
              }
            }}
            sx={{
              minHeight: 32,
              minWidth: 33,
              borderWidth: 0,
              height: '42px !important',
              color: 'text.primary !important',
              p: 0.2
            }}
          >
            <MdKeyboardDoubleArrowRight size={20} />
          </Button>
        </Zoom>
      )}
    </Stack>
  );
}
