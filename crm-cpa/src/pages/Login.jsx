import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Activity, Eye, EyeOff, ArrowRight, Lock, Mail } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.login-logo', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all' });
      gsap.from('.login-title', { y: 20, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power3.out', clearProps: 'all' });
      gsap.from('.login-subtitle', { y: 20, opacity: 0, duration: 0.7, delay: 0.3, ease: 'power3.out', clearProps: 'all' });
      gsap.from('.login-field', { y: 25, opacity: 0, duration: 0.6, delay: 0.4, stagger: 0.1, ease: 'power3.out', clearProps: 'all' });
      gsap.from('.login-btn', { y: 20, opacity: 0, duration: 0.6, delay: 0.7, ease: 'power3.out', clearProps: 'all' });
      gsap.from('.login-footer', { opacity: 0, duration: 0.5, delay: 0.9, ease: 'power2.out', clearProps: 'all' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);

    // Simulate auth
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Background Gradient Orbs */}
      <div
        className="absolute"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          top: '-200px',
          right: '-200px',
          pointerEvents: 'none',
        }}
      />
      <div
        className="absolute"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          bottom: '-150px',
          left: '-150px',
          pointerEvents: 'none',
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Login Card */}
      <div
        ref={formRef}
        className="relative z-10 w-full"
        style={{
          maxWidth: '420px',
          padding: '0 24px',
        }}
      >
        {/* Logo */}
        <div className="login-logo flex flex-col items-center justify-center mb-12">
          <div className="flex items-center gap-3">
            <div style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <path d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z" stroke="#00FF41" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L16 8L23 12L9 20L16 24L23 20" stroke="#00FF41" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.04em', color: 'white', display: 'flex', alignItems: 'center' }}>
              Scalei<span style={{ color: '#00FF41' }}>Hub</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '1.5rem',
            padding: '40px 32px',
          }}
        >
          <h2 className="login-title text-center text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Bem-vindo de volta
          </h2>
          <p className="login-subtitle text-center text-[13px] mb-10" style={{ color: 'var(--color-text-muted)' }}>
            Entre para acessar seu painel de performance
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="login-field mb-5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)', paddingLeft: '4px' }}>
                E-mail
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  style={{
                    width: '100%',
                    background: 'var(--color-bg-input)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.875rem',
                    padding: '14px 16px 14px 44px',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#7C3AED';
                    e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-border)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="login-field mb-8">
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2 flex justify-between items-center" style={{ color: 'var(--color-text-muted)', paddingLeft: '4px', paddingRight: '4px' }}>
                <span>Senha</span>
                <span className="text-[10px] cursor-pointer" style={{ color: '#A78BFA', fontWeight: 600, letterSpacing: 'normal', textTransform: 'none' }}>Esqueceu?</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    background: 'var(--color-bg-input)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.875rem',
                    padding: '14px 48px 14px 44px',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#7C3AED';
                    e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-border)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="mb-4 text-center text-sm font-medium"
                style={{
                  color: '#EF4444',
                  background: 'rgba(239,68,68,0.08)',
                  padding: '10px',
                  borderRadius: '0.75rem',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="login-btn btn-acessar mt-12"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#0A0A14" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="8" />
                  </svg>
                  Acessando...
                </>
              ) : (
                <>
                  ACESSAR
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="login-footer text-center mt-20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="pulse-dot pulse-dot-green" style={{ width: '6px', height: '6px' }} />
            <span className="text-[11px] font-mono" style={{ color: 'var(--color-text-muted)' }}>Sistema Operacional</span>
          </div>
          <p className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}>
            v1.0.0 · CRM CPA Performance Hub
          </p>
        </div>
      </div>
    </div>
  );
}
