const Contact = () => (
  <main>
    <section className="section section-divider">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="eyebrow">Contact us</p>
            <h2>Send your requirement</h2>
          </div>
          <p className="section-subtitle">
            Have a question or need a quote? Get in touch — we are here to help.
          </p>
        </div>
        <div className="contact-grid">
          <form
            className="contact-form"
            action="mailto:info@samarthoverseasindia.com"
          >
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="your@email.com" />
            </label>
            <label className="full">
              Message
              <textarea
                name="message"
                rows="5"
                placeholder="Tell us your requirement"
              ></textarea>
            </label>
            <button className="btn primary" type="submit">
              Send Message
            </button>
          </form>
          <div className="contact-details">
            <div>
              <p className="contact-label">Email</p>
              <a href="mailto:info@samarthoverseasindia.com">
                info@samarthoverseasindia.com
              </a>
            </div>
            <div>
              <p className="contact-label">Phone</p>
              <a href="tel:+919826015502">+91 98260 15502</a>
            </div>
            <div>
              <p className="contact-label">Business inquiry</p>
              <p>Reply within 24 hours with pricing details.</p>
            </div>
            <div className="detail-actions">
              <a className="btn primary" href="mailto:info@samarthoverseasindia.com">
                Send requirement
              </a>
              <a className="btn ghost" href="tel:+919826015502">
                Call now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
)

export default Contact
