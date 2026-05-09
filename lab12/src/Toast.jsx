export default function Toast({ message, isVisible }) {
  return (
    <div 
      role="status" 
      aria-live="polite" 
      aria-atomic="true"
      className={`fixed bottom-6 right-6 z-50 rounded-lg px-6 py-3 text-white shadow-2xl transition-opacity duration-300 ${
        isVisible ? "opacity-100 bg-slate-800" : "opacity-0 pointer-events-none"
      }`}
    >
      {message}
    </div>
  );
}