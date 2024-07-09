
import React from 'react'; 
import './globals.css';
export const metadata = {
  title: 'My Favorite Websites Chrome Extension',
  description: 'This Chrome extension allows users to resize the popup window and manage quick access to favorite websites.',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

