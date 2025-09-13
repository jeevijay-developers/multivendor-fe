import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { last } from 'lodash';
// mui
import { Typography, Box, Breadcrumbs } from '@mui/material';

function LinkItem({ link, admin }) {
  const { href, name, icon } = link;
  return (
    <Typography
      component={Link}
      key={name}
      href={href}
      passHref
      variant={admin ? 'body1' : 'body2'}
      sx={{
        lineHeight: 2,
        display: 'flex',
        alignItems: 'center',
        color: admin ? 'text.primary' : 'common.white',
        '& > div': { display: 'inherit' }
      }}
    >
      {icon && (
        <Box
          sx={{
            mr: 1,
            '& svg': {
              width: admin ? 30 : 20,
              height: admin ? 30 : 20,
              color: admin ? 'text.primary' : 'common.white'
            }
          }}
        >
          {icon}
        </Box>
      )}
      {name}
    </Typography>
  );
}

LinkItem.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.node
  }).isRequired,
  admin: PropTypes.bool.isRequired
};

function MBreadcrumbs({ links, admin, activeLast = false, ...other }) {
  const currentLink = last(links)?.name;

  const listDefault = links.map((link) => <LinkItem key={link.name} link={link} admin={admin} />);
  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} admin={admin} />
      ) : (
        <Typography
          variant={admin ? 'body1' : 'body2'}
          sx={{
            maxWidth: 260,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: (theme) => theme.palette.grey[400],
            textOverflow: 'ellipsis'
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <Breadcrumbs separator="›" {...other}>
      {activeLast ? listDefault : listActiveLast}
    </Breadcrumbs>
  );
}

MBreadcrumbs.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.node
    })
  ).isRequired,
  admin: PropTypes.bool.isRequired,
  icon: PropTypes.node,
  activeLast: PropTypes.bool
};

export default MBreadcrumbs;
