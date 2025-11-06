import * as React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import {
  ADMIN_SIDE,
  AGENT_SIDE,
  AREA_MAPS,
  CITY,
  DATE,
  EMAIL_TEXT,
  ENQUIRED_BY,
  LISTING,
  NOT_AVAILABLE,
  PHONE_NO,
  PRICE,
  RUPEES_SYMBOL,
  USER_SIDE,
  VIEWED_TAB,
  WISHLISTED_TAB,
} from '@/text'
import { formatNumberWithUnit, numberFormatter, projectPriceMap } from '@/utils/utils'
import Box from '@mui/material/Box'
import { alpha } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import trendsSvg from "../../../assets/Trends/stats.svg";
import Link from 'next/link'
import { MDLabel } from '@/components/MDLabel/MDLabel'

export default function EnhancedTable({
  array,
  valueType,
  handleSortState,
  tableToRender
}) {
  
  function formatDateToDDMMYYYY(originalDateString) {
    const dateObject = new Date(originalDateString)
    const day = dateObject.getDate().toString().padStart(2, '0')
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObject.getFullYear()
    return `${day}/${month}/${year}`
  }
  const generatePropertyURL = (propertyDetail) => {
    const { _id, propertyTitle } = propertyDetail || {};
    let url = '';
    if (propertyTitle) {
      url = `insights/${_id}?type=property`;
    } else {
      url = `insights/${_id}?type=project`;
    }
    return url;
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
  let headCells = []
  if (valueType === VIEWED_TAB) {
    headCells = [
      {
        id: 'propertyTitle',
        numeric: false,
        disablePadding: true,
        label: 'Listing',
      },
      {
        id: 'salePrice',
        numeric: true,
        disablePadding: false,
        label: 'Price',
      },
      {
        id: 'Listing Type',
        numeric: true,
        disablePadding: false,
        label: "Listing Type",
      },
      { id: "Listing City", numeric: true, disablePadding: false, label: "Listing City" },
      { id: 'Size', numeric: true, disablePadding: false, label: 'Size' },
      {
        id: 'viewed',
        numeric: true,
        disablePadding: false,
        label: 'Total Viewed',
      },
    ]
  } else if (valueType === WISHLISTED_TAB) {
    headCells = [
      {
        id: 'propertyTitle',
        numeric: false,
        disablePadding: true,
        label: 'Listing',
      },
      {
        id: 'salePrice',
        numeric: true,
        disablePadding: false,
        label: 'Price',
      },
      {
        id: 'Listing Type',
        numeric: true,
        disablePadding: false,
        label: "Listing Type",
      },
      { id: "Listing City", numeric: true, disablePadding: false, label: "Listing City" },
      { id: 'Size', numeric: true, disablePadding: false, label: 'Size' },
      {
        id: 'Wishlisted',
        numeric: true,
        disablePadding: false,
        label: 'Total Wishlisted',
      },
    ]
  } else {
    if (tableToRender === 'adminSide') {
      headCells = [
        {
          id: 'propertyTitle',
          numeric: false,
          disablePadding: true,
          label: 'Listing',
        },
        {
          id: 'salePrice',
          numeric: true,
          disablePadding: false,
          label: 'Price',
        },
        {
          id: 'Listing Type',
          numeric: true,
          disablePadding: false,
          label: "Listing Type",
        },
        { id: "Listing City", numeric: true, disablePadding: false, label: "Listing City" },
        { id: 'Size', numeric: true, disablePadding: false, label: 'Size' },
        {
          id: 'Enquired',
          numeric: true,
          disablePadding: false,
          label: 'Total Enquired',
        },
      ]
    }
    else {
      headCells = [
        {
          id: 'propertyTitle',
          numeric: true,
          disablePadding: false,
          label: LISTING,
        },
        {
          id: 'salePrice',
          numeric: true,
          disablePadding: false,
          label: PRICE,
        },
        {
          id: 'Enquired From',
          numeric: true,
          disablePadding: false,
          label: ENQUIRED_BY,
        },
        {
          id: 'Email',
          numeric: true,
          disablePadding: false,
          label: EMAIL_TEXT,
        },
        {
          id: 'Phone No',
          numeric: true,
          disablePadding: false,
          label: PHONE_NO,
        },
        {
          id: 'city',
          numeric: true,
          disablePadding: false,
          label: CITY,
        },
        {
          id: 'date',
          numeric: true,
          disablePadding: false,
          label: DATE,
        },
      ]
    }
  }
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
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
              }}
              className={`${headCell.id === 'Phone No' ? '' :
                headCell.id === 'date' && !valueType === 'viewed' ? '' :
                  (headCell.id === 'salePrice' && tableToRender === ADMIN_SIDE) ? '' :
                    (headCell.id === 'salePrice' && tableToRender === AGENT_SIDE && valueType==="enquired" ) ? 'p-0 max-lg:pl-[2%] lg:pl-4' :
                    (headCell.id === 'salePrice' && tableToRender === AGENT_SIDE && valueType!=="enquired" )?'p-0 max-lg:pl-[2.4%] lg:pl-[16px]':
                      (headCell.id === 'salePrice' && tableToRender === USER_SIDE ) ? "p-0 lg:pl-[15px] max-lg:pl-[2%]" : ""}`}
            >
            <p className='font-bold'>{headCell.label}</p>
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
    {(tableToRender!=='adminSide' && valueType==='enquired') ? (
    <div>
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
      size="medium"
    >
      <EnhancedTableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={handleSortState}
      />
      <TableBody>
        {array?.activities &&
          Object.keys(array.activities).map((row) => {
            const rowData = array.activities[row] || {};
            const {
              propertyTitle,
              combinedPrice,
              _id,
              lastName,
              firstName,
              email,
              mobileNumber,
              city,
              createdAt,
              projectTitle,
              projectImages,
              propertyImages,
              projectUnits,
            } = rowData;

            return (
              <TableRow hover tabIndex={-1} key={row.id}>
                <TableCell
                  align="left"
                  style={{ width: '180px', padding: '10px' }}
                >
                  <div className="flex" style={{ alignItems: 'center' }}>
                    <div className="relative rounded-lg overflow-hidden w-24 h-16 bg-gray-800">
                      <Image
                        src={
                          propertyImages?.[0]?.url ||
                          projectImages?.[0]?.url ||
                          process.env.NEXT_PUBLIC_PROPERTY_IMG
                        }
                        alt="Property"
                        layout="fixed"
                        fill
                      />
                    </div>
                    <Tooltip
                      title={propertyTitle || projectTitle || NOT_AVAILABLE}
                      placement="top"
                    >
                      <span
                        style={{
                          maxWidth: '150px',
                          marginLeft: '6px',
                          flexShrink: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {propertyTitle || projectTitle || NOT_AVAILABLE}
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    maxWidth: '70px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Tooltip
                    title={
                      combinedPrice
                        ? formatNumberWithUnit(combinedPrice)
                        : projectPriceMap(projectUnits)
                    }
                    placement="top"
                  >
                    {combinedPrice && RUPEES_SYMBOL}
                    {combinedPrice
                      ? formatNumberWithUnit(combinedPrice)
                      : projectPriceMap(projectUnits)}
                  </Tooltip>
                </TableCell>

                <TableCell
                  align="left"
                  style={{
                    maxWidth: '100px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Tooltip
                    title={
                      firstName && lastName
                        ? `${firstName} ${lastName}`
                        : NOT_AVAILABLE
                    }
                    placement="top"
                  >
                    {firstName && lastName
                      ? `${firstName} ${lastName}`
                      : NOT_AVAILABLE}
                  </Tooltip>
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    maxWidth: '100px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Tooltip title={email || NOT_AVAILABLE} placement="top">
                    {email || NOT_AVAILABLE}
                  </Tooltip>
                </TableCell>

                <TableCell
                  align="left"
                  style={{
                    whiteSpace: 'nowrap',
                    width: '80px',
                    marginRight: '10px',
                    paddingRight: '25px',
                  }}
                >
                  {mobileNumber ? (
                    <MDLabel mobileNumber={mobileNumber} />
                  ) : (
                    NOT_AVAILABLE
                  )}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    maxWidth: '80px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Tooltip title={city || NOT_AVAILABLE} placement="top">
                    {city || NOT_AVAILABLE}
                  </Tooltip>
                </TableCell>

                <TableCell
                  align="left"
                  style={{ whiteSpace: 'nowrap', width: '100px' }}
                >
                  {createdAt
                    ? formatDateToDDMMYYYY(createdAt)
                    : NOT_AVAILABLE}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  </TableContainer>
</Box>
    </div>
    ) : (<Box sx={{ width: '100%' }}>
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
            overflowY: 'scroll',
            borderWidth: '0px',
          }}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleSortState} />
          <TableBody>
            {array?.activities &&
              Object.keys(array.activities).map((row) => {
                const rowData = array.activities[row] || {};
                const {
                  propertyTitle,
                  combinedPrice,
                  _id,
                  projectArea,
                  projectAreaUnit,
                  projectType,
                  projectSubType,
                  propertyType,
                  propertySubType,
                  projectTitle,
                  projectImages,
                  propertyImages,
                  projectUnits,
                  lisitingCity,
                  viewCount,
                  areaDetail
                } = rowData;

                const filteredDetail = areaDetail?.filter((detail) => detail.display);
                let propertySize, propertySizeUnit
                if (rowData?.propertySize) {
                  propertySize = rowData?.propertySize
                  propertySizeUnit = rowData?.propertySizeUnit
                }
                else if (filteredDetail?.length > 0) {
                   ({ propertySize, propertySizeUnit } = filteredDetail[0])
                }    
                
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell align="left" sx={{ width: '20%' }}>
                      <div className="flex" style={{ alignItems: 'center' }}>
                        <div className="relative rounded-lg overflow-hidden w-20 h-14 bg-gray-800">
                          <Image
                            src={propertyImages?.[0]?.url || projectImages?.[0]?.url || process.env.NEXT_PUBLIC_PROPERTY_IMG}
                            alt="Property"
                            layout="fixed"
                            fill
                          />
                        </div>
                        <Tooltip title={propertyTitle || projectTitle || NOT_AVAILABLE} placement="top">
                          <span
                            style={{
                              maxWidth: '130px',
                              marginLeft: '3px',
                              flexShrink: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              paddingLeft: '8px',
                            }}
                          >
                            {propertyTitle || projectTitle || NOT_AVAILABLE}
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        width: '15%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <Tooltip title={combinedPrice ? formatNumberWithUnit(combinedPrice) : projectPriceMap(projectUnits)} placement="top">
                        {combinedPrice && RUPEES_SYMBOL}
                        {combinedPrice ? formatNumberWithUnit(combinedPrice) : projectPriceMap(projectUnits)}
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left" sx={{ width: '20%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      <Tooltip
                        title={propertyType ? `${propertyType} - ${propertySubType || ''}` : `${projectType || ''} - ${projectSubType || ''}` || NOT_AVAILABLE}
                        placement="top"
                      >
                        <div>{propertyType ? `${propertyType} - ${propertySubType || ''}` : `${projectType || ''} - ${projectSubType || ''}` || NOT_AVAILABLE}</div>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left" sx={{ width: '15%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      <Tooltip title={lisitingCity ? lisitingCity : NOT_AVAILABLE} placement="top">
                        <div>{lisitingCity || NOT_AVAILABLE}</div>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left" sx={{ width: '15%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      <Tooltip
                        title={
                          projectArea
                            ? `${numberFormatter(projectArea)} ${AREA_MAPS[projectAreaUnit] || ''}`
                            : `${numberFormatter(propertySize) || ''} ${AREA_MAPS[propertySizeUnit] || ''}` || NOT_AVAILABLE
                        }
                        placement="top"
                      >
                        <div>{projectArea ? `${numberFormatter(projectArea)} ${AREA_MAPS[projectAreaUnit] || ''}` : `${numberFormatter(propertySize)} ${AREA_MAPS[propertySizeUnit]}` || NOT_AVAILABLE}</div>
                      </Tooltip>
                    </TableCell>
                    {tableToRender === ADMIN_SIDE ? (<TableCell
                      align="center"
                      style={{ whiteSpace: 'nowrap', width: '50px', maxWidth: '50px' }}
                    >
                      <Link href={generatePropertyURL(rowData)} target='_blank'>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: "10px" }}>
                          <span style={{ marginRight: "8px" }}>{viewCount || NOT_AVAILABLE}</span>
                          <Tooltip title="Listing Insights" arrow>
                            <span style={{ display: 'inline-block' }}>
                              <Image src={trendsSvg} height={13} width={13} alt="trends icon" />
                            </span>
                          </Tooltip>
                        </div>
                      </Link>
                    </TableCell>) : (
                      <TableCell
                        align="center"
                        style={{ whiteSpace: 'nowrap', width: '50px', maxWidth: '50px' }}
                      >
                        <p>{viewCount || NOT_AVAILABLE}</p>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    
    )}</>
}