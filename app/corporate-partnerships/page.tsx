import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CorporatePartnershipsPage from '@/components/CorporatePartnershipsPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Partnerships | PerbiCubs Foundation',
  description:
    'Partner with PerbiCubs Foundation to help 50,000 children in Ghana become readers by 2028. USD 60 gives one child a full school year of reading.',
};

export default function CorporatePartnerships() {
  return (
    <>
      <Navbar />
      <CorporatePartnershipsPage />
      <Footer />
    </>
  );
}
