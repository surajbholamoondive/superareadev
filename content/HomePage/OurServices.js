import Office from '../../assets/Images/OurServices/img6.jpg';
import Plot from '../../assets/Images/OurServices/img7.jpg';
import Penthouse from '../../assets/Images/OurServices/img3.jpg';
import Villa from '../../assets/Images/OurServices/img4.jpg';
import Apartment from '../../assets/Images/OurServices/img2.jpg';
 
const OurServiceContent = () => {
    return ( 
        {
            'Apartment': {
                'image': Apartment,
                'link':'/search-result?propertySubType=Apartment'
            },
            'House or Villa': {
                'image': Villa,
                'link': '/search-result?propertySubType=House+or+Villa'
            },
            'Plot': {
                'image': Plot,
                'link': '/search-result?propertySubType=Plot'
            },
            'Office Space': {
                'image': Office,
                'link': '/search-result?propertySubType=Office+Space'
            },
            'Penthouse': {
                'image': Penthouse, 
                'link': '/search-result?propertySubType=Penthouse'
            }          
        }
     );
}
 
export default OurServiceContent;