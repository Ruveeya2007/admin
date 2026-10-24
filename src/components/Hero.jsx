import { Play, Sparkles, ArrowRight, Zap, Globe2 } from 'lucide-react';

export default function Hero({ onOpenModal, onTriggerToast }) {
  const scrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      onTriggerToast('Viewing Live Playground Sandbox');
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-glow-orb" />

      <div className="container">
        <div className="hero-content">
          {/* Release Badge */}
          <div
            className="hero-badge-pill"
            onClick={scrollToDemo}
            role="button"
            tabIndex={0}
            id="hero-badge-announcement"
          >
            <span className="hero-badge-highlight">
              <Sparkles size={14} /> Nova-4 Omni Engine
            </span>
            <span style={{ color: 'var(--border-strong)' }}>|</span>
            <span>Sub-millisecond reasoning edge nodes are now live</span>
            <ArrowRight size={14} />
          </div>

          {/* Main Title */}
          <h1 className="hero-headline">
            The Autonomous Cloud Platform for <span className="gradient-text">Next-Gen AI Systems</span>
          </h1>

          {/* Subheading */}
          <p className="hero-subhead">
            Deploy ultra-responsive LLM agents, automated data pipelines, and distributed vector
            reasoning across 140+ edge regions with zero latency bottlenecks and instant auto-scaling.
          </p>

          {/* CTAs */}
          <div className="hero-cta-group">
            <button
              id="hero-primary-demo-btn"
              type="button"
              className="btn btn-primary"
              onClick={scrollToDemo}
            >
              <Zap size={18} />
              <span>Explore Interactive Demo</span>
            </button>

            <button
              id="hero-watch-tour-btn"
              type="button"
              className="btn btn-secondary"
              onClick={onOpenModal}
            >
              <Play size={18} style={{ fill: 'currentColor' }} />
              <span>Watch 60s Platform Tour</span>
            </button>
          </div>

          {/* Live Key Metrics Banner */}
          <div className="hero-metrics-grid">
            <div className="hero-metric-item">
              <div className="hero-metric-val">14.2ms</div>
              <div className="hero-metric-lbl">Global Edge P99 Latency</div>
            </div>
            <div className="hero-metric-item">
              <div className="hero-metric-val">34.8M+</div>
              <div className="hero-metric-lbl">Daily Agent Inferences</div>
            </div>
            <div className="hero-metric-item">
              <div className="hero-metric-val">99.999%</div>
              <div className="hero-metric-lbl">Multi-Region Uptime SLA</div>
            </div>
            <div className="hero-metric-item">
              <div className="hero-metric-val">74%</div>
              <div className="hero-metric-lbl">Cloud Compute Cost Saved</div>
            </div>
          </div>

          {/* Interactive Screen Preview Frame */}
          <div className="hero-preview-frame">
            <div className="hero-preview-inner">
              <img
                src="/platform_demo_preview.jpg"
                alt="Nexus AI Autonomous Systems Overview Dashboard"
                className="hero-preview-img"
              />
              <div className="hero-preview-overlay">
                <div className="preview-overlay-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <div className="preview-tag">
                      <span className="status-dot" />
                      <span>Live Neural Telemetry: Online</span>
                    </div>
                    <div className="preview-tag" style={{ borderColor: 'var(--border-accent)', color: 'var(--accent-primary)' }}>
                      <Globe2 size={14} />
                      <span>142 Active Global Clusters</span>
                    </div>
                  </div>

                  <button
                    id="hero-launch-inspector-btn"
                    type="button"
                    className="btn btn-glow"
                    style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                    onClick={scrollToDemo}
                  >
                    <span>Inspect Live Demo Sandbox</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
