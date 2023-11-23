'use client'
import * as React from 'react';
import Grid from '@mui/system/Unstable_Grid/Grid';

export default function page() {
  return (
    // <Typography component="div">
    //   <Box sx={{ textAlign: 'justify', m: 1 }}>
    //     Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet
    //     fermentum. Donec sed odio operae, eu vulputate felis rhoncus.
    //   </Box>
    //   <Box sx={{ textAlign: 'left', m: 1 }}>Left aligned text.</Box>
    //   <Box sx={{ textAlign: 'center', m: 1 }}>Center aligned text.</Box>
    //   <Box sx={{ textAlign: 'right', m: 1 }}>Right aligned text.</Box>
    // </Typography>

    <Grid container spacing={2} sx={{ alignItems: "center"}}>
      <Grid item xs={2} sm={6}>Logo</Grid>
      <Grid item xs={10} sm={6}>Logo</Grid>
    </Grid>

  );
}