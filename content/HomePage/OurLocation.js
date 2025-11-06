import Delhi from '../../assets/Images/OurLocation/Delhi.jpg';
const Jaipur = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244386/assets/Images/OurLocation/Jaipur.jpg";
import Kolkata from '../../assets/Images/OurLocation/Kolkata.jpg';
import Lucknow from '../../assets/Images/OurLocation/Lucknow.jpg';
import Noida from '../../assets/Images/OurLocation/noida.jpg';
 
const OurLocationContent = () => {
    return ( 
        {
            "Noida": {
                'image': Noida,
                'link': '/search-result?city=Noida'
            },
            "Delhi": {
                'image': Delhi,
                'link': '/search-result?city=Delhi'
            },
            "Jaipur": {
                'image': Jaipur,
                'link': '/search-result?city=Jaipur'
            },
            "Kolkata": {
                'image': Kolkata,     
                'link': '/search-result?city=Kolkata'
            },       
            "Lucknow": {
                'image': Lucknow,     
                'link': '/search-result?city=Lucknow'
            }
        }
     );
}
 
export default OurLocationContent;