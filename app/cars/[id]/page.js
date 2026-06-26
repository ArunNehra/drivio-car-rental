import Link from 'next/link';
import { notFound } from 'next/navigation';

// Fleet details dictionary
const carsDb = {
  'scorpio-n': {
    name: 'Mahindra Scorpio-N',
    type: 'SUV',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: '7 Seater',
    price: '4200',
    brand: 'Mahindra',
    description: 'The Mahindra Scorpio-N is a dominant force on Indian roads. Known for its imposing design, high ground clearance, and robust performance, it is the perfect self-drive vehicle for long trips, highway cruising, or visiting nearby hill stations like Shimla, Kasauli, or Manali. Featuring a spacious 7-seater layout, excellent suspension, and modern touch screen infotainment, the Scorpio-N ensures that you travel in maximum safety and style.',
    features: ['High Ground Clearance', 'Dual Zone Climate Control', 'GPS Navigation System', 'Reverse Parking Sensors & Camera', 'Dual Airbags', 'Roof Rails & Alloy Wheels'],
    specDetails: {
      engine: '2.2L mHawk Diesel',
      power: '172 bhp',
      mileage: '12-14 kmpl',
      luggage: '3 Large Bags',
    }
  },
  'thar': {
    name: 'Mahindra Thar 4x4',
    type: 'SUV',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: '4 Seater',
    price: '4500',
    brand: 'Mahindra',
    description: 'Rent the iconic Mahindra Thar 4x4 for your next adventure trip. Perfectly suited for off-roading, mountain explorations, or stylish weekend escapes in the Tricity area. With its authentic Jeep-like heritage, high-riding stance, and 4-wheel drive system, it can conquer any terrain. Equipped with rugged tires, roll cage protection, and advanced ESP safety, this car is the ultimate statement of freedom.',
    features: ['4x4 Drive Train', 'Rugged All-Terrain Tires', 'Removable Roof Options', 'Roll Cage Safety', 'Heavy-Duty Suspension', 'Apple CarPlay & Android Auto'],
    specDetails: {
      engine: '2.0L mStallion/2.2L mHawk',
      power: '150 bhp',
      mileage: '10-12 kmpl',
      luggage: '2 Cabin Bags',
    }
  },
  'swift': {
    name: 'Maruti Swift',
    type: 'Hatchback',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: '5 Seater',
    price: '1999',
    brand: 'Maruti Suzuki',
    description: 'The Maruti Swift is India’s favorite hatchback and a perfect choice for budget-conscious self-drive car hire in Zirakpur and Chandigarh. Extremely nimble in city traffic, incredibly fuel-efficient, and easy to park in crowded markets. The Swift offers a comfortable ride for up to 5 passengers, decent boot space for weekend shopping, and modern comforts like power windows and bluetooth audio integration.',
    features: ['Keyless Entry', 'Excellent Fuel Economy', 'SmartPlay Infotainment', 'Steering Mounted Controls', 'Dual Airbags & ABS', 'Compact Footprint'],
    specDetails: {
      engine: '1.2L DualJet Petrol',
      power: '89 bhp',
      mileage: '18-20 kmpl',
      luggage: '1 Large + 1 Small Bag',
    }
  },
  'ertiga': {
    name: 'Maruti Ertiga',
    type: 'MUV',
    transmission: 'Manual',
    fuel: 'CNG/Petrol',
    seats: '7 Seater',
    price: '2800',
    brand: 'Maruti Suzuki',
    description: 'If you are planning a family vacation, a corporate team commute, or a group trip from Zirakpur to nearby areas, the Maruti Ertiga is the ideal choice. It offers a spacious 7-seater layout with adjustable mid and rear seats, rear AC vents for uniform cooling, and dual fuel options (Petrol/CNG) for highly economical operations. Drive with safety and flexibility on every mile.',
    features: ['Spacious 3-Row Seating', 'Roof-Mounted Rear AC Vents', 'Foldable 3rd Row Seats', 'Smart Hybrid Fuel Technology', 'Reverse Parking Sensors', 'Touch Screen Audio System'],
    specDetails: {
      engine: '1.5L K15C Smart Hybrid',
      power: '102 bhp',
      mileage: '15-20 kmpl',
      luggage: '2 Large Bags (Seats folded)',
    }
  },
  'verna': {
    name: 'Hyundai Verna',
    type: 'Sedan',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: '5 Seater',
    price: '2999',
    brand: 'Hyundai',
    description: 'Rent the sleek, luxurious Hyundai Verna self-drive sedan for a premium travel experience. Perfect for business meetings, airport dropoffs at IXC Chandigarh Airport, or family ceremonies. The Verna stands out with its futuristic design, leatherette upholstery, electric sunroof, and powerful engine paired with a super-smooth automatic transmission.',
    features: ['Electric Sunroof', 'Ventilated Front Seats', 'Premium Audio System', 'Wireless Mobile Charging', 'Electronic Stability Control', 'Automatic Climate Control'],
    specDetails: {
      engine: '1.5L MPi Petrol',
      power: '113 bhp',
      mileage: '14-16 kmpl',
      luggage: '3 Large Bags',
    }
  },
  'baleno': {
    name: 'Maruti Baleno',
    type: 'Hatchback',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: '5 Seater',
    price: '1999',
    brand: 'Maruti Suzuki',
    description: 'The Maruti Baleno is a premium hatchback offering premium aesthetics, sophisticated cabin space, and advanced tech. Paired with a stress-free automatic transmission, it is the perfect companion for daily office commuting, running errands, or long drives around Mohali, Panchkula, and Chandigarh. Highly praised for its segment-leading legroom and soft suspension.',
    features: ['Automatic AMT Gearbox', '360 View Camera (Top Spec)', 'Head-Up Display', 'Premium LED DRL Headlights', 'Rear AC Vents', 'Excellent Rear Cabin Space'],
    specDetails: {
      engine: '1.2L K-Series Petrol',
      power: '88 bhp',
      mileage: '17-19 kmpl',
      luggage: '2 Medium Bags',
    }
  }
};

