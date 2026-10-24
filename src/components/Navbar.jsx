import React, { useState } from 'react';
import { Cpu, Sun, Moon, Sparkles, Terminal, Activity, Menu, X } from 'lucide-react';

export default function Navbar({ currentTheme, onSelectTheme, onOpenModal, onTriggerToast }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Interactive Demo', href: '#demo' },
    { label: 'Platform Architecture', href: '#features' },
    { label: 'Live Telemetry', href: '#telemetry' },
    { label: 'Case Studies', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <header className="navbar-wrapper">
      <div className="container">
        <nav className="navbar" aria-label="Main Navigation">
          {/* Logo & Brand */}
          <a href="#" className="nav-brand" id="brand-logo">
            <div className="brand-icon-box">
              <Cpu size={22} />
            </div>
            <span>Nexus<span className="gradient-text">.AI</span></span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          {/* Actions & Theme Picker */}
          <div className="nav-actions">
            {/* Theme Picker */}
            <div className="theme-picker" role="radiogroup" aria-label="Theme Selection">
              <button
                type="button"
                className={`theme-pill ${currentTheme === 'dark' ? 'active' : ''}`}
                onClick={() => onSelectTheme('dark')}
                title="Dark Mode"
                aria-label="Dark Mode"
              >
                <Moon size={14} />
                <span className="hide-mobile">Dark</span>
              </button>
              <button
                type="button"
                className={`theme-pill ${currentTheme === 'midnight' ? 'active' : ''}`}
                onClick={() => onSelectTheme('midnight')}
                title="Midnight Blue"
                aria-label="Midnight Blue Theme"
              >
                <Activity size={14} />
                <span className="hide-mobile">Blue</span>
              </button>
              <button
                type="button"
                className={`theme-pill ${currentTheme === 'cyberpunk' ? 'active' : ''}`}
                onClick={() => onSelectTheme('cyberpunk')}
                title="Cyberpunk Neon"
                aria-label="Cyberpunk Neon Theme"
              >
                <Sparkles size={14} />
                <span className="hide-mobile">Neon</span>
              </button>
              <button
                type="button"
                className={`theme-pill ${currentTheme === 'light' ? 'active' : ''}`}
                onClick={() => onSelectTheme('light')}
                title="Light Mode"
                aria-label="Light Mode"
              >
                <Sun size={14} />
                <span className="hide-mobile">Light</span>
              </button>
            </div>

            {/* Launch Console CTA */}
            <button
              id="nav-launch-demo-btn"
              type="button"
              className="btn btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.875rem' }}
              onClick={() => {
                const el = document.getElementById('demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                onTriggerToast('Jumped directly to Interactive Playground');
              }}
            >
              <Terminal size={16} />
              <span>Launch Studio</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(16px)'
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
