import api from "../../utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/products")
      .then((res) => {
        const body = res.data;
        const list = Array.isArray(body?.data) ? body.data : (Array.isArray(body) ? body : []);
        const items = list.slice(0, 8);
        setFeatured(items);
      })
      .catch(() => {
        setFeatured([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full bg-gray-200">
      {/* Hero */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img src="/bg.jpg" alt="Audio gear background" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Premium Audio Rentals for Every Event
          </h1>
          <p className="mt-4 text-sm md:text-lg max-w-2xl mx-auto">
            From intimate gatherings to large concerts—rent speakers, mixers, microphones, lighting, and more.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/items" className="px-5 py-3 rounded-md bg-accent text-white hover:opacity-90 transition">
              Browse Gear
            </Link>
            <Link to="/booking" className="px-5 py-3 rounded-md bg-white text-accent hover:bg-gray-100 transition">
              Quick Book
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-accent">Pro-Grade Equipment</h3>
            <p className="mt-2 text-gray-600">Top brands, maintained and tested before every rental.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-accent">Flexible Packages</h3>
            <p className="mt-2 text-gray-600">Daily, weekend, and weekly plans tailored to your needs.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-accent">Setup & Support</h3>
            <p className="mt-2 text-gray-600">Optional delivery, setup, and on-site tech assistance.</p>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-accent">Featured Rentals</h2>
            <Link to="/items" className="text-black border-2 border-black hover:bg-black hover:text-white transition p-2 inline-flex items-center rounded-2xl">View all
              <FaArrowAltCircleRight className="ml-2" />
            </Link>
          </div>

          {loading && (
            <div className="w-full h-[160px] flex items-center justify-center">
              <div className="w-[50px] h-[50px] border-4 rounded-full border-t-accent animate-spin" />
            </div>
          )}

          {!loading && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featured.map((item) => (
                <Link
                  key={item.key}
                  to={`/product/${item.key}`}
                  className="group bg-gray-900 rounded-lg shadow overflow-hidden hover:shadow-lg transition"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                    <img
                      src={(item.image?.[0] || item.image || item.images?.[0] || "/logo.png").replace(/^https?:\/\/https?:\/\//i, "https://")}
                      alt={item.name}
                      className="w-full h-full object-center group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                    <p className="text-xl text-gray-300 line-clamp-1">{item.category}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-green-600 font-semibold">Rs. {item.price}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${item.availability ? "bg-green-200 text-green-900 font-bold" : "bg-red-100 text-red-700 font-bold"}`}>
                        {item.availability ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 bg-gray-900 rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Need help picking the right setup?</h3>
            <p className="mt-2 text-white/90">Talk to our rental specialists for a custom recommendation.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="px-5 py-3 bg-white text-accent rounded-md hover:bg-gray-100 transition">Contact Us</Link>
            <Link to="/booking" className="px-5 py-3 bg-black/20 border border-white/30 rounded-md hover:bg-black/10 transition">Book Now</Link>
          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-8" />
    </div>
  );
}
