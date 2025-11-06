/**
 * @use : Front-end layer. This file is used to populate post property form dynamic HTML/CSS
 * @date : Dec 20, 2023
 * @copyright : Copyright MoonDive Software Tech
 * @author : Vishal Kumar
 * @reviewer : Tanishq sharma, 
 * @description : This file is used to pre-define Arrays, Object maps, and plain texts across the project. 
 *  Arrays are ending with 'S,' Maps are ending with '_MAP', while the remaining represent plain texts
   @example : BED_ROOMS (This is an Array), SUITABLE_FOR_MAP(This is a Map), and LOGIN_TEXT(This is a plain text)
 */

// Arrays
export const LISTINGS = ['Sell', 'Rent']
export const RENT_METHODS = [
  'Per Month',
  'Per Year',
  'Per Quarter',
  'Per Half-Year',
  'Per Week',
  'Per Day',
]
export const MAINTENANCE_METHODS = [
  'Per Month',
  'Per Year',
  'Per Quarter',
  'Per Half-Year',
  'Per Week',
  'Per Day',
]

export const BTN_CANCEL = 'Cancel'
export const TEXT_OK = 'OK'
export const TEXT_FIRST_NAME = 'First Name'
export const TEXT_LAST_NAME = 'Last Name'
export const TEXT_EMAIL = 'Email'
export const TEXT_PHONE_NO = 'Phone Number'
export const TEXT_MESSAGE = 'Message'
export const SYMBOL_REQUIRED = '*'
export const ERROR_FIRST_NAME_REQUIRED = 'First name is required.'
export const ERROR_LAST_NAME_REQUIRED = 'Last name is required.'
export const ERROR_EMAIL_REQUIRED = 'Email is required.'
export const ERROR_EMAIL_INVALID = 'Please enter a valid email address.'
export const ERROR_PHONE_REQUIRED = 'Phone number is required.'
export const ERROR_PHONE_INVALID = 'Please enter a valid phone number.'
export const ERROR_MESSAGE_REQUIRED = 'Message is required.'
export const ENDPOINT_PROJECT_ENQUIRED = '/api/project/enquired'
export const METHOD_POST = 'POST'
export const TEXT_PROJECT_ENQUIRED = 'Project Enquiry'
export const TOAST_ENQUIRY_SENT_SUCCESSFULLY = 'Enquiry sent successfully!'
export const ERROR_TO_SEND_PROJECT_ENQUIRY =
  'Failed to send enquiry. Please try again.'
export const TEXT_TRUE = 'true'

export const PROPERTY_TYPES = [
  'Residential',
  'Commercial',
  'Industrial',
  'Agricultural',
]
export const FURNITURE_STATUSES = [
  'Unfurnished',
  'Furnished',
  'Semi Furnished',
  'Bareshell',
]
export const OPEN_SIDES = ['1', '2', '3', '4']

export const POSSESSION_STATUSES = [
  'Newly Launched',
  'Ready to Move',
  'Under Construction',
  'Near Possession',
]
export const PARKINGS = ['None', '1', '2', '3', '4', '5+']
export const BALCONY_VIEWS = [
  'Road',
  'Pool',
  'Club',
  'Lake',
  'Garden',
  'Park',
  'Golf Course',
  'Sunset',
  'Sunrise',
  'Railway Station',
  'Street View',
  'Community',
  'None',
]
export const OFFICE_SPACE_TYPE = [
  'Semi fitted',
  'Fitted Space',
  'shell and core',
]
export const FACINGS = [
  'North',
  'East',
  'South',
  'West',
  'North-East',
  'North-West',
  'South-East',
  'South-West',
]
export const BEDROOMS = ['Studio', '1', '2', '3', '4+']
export const BATHROOMS = ['Shared', '1', '2', '3', '4+']
export const DEDICATED_ROOMS = [
  'Pooja Room',
  'Study Room',
  'Store Room',
  'Dining Room',
  'Laundry Room',
  'Meeting Room',
  'Servent Room',
  'Others',
]
export const PUBLIC_TRANSPORTATIONS = [
  'Under 1km',
  'More than 3 kms',
  'Between 1 Km to 3 km',
  'No',
]
export const PROXIMITY_TO_HOSPITALS = [
  'Nearby Hospitals',
  'Between 1 Km to 3 km',
  'Within 10 Km of Hospitals',
]
export const PROXIMITY_TO_SCHOOLS = [
  'Nearby Schools',
  'Between 1 Km to 3 km',
  'Within 10 Km of Schools',
]
export const PROXIMITY_TO_SHOPPING_MARKETS = [
  'Nearby Shopping markets',
  'Between 1 Km to 3 km',
  'Within 10 Km of Shopping markets',
]
// export const YES_NO = ['No', 'Yes']
export const PANTRY = ['Wet', 'Dry', 'None']
export const PG_AVAILABILITIES = ['Boys', 'Girls', 'Guests']
export const PG_AVAILABILITY_STATUSES = ['Immediately', 'Later']
export const PG_SUITABILITIES = ['Students', 'Working', 'Any']
export const PG_ROOM_TYPES = [
  'Private Room',
  'Twin Sharing',
  'Triple Sharing',
  'Quad Sharing',
]
export const PG_FOOD_AVAILABILITIES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Self-Cooking',
  'None',
]
export const PG_FOOD_CHARGES = ['Included', 'Excluded']
export const PG_NOTICE_PERIODS = ['15 Days', '30 Days', '45 Days', 'Others']
export const PG_RULES = [
  'No Smoking',
  'No Partying',
  'No Drinking',
  'No Non-Veg',
  'No Loud Music',
  'Visitors Allowed',
]
export const PG_SERVICES = [
  'Wifi',
  'Laundry Service',
  'Pet Friendly',
  'Room Cleaning',
]
export const FLOORINGS = [
  'Mosaic',
  'Standard',
  'Marble',
  'Wooden',
  'Ceramic',
  'Granite',
  'Laminated',
  'Anti Skid',
  'Kota Stone',
  'Vitrified',
  'Matt Finish',
  'Normal Tiles',
]
export const WASHROOMS = ['Shared', 'Private']

export const PANTRY_AREAS = [
  'Small',
  'Medium',
  'Large',
  'Dry Pantry',
  'Wet Pantry',
  'Combined (Dry + Wet)',
  'Open Pantry',
  'Closed Pantry',
]
export const PLOT_SHAPES = ['Rectangle', 'Square', 'Triangle', 'Circle']
export const AREA_TYPES = [
  'Carpet Area',
  'Built-up Area',
  'Super Built-up Area',
]
export const AREA_UNITS = [
  'Sq.Ft.',
  'Sq.Yard',
  'Sq.M',
  'Acre',
  'Bigha',
  'Hectare',
]
export const ANGLE_SHAPES = ['Rectangular', 'Square', 'Triangular', 'Irregular']
export const BALCONIES = ['Room-attached', 'Individual', 'Connected']
export const PROPERTY_NEARBY_TAGS = [
  'ATM',
  'Park',
  'Bank',
  'School',
  'Shopping Mall',
  'Hospital',
  'Police Station',
  'Metro Station',
  'Temple',
  'Railway Station',
  'Airport',
  'Restaurants',
  'Pharmacy',
  'Bus Stop',
  ' Grocery Store',
  'Petrol Pump',
  'Playground',
  'Movie Theater',
]
export const PROPERTY_HIGHLIGHT_TAGS = [
  'Desperate Sale',
  'Exclusive',
  'Unbeatable Price',
  'Prime Location',
  'Luxury',
  'Spacious',
  'Modern',
  'Newly Constructed',
  'Quick Deal',
  'Affordable',
  'Well Maintained',
  'Elegant Design',
  'Fully Refreshed',
  'Safe & Secure',
  'Family-friendly',
  'Metro Nearby',
  'Reputed Builder',
  'Investment Opportunity',
]
export const PROPERTY_STATUES = [
  'Up for Sale',
  'Up for Rent',
  'Sold out',
  'Rented',
  'Rent',
  'Sale',
]
export const MAP_AMENITIES = [
  'hospital',
  'school',
  'police',
  'restaurant',
  'pharmacy',
  'marketplace',
  'bank',
  'atm',
  'fuel',
  'bus_station',
]
export const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
export const COLORS = ['#931602', '#018191', '#C7A97E']
// Maps
export const PROPERTY_SUB_TYPE_MAP = {
  Apartment: 'Apartment',
  HouseOrVilla: 'House or Villa',
  BuilderFloor: 'Builder Floor',
  Penthouse: 'Penthouse',
  Pg: 'PG',
  CommercialOfficeSpace: 'Commercial Office Space',
  OfficeSpace: 'Office Space',
  Shop: 'Commercial Shop',
  Showroom: 'Commercial Showroom',
  officeSpaceSEZ: 'Office Space in IT Park / SEZ',
  CommercialLand: 'Commercial Land',
  Warehouse: 'Warehouse',
  Flat: 'Flat',
  ResidentialHouse: 'Residential House',
  Villa: 'Villa',
  IndependentVilla: 'Independent Villa',
  Kothi: 'Kothi',
  BuilderFloorApartment: 'Builder Floor Apartment',
  StudioApartment: 'Studio Apartment',
  ResidentialPlot: 'Residential Plot',
  ResidentialLand: 'Residential Land',
  FarmHouse: 'Farm House',
  IndependentFloor: 'Independent Floor',
  ApartmentwithLawnArea: 'Apartment with Lawn Area',
  FlatWithGarden: 'Flat with Garden',
  Godown: 'Godown',
  MallRetailLockable: 'Mall Retail Lockable',
  MallRetailUnlocakble: 'Mall Retail Unlocakble',
  HighStreetRetailLockable: 'High Street Retail Lockable',
  HighStreetRetailUnlockable: 'High Street Retail Unlockable',
  ScoPlot: 'SCO Plot',
  BusinessSuites: 'Business Suites',
  HotelAprtment: 'Hotel Apartment',
  Foodcourt: 'Food Court',
  Banquet: 'Banquet',
  KIOSK: 'KIOSK',
  AnchorStore: 'Anchor Store',
  HyperMarket: 'Hyper Market',
  FoodKios: 'Food Kiosk',
  AtmSpace: 'ATM Space',
  RetailSpace: 'Retail Space',
  IndustrialLand: 'Industrial Land',
  IndustrialShed: 'Industrial Shed',
  IndustrialBuilding: 'Industrial Building',
  AgriculturalLand: 'Agricultural Land',
}

export const SUITABLE_FOR_MAP = {
  BOYS: 'Boys',
  GIRLS: 'Girls',
  GUESTS: 'Guests',
  WORKING_PROFESSIONALS: 'Professionals',
  ANY: 'Any',
  FAMILY: 'Family',
  BACHELOR: 'Bachelor',
  MARRIED: 'Married',
  UNMARRIED: 'Unmarried',
}

export const MAINTENANCE_METHOD_MAP = [
  { label: 'Select a Method', value: '' },
  { label: 'Monthly', value: 'Monthly' },
  { label: 'Quarterly', value: 'Quarterly' },
  { label: 'Yearly', value: 'Yearly' },
]

export const PROPERTY_SIZE_UNIT = [
  { label: 'Sq.Ft.', value: 'squareFeet' },
  { label: 'Sq.Yd.', value: 'squareYards' },
  { label: 'Sq.Mt.', value: 'squareMeters' },
  { label: 'Acres', value: 'Acres' },
]
export const CONVERSION_FACTORS = {
  squareFeet: 1,
  squareYards: 9,
  squareMeters: 10.7639,
  Acres: 43560,
  ares: 1076.39,
  hectares: 107639,
}
export const PROJECT_SIZE_UNIT = [
  { label: 'Acre', value: 'Acres' },
  { label: 'Sq.Ft.', value: 'squareFeet' },
  { label: 'Sq.Yd.', value: 'squareYards' },
  { label: 'Sq.Mt.', value: 'squareMeters' },
  { label: 'Ares', value: 'ares' },
  { label: 'Hectares', value: 'hectares' },
]
export const TEXT_FILL_CONTACT_FORM_TO_SEE_UNIT_FLOOR_PLAN =
  'Fill the contact form'

export const PROPERTY_SIZE_UNIT_MAP = {
  '': 'unit',
  squareFeet: 'Sq.Ft.',
  squareYards: 'Sq.Yd.',
  squareMeters: 'Sq.Mt.',
  Acres: 'Acres',
  Acre: 'Acre',
}

export const UNIT_CONVERSION = {
  Acres: 43560,
  squareYards: 9,
  squareFeet: 1,
  squareMeters: 10.7639,
}

export const LAND_AMENITIES = [
  { label: 'Sewage', key: 'sewage' },
  { label: 'Water Supply', key: 'waterSupply' },
  { label: 'Loan Availability', key: 'loanAvailability' },
  { label: 'Gas Pipeline', key: 'gasPipeline' },
  { label: 'Electricity Supply', key: 'electricitySupply' },
  { label: 'Street Lighting', key: 'streetLighting' },
]

// Plain texts
// User-related constants
export const USERID_TEXT = 'userID'
export const IMAGE_INFO = 'Brochure Information'
export const SITE_PLAN = 'Site Plan'
export const PRICE_LIST = 'Price List & Payment Plan'
export const USER_TYPE = 'userType'
export const LOGIN_TEXT = 'Login'
export const WELCOME_TEXT = 'Welcome Back'
export const ACCESS_ACCOUNT = 'Access back to your account'
export const ADMIN_LOGIN_TEXT = 'Admin Login'
export const NOT_REGISTERED = "Don't Have an Account? "
export const REGISTERED_SUCCESSFULLY = 'Registered Successfully'
export const ALREADY_REGISTERED = 'Already registered?'
export const SIGN_IN_FACEBOOK = 'Sign in with Facebook'
export const WAIT_TEXT = 'Login'
export const REGISTER_TEXT = 'Register'
export const CREATE_ACCOUNT = 'Create a new account'
export const WELCOME = 'Welcome!'
export const REGISTER_FORM = 'Register'
export const CONTINUE = 'Continue your registration as an'
export const READ_MORE_TEXT = 'View'
export const FULL_NAME = 'Full Name'
export const NAME = 'Name:'
export const EMAIL = 'Email Address'
export const REPORTING_BUTTON = 'Report Your Bug/Error'
export const REJECT_BUTTON = 'Reject'
export const REVOKE_BUTTON = 'Revoke'
export const APPROVE_BUTTON = 'Approve'
export const PREVIEW_TEXT = 'Preview Listing'
export const VIEW_TEXT = 'View >'
export const VIEW_TEXT_VALUE = 'View'
export const DEFAULT_LISTING = '10 Listing'
export const MODIFIED_TEXT = 'Modify'
export const REVISE_BUTTON = 'Revise'
export const QUESTION_HEADING = 'Verification Questions'
export const BUG_PLACEHOLDER =
  "Briefly describe the bug you've encountered, your feedback is crucial to improve our website."
