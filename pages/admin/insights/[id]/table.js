import * as React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { NOT_AVAILABLE } from '@/text'
import Box from '@mui/material/Box'
import { alpha } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'
import { MDLabel } from '@/components/MDLabel/MDLabel'
import InfoIcon from '@material-ui/icons/Info';
import { IconButton } from '@material-ui/core';
import User_cicrle_light from '@/assets/MenuIcons/ProfileDropdown/defaultProfileIcon.svg'
import AdditionalInfoComponent from './AdditionalInfoComponent'
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
const { text } = GLOBALLY_COMMON_TEXT

export default function EnhancedTable({
  array,
  handleSortState,
  currentPage
}) {
  function formatDateToDDMMYYYY(originalDateString) {
    const dateObject = new Date(originalDateString)
    const day = dateObject.getDate().toString().padStart(2, '0')
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObject.getFullYear()
    return `${day}/${month}/${year}`
  }
  const [hoveredRowId, setHoveredRowId] = useState(null);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
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
  const renderAdditionalInfoComponent = (rowId) => {
    const dataIndex = (currentPage - 1) * 10 + rowId;
    if (rowId === hoveredRowId) {
      return <AdditionalInfoComponent rowData={array?.activities[dataIndex]} key={dataIndex} />;
    }
    return null;
  };
  const headCells = [
    {
      id: 'Enquired From',
      numeric: true,
      disablePadding: false,
      label: 'Enquired From',
    },
    { id: 'Email', numeric: true, disablePadding: false, label: 'Email' },
    {
      id: 'Phone No',
      numeric: true,
      disablePadding: false,
      label: 'Phone No',
    },
    { id: 'city', numeric: true, disablePadding: false, label: 'City' },
    { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  ]
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property)
    }

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
              }}>

              {headCell.id === 'salePrice' && (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )}
              {headCell.id !== 'salePrice' && headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  }
  function EnhancedTableToolbar(props) {
    const { numSelected } = props

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
        style={{ minHeight: '0px' }}
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
            variant="body1"
            id="tableTitle"
            component="div"
          ></Typography>
        )}
      </Toolbar>
    )
  }
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  }
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return <>
    <Box sx={{ width: '100%' }}>
      <EnhancedTableToolbar />
      <TableContainer
        sx={{
          borderRadius: '4px',
          border: '1px solid #E0E0E0',
          '&::-webkit-scrollbar': {
            height: '4px',
            display: 'unset',
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 2px #ffffff',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#931602',
            borderRadius: '4px',
          },
        }}
      >
        <Table
          sx={{
            overflowX: 'scroll',
            borderWidth: '0px',
          }}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleSortState}
          />
          <TableBody>
            {array?.activities &&
              Object.keys(array.activities).map((row, index) => {
                const rowData = array.activities[row] || {};
                const {
                  _id,
                  createdAt,
                  firstName,
                  lastName,
                  email,
                  mobileNumber,
                  city,
                  profileImage,
                } = rowData || '';

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        width: '200px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      onMouseLeave={(event) => handlePopoverClose(event, index)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='mr-2'>
                          {profileImage ? (
                            <img
                              className="rounded-full w-10 h-10 object-cover"
                              src={profileImage}
                            />
                          ) : (
                            <Image src={User_cicrle_light} width={40} height={40} />
                          )}
                        </div>
                        <Tooltip
                          title={firstName && lastName ? `${firstName} ${lastName}` : NOT_AVAILABLE}
                          placement="top"
                        >
                          <p
                            style={{
                              width: '80px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {firstName && lastName ? `${firstName} ${lastName}` : NOT_AVAILABLE}
                          </p>
                        </Tooltip>
                        <div id='iconButton' className='absolute left-[170px]'>
                          <IconButton
                            aria-label="info"
                            onMouseEnter={(event) => handlePopoverOpen(event, index)}
                            style={{
                              background: 'transparent',
                              border: '1px solid grey',
                              borderRadius: '50%',
                              padding: '0',
                              marginLeft: '4px',
                            }}
                          >
                            <InfoIcon style={{ fontSize: '12px', color: 'rgba(128, 128, 128, 0.5)' }} />
                          </IconButton>
                          <div
                            className='hidden bg-white rounded-full absolute z-[200] border'
                            id={`modal-${index}`}
                            onMouseLeave={(event) => handlePopoverClose(event, index)}
                          >
                            {renderAdditionalInfoComponent(index)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ maxWidth: '80px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <Tooltip title={`${email || NOT_AVAILABLE || text.threeDash}`} placement="top">
                        <p className='truncate'> {email || NOT_AVAILABLE || text.threeDash}</p>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        width: '200px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {mobileNumber ? <MDLabel mobileNumber={mobileNumber} /> : NOT_AVAILABLE}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        padding: '12px 16px',
                        width: '150px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <Tooltip title={city || NOT_AVAILABLE} placement="top">
                        {city || NOT_AVAILABLE}
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        padding: '12px 16px',
                        width: '120px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {createdAt ? formatDateToDDMMYYYY(createdAt) : NOT_AVAILABLE}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </>
}