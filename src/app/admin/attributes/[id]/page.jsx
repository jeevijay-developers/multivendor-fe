'use client';
import React, { use } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// api
import { useQuery } from '@tanstack/react-query';
import * as api from 'src/services';
import EditAttributes from 'src/components/_admin/attributes/editAttribute';

Page.propTypes = { params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired };

export default function Page(props) {
  const params = use(props.params);
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['attributes-edit', params.id],
    queryFn: () => api.getAttributeByAdmin(params.id),
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    }
  });
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Edit Attribute"
        links={[
          { name: 'Dashboard', href: '/admin/dashboard' },
          { name: 'Attributes', href: '/admin/attributes' },
          { name: 'Edit Attribute' }
        ]}
      />
      <EditAttributes data={data?.data} isLoading={isLoading} />
    </div>
  );
}
