// react
'use client';
import Link from 'next/link';
import { useState, useEffect, Fragment } from 'react';
import { toast } from 'react-hot-toast';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'next-share';
import { useRouter } from '@bprogress/next';
import PropTypes from 'prop-types';
// mui
import {
  Box,
  Stack,
  Button,
  IconButton,
  Typography,
  FormHelperText,
  Skeleton,
  Rating,
  Tooltip,
  Grid,
  Card,
  Divider,
  Chip
} from '@mui/material';
import Image from 'next/image';
// formik
import { useFormik, Form, FormikProvider, useField } from 'formik';
// redux
import { useDispatch, useSelector } from 'src/redux';
// redux
import { addCart } from 'src/redux/slices/product';
// styles
import RootStyled from './styled';
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';

// icons
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { MdLockOutline } from 'react-icons/md';
import { FaRegStar } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { IoBagCheckOutline } from 'react-icons/io5';
import { useSearchParams } from 'next/navigation';
import { FiExternalLink } from 'react-icons/fi';

import { capitalize } from 'lodash';

ProductDetailsSumary.propTypes = {
  product: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  totalRating: PropTypes.number.isRequired,

  onClickWishList: PropTypes.func.isRequired,
  wishlist: PropTypes.array.isRequired
};

const Incrementer = ({ ...props }) => {
  const { stockQuantity } = props;
  const [field, , helpers] = useField(props);
  // eslint-disable-next-line react/prop-types

  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box className="incrementer">
      <IconButton size="small" color="inherit" disabled={value <= 1} onClick={decrementQuantity}>
        <IoIosRemove />
      </IconButton>
      <Typography variant="body2" component="span" className="text">
        {value}
      </Typography>
      <IconButton size="small" color="inherit" disabled={value >= stockQuantity} onClick={incrementQuantity}>
        <IoIosAdd />
      </IconButton>
    </Box>
  );
};
Incrementer.propTypes = {
  stockQuantity: PropTypes.number.isRequired
};
export default function ProductDetailsSumary({ ...props }) {
  const {
    product,
    isLoading,

    totalRating,
    totalReviews,
    setSelectedVariant,
    selectedVariant,
    isSimpleProduct,
    isPopup
  } = props;
  const searchParams = useSearchParams();
  const variantParam = searchParams.get('variant') || '';

  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  const [isClient, setIsClient] = useState(false);
  const [variantObj, setVariantObj] = useState(
    isSimpleProduct
      ? null
      : {
          ...product.variants[0],
          name: product.variants[0].name
        }
  );
  console.log(variantObj, 'abc');
  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const dispatch = useDispatch();

  const { checkout } = useSelector(({ product }) => product);
  const { user } = useSelector(({ user }) => user);
  const isNotUser = user?.role === 'vendor' || user?.role?.includes('admin');
  const [isLoaded, setLoaded] = useState(false);

  const variantList = isSimpleProduct ? [] : product.variants.map((v) => v.name);
  const names = isSimpleProduct ? [] : product.variants[0].variant.split('/');
  const variants = names.map((_, i) => variantList.map((variantObj) => variantObj.split('/')[i]));
  const stockQuantity = isSimpleProduct ? product.stockQuantity : variantObj?.stockQuantity || 0;

  const isMaxQuantity =
    !isLoading &&
    checkout?.cart?.filter((item) => item._id === product._id)?.map((item) => item.quantity)[0] >= stockQuantity;

  const onAddCart = (param) => {
    toast.success('Added to cart');
    dispatch(addCart(param));
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pid: product._id,

      quantity: 1
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isNotUser) {
          toast.error('Only user can add to cart');
          return;
        }
        const alreadyProduct =
          !isLoading && checkout.cart.filter((item) => item.sku === (isSimpleProduct ? product : variantObj).sku);
        if (!Boolean(alreadyProduct.length)) {
          onAddCart({
            pid: product._id,
            name: product.name,
            sku: (isSimpleProduct ? product : variantObj).sku,
            slug: product.slug + (isSimpleProduct ? '' : '?variant=' + variantObj.name),
            stockQuantity,
            type: product.type,
            deliveryType: product.deliveryType,
            ...(product.deliveryType === 'digital' && {
              downloadLink: (isSimpleProduct ? product : variantObj).downloadLink
            }),
            ...(!isSimpleProduct && {
              variant: variantObj.name,
              variantName: variantObj.variant
            }),
            image: (isSimpleProduct ? product : variantObj).images[0].url,
            quantity: values.quantity,
            discount:
              (isSimpleProduct ? product : variantObj).price - (isSimpleProduct ? product : variantObj).salePrice,
            price: (isSimpleProduct ? product : variantObj).salePrice || (isSimpleProduct ? product : variantObj).price,
            subtotal:
              ((isSimpleProduct ? product : variantObj).salePrice || (isSimpleProduct ? product : variantObj).price) *
              values.quantity
          });
          setFieldValue('quantity', 1);
        }

        setSubmitting(false);
        router.push('/cart');
      } catch {
        setSubmitting(false);
      }
    }
  });

  const { values, touched, errors, setFieldValue, handleSubmit } = formik;
  const handleAddCart = () => {
    if (isNotUser) {
      toast.error('Only user can add to cart');
      return;
    }
    const alreadyProduct = checkout.cart.filter(
      (item) => item.sku === (isSimpleProduct ? product : variantObj).sku && item.deliveryType === 'digital'
    );
    if (Boolean(alreadyProduct.length)) {
      toast.error('Product is already in cart');
      return;
    }

    onAddCart({
      pid: product._id,
      name: product.name,
      sku: (isSimpleProduct ? product : variantObj).sku,
      slug: product.slug + (isSimpleProduct ? '' : '?variant=' + variantObj.name),
      stockQuantity,
      type: product.type,
      deliveryType: product.deliveryType,
      ...(product.deliveryType === 'digital' && {
        downloadLink: (isSimpleProduct ? product : variantObj).downloadLink
      }),
      ...(!isSimpleProduct && {
        variant: variantObj.name,
        variantName: variantObj.variant
      }),
      discount: (isSimpleProduct ? product : variantObj).price - (isSimpleProduct ? product : variantObj).salePrice,
      image: (isSimpleProduct ? product : variantObj).images[0].url,
      quantity: values.quantity,
      price: (isSimpleProduct ? product : variantObj).salePrice || (isSimpleProduct ? product : variantObj).price,
      subtotal:
        ((isSimpleProduct ? product : variantObj).salePrice || (isSimpleProduct ? product : variantObj).price) *
        values.quantity
    });

    setFieldValue('quantity', 1);
  };

  const onChangeVariant = (name, i) => {
    let splited = selectedVariant.split('/');
    splited[i] = name;
    const newVariant = splited.join('/');

    setSelectedVariant(newVariant);

    const matched = product.variants.find((v) => v.name === newVariant);
    setVariantObj(matched);
    if (!isPopup) {
      // ✅ Update URL search params
      const params = new URLSearchParams(searchParams.toString());
      params.set('variant', splited.join('_'));
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    if (variantParam) {
      const formatted = variantParam.replace(/_/g, '/');
      setSelectedVariant(formatted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantParam]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <RootStyled>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ p: 1 }}>
                <Typography noWrap variant="h6" paragraph color="text.secondary" sx={{ mb: 0, fontWeight: 500 }}>
                  {product.category.name}
                </Typography>
                <Typography variant="h3" className="heading">
                  {product.name}
                </Typography>
                <Typography noWrap variant="h6" paragraph color="text.secondary" sx={{ mb: 0, fontWeight: 500 }}>
                  {product.brand.name}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Stack direction="row" alignItems="center" className="rating-wrapper" spacing={1}>
                    <Rating value={totalRating} precision={0.1} size="small" readOnly />
                    <Typography variant="subtitle2" color="text.secondary">
                      {totalReviews || 0} {totalReviews > 1 ? 'Reviews' : 'Review'}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="body1" color="text.secondary">
                  {product.description}
                </Typography>

                <>
                  {names.map((name, index) => (
                    <Fragment key={index}>
                      <Typography
                        variant="subtitle2"
                        color="text.primary"
                        sx={{ textTransform: 'uppercase', mt: 2, mb: 1 }}
                      >
                        {name}
                      </Typography>

                      <Stack
                        direction="row"
                        gap={2}
                        sx={{
                          flexWrap: 'wrap'
                        }}
                      >
                        {[...new Set(variants[index])].map((variant, ind) =>
                          name.toLowerCase() === 'color' ? (
                            <Tooltip title={capitalize(variant)} key={variant}>
                              <Box
                                onClick={() => onChangeVariant(variant, index)}
                                key={variant}
                                sx={{
                                  position: 'relative',
                                  width: 60,
                                  height: 60,
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  overflow: 'hidden',
                                  border: (theme) =>
                                    `2px solid ` +
                                    (selectedVariant?.split('/')?.includes(variant)
                                      ? theme.palette.primary.main
                                      : theme.palette.divider)
                                }}
                              >
                                <Image
                                  src={product.variants[ind].images[0].url}
                                  alt={variant}
                                  layout="fill"
                                  objectFit="cover"
                                />
                              </Box>
                            </Tooltip>
                          ) : (
                            <Button
                              key={variant}
                              variant={selectedVariant?.split('/')?.includes(variant) ? 'contained' : 'outlined'}
                              color="primary"
                              sx={{ textTransform: 'uppercase' }}
                              onClick={() => onChangeVariant(variant, index)}
                            >
                              {variant}
                            </Button>
                          )
                        )}
                      </Stack>
                    </Fragment>
                  ))}
                </>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Card sx={{ p: 2, position: 'sticky', top: 156 }}>
                <Stack direction="row" gap={1} alignItems="center">
                  <Typography
                    variant="h4"
                    className="text-price"
                    sx={{
                      display: 'flex',

                      alignItems: 'center'
                    }}
                  >
                    {!isLoading &&
                      isLoaded &&
                      fCurrency(cCurrency(parseInt((isSimpleProduct ? product : variantObj).salePrice)))}{' '}
                    &nbsp;
                    {product.price <= product.salePrice ? null : (
                      <Typography
                        component="span"
                        className="old-price"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        {!isLoading && isLoaded && (
                          <del>{fCurrency(cCurrency(parseInt((isSimpleProduct ? product : variantObj).price)))}</del>
                        )}
                      </Typography>
                    )}
                  </Typography>
                  {(isSimpleProduct ? product : variantObj).price <=
                  (isSimpleProduct ? product : variantObj).salePrice ? null : (
                    <Chip
                      color={'success'}
                      label={`${(100 - ((isSimpleProduct ? product : variantObj).salePrice / (isSimpleProduct ? product : variantObj).price) * 100).toFixed(0)}% off`}
                    />
                  )}
                </Stack>
                {product.deliveryType === 'physical' && (
                  <Stack direction="row" alignItems="center" spacing={1} className="incrementer-wrapper" my={2}>
                    {isLoading ? (
                      <Box sx={{ float: 'right' }}>
                        <Skeleton variant="rounded" width={120} height={40} />
                      </Box>
                    ) : (
                      <div>
                        <Incrementer name="quantity" stockQuantity={stockQuantity} />
                        {touched.quantity && errors.quantity && (
                          <FormHelperText error>{touched.quantity && errors.quantity}</FormHelperText>
                        )}
                      </div>
                    )}
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      fontWeight={400}
                      sx={{
                        span: {
                          color: 'error.main'
                        }
                      }}
                    >
                      {stockQuantity > 0 ? `${stockQuantity} Items` : <span>Out of stock</span>}
                    </Typography>
                  </Stack>
                )}

                <Stack spacing={1} className="contained-buttons" mb={2}>
                  <Button
                    fullWidth
                    disabled={isMaxQuantity || isLoading || stockQuantity < 1}
                    type="button"
                    color="primary"
                    variant="text"
                    onClick={() => handleAddCart()}
                    startIcon={<FiShoppingCart />}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    disabled={isLoading || stockQuantity < 1}
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<IoBagCheckOutline />}
                  >
                    Buy Now
                  </Button>{' '}
                  {product.deliveryType === 'digital' && Boolean(product.demo) && (
                    <Button
                      fullWidth
                      component={Link}
                      href={product.demo}
                      target="_blank"
                      variant="contained"
                      color="secondary"
                      startIcon={<FiExternalLink />}
                    >
                      View Demo
                    </Button>
                  )}
                  <Stack direction="row" spacing={0.5} justifyContent={'center'}>
                    <Tooltip title="Copy Prooduct URL">
                      <IconButton
                        aria-label="copy"
                        onClick={() => {
                          navigator.clipboard.writeText(window?.location.href);
                          toast.success('Link copied.');
                        }}
                      >
                        <MdContentCopy size={24} />
                      </IconButton>
                    </Tooltip>
                    {isClient && (
                      <>
                        <Tooltip title="Share on WhatsApp">
                          <WhatsappShareButton url={window?.location.href || ''}>
                            <IconButton sx={{ color: '#42BC50' }} aria-label="whatsapp">
                              <IoLogoWhatsapp size={24} />
                            </IconButton>
                          </WhatsappShareButton>
                        </Tooltip>
                        <Tooltip title="Share on Facebook">
                          <FacebookShareButton url={window?.location.href || ''}>
                            <IconButton sx={{ color: '#1373EC' }} aria-label="facebook">
                              <FaFacebook size={24} />
                            </IconButton>
                          </FacebookShareButton>
                        </Tooltip>
                        <Tooltip title="Share on Twitter">
                          <TwitterShareButton url={window?.location.href || ''}>
                            <IconButton sx={{ color: 'text.primary' }} aria-label="twitter">
                              <FaXTwitter size={24} />
                            </IconButton>
                          </TwitterShareButton>
                        </Tooltip>
                        <Tooltip title="Share on LinkedIn">
                          <LinkedinShareButton url={window?.location.href || ''}>
                            <IconButton sx={{ color: '#0962B7' }} aria-label="linkedin">
                              <FaLinkedin size={24} />
                            </IconButton>
                          </LinkedinShareButton>
                        </Tooltip>
                      </>
                    )}
                  </Stack>
                </Stack>

                <Divider />
                {shippingData.map((item, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    my={1}
                    sx={{
                      color: 'text.secondary'
                    }}
                  >
                    {item.icon}
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.name}
                    </Typography>
                  </Stack>
                ))}
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </RootStyled>
  );
}

const shippingData = [
  {
    icon: <LiaShippingFastSolid size={20} />,
    name: 'Worldwide shipping'
  },
  {
    icon: <MdLockOutline size={20} />,
    name: 'Secure payment'
  },
  {
    icon: <FaRegStar size={20} />,
    name: '2 years full warranty'
  }
];
