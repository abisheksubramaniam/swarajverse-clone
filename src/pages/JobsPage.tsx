
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomButton from '../components/ui/CustomButton';
import { Search, Filter, Briefcase, MapPin, Clock, ArrowRight, Accessibility } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import ScrollAnimation from '../components/ScrollAnimation';

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const jobListings = [
    {
      id: 1,
      title: "Web Developer - Remote",
      company: "Inclusive Technologies",
      location: "Remote",
      type: "Full-time",
      category: "Technology",
      accommodations: ["Screen Reader Compatible", "Flexible Hours"],
      description: "We're looking for a web developer who can build accessible web applications. Experience with ARIA and WCAG guidelines is a plus.",
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Customer Support Specialist",
      company: "AccessCare Solutions",
      location: "New York, NY",
      type: "Part-time",
      category: "Customer Service",
      accommodations: ["Wheelchair Accessible", "Assistive Listening Devices"],
      description: "Join our customer support team to help clients navigate our services. Training provided for all accessibility tools.",
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "Graphic Designer",
      company: "Creative Access",
      location: "Chicago, IL",
      type: "Contract",
      category: "Design",
      accommodations: ["Adaptive Equipment", "Flexible Schedule"],
      description: "Create visually appealing designs for our marketing materials and website. We value innovation and inclusion.",
      posted: "3 days ago"
    },
    {
      id: 4, 
      title: "Data Analyst",
      company: "DataSense Inc.",
      location: "Remote",
      type: "Full-time",
      category: "Technology",
      accommodations: ["Voice Recognition Software", "Flexible Hours"],
      description: "Analyze customer data to help improve our product offerings. Strong problem-solving skills required.",
      posted: "Just now"
    },
    {
      id: 5,
      title: "HR Specialist",
      company: "InclusiveWorkplace",
      location: "Boston, MA",
      type: "Full-time",
      category: "Human Resources",
      accommodations: ["Wheelchair Accessible", "Service Animal Friendly"],
      description: "Help us build a more inclusive workplace by joining our HR team. Experience with diversity initiatives preferred.",
      posted: "5 days ago"
    },
    {
      id: 6,
      title: "Content Writer",
      company: "Accessible Media",
      location: "Remote",
      type: "Freelance",
      category: "Writing",
      accommodations: ["Speech-to-Text Software", "Flexible Deadlines"],
      description: "Create compelling content for our blog and social media channels. Focus on topics related to accessibility and inclusion.",
      posted: "1 day ago"
    }
  ];

  const filteredJobs = jobListings.filter(job => {
    const matchesTerm = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? job.category === selectedCategory : true;
    const matchesLocation = selectedLocation ? job.location === selectedLocation : true;
    
    return matchesTerm && matchesCategory && matchesLocation;
  });

  const categories = [...new Set(jobListings.map(job => job.category))];
  const locations = [...new Set(jobListings.map(job => job.location))];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-swaraj-blue/10 to-swaraj-blue/5 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollAnimation>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-swaraj-text mb-4">
                  Find Accessible Job Opportunities
                </h1>
              </ScrollAnimation>
              <ScrollAnimation delay={200}>
                <p className="text-lg text-swaraj-darkGray mb-8">
                  Connecting talented individuals with disabilities to employers who value diversity and inclusion
                </p>
              </ScrollAnimation>

              <ScrollAnimation delay={300}>
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="Job title, keyword, or company"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        aria-label="Search for jobs"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <CustomButton 
                      variant="primary"
                      className="shrink-0"
                      aria-label="Search for jobs"
                    >
                      Find Jobs
                    </CustomButton>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Jobs Listing Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6 sticky top-24">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter className="h-5 w-5 text-swaraj-blue" />
                    <h2 className="text-xl font-bold text-swaraj-text">Filters</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="category" className="block text-swaraj-text mb-2">Job Category</Label>
                      <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        aria-label="Filter by job category"
                      >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="location" className="block text-swaraj-text mb-2">Location</Label>
                      <select
                        id="location"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        aria-label="Filter by location"
                      >
                        <option value="">All Locations</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <h3 className="text-swaraj-text font-medium mb-2">Accommodations</h3>
                      <div className="space-y-2">
                        {["Wheelchair Accessible", "Screen Reader Compatible", "Flexible Hours", "Remote Work"].map((accommodation) => (
                          <div key={accommodation} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={accommodation.replace(/\s+/g, '-').toLowerCase()} 
                              className="rounded border-gray-300 text-swaraj-blue focus:ring-swaraj-blue"
                              aria-label={`Filter by ${accommodation} accommodation`}
                            />
                            <label htmlFor={accommodation.replace(/\s+/g, '-').toLowerCase()} className="ml-2 text-sm text-swaraj-darkGray">
                              {accommodation}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <CustomButton variant="outline" fullWidth>
                      Reset Filters
                    </CustomButton>
                  </div>
                </div>
              </div>
              
              {/* Job Listings */}
              <div className="lg:w-3/4">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-swaraj-text">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
                  </h2>
                  <p className="text-swaraj-darkGray">
                    Opportunities that value your unique skills and perspective
                  </p>
                </div>
                
                <div className="space-y-6">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <div 
                        key={job.id} 
                        className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg border-l-4 border-swaraj-blue"
                        tabIndex={0}
                        aria-label={`${job.title} at ${job.company}, ${job.type} position in ${job.location}`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-swaraj-text mb-2">
                              {job.title}
                            </h3>
                            <p className="text-swaraj-blue font-medium mb-4">
                              {job.company}
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-swaraj-blue/10 text-swaraj-blue">
                              {job.type}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-swaraj-darkGray text-sm mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Posted {job.posted}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.category}</span>
                          </div>
                        </div>
                        
                        <p className="text-swaraj-darkGray mb-4">
                          {job.description}
                        </p>
                        
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-swaraj-text mb-2">Accommodations Available:</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.accommodations.map((accommodation) => (
                              <span key={accommodation} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Accessibility className="h-3 w-3 mr-1" />
                                {accommodation}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <CustomButton variant="primary" size="sm">
                            <span>Apply Now</span>
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </CustomButton>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-16 h-16 rounded-full bg-swaraj-blue/10 flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-swaraj-blue" />
                      </div>
                      <h3 className="text-xl font-bold text-swaraj-text mb-2">No jobs found</h3>
                      <p className="text-swaraj-darkGray">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JobsPage;
