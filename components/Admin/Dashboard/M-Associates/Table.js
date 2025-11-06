import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useState } from 'react';
import { visuallyHidden } from '@mui/utils';
import MoresIcon from '../../../../assets/logo/logo-icon.svg'
import Modal from '@mui/material/Modal';
import { MDLabel } from '@/components/MDLabel/MDLabel';
import { getComparator, stableSort } from '@/utils/helper';
import { Tooltip } from '@mui/material';
import {ADMIN_MODULE, GLOBALLY_COMMON_TEXT, COMPONENTS} from '@/textV2';
const {LEADS_TABLE_COMPO}=COMPONENTS
const {text,symbols}=GLOBALLY_COMMON_TEXT
const {headings}=ADMIN_MODULE?.ADMIN_DASHBOARD_PAGE
const {text:leadTableText}=LEADS_TABLE_COMPO

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 1,
    p: 4,
    borderRadius: "8px",
};

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: "M-Associate's Name",
        sort: false
    },
    {
        id: 'number',
        numeric: true,
        disablePadding: false,
        label: 'Phone No.',
        sort: false
    },
    {
        id: 'city',
        numeric: true,
        disablePadding: false,
        label: 'City',
        sort: false
    },
    {
        id: 'totalProperties',
        numeric: false,
        disablePadding: false,
        label: 'No. of Listings',
        sort: true
    },
    {
        id: 'totalEnquired',
        numeric: false,
        disablePadding: false,
        label: 'Enquired',
        sort: true
    },
    {
        id: 'totalWishlisted',
        numeric: false,
        disablePadding: false,
        label: 'Wishlisted',
        sort: true
    },
    {
        id: 'totalViewed',
        numeric: false,
        disablePadding: false,
        label: 'Viewed',
        sort: true
    },

    {}

];
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead style={{ backgroundColor: "#E2ECF2", }} >
            <TableRow style={{ backgroundColor: "#E2ECF2", }}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{
                            fontWeight: "bold",
                            maxWidth: "180px",
                            padding: "6px 5px ",
                            whiteSpace: 'nowrap',
                            borderBottomStyle: 'none',
                            paddingRight: headCell.id === 'name' ? '25px' : '',
                            paddingLeft: headCell.id === 'number' ? '30px' : '0',

                        }}
                    >
                        {headCell.id === 'name' ? (
                            <div className='flex ml-4 gap-1 '>
                                <Image width={13} height={13} src={MoresIcon} alt="MoresIcon" />
                                <p className='font-bold'>{headings.associates}</p>
                            </div>
                        ) : (
                            headCell.sort ? (
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    <p className='font-bold'>{headCell.label}</p>
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            ) : (
                                <Typography

                                    style={{  fontWeight: "bold", maxWidth: "100px", paddingLeft: "0px", paddingRight:'0px' }}
                                >
                                   <p className='font-bold'> {headCell.label} </p>
                                </Typography>
                            )
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const LeadsTable = ({ Leads, recentOnly }) => {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('date');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [selectedContent, setSelectedContent] = React.useState({});
    const [showAll, setShowAll] = useState(false);
    const handleClose = () => setOpen(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = React.useMemo(
        () =>
            stableSort(Leads, getComparator(order, orderBy))?.slice(
                page * rowsPerPage,
                page * rowsPerPage + (showAll ? Leads?.length : rowsPerPage),
            ),
        [order, orderBy, page, rowsPerPage, Leads, showAll],
    );

    return (
        <>
            <Box sx={{ marginTop: "10px"}}>
                <TableContainer style={{ overflow: 'hidden' }}>
                    <Table
                        sx={{ minWidth: 800 }}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody >
                            {visibleRows?.map(({ firstName, lastName, number, city, totalProperties, totalEnquired, totalWishlisted, totalViewed }, index) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={index}
                                >
                                    <TableCell component="th" scope="row" align="left" style={{ width: "80px", height: '45px', whiteSpace: "nowrap", padding:'0px 0px 0px 20px' }}>
                                        <p>{firstName}&nbsp;{lastName}</p>
                                    </TableCell>
                                    <TableCell align="left" style={{ width: "100px", paddingRight: "90px", paddingTop: "0px", paddingBottom: '0px', paddingLeft: '28px', whiteSpace: "nowrap" }}><MDLabel mobileNumber={number} /></TableCell>
                                    <TableCell
                                        style={{
                                            maxWidth: '120px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            padding: '0px 25px 0px 0px'
                                        }}
                                    >
                                        <Tooltip
                                            title={
                                                city ? city : text.threeDash
                                            }
                                            placement="top"
                                        >
                                            {city ? city : text.threeDash}
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center" style={{ width: "120px", padding: '0px 40px 0px 0px' }}><p>{totalProperties}</p></TableCell>
                                    <TableCell align="center" style={{ width: "120px", padding: '0px 40px 0px 0px' }}><p>{totalEnquired}</p></TableCell>
                                    <TableCell align="center" style={{ width: "120px", padding: '0px 45px 0px 0px' }}><p>{totalWishlisted}</p></TableCell>
                                    <TableCell align="center" style={{ width: "120px", padding: '0px 45px 0px 0px' }}><p>{totalViewed}</p></TableCell>
                                </TableRow>
                            ))}
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
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="h-60 max-h-fit">
                    <Typography id="modal-modal-title" variant="h6">
                        <div className='flex flex-wrap justify-between'>
                            <div className='w-[40%] mb-3'>
                                <span >{leadTableText.fullName} </span>
                                {symbols.dash}{selectedContent.fullName}
                            </div>
                            <div className='w-[40%]'>
                                <span >{leadTableText.phone} </span>
                                {symbols.dash}{selectedContent.mobileNumber}
                            </div>
                            <div className='w-[40%]'>
                                <span >{leadTableText.email} </span>
                                {symbols.dash}{selectedContent.email}
                            </div>
                            <div className='w-[40%]'>
                                <span >{leadTableText.city} </span>
                                {symbols.dash}{selectedContent.city}
                            </div>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                        {selectedContent.message}
                    </Typography>

                </Box>
            </Modal>
        </>
    );
};
export default LeadsTable;
