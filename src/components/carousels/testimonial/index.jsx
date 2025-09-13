// react
'use client';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Image from 'next/image';

// mui
import { Box, Typography, Card, Stack, Rating, Avatar } from '@mui/material';
// icons
import { GoVerified } from 'react-icons/go';
import { FaFemale, FaMale, FaTransgender } from 'react-icons/fa';

// ----------------------------------------------------------------------
TestimonialDetailsCarousel.propTypes = {
  item: PropTypes.object.isRequired
};

function TestimonialDetailsCarousel({ ...props }) {
  const { item } = props;

  return (
    <div className="slide-wrapper">
      {item && (
        <Card
          sx={{
            p: 2,
            width: '100%',
            maxWidth: 500,
            ml: 'auto'
          }}
        >
          <Stack spacing={1} alignItems="center" justifyContent="center" textAlign="center">
            {item.user?.cover?.url ? (
              <Image
                priority
                component={Avatar}
                src={item.user.cover.url}
                alt="avatar"
                draggable={false}
                height={80}
                width={80}
                sizes="100px"
                style={{
                  borderRadius: 50
                }}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: 'grey.200',
                  width: 80,
                  height: 80,
                  fontSize: 40
                }}
              >
                {item.user.gender === 'female' ? (
                  <FaFemale color="#e91e63" />
                ) : item.user.gender === 'male' ? (
                  <FaMale color="#2196f3" />
                ) : (
                  <FaTransgender color="#9c27b0" />
                )}
              </Avatar>
            )}

            <Stack alignItems="center" justifyContent="center" textAlign="center" mt={1}>
              <Typography variant="h6">{item.user.firstName + ' ' + item.user.lastName}</Typography>
              {item.user.city && item.user.country && (
                <Typography variant="body1">
                  {item.user.city}, {item.user.country}
                </Typography>
              )}
            </Stack>

            <Rating value={item.rating} readOnly size="small" />
            <Typography variant="body1">{item.review}</Typography>
          </Stack>
        </Card>
      )}
    </div>
  );
}

export default function TestimonialCarousel({ ...props }) {
  const { imageIndex, images } = props;
  const { themeMode } = useSelector(({ settings }) => settings);
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      <Card
        sx={{
          display: { xs: 'none', md: 'flex' },
          mr: 'auto',
          ml: 8,
          bgcolor: 'primary.main',
          position: 'absolute',
          top: 30,
          left: -60,
          p: 2,
          color: 'common.white',
          minWidth: 210,
          zIndex: 99
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <GoVerified size={40} />
          <Stack spacing={0}>
            <Typography variant="subtitle2">{images[imageIndex].rating}/5</Typography>
            <Rating value={images[imageIndex].rating} readOnly size="small" />
            <Typography variant="subtitle2">{images[imageIndex].rating} Star Rating</Typography>
          </Stack>
        </Stack>
      </Card>
      <TestimonialDetailsCarousel
        themeMode={themeMode}
        item={images[imageIndex]}
        index={images[imageIndex]}
        activeStep={imageIndex}
        isActive={imageIndex}
        key={Math.random()}
      />
    </Box>
  );
}
TestimonialCarousel.propTypes = {
  product: PropTypes.object,
  data: PropTypes.object
};
