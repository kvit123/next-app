
'use client'

import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button } from '@mui/material';

import handleCallClick from '../library/connectCaller';


function createData(id, name, memberid, cartype, lastbranch, branch, phoneNumber) {
  return {
    id,
    name,
    memberid,
    cartype,
    lastbranch,
    branch,
    phoneNumber
  };
}

const rows = [
  createData(1, 'ดารินทร์ ธนสมบัติ', 1110027485, 'กรอกถัง', 'บางปลาม้า 4 - PTC', 'บางปลาม้า 4 - PTC', '+66818470263'),
  createData(2, 'กีรติ รัตนาอาทิตย์', 1110005208, 'กรอกถัง', 'ปทุมธานี 2 - PTC', 'ปทุมธานี 2 - PTC', '+66818470263'),
  createData(3, 'กฤติธัช มั่นคง', 1110043011, 'กรอกถัง', 'สามโคก - PTC', 'สามโคก - PTC', '+66818470263'),
  createData(4, 'พัชรียา มหาเมธี', 1110063295, 'กรอกถัง', 'ทุ่งครุ - PTC', 'ทุ่งครุ - PTC', '+66818470263'),
  createData(5, 'พิชญ์ อุดมภักดิ์ ', 1110068352, 'กระบะบ้าน', 'ทุ่งครุ 2 - PTC', 'ทุ่งครุ 2 - PTC', '+66818470263'),
  createData(6, 'พาฝัน สถานนท์', 1110036474, 'กรอกถัง', 'ปทุมธานี 2 - PTC', 'ปทุมธานี 2 - PTC', '+66818470263'),
  createData(7, 'ณัฐกิตติ์ ศิริวรภัทร', 1110034753, 'กรอกถัง', 'ทุ่งครุ - PTC', 'ทุ่งครุ - PTC', '+66818470263'),
  createData(8, 'จิรพัฒน์ เลิศคุณวงส์ ', 1110087873, 'กรอกถัง', 'บางปลาม้า 4 - PTC', 'บางปลาม้า 4 - PTC', '+66818470263'),
  createData(9, 'ลักษ์วิสา ภูภาค', 1110015075, 'กรอกถัง', 'ปทุมธานี 2 - PTC', 'ปทุมธานี 2 - PTC', '+66818470263'),
  createData(10, 'โสรยา สว่างเสนา', 1110015075, 'กรอกถัง', 'สามโคก - PTC', 'สามโคก - PTC', '+66818470263'),
  createData(11, 'จิรณัฐ บุญดี', 1110081186, 'กรอกถัง', 'สามโคก - PTC', 'สามโคก - PTC', '+66818470263'),
  createData(12, 'กนิษฐา วีระโชติ', 1110042154, 'กรอกถัง', 'บางปลาม้า 4 - PTC', 'บางปลาม้า 4 - PTC', '+66818470263'),
  createData(13, 'เศรษฐา ประชายุต ', 1110077812, 'กระบะบ้าน', 'ทุ่งครุ 2 - PTC', 'ทุ่งครุ 2 - PTC', '+66818470263'),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'ชื่อ-นามสกุล',
  },
  {
    id: 'memberid',
    numeric: true,
    disablePadding: false,
    label: 'บัตรสมาชิก',
  },
  {
    id: 'cartype',
    numeric: false,
    disablePadding: false,
    label: 'ประเภทรถ',
  },
  {
    id: 'lastbranch',
    numeric: false,
    disablePadding: false,
    label: 'สาขาที่ใช้ล่าสุด',
  },
  {
    id: 'branch',
    numeric: false,
    disablePadding: false,
    label: 'สาขาที่โทร',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Contact list
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Page() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     setSelected(newSelected);
//   };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


//   const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (

        <Box sx={{ width: '70%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
            <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
            >
                <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                //   onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                />
                <TableBody>
                {visibleRows.map((row, index) => {
                    // const isItemSelected = isSelected(row.id);
                    // const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                    <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.id)}
                        // role="checkbox"
                        // aria-checked={isItemSelected}
                        // tabIndex={-1}
                        key={row.id}
                        // selected={isItemSelected}
                        // sx={{ cursor: 'pointer' }}
                    >
                        {/* <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                            'aria-labelledby': labelId,
                            }}
                        />
                        </TableCell> */}
                        <TableCell
                        component="th"
                        //id={labelId}
                        scope="row"
                        padding="none"
                        >
                        {row.name}
                        </TableCell>
                        <TableCell align="center">{row.memberid}</TableCell>
                        <TableCell align="center">{row.cartype}</TableCell>
                        <TableCell align="center">{row.lastbranch}</TableCell>
                        <TableCell align="center">{row.branch}</TableCell>
                        <TableCell align="center"><Button variant="outlined" href={'/contact/'+row.id}>โทร</Button></TableCell>
                        {/* <TableCell align="center"><Button variant="outlined" onClick={() => handleCallClick(row.phoneNumber)}>โทร</Button></TableCell> */}
                    </TableRow>
                    );
                })}
                {emptyRows > 0 && (
                    <TableRow
                    style={{
                        height: (dense ? 33 : 53) * emptyRows,
                    }}
                    >
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </Box>


)
}