// Dynamic SEO Metadata Generator for Car details
export async function generateMetadata({ params }) {
  const car = carsDb[params.id];
  if (!car) {
    return {
      title: 'Car Details Not Found | Drivio Selfdrive Cars',
    };
  }
  return {
    title: `Rent ${car.name} Self Drive Car in Zirakpur & Chandigarh | Drivio`,
    description: `Rent a premium self-drive ${car.name} (${car.transmission}, ${car.fuel}) in Zirakpur, Chandigarh, Mohali, and Panchkula starting from ₹${car.price}/day. 100% sanitized and insured.`,
    alternates: {
      canonical: `/cars/${params.id}`,
    },
    openGraph: {
      title: `Rent ${car.name} Self Drive Car in Zirakpur & Chandigarh | Drivio`,
      description: `Premium self-drive ${car.name} starting from ₹${car.price}/day in Tricity. Insured, clean, and flexible rental plans.`,
      url: `https://www.drivio.co.in/cars/${params.id}`,
    }
  };
}

// Generates static links for Next.js to pre-render dynamic paths
export async function generateStaticParams() {
  return [
    { id: 'scorpio-n' },
    { id: 'thar' },
    { id: 'swift' },
    { id: 'ertiga' },
    { id: 'verna' },
    { id: 'baleno' }
  ];
}

