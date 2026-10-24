import React, { useState } from 'react';
import {
  Globe2, Bot, Shield, Eye, Cpu, Terminal, CheckCircle2,
  Copy, ArrowRight, Zap, Lock, Sparkles
} from 'lucide-react';

const FEATURES = [
  {
    icon: Globe2,
    tag: 'Global Infrastructure',
    title: 'Sub-Millisecond Neural Edge Routing',
    description:
      'Distribute your model reasoning across 140+ global tier-4 points of presence. Anycast routing guarantees requests hit the closest GPU cluster with under 15ms latency.',
    detail: 'Automated anycast failover with instant route re-convergence in <200µs.'
  },
  {
    icon: Bot,
    tag: 'Autonomous AI',
    title: 'Self-Organizing Agent Swarms',
    description:
      'Orchestrate complex multi-agent workflows with built-in consensus protocols. Agents proactively decompose tasks, verify results, and self-heal failed steps.',
    detail: 'Supports dynamic memory compaction and asynchronous tool delegation.'
  },
  {
    icon: Shield,
    tag: 'Enterprise Security',
    title: 'Confidential Computing & Zero-PII Vault',
    description:
      'Every prompt, embedding, and response runs inside hardware-isolated secure enclaves (AMD SEV-SNP & Intel SGX). Zero customer data is ever retained or trained on.',
    detail: 'Fully SOC2 Type II, ISO 27001, HIPAA & GDPR compliance certified.'
  },
  {
    icon: Eye,
    tag: 'Deep Observability',
    title: 'Real-Time Holographic Telemetry',
    description:
      'Inspect every single token, decision fork, and vector retrieval score in real time. Full OpenTelemetry compatibility with instant flamegraph tracing.',
    detail: 'Microsecond-level breakdown of prompt serialization and KV cache reuse.'
  },
  {
    icon: Cpu,
    tag: 'Hardware Acceleration',
    title: 'Dynamic Zero-Copy Memory Mesh',
    description:
      'Eliminate GPU idle memory bottlenecks with our proprietary virtual tensor fabric. Scale KV-cache allocations on the fly without PCIe serialization delays.',
    detail: 'Up to 3.8x memory bandwidth efficiency compared to standard vLLM.'
  },
  {
    icon: Terminal,
    tag: 'Developer Experience',
    title: 'Zero-Config Universal SDKs',
    description:
      'Integrate with a single line of code in Python, TypeScript, Go, or Rust. First-class support for LangChain, LlamaIndex, and OpenAI client drop-in replacement.',
    detail: 'Drop-in base URL replacement requiring zero refactoring of existing apps.'
  }
];

export default function Features({ onTriggerToast }) {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const copyInstallCommand = (cmd) => {
    navigator.clipboard.writeText(cmd);
    onTriggerToast(`Copied "${cmd}" to clipboard!`);
  };

  return (
    <section className="features-section" id="features">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Zap size={14} /> Architecture & Capabilities
          </div>
          <h2 className="section-title">
            Engineered for <span className="gradient-text">Mission-Critical AI Scale</span>
          </h2>
          <p className="section-desc">
            A unified stack engineered from custom silicon virtualization up to high-level autonomous agent runtimes.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          {FEATURES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="feature-card"
                onClick={() => setSelectedFeature(feat === selectedFeature ? null : feat)}
              >
                <div className="feature-icon-wrapper">
                  <Icon size={26} />
                </div>

                <div className="feature-mini-pill">
                  <Sparkles size={12} />
                  <span>{feat.tag}</span>
                </div>

                <h3 className="feature-title" style={{ marginTop: '14px' }}>
                  {feat.title}
                </h3>

                <p className="feature-description">
                  {feat.description}
                </p>

                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <strong style={{ color: 'var(--accent-cyan)' }}>Key Spec: </strong>
                  {feat.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Developer CLI Banner */}
        <div
          className="glass-card"
          style={{
            marginTop: '48px',
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Terminal size={18} style={{ color: 'var(--accent-cyan)' }} />
              <strong style={{ fontSize: '1.05rem' }}>Get Started in 10 Seconds via CLI</strong>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Install the universal CLI to authenticate, test models, and deploy edge clusters.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--code-bg)',
              border: '1px solid var(--border-strong)',
              borderRadius: '12px',
              padding: '6px 14px',
              gap: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem'
            }}
          >
            <span style={{ color: 'var(--accent-emerald)' }}>$</span>
            <span>npm install -g @nexus-ai/cli</span>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '6px 10px', fontSize: '0.75rem' }}
              onClick={() => copyInstallCommand('npm install -g @nexus-ai/cli')}
              aria-label="Copy CLI install command"
            >
              <Copy size={13} />
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
