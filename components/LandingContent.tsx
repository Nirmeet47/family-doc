"use client";
import { useState } from "react";
import {
  FileText,
  Menu,
  ArrowRight,
  Shield,
  Users,
  Cloud,
  Search,
  FileCheck,
  Smartphone,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const onLoginClick = () => router.push("/signin");
  const onSignupClick = () => router.push("/signup");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">FamilyDocs</span>
              </div>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  How it Works
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Pricing
                </a>
              </div>
            </div>
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={onLoginClick}
                className="text-blue-600 hover:text-blue-700 px-4 py-2 text-sm font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onSignupClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Features</a>
                <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-blue-600">How it Works</a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Pricing</a>
                <div className="flex space-x-2 px-3 py-2">
                  <button
                    onClick={onLoginClick}
                    className="flex-1 text-blue-600 border border-blue-600 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onSignupClick}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Family's
              <span className="text-blue-600 block">Document Vault</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Securely store, organize, and share important family documents. From birth certificates to insurance policies, keep everything in one safe place accessible to your loved ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onSignupClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                Start Managing Documents
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Family Documents
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to keep your family's important documents organized, secure, and accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description: "Your documents are protected with enterprise-level encryption and security protocols."
              },
              {
                icon: Users,
                title: "Family Sharing",
                description: "Safely share documents with family members and control who can access what."
              },
              {
                icon: Cloud,
                title: "Cloud Backup",
                description: "Automatic backups ensure your documents are never lost, accessible from anywhere."
              },
              {
                icon: Search,
                title: "Smart Search",
                description: "Find any document instantly with powerful search and tagging features."
              },
              {
                icon: FileCheck,
                title: "Document Verification",
                description: "Verify document authenticity and track expiration dates automatically."
              },
              {
                icon: Smartphone,
                title: "Mobile Access",
                description: "Access your documents on any device, anywhere, anytime with our mobile app."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-blue-50 rounded-2xl p-8 hover:bg-blue-100 transition-colors">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Steps to Get Started
            </h2>
            <p className="text-xl text-gray-600">
              Get your family documents organized in just a few minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              {
                step: "1",
                title: "Create Your Account",
                description: "Sign up and create your secure family vault in seconds."
              },
              {
                step: "2",
                title: "Upload Documents",
                description: "Drag and drop your important documents or scan them with your phone."
              },
              {
                step: "3",
                title: "Organize & Share",
                description: "Tag, categorize, and share documents with family members safely."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Secure Your Family's Documents?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of families who trust FamilyDocs to keep their important documents safe and organized.
          </p>
          <button
            onClick={onSignupClick}
            className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started For Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">FamilyDocs</span>
              </div>
              <p className="text-gray-400 mb-4">
                The secure way to manage and share your family's important documents.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FamilyDocs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}