export default function CarDetailPage({ params }) {
  const { id } = params;
  const car = carsDb[id];

  if (!car) {
    notFound();
  }

  // Create JSON-LD schema dynamically for SEO Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': `${car.name} Self Drive Car Rental`,
    'image': `https://www.drivio.co.in/cars/${id}.jpg`,
    'description': `Book self-drive ${car.name} in Zirakpur, Chandigarh and Mohali. Affordable rentals starting from ₹${car.price}/day. Insured, cleaned and sanitized.`,
    'brand': {
      '@type': 'Brand',
      'name': car.brand
    },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': car.price,
      'priceValidUntil': '2027-12-31',
      'itemCondition': 'https://schema.org/UsedCondition',
      'availability': 'https://schema.org/InStock',
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'price': car.price,
        'priceCurrency': 'INR',
        'unitText': 'DAY'
      },
      'seller': {
        '@type': 'LocalBusiness',
        'name': 'Drivio Selfdrive Cars',
        'image': 'https://www.drivio.co.in/logo.png',
        'telephone': '+917009634784',
        'email': 'vikas.power@gmail.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '#1, Central Town, Nagla Road',
          'addressLocality': 'Zirakpur',
          'addressRegion': 'Punjab',
          'postalCode': '140603',
          'addressCountry': 'IN'
        }
      }
    }
  };

  const getWhatsAppLink = () => {
    const text = `Hello Drivio, I want to book a self-drive *${car.name}* starting from Zirakpur. Please share details.`;
    return `https://wa.me/917009634784?text=${encodeURIComponent(text)}`;
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', backgroundColor: '#f8fafc' }}>
      
      {/* Inject JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container">
        
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--text-muted)' }}>
          <Link href="/" style={{ color: 'var(--primary-blue)', fontWeight: '600' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href="/cars" style={{ color: 'var(--primary-blue)', fontWeight: '600' }}>Cars</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>{car.name}</span>
        </div>

        {/* Page H1 Title */}
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px', color: 'var(--primary-blue-dark)' }}>
          {car.name} Self Drive Car Rental
        </h1>

        {/* Details Grid */}
        <div className="detail-grid">
          
          {/* Left Column: Media & Specs */}
          <div>
            <div className="detail-gallery">
              <svg width="100%" height="240" viewBox="0 0 100 50">
                <path d="M10 30 L15 18 C17 15, 30 12, 40 12 L70 12 C78 12, 83 18, 86 24 L92 30 C95 33, 93 36, 88 36 L12 36 C8 36, 6 33, 10 30 Z" fill="var(--primary-blue-dark)" />
                <rect x="20" y="16" width="20" height="8" rx="2" fill="#ffffff" opacity="0.6" />
                <rect x="45" y="16" width="22" height="8" rx="2" fill="#ffffff" opacity="0.6" />
                <circle cx="25" cy="38" r="7" fill="#1e293b" />
                <circle cx="25" cy="38" r="3" fill="#e2e8f0" />
                <circle cx="75" cy="38" r="7" fill="#1e293b" />
                <circle cx="75" cy="38" r="3" fill="#e2e8f0" />
                <path d="M86 24 L94 25" stroke="#72c024" strokeWidth="3" />
              </svg>
            </div>

            {/* Spec details grid */}
            <div className="detail-specs-grid">
              <div className="detail-spec-box">
                <span className="detail-spec-label">Engine Capacity</span>
                <span className="detail-spec-val">{car.specDetails.engine}</span>
              </div>
              <div className="detail-spec-box">
                <span className="detail-spec-label">Max Power</span>
                <span className="detail-spec-val">{car.specDetails.power}</span>
              </div>
              <div className="detail-spec-box">
                <span className="detail-spec-label">Avg Mileage</span>
                <span className="detail-spec-val">{car.specDetails.mileage}</span>
              </div>
              <div className="detail-spec-box">
                <span className="detail-spec-label">Luggage Space</span>
                <span className="detail-spec-val">{car.specDetails.luggage}</span>
              </div>
              <div className="detail-spec-box">
                <span className="detail-spec-label">Transmission</span>
                <span className="detail-spec-val">{car.transmission}</span>
              </div>
              <div className="detail-spec-box">
                <span className="detail-spec-label">Seating Capacity</span>
                <span className="detail-spec-val">{car.seats}</span>
              </div>
            </div>

            {/* Description */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Vehicle Overview</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8' }}>{car.description}</p>
            </div>

            {/* Features Checklist */}
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Included Features</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {car.features.map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' }}>
                    <span style={{ color: 'var(--accent-green-dark)', fontWeight: 'bold' }}>✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Inquiry Card */}
          <aside>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '32px', position: 'sticky', top: '100px', boxShadow: 'var(--shadow-md)' }}>
              
              <span className="hero-tagline" style={{ marginBottom: '12px' }}>Rental Rates</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>Self-Drive Price</span>
                <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary-blue-dark)' }}>
                  ₹{car.price} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>/day</span>
                </div>
              </div>

              {/* Safety Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '24px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '16px 0' }}>
                <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-muted)', alignItems: 'center' }}>
                  <span>🛡️</span>
                  <span>Fully insured vehicle with comprehensive coverage</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-muted)', alignItems: 'center' }}>
                  <span>🧼</span>
                  <span>Deep sanitized and washed before delivery</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-muted)', alignItems: 'center' }}>
                  <span>🕛</span>
                  <span>Flexible rental plans (Daily/Weekly/Monthly)</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-accent" 
                  style={{ width: '100%', padding: '14px' }}
                >
                  ⚡ Instant Booking on WhatsApp
                </a>
                <Link 
                  href="/#contact" 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '14px' }}
                >
                  ✉️ Send Email Inquiry
                </Link>
              </div>

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Got questions? Call us at <a href="tel:+917009634784" style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>+91-70096-34784</a>
                </span>
              </div>

            </div>
          </aside>

        </div>

      </div>
    </div>
  );
}
