import delhi from '../../assets/NavbarIcons/delhi.svg'
import jaipur from '../../assets/NavbarIcons/jaipur.svg'
import lucknow from '../../assets/NavbarIcons/lucknow.svg'
import mumbai from '../../assets/NavbarIcons/mumbai.svg'
import noida from '../../assets/NavbarIcons/noida.svg'
import greaternoida from '../../assets/NavbarIcons/greaternoida.svg'

const navbarContent = () => {
  return {
    City: {
      India: [
        { title: 'Noida', search: { city: 'Noida' }, image: noida },
        {
          title: 'Greater Noida',
          search: { city: 'Greater Noida' },
          image: greaternoida,
        },
        { title: 'Delhi', search: { city: 'Delhi' }, image: delhi },
        { title: 'Mumbai', search: { city: 'Mumbai' }, image: mumbai },
        { title: 'Jaipur', search: { city: 'Jaipur' }, image: jaipur },
        { title: 'Lucknow', search: { city: 'Lucknow' }, image: lucknow },
      ],
    },
    Buy: {
      'Popular Searches': [
        {
          title: 'Property for Sale in India',
          search: { propertyStatus: 'up for sale' },
        },
        {
          title: 'Furnished Properties for Sale',
          search: {
            propertyStatus: 'up for sale',
            furnishingStatus: 'Furnished',
          },
        },
        {
          title: 'Property Under Construction',
          search: {
            propertyStatus: 'up for sale',
            possessionStatus: 'Under Construction',
          },
        },
      ],
      'Properties for Sale': [
        {
          title: 'Properties in Noida',
          search: { propertyStatus: 'up for sale', city: 'Noida' },
        },
        {
          title: 'Properties in Greater Noida',
          search: { propertyStatus: 'up for sale', city: 'Greater Noida' },
        },
        {
          title: 'Properties in Delhi',
          search: { propertyStatus: 'up for sale', city: 'Delhi' },
        },
        {
          title: 'Properties in Mumbai',
          search: { propertyStatus: 'up for sale', city: 'Mumbai' },
        },
        {
          title: 'Properties in Jaipur',
          search: { propertyStatus: 'up for sale', city: 'Jaipur' },
        },
        {
          title: 'Properties in Lucknow',
          search: { propertyStatus: 'up for sale', city: 'Lucknow' },
        },
        
        
        
        
        
        
        
        
      ],
      'Apartments/Flats': [
        {
          title: 'Flats in Noida',
          search: {
            propertyStatus: 'up for sale',
            city: 'Noida',
            propertySubType: 'Apartment',
          },
        },
        {
          title: 'Flats in Greater Noida',
          search: {
            propertyStatus: 'up for sale',
            city: 'Greater Noida',
            propertySubType: 'Apartment',
          },
        },
        {
          title: 'Flats in Delhi',
          search: {
            propertyStatus: 'up for sale',
            city: 'Delhi',
            propertySubType: 'Apartment',
          },
        },
        {
          title: 'Flats in Mumbai',
          search: {
            propertyStatus: 'up for sale',
            city: 'Mumbai',
            propertySubType: 'Apartment',
          },
        },
        {
          title: 'Flats in Jaipur',
          search: {
            propertyStatus: 'up for sale',
            city: 'Jaipur',
            propertySubType: 'Apartment',
          },
        },
        {
          title: 'Flats in Lucknow',
          search: {
            propertyStatus: 'up for sale',
            city: 'Lucknow',
            propertySubType: 'Apartment',
          },
        },
      ],
    },
    Rent: {
      'Popular Searches': [
        {
          title: 'Property for Rent in India',
          search: { propertyStatus: 'up for rent' },
        },
        {
          title: 'Furnished Properties for Rent',
          search: {
            propertyStatus: 'up for rent',
            furnishingStatus: 'Furnished',
          },
        },
      ],
      'Properties for Rent': [
        {
          title: 'Properties in Noida',
          search: { propertyStatus: 'up for rent', city: 'Noida' },
        },
        {
          title: 'Properties in Greater Noida',
          search: { propertyStatus: 'up for rent', city: 'Greater Noida' },
        },
        {
          title: 'Properties in Delhi',
          search: { propertyStatus: 'up for rent', city: 'Delhi' },
        },
        {
          title: 'Properties in Mumbai',
          search: { propertyStatus: 'up for rent', city: 'Mumbai' },
        },
        {
          title: 'Properties in Jaipur',
          search: { propertyStatus: 'up for rent', city: 'Jaipur' },
        },
        {
          title: 'Properties in Lucknow',
          search: { propertyStatus: 'up for rent', city: 'Lucknow' },
        },
      ],
      'Apartments/Flats': [
        {
          title: 'Flats in Noida',
          search: {
            propertyStatus: 'up for rent',
            city: 'Noida',
            propertySubType: 'Apartment',
          },
        },
        {
          title: 'Flats in Greater Noida',
          search: {
            propertyStatus: 'up for rent',
            city: 'Greater Noida',
            propertySubType: 'Apartment',
          },
        },
        {
          title: 'Flats in Delhi',
          search: {
            propertyStatus: 'up for rent',
            city: 'Delhi',
            propertySubType: 'Apartment',
          },
        },
        {
          title: 'Flats in Mumbai',
          search: {
            propertyStatus: 'up for rent',
            city: 'Mumbai',
            propertySubType: 'Apartment',
          },
        },
        {
          title: 'Flats in Jaipur',
          search: {
            propertyStatus: 'up for rent',
            city: 'Jaipur',
            propertySubType: 'Apartment',
          },
        },
        {
          title: 'Flats in Lucknow',
          search: {
            propertyStatus: 'up for rent',
            city: 'Lucknow',
            propertySubType: 'Apartment',
          },
        },
      ],
    },
    Projects: {
      'Popular Searches': [
        {
          title: 'Furnished Projects for Rent',
          search: {
            projectStatus: 'up for rent',
            furnishingStatus: 'Furnished',
          },
        },
        {
          title: 'Project Under Construction',
          search: {
            projectStatus: 'up for rent',
            possessionStatus: 'Under Construction',
          },
        },
      ],
      'Ready To Move Projects': [
        {
          title: 'Projects in Noida',
          search: {
            projectStatus: 'up for sale',
            city: 'Noida',
            possessionStatus: 'Ready to Move',
          },
        },
        {
          title: 'Projects in Greater Noida',
          search: {
            projectStatus: 'up for sale',
            city: 'Greater Noida',
            possessionStatus: 'Ready to Move',
          },
        },
        {
          title: 'Projects in Delhi',
          search: {
            projectStatus: 'up for sale',
            city: 'Delhi',
            possessionStatus: 'Ready to Move',
          },
        },
        {
          title: 'Projects in Mumbai',
          search: {
            projectStatus: 'up for sale',
            city: 'Mumbai',
            possessionStatus: 'Ready to Move',
          },
        },
        {
          title: 'Projects in Jaipur',
          search: {
            projectStatus: 'up for sale',
            city: 'Jaipur',
            possessionStatus: 'Ready to Move',
          },
        },
        {
          title: 'Projects in Lucknow',
          search: {
            projectStatus: 'up for sale',
            city: 'Lucknow',
            possessionStatus: 'Ready to Move',
          },
        },
        
      ],
      'Under Construction Projects': [
        {
          title: 'Projects in Noida',
          search: {
            projectStatus: 'up for sale',
            city: 'Noida',
            possessionStatus: 'Under Construction',
          },
        },
        {
          title: 'Projects in Greater Noida',
          search: {
            projectStatus: 'up for sale',
            city: 'Greater Noida',
            possessionStatus: 'Under Construction',
          },
        },
        {
          title: 'Projects in Delhi',
          search: {
            projectStatus: 'up for sale',
            city: 'Delhi',
            possessionStatus: 'Under Construction',
          },
        },
        {
          title: 'Projects in Mumbai',
          search: {
            projectStatus: 'up for sale',
            city: 'Mumbai',
            possessionStatus: 'Under Construction',
          },
        },
        {
          title: 'Projects in Jaipur',
          search: {
            projectStatus: 'up for sale',
            city: 'Jaipur',
            possessionStatus: 'Under Construction',
          },
        },
        {
          title: 'Projects in Lucknow',
          search: {
            projectStatus: 'up for sale',
            city: 'Lucknow',
            possessionStatus: 'Under Construction',
          },
        },
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
      ],
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    Services: {
      'Our Services For You': [
        {
          title: 'EMI Calculator',
          path: '/services/emi-calculator',
        },
        {
          title: 'Rent Agreement',
          path: '/services/rent-agreement',
        },
        {
          title: 'Rent Reciept Generator',
          path: '/services/rent-slip-generator',
        },
      ],
    },
    
    
    
  }
}

export default navbarContent
