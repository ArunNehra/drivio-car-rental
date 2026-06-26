import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Drivio Selfdrive Cars',
  description: 'The page you are looking for does not exist. Return to Drivio Selfdrive Cars to rent affordable SUVs, Sedans, and Hatchbacks.',
};

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '140px', paddingBottom: '80px', backgroundColor: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
        
        {/* Sleek Visual Icon */}
        <div style={{ marginBottom: '32px', position: 'relative', display: 'inline-block' }}>
          <div style={{ background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifycontent: 'center', margin: '0 auto', fontSize: '48px', fontWeight: '800', boxShadow: 'var(--shadow-sm)' }}>
            404
          </div>
          {/* Accent Car silhouette absolute */}
          <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', backgroundColor: 'var(--accent-green)', color: '#ffffff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', boxShadow: 'var(--shadow-md)' }}>
            Drivio 🚗
          </div>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary-blue-dark)', marginBottom: '16px' }}>
          Oops! Page Not Found
        </h1>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.7', marginBottom: '32px' }}>
          The road you are looking for doesn't exist or has been moved. Let's redirect you back to the main route so you can get back on the road!
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            Go to Homepage
          </Link>
          <Link href="/cars" className="btn btn-outline">
            Browse Our Fleet
          </Link>
        </div>

      </div>
    </div>
  );
}
