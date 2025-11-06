// ImageUploadPopup.js
import React from 'react';
import Modal from '@mui/material/Modal';
import ImageUploader from './Upload'; // Import your ImageUploader component

const ImageUploadPopup = ({
    isOpen,
    onClose,
    photoURLs,
    setPhotoURLs,
    onFileSelect,
    deletePhoto,
    onSetCover,
    coverImageUrl,
    icon,
    Text
    // ...other necessary props
}) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            className="flex items-center justify-center p-4"
        >
            <div className="bg-white w-full rounded-lg max-w-2xl mx-auto overflow-hidden shadow-lg">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 ">Upload Images</h2>
                    <p className="text-gray-600">Add or remove images for your property.</p>
                </div>
                <ImageUploader
                    photoURLs={photoURLs}
                    setPhotoURLs={setPhotoURLs}
                    onFileSelect={onFileSelect}
                    deletePhoto={deletePhoto}
                    onSetCover={onSetCover}
                    coverImageUrl={coverImageUrl}
                    icon = {icon}
                    Text={Text}
                // ...other necessary props
                />
                <div className="flex justify-end p-6">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ImageUploadPopup;
