
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users } from 'lucide-react';

export const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Academic Communication?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students and educators who have already made the switch to more effective, organized communication.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3" onClick={() => window.location.href = '/login'}>
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3" onClick={() => window.location.href = '/login'}>
              Schedule Demo
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="h-8 w-8 text-blue-200" />
                <h3 className="text-xl font-semibold text-white">For Educators</h3>
              </div>
              <ul className="space-y-2 text-blue-100">
                <li>• Streamline class communication</li>
                <li>• Share resources efficiently</li>
                <li>• Organize student discussions</li>
                <li>• Track engagement and participation</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-8 w-8 text-blue-200" />
                <h3 className="text-xl font-semibold text-white">For Students</h3>
              </div>
              <ul className="space-y-2 text-blue-100">
                <li>• Stay connected with classmates</li>
                <li>• Access all course materials</li>
                <li>• Collaborate on group projects</li>
                <li>• Get quick answers from teachers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
