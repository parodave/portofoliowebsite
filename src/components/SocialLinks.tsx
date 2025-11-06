import React from 'react';
import { Twitter, Github, Linkedin, Globe, Handshake } from 'lucide-react';

type LinkItem = {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type Props = {
  className?: string;
  size?: number;
};

const links: LinkItem[] = [
  { href: 'https://x.com/Parodave000', label: 'Twitter', Icon: Twitter },
  { href: 'https://github.com/parodave', label: 'GitHub', Icon: Github },
  { href: 'https://linkedin.com/in/karim-h-497634248', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://krglobalsolutionsltd.com/', label: 'KR Global Solutions', Icon: Globe },
  { href: 'https://www.fiverr.com/', label: 'Fiverr', Icon: Handshake },
];

const SocialLinks: React.FC<Props> = ({ className = '', size = 36 }) => {
  const s = `${size}px`;
  const containerClass = ['flex items-center gap-2', className].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={[
            'inline-flex items-center justify-center rounded-full border transition-colors',
            'w-[--s] h-[--s] opacity-90 hover:opacity-100',
            'bg-black/5 hover:bg-black/10 border-black/10 text-gray-800',
            'dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/15 dark:text-gray-100',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'ring-black/10 dark:ring-white/20 ring-offset-white dark:ring-offset-black/20',
          ].join(' ')}
          style={{ ['--s' as any]: s }}
        >
          <span className="sr-only">{label}</span>
          <Icon className="pointer-events-none h-4 w-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
