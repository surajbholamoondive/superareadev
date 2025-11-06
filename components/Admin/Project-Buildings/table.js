import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import DeleteModal from '@/components/Agent/Listing/DeleteModal';
import Image from 'next/image';
import edit from '../../../assets/EditIcon/edit.svg';
import RestoreIcon from '../../../assets/EditIcon/restore.svg';
import { toast } from 'react-toastify';
import del from '../../../assets/moreIcon/trash.svg';
import { numberFormatter, projectPriceMap } from '@/utils/utils';
import { VIEW_PROJECT_PATH, VIEW_PROPERTY_PATH, PUT_REQ, PROJECT_DELETE_ROUTE, PROJECT_DELETED, GET_REQ, VIEW_PROJECT_ROUTE, DELETE_PROJECT, DELETE_PROJECT_MESSAGE, AREA_MAPS } from '@/text';
import EditProjectModal from '../EditProject';
import { makeApiRequest } from '@/utils/utils';
import { ADMIN_LOGOUT_TEXT } from '@/textV2';

const { routes } = ADMIN_LOGOUT_TEXT;

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
};
const headCells = [
    { id: 'title', numeric: false, disablePadding: false, label: 'Title', sort: false },
    { id: 'title', numeric: false, disablePadding: false, sort: false },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price', sort: false },
    { id: 'projectType', numeric: true, disablePadding: false, label: 'Project Type' },
    { id: 'city', numeric: false, disablePadding: false, label: 'City' },
    { id: 'size', numeric: false, disablePadding: false, label: 'Size' },
];
function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, showIcon } = props;
    const visibleHeadCells = showIcon ? headCells.concat([
        { id: 'edit', numeric: false, disablePadding: false, },
        { id: 'delete', numeric: false, disablePadding: false, }
    ]) : headCells.concat([
        { id: 'restoreProject', numeric: false, disablePadding: false, label: 'Restore' },
    ]);

    return (
        <TableHead>
            <TableRow style={{ backgroundColor: '#E2ECF2', whiteSpace: 'nowrap' }}>
                {visibleHeadCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        style={{ padding: '8px', paddingLeft: "16px", borderBottom: "none" }}
                    >
                        {headCell.sort ? (
                            <TableSortLabel
                                style={{ fontWeight: 'bold', fontSize: '14px' }}
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={() => onRequestSort(headCell.id)}
                            >
                                <p className='font-bold'>  {headCell.label}</p>
                            </TableSortLabel>
                        ) : (
                            <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: "14px" }}>
                                <p className='font-bold'> {headCell.label}</p>
                            </Typography>
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
    showIcon: PropTypes.bool.isRequired,
    isDeletedProjects: PropTypes.bool.isRequired
};

const ProjectsTable = ({ projectsData, recentOnly, deleteProject, setDeleteProject, editUpdate, setEditUpdate, showIcon, isDeletedProjects }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedProject, setSelectedProject] = useState();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const openEditModal = async (row) => {
        const { data } = await makeApiRequest(GET_REQ, `${VIEW_PROJECT_ROUTE}/${row.slug}`)
        const { projectResult } = data?.result || {}
        setSelectedProject(projectResult);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsEditModalOpen(true);
    };

    const deleteProperty = async (projectId) => {
        try {
            const response = await makeApiRequest(PUT_REQ, `${PROJECT_DELETE_ROUTE}/${projectId}`);
            toast.success(PROJECT_DELETED);
            setDeleteProject(!deleteProject);
            return response?.data;
        } catch (error) {
            console.error('error deleting property:', error);
            throw error;
        }
    };

    const handleRestoreProject = async (row) => {
        try {
            const response = await makeApiRequest(PUT_REQ, `${routes.projectRestore}/${row._id}`);
            if (response.status === 200) {
                toast.success(response?.data?.responseMessage);
                setDeleteProject(!deleteProject);
            }
        } catch (error) {
         console.error(error);
        }
    }
    const closeEditModal = () => {
        setSelectedProject(null);
        setIsEditModalOpen(false);
    };

    const openDeleteConfirmation = (row) => {
        setPropertyToDelete(row?._id);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowDeleteConfirmation(true);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setPropertyToDelete(null);
    };

    const confirmDelete = async (projectId) => {
        setIsDeleting(true);
        try {
            await deleteProperty(projectId);
        } catch (error) {
            console.error('error confirming delete:', error);
        }
        
        setShowDeleteConfirmation(false);
        setIsDeleting(false);
    };

    const handleRequestSort = (property) => {
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

    const generatePropertyURL = (propertyDetail) => {
        const { _id, propertyType, projectType, city, propertyTitle, propertySize, locality, projectSubType, propertySubType, propertyAreaUnit, slug } = propertyDetail || {};

        let metadataString = '';
        if (propertyType) metadataString += `${propertyType}-`;
        if (projectType) metadataString += `${projectType}-`;
        if (propertySize) metadataString += `${propertySize}-`;
        if (propertyAreaUnit) metadataString += `${propertyAreaUnit}-`;
        if (city) metadataString += `${city}-`;
        if (locality) metadataString += `${locality}-`;
        if (propertySubType) metadataString += `${propertySubType}-`;
        if (projectSubType) metadataString += `${projectSubType}-`;
        metadataString = metadataString.replace(/-$/, '');
        let url = '';
        if (propertyTitle) {
            url = `${VIEW_PROPERTY_PATH}/${metadataString}/${_id}`;
        } else {
            url = `${VIEW_PROJECT_PATH}/${slug}`;
        }
        return url;
    };
    return (
        <>
            <TableContainer className='-mt-[11px]'>
                <Table aria-labelledby="tableTitle" size="medium">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        showIcon={showIcon}
                        isDeletedProjects={isDeletedProjects}
                    />
                    <TableBody>
                        {projectsData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                                hover
                                key={row._id}
                                onClick={() => window.open(generatePropertyURL(row), '_blank')}
                                style={{ cursor: 'pointer' }}
                            >  <TableCell style={{ maxWidth: '60px', overflow: 'hidden', padding: '8px 0px 8px 0px' }}>
                                    <Image className='rounded-lg w-20 h-14 bg-gray-800' src={row.projectCoverImage || row.projectImages[0]?.url || process.env.NEXT_PUBLIC_PROPERTY_IMG} width={80} height={20} alt="Project Image" />
                                </TableCell>
                                <TableCell style={{
                                    maxWidth: '138px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    padding: showIcon ? '0px 12px' : '0px 0px',

                                }}>
                                    {row.projectTitle.length > 25 ? (
                                        <Tooltip title={row.projectTitle} style={{ maxWidth: '30px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                            <span>{row.projectTitle}</span>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title={row.projectTitle} style={{ maxWidth: 'none', whiteSpace: 'nowrap', textOverflow: 'ellipsis', textTransform: 'capitalize' }}>
                                            <p>{row.projectTitle}</p>
                                        </Tooltip>
                                    )}
                                </TableCell>

                                <Tooltip title={projectPriceMap(row.projectUnits)}>
                                    <TableCell style={{ maxWidth: '100px', height: '20px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                        <p>{projectPriceMap(row.projectUnits)}</p>
                                    </TableCell>
                                </Tooltip>
                                <Tooltip title={`${row.projectType} - ${row.projectSubType}`} position="bottom">
                                    <TableCell style={{ maxWidth: '0px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <p className='truncate'>  {row.projectType}-{row.projectSubType}</p>
                                    </TableCell>
                                </Tooltip>
                                <Tooltip title={row.city}>
                                    <TableCell style={{ maxWidth: '80px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <p className='truncate'>  {row.city}</p>
                                    </TableCell>
                                </Tooltip>
                                <Tooltip title={`${numberFormatter(row.projectArea)} ${AREA_MAPS[row.projectAreaUnit]}`}>
                                    <TableCell style={{ maxWidth: '100px', overflow: 'hidden', height: '20px', textOverflow: 'ellipsis' }}>
                                        <p className='truncate'>  {numberFormatter(row.projectArea)}&nbsp;{AREA_MAPS[row.projectAreaUnit]} </p>
                                    </TableCell>
                                </Tooltip>

                                {isDeletedProjects && (
                                    <TableCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <div style={{ marginLeft: '10px' }}>
                                            <Image
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRestoreProject(row);
                                                }}
                                                src={RestoreIcon}
                                                width={20}
                                                height={20}
                                                alt="Restore Icon"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    </TableCell>
                                )}
                                {showIcon &&
                                    <TableCell style={{ maxWidth: '40px', }}>
                                        <Image onClick={(e) => {
                                            e.stopPropagation();
                                            openEditModal(row);
                                        }} src={edit || {}} alt="Edit icon" height={20} width={20} />
                                    </TableCell>}
                                {showIcon &&
                                    <TableCell style={{ maxWidth: '40px' }}>
                                        <Image onClick={(e) => { e.stopPropagation(); openDeleteConfirmation(row); }} src={del || {}} alt="delete icon" height={20} width={20} />
                                    </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!recentOnly && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={projectsData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
            {selectedProject && (
                <EditProjectModal isOpen={isEditModalOpen} onClose={closeEditModal} initialProjectData={selectedProject} setEditUpdate={setEditUpdate} editUpdate={editUpdate} />
            )}
            <DeleteModal open={showDeleteConfirmation} id={propertyToDelete} cancelDelete={cancelDelete} confirmDelete={() => confirmDelete(propertyToDelete)} footText={DELETE_PROJECT_MESSAGE} headText={DELETE_PROJECT} disable={isDeleting} />
        </>
    );
};

ProjectsTable.propTypes = {
    projectsData: PropTypes.array.isRequired,
    recentOnly: PropTypes.bool,
    deleteProject: PropTypes.bool.isRequired,
    setDeleteProject: PropTypes.func.isRequired,
    editUpdate: PropTypes.bool.isRequired,
    setEditUpdate: PropTypes.func.isRequired,
    showIcon: PropTypes.bool.isRequired,
    isDeletedProjects: PropTypes.bool.isRequired
};

export default ProjectsTable;