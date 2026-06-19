import { Card } from "@/components/ui";

const faqs = [
  { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay." },
  { q: "How long does shipping take?", a: "Orders placed before 2 PM EST ship same day. Standard delivery takes 3-5 business days." },
  { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee on all components." },
  { q: "Do you offer bulk pricing?", a: "Yes, contact our sales team for volume discounts on orders of 50+ units." },
];

export default function SupportPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold" style={{ color: "var(--fg)" }}>Support</h1>
          <p className="mt-3 text-lg" style={{ color: "var(--fg-muted)" }}>How can we help you today?</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i} variant="outlined" padding="md">
              <h3 className="font-semibold mb-2" style={{ color: "var(--fg)" }}>{faq.q}</h3>
              <p className="text-sm" style={{ color: "var(--fg-muted)" }}>{faq.a}</p>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center p-8 rounded-3xl" style={{ background: "var(--card)" }}>
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--fg)" }}>Still need help?</h2>
          <p className="mb-6" style={{ color: "var(--fg-muted)" }}>Our engineering team is ready to assist you</p>
          <a
            href="mailto:support@q9labs.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-colors"
            style={{ background: "var(--accent)" }}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
