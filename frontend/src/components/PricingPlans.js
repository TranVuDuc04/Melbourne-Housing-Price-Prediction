// src/components/PricingPlans.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PricingPlans.css';

const PricingPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      title: 'Starter',
      price: 'Free',
      description: 'For individuals or hobbyists just getting started',
      features: [
        'Basic prediction features',
        'Limited access to insights',
        'Community support',
      ],
    },
    {
      title: 'Plus',
      price: '$15/month',
      description: 'For growing users needing additional insights',
      features: [
        'Access to advanced predictions',
        'Detailed housing insights',
        'Email support',
      ],
    },
    {
      title: 'Premium',
      price: '$45/month',
      description: 'For professionals and businesses',
      features: [
        'Unlimited predictions',
        'Access to exclusive datasets',
        'Priority email support',
        'Advanced analytics tools',
      ],
    },
    {
      title: 'Business',
      price: 'Contact Us',
      description: 'Custom solutions for enterprises',
      features: [
        'Tailored prediction models',
        'Dedicated account manager',
        'On-demand data analysis',
        '24/7 priority support',
      ],
    },
  ];

  const handleSelectPlan = (plan) => {
    navigate('/checkout', { state: { plan } });
  };

  return (
    <section className="pricing">
      <h2>Pricing Plans</h2>
      <div className="plans">
        {plans.map((plan, index) => (
          <div className="plan" key={index}>
            <h3>{plan.title}</h3>
            <p className="price">{plan.price}</p>
            <p className="description">{plan.description}</p>
            <ul className="features">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button onClick={() => handleSelectPlan(plan)}>Select Plan</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingPlans;
