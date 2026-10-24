import React, { useState } from 'react';
import { X, Play, CheckCircle2, ArrowRight, ShieldCheck, Zap, Server, Activity } from 'lucide-react';

const TOUR_STEPS = [
  {
    title: '1. Global Anycast Edge Provisioning',
    time: '0:15',
    desc: 'Deploy models globally in seconds across 140+ regions. Our Anycast mesh routes traffic to the physically nearest GPU cluster automatically.',
    badge: '14.2ms P99 Latency'
  },
  {
    title: '2. High-Throughput Token Streaming',
    time: '0:30',
    desc: 'Experience 190+ tokens/sec throughput with continuous batched inference and zero PCIe serialization overhead.',
    badge: '190 tokens/sec'
  },
  {
    title: '3. Real-time Holographic Tracing',
    time: '0:45',
    desc: 'Deep microsecond telemetry with OpenTelemetry native spans. Inspect KV-cache hit ratios and token embeddings in real time.',
    badge: 'OpenTelemetry Native'
  },
  {
    title: '4. Hardware Secure Enclaves (Zero-PII)',
    time: '1:00',
    desc: 'All computation executes within AMD SEV-SNP cryptographic hardware boundaries. Complete audit logs and zero data retention.',
    badge: 'SOC2 & HIPAA Ready'
  }
];

export default function DemoModal({ isOpen, onClose, onTriggerToast }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const stepData = TOUR_STEPS[currentStep];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="brand-icon-box" style={{ width: '32px', height: '32px' }}>
              <Zap size={18} />
            </div>
            <strong style={{ fontSize: '1.1rem' }}>Nexus AI Guided Walkthrough Tour</strong>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close walkthrough modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {/* Simulated Tour Stage Screen */}
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#04060b',
              border: '1px solid var(--border-subtle)',
              aspectRatio: '16/9',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px',
              textAlign: 'center'
            }}
          >
            <img
              src="/platform_demo_preview.jpg"
              alt="Demo Tour Interface"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.28
              }}
            />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(6, 182, 212, 0.2)',
                  border: '1px solid var(--border-cyan)',
                  color: 'var(--accent-cyan)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginBottom: '16px'
                }}
              >
                {stepData.badge}
              </span>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>
                {stepData.title}
              </h3>

              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '24px' }}>
                {stepData.desc}
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (currentStep < TOUR_STEPS.length - 1) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      onClose();
                      const el = document.getElementById('demo');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                      onTriggerToast('Walkthrough complete! Try the live playground below.');
                    }
                  }}
                >
                  <span>{currentStep === TOUR_STEPS.length - 1 ? 'Start Interactive Sandbox' : 'Next Step'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Steps Progress Selector */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              marginTop: '20px'
            }}
          >
            {TOUR_STEPS.map((s, idx) => (
              <div
                key={s.title}
                onClick={() => setCurrentStep(idx)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: currentStep === idx ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-tertiary)',
                  border: `1px solid ${currentStep === idx ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Stage {idx + 1}</span>
                  <span>{s.time}</span>
                </div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, marginTop: '2px', color: currentStep === idx ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {s.title.split('. ')[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
