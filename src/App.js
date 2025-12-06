import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactError, setContactError] = useState(null);
  const [content, setContent] = useState(null);
  const [blogPosts, setBlogPosts] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/content.json')
      .then(res => res.json())
      .then(data => setContent(data));

    fetch(process.env.PUBLIC_URL + '/blogs.json')
      .then(res => res.json())
      .then(data => setBlogPosts(data));
  }, []);

  if (!content || !blogPosts) {
    return <div className="app loading">Loading...</div>;
  }

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
    { name: 'Terms', path: '/terms' },
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    let errors = [];
    if (formData.name === null ||
      formData.name === undefined ||
      formData.name.length < 1) {
      errors.push("Name is missing\n")
    }
    if (formData.email === null ||
      formData.email === undefined ||
      !emailRegex.test(formData.email)) {
      errors.push("Email address appears bad\n")
    }
    if (formData.message === null ||
      formData.message === undefined ||
      formData.message.length < 5) {
      errors.push("Message is too short\n")
    }
    if (errors.length > 0) {
      setContactError(errors);
      return;
    }

    setContactError(null);
    setIsSubmitting(true);

    const emailJSConfig = {
      serviceID: 'fieri.nascent@gmail.com',
      templateID: 'template_l3qm4eb',
      publicKey: 'cTbDUgDego0NUJHa4'
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: emailJSConfig.serviceID,
          template_id: emailJSConfig.templateID,
          user_id: emailJSConfig.publicKey,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            time: Date.now()
          }
        })
      });

      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Sorry, there was an error sending your message. Please email us directly at fieri.nascent@gmail.com');
    } finally {
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="app">
      <Navigation
        navigation={navigation}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        content={content}
      />

      <main>
        <Routes>
          <Route path="/" element={<Home content={content} />} />
          <Route path="/gallery" element={<Gallery blogPosts={blogPosts} imagePublicUrl={imagePublicUrl} />} />
          <Route path="/blog" element={<BlogList blogPosts={blogPosts} imagePublicUrl={imagePublicUrl} />} />
          <Route path="/blog/:id" element={<BlogPost blogPosts={blogPosts} imagePublicUrl={imagePublicUrl} />} />
          <Route path="/images/*" element={<ImageViewer imagePublicUrl={imagePublicUrl} />} />
          <Route path="/faq" element={<FAQ content={content} />} />
          <Route path="/contact" element={
            <Contact
              formData={formData}
              handleFormChange={handleFormChange}
              handleFormSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              contactError={contactError}
            />
          } />
          <Route path="/terms" element={<Terms content={content} />} />
        </Routes>
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

function Navigation({ navigation, mobileMenuOpen, setMobileMenuOpen, content }) {
  return (
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
              <Link
                key={item.path}
                to={item.path}
                className="nav-link"
              >
                {item.name}
              </Link>
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
          <Link
            key={item.path}
            to={item.path}
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function Home({ content }) {
  const navigate = useNavigate();

  return (
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
            <p className="cta-subtitle">
              Transform your ideas into reality through advanced 3D printing technology.
            </p>
            <div className="cta-buttons">
              <button onClick={() => navigate('/faq')} className="btn">
                Learn More
              </button>
              <button onClick={() => navigate('/contact')} className="btn btn-outline">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Gallery({ blogPosts, imagePublicUrl }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const imagesPerPage = 20;

  // Collect all images from all blog posts
  const allImages = blogPosts.flatMap(post =>
    post.sections
      .filter(section => section.type === 'image')
      .map(section => ({
        postId: post.id,
        postTitle: post.title,
        filename: section.filename,
        caption: section.caption
      }))
  );

  const totalPages = Math.ceil(allImages.length / imagesPerPage);
  const startIndex = (page - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = allImages.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo(0, 0);
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">
          Page {page} of {totalPages} ({allImages.length} images)
        </p>

        <div className="gallery">
          {currentImages.map((img, index) => (
            <div
              key={`${img.postId}-${index}`}
              className="gallery-item"
              onClick={() => navigate(`/blog/${img.postId}`)}
            >
              <img src={imagePublicUrl(img.filename)} alt={img.postTitle} />
              <div className="gallery-overlay">
                <div className="gallery-title">{img.postTitle}</div>
                <div className="gallery-subtitle">{img.caption}</div>
                <Link
                  to={`/images/${img.filename}`}
                  className="direct-image-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Image
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>

          <div className="pagination-info">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`pagination-number ${page === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}

function BlogList({ blogPosts, imagePublicUrl }) {
  const navigate = useNavigate();

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
              onClick={() => navigate(`/blog/${post.id}`)}
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
}

function BlogPost({ blogPosts, imagePublicUrl }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <section className="section">
        <div className="container-narrow">
          <h2>Blog post not found</h2>
          <button onClick={() => navigate('/blog')} className="btn">
            ← Back to Blog
          </button>
        </div>
      </section>
    );
  }

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
            <Link to={`/images/${section.filename}`}>
              <img src={url} alt={section.caption || ''} />
            </Link>
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

  return (
    <section className="section">
      <div className="container-narrow">
        <button onClick={() => navigate('/blog')} className="back-button">
          ← Back to Blog
        </button>

        <div className="blog-detail">
          <div className="blog-detail-header">
            <div className="blog-date">{post.date}</div>
            <h1 className="blog-detail-title">{post.title}</h1>
          </div>

          <div className="blog-detail-content">
            {post.sections.map((section, index) => renderBlogSection(section, index))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageViewer({ imagePublicUrl }) {
  const location = window.location.pathname;
  const filename = location.replace('/images/', '');
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [filename]);

  if (!filename) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="section-title">Image not found</h2>
          <button onClick={() => navigate(-1)} className="btn">
            ← Back
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="image-viewer-container">
          <div className="image-viewer">
            {imageError ? (
              <p>Error loading image: {imagePublicUrl(filename)}</p>
            ) : (
              <img
                key={filename}
                src={imagePublicUrl(filename)}
                alt={decodeURIComponent(filename)}
                onError={() => setImageError(true)}
              />
            )}
          </div>
          <div className="image-viewer-actions">
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ({ content }) {
  return (
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
}

function Contact({ formData, handleFormChange, handleFormSubmit, isSubmitting, contactError }) {
  return (
    <section className="section">
      <div className="container-narrow">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">Let's discuss your next project</p>

        <div className="contact-form">
          {contactError ? <pre className="contact-error">{contactError}</pre> : null}

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

          <button
            onClick={handleFormSubmit}
            className="btn form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'THANKS' : 'Send Message'}
          </button>
        </div>
      </div>
    </section>
  );
}

function Terms({ content }) {
  return (
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
}

export default function FieriNascent() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}