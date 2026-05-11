import { useState, useEffect } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import {A11yPanel} from './context/A11yPanel/A11yPanel';
import Toast from "./Toast";
import './App.css';

function Home({ showToast }) {
  const quickLinks = [
    { href: "#about-store", text: "About NovaShop" },
    { href: "#weekly-highlights", text: "Weekly Highlights" },
    { href: "#community-news", text: "Community News" },
    { href: "#support-links", text: "Support Links" },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-slate-800 to-slate-600 p-10 text-white shadow-xl">
        <h1 tabIndex="-1" className="page-title mb-4 text-4xl font-bold outline-none">
          Welcome to NovaShop
        </h1>
        <p className="mb-6 max-w-3xl text-slate-200">
          NovaShop is a demo marketplace with rich content designed for accessibility testing. Here
          you can browse long and short paragraphs, links, interactive controls, mixed text styles,
          and animated elements.
        </p>
        <div className="mb-6 flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md border border-slate-200/30 bg-slate-700/40 px-3 py-2 text-sm hover:bg-slate-700"
            >
              {link.text}
            </a>
          ))}
        </div>
        <button
          onClick={() => showToast("Welcome back! Explore weekly offers below.")}
          className="rounded-lg bg-slate-500 px-5 py-3 font-semibold hover:bg-slate-400"
        >
          Explore Deals
        </button>
      </section>

      <section id="about-store" className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">About NovaShop</h2>
        <p className="mb-4 text-slate-700">
          NovaShop helps people discover home and tech products with simple filtering, quick
          checkout, and friendly support. This page intentionally includes rich text blocks to test
          larger font sizes, wider line spacing, and letter spacing adjustments.
        </p>
        <p className="text-slate-700">
          Many shoppers prefer higher contrast, uppercase text transformation, or custom alignment
          settings while reading. This content is prepared to make those differences clearly visible
          during accessibility panel demos.
        </p>
      </section>

      <section id="weekly-highlights" className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Weekly Highlights</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-2 text-xl font-semibold">Workspace Comfort</h3>
            <p className="mb-3 text-slate-700">
              Ergonomic lamp collections and monitor accessories are now 15% off.
            </p>
            <a className="font-medium text-blue-700 underline" href="https://example.com/comfort">
              Read collection details
            </a>
          </article>
          <article className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-2 text-xl font-semibold">Audio Essentials</h3>
            <p className="mb-3 text-slate-700">
              New wireless devices with extended battery life and easier touch controls.
            </p>
            <a className="font-medium text-blue-700 underline" href="https://example.com/audio">
              Compare best sellers
            </a>
          </article>
          <article className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-2 text-xl font-semibold">Smart Home Picks</h3>
            <p className="mb-3 text-slate-700">
              Compact products focused on energy savings and remote accessibility.
            </p>
            <a className="font-medium text-blue-700 underline" href="https://example.com/home">
              Open smart home guide
            </a>
          </article>
        </div>
      </section>

      <section id="community-news" className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">Community News</h2>
        <p className="mb-4 text-slate-700">
          Our local meetup hosts live product demos every Thursday at 18:00. The event block below
          includes motion so the future panel can demonstrate pause-animation behavior.
        </p>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="mb-2 text-blue-900">Next live stream starts in:</p>
          <span className="inline-block rounded bg-blue-700 px-3 py-2 font-mono text-lg font-bold text-white animate-pulse">
            02d : 06h : 14m
          </span>
        </div>
      </section>

      <section id="support-links" className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Support and Policies</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <a className="text-blue-700 underline" href="https://example.com/help-center">
              Help Center
            </a>
          </li>
          <li>
            <a className="text-blue-700 underline" href="https://example.com/shipping">
              Shipping Information
            </a>
          </li>
          <li>
            <a className="text-blue-700 underline" href="https://example.com/refund-policy">
              Refund Policy
            </a>
          </li>
          <li>
            <a className="text-blue-700 underline" href="https://example.com/accessibility">
              Accessibility Statement
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

