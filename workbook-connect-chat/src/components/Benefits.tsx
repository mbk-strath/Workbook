
import React from 'react';
import { CheckCircle, X, ArrowRight } from 'lucide-react';

export const Benefits = () => {
  const benefits = [
    {
      title: 'Eliminates Informal and Unstructured Communication',
      problem: 'Students and teachers rely on WhatsApp or social media groups, which lack academic focus and can be distracting.',
      solution: 'WorkBook offers a professional, distraction-free platform tailored for education, keeping conversations relevant and organized.'
    },
    {
      title: 'Replaces Inefficient Email Chains',
      problem: 'Email threads are slow, formal, and hard to follow for quick academic discussions or collaboration.',
      solution: 'Real-time group chats enable instant communication and quick decision-making without the formality of email.'
    },
    {
      title: 'Centralizes Resources',
      problem: 'Files, notes, and links are scattered across apps, emails, and devices.',
      solution: 'WorkBook allows users to upload and access documents and images within the chat, keeping everything in one place.'
    },
    {
      title: 'Improves Collaboration',
      problem: 'Group work often lacks a central space to discuss ideas and track progress.',
      solution: 'Students and teachers can easily form and join group chats dedicated to specific subjects, classes, or projects.'
    },
    {
      title: 'Simplifies Class Communication',
      problem: 'Teachers struggle to communicate announcements or updates to all students efficiently.',
      solution: 'Broadcast-style messages and organized group channels make it easy for teachers to reach everyone at once.'
    },
    {
      title: 'Enhances Accessibility and Ease of Use',
      problem: 'Some platforms are too complex or require constant switching between tools.',
      solution: 'WorkBook is web-based and intuitive, so users can access it from any device without needing to install or learn multiple apps.'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose WorkBook?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've identified the key problems in academic communication and built solutions that actually work.
          </p>
        </div>

        <div className="space-y-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{benefit.title}</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="font-semibold text-red-700">The Problem</span>
                  </div>
                  <p className="text-gray-600 pl-8">{benefit.problem}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="font-semibold text-green-700">Our Solution</span>
                  </div>
                  <p className="text-gray-600 pl-8">{benefit.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
