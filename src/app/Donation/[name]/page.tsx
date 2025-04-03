import React, { useState } from 'react';
import { Heart, Menu, X, Facebook, Instagram, Linkedin, CreditCard, DollarSign } from 'lucide-react';

function Donation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');

  const predefinedAmounts = [10, 25, 50, 100];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-rose-500" />
              <span className="ml-2 text-xl font-semibold">CharityHope</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Projects</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900">About</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Projects</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Difference Today</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your generosity can change lives. Every donation helps us continue our mission
              to create positive impact in communities around the world.
            </p>
          </div>

          {/* Donation Section */}
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Donation Amount</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setDonationAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`py-3 px-4 rounded-lg border ${
                    donationAmount === amount && customAmount === ''
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-gray-300 hover:border-rose-500'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="mb-8">
              <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-2">
                Custom Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  id="custom-amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setDonationAmount(0);
                  }}
                  className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <button className="w-full bg-rose-500 text-white py-3 px-4 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Donate Now
            </button>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Your donation is secure and encrypted</p>
            </div>
          </div>

          {/* Impact Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-rose-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">10,000+</h3>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
            <div className="text-center">
              <div className="bg-rose-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">50+</h3>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="bg-rose-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">25+</h3>
              <p className="text-gray-600">Countries Reached</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 text-center py-6 mt-12">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-pink-600 hover:text-pink-800">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <Linkedin size={24} />
          </a>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Human Team Foundation. All rights reserved.</p>
      </footer>
      
              
            
    </div>
  );
}

export default Donation;