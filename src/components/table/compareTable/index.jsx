'use client';
import { useRouter } from '@bprogress/next';
import { useSelector, useDispatch } from 'react-redux';
import { removeCompareProduct } from 'src/redux/slices/compare';
import Image from 'next/image';

// mui
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Box,
  Stack,
  Card,
  Rating,
  IconButton,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

// icons
import { IoIosCloseCircle } from 'react-icons/io';

// api
import * as api from 'src/services';
import { useQuery } from '@tanstack/react-query';

// custom hooks
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';

// components
import NoDataFoundIllustration from 'src/illustrations/dataNotFound';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover, overflow: 'hidden' }
}));

const CompareTable = () => {
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  const dispatch = useDispatch();
  const router = useRouter();
  const { products: compareProducts, isLoading } = useSelector(({ compare }) => compare);

  const { data: fetchedProducts } = useQuery({
    queryKey: ['get-brands-user', compareProducts.map((v) => v._id)],
    queryFn: () => api.getCompareProducts(compareProducts.map((v) => v._id))
  });

  const findProductById = compareProducts.find((product) => product._id);

  const onRemoveCompare = async (event) => {
    event.stopPropagation();
    dispatch(removeCompareProduct(findProductById._id));
  };
  console.log(fetchedProducts, 'hello');
  return isLoading ? null : fetchedProducts?.data?.length ? (
    <TableContainer component={Card}>
      <Table
        sx={{
          borderCollapse: 'separate',
          '& td, & th': { border: 1, borderColor: (theme) => theme.palette.action.hover }
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {fetchedProducts?.data?.map((product) => (
              <TableCell
                key={product._id}
                align="left"
                sx={{ minWidth: 292, maxWidth: 292, cursor: 'pointer' }}
                onClick={() => router.push('/product/' + product.slug)}
              >
                <Stack sx={{ position: 'relative' }}>
                  <IconButton
                    onClick={onRemoveCompare}
                    aria-label="Remove from compare"
                    sx={{ position: 'absolute', top: 0, right: 0, zIndex: 50 }}
                  >
                    <IoIosCloseCircle />
                  </IconButton>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: { md: 320, sm: 170, xs: 150 },
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}
                  >
                    <Image src={product.image.url} alt={product.name} fill objectFit="cover" />
                  </Box>

                  <Typography variant="subtitle1" sx={{ marginY: { md: 2, xs: 1 } }} noWrap>
                    {product.name}
                  </Typography>
                </Stack>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <TableCell sx={{ minWidth: 292, maxWidth: 292, fontWeight: 600, fontSize: 16 }} component="th">
              Customer Feedback
            </TableCell>
            {fetchedProducts?.data?.map((product) => (
              <TableCell key={product._id} align="left" sx={{ fontSize: 16, color: 'text.secondary' }}>
                <Stack direction="row" alignItems="center">
                  <Rating size="small" name="read-only" precision={0.5} value={product.averageRating} readOnly />(
                  {product.averageRating || 0})
                </Stack>
              </TableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell component="th" sx={{ minWidth: 292, maxWidth: 292, fontWeight: 600, fontSize: 16 }}>
              Price
            </TableCell>
            {fetchedProducts?.data?.map((product) => (
              <TableCell key={product._id} align="left" sx={{ fontWeight: 600, fontSize: 16, color: 'primary.main' }}>
                {fCurrency(cCurrency(product.salePrice))}
              </TableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell component="th" sx={{ minWidth: 292, maxWidth: 292, fontWeight: 600, fontSize: 16 }}>
              Shop by
            </TableCell>
            {fetchedProducts?.data?.map((product) => (
              <TableCell key={product._id} align="left" sx={{ fontSize: 14 }}>
                {product.shopName}
              </TableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell component="th" sx={{ minWidth: 292, maxWidth: 292, fontWeight: 600, fontSize: 16 }}>
              Brand
            </TableCell>
            {fetchedProducts?.data?.map((product) => (
              <TableCell key={product._id} align="left" sx={{ fontSize: 16 }}>
                {product.brandName}
              </TableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell component="th" sx={{ minWidth: 292, maxWidth: 292, fontWeight: 600, fontSize: 16 }}>
              Available Stock
            </TableCell>
            {fetchedProducts?.data?.map((product) => (
              <TableCell key={product._id} align="left" sx={{ fontSize: 16, color: 'primary.main' }}>
                {product.stockQuantity}
              </TableCell>
            ))}
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
      <Grid size={12}>
        <NoDataFoundIllustration />
      </Grid>
    </Grid>
  );
};

export default CompareTable;
