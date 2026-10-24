import React, { useState } from 'react';
import { Cpu, ArrowRight, ShieldCheck, Github, Twitter, Disc as Discord, Globe, Send, CheckCircle2 } from 'lucide-react';

export default function Footer({ onTriggerToast }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onTriggerToast('Please enter a valid developer email address.');
      return;
    }
    setIsSubscribed(true);
    onTriggerToast('Subscribed to Nexus AI Architecture & Release updates!');
    setEmail('');
  };

  return (
    <>
      {/* Bottom CTA Banner */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <span className="section-badge" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                🚀 Start Building Immediately
              </span>

              <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', fontWeight: 800, margin: '16px 0', color: '#fff', letterSpacing: '-0.03em' }}>
                Ready to Experience <span className="gradient-text">Sub-Millisecond AI</span>?
              </h2>

              <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '32px' }}>
                Join over 18,000 engineering teams who have deployed intelligent autonomous agents
                on our globally distributed zero-latency neural cloud.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    const el = document.getElementById('demo');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    onTriggerToast('Jumped directly to Interactive Playground');
                  }}
                >
                  <span>Launch Free Interactive Studio</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onTriggerToast('Contacting developer solutions architect...')}
                >
                  <ShieldCheck size={18} />
                  <span>Request Dedicated Cluster</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top-grid">
            {/* Col 1: Brand & Status */}
            <div>
              <div className="nav-brand" style={{ marginBottom: '14px' }}>
                <div className="brand-icon-box">
                  <Cpu size={22} />
                </div>
                <span>Nexus<span className="gradient-text">.AI</span></span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px', maxWidth: '320px' }}>
                The high-performance autonomous edge cloud engineered for real-time model reasoning,
                in-memory vector caching, and enterprise multi-agent workflows.
              </p>

              <div className="status-indicator">
                <span className="status-dot" />
                <span style={{ color: 'var(--text-primary)', fontSize: '0.8125rem' }}>
                  All 142 Edge Clusters Operational (14.2ms P99)
                </span>
              </div>
            </div>

            {/* Col 2: Platform */}
            <div>
              <div className="footer-col-title">Platform</div>
              <ul className="footer-links-list">
                <li><a href="#demo">Interactive Studio</a></li>
                <li><a href="#features">Neural Edge Routing</a></li>
                <li><a href="#telemetry">Live Telemetry & Gauges</a></li>
                <li><a href="#features">In-Memory Vector Cache</a></li>
                <li><a href="#features">Confidential Computing</a></li>
                <li><a href="#pricing">Enterprise SLA</a></li>
              </ul>
            </div>

            {/* Col 3: Developers */}
            <div>
              <div className="footer-col-title">Developers</div>
              <ul className="footer-links-list">
                <li><a href="#features" onClick={() => onTriggerToast('Opening Universal SDK reference')}>Universal SDKs</a></li>
                <li><a href="#demo" onClick={() => onTriggerToast('API Reference wire format: OpenAI Compatible')}>API Reference</a></li>
                <li><a href="#features">Python & TypeScript CLI</a></li>
                <li><a href="#faq">OpenTelemetry Traces</a></li>
                <li><a href="#faq">Migration Guide</a></li>
                <li><a href="#testimonials">Customer Benchmarks</a></li>
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div>
              <div className="footer-col-title">Architecture Briefing</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Bi-weekly technical whitepapers on distributed LLM scheduling and GPU virtualization.
              </p>

              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="engineer@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  <Send size={14} />
                  <span>Subscribe to Research</span>
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom-bar">
            <div>
              © {new Date().getFullYear()} Nexus AI Technologies, Inc. All rights reserved. SOC2 Type II Certified.
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Security Whitepaper</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>System Status</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
