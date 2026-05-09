import { useState, useEffect } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Toast from "./Toast";

function Home({ showToast }) {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-slate-800 to-slate-600 p-10 text-white shadow-xl">
      <h1 tabIndex="-1" className="page-title mb-4 text-4xl font-bold outline-none">
        Welcome to NovaShop
      </h1>
      <p className="mb-6 max-w-xl text-slate-200">
        Discover stylish products at great prices. Fast checkout and simple shopping.
      </p>
      <button
        onClick={() => showToast("Welcome back!")}
        className="rounded-lg bg-slate-500 px-5 py-3 font-semibold bg-slate-500 hover:bg-slate-400"
      >
        Explore Deals
      </button>
    </section>
  );
}

function Products({ showToast }) {
  const items = [
    { id: 1, name: "Wireless Headphones", price: "$79" },
    { id: 2, name: "Smart Lamp", price: "$49" },
    { id: 3, name: "Portable Speaker", price: "$59" },
  ];

 const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
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
    <section>
  <h1 tabIndex="-1" className="page-title mb-6 text-3xl font-bold text-slate-800 outline-none">
          Products
        </h1>
        <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
    <div key={item.id} className="rounded-xl border bg-white p-5 shadow">
      <h2 className="text-lg font-semibold">{item.name}</h2>
      <p className="mb-4 text-slate-600">{item.price}</p>
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
    </section>
  );
}

function Contact({ showToast }) {
  // Стан для зберігання помилок
  const [errors, setErrors] = useState({ name: "", email: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    
    let newErrors = { name: "", email: "" };
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
    <section className="max-w-xl">
      <h1 tabIndex="-1" className="page-title mb-6 text-3xl font-bold text-slate-800 outline-none">
        Contact
      </h1>
      
      <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-xl bg-white p-6 shadow">
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
          <div 
            id="name-error" 
            aria-live="assertive" 
            className="mt-1 text-sm font-bold text-red-600"
          >
            {errors.name && <span>⚠️ {errors.name}</span>}
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
          <div 
            id="email-error" 
            aria-live="assertive" 
            className="mt-1 text-sm font-bold text-red-600"
          >
            {errors.email && <span>⚠️ {errors.email}</span>}
          </div>
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
        
        <button
          type="submit"
          className="w-full rounded-md bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 transition-colors focus:ring-4 focus:ring-blue-200 outline-none"
        >
          Submit Message
        </button>
      </form>
    </section>
  );
}

export default function App() {
  const [toast, setToast] = useState({ show: false, message: "" });
  const location = useLocation();
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
    <div className="min-h-screen bg-slate-100">
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
  );
}
