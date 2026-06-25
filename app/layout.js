import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Drivio Selfdrive Cars | Self Drive Car Rental in Zirakpur, Chandigarh & Tricity',
  description: 'Rent affordable, reliable, and premium self-drive cars in Zirakpur, Chandigarh, Mohali, and Panchkula. Diverse fleet including SUVs, Sedans, and Hatchbacks starting at just ₹999/day. Drive freedom with Drivio.',
  keywords: 'self drive car rental zirakpur, self drive cars chandigarh, rent a car mohali, car rental panchkula, drivio selfdrive cars, tricity car hire, car rental starting 999, book self drive car',
  metadataBase: new URL('https://www.drivio.co.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Drivio Selfdrive Cars | Self Drive Car Rental Zirakpur & Chandigarh',
    description: 'Affordable, reliable, and premium self-drive car rentals in the Tricity region starting from ₹999/day. Choose from hatchbacks, sedans, SUVs, and premium cars.',
    url: 'https://www.drivio.co.in',
    siteName: 'Drivio Selfdrive Cars',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drivio Selfdrive Cars | Self Drive Car Rental Zirakpur & Chandigarh',
    description: 'Affordable, reliable, and premium self-drive car rentals in the Tricity region starting from ₹999/day.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* Navigation Header */}
        <header className="header">
          <div className="container nav-container">
            <Link href="/" className="logo-wrapper">
              <img 
                src="/logo.svg" 
                alt="Drivio Self Drive Cars Logo" 
                style={{ height: '78px', width: 'auto', display: 'block' }} 
              />
            </Link>
            
            <nav className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/cars" className="nav-link">Our Fleet</Link>
              <Link href="/#about" className="nav-link">About Us</Link>
              <Link href="/#contact" className="nav-link">Contact</Link>
            </nav>

            <div className="nav-cta">
              <a href="tel:+917009634784" className="phone-callout">
                <span className="phone-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </span>
                <span>+91-70096-34784</span>
              </a>
              <Link href="/cars" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                Book Now
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>

        {/* Global Footer */}
        <footer className="footer">
          <div className="container footer-grid">
            <div className="footer-col">
              <div style={{ backgroundColor: '#ffffff', padding: '8px 16px', borderRadius: '8px', display: 'inline-block', marginBottom: '16px' }}>
                <img 
                  src="/logo.svg" 
                  alt="Drivio Self Drive Cars Logo" 
                  style={{ height: '36px', width: 'auto', display: 'block' }} 
                />
              </div>
              <p className="footer-description">
                Drivio Selfdrive Cars is a trusted self-drive car rental company based in Zirakpur, offering affordable, reliable, and premium self-drive car rentals across the Tricity region.
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <a href="https://wa.me/917009634784" target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{ padding: '8px 16px', fontSize: '13px' }}>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/cars">Our Fleet</Link></li>
                <li><Link href="/#about">About Our Service</Link></li>
                <li><Link href="/#faq">Frequently Asked Questions</Link></li>
                <li><Link href="/#contact">Contact Support</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Locations Served</h3>
              <ul className="footer-links">
                <li><Link href="/cars?location=zirakpur">Self Drive Cars Zirakpur</Link></li>
                <li><Link href="/cars?location=chandigarh">Self Drive Cars Chandigarh</Link></li>
                <li><Link href="/cars?location=mohali">Self Drive Cars Mohali</Link></li>
                <li><Link href="/cars?location=panchkula">Self Drive Cars Panchkula</Link></li>
                <li><Link href="/cars?location=airport">Chandigarh Airport (IXC)</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Contact Info</h3>
              <ul className="footer-links" style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.8' }}>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Address:</strong><br />
                  #1, Central Town, Nagla Road, Zirakpur, Punjab - 140603
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Mobile:</strong><br />
                  <a href="tel:+917009634784" style={{ color: '#ffffff' }}>+91-70096-34784</a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Email:</strong><br />
                  <a href="mailto:vikas.power@gmail.com" style={{ color: '#ffffff' }}>vikas.power@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="container footer-bottom">
            <p>&copy; {new Date().getFullYear()} Drivio Selfdrive Cars. All Rights Reserved. Designed for premium self-drive experience.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="/terms">Terms & Conditions</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
