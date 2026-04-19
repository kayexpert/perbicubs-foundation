import { ChevronDown } from 'lucide-react';
import { selectCls } from './FormField';
import FormField from './FormField';

export const SITE_PAGES = [
  { label: 'Home Page',    href: '/'             },
  { label: 'About Us',     href: '/about'         },
  { label: 'The Problem',  href: '/the-problem'   },
  { label: 'Our Solution', href: '/our-solution'  },
  { label: 'Programs',     href: '/programs'      },
  { label: 'Blog & News',  href: '/blog'          },
  { label: 'Get Involved', href: '/get-involved'  },
  { label: 'Donate Now',   href: '/donate'        },
];

interface PageLinkSelectProps {
  label: string;
  value: string;
  onChange: (href: string) => void;
  hint?: string;
}

export default function PageLinkSelect({ label, value, onChange, hint }: PageLinkSelectProps) {
  return (
    <FormField label={label} hint={hint ?? 'Choose which page this button takes the visitor to'}>
      <div className="relative">
        <select
          className={selectCls + ' pr-10'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">— Select a page —</option>
          {SITE_PAGES.map((p) => (
            <option key={p.href} value={p.href}>
              {p.label} ({p.href})
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </FormField>
  );
}
