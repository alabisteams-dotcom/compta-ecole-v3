export const metadata = {
  title: 'Compta Ecole',
  description: 'Application de gestion comptable',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
