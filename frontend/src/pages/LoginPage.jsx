import { useState } from "react";
import {motion} from 'framer-motion';
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, user } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login (email, password);
  };


  

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                      <LogIn className="mr-2 h-5 w-5" aria-hidden='true' /> Login
                    </>
                    
                  ) }
              </button>
          </form>
          <p className="text-center mt-8 text-sm text-gray-400">Not a member? {' '}
      <Link to={'/signup'} className=" text-emerald-400 font-medium hover:text-emerald-300">Sign up now <ArrowRight className="inline h-5 w-5" /></Link>
      </p> 
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
