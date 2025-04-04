import React from "react"
import { useState } from "react"
import { Link } from 'react-router-dom'
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react"
import { motion } from 'framer-motion'
import { useUserStore } from "../stores/useUserStore"

const SignupPage = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { signup, loading } = useUserStore();


  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  }

  return (
    <div className='flex justify-center  flex-col py-12 sm:px-6 lg:px-8'>
      <motion.div
      className="sm:mx-auto sm:w-full sm:max-w-md"
      initial={{opacity: 0, y: -20}}
      animate={{opacity: 1, y:0}}
      transition={{duration: 0.8}}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Create your account</h2>
      </motion.div>

      <motion.div
      className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      initial={{ opacity: 0, y:20 }}
      animate={{ opacity: 1, y:0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 shanow sm:rounded-lg sm:px-10">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden='true' />
                </div>
                <input
                id='name'
                type='text'
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="John Doe"
                />
              </div>
              </div>
              <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden='true' />
                </div>
                <input
                type="email"
                id="email"
                placeholder="email@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-gray-700 pl-10 w-full py-2 block rounded-md px-3 border border-gray-600 shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm placeholder-gray-400"
                />
                </div>
              </div> 

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                  id="password" 
                  type="password"
                  required
                  placeholder="******"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className='bg-gray-700 pl-10 w-full py-2 block rounded-md px-3 border border-gray-600 shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm placeholder-gray-400'
                  />
                </div>  
              </div>

              <div>
                <label htmlFor="confirm-password" className="text-sm font-medium text-gray-300">Confirm-password
                </label>
                <div className="mt-1 shadow-sm rounded-md relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400"/>
                  </div>
                  <input 
                  type="password"
                  id='confirm-password'
                  placeholder="******"
                  value={formData.confirmPassword}
                  required
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className='bg-gray-700 pl-10 w-full py-2 block rounded-md px-3 border border-gray-600 shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm placeholder-gray-400'
                  />
                </div>
              </div> 
              <button
              type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:via-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading}
              >

                  { loading ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden/>
                  </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" aria-hidden='true' /> Sign Up
                    </>
                    
                  ) }
              </button>
          </form>
          <p className="text-center mt-8 text-sm text-gray-400">Already have an account? {' '}
      <Link to={'/login'} className=" text-emerald-400 font-medium hover:text-emerald-300">Login here <ArrowRight className="inline h-5 w-5" /></Link>
      </p> 
        </div>
      </motion.div>
    </div>
  )
}

export default SignupPage
