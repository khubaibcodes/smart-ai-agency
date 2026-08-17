import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-x-hidden">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
