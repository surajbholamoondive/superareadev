import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Tooltip, TablePagination } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { useState } from 'react';
import Image from 'next/image';
import AdditionalInfoComponent from '../my-m-associates/AdditionalInfoComponent';
import EditAssociate from './EditUser';
import Modal from '@mui/material/Modal';
import ekycicon from "../../../assets/Kyc/e-kyc icon.svg";
import eKycpending from "../../../assets/Kyc/eKycpending.svg"
import edit from "../../../assets/moreIcon/Edit.svg"
import { MDLabel } from '@/components/MDLabel/MDLabel';
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
const {text}=GLOBALLY_COMMON_TEXT

export default function EnhancedTable({ array, restricted, setApproved, setRestricted, approved, restrict }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setIsEditModalOpen(null);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setIsEditModalOpen(null);
    };

    const openEditModal = (index) => {
        setSelectedRowId(index);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedRowId(null);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [hoveredRowId, setHoveredRowId] = useState(null);
    const renderAdditionalInfoComponent = (rowId) => {
        const dataIndex = page * rowsPerPage + rowId;
        if (rowId === hoveredRowId) {
            return <AdditionalInfoComponent rowData={array[dataIndex]} key={dataIndex} />;
        }
        return null;
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
    const headCells = [
        {
            id: 'Full Name',
            numeric: false,
            disablePadding: true,
            label: 'Full Name',
        },

        {
            id: 'email',
            numeric: true,
            disablePadding: false,
            label: "Email",
        },


        {
            id: 'Phone No.',
            numeric: true,
            disablePadding: false,
            label: 'Phone No.',
        },

        {
            id: "City",
            numeric: true,
            disablePadding: false,
            label: "City",
        },


        {
            id: 'KYC',
            numeric: true,
            disablePadding: false,
            label: 'KYC',
        },
        {}
    ];

    return (
        <>
            <Box sx={{ width: '100%', position: 'relative', zIndex: '1' }}>
                <TableContainer sx={{ overflow: 'visible', border: '1px solid #E0E0E0', borderRadius: '4px' }}>
                    <Table sx={{ overflowX: 'visible', position: 'relative' }} >
                        <TableHead >
                            <TableRow >
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                            width: 'auto',
                                            paddingLeft: "16px",
                                            textAlign: 'left',
                                            verticalAlign: 'middle',
                                        }}>
                                        <p className='font-bold'>{headCell.label}</p>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {array?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const dataIndex = page * rowsPerPage + index;
                                const rowData = array[dataIndex] || {};
                                const { firstName, lastName, email, mobileNumber, city, isKycVerified } = rowData;

                                return (
                                    <TableRow hover tabIndex={-1} key={row.id}
                                        sx={{ cursor: 'pointer', position: 'relative' }}>
                                        <TableCell align="left" style={{ maxWidth: '190px' }} onMouseLeave={(event) => handlePopoverClose(event, index)}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                              <p>  {firstName && lastName ? `${firstName} ${lastName}` : text.threeDash}</p>
                                                <div id='iconButton' className='relative'>
                                                    <IconButton
                                                        aria-label="info"
                                                        onMouseEnter={(event) => handlePopoverOpen(event, index)}
                                                        style={{
                                                            background: 'transparent',
                                                            border: '1px solid grey',
                                                            borderRadius: '50%',
                                                            padding: "0",
                                                            marginLeft: "4px",
                                                        }}

                                                    >
                                                        <InfoIcon style={{ fontSize: '12px', color: 'rgba(128, 128, 128, 0.5)' }} />
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
                                        <Tooltip title={`${email}`}>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap', maxWidth: '180px', textOverflow: 'ellipsis', overflow: 'hidden' }}><p>{email || text.threeDash}</p></TableCell>
                                        </Tooltip>

                                        <TableCell align="left" style={{ whiteSpace: 'nowrap', maxWidth: '140px', }}><MDLabel mobileNumber={mobileNumber} /></TableCell>

                                        <Tooltip title={`${city || text.threeDash}`} position="bottom">
                                            <TableCell style={{ maxWidth: '80px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textTransform: 'capitalize' }}>
                                               <p className='truncate'> {city || text.threeDash}</p>
                                            </TableCell>
                                        </Tooltip>

                                        <TableCell align="left" style={{ whiteSpace: 'nowrap', maxWidth: '120px', paddingLeft: "5px" }}>
                                            {isKycVerified ? (
                                                <>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Image src={ekycicon} height={120} width={120} alt="ekycicon" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Image src={eKycpending} height={120} width={120} alt="eKycpending" />
                                                    </div>
                                                </>
                                            )}
                                        </TableCell>
                                        <TableCell align="left" style={{ whiteSpace: 'nowrap', width: 'auto' }}>
                                            <Tooltip title={"Edit"} placement="top">
                                                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                    <Image src={edit} alt='edit' width={15} height={15} onClick={() => openEditModal(dataIndex)} />
                                                </div>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={array?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
            {isEditModalOpen && <Modal
                open={isEditModalOpen}
                onClose={closeEditModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex items-center justify-center overflow-y-auto outline-none">
                <Box className="bg-[#FFFFFF] px-8 py-4 rounded-2xl w-1/3 max-h-[90vh] overflow-y-auto">
                    <EditAssociate rowInfo={array[selectedRowId]} key={selectedRowId} modalState={setIsEditModalOpen} restricted={restricted} setApproved={setApproved} setRestricted={setRestricted} approved={approved} restrict={restrict} />
                </Box>
            </Modal>}
        </>
    );
}
