'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/system/Stack';
import { styled } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'left',
    borderRadius: 4,
  }));

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function Page() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return (
      <Box sx={{ width: '100%' }}>
        <h1>ขั้นตอนการปฏิบัติงาน – การติดต่อลูกค้าและบันทึกข้อมูล</h1>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="อัพเดทผลการโทรไปสอบถาม" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>

        <Grid container spacing={2}>
            <Grid xs={4}>
                <Item>
                    <h3>ข้อมูล</h3>
                    <Stack spacing={2}>
                        <Item>
                            <TextField
                                id="outlined-read-only-input"
                                label="สาขาที่โทร"
                                defaultValue="บางปลาม้า 4 - PTC"
                                InputProps={{
                                    readOnly: true,
                                }}
                                />
                        </Item>
                        <Item>
                            <TextField
                            id="outlined-read-only-input"
                            label="ชื่อ-นามสกุล (ลูกค้า)"
                            defaultValue="ดารินทร์ ธนสมบัติ"
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                        </Item>
                        <Item>
                            <TextField
                            id="outlined-read-only-input"
                            label="วันที่ โทรสอบถาม"
                            defaultValue="06/11/2023 15:30:58"
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                        </Item>
                    </Stack>
                </Item>
            </Grid>
            <Grid xs={8}>
                <Item><h3>ผลการโทรสอบถาม</h3> </Item>
            </Grid>
        </Grid>

        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    );
  }