export const UNIT_TEXT = 'Unit Already Exists We Edit Unit Count Only'
export const BUG_REPORT = 'bugReported'
export const AUTO_CAPTURE = 'Auto Capture'
export const AUTO_LOGOUT = 'Auto Logout'
export const BUG_TITLE_LABEL = 'Title'
export const BUG_TITLE_PLACEHOLDER = 'Description'
export const ERROR_IN_EDIT = 'Error editing property:'
export const REVIEW_AND_POST = 'Review & Post Property'
export const REVIEW_LISTING = 'Review Listing'
export const PERSONAL_DETAILS = 'Personal Details'
export const FIND_YOUR = 'Find your'
export const PERFECT = 'Perfect'
export const SPACE = 'Space'
export const POWERED_BY = 'Powered by'
export const AI = 'AI'
export const SEARCH_DESCIPTION =
  'Find a place where magic and comfort intertwine'
export const EDITED_TEXT_ACKNOWLEDGE =
  'I confirm that I have carefully reviewed my listing and understand that once the listing information is submitted, it cannot be edited.'
export const EDITED_TEXT =
  'I confirm that I have carefully reviewed my listing and understand that once the listing information is submitted, it cannot be edited. I hereby agree that the above information is accurate, and MORES has the full right to block or disable my account if the information provided is incorrect.'
export const PRIVACY_POLICY_CHECK =
  'I am doing aggrade with the privacy policy check'
export const GENERATE_DESCRIPTION_NOTE =
  ' Note: Using auto generate will enhance your listing visibility during search.'
export const REVIEW_LISTING_TEXT =
  ' Review your listing before submitting to make sure everything is accurate and up to date. Once submitted, property information cannot be edited.'
export const TEXT_LISTING_HEADING =
  'Note: Providing accurate property details enhances the accuracy of S-score, which in turn helps to improve the visibility of your listing.'
export const ACKNOWLEADGEMENT_TEXT =
  ' I hereby agree that the above information is accurate and MORES has full right to block/disable my account if the above provided information is not correct.'
export const TITLE = 'Title'
export const PRICE = 'Price'
export const SIZE = 'Size'
export const FULL_VIEW = 'Full View'
export const RERA_ID = 'Rera Id'
export const TURQUOISE = '#0168A2'
export const DARK_TURQUOISE = '#0168A2'
export const PREVIOUS_PAGE = 'Previous Page'
export const NEXT_PAGE = 'Next Page'
export const PREVIOUS_PAGE_TEXT = 'Prev'
export const NEXT_PAGE_TEXT = 'Next'
export const PREVIEW_BROCHURE = 'Preview Brochure'
export const EMPTY_FILES = 'No file selected'
export const PDF_SELECT_ONLY = 'Please select a PDF file.'
export const BROCHURE_UPLOAD_SUCCESS = 'Brochure uploaded successfully'
export const DOCUMENT_UPLOAD_SUCCESS = 'Document uploaded successfully'
export const OTP_SENT_SUCCESSFULLY = 'OTP sent successfully'
export const SOMETHING_WENT_WRONG = 'Something went wrong'
export const BROCHURE_DELETED_SUCCESS = 'Brochure deleted successfully'
export const DOCUMENT_DELETED_SUCCESS = 'Document deleted successfully'
export const PASSWORD_NOT_MATCH = 'Password does not match'
export const ERROR_BROCHURE = 'Error uploading brochure'
export const ERROR_DOCUMENT = 'Error uploading document'
export const UPLOAD_BROCHURE_TEXT = 'Attach PDF'
export const ENTER_SHORT_OTP = 'Enter a six digit OTP'
export const HEAD_TEXT_FOR_OTP = 'Enter the OTP send on Registered E-mail'
export const FORGOT_PASSWORD = 'Forgot Password?'
export const PASSWORD_UPDATED_SUCCESSFULLY = 'Password Changed Successfully'
export const INCORRECT_TEXT = 'Entered OTP is incorrect'
export const SEND_OTP_ROUTE = 'admin/send-forgetOTP'
export const VERIFY_OTP_ROUTE_ADMIN = 'admin/verify-forgetOTP'
export const PASSWORD_RESET_ROUTE = 'admin/reset-password'
export const BROCHURE_TEXT_HEADING =
  'Upload your brochure to enhance your project listing. Brochures provide detailed information and attract more interest. Accepted format: .pdf.'
export const COOKIES_TEXT =
  'We use cookies to improve your experience on our website. By accepting, you agree to our use of cookies for analytics, personalized content.  For more information, please read our. '
export const PRIVACY_POLICY_TEXT = 'Privacy Policy'
export const ACCEPT_COOKIES = 'Accept Cookies'
export const CUSTOM_COOKIES = 'Custom Cookies'
export const DECLINE_COOKIES = 'Decline'
export const CONTACT_TEXT = 'Feel Free To Contact'
// Property-related constants
export const PROPERTY_EDIT_ROUTE = '/property/saved-property'
export const PROPERTY_FETCHING_REDIRECT = '/property/property-title-fetching'
export const RESET_PASS_TEXT = 'Reset Password'
export const SUBMIT_NEW_TEXT = 'Submit'
export const ENTER_NEW_PASSWORD = 'Enter New Password'
export const CONFIRM_NEW_PASSWORD = 'Confirm New Password'
export const PROPERTY_VERIFIED_ROUTE = '/property/location-verified/'
export const PROPERTY_RE_VERIFIED_ROUTE = '/property/relocation-verified/'
export const RECOMMENDED_PROPERTY_LIST_ROUTE = `property/recommended-property-list`
export const SEARCH_SUGGESTIONS_ROUTE = `/property/suggestions`
export const VERIFY_PROPERTY = 'Verify Property'
export const RESIDENTIAL = 'Residential'
export const COMPLETED_TEXT = 'Completed'
export const COMMERCIAL = 'Commercial'
export const INDUSTRIAL = 'Industrial'
export const AGRICULTURE = 'Agricultural'
export const MORE_OPTIONS = 'More Options'
export const RENT_RESIDENTIAL = 'Rent/Residential'
export const RENT_COMMERCIAL = 'Rent/Commercial'
export const BUY_RESIDENTIAL = 'Buy/Residential'
export const BUY_COMMERCIAL = 'Buy/Commercial'
export const SEARCH_RESULT = 'Search Result'
export const APARTMENT = 'Apartment'
export const MAINTENANCE_AMOUNT = 'maintenanceAmount'
export const HOUSE_OR_VILLA = 'House or Villa'
export const BUILDER_FLOOR = 'Builder Floor'
export const PENTHOUSE = 'Penthouse'
export const OFFICE_SPACE = 'Office Space'
export const WAREHOUSE = 'Warehouse'
export const SHOWROOM = 'Showroom'
export const SHOP = 'Shop'
export const PLOT = 'Plot'
export const COMMERCIAL_LAND = 'Commercial Land'
export const SELL = 'Sell'
export const CARPET_AREA = 'Carpet Area'
export const BUILT_UP_AREA = 'Built-Up Area'
export const SUPER_AREA = 'Super Built-Up Area'
export const PLOT_AREA = 'Plot Area'
export const TOTAL_ENQUIRED = 'totalEnquired'
export const TOTAL_WISHLISTED = 'totalWishlisted'
export const EMAIL_DOES_NOT_MATCH = 'email does not match'
export const TOTAL_VIEWED = 'totalViewed'
export const TOTAL_VIEWED_PROPERTYMODAL = 'Total Viewed'
export const COMPLETE_REVIEW_LISTING_TEXT =
  'Please complete Review Listing first'
export const KYC_COMPLETE_TEXT = 'Please complete KYC Verification first'
export const ASSIGNED_ASSOCIATE = 'Associate'
export const WHAT_YOUR_PLAN_AGENT = 'What is Your Plan Agent'
export const LOGIN = 'Login'
export const RENTED = 'Rent'
export const TRUE = 'true'
export const APPROVED = 'Approved'
export const APPROVED_STATUS_TEXT = 'approved'
export const OFFICE_ADDRESS = 'Office Address'
export const COMMA = ', '
//project consts
export const PROJECT_TYPE_TEXT = 'Project Type'
export const PROPERTY_TYPE_TEXT = 'Property Type'
export const PROJECT_SUB_TYPE_TEXT = 'Project Sub Type'
export const PROPERTY_SUB_TYPE_TEXT = 'Property Sub Type'
export const LISTING_TEXT = 'listing'
export const ACRE_TEXT = 'Acres'
export const MOSAIC_TEXT = 'Mosaic'
export const ADD_ONE_RERA_DETAILS_REQUIRED_TEXT = 'Add at least one RERA detail'
export const PROJECT_HIGHLIGHT_KEY_MISSING_TEXT =
  'Project Highlights is missing'
export const PROJECT_RERA_DETAILS_TITLE = 'Project RERA Details'
export const PROJECT_VIDEOS='Project Video'
export const PROPERTY_TEXT = 'property'
export const LOCALITY_TEXT = 'locality'
export const CITY_TEXT = 'city'

// Enum for project keys
export const PROJECT_KEYS = {
  PROJECT_HIGHLIGHT_TAGS: 'projectHighlightTags',
  PROJECT_RATING: 'projectRating',
  DEVELOPER_RATING: 'developerRating',
}

// sidebar routes
export const ADMIN_DASHBOARD_ROUTE = '/admin/dashboard'
export const ADMIN_MY_M_ASSOCIATES_ROUTE = '/admin/my-e-associates'
export const ADMIN_MASSOCIATE_ROUTE = '/admin/my-e-associates'
export const ADMIN_LEADS_ROUTE = '/admin/leads'
export const ADMIN_PROJECT_LISTING_ROUTE = '/admin/project-building'
export const ADMIN_POST_PROJECT_ROUTE = '/admin/post-project'
export const ADMIN_ALL_USERS_ROUTE = '/admin/all-users'
export const ADMIN_ALL_LISTINGS_ROUTE = '/admin/direct-listings'
export const ADMIN_ASSIGN_M_ASSOCIATES_ROUTE = '/admin/assign-e-associates'
export const ADMIN_DIRECT_LEADS_ROUTE = '/admin/direct-leads'
export const ADMIN_VERIFICATION_ROUTE = '/admin/e-verification'
export const ADMIN_WEBSITE_MODERATION_ROUTE = '/admin/website-moderation'
export const ADMIN_SETTINGS_ROUTE = '/admin/settings'
export const ADMIN_LOGOUT_ROUTE = '/admin/logout'
export const ADMIN_PAGE_ROUTE = '/admin/[page]'
export const USER_PROFILE_ROUTE = '/user/profile'
export const REPORT_BUG = '/user/bug-report'
export const USER_LISTING_ROUTE = '/user/listing'
export const LISTING_ROUTE_VERIFY = 'listing'
export const DATE_UPDATE = 'Date updated successfully!'
export const USER_MY_ACTIIVITY_ROUTE = '/user/activity'
export const USER_AGENT_ROUTE = '/user/agent'
export const USER_POST_PROPERTY_ROUTE = '/user/post-property'
export const USER_ENQUIRED_ROUTE = '/user/enquiries-received'
export const USER_M_ASSOCIATE_ROUTE = '/user/super-associate'
export const USER_ENQUIRES_RECIEVED_ROUTE = '/user/enquiries-received'
export const USER_MY_M_ASSOCIATE_ROUTE = '/user/assigned-M-associate'
export const ADMIN_APPROVE_LISTINGS = '/admin/approve-listings'
export const VERIFIED_LISTING = 'agent/verification-listings'
export const VERIFIED_LISTING_COUNTS = 'agent/verification-listings-counts'
export const TOOGEL_WISHLIST = '/activity/toggle-wishlist'
export const NOT_APPLICABLE = 'N/A'
export const HIDDEN_NOTE =
  'Note: Unit Number, Tower/Block and Floor Number will not be made public.'

//Agent sidebar routes
export const AGENT_DASHBOARD_ROUTE = '/agent/dashboard'
export const AGENT_LEADS_ROUTE = '/agent/leads'
export const AGENT_ASSIGNED_LISTING_ROUTE = '/agent/assigned-listing'
export const ASSIGNED_LISTING = 'Assigned Listing'
export const AGENT_POST_PROJECT_ROUTE = '/agent/post-property'
export const AGENT_PROJECT_LISTING_ROUTE = '/agent/listing'
export const AGENT_M_VERIFICATION_LISTING_ROUTE = '/agent/e-verification'
export const AGENT_LOGOUT_ROUTE = '/agent/logout'
export const AGENT_PROFILE_ROUTE = '/agent/profile'
export const ENQUIRED_PROPERTY = '/agent/leads'
export const GO_BACK_TO_ASSIGNED_LISTING = 'Go Back'
export const LEAD_TYPE = 'enquired'
export const LEAD_TYPE_WISHLISTED = 'wishlisted'
export const LEAD_REDIRECT_ROUTE = '/admin/leads'
export const LEAD_TYPE_VIEWED = 'viewed'
export const EDIT_ROUTE = '/Edit'
export const LEADS_INDEX_ROUTE = 'leads'
export const NOTIFICATION = 'Notifications'
export const LOAD_MORE = 'Load More'
//Input field constants
export const EMAIL_TEXT = 'Email'
export const OTP_SENT_ON = 'OTP sent successfully on'
export const OTP = 'OTP'
export const RESEND_OTP = 'Resend OTP'
export const ENTER_EMAIL_ID = 'Enter Email ID'
export const ENTER_VALID_EMAIL_ID = 'Enter Valid Email ID'
export const ENTER_OTP = 'Enter OTP'
export const ENTER_AUTHENTICATION_CODE_ERROR =
  'Enter the authentication code generated by your Google Authenticator.'
export const ENTER_COMPLETE_AUTHENTICATION_CODE_ERROR =
  'Enter the complete authentication code generated by your Google Authenticator.'
export const ENTER_AUTHENTICATION_CODE = 'Enter Authentication Code'
export const ENTER_MOBILE_NUMBER = 'Entered mobile number'
export const UPDATE_PROPERTY = 'Update Property'
export const RE_SUBMIT = 'Re-Submit'
export const BACK_BUTTON = 'Back'
export const DELETE = 'Delete'
export const PREFILL = 'Pre-populate'
export const NEXT = 'NEXT'
export const NO_MORE_PROPERTY = 'No more properties to display at this time'
export const MEETING_SETUPE = 'Your agent has not set up any meeting.'
export const ADD_UNIT_ONE_BY_ONE =
  'Note: Units can only be added individually, kindly proceed by adding each unit one by one.'