function Products({ showToast }) {
  const items = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$79",
      rating: "4.8",
      stock: "In stock",
      description: "Noise-reduction profile with lightweight frame for long sessions.",
    },
    {
      id: 2,
      name: "Smart Lamp",
      price: "$49",
      rating: "4.6",
      stock: "Low stock",
      description: "Warm and cool light presets with voice command support.",
    },
    {
      id: 3,
      name: "Portable Speaker",
      price: "$59",
      rating: "4.7",
      stock: "In stock",
      description: "Compact build with deep bass and splash-resistant coating.",
    },
    {
      id: 4,
      name: "Ergonomic Mouse",
      price: "$39",
      rating: "4.5",
      stock: "In stock",
      description: "Contoured shape to reduce wrist strain during daily work.",
    },
    {
      id: 5,
      name: "USB-C Hub",
      price: "$29",
      rating: "4.4",
      stock: "Backorder",
      description: "Seven ports for display output, charging, and data transfer.",
    },
    {
      id: 6,
      name: "Desk Mat",
      price: "$24",
      rating: "4.9",
      stock: "In stock",
      description: "Large anti-slip surface designed for keyboard and mouse.",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="flex items-center justify-center p-10"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <span className="sr-only">Loading products...</span>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <h1 tabIndex="-1" className="page-title mb-1 text-3xl font-bold text-slate-800 outline-none">
        Products
      </h1>
      <p className="max-w-3xl text-slate-700">
        This page combines cards, table data, buttons, and links so you can validate text scaling,
        contrast presets, highlighted headings, and link emphasis.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border bg-white p-5 shadow">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="mb-2 text-slate-600">{item.description}</p>
            <p className="text-slate-700">
              Price: <strong>{item.price}</strong>
            </p>
            <p className="text-slate-700">Rating: {item.rating} / 5</p>
            <p className="mb-4 text-slate-700">Availability: {item.stock}</p>
            <button
              onClick={() => showToast(`${item.name} added to cart`)}
              aria-label={`Buy ${item.name} for ${item.price}`}
              className="rounded-md bg-yellow-400 px-4 py-2 font-bold text-black hover:bg-yellow-500"
            >
              Buy
            </button>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl bg-white p-4 shadow">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">Specification Overview</h2>
        <table className="min-w-full border-collapse text-left text-sm">
          <caption className="mb-2 text-left text-slate-600">
            Product comparison table for contrast and text-alignment testing.
          </caption>
          <thead>
            <tr className="border-b border-slate-300">
              <th className="px-2 py-2 font-semibold text-slate-900">Product</th>
              <th className="px-2 py-2 font-semibold text-slate-900">Battery</th>
              <th className="px-2 py-2 font-semibold text-slate-900">Weight</th>
              <th className="px-2 py-2 font-semibold text-slate-900">Connectivity</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="px-2 py-2">Wireless Headphones</td>
              <td className="px-2 py-2">40 hours</td>
              <td className="px-2 py-2">250 g</td>
              <td className="px-2 py-2">Bluetooth 5.3</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="px-2 py-2">Portable Speaker</td>
              <td className="px-2 py-2">18 hours</td>
              <td className="px-2 py-2">620 g</td>
              <td className="px-2 py-2">Bluetooth / AUX</td>
            </tr>
            <tr>
              <td className="px-2 py-2">Smart Lamp</td>
              <td className="px-2 py-2">AC powered</td>
              <td className="px-2 py-2">530 g</td>
              <td className="px-2 py-2">Wi-Fi / App</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Contact({ showToast }) {
  const [errors, setErrors] = useState({ name: "", email: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");

    const newErrors = { name: "", email: "" };
    let hasError = false;

    if (!name || name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
      hasError = true;
    }

    if (!email || !email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({ name: "", email: "" });
    showToast("Message sent successfully!");
    event.target.reset();
  };

  return (
    <section className="space-y-8">
      <h1 tabIndex="-1" className="page-title mb-6 text-3xl font-bold text-slate-800 outline-none">
        Contact
      </h1>

      <p className="max-w-3xl text-slate-700">
        This form contains validation states, helper text, and varied controls for accessibility
        panel testing. Try different text transformations, contrast modes, and spacing settings.
      </p>

      <form onSubmit={handleSubmit} noValidate className="max-w-2xl space-y-4 rounded-xl bg-white p-6 shadow">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full rounded-md border p-2 outline-none transition-all focus:ring-2 ${
              errors.name ? "border-red-500 ring-red-200" : "border-slate-300 focus:ring-blue-500"
            }`}
          />
          <div id="name-error" aria-live="assertive" className="mt-1 text-sm font-bold text-red-600">
            {errors.name && <span>{errors.name}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full rounded-md border p-2 outline-none transition-all focus:ring-2 ${
              errors.email ? "border-red-500 ring-red-200" : "border-slate-300 focus:ring-blue-500"
            }`}
          />
          <div id="email-error" aria-live="assertive" className="mt-1 text-sm font-bold text-red-600">
            {errors.email && <span>{errors.email}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="topic" className="mb-1 block text-sm font-medium text-slate-700">
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            className="w-full rounded-md border border-slate-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="general"
          >
            <option value="general">General question</option>
            <option value="delivery">Delivery and tracking</option>
            <option value="payments">Payments and invoices</option>
            <option value="returns">Returns and exchanges</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full rounded-md border border-slate-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        <fieldset className="rounded-md border border-slate-200 p-3">
          <legend className="px-1 text-sm font-semibold text-slate-700">Preferred response</legend>
          <div className="mt-2 flex flex-wrap gap-4 text-slate-700">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="reply" value="email" defaultChecked />
              Email
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="reply" value="phone" />
              Phone
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="reply" value="chat" />
              Chat
            </label>
          </div>
        </fieldset>

        <label className="inline-flex items-center gap-2 text-slate-700">
          <input type="checkbox" name="updates" />
          Send me product updates and special offers
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-700 px-5 py-3 font-bold text-white outline-none transition-colors hover:bg-blue-800 focus:ring-4 focus:ring-blue-200"
        >
          Submit Message
        </button>
      </form>

      <section className="max-w-2xl rounded-xl bg-white p-6 shadow">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">Contact Details</h2>
        <address className="not-italic text-slate-700">
          NovaShop Support Center
          <br />
          27 Market Street, Suite 410
          <br />
          Kyiv, Ukraine
          <br />
          <a className="text-blue-700 underline" href="mailto:support@novashop.test">
            support@novashop.test
          </a>
          <br />
          <a className="text-blue-700 underline" href="tel:+380441234567">
            +380 44 123 45 67
          </a>
        </address>
      </section>
    </section>
  );
}

export default function App() {
  const [toast, setToast] = useState({ show: false, message: "" });
  const location = useLocation();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  useEffect(() => {
    const pageTitle = document.querySelector('h1[tabindex="-1"]');

    if (pageTitle) {
      pageTitle.focus();
    }

    const titleText = pageTitle ? pageTitle.innerText : "NovaShop";
    document.title = `${titleText} | NovaShop`;
  }, [location]);

  const navClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium ${
      isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-200"
    }`;

  return (
    <>
      <div className="a11y-root min-h-screen bg-slate-100">
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-6xl gap-3 p-4">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={navClass}>
              Products
            </NavLink>
            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl p-6">
          <Routes>
            <Route path="/" element={<Home showToast={showToast} />} />
            <Route path="/products" element={<Products showToast={showToast} />} />
            <Route path="/contact" element={<Contact showToast={showToast} />} />
          </Routes>
        </main>

        <Toast message={toast.message} isVisible={toast.show} />
      </div>

      <button
        className="a11y-widget-btn"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        aria-label="Open accessibility settings"
        title="Accessibility settings"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="a11y-widget-icon">
          <path
            d="M4 7h8m4 0h4M2 7a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm8 10h10M4 17h2m4 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0Zm4-5h8m-16 0h4m8 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <A11yPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
}
