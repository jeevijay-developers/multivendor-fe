// mui
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

// mui
import { Typography, Fab, Stack } from '@mui/material';

// icons
import { IoIosRemove } from 'react-icons/io';
import { IoIosAdd } from 'react-icons/io';

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0.5, 0.75)
}));

function Incrementer({ ...props }) {
  const { stockQuantity, quantity, onIncrease, onDecrease } = props;

  return (
    <Stack sx={{ width: 96, mb: 0 }}>
      <IncrementerStyle>
        <Fab
          size="small"
          color="primary"
          onClick={onDecrease}
          disabled={quantity <= 1}
          sx={{
            width: 26,
            maxHeight: 26,
            minHeight: 'auto'
          }}
        >
          <IoIosRemove size={16} />
        </Fab>
        {quantity}
        <Fab
          size="small"
          color="primary"
          onClick={onIncrease}
          disabled={quantity >= stockQuantity}
          sx={{
            width: 26,
            maxHeight: 26,
            minHeight: 'auto'
          }}
        >
          <IoIosAdd size={16} />
        </Fab>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
        Available: {stockQuantity}
      </Typography>
    </Stack>
  );
}

export default Incrementer;
Incrementer.propTypes = {
  stockQuantity: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired
};
