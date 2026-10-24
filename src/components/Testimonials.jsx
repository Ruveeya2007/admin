import React, { useState } from 'react';
import { Star, CheckCircle, Quote, TrendingUp, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    category: 'fintech',
    metric: '9.4ms P99 Latency at Scale',
    quote:
      'Replacing our legacy LLM gateway with Nexus AI slashed our real-time fraud evaluation latency from 180ms down to under 10ms. We process 40M transactions daily without a single dropped event.',
    name: 'Elena Rostova',
    role: 'Head of Core Infrastructure at ApexPay Global',
    initials: 'ER'
  },
  {
    category: 'devops',
    metric: '$1.4M Saved in Cloud GPU Costs',
    quote:
      'The dynamic tensor memory pooling alone paid for our annual contract in less than 3 months. Our SRE teams spend zero time managing cold-starts or configuring cluster nodes.',
    name: 'Marcus Vance',
    role: 'VP of Platform Engineering at HyperScale Cloud',
    initials: 'MV'
  },
  {
    category: 'ai',
    metric: '18x Faster Multi-Agent Reasoning',
    quote:
      'We build autonomous coding and security agents. The low-latency streaming pipeline and built-in consensus guardrails allowed us to launch production features 4 months ahead of schedule.',
    name: 'Dr. Sarah Chen',
    role: 'Chief AI Scientist at Synthetix Labs',
    initials: 'SC'
  },
  {
    category: 'fintech',
    metric: '100% Zero-PII Compliance',
    quote:
      'Operating in strict European banking jurisdictions requires hardware-level enclave privacy. Nexus AI gives us confidential AI computing with full SOC2 Type II audit guarantees.',
    name: 'Lukas Meyer',
    role: 'Chief Information Security Officer at VaultBank Zurich',
    initials: 'LM'
  },
  {
    category: 'devops',
    metric: '99.999% Multi-Cloud SLA',
    quote:
      'During Black Friday traffic surges reaching 180,000 requests per second, the autonomous edge pods seamlessly absorbed the spike with zero manual intervention or latency drift.',
    name: 'Priya Sharma',
    role: 'Principal SRE Architect at Omnicommerce',
    initials: 'PS'
  },
  {
    category: 'ai',
    metric: 'Sub-5ms Semantic Vector Search',
    quote:
      'The speed of their in-memory vector cache is remarkable. Our recommendation engine serves personalized semantic embeddings to millions of users in under 4 milliseconds.',
    name: 'Julian Thorne',
    role: 'Founder & CTO at NeuralStream',
    initials: 'JT'
  }
];

export default function Testimonials() {
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.category === filter);

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <TrendingUp size={14} /> Proven Performance
          </div>
          <h2 className="section-title">
            Trusted by the Teams <span className="gradient-text">Powering Modern AI</span>
          </h2>
          <p className="section-desc">
            Explore how world-class engineering teams achieve sub-millisecond reasoning and cut cloud compute costs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="testimonials-filter-bar">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Case Studies ({TESTIMONIALS.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'fintech' ? 'active' : ''}`}
            onClick={() => setFilter('fintech')}
          >
            FinTech & Banking
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'devops' ? 'active' : ''}`}
            onClick={() => setFilter('devops')}
          >
            Cloud & DevOps
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'ai' ? 'active' : ''}`}
            onClick={() => setFilter('ai')}
          >
            Autonomous AI Labs
          </button>
        </div>

        {/* Grid */}
        <div className="testimonials-grid animate-fade-in">
          {filteredItems.map((item) => (
            <div key={item.name} className="testimonial-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div className="testi-metric-callout">
                    <Sparkles size={14} />
                    <span>{item.metric}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className="testimonial-quote">
                  "{item.quote}"
                </p>
              </div>

              <div className="testimonial-author-row">
                <div className="author-avatar">{item.initials}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="author-name">{item.name}</span>
                    <CheckCircle size={14} style={{ color: 'var(--accent-cyan)' }} />
                  </div>
                  <div className="author-role">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
