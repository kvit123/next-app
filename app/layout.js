require('dotenv').config();

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>test layout
            {children}</body>
      </html>
    )
  }