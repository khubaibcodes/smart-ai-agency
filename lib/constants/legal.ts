import type { LegalSection } from "@/lib/types";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: "Introduction",
    paragraphs: [
      'Smart AI Solutions ("we", "us", "our") operates the website at this domain. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or submit an enquiry through our contact form.',
      "By using our website, you agree to the collection and use of information in accordance with this policy. If you disagree with any part of this policy, please do not use our website.",
    ],
  },
  {
    title: "Information We Collect",
    paragraphs: ["When you submit our contact form, we may collect:"],
    list: [
      "Your name (first and last)",
      "Your email address",
      "Your company or organisation name (optional)",
      "The service you are interested in",
      "Your estimated budget range (optional)",
      "Your project description / message",
    ],
  },
  {
    title: "How We Use Your Information",
    paragraphs: ["We use the information you provide to:"],
    list: [
      "Respond to your enquiry and discuss your project",
      "Send project proposals and follow-ups",
      "Improve our services and website experience",
    ],
  },
  {
    title: "Data Storage & Security",
    paragraphs: [
      "Contact form submissions are stored securely using Supabase with industry-standard encryption. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
      "We retain enquiry data only as long as necessary to respond to your request and maintain business records.",
    ],
  },
  {
    title: "Cookies & Tracking",
    paragraphs: [
      "Our website does not use tracking cookies or third-party analytics by default. We do not use Google Analytics, Facebook Pixel, or advertising trackers unless explicitly enabled later with your consent.",
    ],
  },
  {
    title: "Your Rights",
    paragraphs: [
      "Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise any of these rights, contact us at the email below. We will respond within 30 days.",
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    title: "Agreement to Terms",
    paragraphs: [
      "By accessing or using the Smart AI Solutions website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or engage our services.",
    ],
  },
  {
    title: "Services",
    paragraphs: [
      "Smart AI Solutions provides AI automation consulting, design, and implementation services including but not limited to RAG agents, voice AI, workflow automation, and enterprise integrations.",
      "Specific deliverables, timelines, and fees are defined in a separate project proposal or statement of work agreed before work begins.",
    ],
  },
  {
    title: "Client Responsibilities",
    paragraphs: ["When engaging our services, you agree to:"],
    list: [
      "Provide accurate project information and timely feedback",
      "Ensure you have rights to any data or systems you ask us to integrate",
      "Maintain appropriate access credentials and approvals for third-party tools",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "Unless otherwise agreed in writing, custom deliverables created specifically for your project become your property upon full payment. We retain rights to our pre-existing tools, frameworks, and general methodologies.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "Our services are provided on a best-effort basis within agreed scope. We are not liable for indirect, incidental, or consequential damages arising from use of AI systems, third-party APIs, or integrations outside our control.",
    ],
  },
  {
    title: "Changes",
    paragraphs: [
      "We may update these Terms from time to time. Continued use of the website after changes constitutes acceptance of the updated Terms.",
    ],
  },
];
