import React from 'react';
import PropTypes from 'prop-types';
// components
import ChildCategoryForm from 'src/components/forms/childCategory';

AddCategory.propTypes = {
  categories: PropTypes.array.isRequired
};

export default function AddCategory({ categories }) {
  return (
    <div>
      <ChildCategoryForm categories={categories} />
    </div>
  );
}
