import React, { useState } from 'react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .app {
    min-height: 100vh;
    background: #0a0a0a;
    color: #ffffff;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .container-narrow {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Navigation */
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .nav-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }

  .nav-logo {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
  }

  .nav-links {
    display: flex;
    gap: 3rem;
  }

  .nav-link {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.875rem;
    cursor: pointer;
    transition: color 0.3s ease;
    font-weight: 400;
    letter-spacing: 0.02em;
  }

  .nav-link:hover,
  .nav-link.active {
    color: #ffffff;
  }

  .nav-mobile-toggle {
    display: none;
    background: none;
    border: none;
    color: #ffffff;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .nav-mobile {
    display: none;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding: 2rem;
  }

  .nav-mobile.open {
    display: block;
  }

  .nav-mobile .nav-link {
    display: block;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  /* Typography */
  .hero-title {
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 2rem;
  }

  .hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: rgba(255, 255, 255, 0.5);
    font-weight: 300;
    letter-spacing: 0.02em;
    line-height: 1.6;
    max-width: 600px;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 300;
    letter-spacing: -0.01em;
    margin-bottom: 1rem;
  }

  .section-subtitle {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 4rem;
  }

  /* Sections */
  .section {
    padding: 8rem 0;
  }

  .hero {
    min-height: 90vh;
    display: flex;
    align-items: center;
    padding: 4rem 0;
  }

  /* Features Grid */
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2px;
    background: rgba(255, 255, 255, 0.06);
  }

  .feature {
    background: #0a0a0a;
    padding: 3rem 2rem;
    transition: background 0.3s ease;
  }

  .feature:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .feature-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .feature-text {
    font-size: 1.125rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 300;
  }

  /* CTA */
  .cta {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 6rem 2rem;
    text-align: center;
  }

  .btn {
    background: #ffffff;
    color: #0a0a0a;
    border: none;
    padding: 1rem 2.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }

  .btn-outline {
    background: transparent;
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .btn-outline:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.4);
  }

  /* FAQ */
  .faq-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 2.5rem 0;
  }

  .faq-question {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
  }

  .faq-answer {
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.7;
    font-weight: 300;
  }

  /* Gallery */
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2px;
    background: rgba(255, 255, 255, 0.06);
  }

  .gallery-item {
    aspect-ratio: 1;
    background: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .gallery-item::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.05), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .gallery-item:hover::before {
    opacity: 1;
  }

  .gallery-item:hover {
    transform: scale(0.98);
  }

  .gallery-title {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
  }

  /* Terms */
  .terms-section {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 3rem 0;
  }

  .terms-section:last-child {
    border-bottom: none;
  }

  .terms-title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
    letter-spacing: 0.02em;
  }

  .terms-text {
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.7;
    font-weight: 300;
  }

  /* Footer */
  .footer {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding: 4rem 0;
    text-align: center;
  }

  .footer-text {
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.875rem;
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .container {
      padding: 0 1.5rem;
    }

    .nav-links {
      display: none;
    }

    .nav-mobile-toggle {
      display: block;
    }

    .section {
      padding: 4rem 0;
    }

    .features,
    .gallery {
      grid-template-columns: 1fr;
    }

    .cta {
      padding: 4rem 1.5rem;
    }
  }
`;

export default function FieriNascent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Terms', id: 'terms' },
  ];

  const faqs = [
    {
      question: 'What printing technologies do you use?',
      answer: 'We primarily use FDM and resin printing technologies to accommodate various project needs.'
    },
    {
      question: 'What is the typical turnaround time?',
      answer: 'Small projects typically take 3-5 business days. Larger or complex projects may require additional time.'
    },
    {
      question: 'What file formats do you accept?',
      answer: 'We accept STL, OBJ, and 3MF file formats. If you have other formats, please contact us.'
    },
    {
      question: 'Do you offer design services?',
      answer: 'We focus on printing services, but we can recommend trusted designers in the Tokyo area.'
    }
  ];

  const galleryImages = [
    'Prototype Part',
    'Custom Figure',
    'Engineering Component',
    'Artistic Sculpture',
    'Functional Tool',
    'Miniature Model',
  ];

  const renderHome = () => (
    <>
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Small Scale<br />3D Print Foundry
          </h1>
          <p className="hero-subtitle">
            Specializing in small runs and hobbyist 3D print jobs for the greater Tokyo region.
            Empowering creators, engineers, and entrepreneurs with precision manufacturing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="features">
            <div className="feature">
              <div className="feature-title">Technology</div>
              <div className="feature-text">
                State-of-the-art 3D printing equipment delivering precision and quality for every project.
              </div>
            </div>
            <div className="feature">
              <div className="feature-title">Service</div>
              <div className="feature-text">
                Dedicated support for hobbyists and professionals throughout the Tokyo region.
              </div>
            </div>
            <div className="feature">
              <div className="feature-title">Accessible</div>
              <div className="feature-text">
                Competitive pricing that makes 3D printing accessible for projects of all sizes.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <h2 className="section-title">Ready to create?</h2>
            <p className="hero-subtitle" style={{ margin: '0 auto 2rem' }}>
              Transform your ideas into reality through advanced 3D printing technology.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setCurrentSection('faq')} className="btn">
                Learn More
              </button>
              <button onClick={() => setCurrentSection('gallery')} className="btn btn-outline">
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderFAQ = () => (
    <section className="section">
      <div className="container-narrow">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Guidelines and printing specifications</p>

        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );

  const renderGallery = () => (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Sample Prints</h2>
        <p className="section-subtitle">Completed projects</p>

        <div className="gallery">
          {galleryImages.map((title, index) => (
            <div key={index} className="gallery-item">
              <div className="gallery-title">{title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderTerms = () => (
    <section className="section">
      <div className="container-narrow">
        <h2 className="section-title">Terms & Conditions</h2>

        <div className="terms-section">
          <h3 className="terms-title">Service Agreement</h3>
          <p className="terms-text">
            By using our 3D printing services, you agree to provide files that do not infringe on copyright or intellectual property rights. All designs and files remain the property of the customer.
          </p>
        </div>

        <div className="terms-section">
          <h3 className="terms-title">Payment Terms</h3>
          <p className="terms-text">
            Payment is required before production begins. We accept various payment methods and will provide a detailed quote before starting any project.
          </p>
        </div>

        <div className="terms-section">
          <h3 className="terms-title">Quality Guarantee</h3>
          <p className="terms-text">
            We strive for excellence in every print. If there are any issues with print quality due to our error, we will reprint the item at no additional cost.
          </p>
        </div>

        <div className="terms-section">
          <h3 className="terms-title">Turnaround Time</h3>
          <p className="terms-text">
            Estimated turnaround times are provided as guidelines. Actual completion times may vary based on project complexity and current workload.
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav className="nav">
          <div className="container">
            <div className="nav-inner">
              <div className="nav-logo">Fieri Nascent®</div>

              <div className="nav-links">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id)}
                    className={`nav-link ${currentSection === item.id ? 'active' : ''}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <button
                className="nav-mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          <div className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`nav-link ${currentSection === item.id ? 'active' : ''}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        <main>
          {currentSection === 'home' && renderHome()}
          {currentSection === 'faq' && renderFAQ()}
          {currentSection === 'gallery' && renderGallery()}
          {currentSection === 'terms' && renderTerms()}
        </main>

        <footer className="footer">
          <div className="container">
            <p className="footer-text">
              Fieri Nascent® — Small Scale 3D Print Foundry — Tokyo
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}