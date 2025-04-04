import {v2 as cloudinary} from 'cloudinary';
import configarations from '../utils/dotEnvProcess.js';

cloudinary.config({
  cloud_name: configarations.CLOUDINARY_CLOUD_NAME,
  api_key: configarations.CLOUDINARY_API_KEY,
  api_secret: configarations.CLOUDINARY_API_SECRET
});

export default cloudinary