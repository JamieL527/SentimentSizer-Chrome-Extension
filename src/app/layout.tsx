
import React from 'react'; 
import './globals.css';
export const metadata = {
  title: 'Popup Resizer Chrome Extension',
  description: 'This Chrome extension allows users to resize the popup window and convert various units.',
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

