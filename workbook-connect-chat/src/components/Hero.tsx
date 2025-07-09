
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, FileText, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Streamline Academic 
              <span className="text-blue-600"> Communication</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              WorkBook is a web-based platform designed to make communication between students and teachers easier and more effective. Say goodbye to scattered WhatsApp groups and endless email chains.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-3" onClick={() => window.location.href = '/login'}>
                Start Collaborating
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3" onClick={() => window.location.href = '/login'}>
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>10,000+ Active Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>500+ Schools</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Class Discussion</h3>
                    <p className="text-sm text-gray-500">Mathematics 101</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">Quick question about today's assignment...</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 ml-8">
                    <p className="text-sm text-gray-700">Here's the solution approach...</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Assignment_Solutions.pdf</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 rounded-xl p-4 shadow-lg">
              <Zap className="h-8 w-8 text-yellow-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
