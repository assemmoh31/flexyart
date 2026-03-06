import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, X, LogOut, Upload, LayoutDashboard, Bell, CheckCircle, AlertTriangle, Wallet, ShieldAlert, Trash2 } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

type NotificationType = 'sale' | 'approval' | 'rejection' | 'withdrawal';

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  time: string;
  read: boolean;
}

const SantaHatSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M374.9 146.4C366.1 113.8 340.2 86.8 307.3 76.5L289.4 70.9C247.7 57.9 203.8 78.4 186.2 119.1L156.4 187.9C151.7 198.8 142.1 206.5 130.5 208.7L96.3 215.2C72.2 219.8 54.8 240.8 54.8 265.3V272C54.8 298.5 76.3 320 102.8 320H409.2C435.7 320 457.2 298.5 457.2 272V265.3C457.2 240.8 439.8 219.8 415.7 215.2L381.5 208.7C369.9 206.5 360.3 198.8 355.6 187.9L374.9 146.4Z" fill="#EF4444"/>
    <path d="M409.2 320H102.8C76.3 320 54.8 341.5 54.8 368C54.8 394.5 76.3 416 102.8 416H409.2C435.7 416 457.2 394.5 457.2 368C457.2 341.5 435.7 320 409.2 320Z" fill="#F8FAFC"/>
    <circle cx="296" cy="72" r="48" fill="#F8FAFC"/>
  </svg>
);