export const UPLOAD_PHOTO_VIDEO = 'Upload Photo/Video'
export const UPLOAD_PROPERTY = 'Upload Property'
export const UPLOAD_PHOTO_ADMIN = 'Upload'
export const ENTER_DETAILS = 'Enter the following details to reach us.'
export const SMALL_PASSWORD = 'password'
export const OTP_TEXT = 'OTP'
export const PHONE_NO = 'Phone Number'
export const MESSAGE = 'Message'
export const RESET_PASSWORD = 'Password'
export const WRONG_CONFIRM_PASSWORD = 'Confirm New Password is wrong'
export const CURRENT_PASSWORD = 'Current Password'
export const NEW_PASSWORD = 'Enter New Password'
export const CONFIRM_PASSWORD = 'Confirm New Password'
export const CHANGE = 'Change'
export const CONFIRM_TEXT = 'Confirm'
export const UNSUPPORTED_VIDEO_TEXT =
  'Your browser does not support the video tag.'
export const PROPERTY_LISTING_MEDIA_INFO =
  'Property Listing with more than 5 photos gets more views, max size: 25MB'
export const VIDEO_SIZE_ERROR = 'Video size limit exceeded (max size: 35MB)'
export const SELL_OR_RENT = 'Sell or Rent Your Home'
export const WITH = 'With'
export const GET_A_CALL_BACK = 'Get a Call Back'
export const MORES = 'ESTRATA '
export const SUPER_AREA_TEXT = 'SuperArea '
export const SUPERAREA_TEXT = 'SuperArea'
export const ASSIGNED_ASSOCIATE_SIDETRAY_TOPVIEW = 'Assigned Associate'
export const NOT_ASSIGNED_YET = 'Not assigned yet'
export const ASSOCIATE_SIDETRAY_DEFINED = 'Associate'
export const ASSIGN_ASSOCIATE = 'Assign Associate'
export const DIRECT_LISTING = 'Direct Listing'
export const EXPERT = 'Expert'
export const JWT_EXPIRED = 'jwt expired'
export const DIRECTLY = 'Directly'
export const ADD_MORE = '+ Add More'
export const DEFINING_LOCATION = 'Defining nearby location'
export const ENTER_NEW_LOCATION = 'Please enter new amenities'
export const ADD_NEW_LIST = '+Add new list'
export const RESET = 'Reset'
export const SAVE = 'Save'
export const SCREENS = '/screens'
export const LIVE_CAMERA_PAGE = '/live-camera'
export const NOT_VERIFIED = 'not_verified'
export const NOT_VERIFIED_TEXT = 'Not Verified'
export const VERIFIED_QUESTION = 'Verified'
export const RATING_TEXT = 'Rating'
export const FORM_SUBMIT = 'Form submitted successfully!'
export const OPERATING_SINCE = 'Operating Since (Year)'
export const ELECTRICITY_CHARGES_INCLUDED = 'Electricity charges included'
export const AVAILABLE_PG_SERVICES = 'Available PG services'
export const PROPERTY_DESCRIPTION_HOVER =
  'Enter a detailed description of the property, highlighting its best features.'
export const PROJECT_DESCRIPTION_HOVER =
  'Enter a detailed description of the project, highlighting its best features.'
// export const BALCONIES = 'Balconies'
export const ADDITIONAL_ROOM = 'Additional rooms'
export const POSSESSION_STATUS = 'Possession status'
export const PROPERTY_AGE_IN_YEARS = 'Age of property (Years)'
export const POWER_BACKUP = 'Power Back-up'
export const COVERED_PARKING = 'Covered parking'
export const OPEN_PARKING = 'Open/Uncovered parking'
export const BALCONY_VIEW = 'Balcony view'
export const FACING = 'Facing'
export const FLOORING = 'Flooring'
export const LOAN_AVAILABILITY = 'Loan availability'
export const GAS_AVAILABILITY = 'Gas pipeline availability'
export const TRANSPORTATION = 'Public transportation'
export const WATER_SUPPLY = 'Water supply'
export const ELECTRICITY_SUPPLY = 'Electricity supply'
export const INTERNET_CONNECTIVITY = 'Internet connectivity'
export const PROXIMITY_TO_HOSPITAL = 'Proximity to hospital'
export const PROXIMITY_TO_SCHOOL = 'Proximity to school'
export const PROXIMITY_TO_SHOPPING_MARKET = 'Proximity to shopping market'
export const LIVE_CAMERA_TEXT = 'Live Camera Verification'
export const LIVE_RECORDING_TEXT = 'Live Recording'
export const START_LIVE_CAMERA = 'Start Live Camera'
export const START_CAMERA_DISCRIPTION =
  'Initiate a live camera verification process to authenticate your property and safeguard against fraudulent activities.'
export const STREET_LIGHT = 'Street lighting'
export const SEWERAGE = 'Sewerage/Drainage'
export const BEDROOM = 'Number of Bedroom'
export const SUITABLE_FOR = 'Suitable for'
export const AVAILABLE_FOR = 'Available for'
export const REVISE_TEXT = 'revised'
export const APPROVE_TEXT = 'approved'
export const REJECT_TEXT = 'rejected'
export const VERIFIED_TEXT = 'Verified'
export const BATHROOM = 'Number of Bathroom'
export const EXPLAINING_PRICE = 'Explaining price'
export const NEARBY_LOCATION = 'Defining nearby location'
export const AMENITIES_TEXT =
  'Please choose the keywords which define the property clearly'
export const DEFINE_THE_PROPERTY =
  'Please select the keywords that define the nearby facilities.'
export const HIGHLIGHTS_OF_PROPERTY =
  'Please select the keywords that define the Property.'
export const DEFINE_YOUR_PROPERTY = 'Define your property'
export const EXPLORE_ALL = 'Explore All'
export const DOB_PLACEHOLDER = 'Date of birth (MM/DD/YYYY)'

// Routes Constants (Plain Text)
export const VIEW_PROPERTY_ROUTE = `property/view-property`
export const ADD_PROPERTY_ROUTE = 'property/post-property'
export const EDIT_PROPERTY_ROUTE = 'property/edit-property'
export const SEARCH_RESULT_PAGE_ROUTE = '/search-result'
export const POST_PROPERTY_ROUTE = '/post-property'
export const RESEND_OTP_ROUTE = 'user/resend-otp'
export const ANONYMOUS_ROUTE = 'user/anonymous-user'
export const CHANGE_PASSWORD_API_PATH = '/admin/change-password'
export const PROPERTY_STATUS_CHANGED = 'Property Status is Changed'
export const SCHEDULE_MEETING_ROUTE = '/property/schedule-meeting/'
export const MEETING_TIME_ROUTE = '/property/get-scheduled-time/'
export const ROUTE_ASSIGNED_LISTING = '/agent/assigned-listing'
export const ASSIGNED_LISTING_VERIFICATION = 'assigned-listing'
export const E_VERIFICATION_TAB = 'e-verification'
export const COMPLETE_STEP_2 = 'Complete review listing first'

// Toaster Constants (Plain Text)
export const REQUIRED_TOASTER = 'Please fill out all the required fields'
export const SELECT_ONE_TOASTER = 'Please select any one option'
export const LOGIN_TOASTER = 'Please login first'
export const DELETE_SUCCESS = 'Deleted Successfully'
export const MOBILE = 'Mobile:'
export const EDITED_SUCCESS = 'Property Edited Successfully'
export const REVIEWED_SUCCESS = 'Property Reviewed Successfully'
export const LISTING_APPROVAL = 'listingApproval'
export const M_VERIFICATION = 'mVerification'
export const SELECT_FIVE_TAGS_ONLY_MESSAGE = 'You can select up to 5 tags only'
export const ENTER_DOCUMENT_NAME_TEXT = 'Please enter the document name.'
export const ENTER_DOCUMENT_URL_TEXT = 'Please upload document pdf'
export const PROJECT_DOCUMENTS = 'Project Documents'
// Labels (Plain Text)
export const FURNISHING_DETAILS = 'Furnishing Details'
export const RESET_ALL = 'Reset All'
export const CHOOSE_ITEMS = 'Please Choose the Items From the List'
export const WHATS_YOUR_PLAN =
  "What's your plan? (Directly or SuperArea Expert)"
export const PROPERTY_DETAILS = 'Location and Property Details'
export const ADDITIONAL_DETAILS = 'Property Details'
export const PROPERTY = 'Property'
export const ADDITIONAL = 'Additional Details'
export const REPRESENTATIVE = 'Representative'
export const AMENITIES = 'Building Amenities'
export const LISTING = 'Listing'
export const LISTING_ROUTE = 'listing'
export const AREA = 'Area'
export const LATITUDE = 'Latitude'
export const LONGITUDE = 'Longitude'
export const ACCURACY = 'accuracy'
export const AREA_TYPE = 'Area type'
export const AREA_UNIT = 'Area unit'
export const ANGLE_SHAPE = 'Angle/Shape'
export const FURNISHING_STATUS = 'Furnishing status'
export const FURNISHING_STATUS_LABEL = 'Furnishing Status'
export const PROPERTY_CATEGORY = 'Property type'
export const PROPERTY_SUB_CATEGORY = 'Property sub type'
export const APPLY_LOAN = 'Apply for Loan'
export const REQUEST_CALL = 'Expert advice'
export const RECOMMENDED_FOR_YOU = 'Recommended For You'
export const OTHER = 'Other'
export const PG = 'PG'
export const READY_TO_MOVE = 'Ready to Move'
export const RENT = 'Rent'
export const MAINTENANCE = 'Maintenance'
export const DEPOSIT = 'Deposit'
export const DESCRIBE_YOUR_PROPERTY = 'Describe your property'
export const NUMBER_FORMATE = '/[^0-9]/g'
export const PHONE_TEXT = 'phone'
export const PHONE_TEXT_P = 'Phone'
export const WAIT = 'Wait'
export const OVERVIEW = 'Overview'
export const UP_FOR_SALE = 'up for sale'
export const SALE = 'sale'
export const UP_FOR_RENT = 'up for rent'
export const PROJECT_STEP_ONE = 'Project/Building Details'
export const PROJECT_STEP_TWO = 'Project Unit Details'
export const PROJECT_STEP_THREE = 'Additional Details'
export const PROJECT_STEP_FOUR = 'Upload Photo/Video'
export const PROJECT_STEP_FIVE = 'Project Description and Card'
export const PROJECT_STEP_SEO = 'Project SEO '
export const PROJECT_RERA_DETAILS = 'RERA Details'
export const DEVELOPER_DETAILS = 'Developer Detail'
export const DIRECT_LEADS = 'Direct Leads'
export const DIRECT_LISTING_TEXT = 'Direct Listing'
export const ENQUIRED_FORM = 'Enquired From'
export const ENQUIRED_BY = 'Enquired By'
export const DATE = 'Date'
export const RERA = 'RERA'
export const BUY_TEXT = 'BUY'
export const BUY_TEXT_SMALL = 'Buy'
export const AGENT_OVERVIEW = 'Agent Overview'
export const M_ASSOCIATE_OVERVIEW = 'SuperArea Associate'
export const Property_Information = 'Property Information'
export const YEAR_OF_EXPERIENCE = 'Year Of Experience'
export const TOTAL_LISTING = 'Total Listings'
export const PROPERTY_FOR_SALE = 'Property for Sale'
export const PROPERTY_FOR_RENT = 'Property for Rent'
export const RENT_TEXT = 'RENT'
export const RENT_TEXT_SMALL = 'Rent'
export const HOMEPAGE_LABEL =
  'You can get your desired awesome properties, homes, condos, etc. here by name, category, or location.'
export const DREAM_HOME_LABEL = 'Find your dream home.'
// Symbol constants
export const RUPEES_SYMBOL = '₹'
export const AT_THE_RATE_SYMBOL = '@'
export const LOADING = 'Loading...'
export const MOBILE_NUMBER_TEXT = 'mobileNumber'
export const IS_LOGIN = 'isLogin'
export const IS_ADMIN_LOGIN = 'isAdminLogin'
export const IS_REGISTER_AS_COMPLETE = 'isRegisterAsComplete'
export const INVALID_INPUT = 'Invalid Input'
export const INDIVIDUAL_TEXT = 'Individual'
export const POSTING_PROPERTY = 'postingProperty'
export const DASH = ' - '
export const HYPHEN = '- '
export const COLON = ': '
export const DASH_WITH_COLON = ':-'
export const ALL = 'All'
export const RECENT_DIRECT_LEADS = 'Recent Direct Leads'
export const TOP_M_ASSOCIATES = 'Top E-Associates'
export const EXPLORE_CITIES = 'Explore Cities'
export const EDIT = 'Edit'
export const POSTED_TEXT = 'Posted '
export const NETWORK_ERROR_TEXT = 'Network Error'
export const NETWORK_ERROR = 'Network Error'
export const DAY_AGO_TEXT = ' Days Ago'
export const DAYS_AGO_TEXT = 'days ago'
export const LIVE_CAMERA_TEXT_FORM = 'Live Camera Verification Form'
export const LIVE_CAMERA_RECORDING = 'Live Recording Verification Form'
export const QUESTION_1_TEXT =
  '1. Kindly confirm if you are the legal owner, an authorized representative, or an agent?'
export const QUESTION_2_TEXT =
  '2. Kindly confirm that the property address provided on the listing is accurate and complete'
export const QUESTION_3_TEXT =
  ' 3. Could you provide a general overview of the property and confirm its total size? '
export const QUESTION_4_TEXT = ' 4. As per the listing, the property is a'
export const BATHROOM_TEXT = 'bathroom'
export const SHOW_EACH_BATH =
  ' , Please provide a tour of each bedroom and bathroom'
export const QUESTION_7_TEXT =
  ' 7. Kindly specify the type of flooring in each room of the property.'
export const QUESTION_8_TEXT = ' 8. Appointment has been scheduled for'
export const QUESTION_9_TEXT =
  ' 9. The agent was located at latitude 28.1234, longitude 77.5678 in Garhi, approximately 3 km away from the property named Sunset Villa.'
export const QUESTION_10_TEXT =
  ' 10. The user was located at latitude 28.1234, longitude 77.5678 in Garhi, approximately 3 km away from the property named Sunset Villa.'
export const FLOOR = 'flooring'
export const QUESTION_5_TEXT =
  '  5. Could you please show us the balconies available on the property?'
export const QUESTION_6_TEXT =
  '6. Kindly  confirm if there are any dedicated rooms?'
export const BALCONY_TEXT = 'balcony'
export const BALCONIES_TEXT = 'balconyies'
export const DEDICATED_ROOM_TEXT = 'dedicatedrooms'
// Navigation routes
export const ROOT_REGISTER_ROUTE = '/register'
export const ROOT_LOGIN_ROUTE = '/login'
export const OTP_VERIFY_ROUTE = '/otp-verify'
export const REGISTER_AS_ROUTE = '/register/register-form'
export const SOCIAL_ROUTE = `user/social-OAuth`
export const VERIFY_OTP_ROUTE = 'user/verify-otp'
export const USER_GET_PROFILE_ROUTE = 'user/get-profile'
export const USER_LOGOUT_ROUTE = 'user/logout'

