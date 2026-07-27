// src/lib/navCategories.js
// Single source of truth for the category-first "Products" navigation,
// shared by the desktop nav (Navigation.js) and the mobile drawer (MobileMenuDrawer.js).
export const NAV_CATEGORIES = [
  { label: 'Audio Conferencing', slug: 'audio-conferencing' },
  { label: 'Video Conferencing', slug: 'video-conferencing' },
  { label: 'Interactive Displays', slug: 'interactive-displays' },
  { label: 'Professional Headsets', slug: 'professional-headsets' },
  { label: 'Webcams', slug: 'webcams' },
  { label: 'Meeting Room Solutions', slug: 'meeting-room-solutions' },
  { label: 'Controllers', slug: 'controllers' },
  { label: 'Room Booking', slug: 'room-booking' },
  { label: 'Digital Signage', slug: 'digital-signage' },
  { label: 'Networking', slug: 'networking' },
  { label: 'Storage', slug: 'storage' },
  { label: 'Security', slug: 'security' },
].map((item) => ({ ...item, href: `/products/category/${item.slug}` }));
