import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowRight, UserCircle, KeyRound, AlertCircle, User as UserIcon, Mail, Phone, Hash, Calendar, MapPin, Building, UploadCloud, CheckCircle2, FileText, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [method, setMethod] = useState('phone');
  
  // Login specific
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  
  // Register specific
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [aadharId, setAadharId] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [college, setCollege] = useState('');
  const [idCard, setIdCard] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/progress" />;
  }

  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      throw new Error("Missing Cloudinary configuration in .env");
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
       const errBody = await response.json();
       throw new Error(`Cloudinary Error: ${errBody.error?.message || 'Failed to upload'}`);
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        // Validate 18+
        const dobDate = new Date(dob);
        const ageDifMs = Date.now() - dobDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age < 18) {
          throw new Error("You must be 18 or older to register.");
        }
        if (!termsAccepted) {
          throw new Error("You must accept the Terms and Conditions.");
        }
        if (!idCard || !profileImg) {
          throw new Error("Please upload both ID Card and Profile Images.");
        }

        // Upload images
        const [idCardUrl, profileUrl] = await Promise.all([
          uploadToCloudinary(idCard),
          uploadToCloudinary(profileImg)
        ]);

        const result = await register({
          method: 'phone', 
          contact: phoneInput, // Use phone as the primary login identifier
          password,
          name,
          email,
          phone: phoneInput,
          aadharId,
          dob,
          address,
          college,
          idCardUrl,
          profileUrl,
          termsAccepted
        });

        if (result.success) {
          navigate('/progress');
        } else {
          setError(result.error);
        }
      } else {
        const result = await login(contact, password);
        if (result.success) {
          navigate('/progress');
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 flex flex-col justify-center min-h-[calc(100vh-140px)] animate-in fade-in duration-500 py-10 relative">
      <div className="space-y-4 mb-8">
        <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-enamel-White leading-tight transition-all">
          {isRegister ? 'Join the \nYashoda Network.' : 'Welcome to \nYashoda Network.'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed text-sm">
          {isRegister 
            ? 'Complete your profile to qualify as a Yashoda intern.'
            : 'The finest platform for modern dental health professionals.'}
        </p>
      </div>

      <div className="glass-panel-heavy p-6 sm:p-8 space-y-6">
        {!isRegister && (
          <div className="flex space-x-2 p-1 bg-slate-100 dark:bg-medical-900 rounded-2xl mb-2">
            <button
              type="button"
              onClick={() => setMethod('phone')}
              className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${method === 'phone' ? 'bg-white dark:bg-medical-800 shadow-sm text-medical-Teal dark:text-medical-TealLight' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
            >
              Mobile No.
            </button>
            <button
              type="button"
              onClick={() => setMethod('email')}
              className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${method === 'email' ? 'bg-white dark:bg-medical-800 shadow-sm text-medical-Teal dark:text-medical-TealLight' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
            >
              Email ID
            </button>
          </div>
        )}

        {error && (
            <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2 font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
            </div>
        )}

        <form onSubmit={handleConnect} className="space-y-4">
          
          {isRegister ? (
            <div className="space-y-4 animate-in slide-in-from-top-4 duration-300 fade-in">
              <div className="relative">
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[14px]" />
                <UserIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 stroke-[1.5]" />
              </div>
              <div className="relative">
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[14px]" />
                <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 stroke-[1.5]" />
              </div>
              <div className="relative">
                <input type="tel" placeholder="+91 Phone Number" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} required className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[14px]" />
                <Phone className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 stroke-[1.5]" />
              </div>
              <div className="relative">
                <input type="text" placeholder="Aadhar Number" value={aadharId} onChange={(e) => setAadharId(e.target.value)} required className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[14px]" />
                <Hash className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 stroke-[1.5]" />
              </div>
              <div className="relative">
                <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[14px] appearance-none" />
              </div>
              <div className="relative">
                <input type="text" placeholder="Residential Address" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[14px]" />
                <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 stroke-[1.5]" />
              </div>
              <div className="relative">
                <input type="text" placeholder="College Name" value={college} onChange={(e) => setCollege(e.target.value)} required className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[14px]" />
                <Building className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 stroke-[1.5]" />
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="relative flex items-center justify-between glass-panel p-3 rounded-xl border border-dashed border-slate-300 dark:border-medical-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-medical-800">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 ml-2">
                    {idCard ? 'ID Card Selected' : 'Upload College ID Card'}
                  </span>
                  <div className="flex space-x-2">
                    {idCard && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    <FileText className="w-5 h-5 text-slate-400" />
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => setIdCard(e.target.files[0])} required className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>

                <div className="relative flex items-center justify-between glass-panel p-3 rounded-xl border border-dashed border-slate-300 dark:border-medical-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-medical-800">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 ml-2">
                    {profileImg ? 'Profile Image Selected' : 'Upload Profile Image'}
                  </span>
                   <div className="flex space-x-2">
                    {profileImg && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    <Camera className="w-5 h-5 text-slate-400" />
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => setProfileImg(e.target.files[0])} required className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Create Secure Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[14px]"
                />
                <KeyRound className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 stroke-[1.5]" />
              </div>

              <div className="pt-2 flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                  className="mt-1 w-5 h-5 accent-medical-Teal rounded cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  I have read and agree to the <button type="button" onClick={() => setShowTerms(true)} className="text-medical-Teal hover:underline font-semibold">Terms & Conditions</button>, including the mandatory call recording protocols.
                </label>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                {method === 'phone' ? (
                  <input type="tel" placeholder="+91 Phone Number" value={contact} onChange={(e) => setContact(e.target.value)} required className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[15px] tracking-wide" />
                ) : (
                  <input type="email" placeholder="Clinic Email Address" value={contact} onChange={(e) => setContact(e.target.value)} required className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[15px]" />
                )}
                <UserCircle className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 stroke-[1.5]" />
              </div>

              <div className="relative">
                <input type="password" placeholder="Secure Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-50 dark:bg-medical-900/50 border border-slate-200 dark:border-medical-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-medical-Teal/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 font-medium text-[15px] tracking-wide" />
                <KeyRound className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 stroke-[1.5]" />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-medical-Teal hover:bg-teal-700 text-white rounded-2xl py-4 font-semibold text-[15px] flex items-center justify-center space-x-2 btn-haptic shadow-lg shadow-teal-500/30 mt-6 disabled:opacity-50"
          >
            {loading ? (
               <span className="flex items-center space-x-2 animate-pulse">
                <UploadCloud className="w-5 h-5 animate-bounce" />
                <span>Processing...</span>
               </span>
            ) : (
              <>
                <span>{isRegister ? 'Submit Application' : 'Access Portal'}</span>
                {!loading && <ArrowRight className="w-5 h-5" />}
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center animate-in fade-in duration-700">
        <p className="text-[13px] text-slate-400 dark:text-slate-500">
          {isRegister ? "Already an intern?" : "New to the programme?"} {' '}
          <button 
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-medical-Teal dark:text-medical-TealLight hover:underline font-medium outline-none"
          >
             {isRegister ? 'Log in here' : 'Register now'}
          </button>
        </p>
      </div>

      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-medical-900 rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100 dark:border-medical-800">
            <div className="p-6 border-b border-slate-100 dark:border-medical-800">
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Terms & Conditions</h3>
              <p className="text-xs text-slate-500 mt-1">Last Updated: March 2026</p>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar text-sm space-y-5 text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              <p className="font-medium text-slate-800 dark:text-slate-200">Welcome to the Yashoda Smile Partners (YSP) Intern Portal. By registering and using this platform, you agree to comply with the following terms. Please read them carefully as they govern your freelance engagement with Yashoda Dental Clinic.</p>
              
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">1. Nature of Engagement</h4>
                <p><strong className="font-semibold text-slate-700 dark:text-slate-300">Freelance Status:</strong> You are engaging as a freelance Marketing Intern. This is not an offer of permanent employment by Yashoda Dental Clinic.</p>
                <p><strong className="font-semibold text-slate-700 dark:text-slate-300">Educational Purpose:</strong> This program is designed to provide hands-on experience in sales, communication, and business development for students.</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">2. Stipend & Milestone Structure</h4>
                <p>Your compensation is strictly performance-based. By using this portal, you acknowledge the following tiers:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong className="font-semibold text-slate-700 dark:text-slate-300">Tier 1:</strong> 50 Approved Sales = ₹1,000 Stipend + Certificate.</li>
                  <li><strong className="font-semibold text-slate-700 dark:text-slate-300">Tier 2:</strong> 70 Approved Sales = ₹2,500 Stipend + Certificate.</li>
                  <li><strong className="font-semibold text-slate-700 dark:text-slate-300">Tier 3:</strong> 100 Approved Sales = ₹4,000 Stipend + Certificate.</li>
                  <li><strong className="font-semibold text-slate-700 dark:text-slate-300">Under 50 Sales:</strong> You will receive a Digital Internship Certificate only; no monetary stipend will be issued.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">3. Verification & "Approved" Sales</h4>
                <p>A "Sale" is only considered Approved once the Admin verifies:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 mb-2">
                  <li>The uploaded Call Recording (confirming a professional conversation and verbal consent).</li>
                  <li>The Payment/Plan Screenshot matches the customer details.</li>
                  <li>The customer has successfully enrolled in the Health Membership Plan.</li>
                </ul>
                <p>The Admin reserves the right to reject submissions that are incomplete, fraudulent, or involve unprofessional behavior.</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">4. Mandatory Recording & Legal Compliance (DPDP Act)</h4>
                <p>To ensure full legal compliance under Indian data privacy laws, the following rules are non-negotiable:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong className="font-semibold text-slate-700 dark:text-slate-300">Google Dialer Requirement:</strong> All calls must be placed using the official Google Phone (Dialer) App.</li>
                  <li><strong className="font-semibold text-slate-700 dark:text-slate-300">Audible Disclosure:</strong> You are required to enable the recording feature so that the automated message "This call is now being recorded" is clearly audible to the customer at the start of the call.</li>
                  <li><strong className="font-semibold text-slate-700 dark:text-slate-300">Strict Rejection Policy:</strong> Any recording submitted without the automated Google recording announcement will be automatically rejected. This applies even if the sale was successful and the payment was completed.</li>
                  <li><strong className="font-semibold text-slate-700 dark:text-slate-300">Data Privacy:</strong> You are strictly prohibited from using third-party "Silent Recording" apps. Use of such apps will result in immediate termination of your internship.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">5. Code of Conduct</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong className="font-semibold text-slate-700 dark:text-slate-300">Data Confidentiality:</strong> You will not share, export, or sell any lead data provided to you or collected by you.</li>
                  <li><strong className="font-semibold text-slate-700 dark:text-slate-300">Calling Hours:</strong> Calls must only be placed between 9:00 AM and 8:00 PM. No calls are permitted on National Holidays unless specified.</li>
                  <li><strong className="font-semibold text-slate-700 dark:text-slate-300">Professionalism:</strong> You must represent Yashoda Dental Clinic with honesty. Do not make medical promises or price guarantees not listed in the official plan.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">6. Termination of Access</h4>
                <p>Yashoda Smile Partners reserves the right to deactivate your account and withhold certification if:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>You are found using "Robocalls" or automated spamming tools.</li>
                  <li>You engage in any fraudulent activity (e.g., uploading fake screenshots or edited audio).</li>
                  <li>You fail to follow the mandatory recording protocol mentioned in Clause 4.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">7. Limitation of Liability</h4>
                <p>Yashoda Dental Clinic and its project managers are not responsible for any mobile balance deductions, network issues, or hardware damage incurred on your personal devices during this internship.</p>
              </div>

              <div className="bg-slate-50 dark:bg-medical-800/50 p-4 rounded-xl border border-slate-200 dark:border-medical-700 mt-4">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Acceptance</h4>
                <p>By clicking "I Agree" during registration, you confirm that you have read, understood, and accepted these terms and will adhere to the Google Dialer recording protocol for all professional outreach.</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-medical-800 flex justify-end">
              <button 
                type="button"
                onClick={() => {
                  setTermsAccepted(true);
                  setShowTerms(false);
                }}
                className="bg-medical-Teal text-white px-6 py-2.5 rounded-xl font-medium btn-haptic shadow-md"
              >
                I Agree & Accept
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
