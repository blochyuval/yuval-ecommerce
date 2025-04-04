import Stripe from 'stripe';
import configarations from '../utils/dotEnvProcess.js';

export const stripe = new Stripe(configarations.STRIPE_SECRETE_KEY);