import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const cols = {
  en: [
    {
      title: 'Products',
      links: [
        { label: 'Balcony Solar', to: '/balcony-system' },
        { label: 'Rooftop Solar', to: '/rooftop-system' },
        { label: 'Portable Solar', to: '/portable-system' },
        { label: 'Solar panels', to: '/solar-panel' },
      ],
    },
    {
      title: 'Learn',
      links: [
        { label: 'How it works', to: '/balcony-system' },
        { label: 'Projects', to: '/projects' },
        { label: 'Savings calculator', to: '/#calculator' },
        { label: 'FAQs', to: '/faqs' },
        { label: 'Solvio YouTube channel', href: 'https://www.youtube.com/channel/UC2Xmmij3QMf3beO2pf7Jf1g' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Solvio', to: '/about' },
        { label: 'Careers' },
        { label: 'Partners', href: 'https://wa.me/66843488428?text=Hi%20Solvio%20%E2%80%94%20I%27m%20interested%20in%20becoming%20a%20partner' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ],
  th: [
    {
      title: 'ผลิตภัณฑ์',
      links: [
        { label: 'โซลาร์ระเบียง', to: '/balcony-system' },
        { label: 'โซลาร์หลังคา', to: '/rooftop-system' },
        { label: 'โซลาร์พกพา', to: '/portable-system' },
        { label: 'แผงโซลาร์', to: '/solar-panel' },
      ],
    },
    {
      title: 'เรียนรู้',
      links: [
        { label: 'วิธีการทำงาน', to: '/balcony-system' },
        { label: 'ผลงาน', to: '/projects' },
        { label: 'คำนวณการประหยัด', to: '/#calculator' },
        { label: 'คำถามที่พบบ่อย', to: '/faqs' },
        { label: 'ช่อง YouTube ของ Solvio', href: 'https://www.youtube.com/channel/UC2Xmmij3QMf3beO2pf7Jf1g' },
      ],
    },
    {
      title: 'บริษัท',
      links: [
        { label: 'เกี่ยวกับ Solvio', to: '/about' },
        { label: 'ร่วมงานกับเรา' },
        { label: 'พาร์ทเนอร์', href: 'https://wa.me/66843488428?text=Hi%20Solvio%20%E2%80%94%20I%27m%20interested%20in%20becoming%20a%20partner' },
        { label: 'ติดต่อ', href: '#contact' },
      ],
    },
  ],
};

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="text-white" style={{ backgroundColor: '#040f08' }}>
      <div className="container-x pb-16 pt-16 max-lg:pt-12">
        <div className="grid gap-10 py-12 max-lg:pt-0 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo dark />
            <ul className="mt-5 space-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-lime" /> +66 84 348 8428
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-lime" /> sales@solvio.solar
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-lime" /> Patongo, Pa Tong, Kathu District, Phuket 83150
              </li>
            </ul>
          </div>

          {/* Products / Learn / Company — one row on mobile to save vertical space */}
          <div className="grid grid-cols-3 gap-x-4 gap-y-8 lg:col-span-3 lg:gap-10">
            {cols[lang].map((c) => (
              <div key={c.title}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => {
                    const cls = 'text-sm text-white/65 transition hover:text-lime';
                    return (
                      <li key={l.label}>
                        {l.to ? (
                          <Link to={l.to} className={cls}>{l.label}</Link>
                        ) : (
                          <a
                            href={l.href ?? '#'}
                            className={cls}
                            {...(l.href?.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                          >
                            {l.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-mono text-xs text-white/40">
            © {new Date().getFullYear()} Solvio Solar. {lang === 'th' ? 'สงวนลิขสิทธิ์' : 'All rights reserved.'}
          </p>
          <div className="flex gap-5 font-mono text-xs text-white/40">
            <a href="#" className="hover:text-white">{lang === 'th' ? 'ข้อมูลบริษัท' : 'Imprint'}</a>
            <a href="#" className="hover:text-white">{lang === 'th' ? 'ความเป็นส่วนตัว' : 'Privacy'}</a>
            <a href="#" className="hover:text-white">{lang === 'th' ? 'เงื่อนไขการใช้งาน' : 'Terms'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
