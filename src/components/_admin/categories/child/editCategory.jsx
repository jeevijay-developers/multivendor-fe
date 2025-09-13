import React from 'react';
import PropTypes from 'prop-types';
// components
import ChildCategoryForm from 'src/components/forms/childCategory';

EditCategory.propTypes = {
  data: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default function EditCategory({ data, categories, isLoading }) {
  return (
    <div>
      <ChildCategoryForm data={data} categories={categories} isLoading={isLoading} />
    </div>
  );
}
