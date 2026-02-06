import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, ArrowLeft, Sparkles, Target, Heart, Lightbulb, TrendingUp, Shield, Users, Zap, Droplets, Recycle } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white shadow-lg transform group-hover:scale-105 transition-transform">
                <Leaf size={24} />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  GreenGrid<span className="text-green-600">AI</span>
                </span>
                <p className="text-xs text-slate-500 font-medium">Intelligent Sustainability</p>
              </div>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-slate-700 font-medium group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - More Personal */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 opacity-70"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(203 213 225 / 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-200 text-green-700 text-sm font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              Built for Campus Sustainability
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Rethinking Resource Management<br/>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                One Campus at a Time
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              GreenGrid AI transforms how educational institutions manage energy, water, and waste through
              real-time monitoring, predictive analytics, and actionable insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story - More Human Touch */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-green-100 rounded-2xl">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Why We Built This</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  After witnessing countless campuses struggle with rising energy costs, water waste, and inefficient
                  operations, we knew there had to be a better way. GreenGrid AI started as a simple dashboard but
                  evolved into a comprehensive platform that empowers facility managers with the intelligence they need.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6">
                <Target className="w-10 h-10 mx-auto mb-3 text-green-600" />
                <h3 className="font-bold text-slate-900 mb-2">Our Mission</h3>
                <p className="text-sm text-slate-600">Making sustainability measurable and actionable for every facility</p>
              </div>
              <div className="text-center p-6">
                <Lightbulb className="w-10 h-10 mx-auto mb-3 text-amber-600" />
                <h3 className="font-bold text-slate-900 mb-2">Our Approach</h3>
                <p className="text-sm text-slate-600">Combining AI with practical insights that drive real change</p>
              </div>
              <div className="text-center p-6">
                <TrendingUp className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <h3 className="font-bold text-slate-900 mb-2">Our Goal</h3>
                <p className="text-sm text-slate-600">Helping institutions reduce their environmental footprint by 40%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Features */}
      <section id="features" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Makes Us Different</h2>
            <p className="text-lg text-slate-600">
              We don't just monitor—we predict, optimize, and help you take action
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl opacity-0 group-hover:opacity-100 transition blur"></div>
              <div className="relative bg-white p-8 rounded-2xl border border-slate-200 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Energy</h3>
                <p className="text-slate-600 mb-4">
                  Predict peak loads before they happen. Automatically optimize HVAC based on occupancy.
                  Integrate with solar to maximize green energy usage.
                </p>
                <div className="text-sm font-semibold text-orange-600">
                  Avg. 30% cost reduction →
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition blur"></div>
              <div className="relative bg-white p-8 rounded-2xl border border-slate-200 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4">
                  <Droplets className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Water Intelligence</h3>
                <p className="text-slate-600 mb-4">
                  Detect leaks in real-time with 89% accuracy. Schedule pumps during off-peak hours.
                  Track rainwater harvesting potential automatically.
                </p>
                <div className="text-sm font-semibold text-blue-600">
                  Avg. 25% water saved →
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 transition blur"></div>
              <div className="relative bg-white p-8 rounded-2xl border border-slate-200 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <Recycle className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Waste Optimization</h3>
                <p className="text-slate-600 mb-4">
                  Forecast generation patterns. Optimize collection routes. Gamify sustainability
                  with building-level competitions.
                </p>
                <div className="text-sm font-semibold text-green-600">
                  40% efficiency boost →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology - Cleaner Design */}
      <section id="technology" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Built on Proven Technology</h2>
              <p className="text-lg text-slate-600">Modern stack, reliable infrastructure</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-px h-12 bg-gradient-to-b from-blue-600 to-cyan-600"></div>
                  <h3 className="text-2xl font-bold text-slate-900">Frontend</h3>
                </div>
                <div className="space-y-3">
                  {['React 18 + Hooks', 'TailwindCSS Design System', 'Chart.js Visualizations', 'Framer Motion'].map((tech) => (
                    <div key={tech} className="flex items-center gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      <span className="font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border-2 border-green-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-px h-12 bg-gradient-to-b from-green-600 to-emerald-600"></div>
                  <h3 className="text-2xl font-bold text-slate-900">Backend</h3>
                </div>
                <div className="space-y-3">
                  {['Node.js + Express API', 'PostgreSQL Database', 'Sequelize ORM', 'JWT Security'].map((tech) => (
                    <div key={tech} className="flex items-center gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                      <span className="font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact - Real Numbers */}
      <section id="impact" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">The Impact We're Creating</h2>
              <p className="text-lg text-slate-600">Real results from real deployments</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Shield className="w-10 h-10 mx-auto mb-4 text-green-600" />
                <div className="text-4xl font-bold text-slate-900 mb-2">30%</div>
                <div className="text-sm font-semibold text-slate-600">Energy Reduction</div>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Droplets className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                <div className="text-4xl font-bold text-slate-900 mb-2">25%</div>
                <div className="text-sm font-semibold text-slate-600">Water Savings</div>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <TrendingUp className="w-10 h-10 mx-auto mb-4 text-emerald-600" />
                <div className="text-4xl font-bold text-slate-900 mb-2">40%</div>
                <div className="text-sm font-semibold text-slate-600">Carbon Cut</div>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Users className="w-10 h-10 mx-auto mb-4 text-purple-600" />
                <div className="text-4xl font-bold text-slate-900 mb-2">Real</div>
                <div className="text-sm font-semibold text-slate-600">Time Insights</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.1]"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
              <p className="text-xl mb-8 text-green-50">
                Join educational institutions leading the sustainability revolution
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard"
                  className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-xl inline-flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  Explore Dashboard
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition-colors border-2 border-white/20"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                <Leaf size={20} />
              </div>
              <span className="text-xl font-bold">GreenGrid<span className="text-green-400">AI</span></span>
            </div>
            <p className="text-slate-400 mb-6">
              Making sustainability intelligent, one campus at a time
            </p>
            <p className="text-slate-500 text-sm">
              © 2026 GreenGrid AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
