import Link from 'next/link';

export const metadata = {
  title: 'Terms and Conditions | Drivio Selfdrive Cars',
  description: 'Read the terms and conditions for renting a self-drive car with Drivio in Zirakpur, Chandigarh, Mohali, and Tricity.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div style={{ paddingTop: '140px', paddingBottom: '80px', backgroundColor: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <span className="hero-tagline">Legal Agreement</span>
          <h1 style={{ fontSize: '38px', margin: '8px 0 16px', color: 'var(--primary-blue-dark)' }}>Terms & Conditions</h1>
          <p style={{ color: 'var(--text-muted)' }}>Last updated: June 25, 2026</p>
        </div>

        {/* Content Box */}
        <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          
          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>1. Rental Eligibility & Age Limits</h3>
            <p style={{ color: 'var(--text-dark)', fontSize: '15px', lineHeight: '1.7', marginBottom: '8px' }}>
              To rent a self-drive car from Drivio Selfdrive Cars:
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
              <li>The renter must be at least 21 years of age.</li>
              <li>Must possess a valid, original Indian Driving License (DL) for Light Motor Vehicles (LMV). Learners DLs are not accepted.</li>
              <li>International travelers must hold a valid International Driving Permit (IDP) along with their national driving license and visa.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>2. Identity Verification & Documents</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>
              At the time of car pick-up or delivery, the renter must present the Original Driving License, along with a secondary government-issued proof of identity (Aadhaar Card, Passport, or Voter ID). Drivio reserves the right to cancel any booking if original documents are not presented or fail verification.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>3. Refundable Security Deposit</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>
              A refundable security deposit is collected before handing over the vehicle keys. This deposit is held to cover any potential minor damages, traffic violations, or minor fuel shortages. If the vehicle is returned in the same condition as received, the deposit will be refunded in full within 24 hours of return.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>4. Fuel & Mileage Policy</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>
              Drivio rents out vehicles on a "same-to-same" fuel policy. The car will have a certain amount of fuel at hand-over, and the renter must return it with the same level. Shortages will be billed based on market rates plus administrative charges. No refunds are provided for excess fuel returned.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>5. Speed Limits & Safe Driving</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>
              To ensure safety, a maximum speed limit of <strong>80 km/h</strong> (or 100 km/h on designated national expressways) is enforced on all our vehicles. Overspeeding acts will attract monetary penalties. Continued overspeeding may result in automatic engine immobilizer activation and rental termination without refund.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>6. Tolls, Parking & State Entry Taxes</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>
              All toll plaza charges (Fastag deductions), parking tickets, traffic violations, and state border crossing entry taxes are the sole liability of the renter and must be settled immediately at checkpoints or will be deducted from the security deposit.
            </p>
          </section>

          <section style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--primary-blue-dark)' }}>7. Accident, Theft, & Vehicle Damage</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7' }}>
              In the event of an accident or damage, the renter must notify Drivio immediately. The renter's maximum liability is limited to the insurance deductible amount, provided they were driving safely, not under the influence, and adhered to all traffic norms. In case of negligence (drunk driving, driving without a license, rash driving), the renter shall be liable for the full repair cost.
            </p>
          </section>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Have questions regarding these terms?
            </p>
            <Link href="/#contact" className="btn btn-primary">
              Contact Support
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
