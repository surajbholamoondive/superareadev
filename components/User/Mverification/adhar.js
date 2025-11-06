import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import Styles from './adhar.module.css';

const Adhar = ({ propertyId }) => {
    const [adhaarFile, setAdhaarFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [upload, setUpload] = useState(false);


    const handleChange = (e) => {
        const file = e.target.files[0];
        setAdhaarFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!adhaarFile) {
            toast.error('Attach Aadhaar First');
            return;
        }

        setUpload(true);
        const formData = new FormData();
        formData.append('image', adhaarFile);
        formData.append('propertyId', propertyId);

        try {
            const { data } = await axios.post('user/Document_Verification3', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTimeout(() => {
                // setStep3Complete(true);    // there is no function like this 
                setUpload(false);
            }, 2000);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUpload(false);
        }
    };

    return (
        <div className="mt-[30px] flex flex-col items-center cursor-pointer">
            <h3 className={Styles.childIconh3}>Adhar Verification</h3>
            {previewImage && (
                <img src={previewImage} alt="Preview" className="mt-2 rounded-md" style={{ maxWidth: '200px' }} />
            )}
            <div className='flex gap-4  h-12 mt-[15px]'>    
                <label  className={Styles.childUploadBtn}>
                Upload Adhaar
                <input type="file" className="hidden" onChange={handleChange} />
            </label>
                <button className={Styles.childUploadBtn} onClick={handleUpload} disabled={!adhaarFile || upload}>
                    {upload ? 'Uploading...' : 'Upload'}
                </button>
            </div>

        </div>
    );
};

export default Adhar;
