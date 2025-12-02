import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

export default function FieriNascent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [content, setContent] = useState(null);
  const [blogPosts, setBlogPosts] = useState(null);

  useEffect(() => {
    // In production, this would fetch from actual JSON files:
    fetch(process.env.PUBLIC_URL + '/content.json')
      .then(res => res.json())
      .then(data => setContent(data));

    fetch(process.env.PUBLIC_URL + '/blogs.json')
      .then(res => res.json())
      .then(data => setBlogPosts(data));

    // DEV
    // import contentData from "content.json"
    //setContent(contentData);
  }, []);

  if (!content) {
    return <div className="app loading">Loading...</div>;
  }

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Blog', id: 'blog' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
    { name: 'Terms', id: 'terms' },
  ];

  const imagePublicUrl = (filename) => {
    return process.env.PUBLIC_URL + '/images/' + filename;
  }

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

  const renderBlogSection = (section, index) => {
    switch (section.type) {
      case 'header':
        return <h2 key={index} className="blog-section-header">{section.content}</h2>;
      case 'subheader':
        return <h3 key={index} className="blog-section-subheader">{section.content}</h3>;
      case 'text':
        return <p key={index} className="blog-section-text">{section.content}</p>;
      case 'image':
        const url = imagePublicUrl(section.filename);
        return (
          <figure key={index} className="blog-section-image">
            <img src={url} alt={section.caption || ''} />
            {section.caption && <figcaption>{section.caption}</figcaption>}
          </figure>
        );
      case 'image_url':
        return (
          <figure key={index} className="blog-section-image">
            <img src={section.url} alt={section.caption || ''} />
            {section.caption && <figcaption>{section.caption}</figcaption>}
          </figure>
        );
      default:
        return null;
    }
  };

  const renderHome = () => (
    <>
      <section className="hero">
        <div className="container">
          <img src={logo} alt="" className="large_logo"/>
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
            {content.features.map((feature, index) => (
              <div key={index} className="feature">
                <div className="feature-title">{feature.title}</div>
                <div className="feature-text">{feature.description}</div>
              </div>
            ))}
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
              <button onClick={() => setCurrentSection('contact')} className="btn btn-outline">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderGalleryImage = (post, filename, caption) => (
    <div
      key={post.id}
      className="gallery-item"
      onClick={() => openBlogPost(post)}
    >
      <img src={imagePublicUrl(filename)} alt={post.title} />
      <div className="gallery-overlay">
        <div className="gallery-title">{post.title}</div>
        <div className="gallery-subtitle">{caption}</div>
      </div>
    </div>
  );

  const renderGallerySection = (post) => {
    // {renderGalleryImage(post, post.thumbnail)}
    return (<>
      {post.sections.map((section, index) => {
        if (section.type == "image") {
          return renderGalleryImage(post, section.filename, section.caption)
        }
        return null
      })}
    </>)
  };

  const renderGallery = () => (
    <section className="section">
      <div className="container">
        <div className="gallery">
          {blogPosts.map((post) => (
            renderGallerySection(post, post.thumbnail)))}
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

              <div className="blog-detail-content">
                {selectedBlog.sections.map((section, index) => renderBlogSection(section, index))}
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
                  <img src={imagePublicUrl(post.thumbnail)} alt={post.title} />
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

  const renderFAQ = () => (
    <section className="section">
      <div className="container-narrow">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Guidelines and printing specifications</p>

        {content.faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );

  const renderContact = () => (
    <section className="section">
      <div className="container-narrow">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">Let's discuss your next project</p>

        <div className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="form-input"
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
            />
          </div>

          <button onClick={handleFormSubmit} className="btn form-submit">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );

  const renderTerms = () => (
    <section className="section">
      <div className="container-narrow">
        <h2 className="section-title">Terms & Conditions</h2>

        {content.terms.map((term, index) => (
          <div key={index} className="terms-section">
            <h3 className="terms-title">{term.title}</h3>
            <p className="terms-text">{term.content}</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="app">
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <div className="logo-container">
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>
              <div className="nav-logo">{content.site.name}</div>
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
            {content.site.name} — Small Scale 3D Print Foundry — Tokyo
          </p>
        </div>
      </footer>
    </div>
  );
}