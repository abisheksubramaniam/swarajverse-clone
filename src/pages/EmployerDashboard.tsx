
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomButton from '../components/ui/CustomButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Users, Briefcase, BarChart, Plus, Eye, PenSquare, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const EmployerDashboard = () => {
  const [postedJobs, setPostedJobs] = useState([
    {
      id: 1,
      title: "Web Developer - Remote",
      category: "Computer-based",
      type: "Full-time",
      location: "Remote",
      applicants: 12,
      status: "Active",
      postedDate: "2023-07-15"
    },
    {
      id: 2,
      title: "Customer Support Specialist",
      category: "Computer-based",
      type: "Part-time",
      location: "New York, NY",
      applicants: 8,
      status: "Active",
      postedDate: "2023-07-20"
    },
    {
      id: 3,
      title: "Graphic Designer",
      category: "Computer-based",
      type: "Contract",
      location: "Chicago, IL",
      applicants: 5,
      status: "Closed",
      postedDate: "2023-06-10"
    }
  ]);

  const deleteJob = (id: number) => {
    setPostedJobs(postedJobs.filter(job => job.id !== id));
    toast({
      title: "Job Deleted",
      description: "The job posting has been removed.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-swaraj-text">Employer Dashboard</h1>
              <p className="text-swaraj-darkGray">Manage your job postings and applicants</p>
            </div>
            <CustomButton variant="primary" aria-label="Post a new job">
              <Plus className="h-4 w-4 mr-1" />
              Post New Job
            </CustomButton>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Tabs defaultValue="jobs">
              <TabsList className="bg-gray-50 border-b p-0">
                <TabsTrigger value="jobs" className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-swaraj-blue rounded-none">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Job Postings
                </TabsTrigger>
                <TabsTrigger value="applicants" className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-swaraj-blue rounded-none">
                  <Users className="h-4 w-4 mr-2" />
                  Applicants
                </TabsTrigger>
                <TabsTrigger value="company" className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-swaraj-blue rounded-none">
                  <Building className="h-4 w-4 mr-2" />
                  Company Profile
                </TabsTrigger>
                <TabsTrigger value="analytics" className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-swaraj-blue rounded-none">
                  <BarChart className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="jobs" className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 font-medium text-swaraj-text">Job Title</th>
                        <th className="text-left py-3 px-4 font-medium text-swaraj-text">Category</th>
                        <th className="text-left py-3 px-4 font-medium text-swaraj-text">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-swaraj-text">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-swaraj-text">Applicants</th>
                        <th className="text-left py-3 px-4 font-medium text-swaraj-text">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-swaraj-text">Posted Date</th>
                        <th className="text-left py-3 px-4 font-medium text-swaraj-text">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {postedJobs.map((job) => (
                        <tr key={job.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-swaraj-text font-medium">{job.title}</td>
                          <td className="py-3 px-4 text-swaraj-darkGray">{job.category}</td>
                          <td className="py-3 px-4 text-swaraj-darkGray">{job.type}</td>
                          <td className="py-3 px-4 text-swaraj-darkGray">{job.location}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-swaraj-blue/10 text-swaraj-blue">
                              {job.applicants}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              job.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-swaraj-darkGray">{job.postedDate}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button 
                                className="text-gray-500 hover:text-swaraj-blue"
                                aria-label={`View ${job.title}`}
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button 
                                className="text-gray-500 hover:text-swaraj-blue"
                                aria-label={`Edit ${job.title}`}
                              >
                                <PenSquare className="h-4 w-4" />
                              </button>
                              <button 
                                className="text-gray-500 hover:text-red-500"
                                onClick={() => deleteJob(job.id)}
                                aria-label={`Delete ${job.title}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="applicants">
                <div className="p-8 text-center">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-swaraj-text mb-2">No applicants yet</h3>
                  <p className="text-swaraj-darkGray mb-4">
                    When job seekers apply for your posted jobs, they will appear here.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="company">
                <div className="p-8 text-center">
                  <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-swaraj-text mb-2">Complete Your Company Profile</h3>
                  <p className="text-swaraj-darkGray mb-4">
                    Add details about your organization's mission, values, and accessibility commitments.
                  </p>
                  <CustomButton variant="outline">
                    Update Profile
                  </CustomButton>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="p-8 text-center">
                  <BarChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-swaraj-text mb-2">Job Posting Analytics</h3>
                  <p className="text-swaraj-darkGray mb-4">
                    View metrics about your job postings and applicant engagement.
                  </p>
                  <CustomButton variant="outline">
                    Generate Report
                  </CustomButton>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EmployerDashboard;
