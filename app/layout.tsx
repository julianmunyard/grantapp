import './globals.css'

export const metadata = {
  title: 'Grant Page 1',
  description: 'A music site by Julian Munyard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
