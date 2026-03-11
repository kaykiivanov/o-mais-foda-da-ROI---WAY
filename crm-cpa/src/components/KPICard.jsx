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

      // Parse target number
      let target;
      if (typeof value === 'number') {
        target = value;
      } else {
        target = parseFloat(String(value).replace(/[^\d.,-]/g, '').replace(',', '.'));
      }

      if (!isNaN(target) && target > 0 && valueRef.current) {
        // Set initial value
        valueRef.current.textContent = formatValue(0);
        
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          delay: delay + 0.3,
          ease: 'power2.out',
          onUpdate: () => {
            if (valueRef.current) {
              valueRef.current.textContent = formatValue(obj.val);
            }
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  function formatValue(v) {
    if (suffix === '%') {
      return `${prefix}${v.toFixed(1)}${suffix}`;
    } else if (prefix === 'R$ ') {
      return `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `${prefix}${Math.floor(v)}${suffix}`;
    }
  }

  return (
    <div ref={cardRef} className={gradient ? 'card-purple-gradient kpi-card' : 'kpi-card'} style={{ padding: '20px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '14px' }}>
        <div
          className="flex items-center justify-center"
          style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${color}18` }}
        >
          {Icon && <Icon size={16} style={{ color }} />}
        </div>
        {change !== undefined && (
          <span
            className="text-xs font-semibold flex items-center gap-0.5"
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '0.6875rem',
              color: changeType === 'up' ? '#22C55E' : '#EF4444',
              background: changeType === 'up' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            }}
          >
            {changeType === 'up' ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <p className="font-medium uppercase" style={{ fontSize: '0.6875rem', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
        {label}
      </p>
      <p ref={valueRef} className="font-bold" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>
        {formatValue(typeof value === 'number' ? value : 0)}
      </p>
    </div>
  );
}
