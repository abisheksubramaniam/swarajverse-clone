
import { useState } from 'react';
import CustomButton from './ui/CustomButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, File, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface JobApplicationFormProps {
  jobTitle: string;
  company: string;
  onClose: () => void;
}

const JobApplicationForm = ({ jobTitle, company, onClose }: JobApplicationFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: '',
    accommodations: '',
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive"
        });
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Agreement",
        description: "Please agree to the terms and conditions to submit your application.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, you would send the form data to your backend
    console.log('Application submitted:', formData);
    
    toast({
      title: "Application Submitted!",
      description: `Your application for ${jobTitle} at ${company} has been received. We'll be in touch soon.`
    });
    
    // Close the form
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-swaraj-text">
          Apply for {jobTitle}
        </h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close application form"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                stepNumber === step ? 'bg-swaraj-blue text-white' : 
                stepNumber < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                {stepNumber < step ? '✓' : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`h-1 w-16 ${
                  stepNumber < step ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Personal Information</span>
          <span>Resume & Cover Letter</span>
          <span>Accommodations</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4" aria-labelledby="step-1-heading">
            <h3 id="step-1-heading" className="sr-only">Personal Information</h3>
            
            <div>
              <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
                aria-required="true"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                aria-required="true"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your phone number"
                required
                aria-required="true"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4" aria-labelledby="step-2-heading">
            <h3 id="step-2-heading" className="sr-only">Resume & Cover Letter</h3>
            
            <div>
              <Label htmlFor="resume">Upload Resume (PDF, DOC, DOCX) <span className="text-red-500">*</span></Label>
              <div className="mt-1 flex items-center">
                <label htmlFor="resume" className="cursor-pointer flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md py-6 px-4 hover:bg-gray-50 transition-colors">
                  {formData.resume ? (
                    <div className="flex items-center">
                      <File className="h-6 w-6 text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">{formData.resume.name}</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Click to upload your resume</p>
                      <p className="text-xs text-gray-400 mt-1">Maximum file size: 5MB</p>
                    </div>
                  )}
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  aria-required="true"
                  className="sr-only"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Optional: Why are you interested in this position and what makes you a good fit?"
                rows={6}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4" aria-labelledby="step-3-heading">
            <h3 id="step-3-heading" className="sr-only">Accommodations & Submission</h3>
            
            <div>
              <Label htmlFor="accommodations">
                Accommodation Requests
                <span className="ml-1 text-sm text-gray-500">(Optional)</span>
              </Label>
              <Textarea
                id="accommodations"
                name="accommodations"
                value={formData.accommodations}
                onChange={handleInputChange}
                placeholder="Please let us know if you require any accommodations during the application or interview process."
                rows={4}
              />
              <p className="mt-1 text-sm text-gray-500">
                This information helps us ensure that all candidates have equal opportunity to present their qualifications.
              </p>
            </div>
            
            <div className="flex items-start space-x-2 pt-4">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={handleCheckboxChange}
                aria-required="true"
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                I certify that the information provided is accurate and complete. I understand that false statements may be grounds for denial of employment or dismissal. <span className="text-red-500">*</span>
              </Label>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <CustomButton 
              type="button" 
              variant="secondary" 
              onClick={prevStep}
            >
              Previous
            </CustomButton>
          ) : (
            <div></div>
          )}
          
          {step < 3 ? (
            <CustomButton 
              type="button" 
              variant="primary" 
              onClick={nextStep}
            >
              Next
            </CustomButton>
          ) : (
            <CustomButton 
              type="submit" 
              variant="primary"
            >
              Submit Application
            </CustomButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;
