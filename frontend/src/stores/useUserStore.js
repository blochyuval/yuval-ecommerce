import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';


export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({name, email, password, confirmPassword}) => {
    set({ loading: true });

    if(password !== confirmPassword){
      set({loading: false});
      return toast.error('Password do not match');
    }
    try {
      const res = await axios.post('/auth/signup', {name, email, password});

      set({ user: res.data, loading: false })
    } catch (error) {
      set({ loading: false });
      toast.error( error.response.data.message || 'An error occurred');
    }
  },
  login: async (email, password) => {
    try {
      set({ loading: true });
      const res = await axios.post('/auth/login', {email, password});
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || 'An error occured');
    }

 },

 checkAuth: async () => {
  set({ checkingAuth: true })
  try {
    const res = await axios.get('/auth/profile');
    set({ user: res.data, checkingAuth: false });
  } catch (error) {
    console.error(error.message)
    set({ checkingAuth: false, user: null })
  }
 },
 logout: async() => {
  try {
    await axios.delete('/auth/logout');
    set({user: null})
  } catch (error) {
    toast.error(error.response.data.error);
  }
 },
 refreshToken: async () => {
  if(get().checkingAuth) return;

  set({ checkingAuth: true });
  try {
    const res = await axios.post('/auth/refresh-token');
    set({ checkingAuth: false })
    return res.data;
  } catch (error) {
    set({ user: null, checkAuth: false });
    throw error;

  }
 }
}))

let refreshPromise = null;

axios.interceptors.response.use((response) => response,
  async(error) => {
    const originalRequest = error.config;
    if(error.response?.status === 401 && !originalRequest._retry){
      originalRequest._retry = true

      try {
        if(refreshPromise) {
          await refreshPromise;
          return axios(originalRequest)

        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise
        refreshPromise = null

        return axios(originalRequest)
        
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
);