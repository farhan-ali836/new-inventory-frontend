// Business Configuration - Centralized business information
export const BUSINESS_CONFIG = {
  name: import.meta.env.VITE_BUSINESS_NAME || 'بَیتَ الْبَرَکَہ',
  nameEn: import.meta.env.VITE_BUSINESS_NAME_EN || 'Baitul Barakah',
  businessId: import.meta.env.VITE_BUSINESS_ID || 'BU-190',
  phone: import.meta.env.VITE_BUSINESS_PHONE || '03033863752',
  email: import.meta.env.VITE_BUSINESS_EMAIL || 'info@baitulbarakah.com',
  website: import.meta.env.VITE_BUSINESS_WEBSITE || 'www.baitulbarakah.com',
  address: import.meta.env.VITE_BUSINESS_ADDRESS || 'خان پور روڈ، نزد بینک الحبیب، فیروزہ، تحصیل خان پور، ضلع رحیم یار خان',
  addressEn: import.meta.env.VITE_BUSINESS_ADDRESS_EN || 'Khanpur Road, Near Bank Al Habib, Farooqa, Tehsil Khanpur, District Rahim Yar Khan',
  
  // Invoice/Bill settings
  billPrefix: import.meta.env.VITE_BILL_PREFIX || 'BB',
  bookPOPrefix: import.meta.env.VITE_BOOK_PO_PREFIX || 'BB',
  
  // Support info
  supportPhone: import.meta.env.VITE_SUPPORT_PHONE || '03033863752',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'info@baitulbarakah.com',
  
  // Notification settings
  notificationTag: import.meta.env.VITE_NOTIFICATION_TAG || 'baitulbarakah',
  
  // Colors and branding
  primaryColor: import.meta.env.VITE_PRIMARY_COLOR || '#3b82f6',
  secondaryColor: import.meta.env.VITE_SECONDARY_COLOR || '#1e40af',
};

export default BUSINESS_CONFIG;
