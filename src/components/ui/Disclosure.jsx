import { useCallback, useState } from 'react';
import { ChevronDown } from 'lucide-react';

/** Cabeçalho expansível reutilizável (botão com aria-expanded/aria-controls). */
export function DisclosureButton({ open, controls, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      className={`disclosure ${className}`}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onClick}
    >
      {children}
      <ChevronDown className="disclosure__chevron" size={18} aria-hidden="true" />
    </button>
  );
}

/** Estado de vários grupos abertos/fechados. */
export function useOpenSet(initial = []) {
  const [open, setOpen] = useState(() => new Set(initial));
  const toggle = useCallback((id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);
  const setAll = useCallback((ids) => setOpen(new Set(ids)), []);
  return { open, toggle, setAll, isOpen: (id) => open.has(id) };
}
