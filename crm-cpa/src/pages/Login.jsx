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
      gsap.from('.login-logo', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.login-title', { y: 20, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' });
      gsap.from('.login-subtitle', { y: 20, opacity: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
      gsap.from('.login-field', { y: 25, opacity: 0, duration: 0.6, delay: 0.4, stagger: 0.1, ease: 'power3.out' });
      gsap.from('.login-btn', { y: 20, opacity: 0, duration: 0.6, delay: 0.7, ease: 'power3.out' });
      gsap.from('.login-footer', { opacity: 0, duration: 0.5, delay: 0.9, ease: 'power2.out' });
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
        <div className="login-logo flex items-center justify-center gap-3 mb-10">
          <div
            className="flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #7C3AED, #9333EA)',
              boxShadow: '0 8px 32px rgba(124,58,237,0.3)',
            }}
          >
            <Activity size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>CRM CPA</h1>
            <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Performance Hub</p>
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
          <h2 className="login-title text-center text-lg font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            Bem-vindo de volta
          </h2>
          <p className="login-subtitle text-center text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
            Entre para acessar seu painel de performance
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="login-field mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
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
            <div className="login-field mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                Senha
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="login-btn w-full flex items-center justify-center gap-2 cursor-pointer"
              style={{
                background: loading ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg, #7C3AED, #9333EA)',
                color: 'white',
                fontWeight: 600,
                borderRadius: '0.875rem',
                padding: '14px 24px',
                fontSize: '0.875rem',
                border: 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(124,58,237,0.3)',
                fontFamily: 'var(--font-sans)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 6px 28px rgba(124,58,237,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(124,58,237,0.3)';
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="8" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                <>
                  Entrar
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Forgot Password */}
          <p className="text-center mt-5 text-xs cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>
            Esqueceu sua senha? <span style={{ color: '#A78BFA', fontWeight: 600 }}>Recuperar</span>
          </p>
        </div>

        {/* Footer */}
        <div className="login-footer text-center mt-8">
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
