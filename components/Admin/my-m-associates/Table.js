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
import { IconButton, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { useState } from 'react';
import Image from 'next/image';
import edit from "../../../assets/moreIcon/Edit.svg"
import AdditionalInfoComponent from './AdditionalInfoComponent';
import EditAssociate from './EditAssociate';
import ekycicon from "../../../assets/Kyc/e-kyc icon.svg";
import eKycpending from "../../../assets/Kyc/eKycpending.svg"
import { MDLabel } from '@/components/MDLabel/MDLabel';
import { TablePagination } from '@mui/material';
import Modal from '@mui/material/Modal';
import { getTimeDifference } from '@/utils/utils';
import { GLOBALLY_COMMON_TEXT, COMPONENTS } from '@/textV2';
const { LEADS_TABLE_COMPO } = COMPONENTS
const { text: leadTableText } = LEADS_TABLE_COMPO
const { text } = GLOBALLY_COMMON_TEXT

// Utility function to convert string to camelCase
const toCamelCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/(^|\s)\w/g, (letter) => letter.toUpperCase());
};

export default function EnhancedTable({ array, setClicked, clicked }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const renderAdditionalInfoComponent = (rowId) => {
    const dataIndex = page * rowsPerPage + rowId;
    if (rowId === hoveredRowId) {
      return <AdditionalInfoComponent rowData={array[dataIndex]} key={dataIndex} />;
    }
    return null;
  };

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

  const handlePopoverOpen = (event, rowId) => {
    event.preventDefault()
    const modalElement = document.getElementById(`modal-${rowId}`);
    modalElement.style.display = 'block';
    modalElement.classList.add('left-[8px]');
    setHoveredRowId(rowId);
  };

  const handlePopoverClose = (event, rowId) => {
    event.preventDefault()
    document.getElementById(`modal-${rowId}`).style.display = 'none'
    setHoveredRowId(null);
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
      id: leadTableText.fullName,
      numeric: false,
      disablePadding: true,
      label: leadTableText.fullName,
    },
    {
      id: text.kyc,
      numeric: true,
      disablePadding: false,
      label: text.kyc,
    },
    {
      id: leadTableText.phoneNo,
      numeric: true,
      disablePadding: false,
      label: leadTableText.phoneNo,
    },
    {
      id: leadTableText.city,
      numeric: true,
      disablePadding: false,
      label: leadTableText.city,
    },
    {
      id: leadTableText.experience,
      numeric: true,
      disablePadding: false,
      label: leadTableText.experience,
    },
    {
      id: leadTableText.status,
      numeric: true,
      disablePadding: false,
      label: leadTableText.status,
    },
    {}
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
                paddingLeft: headCell.id === 'Full Name' ? '20px' : '',
                paddingLeft: headCell.id === 'KYC' ? '20px' : '',
                paddingRight: headCell.id === 'Phone No.' ? '10px' : '',
                paddingX: headCell.id === 'City' ? '10px' : '',
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
      </TableHead>
    );
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
    <Paper sx={{ marginBottom: '320px', width: '100%', zIndex: '1', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
      <TableContainer sx={{ overflow: 'visible' }}>
        <Table
          sx={{
            overflowX: 'visible',
            position: 'relative'
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
              const { _id, firstName, lastName, isKycVerified, mobileNumber, city, agentSince, approvalStatus } = rowData;
              const formattedFirstName = toCamelCase(firstName);
              const formattedLastName = toCamelCase(lastName);
              const fullName = formattedFirstName && formattedLastName ? `${formattedFirstName} ${formattedLastName}` : text.threeDash;
              const truncatedName = fullName.length > 14 ? `${fullName.substring(0, 14)}...` : fullName;

              return (
                <TableRow hover tabIndex={-1} key={_id}
                  sx={{ cursor: 'pointer', position: 'relative' }}> 
                  <TableCell onMouseLeave={(event) => handlePopoverClose(event, index)} align="center" style={{ maxWidth: '120px' }}>
                    <div style={{ display: "flex", alignItems: "center", justifyItems: 'evenly' }} >
                      <div className=''>
                        <Tooltip title={fullName} placement="top">
                          <span style={{
                            maxWidth: "100px",
                            flexShrink: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {truncatedName}
                          </span>
                        </Tooltip>
                      </div>
                      <div
                        id='iconButton'
                        className='relative'>
                        <IconButton
                          aria-label="info"
                          style={{
                            background: 'transparent',
                            border: '1px solid grey',
                            borderRadius: '50%',
                            padding: "0",
                            marginLeft: "4px"
                          }}
                          onMouseEnter={(event) => handlePopoverOpen(event, index)}   >
                          <InfoIcon
                            style={{ fontSize: '12px', color: 'rgba(128, 128, 128, 0.5)' }} />
                        </IconButton>
                        <div
                          className='hidden  bg-white rounded-full absolute z-[200] border'
                          id={`modal-${index}`}
                          onMouseLeave={(event) => handlePopoverClose(event, index)}
                        >
                          {renderAdditionalInfoComponent(index)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left" style={{ whiteSpace: 'nowrap', maxWidth: '120px', paddingLeft: '5px' }}>
                    {isKycVerified ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Image src={ekycicon} height={120} width={120} alt="ekycicon" />
                        </div>
                      </>
                    ) : (<>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src={eKycpending} height={120} width={120} alt="eKycpending" />
                      </div></>
                    )}</TableCell>
                  <TableCell align="center" style={{ whiteSpace: 'nowrap', width: '120px', }}>{mobileNumber ? <MDLabel mobileNumber={mobileNumber} /> : text.threeDash}</TableCell>
                  <Tooltip title={`${city || text.threeDash}`} position="top">
                    <TableCell style={{ maxWidth: '80px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {city || text.threeDash}
                    </TableCell>
                  </Tooltip>
                  <Tooltip title={agentSince ? getTimeDifference(agentSince) : text.threeDash} position="bottom">
                    <TableCell style={{ maxWidth: '80px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {agentSince ? getTimeDifference(agentSince) : text.threeDash}
                    </TableCell>
                  </Tooltip>
                  <TableCell align="center" style={{ whiteSpace: 'nowrap', maxWidth: '80px' }}><Tooltip title={approvalStatus === text.aprrovedText ? text.upperCaseApprovedText : approvalStatus === text.pending ? text.awaiting : text.restricted} placement="top">
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      {approvalStatus === text.aprrovedText ? text.upperCaseApprovedText : approvalStatus === text.pending ? text.awaiting : text.restricted}
                    </div>
                  </Tooltip></TableCell>
                  <TableCell align="center" style={{ whiteSpace: 'nowrap', width: 'auto' }}>
                    <Tooltip title={"Edit"} placement="top">
                      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <Image src={edit} alt='edit' width={15} height={15} onClick={() => openEditModal(index)} />
                      </div>
                    </Tooltip>
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
        <EditAssociate setClicked={setClicked} clicked={clicked} rowInfo={array[selectedRowId]} key={selectedRowId} modalState={setIsEditModalOpen} /></Box>
    </Modal>}
  </>
  );
}