'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FleetPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');

  const cars = [
    {
      id: 'scorpio-n',
      name: 'Mahindra Scorpio-N',
      type: 'SUV',
      transmission: 'Automatic',
      fuel: 'Diesel',
      seats: '7 Seater',
      price: '4200',
      tagline: 'Big, bold and ready for anything. Perfect for family trips to hills.',
      features: ['Rear AC', 'Touch Screen', 'Airbags', 'GPS Tracker'],
    },
    {
      id: 'thar',
      name: 'Mahindra Thar 4x4',
      type: 'SUV',
      transmission: 'Manual',
      fuel: 'Diesel',
      seats: '4 Seater',
      price: '4500',
      tagline: 'Experience the pure offroad freedom. Perfect for mountain drives.',
      features: ['4x4 Drive', 'Convertible Hood', 'Traction Control', 'Bluetooth'],
    },
    {
      id: 'swift',
      name: 'Maruti Swift',
      type: 'Hatchback',
      transmission: 'Manual',
      fuel: 'Petrol',
      seats: '5 Seater',
      price: '1999',
      tagline: 'Fuel-efficient, easy to park, and smooth for city travels.',
      features: ['Great Mileage', 'Power Steering', 'USB charger', 'Bluetooth'],
    },
    {
      id: 'ertiga',
      name: 'Maruti Ertiga',
      type: 'MUV',
      transmission: 'Manual',
      fuel: 'CNG/Petrol',
      seats: '7 Seater',
      price: '2800',
      tagline: 'Spacious 7-seater for group travels and comfortable luggage space.',
      features: ['Dual AC', 'Rear Sensors', 'Foldable Seats', 'Ample Legroom'],
    },
    {
      id: 'verna',
      name: 'Hyundai Verna',
      type: 'Sedan',
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: '5 Seater',
      price: '2999',
      tagline: 'Premium design and luxurious comfort for corporate or leisure rides.',
      features: ['Sunroof', 'Leather Seats', 'Cruise Control', 'Push Start'],
    },
    {
      id: 'baleno',
      name: 'Maruti Baleno',
      type: 'Hatchback',
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: '5 Seater',
      price: '1999',
      tagline: 'Premium hatchback offering smooth CVT automatic transmission.',
      features: ['Keyless Entry', 'LED Projector Lamps', 'Climate Control', 'Rear Camera'],
    }
  ];

  // Filtering Logic
  const filteredCars = cars.filter(car => {
    const typeMatch = selectedType === 'All' || car.type === selectedType;
    const transMatch = selectedTransmission === 'All' || car.transmission.includes(selectedTransmission);
    const fuelMatch = selectedFuel === 'All' || car.fuel.includes(selectedFuel);
    return typeMatch && transMatch && fuelMatch;
  });

  const getWhatsAppLink = (carName) => {
    const text = `Hello Drivio, I am interested in renting the self-drive *${carName}* starting from Zirakpur. Please share availability details.`;
    return `https://wa.me/917009634784?text=${encodeURIComponent(text)}`;
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', backgroundColor: '#f8fafc' }}>
      <div className="container">
        
        {/* Page Title & Breadcrumb */}
        <div style={{ marginBottom: '40px' }}>
          <span className="hero-tagline">Tricity Rental Fleet</span>
          <h1 style={{ fontSize: '38px', margin: '8px 0' }}>Explore Our Self-Drive Cars</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Book premium, well-maintained self-drive cars in Zirakpur, Chandigarh, Mohali, and Panchkula. No hidden fees.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="catalog-layout">
          
          {/* Filters Sidebar */}
          <aside className="filter-sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Filters</h3>
              <button 
                onClick={() => { setSelectedType('All'); setSelectedTransmission('All'); setSelectedFuel('All'); }}
                style={{ fontSize: '12px', color: 'var(--primary-blue)', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600' }}
              >
                Clear All
              </button>
            </div>

            {/* Segment / Car Type Filter */}
            <div className="filter-section">
              <h4 className="filter-title">Car Segment</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['All', 'Hatchback', 'Sedan', 'SUV', 'MUV'].map((type) => (
                  <label key={type} className="filter-option">
                    <input 
                      type="radio" 
                      name="carType"
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Transmission Filter */}
            <div className="filter-section">
              <h4 className="filter-title">Transmission</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['All', 'Manual', 'Automatic'].map((trans) => (
                  <label key={trans} className="filter-option">
                    <input 
                      type="radio" 
                      name="transmission"
                      checked={selectedTransmission === trans}
                      onChange={() => setSelectedTransmission(trans)}
                    />
                    {trans}
                  </label>
                ))}
              </div>
            </div>

            {/* Fuel Filter */}
            <div className="filter-section">
              <h4 className="filter-title">Fuel Type</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['All', 'Petrol', 'Diesel', 'CNG'].map((fuel) => (
                  <label key={fuel} className="filter-option">
                    <input 
                      type="radio" 
                      name="fuel"
                      checked={selectedFuel === fuel}
                      onChange={() => setSelectedFuel(fuel)}
                    />
                    {fuel}
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Contact Help Box */}
            <div style={{ backgroundColor: 'var(--primary-blue-light)', padding: '20px', borderRadius: '12px', marginTop: '24px', border: '1px dashed var(--primary-blue)' }}>
              <h4 style={{ color: 'var(--primary-blue-dark)', fontSize: '15px', marginBottom: '8px', fontWeight: '700' }}>Need Help Booking?</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>Call us directly. We will confirm booking within 5 minutes.</p>
              <a href="tel:+917009634784" style={{ display: 'block', fontWeight: '800', color: 'var(--primary-blue)', fontSize: '15px' }}>+91-70096-34784</a>
            </div>
          </aside>

          {/* Catalog Listing */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>
                Showing <strong>{filteredCars.length}</strong> vehicles matching your preferences
              </span>
            </div>

            {filteredCars.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center', background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ marginBottom: '8px' }}>No Cars Found</h3>
                <p style={{ color: 'var(--text-muted)' }}>Try modifying your filter selections to find available vehicles.</p>
                <button 
                  onClick={() => { setSelectedType('All'); setSelectedTransmission('All'); setSelectedFuel('All'); }}
                  className="btn btn-primary" 
                  style={{ marginTop: '16px' }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {filteredCars.map((car) => (
                  <div key={car.id} className="car-item-card">
                    
                    {/* Visual Car Image */}
                    <div style={{ background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifycontent: 'center', padding: '20px', position: 'relative' }}>
                      <svg width="100%" height="80" viewBox="0 0 100 50">
                        <path d="M10 30 L15 18 C17 15, 30 12, 40 12 L70 12 C78 12, 83 18, 86 24 L92 30 C95 33, 93 36, 88 36 L12 36 C8 36, 6 33, 10 30 Z" fill="var(--primary-blue)" />
                        <rect x="20" y="16" width="20" height="8" rx="2" fill="#ffffff" opacity="0.6" />
                        <rect x="45" y="16" width="22" height="8" rx="2" fill="#ffffff" opacity="0.6" />
                        <circle cx="25" cy="38" r="7" fill="#1e293b" />
                        <circle cx="25" cy="38" r="3" fill="#e2e8f0" />
                        <circle cx="75" cy="38" r="7" fill="#1e293b" />
                        <circle cx="75" cy="38" r="3" fill="#e2e8f0" />
                        <path d="M86 24 L94 25" stroke="#72c024" strokeWidth="2" />
                      </svg>
                      <span className="car-badge" style={{ top: '12px', left: '12px' }}>{car.type}</span>
                    </div>

                    {/* Car specs & details */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h3 style={{ fontSize: '22px', fontWeight: '700' }}>{car.name}</h3>
                          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-blue-dark)' }}>
                            ₹{car.price} <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>/day</span>
                          </div>
                        </div>
                        
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '8px 0 16px' }}>{car.tagline}</p>
                        
                        {/* Specs grid */}
                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '4px' }}>
                            ⚙️ {car.transmission}
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '4px' }}>
                            ⛽ {car.fuel}
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '4px' }}>
                            👥 {car.seats}
                          </span>
                        </div>

                        {/* Features bullet points */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          {car.features.map((feature, i) => (
                            <span key={i} style={{ fontSize: '12px', color: '#10b981', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              ✓ {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTAs */}
                      <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--border-color)', marginTop: '16px', paddingTop: '16px' }}>
                        <Link href={`/cars/${car.id}`} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>
                          View Details
                        </Link>
                        <a 
                          href={getWhatsAppLink(car.name)} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-accent" 
                          style={{ padding: '8px 16px', fontSize: '13px' }}
                        >
                          Book via WhatsApp
                        </a>
                        <Link 
                          href={`/#contact`} 
                          className="btn btn-primary" 
                          style={{ padding: '8px 16px', fontSize: '13px' }}
                        >
                          Send Inquiry Form
                        </Link>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
