import React from 'react';
import { 
  Leaf, 
  Sprout, 
  Truck, 
  Shield, 
  Users, 
  Star, 
  Award, 
  Heart,
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface ValueCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TimelineEvent {
  year: string;
  event: string;
  description: string;
}

const AboutPage: React.FC = () => {
  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sarah Greenfield",
      role: "Founder & CEO",
      bio: "Sarah started FreshHarvest after realizing the difficulty in accessing fresh, organic produce in urban areas. With a background in sustainable agriculture, she's passionate about connecting farms directly to consumers.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Miguel Rodriguez",
      role: "Head of Procurement",
      bio: "Miguel brings 15 years of experience in agricultural supply chains. He personally visits every farm we partner with to ensure quality and sustainable practices.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Spice Master",
      bio: "Priya's family has been in the spice trade for three generations. She carefully sources and tests every spice blend to ensure authentic flavors and optimal freshness.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Chen",
      role: "Logistics Director",
      bio: "David developed our proprietary cold-chain delivery system that ensures your produce arrives as fresh as the day it was harvested.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    }
  ];

  // Company values
  const companyValues: ValueCard[] = [
    {
      icon: <Leaf className="h-10 w-10 text-green-600" />,
      title: "100% Organic",
      description: "All our produce is certified organic, grown without synthetic pesticides or fertilizers."
    },
    {
      icon: <Truck className="h-10 w-10 text-green-600" />,
      title: "Farm to Door in 24hrs",
      description: "Harvested fresh and delivered to your doorstep within 24 hours for maximum freshness."
    },
    {
      icon: <Shield className="h-10 w-10 text-green-600" />,
      title: "Quality Guarantee",
      description: "If you're not satisfied with any item, we'll refund or replace it—no questions asked."
    },
    {
      icon: <Users className="h-10 w-10 text-green-600" />,
      title: "Direct from Farmers",
      description: "We work directly with small-scale farmers, ensuring they receive fair prices for their harvest."
    },
    {
      icon: <Globe className="h-10 w-10 text-green-600" />,
      title: "Sustainable Packaging",
      description: "All our packaging is 100% biodegradable or recyclable to minimize environmental impact."
    },
    {
      icon: <Heart className="h-10 w-10 text-green-600" />,
      title: "Community Focused",
      description: "We donate 5% of our profits to local food banks and urban farming initiatives."
    }
  ];

  // Timeline data
  const timelineEvents: TimelineEvent[] = [
    {
      year: "2015",
      event: "The Beginning",
      description: "Sarah started FreshHarvest with a single farm partnership and a vision to make fresh produce accessible."
    },
    {
      year: "2017",
      event: "Spice Collection Launch",
      description: "Expanded our offerings to include ethically sourced spices from around the world."
    },
    {
      year: "2019",
      event: "National Expansion",
      description: "Launched delivery services to 15 major cities across the country."
    },
    {
      year: "2021",
      event: "Organic Certification",
      description: "Achieved 100% organic certification for all our produce and spices."
    },
    {
      year: "2023",
      event: "Carbon Neutral Delivery",
      description: "Implemented our carbon-neutral delivery initiative, offsetting 100% of delivery emissions."
    }
  ];

  // Stats data
  const stats = [
    { label: "Happy Customers", value: "50,000+", icon: <Users className="h-6 w-6" /> },
    { label: "Farm Partnerships", value: "120+", icon: <Sprout className="h-6 w-6" /> },
    { label: "Products Available", value: "450+", icon: <Leaf className="h-6 w-6" /> },
    { label: "Cities Served", value: "25+", icon: <Truck className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-linear-to-r from-green-700 to-emerald-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl md:text-2xl mb-8">
              From seed to spice, we're reimagining how fresh, organic produce reaches your kitchen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                <span>Certified Organic</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>24-Hour Delivery</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Mission: Freshness Redefined
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At FreshHarvest, we believe everyone deserves access to the freshest, most flavorful vegetables and spices. We're not just another online store—we're a bridge between conscientious farmers and passionate home cooks.
              </p>
              <p className="text-lg text-gray-600">
                Our journey began with a simple question: Why does produce lose so much flavor and nutrition between the farm and the kitchen? We've spent years perfecting a supply chain that preserves the natural goodness of every vegetable and the vibrant aroma of every spice.
              </p>
            </div>
            <div className="bg-green-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600 mb-6">
                To create a world where everyone can enjoy farm-fresh produce regardless of where they live, while supporting sustainable farming practices that protect our planet.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-600 text-white p-2 rounded-full mr-4">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Sustainable Farming</h4>
                    <p className="text-gray-600">Partnering with farms that prioritize soil health and biodiversity.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 text-white p-2 rounded-full mr-4">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Uncompromised Quality</h4>
                    <p className="text-gray-600">Every product is taste-tested and quality-checked before shipping.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 text-white p-2 rounded-full mr-4">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Community Impact</h4>
                    <p className="text-gray-600">Creating positive change in both farming communities and urban food deserts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-emerald-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-emerald-700 p-3 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-emerald-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from selecting our farmers to packaging your order.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a single farm partnership to a national leader in fresh produce delivery.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-green-300"></div>
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                  {/* Year circle */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    {event.year}
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.event}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals who make FreshHarvest possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-linear-to-r from-emerald-800 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Fresh Food Revolution
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Experience the difference that truly fresh, responsibly sourced vegetables and spices can make in your cooking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 hover:bg-green-50 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300">
              Shop Fresh Vegetables
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300">
              Explore Our Spices
            </button>
          </div>
          <p className="mt-10 text-green-200">
            Have questions about our sourcing or practices? <a href="/contact" className="text-white font-bold underline hover:no-underline">Contact our team</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;