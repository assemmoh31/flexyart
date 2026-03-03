import React from 'react';

export const SteamPointsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#1A9FFF" fillOpacity="0.2" stroke="#1A9FFF" strokeWidth="2"/>
    <path d="M12 6C12 6 15 9 15 12C15 15 12 18 12 18C12 18 9 15 9 12C9 9 12 6 12 6Z" fill="#1A9FFF"/>
    <circle cx="12" cy="12" r="2" fill="white"/>
  </svg>
);
