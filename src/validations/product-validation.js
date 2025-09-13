import * as Yup from 'yup';
const variantSchema = Yup.object().shape({
  name: Yup.string().required('Variant name is required'),
  variant: Yup.string().required('Product Variant is required'),
  sku: Yup.string().required('SKU is required'),
  price: Yup.number().required('Price is required'),
  salePrice: Yup.number().lessThan(Yup.ref('price'), 'Sale price should be less than price').nullable(),
  stockQuantity: Yup.number().required('Stock Quantity is required'),
  images: Yup.array().min(1, 'Please upload at least one image').required('Images are required'),

  downloadLink: Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue?.trim() === '' ? null : value))
    .when('$deliveryType', {
      is: 'digital',
      then: (schema) => schema.required('Download link is required for digital variants'),
      otherwise: (schema) => schema.notRequired()
    })
});
export const ProductSchema = (isVendor) =>
  Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    tags: Yup.array().min(1, 'Tags is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    shop: isVendor ? Yup.string().nullable().notRequired() : Yup.string().required('Shop is required'),
    subCategory: Yup.string().required('Sub Category is required'),
    childCategory: Yup.string().required('Child Category is required'),
    slug: Yup.string().required('Slug is required'),
    brand: Yup.string(),
    metaTitle: Yup.string().required('Meta title is required'),
    metaDescription: Yup.string().required('Meta description is required'),
    type: Yup.string().required('Product type is required'),
    content: Yup.string().required('Content is required'),
    deliveryType: Yup.string(),
    downloadLink: Yup.string()
      .nullable()
      .transform((value, originalValue) => (originalValue?.trim() === '' ? null : value))
      .when(['deliveryType', 'type'], {
        is: (deliveryType, type) => deliveryType === 'digital' && type === 'simple',
        then: (schema) => schema.required('Download Link is required for simple digital products'),
        otherwise: (schema) => schema.notRequired()
      }),
    ...(!isVendor && { status: Yup.string().required('Status is required') }),

    images: Yup.array().min(1, 'Images is required'),
    sku: Yup.string().when('type', {
      is: 'simple',
      then: (schema) => schema.required('SKU is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    stockQuantity: Yup.number().when('type', {
      is: 'simple',
      then: (schema) => schema.required('Stock Quantity is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    price: Yup.number().when('type', {
      is: 'simple',
      then: (schema) => schema.required('Price is required'),
      otherwise: (schema) => schema.notRequired()
    }),

    salePrice: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? null : value))
      .nullable()
      .when('type', {
        is: 'simple',
        then: (schema) => schema.lessThan(Yup.ref('price'), 'Sale price should be smaller than price'),
        otherwise: (schema) => schema.notRequired()
      }),
    demo: Yup.string(),
    width: Yup.string(),
    height: Yup.string(),
    length: Yup.string(),
    variants: Yup.array()
      .of(variantSchema)
      .when('type', {
        is: 'variable',
        then: (schema) => schema.min(1, 'At least one variant is required'),
        otherwise: (schema) => schema.notRequired()
      })
  });