export const VIEW_PROPERTY_PATH = `/property-view`
export const VIEW_PROJECT_PATH = `/project-view`
export const VIEW_PROPERTY_TRENDS_PATH = `/admin/trends`
export const MSCORE_DESCRIPTION_PATH = '/faqs/super-score'
export const M_VERIFICATION_DESCRIPTION_PATH = '/faqs#E-verification'
export const M_ESTIMATE_DESCRIPTION_PATH = '/faqs/e-estimate'
export const ADMIN_ROUTE = '/admin'
export const POST_PROJECT_ROUTE = '/project/add-project'
export const VIEW_PROJECT_ROUTE = 'project/view-project'
export const ADMIN_PROJECT_BUILDING = '/admin/project-building'
export const PROJECT_BUILDING_ROUTE = 'project/projects-buldings'
export const PROJECT_UPDATE_ROUTE = 'project/edit-project'
export const PROJECT_DELETE_ROUTE = 'project/delete-project'

export const ADD_TO_ENQUIRED = 'activity/add-to-enquired'
export const USER_ENQUIRIES_ROUTE = 'user/enquiries-received'
export const STATUS_CHANGE_ROUTE = 'admin/change-listing-status'
export const ADD_TO_ENQUIRED_PROJECT='activity/add-to-enquired-project'

export const GEO_LOCATION_API_PATH = 'https://geolocation-db.com/json/'
export const IPIFY_API_PATH = 'https://api.ipify.org/?format=json'

// Other constants
export const COLOR_ARRAY = [
  'rgba(1, 129, 145, 0.08)',
  'rgba(147, 22, 2, 0.06)',
  'rgba(200, 142, 32, 0.06)',
]
export const AREA_MAPS = {
  squareFeet: 'Sq.Ft.',
  squareYards: 'Sq.Yd.',
  squareMeters: 'Sq.Mt.',
  Acre: 'Acre',
  Acres: 'Acres',
}
export const AREA_KEYS_INCREASING_ORDERS = [
  'squareFeet',
  'squareYards',
  'squareMeters',
  'Acre',
]
export const AREA_KEYS_DECRESING_ORDERS = [
  'Acre',
  'squareMeters',
  'squareYards',
  'squareFeet',
]
export const AGERANGE = [
  'All',
  '10-20 years',
  '20-30 years',
  '30-40 years',
  '40-50 years',
  '50-60 years',
  '60-70 years',
  '70-80 years',
  '80-90 years',
]
export const METRO_CITIES = 'Metro Cities'
export const AGERANGE_MDDROPDOWN = 'Age Range'
export const M_CITITES =
  'Mumbai Delhi Bangalore Hyderabad Pune Chennai Gurgaon Noida Kolkata Ahmedabad Thane Navi Mumbai Jaipur Surat Lucknow'
export const ALL_AVAILABLE_FACILITIES = {
  parkingAvailability: 'Parking',
  loanAvailability: 'Loan Available',
  gasPipeline: 'Gas Pipeline',
  waterSupply: 'Water Supply',
  electricitySupply: 'Electricity Supply',
  streetLighting: 'Street Lighting',
  sewage: 'Sewage',
  powerBackup: 'Power Backup',
  personalWashroom: 'Personal Washroom',
  liftAvailability: 'Lift Available',
  propertyElectricityCharges: 'Electricity Charges Included',
}

// Action constants
export const POST_TEXT = 'post'
export const PUT_REQ = 'put'
export const GET_REQ = 'get'
export const DELETE_REQ = 'delete'

// UI constants
export const CLOSE = 'Close'
export const NEXT_STEP = 'Next Step'
export const LISTING_ACTIVE_TEXT = 'Listing Active'

// Location constantspropertyType
export const GET_CURRENT_LOCATION = 'Get Current Location'

// UI constants
export const SEARCH_TXT = 'Search'
export const GO_BACK = 'Go back'
export const GO_TO_HOMEPAGE = 'Go to homepage'
export const BACK = 'Back'
export const VERIFY = 'Verify'
export const VERIFY_OTP = 'Verify OTP'
export const VERIFYING = 'Verifying...'
export const EDIT_TEXT = 'Edit'
export const CHECK_IT_OUT = 'Check It Out'
export const OTP_SENT_TO = 'OTP sent successfully to '
export const BUILT_DATE = 'Built Date'
export const POSSESION_DATE = 'Possession Date'
export const COMING_SOON = 'Coming Soon'
export const USER_LOGOUT = 'User Logout'
//ERRORS
export const OOPS = 'Oops!'
export const ERR_MSG_404 = 'Looking for something?'
export const ERR_MSG_DEFAULT = 'Something went wrong.'
export const ERR404 =
  "We're sorry. The Web address you entered is not a functioning page on our site."
export const ERR_DEFAULT =
  'We apologize for any inconvenience caused. Thank you for your patience and understanding.'
export const WRONG_EMAIL = 'Please enter a valid email address.'
export const INVALID_DATE_OF_BIRTH =
  'Invalid date of birth. Please select a valid date.'
export const FUTURE_DATE_ERROR = 'You cannot enter the future dates'
export const INVALID_DATE_ERROR = 'Your date is invalid'
//PROFILE UPDATE RELATED CONSTANTS
export const PROFILE_UPDATE_SUCCESS = 'Profile edited successfully'
export const DONE = 'Done'
export const TEXT_INITIATE_VERIFICATION =
  'You can now proceed to live camera verification.'
export const LOCATION_VERIFICATION_TEXT_KM =
  ' Your location has been captured but could not be verified as it is outside the 5 km range.'
export const LOCATION_VERIFICATION_TEXT_KM_RANGE =
  ' Your location is verified, you may proceed.'
export const ERROR_403 = 'Error 403'
export const UNAUTHORIZED = 'Unauthorized User'
export const UNAUTHORIZED_TYPE = 'Unauthorized'
export const UNAUTHORIZED_MESSAGE =
  'You are not authorized to access the page you are looking for, please go back.'
export const TEXT_DEVELOPER_NAME = 'Developer Name'
export const TEXT_DEVELOPER_SINCE = 'Developer Since'
export const TEXT_DEVELOPER_RATING = 'Developer Rating'
export const TEXT_UPLOAD_DEVELOPER_LOGO = 'Upload Developer Logo'
export const TEXT_ABOUT_DEVELOPER = 'About Developer'
export const ADD_DOCUMENT = '+ Add Document'
export const LOGO_UPLOAD_SUCCESS = 'Logo Upload Successfully'
export const LOGO_DELETE_SUCCESS = 'Logo Delete Successfully'

//MODAL CONSTANT
export const NOTICE = `Complete the verification to improve your listing's visibility with SuperScore.`
export const LEARN = 'Learn More'
export const VERIFICATION_ASSOCIATE = 'Verification Associate'
export const AGENT_SCHEDULE_TIME_TEXT =
  'An agent will schedule a verification appointment shortly.'
export const AGENT_VERIFICATION_TEXT =
  ' Kindly complete your camera verification within 20 minutes'
export const SUPER_VERIFICATION_PATH_ROUTE = '/faqs/super-verification'

// Location constants
// Misc constants
export const BHK = 'BHK'
export const BED_ROOM = 'Bed'
export const BATH_ROOM = 'Bath'
export const BATHS = 'Baths'
export const BATH = 'Bath'
export const SHARED_BATH = 'Shared Bath'
export const BEDS = 'Beds'
export const BED = 'Bed'
export const SQUARE_FT = '/Sq.Ft.'
export const SQUARE_FT_TEXT = 'Sq.Ft.'
export const BACKSPACE = 'Backspace'
export const ARROW_LEFT = 'ArrowLeft'
export const ARROW_RIGHT = 'ArrowRight'
export const TEXT = 'text'
export const ENTER_COMPLETE_OTP = 'Please enter the complete OTP.'
export const ENTER_OTP_FIRST = 'Please provide OTP.'
export const INDIA_MOBILE_CODE = '+91'
export const AUTH = 'auth'
export const INR_TEXT = 'INR'
export const EN_INDIA_TEXT = 'en-IN'
export const FALSE = 'false'
export const VERIFICATION_STATUS_F = 'Verification failed'
export const NEWS_ROUTE = 'user/news'
export const LOCALHOST = 'http://localhost:3000'
export const MAPS_URL = 'https://www.google.com/maps/search/'
export const SUPERAREA_URL = 'www.superarea.ai'
export const LOGIN_ROUTE = 'user/login'
export const REGISTER_ROUTE = 'user/register'
export const REDIRECT = 'redirectUrl'
export const DOWNLOAD = 'Download'
export const LOGIN_QUERY = 'login'
export const CONTACT = 'Contact'
export const CONTACT_MORES = 'Contact SuperArea'
export const MOUSE_DOWN = 'mousedown'
export const DID_NOT_LIKE_PROPERTY = "Didn't like anything yet"
export const PROPERTY_LIST_ROUTE = '/property/get-posted-property'
export const PROPERTY_VIEWED_ROUTE = '/property/total-viewed'
export const PROPERTY_WISHLISTED_ROUTE = 'property/total-wishlisted'
export const PROPERTY_ENQUIRED_ROUTE = 'property/total-enquired'
export const USER_ACTIVITY_ROUTE = 'activity/recently-viewed'
export const USER_PROPERTY_WISHLISTED_ROUTE = 'activity/my-wishlist'
export const USER_PROPERTY_ENQUIRED_ROUTE = 'activity/my-enquired'
export const NUMERIC = 'numeric'
export const LONG = 'long'
export const AM = ' AM'
export const AM_SMALL = ' am'
export const PM = ' PM'
export const PM_SMALL = ' pm'
export const EN_US = 'en-US'
export const AT = 'at'
export const SAVE_VIDEO_LINK_ROUTE = '/property/save-verification-video-link/'
export const UPLOAD_IMAGE = 'user/aws-image'
export const UPLOAD_VIDEO_ROUTE = 'user/aws-video'
export const UPDATE_IMAGE_TEXT = 'Update Profile Photo'
export const REMOVE_IMAGE = 'user/removeImage'
export const VALID_FILE_ERROR = 'Please select valid video files.'
export const DELETE_PROPERTY = '/property/deleteProperty?'
export const COMPLETE = 'Complete'
export const RELOAD = 'Reload'
export const ICONS = 'Icons'
export const BACK_TO_HOME = 'Back to Home'
export const BACK_TO_HOME_PAGE = 'Back to HomePage'
export const BACK_TO_DASHBOARD = 'Back to Dashboard'
export const ADD_PROPERTY = 'Add Property +'
export const MEETING_TIME_ARRIVED = 'Start Meeting!'
export const MESSAGE_ICON = 'Message Icon'
export const MODAL_BACKGROUND = 'modal-background'
export const CONTACT_FORM_TITLE = 'Fill all the details in contact form'
export const CONTACT_FORM_ROUTE = 'user/contact-form'
export const REQUEST_RAISED = 'Request raised!'
export const EMAIL_TEXT_LOWERCASE = 'email'
export const SENDING_TEXT = 'Sending...'
export const AGENT_FORM_ID = 'agentForm'
export const REPORTING_TEXT = 'Reporting...'
export const SEND_MESSAGE = 'Send Message'
export const SEND_BUG = 'Submit'
export const ENTER_PASSWORD_TEXT = 'Enter Password'
export const REMARK_TEXT = 'Remark'
export const ACKNOWLEADGE_REMARK_TEXT = 'Extra details/ Agent remarks'
export const ENTER_MOBILE_NUMBER_PLACEHOLDER = 'Enter Mobile Number'
export const ENTER_STATUS_REASON =
  'Write your remark here(maximum 50 character....)'
export const OWNER = 'Owner'
export const LETTER_V = 'v'
export const LIKED_PROPERTIES = 'Liked Properties'
export const AGENT_LEADS_ACTIVITY_ROUTE = '/agent/leads'
export const USER_POST_PROJECT_ROUTE = '/user/post-property'
export const AWS_IMAGE_UPLOAD_ROUTE = 'user/aws-image'
export const AWS_IMAGE_REMOVE_ROUTE = 'user/remove-image'
export const ADMIN_DASHBOARD_TEXT = 'Admin Dashboard'
export const AGENT = 'Agent'

export const ADMIN_TYPE = 'Admin'
export const BUCKET_NAME_S3 = 'superarea-prod-s3'
export const ADMIN_LOGIN_ROUTE = '/admin/login'
export const ADMIN_DASHBOARD = '/admin/dashboard'
export const ADMIN = '/admin/'
export const UNAUTHORIZED_ROUTE = '/unauthorized'
export const ERROR_ROUTE = '/error'
export const ROUTE_404 = '/404'
export const DASH_BOARD = 'Dashboard'
export const DASHBOARD_TEXT = 'dashboard'
export const PROJECT_BUILDING = 'project-building'
export const CAPITAL_PROJECT = 'PROJECT'
export const PROJECT = 'Project'
export const PROJECTS = 'Projects'

export const ASSIGN_M_ASSOCIATES = 'assign-e-associates'
export const DEFAULT_USER_IMAGE = '/User_cicrle_light.svg'
export const ASSOCIATES = 'Associates'
export const TOP = 'Top'
// API Routes
export const M_SCORE_CALCULATION_ROUTE = 'property/get-m-score'
export const UNIQUE_CITY_ROUTE = '/admin/unique-city'
export const DELETE_PROPERTY_LIST = '/property/delete-property/'
export const DELETE_PROPERTY_ROUTE = 'property/delete-property'
export const HOME_ROUTE = '/'
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
export const MOBILE_REGEX = /^(?:\+91|0)?[6789]\d{9}$/
export const MOBILE_TEXT_RESPONSE = 'Please enter a valid mobile number.'
export const EMAIL_TEXT_RESPONSE = 'Please enter a valid email address.'
export const ALL_FIELD_RESPONSE = 'All fields are required.'
export const VIDEO_ALREADY_UPLOADED =
  'Video already uploaded. Please remove the existing video to upload a new one.'
export const VIDEO_LIMIT_EXCEEDED = 'Video size limit exceeded (max size: 35MB)'
export const LOADING_EDITOR = 'Loading editor...'
export const SNOW = 'snow'
export const PROPERTY_DESCRIPTION = 'Property Description'
export const GENERATE_PROPERTY_DESCRIPTION = ' Auto Generate'
export const PHOTOS = 'Photos'
export const ADDED_WISHLIST = 'Added to wishlist'
export const REMOVED_WISHLIST = 'Removed from wishlist'
export const LOGIN_FIRST = 'Please log in first.'
export const NEAR_ME = `Near Me`
export const ALERT_LOCATION_TEXT =
  'you have to allow location for search near me'
