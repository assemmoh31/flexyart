import { Check, X, Zap } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    priceMonthly: '$0',
    description: 'Perfect for casual users looking to buy artworks and use basic tools.',
    features: [
      'Access to all public artworks',
      'Basic profile cropper tool',
      'Standard support',
      '5% transaction fee on purchases',
      'Cannot list items for sale',
      'No animated previews'
    ],
    featured: false,
    cta: 'Get Started',
  },
  {
    name: 'Pro Creator',
    id: 'tier-pro',
    href: '#',
    priceMonthly: '$9.99',
    description: 'Everything you need to start selling your custom Steam artworks.',
    features: [
      'List up to 50 artworks per month',
      'Advanced background splitter tool',
      'Priority support',
      'Reduced 2.5% transaction fee',
      'Animated live previews',
      'Custom creator profile page',
      'Analytics dashboard'
    ],
    featured: true,
    cta: 'Start 14-Day Free Trial',
  },
  {
    name: 'Premium Agency',
    id: 'tier-agency',
    href: '#',
    priceMonthly: '$29.99',
    description: 'For established artists and teams managing multiple profiles.',
    features: [
      'Unlimited artwork listings',
      'All premium creator tools',
      '24/7 dedicated support',
      '0% transaction fee',
      'Featured listings on homepage',
      'Custom domain for portfolio',
      'Team collaboration tools',
      'API access'
    ],
    featured: false,
    cta: 'Contact Sales',
  },
];

export default function Pricing() {
  return (
    <div className="bg-slate-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-cyan-400">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose the right plan for your creative journey
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-400">
          Whether you're just browsing for a new profile look or building a business selling custom themes, we have a plan tailored for you.
        </p>
        
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-3xl p-8 ring-1 xl:p-10 flex flex-col justify-between ${
                  tier.featured
                    ? 'bg-slate-900 ring-cyan-500 shadow-2xl shadow-cyan-500/20 relative scale-105 z-10'
                    : 'bg-slate-900/50 ring-slate-800 hover:bg-slate-900 transition-colors'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-3 py-1 text-center text-sm font-semibold text-white shadow-sm">
                    Most Popular
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      id={tier.id}
                      className={`text-lg font-semibold leading-8 ${
                        tier.featured ? 'text-cyan-400' : 'text-white'
                      }`}
                    >
                      {tier.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-400">{tier.description}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-white">{tier.priceMonthly}</span>
                    <span className="text-sm font-semibold leading-6 text-slate-400">/month</span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-300">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        {feature.startsWith('Cannot') || feature.startsWith('No') ? (
                          <X className="h-6 w-5 flex-none text-slate-600" aria-hidden="true" />
                        ) : (
                          <Check className={`h-6 w-5 flex-none ${tier.featured ? 'text-cyan-400' : 'text-purple-400'}`} aria-hidden="true" />
                        )}
                        <span className={feature.startsWith('Cannot') || feature.startsWith('No') ? 'text-slate-500' : ''}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all ${
                    tier.featured
                      ? 'bg-cyan-500 text-white hover:bg-cyan-400 focus-visible:outline-cyan-500 shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-800 text-white hover:bg-slate-700 focus-visible:outline-slate-800'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-24 rounded-3xl bg-slate-900 px-6 py-16 sm:p-16 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-purple-500/10 blur-[80px]"></div>
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need a custom enterprise solution?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">
              We offer white-label marketplaces, custom API integrations, and dedicated account management for large studios.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Contact Sales
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white flex items-center gap-1 hover:text-cyan-400 transition-colors">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
