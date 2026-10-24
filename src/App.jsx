import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveDemo from './components/InteractiveDemo';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import Toast from './components/Toast';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState('green');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Apply theme to html document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toast dispatcher
  const triggerToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleSelectTheme = (newTheme) => {
    setTheme(newTheme);
    triggerToast(`Switched theme to ${newTheme.toUpperCase()}`);
  };

  return (
    <>
      {/* Navigation */}
      <Navbar
        currentTheme={theme}
        onSelectTheme={handleSelectTheme}
        onOpenModal={() => setIsModalOpen(true)}
        onTriggerToast={triggerToast}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenModal={() => setIsModalOpen(true)}
          onTriggerToast={triggerToast}
        />

        {/* Centerpiece: Interactive Playground & Telemetry */}
        <InteractiveDemo
          onTriggerToast={triggerToast}
        />

        {/* Technical Architecture & Specs */}
        <Features
          onTriggerToast={triggerToast}
        />

        {/* Social Proof & Customer Benchmarks */}
        <Testimonials />

        {/* Pricing Matrix */}
        <Pricing
          onOpenModal={() => setIsModalOpen(true)}
          onTriggerToast={triggerToast}
        />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer & CTA */}
      <Footer
        onTriggerToast={triggerToast}
      />

      {/* 60s Walkthrough Modal */}
      <DemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTriggerToast={triggerToast}
      />

      {/* Toast Feedback */}
      <Toast toasts={toasts} />
    </>
  );
}
