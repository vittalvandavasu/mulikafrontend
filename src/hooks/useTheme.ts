import { useEffect, useState } from 'react';
export function useTheme() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('mulika_theme') || 'system'; } catch { return 'system'; } });
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => { const dark = theme === 'dark' || (theme === 'system' && media.matches); document.documentElement.dataset.theme = dark ? 'dark' : 'light'; document.documentElement.classList.toggle('dark', dark); };
    apply(); media.addEventListener('change', apply);
    try { localStorage.setItem('mulika_theme', theme); } catch {}
    return () => media.removeEventListener('change', apply);
  }, [theme]);
  return { theme, setTheme };
}
