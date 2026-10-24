import { useState } from 'react';
import { Check, Zap, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Pricing({ onOpenModal, onTriggerToast }) {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [currency, setCurrency] = useState('USD'); // 'USD' | 'EUR' | 'GBP'

  const currencySymbols = { USD: '$', EUR: '€', GBP: '£' };
  const currencyMultiplier = { USD: 1, EUR: 0.92, GBP: 0.78 };

  const formatPrice = (usdMonthly) => {
    if (usdMonthly === 0) return '0';
    let base = usdMonthly;
    if (billingCycle === 'annual') {
      base = base * 0.75; // 25% discount
    }
    const converted = Math.round(base * currencyMultiplier[currency]);
    return converted;
  };

  const handleSelectPlan = (planName) => {
    onTriggerToast(`Selected ${planName} Plan (${billingCycle.toUpperCase()})`);
    onOpenModal();
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Zap size={14} /> Transparent Predictable Pricing
          </div>
          <h2 className="section-title">
            Simple Plans with <span className="gradient-text">Zero Ingestion Overage Surprises</span>
          </h2>
          <p className="section-desc">
            Scale seamlessly from local prototypes to planet-scale enterprise workloads with predictable edge billing.
          </p>
        </div>

        {/* Billing & Currency Switches */}
        <div className="billing-switch-wrapper">
          <div className="billing-toggle-pill" role="radiogroup">
            <button
              type="button"
              className={`toggle-option ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              className={`toggle-option ${billingCycle === 'annual' ? 'active' : ''}`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual Billing
            </button>
          </div>

          <span className="save-badge">
            <Sparkles size={12} /> Save 25% with Annual
          </span>

          {/* Currency Dropdown */}
          <div style={{ marginLeft: '12px' }}>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '0.8125rem',
                fontFamily: 'inherit',
                cursor: 'pointer'
              }}
              aria-label="Select currency"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {/* Plan 1: Developer */}
          <div className="pricing-card">
            <div>
              <div className="plan-name">Developer Sandbox</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Perfect for hobbyists, side projects, and local agent prototyping.
              </p>

              <div className="plan-price-row">
                <span className="plan-price">{currencySymbols[currency]}0</span>
                <span className="plan-period">/ forever</span>
              </div>

              <ul className="feature-check-list">
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>100,000 monthly inference tokens</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>5 Edge Points of Presence</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>Shared GPU execution mesh</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>Community Discord support</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>Community SDK templates</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={() => handleSelectPlan('Developer Free')}
            >
              <span>Get Started Free</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Plan 2: Pro Production (Featured) */}
          <div className="pricing-card featured">
            <div className="popular-ribbon">
              <Sparkles size={12} /> Most Popular Choice
            </div>

            <div>
              <div className="plan-name">Production Scale</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                For scaling startups and production applications needing guaranteed low-latency.
              </p>

              <div className="plan-price-row">
                <span className="plan-price">
                  {currencySymbols[currency]}{formatPrice(79)}
                </span>
                <span className="plan-period">
                  / month {billingCycle === 'annual' && '(billed annually)'}
                </span>
              </div>

              <ul className="feature-check-list">
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span><strong>15,000,000</strong> monthly inference tokens</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span><strong>80+ Global Edge Regions</strong> (Anycast)</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>P99 &lt; 20ms Latency Guarantee</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>In-Memory Vector Cache tier included</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>Autonomous Multi-Agent Swarm Orchestrator</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>Priority 24/7 Slack & Email SRE access</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => handleSelectPlan('Production Scale')}
            >
              <Zap size={16} />
              <span>Start 14-Day Free Trial</span>
            </button>
          </div>

          {/* Plan 3: Enterprise Cloud */}
          <div className="pricing-card">
            <div>
              <div className="plan-name">Enterprise Custom</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                For global enterprises requiring custom VPC peering and strict data sovereignty.
              </p>

              <div className="plan-price-row">
                <span className="plan-price">
                  {currencySymbols[currency]}{formatPrice(349)}
                </span>
                <span className="plan-period">
                  / month {billingCycle === 'annual' && '(billed annually)'}
                </span>
              </div>

              <ul className="feature-check-list">
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span><strong>Unlimited</strong> monthly throughput capacity</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>All 140+ Global Data Centers & Custom Private VPC</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>Hardware Secure Enclaves (Zero-PII retention)</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span><strong>99.999% SLA</strong> with cash-back credit terms</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>Custom fine-tuned weights on dedicated H100/B200s</span>
                </li>
                <li className="feature-check-item">
                  <Check size={16} className="check-icon" />
                  <span>Dedicated Solutions Architect & Technical Account Mgr</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%' }}
              onClick={() => handleSelectPlan('Enterprise Custom')}
            >
              <ShieldCheck size={16} />
              <span>Contact Architecture Team</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
