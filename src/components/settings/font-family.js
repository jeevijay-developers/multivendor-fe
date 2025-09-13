import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Typography, Card, CardContent, Stack } from '@mui/material';
import { MdFontDownload } from 'react-icons/md';

import { setFontFamily } from 'src/redux/slices/settings';

// Define font options
const fontFamilies = [
  { key: 'figtree', label: 'Figtree' },
  { key: 'montserrat', label: 'Montserrat' },
  { key: 'roboto', label: 'Roboto' },
  { key: 'openSans', label: 'Open Sans' }
];

export default function ThemeSwitcher() {
  const dispatch = useDispatch();
  const { fontFamily } = useSelector((state) => state.settings);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="overline" color="inherit" gutterBottom>
          Font Families
        </Typography>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              {fontFamilies.map((font) => {
                const isActive = fontFamily === font.key;

                return (
                  <Grid size={6} key={font.key}>
                    <Button
                      onClick={() => dispatch(setFontFamily(font.key))}
                      //   variant={isActive ? 'contained' : 'text'}
                      color={isActive ? 'primary' : 'inherit'}
                      disableRipple
                      disableElevation
                      disableFocusRipple
                      size="small"
                      sx={{
                        minWidth: 1,

                        padding: 0,
                        transition: 'all 0.3s',
                        // '&:hover': { bgcolor: isActive ? 'primary.main' : alpha('#000', 0.1) },
                        svg: { fontSize: 28 }
                      }}
                    >
                      <MdFontDownload />
                    </Button>
                    <Typography
                      variant="body2"
                      display="block"
                      align="center"
                      mt={1}
                      fontWeight={isActive ? 600 : 400}
                      color={isActive ? 'primary.main' : 'text.primary'}
                    >
                      {font.label}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </div>
    </Stack>
  );
}
