import React from 'react';
import { Sparkles, CheckCircle, Info } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          <CheckCircle size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
