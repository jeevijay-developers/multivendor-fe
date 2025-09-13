import React from 'react';
// components
import AttributesForm from 'src/components/forms/attributes';

export default function EditAttributes({ data, isLoading }) {
  return (
    <div>
      <AttributesForm data={data} isLoading={isLoading} />
    </div>
  );
}
