'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [pickupLocation, setPickupLocation] = useState('Zirakpur');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnTime, setReturnTime] = useState('10:00');
  
  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCar, setContactCar] = useState('Scorpio-N');
  const [contactMessage, setContactMessage] = useState('');
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(null);

  // Featured Cars (starting from 999 per day)
  const featuredCars = [
    {
      id: 'scorpio-n',
      name: 'Mahindra Scorpio-N',
      type: 'SUV',
      transmission: 'Automatic',
      fuel: 'Diesel',
      seats: '7 Seater',
      price: '4,200',
      badge: 'Popular',
    },
    {
      id: 'thar',
      name: 'Mahindra Thar 4x4',
      type: 'SUV',
      transmission: 'Manual',
      fuel: 'Diesel',
      seats: '4 Seater',
      price: '4,500',
      badge: 'Adventure',
    },
    {
      id: 'swift',
      name: 'Maruti Swift',
      type: 'Hatchback',
      transmission: 'Manual',
      fuel: 'Petrol',
      seats: '5 Seater',
      price: '1,999',
      badge: 'Best Value',
    },
    {
      id: 'ertiga',
      name: 'Maruti Ertiga',
      type: 'MUV',
      transmission: 'Manual',
      fuel: 'CNG/Petrol',
      seats: '7 Seater',
      price: '2,800',
      badge: 'Family',
    },
    {
      id: 'verna',
      name: 'Hyundai Verna',
      type: 'Sedan',
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: '5 Seater',
      price: '2,999',
      badge: 'Premium',
    },
    {
      id: 'baleno',
      name: 'Maruti Baleno',
      type: 'Hatchback',
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: '5 Seater',
      price: '1,999',
      badge: 'City Ride',
    }
  ];

  // Booking submit handler (redirects to WhatsApp with pre-filled text)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) {
      alert('Please select both pick-up and return dates.');
      return;
    }
    
    const text = `Hello Drivio, I would like to book a self-drive car.%0A%0A*Details:*%0A📍 *Location:* ${pickupLocation}%0A📅 *Pick-up Date:* ${pickupDate} at ${pickupTime}%0A📅 *Return Date:* ${returnDate} at ${returnTime}%0A%0APlease let me know the availability and pricing.`;
    window.open(`https://wa.me/917009634784?text=${text}`, '_blank');
  };

  // Helper function to escape HTML special characters to prevent XSS (Cross-Site Scripting)
  const escapeHTML = (str) => {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  // Contact Form Submission (Google Apps Script Integration)
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    // Cooldown verification (60-second cooldown to throttle spammers/bots)
    const now = Date.now();
    if (lastSubmitTime && now - lastSubmitTime < 60000) {
      const secondsLeft = Math.ceil((60000 - (now - lastSubmitTime)) / 1000);
      setFormStatus({
        type: 'error',
        message: `You have submitted an inquiry recently. Please wait ${secondsLeft} seconds before trying again.`
      });
      return;
    }
    
    // 1. Trim all string inputs
    const cleanName = contactName.trim();
    const cleanPhone = contactPhone.trim();
    const cleanEmail = contactEmail.trim();
    const cleanMessage = contactMessage.trim();

    // 2. Validate required fields
    if (!cleanName || !cleanPhone) {
      setFormStatus({ type: 'error', message: 'Name and Phone Number are required.' });
      return;
    }

    // 3. Strict Phone Number Regex Validation (Accepts 10-15 digits, spaces, hyphens, optional + prefix)
    const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
    if (!phoneRegex.test(cleanPhone.replace(/\s+/g, ''))) {
      setFormStatus({ type: 'error', message: 'Please enter a valid 10-digit mobile number.' });
      return;
    }

    // 4. Email format validation (only if email is provided)
    if (cleanEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        setFormStatus({ type: 'error', message: 'Please enter a valid email address.' });
        return;
      }
    }

    setLoading(true);
    setFormStatus({ type: '', message: '' });

    // 5. Escape input strings to sanitize potential script injections
    const payload = {
      name: escapeHTML(cleanName),
      phone: escapeHTML(cleanPhone),
      email: escapeHTML(cleanEmail),
      car: contactCar,
      pickupDate: pickupDate || 'Not specified',
      returnDate: returnDate || 'Not specified',
      message: escapeHTML(cleanMessage),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    try {
      // Send data to our secure server-side API proxy route (hides the Google Sheet URL from the client browser)
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Inquiry submission failed on the server.');
      }

      setLoading(false);
      setFormStatus({
        type: 'success',
        message: 'Your inquiry has been submitted successfully! We will contact you shortly and send a confirmation to your email/phone.'
      });
      setLastSubmitTime(Date.now()); // Set timestamp to start cooldown period
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactMessage('');
    } catch (error) {
      setLoading(false);
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please call us directly at +91-70096-34784 to book.'
      });
    }
  };

  const selectCarForInquiry = (carName) => {
    setContactCar(carName);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CarRentalBusiness',
    'name': 'Drivio Selfdrive Cars',
    'image': 'https://www.drivio.co.in/logo.png',
    'telephone': '+917009634784',
    'email': 'vikas.power@gmail.com',
    'url': 'https://www.drivio.co.in',
    'priceRange': '₹1999 - ₹4500',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '#1, Central Town, Nagla Road',
      'addressLocality': 'Zirakpur',
      'addressRegion': 'Punjab',
      'postalCode': '140603',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '30.6425',
      'longitude': '76.8265'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '00:00',
      'closes': '23:59'
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What documents are required to rent a self-drive car?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'You will need to provide a valid Original Driving License (DL) and an Aadhaar Card or Passport for identity verification. The name on the DL and Identity card must match.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is there a security deposit?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, a fully refundable security deposit is collected before handing over the vehicle keys. This deposit varies based on the car model and is refunded within 24 hours of car return.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Are the cars allowed outside Punjab & Chandigarh?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, all our self-drive cars have All India Permits. You can drive to Himachal Pradesh, Haryana, Delhi, Uttarakhand, or other states. State border entry taxes will be paid directly by the renter at the check posts.'
        }
      }
    ]
  };

  return (
    <>
      {/* Inject JSON-LD Schema Markups for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917009634784?text=Hello%20Drivio%20Selfdrive%20Cars,%20I'm%20interested%20in%20renting%20a%20car."
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book on WhatsApp"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ fill: 'currentColor' }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-tagline">Premium Self Drive Car Rental</span>
            <h1 className="hero-title">
              Drive Freedom.<br />
              Drive <span>Drivio</span>.
            </h1>
            <p className="hero-description">
              Your Car. Your Journey. Explore Zirakpur, Chandigarh, and the Tricity region with total freedom. Premium self-drive cars starting at just **₹1,999/day** with zero hidden charges.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#fleet" className="btn btn-primary">Browse Fleet</a>
              <a href="#about" className="btn btn-outline">Learn More</a>
            </div>
          </div>

          {/* Quick Search Widget */}
          <div className="booking-widget">
            <h3 className="widget-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Book Your Ride Today
            </h3>
            
            <form onSubmit={handleSearchSubmit}>
              <div className="form-group">
                <label className="form-label">Location</label>
                <select 
                  className="form-control"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                >
                  <option value="Zirakpur">Zirakpur (Nagla Road Office)</option>
                  <option value="Chandigarh Airport">Chandigarh International Airport (IXC)</option>
                  <option value="Chandigarh Railway Station">Chandigarh Railway Station</option>
                  <option value="Mohali">Mohali</option>
                  <option value="Panchkula">Panchkula</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Pick-up Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Pick-up Time</label>
                  <input 
                    type="time" 
                    className="form-control"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Return Date</label>
                  <input 
                    type="date" 
                    className="form-control"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Return Time</label>
                  <input 
                    type="time" 
                    className="form-control"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-accent form-submit-btn">
                Check Availability (WhatsApp)
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Features Banner */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container grid-3">
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            </div>
            <h3 className="benefit-title">Wide Range of Cars</h3>
            <p className="benefit-desc">Choose from our fleet of perfectly-maintained hatchbacks, premium sedans, family MUVs, and powerful 4x4 SUVs.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="12" y1="4" x2="12" y2="20"></line></svg>
            </div>
            <h3 className="benefit-title">Best Prices Guaranteed</h3>
            <p className="benefit-desc">Rent self-drive cars in Tricity starting at just ₹1,999/day. Fully transparent pricing, absolutely no hidden charges.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 className="benefit-title">Safe & Reliable</h3>
            <p className="benefit-desc">All vehicles are regularly serviced, thoroughly sanitized, and fully insured for maximum safety and comfort.</p>
          </div>
        </div>
      </section>

      {/* About Section incorporating google business profile details */}
      <section id="about" className="section-padding" style={{ background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <span className="hero-tagline" style={{ backgroundColor: 'var(--accent-green-light)', color: 'var(--accent-green-dark)' }}>About Drivio</span>
          <h2 className="section-title">Your Trusted Selfdrive Partner in Zirakpur & Tricity</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '24px', textAlign: 'justify' }}>
            <strong>Drivio Selfdrive Cars</strong> is a trusted self-drive car rental company based in Zirakpur, offering affordable, reliable, and premium self-drive car rentals for individuals, families, tourists, and corporate travelers. We understand that every journey is unique, which is why we provide a diverse fleet of well-maintained vehicles, including hatchbacks, sedans, SUVs, and premium cars, to suit every travel need and budget. Whether you need a car for a weekend getaway, business trip, airport transfer, or long-distance road trip, Drivio Selfdrive Cars delivers a seamless and hassle-free rental experience.
          </p>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '32px', textAlign: 'justify' }}>
            At Drivio Selfdrive Cars, customer satisfaction is our top priority. Our vehicles are regularly serviced, thoroughly sanitized, and equipped to ensure maximum safety, comfort, and performance. With transparent pricing, easy booking, flexible rental plans, and dedicated customer support, we strive to make self-drive car rental in Zirakpur, Chandigarh, Mohali, Panchkula, and nearby areas convenient and affordable for everyone.
          </p>
          <div className="about-stats-grid">
            <div style={{ padding: '16px', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '28px', color: 'var(--primary-blue)' }}>100%</h4>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sanitized Cars</span>
            </div>
            <div style={{ padding: '16px', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '28px', color: 'var(--primary-blue)' }}>₹1,999</h4>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Starting Price/Day</span>
            </div>
            <div style={{ padding: '16px', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '28px', color: 'var(--primary-blue)' }}>24/7</h4>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Support</span>
            </div>
            <div style={{ padding: '16px', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '28px', color: 'var(--primary-blue)' }}>Tricity</h4>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Wide Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Catalog Section */}
      <section id="fleet" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <span className="hero-tagline">Our Fleet Catalog</span>
              <h2 className="section-title">Select Your Perfect Ride</h2>
            </div>
            <Link href="/cars" className="btn btn-outline">View All Cars</Link>
          </div>

          <div className="grid-3">
            {featuredCars.map((car) => (
              <div key={car.id} className="car-card">
                <div className="car-img-container">
                  <span className="car-badge">{car.badge}</span>
                  {/* Styled Mock Car SVG Graphics */}
                  <svg width="180" height="100" viewBox="0 0 100 50" style={{ opacity: 0.85 }}>
                    <path d="M10 30 L15 18 C17 15, 30 12, 40 12 L70 12 C78 12, 83 18, 86 24 L92 30 C95 33, 93 36, 88 36 L12 36 C8 36, 6 33, 10 30 Z" fill="var(--primary-blue-dark)" />
                    <rect x="20" y="16" width="20" height="8" rx="2" fill="#ffffff" opacity="0.6" />
                    <rect x="45" y="16" width="22" height="8" rx="2" fill="#ffffff" opacity="0.6" />
                    <circle cx="25" cy="38" r="7" fill="#1e293b" />
                    <circle cx="25" cy="38" r="3" fill="#e2e8f0" />
                    <circle cx="75" cy="38" r="7" fill="#1e293b" />
                    <circle cx="75" cy="38" r="3" fill="#e2e8f0" />
                    <path d="M86 24 L94 25" stroke="#72c024" strokeWidth="2" />
                  </svg>
                </div>
                <div className="car-info">
                  <h3 className="car-name">{car.name}</h3>
                  <div className="car-meta-grid">
                    <div className="car-meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                      {car.type}
                    </div>
                    <div className="car-meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {car.transmission}
                    </div>
                    <div className="car-meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                      {car.fuel}
                    </div>
                    <div className="car-meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      {car.seats}
                    </div>
                  </div>
                  <div className="car-price-row">
                    <div>
                      <span className="car-price-label">Daily Price</span>
                      <div className="car-price-value">₹{car.price}<span>/day</span></div>
                    </div>
                    <button 
                      onClick={() => selectCarForInquiry(car.name)} 
                      className="btn btn-primary"
                      style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Contact Lead Form Section */}
      <section id="contact" className="section-padding" style={{ backgroundColor: '#f1f5f9', borderTop: '1px solid var(--border-color)' }}>
        <div className="container contact-section-grid">
          <div className="contact-info-panel">
            <span className="hero-tagline">Send Us An Inquiry</span>
            <h2 className="contact-info-title">Let's Get You on the Road</h2>
            <p className="contact-info-intro">
              Have questions about booking? Fill out this quick inquiry form. Our team will verify car availability and send pricing straight to your email. We also log details directly to our Google Sheet database.
            </p>

            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div className="contact-detail-text">
                <h4>Call or WhatsApp Us</h4>
                <p style={{ fontWeight: '700', color: 'var(--primary-blue-dark)' }}>+91-70096-34784</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div className="contact-detail-text">
                <h4>Email Support</h4>
                <p>vikas.power@gmail.com</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div className="contact-detail-text">
                <h4>Office Location</h4>
                <p>#1, Central Town, Nagla Road, Zirakpur, Punjab - 140603</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h3 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: '700' }}>Inquiry Details</h3>
            
            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    placeholder="10-digit number"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="name@gmail.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Select Car Type</label>
                <select 
                  className="form-control"
                  value={contactCar}
                  onChange={(e) => setContactCar(e.target.value)}
                >
                  <option value="Scorpio-N">Mahindra Scorpio-N (SUV)</option>
                  <option value="Thar">Mahindra Thar 4x4 (SUV)</option>
                  <option value="Swift">Maruti Swift (Hatchback)</option>
                  <option value="Ertiga">Maruti Ertiga (MUV)</option>
                  <option value="Verna">Hyundai Verna (Sedan)</option>
                  <option value="Baleno">Maruti Baleno (Hatchback)</option>
                  <option value="Other">Other Car (Specify in Message)</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Pick-up Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Return/Drop-off Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message / Details</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  placeholder="Please enter details like travel duration, destinations, or specific requirements..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary form-submit-btn"
                disabled={loading}
              >
                {loading ? 'Submitting Inquiry...' : 'Submit Booking Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="hero-tagline">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--primary-blue-dark)' }}>What documents are required to rent a self-drive car?</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                You will need to provide a valid Original Driving License (DL) and an Aadhaar Card or Passport for identity verification. The name on the DL and Identity card must match.
              </p>
            </div>
            
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--primary-blue-dark)' }}>Is there a security deposit?</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                Yes, a fully refundable security deposit is collected before handing over the vehicle keys. This deposit varies based on the car model and is refunded within 24 hours of car return.
              </p>
            </div>

            <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--primary-blue-dark)' }}>Are the cars allowed outside Punjab & Chandigarh?</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                Yes, all our self-drive cars have All India Permits. You can drive to Himachal Pradesh, Haryana, Delhi, Uttarakhand, or other states. State border entry taxes will be paid directly by the renter at the check posts.
              </p>
            </div>

            <div style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--primary-blue-dark)' }}>Is fuel included in the rental price?</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                Our standard rates are without fuel. We provide the vehicle with some fuel, and you can return it at the same level.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
