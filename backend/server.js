import express from 'express';
import configarations from './utils/dotEnvProcess.js';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';
import paymentRoutes from './routes/payment.route.js'
import analyticsRoutes from './routes/analytics.route.js';



import connectDB from './lib/connectDB.js';
import cookieParser from 'cookie-parser';


const PORT = configarations.PORT || 5000;

const __direname = path.resolve()


const app = express();

app.use(express.json({limit: '10mb'}));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);

if(configarations.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}


app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
  connectDB();
});
