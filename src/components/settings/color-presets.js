import { useDispatch, useSelector } from 'react-redux';
import { alpha, Button, Grid, Typography, Card, CardContent } from '@mui/material';
import colorPresets from '@/theme/presets';
import { setColorPreset } from 'src/redux/slices/settings';
import { PiPaintBucket } from 'react-icons/pi';

export default function ThemeSwitcher() {
  const dispatch = useDispatch();
  const { colorPreset } = useSelector((state) => state.settings);

  return (
    <div>
      <Typography variant="overline" color="inherit" gutterBottom>
        Color Presets
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {Object.keys(colorPresets).map((key) => {
              const isActive = colorPreset === key;
              const color = colorPresets[key].primary.main;

              return (
                <Grid size={4} key={key}>
                  <Button
                    onClick={() => dispatch(setColorPreset(key))}
                    variant={isActive ? 'contained' : 'text'}
                    disableRipple
                    sx={{
                      minWidth: 1,
                      minHeight: 56,
                      padding: 0,
                      transition: 'all 0.3s',
                      '&:hover': { bgcolor: isActive ? color : alpha(color, 0.2) },
                      svg: { fontSize: 28, color: isActive ? 'common.white' : color }
                    }}
                  >
                    <PiPaintBucket />
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
