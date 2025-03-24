import { useState } from "react";
import { BotMessageSquare } from 'lucide-react';

const Signup = () => {
  // setting the state for show password button
  const [showPassword, setShowPassword] = useState(false);

  // formData state to store full name, email and password
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // using object destructuring to extract signup function and isSigningUP state from useAuthStore where zustand was used to create a state
  const { signup, isSigningUp } = useAuthStore();

  // now, we need a function to validate the form
  // like, for example, if user even misses a single field, we should show an error message
  const validateForm = () => { };
  // now, we need a function to handle the form submission
  const handleSubmit = (e) => {
    // to prevent the default behaviour of form submission so that it does not refreshes the page.
    e.preventDefault();
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left hand side of the form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* now, here will be logo, but i will be importing it from lucide-react */}
          <BotMessageSquare className="size-6 text-primary" />

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Inputs */}
            <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
              <legend className="fieldset-legend">Signup</legend>

              {/* Full Name label and Input */}

              <label className="fieldset-label">Full Name</label>
              <input 
              type="text" 
              className="input input-bordered w-full pl-10" 
              placeholder="Rishav Chaudhary" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              {/* Email label and Input */}

              <label className="fieldset-label">Email</label>
              <input 
              type="email" 
              className="input input-bordered w-full pl-10" 
              placeholder="rishavc957@gmail.com" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              {/* Password label and Input */}

              <label className="fieldset-label">Password</label>
              <input 
              type="password" 
              className="input input-bordered w-full pl-10" 
              placeholder="*******" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              {/* Confirm Password label and Input */}

              <label className="fieldset-label">Rewrite Password</label>
              <input 
              type="password" 
              className="input input-bordered w-full pl-10" 
              placeholder="Password" 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />

              <button className="btn btn-neutral mt-4">SignUp</button>
            </fieldset>
          </form>
        </div>
      </div>
      {/* Right hand side of the form */}
    </div>
  )
}

export default Signup