export default function Privacy() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-primary text-sm font-bold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="text-4xl font-extrabold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: 1 January 2025</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10">

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">
              Carpet Cleaning Ltd ("Carpet Cleaning", "we", "us") is the data controller responsible for the personal
              information we collect through our website and services. We are committed to protecting your privacy
              and handling your data in an open and transparent manner in accordance with the UK General Data
              Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. What Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We collect the following categories of personal data:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li><span className="font-semibold text-foreground">Contact details:</span> Your name, email address, and phone number when you make a booking or enquiry.</li>
              <li><span className="font-semibold text-foreground">Address information:</span> Your property address and postcode for service delivery.</li>
              <li><span className="font-semibold text-foreground">Booking information:</span> Details of the services you book, dates, times, and any special instructions.</li>
              <li><span className="font-semibold text-foreground">Technical data:</span> IP address, browser type, and pages visited when you use our website (collected via cookies).</li>
              <li><span className="font-semibold text-foreground">Communications:</span> Records of correspondence if you contact us by email, phone, or through our contact form.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>To process and manage your bookings and send confirmation emails.</li>
              <li>To contact you about your appointment (reminders, updates, or changes).</li>
              <li>To provide customer support and respond to your enquiries.</li>
              <li>To send you service-related communications (invoices, receipts, satisfaction surveys).</li>
              <li>To improve our website and services through analytics.</li>
              <li>To comply with our legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Legal Basis for Processing</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li><span className="font-semibold text-foreground">Contract performance:</span> Processing your booking and delivering the service you have requested.</li>
              <li><span className="font-semibold text-foreground">Legitimate interests:</span> Improving our services, preventing fraud, and maintaining business records.</li>
              <li><span className="font-semibold text-foreground">Legal obligation:</span> Retaining financial records as required by UK law.</li>
              <li><span className="font-semibold text-foreground">Consent:</span> Sending marketing communications (only where you have opted in).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. How We Share Your Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell your personal data. We may share it with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>Our cleaning technicians, solely for the purpose of fulfilling your booking.</li>
              <li>Email service providers used to send booking confirmations.</li>
              <li>Payment processors for secure card processing.</li>
              <li>Analytics providers (e.g. website traffic analysis) — anonymised where possible.</li>
              <li>Law enforcement or regulatory authorities where required by law.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All third parties are required to process your data securely and only for the specified purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Retention</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>Booking records are retained for 7 years to comply with UK tax and accounting law.</li>
              <li>Contact enquiry data is retained for up to 2 years.</li>
              <li>Marketing consent records are retained until you withdraw consent.</li>
              <li>Website analytics data is anonymised after 26 months.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Under UK GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li><span className="font-semibold text-foreground">Right of access:</span> Request a copy of the personal data we hold about you.</li>
              <li><span className="font-semibold text-foreground">Right to rectification:</span> Ask us to correct inaccurate or incomplete data.</li>
              <li><span className="font-semibold text-foreground">Right to erasure:</span> Request deletion of your data where there is no legitimate reason for us to retain it.</li>
              <li><span className="font-semibold text-foreground">Right to restrict processing:</span> Ask us to pause processing your data in certain circumstances.</li>
              <li><span className="font-semibold text-foreground">Right to portability:</span> Receive your data in a structured, machine-readable format.</li>
              <li><span className="font-semibold text-foreground">Right to object:</span> Object to processing based on legitimate interests or for direct marketing.</li>
              <li><span className="font-semibold text-foreground">Right to withdraw consent:</span> Withdraw consent for marketing at any time.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise any of these rights, contact us at hello@carpetcleaning.co.uk. We will respond within 30 days.
              You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website uses cookies to improve your browsing experience. Essential cookies are required for
              the website to function correctly. Analytics cookies (if enabled) help us understand how visitors
              use our site. You can manage cookie preferences through your browser settings. Disabling certain
              cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We take appropriate technical and organisational measures to protect your personal data against
              accidental loss, destruction, alteration, or unauthorised disclosure. Our website uses HTTPS
              encryption. Access to personal data is restricted to authorised personnel only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page
              with an updated revision date. Where changes are significant, we will notify you by email if
              we hold your contact details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For any questions, data subject requests, or concerns about your privacy:
            </p>
            <div className="mt-4 p-5 bg-card border border-border rounded-xl text-muted-foreground">
              <p className="font-semibold text-foreground">Carpet Cleaning Ltd — Data Controller</p>
              <p>Email: hello@carpetcleaning.co.uk</p>
              <p>Phone: 0800 123 4567</p>
              <p>London, United Kingdom</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
