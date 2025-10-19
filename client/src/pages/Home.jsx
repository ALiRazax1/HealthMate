import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* 🧭 Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-green-700">HealthMate</h1>
          <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <a href="#home" className="hover:text-green-700 transition">
              Home
            </a>
            <a href="#features" className="hover:text-green-700 transition">
              Features
            </a>
            <a href="#how" className="hover:text-green-700 transition">
              How It Works
            </a>
            <a href="#testimonials" className="hover:text-green-700 transition">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <a
              href="/signin"
              className="px-4 py-2 border border-green-600 text-green-700 rounded-xl hover:bg-green-50 transition"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Register
            </a>
          </div>
        </div>
      </header>

      {/* 🌟 Hero Section */}
      <section
        id="home"
        className="pt-28 bg-gradient-to-r from-green-100 to-green-50 py-16 md:py-24 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 leading-tight">
            HealthMate <span className="text-gray-900">– Sehat ka Smart Dost</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            AI-powered health companion that helps you understand your medical
            reports, track your vitals, and stay informed — in English & Roman Urdu.
          </p>
          <a
            href="/register"
            className="mt-6 inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-lg transition"
          >
            Get Started
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mt-10 md:mt-0"
        >
          <img
            src="https://images.unsplash.com/photo-1588776814546-23efc4b4b2c0?auto=format&fit=crop&w=900&q=80"
            alt="Health"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
        </motion.div>
      </section>

      {/* 💡 Features */}
      <section id="features" className="py-16 bg-white px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12">
          Why Choose HealthMate?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Upload Reports",
              desc: "Safely upload all your test reports and prescriptions in one place.",
              img: "https://images.unsplash.com/photo-1588776814614-5e7c4d3a5416?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "AI-Powered Explanations",
              desc: "Gemini AI explains your reports in simple English and Roman Urdu.",
              img: "https://images.unsplash.com/photo-1613053340802-5b9b67958f79?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Track Your Health",
              desc: "Add vitals like BP, Sugar, and Weight to track your daily health progress.",
              img: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-green-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img src={f.img} alt={f.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-700">{f.title}</h3>
                <p className="mt-2 text-gray-600">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ⚙️ How It Works */}
      <section id="how" className="bg-green-100 py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12">
          How HealthMate Works
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            "Register & Login",
            "Upload Report or Add Vitals",
            "Gemini Analyzes & Summarizes",
            "View Easy Bilingual Explanation",
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <span className="text-4xl font-bold text-green-600">{i + 1}</span>
              <p className="mt-3 text-gray-700 font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section id="testimonials" className="py-16 bg-white px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12">
          What Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Ali Khan",
              feedback:
                "HealthMate ne meri reports ko samajhna itna easy bana diya, ab doctor ke paas jaate hue main confident hota hoon!",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Sara Ahmed",
              feedback:
                "Roman Urdu explanation ne meri amma ko reports samajhne me madad ki. Bohat useful app!",
              img: "https://randomuser.me/api/portraits/women/68.jpg",
            },
            {
              name: "Ahmed Raza",
              feedback:
                "AI summaries aur questions doctor se baat karne me bohot help karte hain. Loved it!",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-green-50 rounded-2xl shadow-lg p-6 text-center"
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-700 italic">“{t.feedback}”</p>
              <h4 className="mt-3 font-semibold text-green-700">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌍 Footer */}
      <footer className="bg-green-700 text-white py-10 px-6 md:px-16 text-center">
        <h3 className="text-2xl font-bold mb-2">HealthMate</h3>
        <p className="text-green-100">
          Your AI-powered Sehat ka Smart Dost. Stay informed. Stay healthy.
        </p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
        </div>
        <p className="mt-6 text-green-200 text-sm">
          © {new Date().getFullYear()} HealthMate. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