export const ALREADY_SEEN = 'Already seen'
export const VIEWS_LABEL = 'Views'
export const VIEW_LABEL_ = 'View'
export const ADD_PROPERTY_SUCCESS = 'Property added successfully'
export const FIVE_IMAGE = 'Please upload at least 1 images.'
export const IMAGE_UPLOAD_ERROR = 'Error Uploading Images'
export const VIDEO_UPLOAD_ERROR = 'An error occurred while deleting photo'
export const IMAGE_NUMBER = '0'
export const KYC = 'KYC'
export const COMPLETE_TEXT =
  ' Please complete your e-KYC process so that your listing can go live and you can begin receiving leads.'
export const COMPLETE_TEXT_USER =
  ' Please complete your e-KYC process so that your listing can go live.'
export const SUBMIT = '/user/submit-otp'
export const FAILED_GENERATE_OTP_ERROR =
  'Failed to generate OTP. Please try again.'
export const LOCATION_GETHERING = ' Gathering your location'
export const SECONDS_TEXT = 'This will take Less than 20 seconds'
export const VERIFICATION_STATUS_TEXT =
  'Start the verification to make sure everything is completely real and trustworthy.'
export const KYC_VERIFICATION_TEXT =
  'Your e-KYC verification is not completed, kindly complete the verification before moving forward to post property.'
export const UPDATE_BUTTON = ' Update e-KYC'
export const LEARN_MORE = 'Learn more'
export const MY_PROFILE_PATH = '/agent/profile'
export const MY_PROFILE_PATH_USER = '/user/profile'
export const M_VERIFICATION_STEP1_TEXT = 'e-KYC Verification'
export const M_VERIFICATION_STEP2_TEXT = 'Initiate Review Listing'
export const M_VERIFICATION_STEP2_CHANGE_TEXT = 'Verification Associate'
export const LISTING_VERIFICATION_STEP2_EXPERT_TEXT = 'Assigned Associate'
export const LISTING_VERIFICATION_STEP2_DIRECT_TEXT = 'Admin Approval'
export const M_VERIFICATION_STEP3_TEXT = 'Location Check'
export const M_VERIFICATION_STEP4_TEXT = 'Live Camera Verification'
export const M_VERIFICATION_STEP4_TEXT_AGENT = 'Location & Video Verification'
export const LISTING_VERIFICATION_STEP3_TEXT = 'Listing Status'
export const M_VERIFICATION_STEP3_CHANGE_TEXT = 'Location Verification'
export const APPOINTMENT = 'Appointment'
export const INTRODUCING = 'Introducing '
export const STATIC_PAGE_TEXT =
  'Introducing SuperVerification: Authenticity in Real Estate Made Simple.'
export const STATIC_PAGE_PARAGRAPH_TEXT = `In the high-speed real estate world, trust and honesty are critical when selling or purchasing a property online. That's why we launched SuperVerification—a game-changing technology that skips the whole history of how properties are presented and sold. Using advanced technology, SuperVerification makes sure that each listing on our site is genuine, verified, and reliable. From property information to photos, we carefully check every detail, providing buyers with the assurance to make sound choices and sellers with the reputation they deserve. When you shop with SuperVerification, you're not only viewing a listing—you're viewing the genuine profiles.`
export const STEPS_TEXT = 'Steps to complete your'
export const E_KYC_VERIFICATION_TEXT =
  'e-KYC Verification: Building Trust from the Start '
export const SCHEDULE_VERIFICATION_TEXT = 'Schedule a Meeting'
export const SCHEDULE_MEETING_VERIFICATION_PARAGRAPH_TEXT =
  'Once your listing is reviewed, an agent will reach out to you for a quick phone call to coordinate the best date and time for a live camera verification session. This step ensures that every detail in your listing is accurate, transparent, and trustworthy, giving buyers confidence in what they see. By verifying your property in real time, we create a transparent and reliable experience for both sellers and buyers.'
export const E_KYC_VERIFICATION_PARAGRAPH_TEXT =
  'Before listing a property, every user must complete a simple yet secure electronic Know Your Customer (e-KYC) verification. This process ensures that all personal details are authenticated against official documents, confirming that every user on our platform is genuine, verified, and trustworthy. By taking this step, we create a safe and reliable space for both buyers and sellers, making online property transactions smoother and more secure.'
export const LOCATION_MATCHING_VERIFICATION_TEXT = ' Location Matching:'
export const REVIEW_LISTING_VERIFICATION_TEXT = 'Review Your Listing'
export const REVIEW_LISTING_VERIFICATION_PARAGRAPH_TEXT =
  'Users have the opportunity to review their listing before final submission. This crucial step ensures accuracy and completeness. If any changes are desired, users can make adjustments at this stage. Once the listing is submitted, further modifications will not be permitted. This careful review not only helps in ensuring the integrity of the listing but also contributes positively to improving the S score'
export const LOCATION_MATCHING_VERIFICATION_PARAGRAPH_TEXT =
  'We employ advanced geolocation technology to confirm the exact location of the property. This step eliminates the possibility of fraudulent listings and ensures that every property is precisely where it`s claimed to be.'
export const LIVE_CAMERA_VIDEO_VERIFICATION_TEXT =
  'Live Camera Verification'
export const LIVE_CAMERA_VIDEO_VERIFICATION_PARAGRAPH_TEXT = `The final step in the process is live camera property verification, where users are guided through capturing real-time images of their property using their smartphone cameras. This live verification provides an extra layer of authenticity, confirming not only the property's location but also the condition as described in the listing. By adding this step, we offer both buyers and sellers greater confidence in the accuracy and transparency of the property details.`
export const START_VERIFICATION_BUTTON_TEXT = 'Start verification'
export const UNAPPROVED_LISTING_ROUTE = '/admin/direct-unapproved-listings'
export const MORES_EXPERT_APPROVED_ROUTE =
  '/admin/mores-expert-approved-listings'
export const FILTERED_LISTING = 'admin/filtered-listings'
export const ASSIGN_ASSOCIATE_LISTINGS =
  'admin/assign-associate-filtered-listings'
export const VERIFICATION_LISTING = 'admin/verification-listings'
export const VERIFICATION_LISTING_COUNTS = 'admin/verification-listings-counts'
export const ASSIGN_ASSOCIATE_TO_ITEM = 'assign-associate'
export const DATE_OF_BIRTH = 'Date of Birth'
export const GENDER = 'Gender'
export const VERIFIED = 'Verified'
export const PENDING = 'Pending'
export const PENDING_TEXT = 'pending'
export const LISTING_PENDING = 'Listing Pending'
export const LISTING_REJECTED = 'Listing Rejected'
export const LISTING_APPROVED = 'Listing Approved'
export const KYC_UPDATE = 'Initiate e-KYC'
export const KYC_VERIFY = 'e-KYC Verification'
export const LIVE_LOCATION_VERIFICATION_TEXT =
  'Location and Live Camera Verification'
export const KYC_VERIFIED = 'Verify KYC'
export const PROCEED_TEXT =
  'To proceed with the process, please follow these next steps:'
export const NEED =
  'We need to confirm your identity to fight fraud and keep the business secure'
export const DIGIT_TEXT =
  ' Enter the 6 digit code received on your registered Aadhaar mobile number.'
export const AADHAAR_DIGIT =
  'Please provide your 12 digit Aadhaar number to initiate verification.'
export const INITIATE = 'Initiate Verification'
export const E_VERIFY = ' e-KYC Successful'
export const CONGRATULATION =
  'Your e-KYC verification is successfully completed. Welcome to SuperArea.'
export const BACK_PROFILE = 'Back to Profile'
export const VERIFY_OTP_MSG = 'OTP Verified Successfully'
export const VERIFY_OTP_TEXT = 'OTP Verified'
export const GENERATE_OTP = 'user/generate-otp'
export const UNDER_REVIEW_TEXT = 'Your listing is under review'
export const UNDER_REVIEW_PROCESS_TEXT = 'Next steps:'
export const REVIEW_LISTING_STEP1_TEXT = '1. Await Contact:'
export const REVIEW_LISTING_STEP1_HEADING =
  'An agent from our team will reach out to you. The communication will be brief, typically lasting between 5 and 15 minutes'
export const REVIEW_LISTING_STEP2_TEXT = '2. Schedule Meeting:'
export const REVIEW_LISTING_STEP2_HEADING = `Please ensure that location access is activated on your mobile or computer device. It's crucial that you are present at your listing's location for accurate verification`
export const REVIEW_LISTING_STEP3_TEXT =
  '3. Enable location service Prepare for Live Camera Verification:'
export const REVIEW_LISTING_STEP3_HEADING =
  'A video call will be conducted with our agent for live verification, involving 5 to 10 questions about your listing. This step is crucial for validating and cross-verifying details. Ensure location access is activated on your device and be present at the listing`s location for accurate verification.'
export const REVIEW_LISTING_STEP_END_TEXT =
  'Ensure that you have a stable internet connection and that your device`s camera and microphone are functioning properly for a smooth verification process.'
export const BACK_LISTING_BUTTON = 'Back to listing'
export const GEOLOCATION_ERROR_TEXT =
  'Geolocation is not supported by your browser'
export const LOCATION_VERIFIED = 'locationVerified'
export const LOCATION_CHECK_HEADING_TEXT = 'Location Check'
export const LOCATION_CHECK_TEXT =
  'Please ensure you are at your property site, so we can verify and confirm its location.'
export const AT_PROPERTY_TEXT = 'You are at the property ✅'
export const NOT_AT_PROPERTY_TEXT = 'Location does not match the property.'
export const INITIATE_LOCATION_CHECK = 'Initiate location check'
export const DATA_SAVED_TEXT = `Note: Your Aadhaar information is not stored by us, it's solely for the purpose of verification.`
export const UPDATE_DETAILS_TEXT =
  'Note: Your profile has been successfully updated to reflect your Aadhaar card information. You can view the updates on your profile page.'
export const FAILED_MSG = 'Failed to generate OTP. Please try again.'
export const FAILED_MSGS = 'Network error. Please check your connection.'
export const AADHAAR = 'Aadhaar details'
export const OTP_STATUS = 'OTP Verification'
export const NEW_APPROVE_TEXT = 'Approve Listing'
export const STATUS = 'Status'
export const ALL_TEXT = 'all'
export const FIRST_NAME_REQUIRED = 'First name is required'
export const INCORRECT_EMAIL_TEXT = 'enter a valid email'
export const LAST_NAME_REQUIRED = 'Last name is required'
export const EMAIL_REQUIRED = 'Email is required'
export const ADDRESS = 'Address'
export const NO_PROPERTY_FOUND = 'No properties found'
export const PROPERTIES_FOUND = ' Properties Found'
export const PROPERTY_FOUND = ' Property Found'
export const RERA_COMING_SOON = 'Verify Rera Now (Coming Soon)'
export const LANGUAGE_PREFERENCES = 'Language Preferences'
export const EDIT_PROPERTY_TEXT = 'Edit Profile'
export const PROFILE_EDIT_SUCCESS_TEXT = 'Profile updated successfully'
export const EDIT_PROPERTY = 'Edit Property'
export const EDIT_PROJECT = 'Edit Project'
export const PROFILE_NOT_FOUND_MESSAGE =
  'User profile not found. Please check your account settings.'
export const DELETE_MESSAGE = 'Delete Property?'
export const DELETE_FINAL_MESSAGE =
  'Are you sure you want to delete this property?'
export const DELETE_PROJECT = 'Delete Project ?'
export const DELETE_PROJECT_MESSAGE =
  'Are you sure you want to delete this Project?'
export const UNAUTHORIZED_PROFILE_MESSAGE =
  'Unauthorized access. Please login to view your profile.'
export const UNABLE_PROFILE_MESSAGE =
  'Unable to fetch user profile. Please try again later.'
export const UNEXPECTED_PROFILE_MESSAGE =
  'An unexpected error occurred while fetching user profile. Please contact support.'
export const MY_PROFILE = 'My profile'
export const LANGUAGE = [
  'Hindi',
  'English',
  'Bengali',
  'Marathi',
  'Telugu',
  'Tamil',
  'Gujarati',
  'Urdu',
  'Kannada',
  'Malayalam',
  'Punjabi',
  'Odia',
]

export const LAND_TYPES = [
  'Township',
  'Group Housing',
  'Society',
  ' Commercial',
  ' Industrial',
  'Agricultural Zone',
  'IT/ITES',
  'Mix Use',
  'WareHouse',
  'Transport and Comunication',
  'Public Utilities',
  'Public & Semi Public Use',
  'Open Spaces',
  'Special Economic Zone',
  'Natural Conservation Zone',
  'Government Use',
]

export const ZERO_LISTINGS = '0 listings'
export const MORES_RERA_ID = 'SuperArea RERA ID'
export const DISPLAYS = 'displays'
export const PROJECTS_RERA_ID = 'Project RERA ID'
export const KYC_MODAL_TEXT =
  'Please ensure your personal details (name, DOB, etc.) on your profile are accurate. These details will be updated to align with information on your Aadhaar card.'
export const KYC_MODAL_WARNING =
  'Note: After e-KYC verification, you will no longer be able to edit the following details.'
export const NAME_NOTE = ' Note: The name should be as per the Aadhaar card'
export const NOT_IN_LIST = 'Not in the list?'
export const MOBILE_NUMBER_MASK =
  'Display your contact number for customer enquiries.'
export const MALE = 'Male'
export const FEMALE = 'Female'
export const GENDER_SELECT = 'Select your gender'
export const LOCATION_VERIFICATION_TEXT = `Please ensure you are at your property's site, so we can verify and
confirm its location.`
export const CAMERA_VERIFICATION_TWO_MIN_WARN =
  'Note: Please be ready for live camera verification with the agent. You will get only 2 minutes to initiate live camera verification, if you are unable to do so you will have to verify your location again.'
export const LOCATION_MATCHED = 'Location Matched & Verified'
export const PROPERTY_LOCATION_VERIFIED = `Congratulations! You've successfully completed the SuperArea location verification, as your current location matches the location of your property`
export const INTIATE_CAMERA_VERIFICATION = 'Initiate live Camera'
export const LOCATION_CHECK = 'Location Check'
//Filter Section Constants
export const FILTER_HEADING = 'Filter'
export const PROPERTY_FILTER_HEADING = 'Property Type'
export const BHK_FILTER_HEADING = 'BHK'
export const AMENITIES_FILTER_HEADING = 'Amenities'
export const LAND_AMENITIES_FILTER_HEADING = 'Land Amenities'
export const BUDGET_FILTER_HEADING = 'Budget'
export const FURNISHING_STATUS_FILTER_HEADING = 'Furnishing Status'
export const FILTER = 'Filters'
export const BUDGET_FILTER_ERROR =
  'Please input the price range from lower to higher.'
