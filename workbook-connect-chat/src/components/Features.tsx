
import React from 'react';
import { MessageSquare, FileText, Users, Zap, Shield, Globe } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Real-Time Messaging',
      description: 'Instant communication with students and teachers in organized group chats.'
    },
    {
      icon: FileText,
      title: 'Document Sharing',
      description: 'Upload and share documents, images, and resources directly in conversations.'
    },
    {
      icon: Users,
      title: 'Group Collaboration',
      description: 'Create dedicated spaces for classes, projects, and study groups.'
    },
    {
      icon: Zap,
      title: 'Instant Notifications',
      description: 'Stay updated with real-time alerts for important messages and announcements.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your academic conversations and files are protected with enterprise-grade security.'
    },
    {
      icon: Globe,
      title: 'Web-Based Access',
      description: 'Access from any device with a web browser - no downloads required.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Academic Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            WorkBook combines the best features of modern communication tools with the structure and focus needed for educational environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