export default function Navbar() {
  const { activeTheme } = useTheme();
  const { cart, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'sale', message: "You just sold 'Cyberpunk Neon' for €15.00!", time: "5 mins ago", read: false },
    { id: 2, type: 'approval', message: "Your artwork 'Ethereal Forest' has been approved and is now Live.", time: "2 hours ago", read: false },
    { id: 3, type: 'rejection', message: "Your artwork 'Test Art' was rejected. Reason: Poor quality.", time: "1 day ago", read: true },
    { id: 4, type: 'withdrawal', message: "Your payout of €50.00 has been processed.", time: "2 days ago", read: true },
    { id: 5, type: 'sale', message: "You just sold 'Retro Wave' for €12.00!", time: "3 days ago", read: true },
  ]);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('flexy_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsCartOpen]);

  const handleMockLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    const mockUser = {
      handle: 'NeonDreams',
      name: 'Neon Dreams Studio',
      avatar: 'https://picsum.photos/seed/user1/150/150',
      isAdmin: true // Mock admin privilege
    };
    localStorage.setItem('flexy_user', JSON.stringify(mockUser));
    setUser(mockUser);
    navigate('/creator/NeonDreams');
  };

  const handleLogout = () => {
    localStorage.removeItem('flexy_user');
    setUser(null);
    setIsUserDropdownOpen(false);
    setIsNotificationsOpen(false);
    navigate('/');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'sale': return <ShoppingCart className="w-4 h-4 text-emerald-400" />;
      case 'approval': return <CheckCircle className="w-4 h-4 text-blue-400" />;
      case 'rejection': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'withdrawal': return <Wallet className="w-4 h-4 text-purple-400" />;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'sale': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'approval': return 'bg-blue-500/10 border-blue-500/20';
      case 'rejection': return 'bg-red-500/10 border-red-500/20';
      case 'withdrawal': return 'bg-purple-500/10 border-purple-500/20';
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Tools', path: '/tools' },
    { name: 'Themes', path: '/themes' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 relative">
              {activeTheme === 'christmas' && (
                <SantaHatSVG className="absolute -top-3 -left-2 w-6 h-6 z-10 -rotate-12" />
              )}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 text-white font-bold text-xl relative">
                F
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Flexy<span className="text-cyan-400">Art</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                    isActive(link.path) ? 'text-cyan-400' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-slate-300 hover:text-cyan-400 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            {/* Cart Dropdown */}
            <div className="relative" ref={cartRef}>
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-cyan-500 text-[10px] font-bold text-black flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                  <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="font-semibold text-white">Shopping Cart</h3>
                    <span className="text-xs text-slate-400">{cart.length} items</span>
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto">
                    {cart.length === 0 ? (
                      <div className="px-4 py-8 text-center text-slate-500 text-sm flex flex-col items-center justify-center">
                        <ShoppingCart className="w-12 h-12 mb-3 opacity-20" />
                        Your cart is empty.
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-800">
                        {cart.map((item) => (
                          <div key={item.id} className="p-4 flex gap-3 hover:bg-slate-800/30 transition-colors">
                            <img src={item.image} alt={item.title} className="w-12 h-12 rounded-md object-cover bg-slate-800" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-white truncate">{item.title}</h4>
                              <p className="text-xs text-slate-400 truncate">{item.creator}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-sm font-bold text-cyan-400">€{item.price.toFixed(2)}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                                  className="text-slate-500 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-slate-400">Total</span>
                      <span className="text-lg font-bold text-white">€{cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={cart.length === 0}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Link 
              to="/upload"
              className="hidden md:flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-400 transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              <Upload className="h-4 w-4" />
              Upload
            </Link>
            <div className="h-8 w-px bg-slate-800"></div>
            
            {user ? (
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative p-2 text-slate-300 hover:text-white transition-colors focus:outline-none"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></span>
                    )}
                  </button>

                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                      <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                        <h3 className="font-semibold text-white">Notifications</h3>
                        <button 
                          onClick={markAllAsRead}
                          className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-8 text-center text-slate-500 text-sm flex flex-col items-center justify-center">
                            {activeTheme === 'valentine' ? (
                              <svg className="w-16 h-16 mb-4 text-pink-400 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/>
                                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>
                                <path d="M12 14v.01"/>
                                <path d="M12 10v.01"/>
                                <path d="M12 18v.01"/>
                                <path d="M12 6v.01"/>
                                <path d="M12 2v.01"/>
                                <path d="M12 22v.01"/>
                                <path d="M16 14v.01"/>
                                <path d="M8 14v.01"/>
                                <path d="M16 10v.01"/>
                                <path d="M8 10v.01"/>
                                <path d="M16 18v.01"/>
                                <path d="M8 18v.01"/>
                                <path d="M16 6v.01"/>
                                <path d="M8 6v.01"/>
                                <path d="M16 2v.01"/>
                                <path d="M8 2v.01"/>
                                <path d="M16 22v.01"/>
                                <path d="M8 22v.01"/>
                                <path d="M20 14v.01"/>
                                <path d="M4 14v.01"/>
                                <path d="M20 10v.01"/>
                                <path d="M4 10v.01"/>
                                <path d="M20 18v.01"/>
                                <path d="M4 18v.01"/>
                                <path d="M20 6v.01"/>
                                <path d="M4 6v.01"/>
                                <path d="M20 2v.01"/>
                                <path d="M4 2v.01"/>
                                <path d="M20 22v.01"/>
                                <path d="M4 22v.01"/>
                                <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#F48FB1" stroke="none"/>
                              </svg>
                            ) : null}
                            No notifications yet.
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 last:border-0 ${!notification.read ? 'bg-slate-800/30' : ''} ${activeTheme === 'lunar' ? 'notification-hongbao m-2' : ''}`}
                            >
                              <div className="flex gap-3 relative z-10">
                                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${activeTheme === 'lunar' ? 'bg-[#FFC107]/20 border-[#FFC107]/50 text-[#FFC107]' : getNotificationColor(notification.type)}`}>
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm leading-snug ${activeTheme === 'lunar' ? 'text-white' : 'text-slate-200'}`}>
                                    {notification.message}
                                  </p>
                                  <p className={`text-xs mt-1 ${activeTheme === 'lunar' ? 'text-[#FFC107]/80' : 'text-slate-500'}`}>
                                    {notification.time}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <div className={`mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0 ${activeTheme === 'lunar' ? 'bg-[#FFC107]' : 'bg-cyan-500'}`}></div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="px-4 py-2 border-t border-slate-800 text-center">
                        <Link 
                          to="/activity" 
                          className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
                          onClick={() => setIsNotificationsOpen(false)}
                        >
                          View All Activity
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none relative"
                  >
                    {activeTheme === 'christmas' && (
                      <SantaHatSVG className="absolute -top-3 -left-2 w-6 h-6 z-10 -rotate-12" />
                    )}
                    <img src={user.avatar} alt={user.handle} className="h-8 w-8 rounded-full border border-slate-700 relative" />
                    <span className="hidden sm:inline">{user.handle}</span>
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <Link 
                        to={`/creator/${user.handle}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link 
                        to="/studio"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Creator Studio
                      </Link>
                      {user.isAdmin && (
                        <Link 
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <ShieldAlert className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}
                      <div className="h-px bg-slate-800 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button 
                onClick={handleMockLogin}
                className="flex items-center gap-2 rounded-md bg-[#171a21] px-4 py-2 text-sm font-bold text-[#c5c3c0] transition-all hover:bg-[#1b2838] hover:text-white hover:shadow-[0_0_15px_rgba(102,192,244,0.3)] border border-[#2a475e]"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.979 0C5.668 0 .504 4.904.005 11.12l4.629 6.758c.953-.404 2.02-.38 2.953.107l3.664-5.286c-.053-.396-.066-.805-.02-1.218.318-2.853 2.91-4.906 5.764-4.588 2.853.318 4.906 2.91 4.588 5.764-.318 2.853-2.91 4.906-5.764 4.588-1.72-.192-3.158-1.198-3.967-2.585l-4.22 1.633c.125.618.066 1.28-.217 1.875l-7.398 2.92c1.467 1.832 3.716 2.91 6.162 2.91 4.418 0 8-3.582 8-8s-3.582-8-8-8zm-1.807 13.91c.884-.098 1.52.536 1.422 1.42-.098.884-.898 1.52-1.782 1.422-.884-.098-1.52-.898-1.422-1.782.098-.884.898-1.52 1.782-1.06zm3.326-2.27c1.547-.172 2.66 1.11 2.488 2.658-.172 1.547-1.57 2.66-3.117 2.488-1.547-.172-2.66-1.57-2.488-3.117.172-1.547 1.57-2.66 3.117-2.03z"/></svg>
                Sign in with Steam (Demo)
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <button className="text-slate-300 hover:text-white">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-slate-800 text-cyan-400'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 border-t border-slate-800 pt-4 space-y-3">
              <Link 
                to="/upload"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-base font-bold text-cyan-400 transition-all hover:bg-cyan-500 hover:text-black"
              >
                <Upload className="h-5 w-5" />
                Upload Artwork
              </Link>
              {user ? (
                <div className="space-y-3">
                  <Link 
                    to={`/creator/${user.handle}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <img src={user.avatar} alt={user.handle} className="h-8 w-8 rounded-full" />
                    <span className="font-medium">{user.handle}</span>
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-red-400 hover:bg-slate-800"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={(e) => { handleMockLogin(e); setIsMobileMenuOpen(false); }}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#171a21] px-4 py-2 text-base font-bold text-[#c5c3c0] transition-all hover:bg-[#1b2838] hover:text-white border border-[#2a475e]"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.979 0C5.668 0 .504 4.904.005 11.12l4.629 6.758c.953-.404 2.02-.38 2.953.107l3.664-5.286c-.053-.396-.066-.805-.02-1.218.318-2.853 2.91-4.906 5.764-4.588 2.853.318 4.906 2.91 4.588 5.764-.318 2.853-2.91 4.906-5.764 4.588-1.72-.192-3.158-1.198-3.967-2.585l-4.22 1.633c.125.618.066 1.28-.217 1.875l-7.398 2.92c1.467 1.832 3.716 2.91 6.162 2.91 4.418 0 8-3.582 8-8s-3.582-8-8-8zm-1.807 13.91c.884-.098 1.52.536 1.422 1.42-.098.884-.898 1.52-1.782 1.422-.884-.098-1.52-.898-1.422-1.782.098-.884.898-1.52 1.782-1.06zm3.326-2.27c1.547-.172 2.66 1.11 2.488 2.658-.172 1.547-1.57 2.66-3.117 2.488-1.547-.172-2.66-1.57-2.488-3.117.172-1.547 1.57-2.66 3.117-2.03z"/></svg>
                  Sign in with Steam (Demo)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
