import React from 'react';
import { Sparkles, Heart, Users, ShoppingBag } from 'lucide-react';

export default function WomanEmpowerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">NEKIMART</h1>
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="text-2xl md:text-3xl text-center font-light italic">Goodness of Womanhood</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* Image Placeholder Section */}
        <section className="relative">
          <div className="relative h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Users className="w-24 h-24 mx-auto text-blue-600 mb-4" />
                <p className="text-2xl font-semibold text-blue-800">Celebrating Women Everywhere</p>
                <p className="text-blue-600 mt-2">Image Placeholder</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
          </div>
        </section>

        {/* About Women Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Heart className="w-10 h-10 text-cyan-500" />
              <h2 className="text-4xl font-bold text-gray-800">The Power of Womanhood</h2>
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Women are the pillars of strength, compassion, and resilience. They nurture families, build communities, and drive progress across every sphere of life. From ancient wisdom to modern innovation, women have shaped civilizations and continue to inspire generations.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every woman carries within her the power to create, transform, and elevate. Her grace, determination, and boundless energy are forces that deserve celebration every single day. When we empower women, we empower the world.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Strength</h3>
              <p className="text-gray-600">Unwavering resilience in every challenge</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-cyan-500">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Compassion</h3>
              <p className="text-gray-600">Infinite kindness that heals hearts</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-sky-500">
              <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Leadership</h3>
              <p className="text-gray-600">Guiding with wisdom and vision</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600">Creating tomorrow's solutions today</p>
            </div>
          </div>
        </section>

        {/* About Nekimart Section */}
        <section className="bg-white rounded-3xl p-12 shadow-2xl border-t-4 border-blue-600">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <div className="flex items-center gap-3 mb-4 justify-center">
                <ShoppingBag className="w-10 h-10 text-blue-600" />
                <h2 className="text-4xl font-bold text-gray-800">About Nekimart</h2>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Nekimart is more than just a marketplace—it's a celebration of goodness, values, and the spirit of womanhood. We believe in creating a platform where quality meets compassion, where every product tells a story of care and craftsmanship.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to empower women entrepreneurs, celebrate women consumers, and create a community built on trust, authenticity, and mutual respect. At Nekimart, we curate products that resonate with the essence of goodness—handpicked with love for women who deserve nothing but the best.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From sustainable fashion to wellness products, from artisanal crafts to modern essentials, Nekimart is your trusted companion in life's beautiful journey. We stand for quality, ethics, and the celebration of feminine strength in all its forms.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <div className="px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-semibold">
                Women-Centric
              </div>
              <div className="px-6 py-3 bg-cyan-100 text-cyan-700 rounded-full font-semibold">
                Quality First
              </div>
              <div className="px-6 py-3 bg-sky-100 text-sky-700 rounded-full font-semibold">
                Ethical & Sustainable
              </div>
              <div className="px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-semibold">
                Community Driven
              </div>
            </div>
          </div>
        </section>

        {/* YouTube Video Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-800">Discover Nekimart</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded mx-auto"></div>
            <p className="text-lg text-gray-600">Watch our story and vision come to life</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-3xl shadow-2xl bg-gray-900 border-4 border-blue-500">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Nekimart Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Replace the YouTube video ID in the embed URL with your actual Nekimart video
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-cyan-700 text-white py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-2xl font-bold mb-2">NEKIMART</p>
          <p className="text-blue-200 italic">Where Goodness Meets Grace</p>
          <p className="text-sm text-blue-300 mt-4">Celebrating the strength and beauty of womanhood</p>
        </div>
      </footer>
    </div>
  );
}