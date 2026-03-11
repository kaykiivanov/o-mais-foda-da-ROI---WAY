import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function KPICard({ icon: Icon, label, value, prefix = '', suffix = '', change, changeType = 'up', color = '#7C3AED', delay = 0, gradient = false }) {
  const cardRef = useRef(null);
  const valueRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.65,
        delay: delay,
        ease: 'power3.out',
      });

      const target = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^\d.]/g, ''));
      if (!isNaN(target)) {
        gsap.from({ val: 0 }, {
          val: target,
          duration: 1.8,
          delay: delay + 0.2,
          ease: 'power2.out',
          onUpdate: function () {
            if (valueRef.current) {
              const v = this.targets()[0].val;
              if (suffix === '%') {
                valueRef.current.textContent = `${prefix}${v.toFixed(1)}${suffix}`;
              } else if (prefix === 'R$ ') {
                valueRef.current.textContent = `${prefix}${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
              } else {
                valueRef.current.textContent = `${prefix}${Math.floor(v)}${suffix}`;
              }
            }
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [value, delay, prefix, suffix]);

  return (
    <div ref={cardRef} className={gradient ? 'card-purple-gradient kpi-card p-5' : 'kpi-card p-5'}>
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${color}18` }}
        >
          {Icon && <Icon size={16} style={{ color }} />}
        </div>
        {change !== undefined && (
          <span
            className="text-xs font-semibold flex items-center gap-0.5 px-2 py-0.5 rounded-md"
            style={{
              color: changeType === 'up' ? '#22C55E' : '#EF4444',
              background: changeType === 'up' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            }}
          >
            {changeType === 'up' ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
      <p ref={valueRef} className="text-[1.625rem] font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
        {typeof value === 'number' ? `${prefix}${value}${suffix}` : value}
      </p>
    </div>
  );
}
