"use client";
import Styles from './index.module.css';
import 'animate.css/animate.css';
import { useData } from '@/context/data';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import PhoneNumberInput from '@/utils/PhoneNumerInput';
import TopBar from '@/components/SearchResultPage/TopBar/TopBar';

const Index = () => {
    const [data, setData] = useData();
    const [error, setError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [file, setFile] = useState(null);
    const [load, setLoad] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email:'',
      position: data?.title,
    });

    useEffect(()=>{
        const FromLocalStorage = localStorage.getItem("Job");
        if(FromLocalStorage){
           setData(JSON.parse(FromLocalStorage));
        }
    }, [])

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
      };
    
    const handleCountryChange = (selectedOption) => {
      setSelectedCountry(selectedOption);
    };
  
    const handleFileChange = (event) => {
        setError('');
        if(event.target.files[0].name.includes(".pdf")){
            setFile(event.target.files[0]);
            setFormData({...formData, position: data.title})
        }else{
            setError("Please Upload Resume Only in Pdf Format")
        }
    };

    const sendResume = async(formDataObj) => {
        try {
            setFormData({...formData, file: file})
            const {data}  = await axios.post("user/sendResume", formDataObj, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });       
            if(data?.status)
            {
                toast.success("Resume Submitted Successfully");
                setLoad(false);
                setPhoneNumber();
                setFile(null);
                setFormData({ ...formData, email:'' , name: '' })
                }else{
                setLoad(false);
            }
        } catch (error) {
          console.error('Error in submitting form:', error);
          setLoad(false);
        }
    }
    const createFormData = (formData, data, file) => {
        return new Promise((resolve) => {
            const formDataObj = new FormData();
            formDataObj.set('name', formData.name);
            formDataObj.append('email', formData.email);
            formDataObj.append('mobile', phoneNumber);
            formDataObj.append('position', data?.title);
            if (file) {
                formDataObj.append('file', file);
            }else{
                toast.error("Please Attach Resume");
                return;
            }
            resolve(formDataObj);
        });
    };

    const handleSubmit = () => {
        setLoad(true);
        createFormData(formData, data, file)
        .then((formDataObj) => {
            // Call the sendResume function here
            // for(var pair of formDataObj.entries()) {
            //     console.log(pair[0]+', '+pair[1]);
            // }
            sendResume(formDataObj);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
      

    return (
        <div className='bg-white animate__animated animate__fadeInRight'>
            {/* <div className={Styles.mainDiv}>
                <div className='m-auto w-[50%]'>
                    <h1 className={Styles.heading}>Apply Here</h1>
                    <p className={Styles.para}>excited to explore opportunities at Mores and be a part of our dynamic team</p>
                </div>                     
            </div> */}
            <TopBar label="Apply Here"/>
            <div className='w-[90%] md:w-[70%] lg:w-[50%] m-auto'>
                
                <div className='flex justify-between'>
                    <h1 className={Styles.jobheading}>{data.title}</h1>
                    <Link href="#form">
                        <button className={Styles.jobButton}>Apply</button>
                    </Link>
                </div>
                <p className={Styles.jobpara}>Salary : <span style={{color:"#4c4e4e"}}>Rs. ----/year</span></p>
                <p className={Styles.jobpara}>Gender : <span style={{color:"#4c4e4e"}}>{data.gender}</span></p>
                <p className={Styles.jobpara}>Job Type : <span style={{color:"#4c4e4e"}}>{data.type}</span></p>
                <p className={Styles.jobpara}>Expertise : <span style={{color:"#4c4e4e"}}>{data.experience}</span></p>
                <div className={Styles.jobpara}>Requirements</div>
                <ul className='mb-7 flex flex-wrap'>
                    {data?.requirements?.map((points, index)=>
                    <li className={Styles.requirementPoint} key={index}>{points}</li>
                    )}
                </ul>
                <div className={Styles.jobpara}>Description</div>
                <p className={Styles.jobParagraph}>{data.description}</p>
                <div className={Styles.jobpara}>Must Have</div>
                <ul className='pb-7 ml-3'>
                    {data?.qualification?.map((line, index)=>
                    <li className={Styles.jobParagraph} key={index}> ● {line}</li>
                    )}
                </ul>

                {/* Fill the form */}
                <div className={Styles.container} id="form">
                    <h2 className={Styles.containerHeading}>
                       Fill the <span style={{color: "#931602"}}>Form</span>
                    </h2>
                    <div className='w-[300px] m-auto'>
                        <input type='text' 
                        className={`capitalize ${Styles.containerInput}`}  
                        placeholder="Your Name" 
                        value={formData.name}
                        onChange={(e)=> setFormData({ ...formData, name: e.target.value })} 
                        />
                        <input type='email' 
                        className={Styles.containerInput} 
                        placeholder="Your Email" 
                        value={formData.email}
                        onChange={(e)=> setFormData({ ...formData, email: e.target.value })} 
                        />
                    </div>
                    <div className='m-auto w-[300px]'>
                        <PhoneNumberInput  value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            country={selectedCountry}
                            onCountryChange={handleCountryChange}
                            className={Styles.phoneContainerInput}
                        />
                        {/* <input className={Styles.containerInput} 
                        placeholder="Phone Number" 
                        value={formData.mobile}
                        onChange={(e)=> setFormData({ ...formData, mobile: e.target.value })}
                        /> */}
                        <input type="file" 
                        className={Styles.containerInput} 
                        placeholder="Your resume" 
                        onChange={handleFileChange}
                        />
                        {error && <p className='text-red-400 text-[11px] text-center'>{error}</p>} 
                    </div>
                    <div className='m-auto w-fit'>
                       <button className={(error || load) ? Styles.ErrorFormButton :Styles.formButton} onClick={()=> handleSubmit()} disabled={error && true}>{load ? "Wait..." : 'Submit'}</button>
                    </div>
                </div>
            </div>
        </div> 
    );
}
 
export default Index;