export const BUDGET_ZERO = 'zero'
export const BUDGET_THOUSAND = 'Thousand'
export const BUDGET_LAKH = 'Lakh'
export const BUDGET_CRORE = 'Crore'
export const ACTIVE = 'active'

//Filter Property Type
export const PROPERTY_TYPE_RESIDENTIAL = 'Residential'
export const PROPERTY_TYPE_COMMERCIAL = 'Commercial'

//Filter Furnishing Status
export const FURNISHING_STATUS_FURNISHED = 'Furnished'
export const FURNISHING_STATUS_UNFURNISHED = 'Non-Furnished'
export const FURNISHING_STATUS_SEMIFURNISHED = 'Semi-Furnished'
export const FURNISHING_STATUS_URUNFURNISHED_TEXT = 'Unfurnished'
export const FURNISHING_STATUS_BARESHELL = 'Bareshell'

//Filter Amenities
export const AMENITIES_SCHOOL = 'School'
export const AMENITIES_LIFT = 'Lift'
export const AMENITIES_FIRE_FIGHTING_SYSTEMS = 'Fire Fighting Systems'
export const AMENITIES_WIFI = 'Wifi'
export const AMENITIES_SECURITY = 'Security'
export const AMENITIES_CCTV = 'CCTV'
export const AMENITIES_KIDS_POOL = 'Kids Pool'
export const AMENITIES_BADMINTON_COURT = 'Badminton Court'
export const AMENITIES_TENNIS_COURT = 'Tennis Court'
export const AMENITIES_FOOTBALL = 'Football'
export const AMENITIES_SQUASH_COURT = 'Squash Court'
export const AMENITIES_BASKETBALL = 'Basketball'
export const AMENITIES_CRICKET = 'Cricket'
export const AMENITIES_VOLLEYBALL = 'Volleyball'
export const AMENITIES_YOGA = 'Yoga'
export const AMENITIES_DOUBLE_BED = 'Double Bed'
export const AMENITIES_TABLE_TENNIS = 'Table Tennis'
export const AMENITIES_PARK = 'Park'
export const AMENITIES_POWERBACKUP = 'Power Backup'
export const AMENITIES_GYM = 'Gym'
export const EMAIL_LABEL_TEXT = 'Enter a registered Email ID'
export const AMENITIES_JOGGING = 'Jogging'
export const VIEW = 'View'

// Filter BHK
export const BHK_STUDIO = 'Studio'
export const BHK_ONE = '1 BHK'
export const BHK_ONE_HALF = '1.5 BHK'
export const BHK_TWO = '2 BHK'
export const BHK_TWO_HALF = '2.5 BHK'
export const BHK_THREE = '3 BHK'
export const BHK_THREE_HALF = '3.5 BHK'
export const BHK_FOUR_PLUS = '4+ BHK'

//Sortby
export const SORTBY = 'Sort by'
export const PRICE_LOW_TO_HIGH = 'Price Low to High'
export const PRICE_HIGH_TO_LOW = 'Price High to Low'
export const NEWEST = 'Newest'
export const OLDEST = 'Oldest'
export const SORTBYRECOMMENDED = 'Recommended'
export const MIN = 'min'
export const MAX = 'max'

//furnishing status label
export const FURNISHED_LABEL = 'Furnished'
export const FURNISHED = 'Furnished'
export const UNFURNISHED_LABEL = 'Unfurnished'
export const SEMI_FURNISHED_LABEL = 'SemiFurnished'
export const SEMI_FURNISHED = 'Semi Furnished'
export const BARESHELL_LABEL = 'Bareshell'

//budget label
export const BELOW20LAC_LABEL = 'below ₹ 20 lac'
export const LAC20TO40_LABEL = '₹ 20 lac - ₹ 40 lac'
export const LAC40TO60_LABEL = '₹ 40 lac - ₹ 60 lac'
export const LAC60TO80_LABEL = '₹ 60 lac - ₹ 80 lac'
export const LAC80TO100_LABEL = '₹ 80 lac - ₹ 1 Cr.'
export const CRORE1PLUS_LABEL = '₹ 1 Crore+'
export const PROPERTY_TYPE = 'Property Type'
export const PROPERTY_SUB_TYPE = 'Property Sub Type'
export const CITY = 'City'
export const STATE = 'State'
export const LOCALITY = 'Locality'
export const PROPERTY_SIZE = 'Property Size'
export const SALE_PRICE = 'Sale Price'
export const RENT_PRICE = 'Rent Price'
export const BATHROOM_COUNT = 'Bathroom '
export const BEDROOM_COUNT = 'bedroom '
export const UNCOVERED_PARKING_COUNT = 'Uncovered Parking '
export const COVERED_PARKING_COUNT = 'Covered Parking '
export const TOTAL_FLOORS = 'Total Floors'
export const FLOOR_NUMBER = 'Floor Number'
export const TOWER_BLOCK = 'Tower/Block'
export const PLOT_SHAPE = 'Plot Shape'
export const PROPERTY_DELETED = 'Property Deleted Successfully'
export const PROPERTY_ELECTRICITY_CHARGES = 'Electricity Charges'
export const PROPERTY_STATUS = 'Property Status'
export const PARKING_AVAILABILITY = 'Parking Availability'
export const MAINTENANCE_METHOD = 'Maintenance Method'
export const RENT_DEPOSIT_AMOUNT = 'Rent Deposit Amount'
export const RENT_DEPOSIT_METHOD = 'Rent Deposit Method'
export const AVAILABLE_FACILITIES = ''
export const PLOT_NUMBER = 'Plot Number'
export const _FACING = 'Facing'
export const VIEWED = 'Viewed'
export const VIEWED_TAB = 'viewed'
export const RECENTLY_VIEWED = 'Recently Viewed'
export const WISHLISTED = 'Wishlisted'
export const WISHLISTED_TAB = 'wishlisted'
export const ENQUIRED_TAB = 'enquired'
export const ENQUIRED = 'Enquired'
export const ENQUIRED_QUERY = 'enquired'
export const INSIGHTS_PAGE = 'insightsPage'
export const RECOMMENDED = 'Recommended'
export const EMPTY_WISHLIST = 'No items in the Wishlist.'
export const NO_ENQUIRIES = 'No enquiries have been made yet.'
export const EMPTY_VIEWED = 'No items were viewed recently.'
export const COUNT_API_ROUTE = '/admin/filtered-listings-counts'
export const ASSIGN_ASSOCIATE_COUNT_API_ROUTE =
  '/admin/assign-associate-filtered-listings-counts'
export const _FLOORING = 'Flooring'
export const _PG_FOOD_CHARGES = 'Pg Food Charges'
export const PROJECT_BUILDING_TEXT = 'Project/Building Name'
export const CANNOT_UPDATE_WITH_SAME = "Can't update with same status"
export const AGENT_CANNOT_BE_ASSIGNED_FIRST = 'Now you can assign the associate'
export const POST_PROJECT_TEXT = 'Post Project'
export const ALL_USERS = 'All Users'
export const RESTRICTED_USERS = 'Restricted Users'
export const ALL_LISTINGS = 'All Listings'
export const WEBSITE_MODERATION = 'Website Moderation'
export const SETTINGS = 'Settings'
export const PROJECT_RERA_ID = 'Project RERA ID'
export const PROJECT_SIZE = 'Project Size'
export const UNIT_SIZE = 'Unit Size'
export const CARPET_AREA_SIZE = 'Unit Size (Carpet Area)'
export const BUILT_AREA_SIZE = 'Unit Size (Built-Up Area)'
export const SUPER_AREA_SIZE = 'Unit Size (Super Built-Up Area)'
export const TOTAL_UNIT_COUNT = 'Number of Units'
export const ADD_UNIT = 'Add Unit'
export const UPDATE_UNIT = 'Update Unit'
export const UPLOAD_PHOTO_UNIT = 'Upload Unit Floor Plan'
export const UNIT_PLAN = 'Unit Plan'
export const UNIT_TYPE = 'Unit Type'
export const UNIT_COUNT = 'Unit Count'
export const ACTION = 'Action'
export const DELETED_LISTING = 'Deleted Listings'
export const APPROVED_LISTING = 'Approved Listings'
export const REJECTED_LISTING = 'Rejected Listings'
export const WORKING_SINCE = 'Working Since '
export const CONTACT_INFO = 'Contact Information'
export const DELETED_TEXT = 'deleted'
export const ENQUIRY_SENT_SUCCESSFULLY = 'Enquiry sent successfully'
export const OWN_PROPERTY_ENQUIRED = 'Cannot enquire your own listing'
export const PROJECT_ENQUIERY_FOR_ADMIN = 'Admin cannot enquire projects'
export const PROJECT_PROP = 'project'
export const POSSESSION_DATE = 'Proposed Possession Date'
export const LAUNCH_BUILT_DATE = 'Built Month'
export const PROJECT_DESCRIPTION = 'Project Description'
export const PROJECT_DESCRIPTION_MISSING = 'Project description is missing'
export const IMAGE_MISSING = 'Please Upload at least one image'
export const SELECT_DROPDOWN =
  'Please select project/building from google dropdown list'
export const UNIT_DETAIL_MISSING = 'Upload at least one unit detail'
export const UNIT_FLOOR_PLAN_PRICING = 'Floor Plans and Pricing'
export const PROJECT_INFORMATION = 'Project Information'
export const UNIT_TITLE = 'Unit Title'
export const META_TITLE = 'Project Meta Title (Ideal Character Limit: 70)'
export const EXPERIENCE_TEXT = 'Experience'
export const TOTAL_PROJECTS_TEXT = 'Total Projects'
export const META_DESCRIPTION =
  'Project Meta Description (Ideal Character Limit: 170)'
export const CUSTOM_URL_DESCRIPTION =
  'Enter Custom Project URL (Ideal Character Limit: 120)'
export const CURRENT_URL = 'Current URL'
export const OPEN_GRAPH_TEXT = 'Open Graph Card Preview'
export const UPDATED_URL = 'Updated URL:'
export const CUSTOM_URL_GOES_HERE = 'Custom URL goes here'
export const CUSTOM_ID = '00000000000000'
export const ACTIVE_PROJECT = 'Active Projects'
export const ACTIVE_PROPERTIES = 'Active Properties'
export const DELETED_PROJECT = 'Deleted Projects'
export const ALL_PROJECTS = 'All Projects'
export const M_ASSOCIATES = `Associates`
export const HOMEPAGE_META_TITLE = 'Home Page Meta Title'
export const HOMEPAGE_META_DESCRIPTION = 'Home Page Meta Description'
export const ASSIGN = 'Assign'
export const MY = 'My'
export const TEXT_BOX_ERROR = ' Please provide a reason'
export const VERIFIED_USERS = 'OTP Verified Users'
export const COMMERCIAL_FOR_SALE = 'Commercial for Sale'
export const PROPERTIES_FOR_RENT = 'Properties for Rent'
export const LISTINGS_FOR_SALE = 'Listings for Sale'
export const RESIDENTIAL_FOR_SALE = 'Residential for Sale'
export const SUCCESSFULLY_POSTED_PROJECT = 'Project Added Successfully'
export const CONTINUE_TEXT = 'Continue'
export const PREVIEW_POST_PROJECT = 'Post Project'
export const LAUNCH_DATE = 'Launch Month'
export const PROJECT_RATING = 'Project Rating'
export const PROJECT_META_TITLE_TOOLTIP =
  'You can modify the Project meta title here to improve search engine visibility and enhance SEO performance.'
export const PROJECT_META_DESCRIPTION_TOOLTIP =
  'Edit the Project meta description for better SEO, keeping it under 30 words.'
export const PROJECT_RATING_TOOLTIP =
  'Score the project from 1 to 5 based on location, quality, amenities, and overall appeal'
export const DEVELOPER_RATING_TOOLTIP =
  'Score the developer from 1 to 5 based on quality, timeliness, stability, satisfaction, compliance, and innovation'
export const DEVELOPER_RATING = 'Developer Rating'
export const MAX_RATING = 'Max. rating is 10 only'
export const LEADS = 'Leads'
export const ENQUIRY_RECEIVED = 'Enquiry Received'
export const DAILY_ACTIVE_USERS = 'Daily Active Users'
export const VIEW_ALL = 'View All'
export const GIVE_SUITABLE_TITLE_TOOLTIP = 'Provide a suitable title or label'
export const UNIT_AVAILABLE_TOOLTIP = 'Number of units available for sale'
export const UNIT_PRICE_TOOLTIP = 'Sale price of an individual unit'
export const UNIT_SIZE_TOOLTIP = 'Size of an individual unit'
export const UNIT_FLOOR_TYPE_TOOLTIP = 'Floor type of an individual unit'
export const SMALL_UNIT = 'unit'
export const LIVE_VIDEO_CALL = 'Live Camera Verification'
export const COPY_LINK = 'Copy Link'
export const CONNECTED = 'Connected'
export const EMPTY_ROOM =
  'You are alone in the room. Please wait for someone to join'
export const JOIN_CALL = 'Join Call'
export const START_CALL = 'Start Call'
export const END = 'End Call'
export const REMOTE_VIDEO = 'Remote Video'
export const ENTER_ROOM = 'Enter Room Number'
export const VIDEO_NOT_SUPPORTED =
  'Your browser does not support the video tag.'
export const SWITCH_CAMERA = 'Switch Camera'
export const START_RECORDING = 'Start Recording'
export const VIDEO_UPLOADING_DESCRIPTION = 'Wait! Your Video is uploading...'
export const STOP_RECORDING = 'Stop Recording'
export const MAX_SIZE = 'Max size 25 MB'
export const UPLOAD_IMAGE_TEXT = 'Upload Image'
export const UPLOAD_BROCHURE = 'Upload Brochure'
export const UPLOAD_VIDEO = 'Upload Video'
export const IMAGE_UPLOADER_TEXT =
  'Upload images by dragging and dropping. Project listings with more than 5 photos receive more views. Accepted formats are .jpg, .gif, and .png'
//featured card label
export const FEATURED_PROJECTS = 'Featured Projects'
export const FEATURED_PROPERTIES = 'Featured Properties'
export const UNITS = 'Units'
export const UNIT = 'Unit'
export const ADD_ADDITIONAL_TEXT = '+ Add Additional Area Type'
export const SQUARE_FEET_TEXT = 'squareFeet'

export const PROJECT_STEP_1_CHECKS = [
  { projectType: 'Project Type is missing' },
  { projectSubType: 'Project Sub Type is missing' },
  { city: 'City is missing' },
  { projectTitle: 'Project/Building name is missing' },
  { locality: 'Locality is missing' },
  { projectArea: 'Project size is missing' },
  // { projectRating: 'Project rating is missing' },
]

export const YES_NO = ['Yes']

