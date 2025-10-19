export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>TaxEase AI - AI Tax Assistant for Indians</title>
        <meta name="description" content="Smart tax filing assistant for Indian professionals. Save on taxes with Section 80C, 80D, and GST guidance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
