"use client";

export default function ScrollToTop() {
  return (
    <div className="text-center mt-12">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold"
      >
        Về đầu trang
      </button>
    </div>
  );
}
