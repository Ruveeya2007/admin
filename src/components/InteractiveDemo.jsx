import React, { useState, useEffect } from 'react';
import {
  Terminal, Activity, GitFork, Calculator, Play, Copy, RefreshCw,
  CheckCircle2, AlertTriangle, ShieldCheck, Zap, Server, Cpu, Database,
  ArrowRight, Sliders, Layers, Sparkles
} from 'lucide-react';

const PRESETS = [
  {
    id: 'cache',
    title: 'Distributed Vector Cache',
    category: 'Infrastructure',
    prompt: '// Synthesize high-performance distributed vector cache with sub-5ms retrieval',
    code: `import { createVectorCluster, NeuralCache } from '@nexus/engine';

export const edgeVectorCache = createVectorCluster({
  region: 'global-nearest',
  dimensions: 1536,
  metric: 'cosine',
  replication: 3,
  concurrencyLimit: 250_000,
  storage: {
    inMemoryTier: '128GB',
    persistence: 'nvme-fast-replicate'
  }
});

// Real-time zero-copy query execution
export async function querySemanticVectors(embedding: Float32Array) {
  const result = await edgeVectorCache.searchNearest({
    vector: embedding,
    topK: 5,
    filter: { tenantId: 'enterprise_09', compliance: 'soc2' }
  });

  return {
    matches: result.items,
    latencyMs: result.metrics.executionTimeMs, // Avg: 2.8ms
    cacheHitRate: 0.994
  };
}`
  },
  {
    id: 'fraud',
    title: 'FinTech Autonomous Fraud Guard',
    category: 'Security & Risk',
    prompt: '// Autonomous transaction risk scoring with zero-trust validation & real-time webhook',
    code: `import { AgentGuardrail, StreamValidator } from '@nexus/security';

export const transactionAuditor = new AgentGuardrail({
  model: 'nova-4-ultra',
  strictness: 0.99,
  maxEvaluationWindowMs: 15,
  rules: [
    'zero_day_anomaly_detection',
    'cross_border_velocity_check',
    'synthetic_identity_fingerprint'
  ]
});

export async function verifyTransactionPayload(txPayload: Transaction) {
  const assessment = await transactionAuditor.evaluateStream(txPayload);

  if (assessment.riskScore > 0.85) {
    await assessment.triggerKillSwitch({
      action: 'isolate_wallet',
      reason: assessment.flaggedSignals.join(', '),
      p99Latency: '6.4ms'
    });
    return { status: 'BLOCKED', reason: 'High Risk Anomaly' };
  }

  return { status: 'APPROVED', token: assessment.cryptographicSignToken };
}`
  },
  {
    id: 'k8s',
    title: 'Kubernetes Pod Autoscaler',
    category: 'DevOps & SRE',
    prompt: '// Predictive workload autoscaler using real-time neural load forecasts',
    code: `import { PredictiveAutoscaler } from '@nexus/k8s-mesh';

export const meshScaler = new PredictiveAutoscaler({
  clusterTarget: 'prod-us-east-cluster',
  predictionHorizonMinutes: 10,
  scalePolicy: {
    minReplicas: 8,
    maxReplicas: 320,
    targetCpuUtilization: 65,
    headroomBufferPercent: 15
  }
});

// Run continuous inference loop
meshScaler.onPredictiveSpike(async (telemetry) => {
  console.log(\`[AUTOSCALE] Anticipated surge of \${telemetry.projectedReqSec} req/s\`);
  await meshScaler.preWarmNodes({
    nodesToAdd: telemetry.recommendedPodCount,
    readyTimeoutMs: 3500
  });
});`
  },
  {
    id: 'sql',
    title: 'Semantic Query Compiler',
    category: 'Data Analytics',
    prompt: '// Natural language to optimized PostgreSQL distributed query plan',
    code: `import { SemanticSqlEngine } from '@nexus/data';

const compiler = new SemanticSqlEngine({
  dialect: 'postgres-citus',
  enforceRowLevelSecurity: true,
  explainPlanCostThreshold: 1200
});

// Natural language input: "Top 10 customers by revenue last 30 days excluding test tenants"
export async function compileNaturalSql(prompt: string) {
  const plan = await compiler.synthesizeQueryPlan({
    query: prompt,
    schemaContext: 'schema://analytics/v3'
  });

  return {
    rawSql: plan.optimizedSql,
    estimatedIoReduction: '68%',
    indexesRecommended: plan.indexes
  };
}`
  }
];