export const PROJECT_STEP_2_CHECKS = [
  // { bedroomCount: 'Number of bedrooms is missing' },
  // { bathroomCount: 'Number of bathrooms is missing' },
  { unitTitle: 'Unit title is missing' },
  // { unitCount: 'Number of unit is missing' },
  // { salePrice: 'Unit sale price is missing' },
]
export const DEDICATED_ROOMS_OPTIONS = [
  'Pooja Room',
  'Study Room',
  'Store Room',
  'Dining Room',
  'Laundry Room',
  'Meeting Room',
  'Servent Room',
  'Others',
]
export const MATTING_TYPE = [
  'Carpet',
  'Hardwood',
  'Engineered Wood',
  'Laminate',
  'Vinyl(Sheet or Plank)',
  'Luxury Vinyl Tile(LVT) / Luxury Vinyl Plank(LVP)',
  'Ceramic Tile',
  'Porcelain Tile',
  'Marble',
  'Granite',
  'Travertine',
  'Stone',
  'Concrete(Polished or Stained)',
  'Cork',
  'Bamboo',
  'Rubber',
  'Terrazzo',
  'Slate',
  'Linoleum',
  'Parquet',
  'Epoxy Flooring',
]
export const PROJECT_STEP_2_AREA_CHECKS = [
  { [0]: 'Carpet area is missing' },
  { [1]: 'Built-Up area is missing' },
  { [2]: 'Super built-up area is missing' },
]
export const PROJECT_STEP_3_APARTMENT_CHECKS = [
  { launchDate: 'Launch Month Is Missing' },
  { builtDate: 'Built Month Is Missing' },
  { possessionStatus: 'Possession status is missing' },
  { amenities: 'Amenities is missing' },
]

export const PROJECT_STEP_2_LAND_CHECKS = [
  { unitTitle: 'Unit title is missing' },
  // { unitCount: 'Number of unit is missing' },
  // { salePrice: 'Unit sale price is missing' },
]
export const PROJECT_STEP_3_LAND_CHECKS = [
  { sewage: 'Sewage is available or not ?' },
  { waterSupply: 'Water supply is available or not ?' },
  { loanAvailability: 'Loan availability is available or not ?' },
  { gasPipeline: 'Gas Pipeline is available or not ?' },
  { electricitySupply: 'Electricity supply is available or not ?' },
  { streetLighting: 'Street Lighting is available or not ?' },
]
export const PROJECT_STEP_RERA_CHECKS = [
  { projectReraId: 'RERA ID is missing' },
  // { reraProjectName: 'Project Name is missing' },
  // { reraProjectType: 'RERA Project Type is missing' },
  // { projectStatus: 'Project Status is missing' },
  // { projectStartDate: 'Project Start Date is missing' },
  // { projectCompletionDate: 'Project Completion Date is missing' },
  // { sanctioningAuthority: 'Sanctioning Authority is missing' },
  // { reraExternalLink: 'RERA External Link is missing' },
  // { projectTotalAreaSqMt: 'Total Area (Sq.mt.) is missing' },
  // { projectDocuments: 'Project Documents are missing' },
]

export const DEVELOPER_CHECKS = [
  { developerName: 'Developer name is missing' },
  { developerSince: 'Developer since date is missing' },
  { developerRating: 'Developer rating is missing' },
  { developerLogoUrl: 'Developer logo URL is missing' },
  { developerDescription: 'Developer description is missing' },
]

export const All_CITIES = 'All Cities'
export const All_TIME = 'All Time'
export const All_LISTINGS = 'All Listings'

export const PROJECT_NAVBAR_MAPS = {
  'RERA Details': 'rera-details',
  'Project Information': 'project-information',
  Overview: 'overview',
  Amenities: 'amenities',
  'Floor Plans and Pricing': 'unit-floor-plan-pricing',
  'Brochure Information': 'brochure-pdf',
  'Project Video': 'project-video',
  'Price List': 'price-list',
  'Site Plan': 'site-plan',
  'Developer Detail': 'developer-details',
  Map: 'map',
}

export const DATE_OPTIONS = [
  { value: 'All Time', label: 'All Time' },
  { value: '1 Day Ago', label: '1 Day Ago' },
  { value: '7 Days Ago', label: '7 Days Ago' },
  { value: '30 Days Ago', label: '30 Days Ago' },
  { value: '45 Days Ago', label: '45 Days Ago' },
  { value: '60 Days Ago', label: '60 Days Ago' },
]

export const DATE_OPTIONS_MASSOCIATE = [
  { value: 'Yesterday', label: 'Yesterday' },
  { value: 'Last 7 Days', label: 'Last 7 Days' },
  { value: 'Last 15 Days', label: 'Last 15 Days' },
  { value: 'Last 30 Days', label: 'Last 30 Days' },
  { value: 'Last 90 Days', label: 'Last 90 Days' },
  { value: 'Last 6 Months', label: 'Last 6 Months' },
  { value: 'Last 1 Year', label: 'Last 1 Year' },
]
//Map categories constant
export const HOSPITAL = 'hospital'
export const SCHOOL = 'school'
export const METRO_STATION = 'metroStations'
export const SHOPPING = 'shopping'
export const BANK = 'bank'
export const POLICE = 'police'
export const RAILWAY_STATION = 'railwayStations'
export const RESTAURANT = 'restaurant'
export const PHARMACY = 'pharmacy'
export const MARKETPLACE = 'marketplace'
export const ATM = 'atm'
export const FUEL = 'fuel'
export const BUS_STATION = 'bus_station'
export const PARKS = 'parks'
export const HIGHWAYS = 'highways'
export const HOSPITALS = 'Hospitals'
export const SCHOOLS = 'Schools'
export const METRO_STATIONS = 'Metro Stations'
export const SHOPPING_MALL = 'Shopping Malls'
export const BANKS = 'Banks'
export const POLICE_STATION = 'Police Stations'
export const RAILWAY_STATIONS = 'Railway Stations'
export const RESTAURANTS = 'Restaurants'
export const PHARMACIES = 'Pharmacies'
export const MARKETPLACES = 'Marketplaces'
export const BY_MOONDIVE = 'by MoonDive'
export const ATMS = 'Atms'
export const FUEL_STATION = 'Fuel Stations'
export const BUS_STATIONS = 'Bus Stations'
export const PARK = 'Parks'
export const HIGHWAY = 'Highways'
export const CITY_DEFAULT = 'City'
export const ALL_CITIES_DEFAULT = 'All Cities'
export const ALL_TIME_DEFAULT = 'Last 90 Days'
export const LISTINGG_DEFAULT = 'Select Listing'
export const DATE_DEFAULT = 'Date'
export const LISTING_DEFAULT = 'Listing Name'
export const NOT_AVAILABLE = '---'
export const LAST_90_DAYS = 'Last 90 days'
export const LAST_7_DAYS = 'Last 7 days'
export const LAST_15_DAYS = 'Last 15 days'
export const LAST_30_DAYS = 'Last 30 days'
export const LAST_6_MONTHS = 'Last 6 months'
export const LAST_1_YEAR = 'Last 1 Year'
export const YEAR_TEXT = 'Year'
export const YEARS_TEXT = 'Years'
export const TODAY = 'Today'
export const YESTERDAY = 'Yesterday'
export const PROPERTIES = 'Properties'
export const TEXT_PROPERTY = 'Property'

export const TABLE_FULL_NAME = 'Full Name'
export const TABLE_KYC = 'KYC'
export const TABLE_PHONENUMBER = 'Phone No.'
export const TABLE_CITY = 'City'
export const TABLE_EXPERIENCE = 'Experience'
export const TABLE_STATUS = 'Status'

export const LISTING_TYPE_FILTERS = [
  { value: 'My Listings', label: 'My Listings' },
  { value: 'Assigned Listings', label: 'Assigned Listings' },
]
export const MY_LISTINGS = 'My Listings'
export const NEW_PROJECT = 'New Project'
export const PLOT_AND_LAND = 'Plot & Land'
export const PG_AND_HOSTELS = 'Pg/Hostels'
export const VILLA = 'Villa'
export const SEARCH_BOX = 'SearchBox'
export const colors = [
  '#F1F6FF',
  '#F1F6FF',
  '#EAFCFF',
  '#EAFCFF',
  '#FFF4F4',
  '#FFF4F4',
  '#FFF4F4',
  '#F1F6FF',
]

//Notification Bar
export const NO_NOTIFICATION_MESSAGE = 'No Notifications To Show'
export const YES_TEXT = 'Yes'
export const NO_TEXT = 'No'
export const LAND_AMENITIES_NAMES = {
  sewage: 'Sewage',
  waterSupply: 'Water Supply',
  loanAvailability: 'Loan Availability',
  streetLighting: 'Street Lighting',
  electricitySupply: 'Electricity Supply',
  gasPipeline: 'Gas Pipeline',
}

export const ROUTE_ACCESSS = {
  '/admin/dashboard': ['Admin'],
  '/admin/e-associates': ['Admin'],
  '/admin/leads': ['Admin'],
  '/admin/project-building': ['Admin'],
  '/admin/post-project': ['Admin'],
  '/admin/all-users': ['Admin'],
  '/admin/all-listings': ['Admin'],
  '/admin/assign-e-associates': ['Admin'],
  '/admin/direct-leads': ['Admin'],
  '/admin/website-moderation': ['Admin'],
  '/admin/app-moderation': ['Admin'],
  '/admin/logout': ['Admin'],
  '/admin/[page]': ['Admin'],

  '/agent/dashboard': ['Agent'],
  '/agent/leads': ['Agent'],
  '/agent/post-property': ['Agent'],
  '/agent/listing': ['Agent'],
  '/agent/logout': ['Agent'],
  '/agent/profile': ['Agent'],
  '/agent/leads-activity': ['Agent'],
  '/agent/[page]': ['Agent'],

  '/user/dashboard': ['Individual', 'user'],
  '/user/post-property': ['Individual', 'user'],
  '/user/[page]': ['Individual', 'user'],
  '/user/profile': ['Individual', 'user'],
  '/user/listing': ['Individual', 'user'],
  '/user/activity': ['Individual', 'user'],
  '/about': ['Individual', 'user', 'Agent'],
  '/contact-us': ['Individual', 'user', 'Agent'],
  '/career': ['Individual', 'user', 'Agent'],
  '/faqs': ['Individual', 'user', 'Agent'],
  '/faqs/e-estimate': ['Individual', 'user', 'Agent'],
  '/faqs/e-score': ['Individual', 'user', 'Agent'],
  '/terms-and-conditions': ['Individual', 'user', 'Agent'],
  '/privacy-policy': ['Individual', 'user', 'Agent'],
}

export const DEFAULT_PROTECTED_ROUTE = {
  Admin: '/admin/dashboard',
  Individual: '/',
  Agent: '/',
}
export const HOME_PAGE_TITLE = 'SuperArea - Your Real Estate Friend'
export const HOME_PAGE_DESCRIPTION =
  "India's Largest Upcoming Tech Driven Real Estate Services Company"
export const HOME_PAGE_SEO_KEYOWRDS = [
  'Real estate listings',
  'Homes for sale',
  'Property for sale',
  'Real estate agents',
  'Buy a house',
  'Sell my home',
  'Find a realtor',
  'House hunting',
  'Property search',
  'Home buying tips',
  'Real estate market trends',
  'Local real estate',
  'Open houses',
  'Real estate investment',
  'New homes for sale',
  'Luxury homes',
  'Commercial real estate',
  'Rentals',
]
export const SINGLE_PROPERTY_VIEW_PAGE_TITLE =
  'SuperArea - Luxury Single Property View'
export const SINGLE_PROPERTY_PAGE_DESCRIPTION =
  'Explore luxury single property listings in India. Find your dream home with top-notch amenities, high-quality images, and detailed property descriptions.'
export const SINGLE_PROPERTY_PAGE_SEO_KEYWORDS = [
  'Luxury single property view',
  'Luxury homes for sale',
  'Luxury real estate',
  'Property details',
  'High-quality images',
  'Property amenities',
  'Top real estate listings',
  'Real estate agents',
  'Home buying tips',
  'Real estate market trends',
  'Local real estate',
  'Real estate investment',
  'New homes for sale',
  'Commercial real estate',
  'Rentals',
  'Luxury living',
  'Exclusive properties',
  'Gated communities',
  'Prime locations',
  'Investment opportunities',
  'Premium residences',
  'Modern architecture',
  'Green spaces',
  'Waterfront properties',
  'Urban lifestyle',
  'Suburban retreats',
  'Eco-friendly homes',
  'Tech-enabled properties',
  'Smart home features',
  'Integrated communities',
  'Resort-style amenities',
]
export const SINGLE_PROJECT_VIEW_PAGE_TITLE =
  'SuperArea - Luxury Single Project View'
export const SINGLE_PROJECT_PAGE_DESCRIPTION =
  'Explore luxury single project listings in India. Find your dream home with top-notch amenities, high-quality images, and detailed project descriptions.'
export const SINGLE_PROJECT_PAGE_SEO_KEYWORDS = [
  'Luxury single project view',
  'Luxury projects for sale',
  'Luxury real estate projects',
  'Project details',
  'High-quality images',
  'Project amenities',
  'Top real estate projects',
  'Real estate developers',
  'Home buying tips',
  'Real estate market trends',
  'Local real estate projects',
  'Real estate investment',
  'New projects for sale',
  'Commercial real estate projects',
  'Residential rentals',
  'Luxury living',
  'Exclusive properties',
  'Gated communities',
  'Prime locations',
  'Investment opportunities',
  'Premium residences',
  'Modern architecture',
  'Green spaces',
  'Waterfront properties',
  'Urban lifestyle',
  'Suburban retreats',
  'Eco-friendly developments',
  'Tech-enabled homes',
  'Smart home features',
  'Integrated communities',
  'Resort-style amenities',
]

export const WEBSITE_LINK = 'https://www.superarea.ai'
export const TITLE_OG =
  'SuperArea - Your Real Estate Friend | Take Control of Your Real Estate Journey'
export const DESCRIPTION_OG =
  'SuperArea, the leading real estate app, empowers you to take control of your real estate journey. Whether you are searching for your perfect home, selling your current property, or simply exploring the market, MORES offers a seamless experience. Browse a wide range of listings, connect with experienced agents, and navigate the buying or selling process with ease.'
export const OWNER_DETAIL = 'Owner Details'
export const headCells = [
  {
    id: 'firstNamelastName',
    numeric: false,
    disablePadding: false,
    label: 'Full Name',
    sort: false,
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
    sort: false,
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone No.',
    sort: false,
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'City',
    sort: true,
  },
  {
    id: '',
    numeric: false,
    disablePadding: false,
    label: 'Kyc',
    sort: false,
  },

  {},
]

