import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useState } from 'react';
import Image from 'next/image';
import edit from "../../../assets/moreIcon/Edit.svg"
import EditBugStatus from './EditBugStatus';
import { TablePagination, Tooltip } from '@mui/material';
import Modal from '@mui/material/Modal';
import resolved from "../../../assets/BugTab/Bugresolvedicon.svg"
import pending from '../../../assets/M-verification/pending.svg'
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
const { text,bugtext } = GLOBALLY_COMMON_TEXT


export default function EnhancedTable({ array, setClicked, clicked }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const openEditModal = (index) => {
    const dataIndex = page * rowsPerPage + index;
    setSelectedRowId(dataIndex);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRowId(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function formatDateToDDMMYYYY(originalDateString) {
    const dateObject = new Date(originalDateString);
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const headCells = [
    {
      id: bugtext.bugtitle,
      numeric: false,
      disablePadding: true,
      label: bugtext.bugtitle,
    },
    {
      id: bugtext.bugdescription,
      numeric: true,
      disablePadding: false,
      label: bugtext.bugdescription,
    },
    {
      id: bugtext.bugstatus,
      numeric: true,
      disablePadding: false,
      label: bugtext.bugstatus,
    },
    {
      id: bugtext.bugreported,
      numeric: true,
      disablePadding: false,
      label: bugtext.bugreported,
    }
  ];

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              padding={'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{
                fontSize: "14px",
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                width: 'auto',

              }}>
              {headCell.id === 'salePrice' && (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}>
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )}
              {headCell.id !== 'salePrice' && headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>);
  }
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
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
            component="div">
          </Typography>
        )}
      </Toolbar>
    );
  }
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (<>
    <Paper sx={{ width: '100%', zIndex: '1', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
      <TableContainer sx={{ overflow: 'visible' }}>
        <Table
          sx={{
            overflowX: 'visible'
          }}
          aria-labelledby="tableTitle"
          size={'medium'}>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy} />
          <TableBody >
            {array?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              const dataIndex = page * rowsPerPage + index;
              const rowData = array[dataIndex] || {};
              const { _id, bugTitle, bugDetails, virtualProof, bugStatus, createdAt} = rowData;
              return (
                <TableRow hover tabIndex={-1} key={_id}
                  sx={{ cursor: 'pointer' }}>
                  <TableCell
                  align="left"
                  style={{ width: '180px', padding: '10px' }}
                >
                  <div className="flex" style={{ alignItems: 'center' }}>
                    <div className="relative rounded-lg overflow-hidden w-24 h-16 bg-gray-800">
                      <Image
                        src={virtualProof[0]?.url||process.env.NEXT_PUBLIC_PROPERTY_IMG}
                        alt="Property"
                        layout="fixed"
                        fill
                      />
                    </div>
                    <Tooltip
                      title={bugTitle|| text.threeDash}
                      placement="top"
                    >
                      <span
                        style={{
                          maxWidth: '180px',
                          marginLeft: '8px',
                          flexShrink: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {bugTitle || text.threeDash}
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
                <Tooltip title={`${bugDetails|| text.threeDash}`} position="top">

                    <TableCell style={{ maxWidth: '80px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {bugDetails || text.threeDash}
                    </TableCell>
                    </Tooltip>
                    <TableCell 
                    style={{ maxWidth: '80px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {bugStatus==='pending' ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'start' }}>
                          <Image src={pending} height={80} width={80} alt="ekycicon" />
                        </div>
                      </>
                    ) : (<>
                      <div style={{ display: 'flex', justifyContent: 'start' }}>
                        <Image src={resolved} height={30} width={30} alt="eKycpending" />
                      </div></>
                    )}
                    </TableCell>
                    <TableCell style={{ maxWidth: '60px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <div className='flex gap-4'><Tooltip title={createdAt? formatDateToDDMMYYYY(createdAt): text.threeDash} position="top">
                      {createdAt? formatDateToDDMMYYYY(createdAt): text.threeDash}
                      </Tooltip>
                      <Tooltip title={"Edit Bug Status"} placement="top">
                      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <Image src={edit} alt='edit' width={15} height={15} onClick={() => openEditModal(index)} />
                      </div>
                    </Tooltip>
                    </div>
                    </TableCell>
                </TableRow>
              );
            })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={array?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    {isEditModalOpen && <Modal
      open={isEditModalOpen}
      onClose={closeEditModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center overflow-y-auto outline-none">
      <Box className="bg-[#FFFFFF] px-8 py-4 rounded-2xl w-1/3 max-h-[90vh] overflow-y-auto">
        <EditBugStatus setClicked={setClicked} clicked={clicked} rowInfo={array[selectedRowId]} key={selectedRowId} setIsEditModalOpen={setIsEditModalOpen} isEditModalOpen={isEditModalOpen}/></Box>
    </Modal>}
  </>
  );
}