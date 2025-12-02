import React, { useState } from 'react';
import logo from './logo.svg';

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

  /* Logo */
  .logo-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .large_logo {
    width: 320px;
    height: 320px;
    display: flex;
    align-items: center;
    margin: auto;
  }

  /* Blog */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2px;
    background: rgba(255, 255, 255, 0.06);
  }

  .blog-card {
    background: #0a0a0a;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }

  .blog-card:hover {
    background: rgba(255, 255, 255, 0.02);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .blog-image {
    aspect-ratio: 4/3;
    background: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .blog-content {
    padding: 2rem;
  }

  .blog-date {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 1rem;
  }

  .blog-title {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }

  .blog-excerpt {
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.6;
    font-size: 0.9375rem;
    font-weight: 300;
  }

  .blog-detail {
    max-width: 800px;
    margin: 0 auto;
  }

  .blog-detail-header {
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .blog-detail-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 300;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  .blog-detail-image {
    aspect-ratio: 16/9;
    background: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .blog-detail-content {
    font-size: 1.0625rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 300;
  }

  .back-button {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.875rem;
    cursor: pointer;
    margin-bottom: 3rem;
    padding: 0;
    transition: color 0.3s ease;
    letter-spacing: 0.02em;
  }

  .back-button:hover {
    color: #ffffff;
  }

  /* Contact */
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 2rem;
  }

  .form-label {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.75rem;
    font-weight: 500;
  }

  .form-input,
  .form-textarea {
    width: 100%;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    padding: 1rem;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s ease;
  }

  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }

  .form-textarea {
    min-height: 150px;
    resize: vertical;
  }

  .form-submit {
    width: 100%;
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
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Blog', id: 'blog' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
    { name: 'Terms', id: 'terms' },
  ];

  const blogPosts = [
    {
      id: 'custom-miniature-character',
      title: 'Custom Miniature Character Design',
      date: '2024-11-15',
      excerpt: 'Creating detailed tabletop gaming miniatures with precision FDM printing.',
      image: 'Custom Figure',
      content: 'This project involved creating a custom character miniature for a tabletop RPG campaign. Using high-resolution STL files provided by the client, we achieved incredible detail at 0.1mm layer height. The model featured intricate armor details and a dynamic pose that required careful support placement. Post-processing included careful removal of supports and light sanding to achieve a smooth finish ready for painting.'
    },
    {
      id: 'functional-prototype',
      title: 'Functional Prototype Development',
      date: '2024-11-08',
      excerpt: 'Engineering a working prototype for a mechanical assembly component.',
      image: 'Prototype Part',
      content: 'An engineering client needed a functional prototype for testing fit and assembly in a larger mechanical system. We printed this part in ABS for its superior strength and heat resistance. The project required multiple iterations to perfect the tolerances, but the final result fit perfectly into the assembly. This prototype saved the client weeks of development time and significant costs compared to traditional manufacturing methods.'
    },
    {
      id: 'artistic-sculpture',
      title: 'Artistic Sculpture Commission',
      date: '2024-10-22',
      excerpt: 'Bringing a digital art piece into the physical world through resin printing.',
      image: 'Artistic Sculpture',
      content: 'A local artist commissioned us to print their digital sculpture design. Using resin printing, we were able to capture every nuance of their creative vision. The translucent resin gave the piece an ethereal quality, and the 0.025mm layer resolution meant that surface details were flawless. The artist was thrilled with how their digital creation translated into a physical art piece that could be displayed in galleries.'
    },
    {
      id: 'engineering-component',
      title: 'Precision Engineering Component',
      date: '2024-10-10',
      excerpt: 'High-tolerance mechanical part for industrial application.',
      image: 'Engineering Component',
      content: 'This technical project required exceptional dimensional accuracy for an industrial client. The component needed to interface with existing machinery, so tolerances were critical. We used PETG for its excellent dimensional stability and strength. Multiple test prints and measurements ensured the final part met all specifications. The client successfully integrated the component into their production line.'
    },
    {
      id: 'custom-tool',
      title: 'Custom Workshop Tool',
      date: '2024-09-28',
      excerpt: 'Designing and printing a specialized tool for a unique workshop need.',
      image: 'Functional Tool',
      content: 'A hobbyist machinist needed a custom tool that wasn\'t available commercially. We worked together to refine the design, making several iterations to improve ergonomics and functionality. The final tool was printed in nylon for maximum durability and wear resistance. The client reported that the tool has become indispensable in their workshop and has held up perfectly through months of regular use.'
    },
    {
      id: 'architectural-model',
      title: 'Architectural Scale Model',
      date: '2024-09-15',
      excerpt: 'Creating a detailed scale model for architectural presentation.',
      image: 'Miniature Model',
      content: 'An architecture firm commissioned a 1:100 scale model of their building design for client presentations. The model required multiple parts printed at different scales to capture both overall form and fine details. We used a combination of white PLA for the structure and clear resin for window elements. The finished model helped the firm secure project approval and impressed their clients with its precision and detail.'
    }
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

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const navigateToSection = (section) => {
    setCurrentSection(section);
    setSelectedBlog(null);
    setMobileMenuOpen(false);
  };

  const openBlogPost = (post) => {
    setSelectedBlog(post);
    setCurrentSection('blog');
  };

  const galleryImages = blogPosts.map(post => ({
    title: post.image,
    blogId: post.id
  }));

  const renderHome = () => (
    <>
      <section className="hero">
        <div className="container">
          <img src={logo} className="large_logo"/>
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
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => {
                const post = blogPosts.find(p => p.id === item.blogId);
                if (post) openBlogPost(post);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="gallery-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderBlog = () => {
    if (selectedBlog) {
      return (
        <section className="section">
          <div className="container-narrow">
            <button onClick={() => setSelectedBlog(null)} className="back-button">
              ← Back to Blog
            </button>

            <div className="blog-detail">
              <div className="blog-detail-header">
                <div className="blog-date">{selectedBlog.date}</div>
                <h1 className="blog-detail-title">{selectedBlog.title}</h1>
              </div>

              <div className="blog-detail-image">
                <div className="gallery-title">{selectedBlog.image}</div>
              </div>

              <div className="blog-detail-content">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="section">
        <div className="container">
          <h2 className="section-title">Project Stories</h2>
          <p className="section-subtitle">Detailed looks at our work</p>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="blog-card"
                onClick={() => openBlogPost(post)}
              >
                <div className="blog-image">
                  <div className="gallery-title">{post.image}</div>
                </div>
                <div className="blog-content">
                  <div className="blog-date">{post.date}</div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderContact = () => (
    <section className="section">
      <div className="container-narrow">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">Let's discuss your next project</p>

        <form onSubmit={handleFormSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              className="form-textarea"
              required
            />
          </div>

          <button type="submit" className="btn form-submit">
            Send Message
          </button>
        </form>
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
              <div className="logo-container">
                <img src={logo} className="logo"/>
                <div className="nav-logo">Fieri Nascent®</div>
              </div>

              <div className="nav-links">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateToSection(item.id)}
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
                onClick={() => navigateToSection(item.id)}
                className={`nav-link ${currentSection === item.id ? 'active' : ''}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        <main>
          {currentSection === 'home' && renderHome()}
          {currentSection === 'gallery' && renderGallery()}
          {currentSection === 'blog' && renderBlog()}
          {currentSection === 'faq' && renderFAQ()}
          {currentSection === 'contact' && renderContact()}
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