import * as React from 'react';
import PropTypes from 'prop-types';

// mui
import { Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
// components

import ProductDetailsSumary from '../_main/product/summary';
import ProductDetailsCarousel from 'src/components/carousels/customPaginationSilder';

ProductDetailsDialog.propTypes = { slug: PropTypes.string, onClose: PropTypes.func, open: PropTypes.bool.required };

export default function ProductDetailsDialog(props) {
  const { onClose, open, slug, isSimpleProduct, product } = props;
  const [selectedVariant, setSelectedVariant] = React.useState('');

  React.useEffect(() => {
    if (product.data.type === 'variable') {
      setSelectedVariant(product.data.variants[0].name);
    }
  }, [product]);
  console.log(product, 'product');
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="lg">
      <Grid container spacing={2} justifyContent="center" sx={{ p: 3 }}>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 4
          }}
        >
          <ProductDetailsCarousel
            isSimpleProduct={isSimpleProduct}
            slug={slug}
            product={product.data}
            selectedVariant={selectedVariant}
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 8,
            lg: 8
          }}
        >
          <ProductDetailsSumary
            isPopup
            setSelectedVariant={setSelectedVariant}
            selectedVariant={selectedVariant}
            id={product.data._id}
            product={product.data}
            totalRating={product.totalRating}
            totalReviews={product.totalReviews}
            isSimpleProduct={isSimpleProduct}
          />
        </Grid>
      </Grid>
    </Dialog>
  );
}