// response message
export const INTERNAL_SERVER_ERROR = 'Internal server error..!!'
export const ADMIN_MASSOCIATE_EDIT_ROUTE = '/admin/edit-m-associate'
export const ADMIN_UNIQUE_LISITNGS_API_ROUTE = '/admin/unique-listings'
export const USER_UNIQUE_LISITNGS_API_ROUTE = '/user/unique-user-listings'
export const AGENT_UNIQUE_LISITNGS_API_ROUTE = '/agent/unique-agent-listings'
export const All_USERS_ROUTE = 'admin/all-users'
export const COUNT_ROUTE = '/admin/show-count'
export const ADMIN_SEARCH_ASSOCIATE = '/admin/searchAssociate'
export const ADMIN_ASSIGN_AGENT_TO_PROPERTY = '/admin/assign-agentToProperty'
export const ADMIN_ASSIGN_AGENT_M_VERIFY =
  '/admin/agent-assignment-Mverification'
export const AGENT_ASSIGNMENT_SUCCESSFULL = 'Agent assigned successfully'
export const AGENT_ASSIGNED = 'Agent Assigned'
export const AGENT_ASSIGNMENT_FAILED = 'agent assignment failed'
export const AGENT_COUNT_ROUTE = '/agent/show-count'
export const SEARCH_BUTTON_TEXT = 'Search'
export const APPROVED_STATUS = 'approved'
export const RESTRICTED_STATUS = 'restricted'
export const PENDING_APPROVAL = 'pending'
export const PENDING_HOVER_AGENT = 'Pending on Agent'
export const PENDING_HOVER_USER = 'Pending on User'
export const RESTRICT = 'Restrict'
export const APPROVE = 'Approve'
export const NO_DATA = 'No Data to Show'
export const OTP_VERIFIED = 'OTP Verified'
export const AGENT_APPROVED_SUCCESSSFULLY = 'Agent Approved Successfully'
export const NOTHING_TEXT = 'nothing'
export const STATUS_REMARKS = 'Kindly enter the remarks first'
export const AGENT_RESTRICTED = 'Agent Restricted Successfully'
export const USER_APPROVED_SUCCESSSFULLY = 'User Approved Successfully'
export const USER_RESTRICTED = 'User Restricted Successfully'
export const CANNOT_COMPLETE_EDIT = 'Cannot Complete Edit Request'
export const AWAITING_APPROVAL = 'Awaiting Approval'
export const PROJECT_UPDATED = 'Project updated successfully'
export const PROJECT_DELETED = 'Project deleted successfully'
export const MISSING_PROJECT_HIGHLIGHTS = 'Project highlights is missing'

// Notification Framework
export const NOTIFICATION_TYPE_RECOMMENDATION = 'recommendation'
export const NOTIFICATION_TYPE_E_KYC = 'e-kyc'
export const NOTIFICATION_TYPE_LISTING_STATUS = 'listing status'
export const NOTIFICATION_TYPE_M_ASSOCIATE = 'm-associate'
export const NOTIFICATION_TYPE_ADMIN_PUSH = 'admin push notification'
export const NOTIFICATION_TYPE_ASSOCIATE_ASSIGNMENT = 'associate assignment'
export const NOTIFICATION_TYPE_USER_STATUS = 'user status'

export const NOTIFICATION_MESSAGE_ASSOCIATE_ASSIGNMENT_USER =
  'has been assigned to sell your property'
export const IDEAL_PROPERTY_MSG = 'it might just be your ideal property!'
export const E_KYC_ASSOCIATE_LABEL =
  'The e-KYC process has been completed for the property'
export const NOTIFICATION_MESSAGE_APPROVAL_STATUS = 'Your profile has been'

export const REJECTED = 'Rejected'
export const M_VERIFIED_LABEL = 'SuperVerified'
export const E_VERIFICATION_LABEL = 'SuperVerification'
export const VERIFICATION_PENDING_LABEL = 'Verification Pending'
export const REVISE = 'revised'
export const APPROVE_SMALL = 'approved'
export const RESTRICTED = 'restricted'
export const RESTRICTED_USER = 'Restricted'
export const MODIFICATION = 'Modification'
export const RESTRICTED_TEXT = 'Your Account is restricted by Admin'
export const CAMERA_ACCESS_DENIED =
  'Camera access is denied. Please enable camera access in your browser settings.'
export const ASSOCIATE_RESTRICTED_TEXT =
  'Dear E-Associate, Your Account is restricted by Admin'
export const REASON_TEXT = 'Reason - '
export const TIME_SENSITIVITY_HIGH = 'high'
export const TIME_SENSITIVITY_LOW = 'low'
export const TIME_SENSITIVITY_MEDIUM = 'medium'
export const REFINE_SEARCH = 'Refine Search'
export const RESET_FILTER = 'Reset Filter'
export const NOTIFICATION_MESSAGE_E_KYC =
  'Congratulations! Your e-KYC verification is successfully completed.'
export const NOTIFICATION_MESSAGE_ASSOCIATE_ASSIGNMENT =
  ' You have been assigned to sell'

export const WEB_LINK = 'Website SEO'
export const LISTING_INFORMATION = 'Listing Information'
export const DESCRIPTION = 'Description'
export const READ_MORE = 'Read More'
export const OUR_BLOG = 'Our Blogs'
export const ADD = 'Add'
export const VIEW_MORE = 'View More'
export const OUR_SERVICE_TEXT = 'Our Services'
export const ABOUT_US = 'About Us'
export const CORE_VALUES = 'Core Values of SuperArea'
export const OUR_SERVICE_DESCRIPTION =
  'Empowering You with Our Diverse Services to Meet Your Unique Demands'
export const OUR_LOCATIONS = 'Our Locations'
export const OUR_LOCATIONS_DESCRIPTION =
  'Extending Our Reach: Availability in Various Locations'
export const WHY_CHOOSE_DES =
  "What sets us apart is taking the time to truly understand our customers' needs and ensuring they consistently receive what they require."
export const WHY_CHOOSE_US = 'Why Choose Us'
export const M_VERIFIED = 'SuperVerified Properties'
// Website Moderation API
export const GET_ALL_DATA = 'admin/moderation-data'
export const EDIT_TESTIMONIAL = 'admin/edit-section'
export const WEB_LINK_UPDATE = 'admin/edit-section'
export const WEBSITE_DESCRIPTION = 'websiteDescription'
export const CREATE_TESTIMONIAL =
  'admin/create/testimonial/6703c74efd24bf6e1ad4d61b'
export const CREATE_BLOG = 'admin/create/blog/6703c74efd24bf6e1ad4d61b'
export const DELETE_TESTIMONIAL = 'admin/delete/moderations'
export const DELETE_BLOG = 'admin/delete/moderations'
export const TESTIMONIAL = 'testimonial'
export const BLOG = 'blog'
export const TESTIMONIAL_TEXT = 'Testimonial'
export const BLOGS = 'Blogs'
export const THREE_DASH = '---'
export const NO_RECOMMENDATIONS_AVAILABLE = 'No recommendations available.'
export const SIDEDASHBOARD_ASSOCIATES = 'Associates'
export const ENQUIRES = 'Enquiries'
export const RECIEVED = 'Received'
export const URL_COPY_TEXT = 'URL Copied'
export const USER_PROFILE = 'Profile'
export const USER_LISTING = 'My Listings'
export const USER_MY_ACTIIVITY = 'My Activities'
export const USER_POST_PROPERTY = 'Post Property'
export const USER_M_ASSOCIATE = 'Associates'
export const USER_ENQUIRES_RECIEVED = 'Enquiries Received'
export const USER_ENQUIRES = 'Enquiries Received'
export const POSTED_ON = 'Posted on'
export const FROM = 'From'
export const RESET_FIELD = 'Reset Fields'
export const AGENT_POST_PROPERTY = 'Post Property'
export const AGENT_PROFILE = 'Profile'
export const AGENT_MY_LISTING = 'My Listings'
export const AGENT_E_VERIFICATION = 'SuperVerification'
export const AGENT_LEADS = 'Leads'
export const AGENT_ASSIGNED_LISTING = 'Assigned Listings'
export const PENDING_ASSIGNMENTS = 'Pending Assignments'
export const CAPITALIZED_ALL = 'All'
export const ALL_LABEL = 'all'
export const UNASSIGNED_LABEL = 'unassigned'
export const ASSIGNED_LABEL = 'assigned'
export const NEARBY_MAP_PREVEIEW = 'Nearby Map Preview'

export const CITY_TOOLTIP_TEXT =
  'Specify the city where the project is located. For example: Noida, Uttar Pradesh'
export const PROJECT_TOOLTIP_TEXT =
  'Provide the name of the project or building. You may also include the location below'
export const LOCALITY_TOOLTIP_TEXT =
  'Enter the locality or address of the project'
export const LOCATION_TOOLTIP_TEXT =
  'This preview displays a nearby map based on the provided location'
export const PROJECT_SIZE_TOOLTIP =
  'Enter the project area, using the specified unit below (up to 5 characters)'
export const ADMIN_TEXT = 'Admin'
export const ENTER_SIX_DIGIT_CODE_TEXT =
  ' Enter the 6 digit code received on your phone number.'

export const SELL_AND_RENT_TEXT = 'List Your Property'
export const LOGIN_NOW = 'Login'
export const SHARE_TEXT = 'Share this URL:'
export const COPY_TEXT = 'Copy'
export const INSTAGRAM_URL_TEXT = 'https://www.instagram.com/share?url='
export const FACEBOOK_URL_TEXT = 'https://www.facebook.com/sharer/sharer.php?u='
export const TWITTER_URL_TEXT = 'https://twitter.com/intent/tweet?url='
export const WHATSAPP_URL_TEXT = 'https://api.whatsapp.com/send?text='
export const EMAIL_SUBJECT = 'Check out this link'
export const EMAIL_BODY = 'I thought you might be interested in this link:'
export const ESTIMATE = 'Estimate'
export const SUPER_ESTIMATE_LABEL = 'eStimate'
export const LABEL_FETCH_ERROR = 'Missing necessary properties for E-estimate'
export const DEFAULT_NEWS_IMAGE =
  'https://images.pexels.com/photos/1481105/pexels-photo-1481105.jpeg?auto=compress&cs=tinysrgb&w=600'
export const DEFAULT_NEWS_DESCRIPTION =
  'Some of these investments could involve sovereign wealth funds such as the Abu Dhabi Investment Authority, Mubadala Investment Co., and ADQ.'
export const NEWS_TEXT = 'News'
export const SELL_RENT_TEXT = 'Sell & Rent'
export const HOME_TEXT = 'Home'
export const UNIT_ERROR = 'Unit Size should not be greater than Project Size'
export const LOADING_TEXT = 'Loading...'
export const DEFAULT_COVER_IMAGE =
  'https://media.istockphoto.com/id/697705574/photo/3d-rendering-of-modern-cozy-house-summer-evening.jpg?s=2048x2048&w=is&k=20&c=3N7_B5OIy_LYLyBBuZZs5Ly87pS8IV_33Xh0XIWoRJE='
export const DEFAULT_RERA_ID = 'More456789345678'
export const POST_PROPERTY_MORES_CARD_TITLE = 'Sell or Rent Your Home With'
export const POST_PROPERTY_MORES_CARD_SUB_TITLE = 'SuperArea Expert'
export const POST_PROPERTY_DIRECT_CARD_TITLE = 'Sell or Rent Your Home'
export const POST_PROPERTY_DIRECT_CARD_SUB_TITLE = 'Directly'
export const PRIVIEW_AND_POST_PROPERTY = 'Post Property'
export const SERVICE_DESCRIPTION = 'Everything you Need '
export const OUR_SERVICE = 'Our Services For You'
export const CITY_NAME = 'City Name'
export const LOCALITY_NAME = 'Locality Name'
export const LOCATION_BUILDING = 'Location/Building'
export const MORES_ADDRESS =
  'Unit No.636-640, 6th Floor Tower C, Bhutani Alphathum, Sector 90, Noida, Gautam Buddha Nagar, 201305'
export const MOBILE_NUMBER = 'Mobile Number'
export const MORES_CONTACT_NUMBER = '+91 99537 67600'
export const MORES_EMAIL = 'sales@mores.in'
export const SERVING_SINCE = 'Serving Since'
export const SERVING_YEAR = '2010'
export const LOCATIONS = 'Locations'
export const OWNER_OVERVIEW = 'Owner Overview'
export const YOUR_INFORMATION = 'Your Information'
export const DEFAULT_IMAGE_ROUTE = '/User_cicrle_light.svg'
export const STEPS_FOR_E_VERIFICATION =
  'Steps to complete your SuperVerification'
export const TOTAL_INTEREST = 'Total Interest for'
export const TOTAL_AMOUNT = 'Total Amount'
export const EMI_PER_MONTH = 'EMI Amount'
export const MONTH_TEXT = 'Month'
export const EMI_NOTE = 'Plan Your Finances With Home Loan EMI Calculator'
export const MONTHS_TEXT = 'Months'
export const SALE_PRICE_TEXT = 'salePrice'
export const PRICE_PER_UNIT = 'pricePerUnit'
export const LOCATION_TOOL_TIP =
  'This is the nearby map preview, based on the location provided by you'
export const MY_PROJECTS = 'myProjects'
export const ALL_PROPERTIES = 'All Properties'
export const ADMIN_SIDE = 'adminSide'
export const AGENT_SIDE = 'agentSide'
export const USER_SIDE = 'userSide'
export const MY_PROPERTIES = 'myProperties'
export const DISPLAY_TEXT = 'Display'
export const PROPERTY_OWNER_TEXT = 'Property Owner'
export const AUTHORIZED_REPRESENTATIVE_TEXT = 'Authorized Representative'
export const PLEASE_SELECT_YOUR_ROLE = 'Please Select Your Role'

export const SUPER_AREA_ASSISTANT_LABEL = 'SuperArea Assistant'
export const VIDEO_SIZE_LIMIT_25MB = 'Max size 25 MB'
export const VIDEO_SIZE_LIMIT_35MB = 'Max size 35 MB'

export const DID_NOT_GET_CODE_TEXT = 'Didn’t get the code yet? '

export const SUPER_ESTIMATE = 'SuperEstimate'
export const SUPER_SCORE = 'SuperScore'
export const SUPER_VERIFICATION = 'SuperVerification'
export const TOAST_MESSAGE_LISTING_APPROVED =
  'Agent assigned and listing approved'
export const TEXT_ASSIGNMENT = 'assignment'

export const TEXT_ASSIGN = 'Assign'
export const TEXT_ASSOCIATE = 'Associates'

// chatbot text
export const HI_TEXT = 'Hi'
export const ENTER_YOUR_MESSAGE_TEXT = 'Enter your message...'
export const CHAT_ICON = 'chat icon'

export const TEXT_RERA_REGISTER = "RERA Registered Properties"
export const TEXT_NEW_GRAND_PROJECT = "Grand Projects"