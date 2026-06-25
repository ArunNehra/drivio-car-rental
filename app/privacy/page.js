import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Drivio Selfdrive Cars',
  description: 'Understand how Drivio Selfdrive Cars collects, secures, and handles your booking inquiries and personal data.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: '140px', paddingBottom: '80px', backgroundColor: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <span className="hero-tagline">Privacy Center</span>
          <h1 style={{ fontSize: '38px', margin: '8px 0 16px', color: 'var(--primary-blue-dark)' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--text-muted)' }}>Last updated: June 25, 2026</p>
        </div>

        {/* Content Box */}
        <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          
          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>1. Introduction</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>
              At Drivio Selfdrive Cars (www.drivio.co.in), we respect your privacy and are committed to protecting the personal data you share with us. This policy explains what information we collect, how we secure it, and how we use it during your interactions with our website.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>2. Information We Collect</h3>
            <p style={{ color: 'var(--text-dark)', fontSize: '15px', lineHeight: '1.7', marginBottom: '8px' }}>
              We collect information directly from you when you submit a Booking Inquiry Form on our website:
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
              <li><strong>Contact Details:</strong> Full Name, Mobile Number, and Email Address.</li>
              <li><strong>Inquiry Parameters:</strong> Car Selection, Pick-up/Return Dates, and optional Message details.</li>
              <li><strong>Device Info:</strong> IP address and basic web browser user agent tags (logged automatically by Vercel hosting platform).</li>
            </ul>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>3. How We Use Your Data</h3>
            <p style={{ color: 'var(--text-dark)', fontSize: '15px', lineHeight: '1.7', marginBottom: '8px' }}>
              The information we collect is strictly used for:
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
              <li>Verifying car availability and sending rental price quotations.</li>
              <li>Contacting you via WhatsApp, Call, or Email to complete booking requests.</li>
              <li>Improving our fleet services and client interactions.</li>
              <li>We **never** sell, rent, or trade your personal information with third-party marketing companies.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>4. Data Storage & Security</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>
              When you submit our contact form, your details are instantly posted via secure HTTPS protocols directly to our private, password-protected **Google Sheet database** (using Google Apps Script webhooks) and emailed securely to our support desk (`vikas.power@gmail.com`). We implement standard security configurations to prevent unauthorized access to these storage frameworks.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>5. Your Rights & Data Erasure</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>
              If you have submitted inquiries to Drivio Selfdrive Cars and wish to inspect, edit, or delete your contact records from our Google Sheets ledger, you can send an email request directly to **vikas.power@gmail.com**. We will purge your details within 48 business hours.
            </p>
          </section>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              By using our website, you consent to the terms of this Privacy Policy.
            </p>
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
