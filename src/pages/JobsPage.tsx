
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomButton from '../components/ui/CustomButton';
import { Search, Filter, Briefcase, MapPin, Clock, ArrowRight, Accessibility, Upload, FileText, Plus, Building, BrainCircuit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ScrollAnimation from '../components/ScrollAnimation';
import { toast } from '@/components/ui/use-toast';

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  // New job posting state
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCompany, setNewJobCompany] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('');
  const [newJobType, setNewJobType] = useState('Full-time');
  const [newJobCategory, setNewJobCategory] = useState('');
  const [newJobDescription, setNewJobDescription] = useState('');
  const [newJobAccommodations, setNewJobAccommodations] = useState<string[]>([]);

  const jobListings = [
    {
      id: 1,
      title: "Web Developer - Remote",
      company: "Inclusive Technologies",
      location: "Remote",
      type: "Full-time",
      category: "Computer-based",
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
      category: "Computer-based",
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
      category: "Computer-based",
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
      category: "Computer-based",
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
      category: "Computer-based",
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
      category: "Computer-based",
      accommodations: ["Speech-to-Text Software", "Flexible Deadlines"],
      description: "Create compelling content for our blog and social media channels. Focus on topics related to accessibility and inclusion.",
      posted: "1 day ago"
    },
    {
      id: 7,
      title: "Warehouse Associate",
      company: "Inclusive Logistics",
      location: "Dallas, TX",
      type: "Full-time",
      category: "Non-computer-based",
      accommodations: ["Wheelchair Accessible", "Visual Alerts", "Adjusted Workstation"],
      description: "Join our warehouse team to help process and package orders. Training provided for all equipment and procedures.",
      posted: "3 days ago"
    },
    {
      id: 8,
      title: "Culinary Assistant",
      company: "Accessible Eats",
      location: "San Francisco, CA",
      type: "Part-time",
      category: "Non-computer-based",
      accommodations: ["Wheelchair Accessible Kitchen", "Flexible Schedule"],
      description: "Assist our head chef in preparing meals. Previous kitchen experience helpful but not required.",
      posted: "1 week ago"
    },
    {
      id: 9,
      title: "Retail Sales Associate",
      company: "Inclusive Retail",
      location: "Miami, FL",
      type: "Part-time",
      category: "Non-computer-based",
      accommodations: ["Wheelchair Accessible", "Visual Communication Tools"],
      description: "Help customers find products and provide excellent customer service in our accessible retail store.",
      posted: "2 days ago"
    },
    {
      id: 10,
      title: "Administrative Assistant",
      company: "AccessAbility Partners",
      location: "Washington, DC",
      type: "Full-time",
      category: "Computer-based",
      accommodations: ["Screen Reader Compatible", "Voice Recognition Software"],
      description: "Provide administrative support to our executive team. Strong organizational skills required.",
      posted: "4 days ago"
    },
    {
      id: 11,
      title: "Gardening Assistant",
      company: "Green Access",
      location: "Portland, OR",
      type: "Seasonal",
      category: "Non-computer-based",
      accommodations: ["Adjusted Tools", "Flexible Hours", "Rest Areas"],
      description: "Help maintain gardens and landscapes. Training provided for all tools and techniques.",
      posted: "1 week ago"
    },
    {
      id: 12,
      title: "Assembly Line Worker",
      company: "Inclusive Manufacturing",
      location: "Detroit, MI",
      type: "Full-time",
      category: "Non-computer-based",
      accommodations: ["Wheelchair Accessible", "Visual Alerts", "Adjusted Workstation"],
      description: "Assemble products on our accessible assembly line. Previous manufacturing experience helpful but not required.",
      posted: "3 days ago"
    }
  ];

  const filteredJobs = jobListings.filter(job => {
    const matchesTerm = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? job.category === selectedCategory : true;
    const matchesLocation = selectedLocation ? job.location === selectedLocation : true;
    const matchesJobType = selectedJobType ? job.type === selectedJobType : true;
    
    return matchesTerm && matchesCategory && matchesLocation && matchesJobType;
  });

  const categories = [...new Set(jobListings.map(job => job.category))];
  const locations = [...new Set(jobListings.map(job => job.location))];
  const jobTypes = [...new Set(jobListings.map(job => job.type))];
  
  const accommodationOptions = [
    "Screen Reader Compatible",
    "Wheelchair Accessible",
    "Flexible Hours",
    "Visual Alerts",
    "Assistive Listening Devices",
    "Voice Recognition Software",
    "Adjusted Workstation",
    "Service Animal Friendly",
    "Speech-to-Text Software",
    "Remote Work"
  ];
  
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully.",
        duration: 3000,
      });
    }
  };
  
  const handleResumeAnalysis = () => {
    if (!resumeFile) {
      toast({
        title: "No resume found",
        description: "Please upload a resume first.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Mock resume analysis
    setTimeout(() => {
      toast({
        title: "Resume Analysis Complete",
        description: "Your resume has been analyzed. We've identified key skills in web development and customer service.",
        duration: 5000,
      });
    }, 2000);
  };
  
  const handlePostJob = () => {
    if (!newJobTitle || !newJobCompany || !newJobDescription) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Job Posted",
      description: "Your job has been posted successfully and is pending review.",
      duration: 3000,
    });
    
    // Reset form
    setNewJobTitle('');
    setNewJobCompany('');
    setNewJobLocation('');
    setNewJobType('Full-time');
    setNewJobCategory('');
    setNewJobDescription('');
    setNewJobAccommodations([]);
  };
  
  const handleAccommodationToggle = (accommodation: string) => {
    if (newJobAccommodations.includes(accommodation)) {
      setNewJobAccommodations(newJobAccommodations.filter(a => a !== accommodation));
    } else {
      setNewJobAccommodations([...newJobAccommodations, accommodation]);
    }
  };

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

        {/* Main Content Section with Tabs */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="findJobs" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="findJobs">Find Jobs</TabsTrigger>
                <TabsTrigger value="postJobs">Post Jobs</TabsTrigger>
                <TabsTrigger value="resumeTools">Resume Tools</TabsTrigger>
              </TabsList>
              
              {/* Find Jobs Tab */}
              <TabsContent value="findJobs" className="space-y-4">
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
                          <Label htmlFor="jobType" className="block text-swaraj-text mb-2">Job Type</Label>
                          <select
                            id="jobType"
                            value={selectedJobType}
                            onChange={(e) => setSelectedJobType(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            aria-label="Filter by job type"
                          >
                            <option value="">All Types</option>
                            {jobTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <h3 className="text-swaraj-text font-medium mb-2">Accommodations</h3>
                          <div className="space-y-2">
                            {accommodationOptions.slice(0, 5).map((accommodation) => (
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
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {job.category}
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
              </TabsContent>
              
              {/* Post Jobs Tab */}
              <TabsContent value="postJobs" className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold text-swaraj-text mb-6 flex items-center">
                    <Building className="h-6 w-6 mr-2 text-swaraj-blue" />
                    Post a New Job
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Job Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="jobTitle" className="block text-swaraj-text mb-2">Job Title*</Label>
                        <Input
                          id="jobTitle"
                          value={newJobTitle}
                          onChange={(e) => setNewJobTitle(e.target.value)}
                          placeholder="e.g., Web Developer"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="company" className="block text-swaraj-text mb-2">Company Name*</Label>
                        <Input
                          id="company"
                          value={newJobCompany}
                          onChange={(e) => setNewJobCompany(e.target.value)}
                          placeholder="e.g., AccessAbility Inc."
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="location" className="block text-swaraj-text mb-2">Location</Label>
                        <Input
                          id="location"
                          value={newJobLocation}
                          onChange={(e) => setNewJobLocation(e.target.value)}
                          placeholder="e.g., Remote, New York, NY"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="jobType" className="block text-swaraj-text mb-2">Job Type</Label>
                        <select
                          id="jobType"
                          value={newJobType}
                          onChange={(e) => setNewJobType(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          aria-label="Select job type"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Internship">Internship</option>
                          <option value="Seasonal">Seasonal</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="category" className="block text-swaraj-text mb-2">Category</Label>
                        <select
                          id="category"
                          value={newJobCategory}
                          onChange={(e) => setNewJobCategory(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          aria-label="Select job category"
                        >
                          <option value="">Select a category</option>
                          <option value="Computer-based">Computer-based</option>
                          <option value="Non-computer-based">Non-computer-based</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Job Description */}
                    <div>
                      <Label htmlFor="description" className="block text-swaraj-text mb-2">Job Description*</Label>
                      <Textarea
                        id="description"
                        value={newJobDescription}
                        onChange={(e) => setNewJobDescription(e.target.value)}
                        placeholder="Describe the job responsibilities, requirements, and company culture..."
                        className="h-32"
                        required
                      />
                    </div>
                    
                    {/* Accommodations */}
                    <div>
                      <Label className="block text-swaraj-text mb-2">Accommodations Available</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {accommodationOptions.map((accommodation) => (
                          <div key={accommodation} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={`job-${accommodation.replace(/\s+/g, '-').toLowerCase()}`}
                              checked={newJobAccommodations.includes(accommodation)}
                              onChange={() => handleAccommodationToggle(accommodation)}
                              className="rounded border-gray-300 text-swaraj-blue focus:ring-swaraj-blue"
                            />
                            <label 
                              htmlFor={`job-${accommodation.replace(/\s+/g, '-').toLowerCase()}`} 
                              className="ml-2 text-sm text-swaraj-darkGray"
                            >
                              {accommodation}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <CustomButton 
                        variant="primary" 
                        onClick={handlePostJob}
                        aria-label="Post this job"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Post Job
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Resume Tools Tab */}
              <TabsContent value="resumeTools" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Resume Builder */}
                  <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                    <h2 className="text-xl font-bold text-swaraj-text mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-swaraj-blue" />
                      AI Resume Builder
                    </h2>
                    <p className="text-swaraj-darkGray mb-6">
                      Create a professional, accessible resume tailored to your skills and the jobs you want.
                    </p>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <CustomButton variant="primary" className="mt-auto" aria-label="Build your resume">
                          <BrainCircuit className="h-4 w-4 mr-1" />
                          Build Your Resume
                        </CustomButton>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>AI Resume Builder</DialogTitle>
                          <DialogDescription>
                            Let our AI help you create a professional resume optimized for accessibility.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <Label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</Label>
                            <Input id="name" placeholder="John Doe" />
                          </div>
                          <div>
                            <Label htmlFor="experience" className="block text-sm font-medium mb-1">Work Experience</Label>
                            <Textarea id="experience" placeholder="Describe your work experience..." />
                          </div>
                          <div>
                            <Label htmlFor="skills" className="block text-sm font-medium mb-1">Key Skills</Label>
                            <Input id="skills" placeholder="e.g., Web Development, Customer Service" />
                          </div>
                          <div>
                            <Label htmlFor="education" className="block text-sm font-medium mb-1">Education</Label>
                            <Input id="education" placeholder="e.g., Bachelor's in Computer Science" />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <CustomButton variant="primary" aria-label="Generate resume">
                            <BrainCircuit className="h-4 w-4 mr-1" />
                            Generate Resume
                          </CustomButton>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {/* Resume Analyzer */}
                  <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                    <h2 className="text-xl font-bold text-swaraj-text mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-swaraj-blue" />
                      Resume Analyzer
                    </h2>
                    <p className="text-swaraj-darkGray mb-6">
                      Upload your existing resume to get AI-powered feedback and improvement suggestions.
                    </p>
                    
                    <div className="space-y-4 mb-auto">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Input
                          type="file"
                          id="resume-upload"
                          className="hidden"
                          onChange={handleResumeUpload}
                          accept=".pdf,.doc,.docx"
                        />
                        <label 
                          htmlFor="resume-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm font-medium text-swaraj-text">
                            {resumeFile ? resumeFile.name : "Click to upload your resume"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Support for PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </label>
                      </div>
                    </div>
                    
                    <CustomButton 
                      variant="primary" 
                      className="mt-6" 
                      onClick={handleResumeAnalysis}
                      disabled={!resumeFile}
                      aria-label="Analyze your resume"
                    >
                      <BrainCircuit className="h-4 w-4 mr-1" />
                      Analyze Resume
                    </CustomButton>
                  </div>
                </div>
                
                {/* Resume Tips */}
                <div className="bg-swaraj-blue/5 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-swaraj-text mb-3">Accessibility Resume Tips</h3>
                  <ul className="list-disc pl-5 space-y-2 text-swaraj-darkGray">
                    <li>Use clear, simple language that can be easily understood by screen readers</li>
                    <li>Structure your resume with proper headings and sections for better navigation</li>
                    <li>Avoid complex tables or graphics that may not translate well to assistive technologies</li>
                    <li>Include any accommodations you might need in a professional manner</li>
                    <li>Focus on your abilities and accomplishments rather than limitations</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JobsPage;
