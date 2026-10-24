import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    q: 'How does Nexus AI achieve sub-15ms P99 latency compared to OpenAI or AWS Bedrock?',
    a: 'We operate 140+ bare-metal edge acceleration nodes interconnected via a private global Anycast optical fiber ring. Rather than routing all worldwide requests to central data centers in Virginia or Frankfurt, models are pre-cached and quantized with zero-copy tensor caching directly at the edge nearest to your end-users.'
  },
  {
    q: 'Can I use Nexus AI as a drop-in replacement for OpenAI / Anthropic SDKs?',
    a: 'Yes. Nexus AI exposes a 100% compliant OpenAI / Anthropic API wire format. Simply change the baseURL to https://api.nexus-ai.cloud/v1 and provide your API key. Existing code, LangChain wrappers, and LlamaIndex pipelines require zero refactoring.'
  },
  {
    q: 'Is customer data ever retained, logged, or used to train public models?',
    a: 'Never. All prompt processing and vector calculations execute inside hardware-encrypted secure enclaves (AMD SEV-SNP and Intel SGX). Neither Nexus AI staff nor third parties have physical or memory access to decrypt inflight tokens. We sign BAAs for HIPAA compliance and provide SOC2 Type II reports.'
  },
  {
    q: 'Can we deploy private custom fine-tuned weights or open-source models like Llama 3 / Mistral?',
    a: 'Absolutely. Enterprise and Pro accounts can upload custom safetensors or LoRA adapters directly to our encrypted artifact registry. Our system compiles them into optimized TensorRT-LLM engines in under 90 seconds.'
  },
  {
    q: 'What happens if our API traffic experiences a sudden 100x surge?',
    a: 'Our predictive cluster scheduler utilizes autonomous pod scaling. Instead of taking minutes to spin up virtual machines, edge GPU tensors are maintained in pre-warmed pooling tiers that absorb massive traffic spikes in under 400 milliseconds.'
  },
  {
    q: 'What kind of uptime SLA and enterprise support guarantees are included?',
    a: 'Production plans include a 99.9% uptime SLA with priority email and Slack support. Enterprise plans feature a 99.999% SLA with automated financial credit refunds, a designated Solutions Architect, and 15-minute emergency P1 SRE response times.'
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = FAQS.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <HelpCircle size={14} /> Frequently Asked Questions
          </div>
          <h2 className="section-title">
            Answers to <span className="gradient-text">Architectural & Technical Inquiries</span>
          </h2>
          <p className="section-desc">
            Everything you need to know about latency guarantees, confidential computing, and seamless migration.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="faq-search-box">
          <Search size={18} className="faq-search-icon" />
          <input
            type="text"
            className="faq-search-input"
            placeholder="Search FAQs (e.g. latency, security, openai migration, SLA)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search frequently asked questions"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div className="faq-answer-panel animate-fade-in">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              No questions found matching "{searchQuery}". Try searching for "latency" or "security".
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