export default function InteractiveDemo({ onTriggerToast }) {
  const [activeTab, setActiveTab] = useState('sandbox'); // 'sandbox' | 'telemetry' | 'workflow' | 'calculator'

  // Tab 1 States (Sandbox)
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [displayedCode, setDisplayedCode] = useState(PRESETS[0].code);
  const [isRunningInference, setIsRunningInference] = useState(false);
  const [temperature, setTemperature] = useState(0.3);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [activeModel, setActiveModel] = useState('nova-4-ultra');

  // Tab 2 States (Telemetry Load Simulation)
  const [stressLoad, setStressLoad] = useState(45000); // 1,000 to 250,000 req/s

  // Tab 3 States (Workflow Pipeline)
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(2);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [packetPosition, setPacketPosition] = useState(20);
  const [logs, setLogs] = useState([
    { id: 1, time: '14:22:01.102', text: 'System initialized. Edge cluster online across 142 regions.' },
    { id: 2, time: '14:22:01.340', text: 'Node [Webhook Trigger] listening on port 443 with TLS 1.3.' },
    { id: 3, time: '14:22:02.015', text: 'Vector index refreshed: 4.8M embeddings loaded into NVMe cache.' }
  ]);

  // Tab 4 States (ROI Calculator)
  const [monthlyInferences, setMonthlyInferences] = useState(15); // Millions
  const [teamSize, setTeamSize] = useState(24); // Engineers

  // Handle Preset Change with simulated stream effect
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setIsRunningInference(true);
    setDisplayedCode('// Synthesizing optimized code for: ' + preset.title + '...\n');

    let currentLength = 0;
    const fullText = preset.code;
    const interval = setInterval(() => {
      currentLength += 28;
      if (currentLength >= fullText.length) {
        setDisplayedCode(fullText);
        setIsRunningInference(false);
        clearInterval(interval);
      } else {
        setDisplayedCode(fullText.substring(0, currentLength));
      }
    }, 20);
  };

  const copyCurrentCode = () => {
    navigator.clipboard.writeText(displayedCode);
    onTriggerToast('Copied code snippet to clipboard!');
  };

  // Run Pipeline Simulation
  const handleRunPipeline = () => {
    if (isPipelineRunning) return;
    setIsPipelineRunning(true);
    onTriggerToast('Executing distributed pipeline test...');

    let step = 0;
    const positions = [10, 30, 50, 70, 90];
    const nodeNames = ['Webhook Trigger', 'Vector Embedding', 'Nova-4 Engine', 'Policy Guardrail', 'Event Sink'];

    const stepInterval = setInterval(() => {
      if (step < positions.length) {
        setPacketPosition(positions[step]);
        setSelectedNodeIndex(step);
        const now = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100);
        setLogs((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            time: now,
            text: `[PASSED] Step ${step + 1}: ${nodeNames[step]} executed in ${Math.floor(Math.random() * 8 + 2)}ms`
          }
        ]);
        step++;
      } else {
        clearInterval(stepInterval);
        setIsPipelineRunning(false);
        onTriggerToast('Pipeline test completed with 100% success rate!');
      }
    }, 600);
  };

  // Derived telemetry metrics based on stressLoad
  const calculatedLatency = (10 + (stressLoad / 250000) * 14.5).toFixed(1);
  const calculatedCpu = Math.min(96, Math.floor(18 + (stressLoad / 250000) * 68));
  const calculatedThroughput = (stressLoad * 0.998).toLocaleString();
  const calculatedMemory = ((stressLoad / 250000) * 24 + 8.4).toFixed(1);

  // Derived ROI calculations
  const legacyCostMonthly = Math.round(monthlyInferences * 1850 + teamSize * 350);
  const nexusCostMonthly = Math.round(monthlyInferences * 520 + teamSize * 95);
  const netSavingsAnnual = ((legacyCostMonthly - nexusCostMonthly) * 12).toLocaleString();
  const hoursSavedAnnual = Math.round(teamSize * 165);
  const percentSaved = Math.round(((legacyCostMonthly - nexusCostMonthly) / legacyCostMonthly) * 100);

  const pipelineNodes = [
    { name: 'Ingress Webhook', type: 'Trigger', latency: '1.2ms', desc: 'mTLS HTTP/3 payload verification' },
    { name: 'Vector Embedding', type: 'Search', latency: '4.8ms', desc: '1536-dim cosine similarity scan' },
    { name: 'Nova-4 Reasoning', type: 'Inference', latency: '14.2ms', desc: 'Distributed parallel token stream' },
    { name: 'Policy Guardrail', type: 'Audit', latency: '2.1ms', desc: 'Zero-PII & OWASP compliance check' },
    { name: 'Event Bus Sink', type: 'Delivery', latency: '1.8ms', desc: 'Kafka / Redis distributed write' }
  ];

  return (
    <section className="interactive-section" id="demo">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> Live Interactive Experience
          </div>
          <h2 className="section-title">
            Hands-on Platform <span className="gradient-text">Interactive Demo</span>
          </h2>
          <p className="section-desc">
            Test the live reasoning sandbox, simulate traffic spikes up to 250k requests/sec,
            inspect data pipeline execution, and calculate real-world infrastructure cost savings.
          </p>
        </div>

        {/* Demo Console */}
        <div className="demo-console-container">
          {/* Top Tabs Bar */}
          <div className="demo-header">
            <div className="demo-tabs-bar" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'sandbox'}
                className={`demo-tab-btn ${activeTab === 'sandbox' ? 'active' : ''}`}
                onClick={() => setActiveTab('sandbox')}
                id="tab-sandbox-btn"
              >
                <Terminal size={16} className="tab-icon" />
                <span>Code Copilot Sandbox</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'telemetry'}
                className={`demo-tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
                onClick={() => setActiveTab('telemetry')}
                id="tab-telemetry-btn"
              >
                <Activity size={16} className="tab-icon" />
                <span>Live Stress Telemetry</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'workflow'}
                className={`demo-tab-btn ${activeTab === 'workflow' ? 'active' : ''}`}
                onClick={() => setActiveTab('workflow')}
                id="tab-workflow-btn"
              >
                <GitFork size={16} className="tab-icon" />
                <span>Visual Pipeline Canvas</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'calculator'}
                className={`demo-tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
                onClick={() => setActiveTab('calculator')}
                id="tab-calculator-btn"
              >
                <Calculator size={16} className="tab-icon" />
                <span>ROI Cost Calculator</span>
              </button>
            </div>

            {/* Live indicator */}
            <div className="demo-telemetry-badge">
              <span className="status-dot" />
              <span>Edge Session: <strong>ONLINE</strong></span>
              <span style={{ color: 'var(--border-strong)' }}>|</span>
              <span>RTT: <strong>14.2ms</strong></span>
            </div>
          </div>

          {/* TAB 1: CODE COPILOT SANDBOX */}
          {activeTab === 'sandbox' && (
            <div className="sandbox-layout animate-fade-in">
              {/* Sidebar */}
              <div className="sandbox-sidebar">
                <div>
                  <div className="sidebar-title">Select Preset Blueprint</div>
                  <div className="prompt-chips-list">
                    {PRESETS.map((preset) => (
                      <div
                        key={preset.id}
                        className={`prompt-chip ${selectedPreset.id === preset.id ? 'active' : ''}`}
                        onClick={() => handleSelectPreset(preset)}
                      >
                        <div>
                          <div style={{ fontWeight: 600 }}>{preset.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {preset.category}
                          </div>
                        </div>
                        <ArrowRight size={14} style={{ opacity: selectedPreset.id === preset.id ? 1 : 0.4 }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model Tuning Parameters */}
                <div>
                  <div className="sidebar-title">Model Tuning & Controls</div>
                  <div className="slider-control-group">
                    <div className="control-item">
                      <div className="control-label-row">
                        <span>Engine Tier:</span>
                        <strong style={{ color: 'var(--accent-cyan)' }}>{activeModel}</strong>
                      </div>
                      <select
                        value={activeModel}
                        onChange={(e) => setActiveModel(e.target.value)}
                        style={{
                          background: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '8px',
                          padding: '8px 10px',
                          fontFamily: 'inherit',
                          fontSize: '0.85rem'
                        }}
                      >
                        <option value="nova-4-ultra">Nova-4 Ultra (Maximum Accuracy)</option>
                        <option value="nova-4-flash">Nova-4 Flash (Ultra Low-Latency)</option>
                        <option value="nova-4-micro">Nova-4 Micro (Embedded Edge)</option>
                      </select>
                    </div>

                    <div className="control-item">
                      <div className="control-label-row">
                        <span>Temperature:</span>
                        <strong>{temperature}</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="custom-range-slider"
                      />
                    </div>

                    <div className="control-item">
                      <div className="control-label-row">
                        <span>Max Response Tokens:</span>
                        <strong>{maxTokens}</strong>
                      </div>
                      <input
                        type="range"
                        min="512"
                        max="4096"
                        step="256"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                        className="custom-range-slider"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSelectPreset(selectedPreset)}
                  disabled={isRunningInference}
                >
                  <Play size={16} />
                  <span>{isRunningInference ? 'Synthesizing...' : 'Re-Run Inference'}</span>
                </button>
              </div>

              {/* Main Code Editor View */}
              <div className="sandbox-main">
                <div className="sandbox-code-header">
                  <div className="window-dots">
                    <span className="window-dot red" />
                    <span className="window-dot yellow" />
                    <span className="window-dot green" />
                    <span style={{ marginLeft: '12px', fontSize: '0.8125rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {selectedPreset.id}.nexus.ts — Nova Engine Runtime
                    </span>
                  </div>

                  <div className="sandbox-code-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.8125rem' }}
                      onClick={copyCurrentCode}
                    >
                      <Copy size={14} />
                      <span>Copy Snippet</span>
                    </button>
                  </div>
                </div>

                {/* Code Window */}
                <div className="code-display-area">
                  <div style={{ color: 'var(--text-muted)', marginBottom: '14px' }}>
                    {selectedPreset.prompt}
                  </div>
                  <code>{displayedCode}</code>
                </div>

                {/* Footer Telemetry */}
                <div className="sandbox-footer-bar">
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                    <span>Inference Speed: <strong style={{ color: 'var(--accent-emerald)' }}>194 tps</strong></span>
                    <span>P99: <strong style={{ color: 'var(--accent-cyan)' }}>14.8ms</strong></span>
                    <span>Safety Score: <strong style={{ color: '#38bdf8' }}>99.98%</strong></span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Compiled & verified across Nexus Edge v3.4.1
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE STRESS TELEMETRY & POD CLUSTER */}
          {activeTab === 'telemetry' && (
            <div className="telemetry-layout animate-fade-in" id="telemetry">
              {/* Top Control Bar */}
              <div className="telemetry-top-ctrl">
                <div className="stress-slider-box">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600 }}>Simulated Ingress Load:</span>
                    <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>
                      {stressLoad.toLocaleString()} req/sec
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="250000"
                    step="5000"
                    value={stressLoad}
                    onChange={(e) => setStressLoad(parseInt(e.target.value))}
                    className="custom-range-slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span>1,000 req/s (Idle)</span>
                    <span>100,000 req/s (Heavy)</span>
                    <span>250,000 req/s (Surge Peak)</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-glow"
                  onClick={() => {
                    setStressLoad(240000);
                    onTriggerToast('Simulated Black Friday traffic surge to 240,000 req/s!');
                  }}
                >
                  <Zap size={16} />
                  <span>Simulate Traffic Surge</span>
                </button>
              </div>

              {/* Real-time Gauges */}
              <div className="gauges-grid">
                <div className="gauge-card">
                  <div className="gauge-header">
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Effective Throughput</span>
                    <div className="gauge-icon" style={{ color: 'var(--accent-cyan)' }}><Activity size={18} /></div>
                  </div>
                  <div className="gauge-value" style={{ color: 'var(--accent-cyan)' }}>{calculatedThroughput}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Zero dropped packets</div>
                  <div className="gauge-progress-bar">
                    <div className="gauge-progress-fill" style={{ width: `${(stressLoad / 250000) * 100}%`, background: 'var(--accent-cyan)' }} />
                  </div>
                </div>

                <div className="gauge-card">
                  <div className="gauge-header">
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>P99 Edge Latency</span>
                    <div className="gauge-icon" style={{ color: 'var(--accent-emerald)' }}><Zap size={18} /></div>
                  </div>
                  <div className="gauge-value" style={{ color: 'var(--accent-emerald)' }}>{calculatedLatency} ms</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Guaranteed &lt; 25ms SLA</div>
                  <div className="gauge-progress-bar">
                    <div className="gauge-progress-fill" style={{ width: `${(calculatedLatency / 30) * 100}%`, background: 'var(--accent-emerald)' }} />
                  </div>
                </div>

                <div className="gauge-card">
                  <div className="gauge-header">
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Distributed CPU Load</span>
                    <div className="gauge-icon" style={{ color: 'var(--accent-primary)' }}><Cpu size={18} /></div>
                  </div>
                  <div className="gauge-value" style={{ color: 'var(--accent-primary)' }}>{calculatedCpu}%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Auto-balanced across 140+ nodes</div>
                  <div className="gauge-progress-bar">
                    <div className="gauge-progress-fill" style={{ width: `${calculatedCpu}%`, background: 'var(--accent-primary)' }} />
                  </div>
                </div>

                <div className="gauge-card">
                  <div className="gauge-header">
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mesh Memory Bus</span>
                    <div className="gauge-icon" style={{ color: 'var(--accent-amber)' }}><Server size={18} /></div>
                  </div>
                  <div className="gauge-value" style={{ color: 'var(--accent-amber)' }}>{calculatedMemory} GB/s</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Zero-copy DMA channels</div>
                  <div className="gauge-progress-bar">
                    <div className="gauge-progress-fill" style={{ width: `${(calculatedMemory / 35) * 100}%`, background: 'var(--accent-amber)' }} />
                  </div>
                </div>
              </div>

              {/* Autoscaling Pod Cluster Status */}
              <div className="cluster-pod-box">
                <div className="cluster-title-bar">
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Autonomous Edge Pod Cluster Matrix</h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      Pods automatically scale up or hibernate based on instantaneous traffic demand.
                    </p>
                  </div>
                  <span className="preview-tag">
                    <span className="status-dot" />
                    <span>Auto-Scaler: Dynamic Level {Math.ceil(stressLoad / 40000)}</span>
                  </span>
                </div>

                <div className="pods-grid">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const isActive = i < Math.ceil((stressLoad / 250000) * 12);
                    return (
                      <div key={i} className={`pod-card ${isActive ? 'active' : ''}`}>
                        <div className="pod-name">pod-edge-{i + 1}.iad</div>
                        <div className="pod-status" style={{ color: isActive ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: isActive ? 'var(--accent-emerald)' : 'var(--text-muted)'
                            }}
                          />
                          <span>{isActive ? 'ACTIVE' : 'STANDBY'}</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                          {isActive ? `${Math.floor(25 + (stressLoad / 250000) * 60)}% Load` : '0% Idle'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VISUAL WORKFLOW PIPELINE CANVAS */}
          {activeTab === 'workflow' && (
            <div className="workflow-layout animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Zero-Latency Pipeline Execution</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Click individual pipeline stages to inspect real-time configuration and metrics.
                  </p>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleRunPipeline}
                  disabled={isPipelineRunning}
                >
                  <Play size={16} />
                  <span>{isPipelineRunning ? 'Streaming Pipeline...' : 'Run Pipeline Test'}</span>
                </button>
              </div>

              {/* Node Visualization Canvas */}
              <div className="workflow-canvas-panel">
                <div className="pipeline-nodes-row">
                  <div className="pipeline-connector-line" />
                  <div
                    className="pipeline-pulse-packet"
                    style={{ left: `${packetPosition}%`, display: isPipelineRunning ? 'block' : 'none' }}
                  />

                  {pipelineNodes.map((node, index) => (
                    <div
                      key={node.name}
                      className={`pipeline-node ${selectedNodeIndex === index ? 'selected' : ''} ${isPipelineRunning && selectedNodeIndex === index ? 'active-pulsing' : ''}`}
                      onClick={() => setSelectedNodeIndex(index)}
                    >
                      <div className="node-icon-circle">
                        {index === 0 && <Layers size={20} />}
                        {index === 1 && <Database size={20} />}
                        {index === 2 && <Cpu size={20} />}
                        {index === 3 && <ShieldCheck size={20} />}
                        {index === 4 && <Server size={20} />}
                      </div>
                      <div className="node-title">{node.name}</div>
                      <div className="node-subtitle">{node.type} • {node.latency}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Node Details Card */}
              <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Active Stage Inspector: Node {selectedNodeIndex + 1} of 5
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '4px 0' }}>
                    {pipelineNodes[selectedNodeIndex].name}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {pipelineNodes[selectedNodeIndex].desc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>EXECUTION P99</span>
                    <strong>{pipelineNodes[selectedNodeIndex].latency}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>RELIABILITY</span>
                    <strong style={{ color: 'var(--accent-emerald)' }}>99.999%</strong>
                  </div>
                </div>
              </div>

              {/* Terminal Logs */}
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Live Distributed Execution Console
                </div>
                <div className="pipeline-log-terminal">
                  {logs.map((log) => (
                    <div key={log.id} className="log-entry">
                      <span className="log-time">[{log.time}]</span>
                      <span style={{ color: log.text.includes('[PASSED]') ? 'var(--accent-emerald)' : '#cbd5e1' }}>
                        {log.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ROI COST CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="calculator-layout animate-fade-in">
              <div className="calc-inputs-panel">
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>
                    Cloud ROI & Cost Calculator
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Adjust your company's usage scale to calculate guaranteed savings compared to traditional AWS / Azure setups.
                  </p>
                </div>

                {/* Monthly Queries Slider */}
                <div className="control-item">
                  <div className="control-label-row">
                    <span style={{ fontWeight: 600 }}>Monthly Agent Queries / Inferences:</span>
                    <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '1.05rem' }}>
                      {monthlyInferences} Million
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={monthlyInferences}
                    onChange={(e) => setMonthlyInferences(parseInt(e.target.value))}
                    className="custom-range-slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>1M Queries</span>
                    <span>50M Queries</span>
                    <span>100M Queries</span>
                  </div>
                </div>

                {/* Team Size Slider */}
                <div className="control-item">
                  <div className="control-label-row">
                    <span style={{ fontWeight: 600 }}>Engineering & SRE Team Size:</span>
                    <strong style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '1.05rem' }}>
                      {teamSize} Engineers
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="150"
                    step="2"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    className="custom-range-slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>2 devs</span>
                    <span>75 devs</span>
                    <span>150 devs</span>
                  </div>
                </div>

                {/* Summary points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)' }} />
                    <span>Includes 140+ global Edge regions at zero extra surcharge</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)' }} />
                    <span>Automated zero-copy GPU memory pooling eliminates idle compute</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)' }} />
                    <span>Enterprise SLA guarantee: 99.999% uptime with credit refunds</span>
                  </div>
                </div>
              </div>

              {/* Calculator Output Display Card */}
              <div className="calc-card-highlight">
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Projected Annual Cost Reduction
                  </div>
                  <div className="savings-num-hero">${netSavingsAnnual} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ year</span></div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Equivalent to <strong style={{ color: 'var(--text-primary)' }}>{percentSaved}% direct bill reduction</strong>.
                  </div>
                </div>

                {/* Comparison Visualizer Bars */}
                <div className="savings-comparison-bars">
                  <div className="comp-bar-row">
                    <div className="comp-bar-meta">
                      <span>Traditional Cloud Stack (AWS / GCP / OpenAI)</span>
                      <strong>${legacyCostMonthly.toLocaleString()} / mo</strong>
                    </div>
                    <div className="comp-track">
                      <div className="comp-fill" style={{ width: '100%', background: '#ef4444' }} />
                    </div>
                  </div>

                  <div className="comp-bar-row">
                    <div className="comp-bar-meta">
                      <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Nexus AI Engine Architecture</span>
                      <strong style={{ color: 'var(--accent-emerald)' }}>${nexusCostMonthly.toLocaleString()} / mo</strong>
                    </div>
                    <div className="comp-track">
                      <div
                        className="comp-fill"
                        style={{ width: `${(nexusCostMonthly / legacyCostMonthly) * 100}%`, background: 'var(--accent-emerald)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ENGINEERING TIME SAVED</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                      {hoursSavedAnnual.toLocaleString()} hrs
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CARBON EMISSIONS CUT</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>
                      {(monthlyInferences * 0.42).toFixed(1)} Tons CO₂
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => onTriggerToast(`Generated custom ROI proposal with $${netSavingsAnnual}/yr in savings!`)}
                >
                  <span>Export Full Enterprise ROI Report</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
