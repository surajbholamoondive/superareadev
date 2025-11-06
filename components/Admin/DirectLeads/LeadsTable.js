import * as React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import {
  ENQUIRY_RECEIVED,
} from '@/text'
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'

import { MDLabel } from '@/components/MDLabel/MDLabel'

import defaultIcon from '../../../assets/userDashboard/close.svg'
import styleScroll from '../EditProject/index.module.css'
import NoDataInfo from '../my-m-associates/NoDataInfo.js/index.js'

const { LEADS_TABLE_COMPO } = COMPONENTS
const { text, symbols } = GLOBALLY_COMMON_TEXT
const { text: leadTableText } = LEADS_TABLE_COMPO
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 1,
  p: 4,
  borderRadius: '8px',
}
function descendingComparator(a, b, orderBy) {
  if (orderBy === 'date') {
    const dateA = new Date(a[orderBy]).getTime()
    const dateB = new Date(b[orderBy]).getTime()

    if (dateB < dateA) {
      return -1
    }
    if (dateB > dateA) {
      return 1
    }
    return 0
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index])
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis?.map((el) => el[0])
}
const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Full Name',
    sort: false,
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
    sort: false,
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone No.',
    sort: false,
  },
  // {
  //   id: 'city',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'City',
  //   sort: true,
  // },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Date',
    sort: true,
  },
  {
    id: 'message',
    numeric: false,
    disablePadding: false,
    label: 'Message',
    sort: true,
  },
]
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }
  return (
    <TableHead>
      <TableRow style={{ backgroundColor: '#E2ECF2' }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              fontWeight: 'bold',
              padding: '5px 0px',
              width: '100px',
              maxWidth: '300px',
            }}
          >
            {headCell.sort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                <p className="font-bold"> {headCell.label}</p>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography
                variant="body1"
                style={{
                  fontWeight: 'bold',
                  padding: '5px',
                  width: '120px',
                  maxWidth: '300px',
                }}
              >
                <p className="font-bold"> {headCell.label}</p>
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
}
function EnhancedTableToolbar() {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Nutrition
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
}

const LeadsTable = ({ Leads, recentOnly }) => {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('date')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [open, setOpen] = React.useState(false)
  const [selectedContent, setSelectedContent] = React.useState({})
  const [showAll, setShowAll] = useState(false)
  const handleClose = () => setOpen(false)
  const handleCloseModal = () => {
    setSelectedContent('')
    handleClose()
  }
  const handleOpen = ({
    fullName,
    email,
    mobileNumber,
    message,
    // city,
    createdAt,
  }) => {
    setSelectedContent({
      fullName,
      email,
      mobileNumber,
      message,
      // city,
      createdAt,
    })
    setOpen(true)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const visibleRows = React.useMemo(
    () =>
      stableSort(Leads, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + (showAll ? Leads?.length : rowsPerPage)
      ),
    [order, orderBy, page, rowsPerPage, Leads, showAll]
  )
  return (
    <>
      <Box
        sx={{ width: '100%', marginTop: Leads?.length === 0 ? '0px' : '16px' }}
      >
        {Leads?.length > 0 ? (
          <>
            <TableContainer>
              <Table
                sx={{ minWidth: 850 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {visibleRows?.map(
                    (
                      {
                        fullName,
                        email,
                        mobileNumber,
                        message,
                        // city,
                        createdAt,
                      },
                      index
                    ) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell
                          component="th"
                          scope="row"
                          align="left"
                          style={{
                            padding: '5px',
                            width: '120px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          <p className="line-clamp-1 max-w-[120px]">
                            {fullName
                              ?.toLowerCase()
                              .replace(/\b\w/g, (char) => char.toUpperCase())}
                          </p>
                        </TableCell>

                        <TableCell
                          align="left"
                          style={{
                            padding: '5px 4px',
                            width: '140px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          <p className="line-clamp-1 max-w-[200px]">{email}</p>
                        </TableCell>

                        <TableCell
                          align="left"
                          style={{
                            padding: '5px 0px',
                            width: '132px',
                          }}
                        >
                          <MDLabel mobileNumber={mobileNumber} />
                        </TableCell>
                        {/* <TableCell
                          align="left"
                          style={{
                            padding: '5px 0px',
                            width: '120px'
                          }}
                        >
                          <p>{city}</p>
                        </TableCell> */}
                        <TableCell
                          align="left"
                          style={{
                            padding: '5px 0px',
                            width: '50px',
                          }}
                        >
                          <p>
                            {new Date(createdAt).toLocaleString('en-US', {
                              month: 'short',
                              day: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            })}
                          </p>
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            padding: '5px',
                            width: '200px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                            lineHeight: '20px',
                          }}
                          className="min-h-[50px]"
                        >
                          <p className="flex">
                            <span className="w-[120px] line-clamp-1 mr-3">
                              {message}
                            </span>
                            <span
                              className="underline cursor-pointer font-bold text-primary mr-2 capitalize"
                              onClick={() =>
                                handleOpen({
                                  fullName,
                                  email,
                                  mobileNumber,
                                  message,
                                  // city,
                                  createdAt,
                                })
                              }
                            >
                              {text.viewText}
                            </span>
                          </p>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {!recentOnly && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={Leads?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </>
        ) : (
          <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[620px] flex items-center">
            <NoDataInfo />
          </div>
        )}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="h-60 max-h-fit w-[600px] ">
          <Typography id="modal-modal-title" variant="h6">
            <h2 className="text-center -mt-2 ">{ENQUIRY_RECEIVED}</h2>
            <div className="flex flex-wrap justify-between mt-3">
              <div className="w-[40%] flex items-center mb-2">
                <span className="font-bold">{leadTableText.fullName} </span>
                <span className="mx-1">{symbols.dash}</span>
                <p>{selectedContent.fullName}</p>
              </div>
              <div className="w-[40%] flex items-center mb-3">
                <span className="font-bold ">{leadTableText.phone} </span>
                <span className="mx-1">{symbols.dash}</span>
                <MDLabel mobileNumber={selectedContent.mobileNumber} />
              </div>
              <div className="w-[50%] flex items-center">
                <span className="font-bold whitespace-nowrap">
                  {leadTableText.email}{' '}
                </span>
                <span className="mx-1">{symbols.dash}</span>
                <p>{selectedContent.email}</p>
              </div>
              <div className="w-[40%] flex items-center">
                {/* <span className="font-bold">{leadTableText.city} </span> */}
                <span className="mx-1">{symbols.dash}</span>
                {/* <p>{selectedContent.city}</p> */}
              </div>
            </div>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              border: '1.5px solid gray',
              padding: '12px',
              borderRadius: '8px',
              overflowY: 'auto',
            }}
            className={` h-[80px] -ml-[1px] pr-5 ${styleScroll.customScroll}`}
          >
            <p> {selectedContent.message} </p>
          </Typography>
          <div
            className="  border-[1px] border-gray rounded-full p-[5px] cursor-pointer absolute top-2 right-3 "
            onClick={handleCloseModal}
          >
            <Image src={defaultIcon} height={10} width={10} />
          </div>
        </Box>
      </Modal>
    </>
  )
}
export default LeadsTable
