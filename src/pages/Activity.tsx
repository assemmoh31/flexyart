import React, { useState } from 'react';
import { ShoppingCart, CheckCircle, AlertTriangle, Wallet, MessageSquare, UserPlus, Bell, Filter, Search, MoreHorizontal, Trash2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

type NotificationType = 'sale' | 'approval' | 'rejection' | 'withdrawal' | 'comment' | 'follow' | 'system';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
  image?: string;
}

const mockNotifications: Notification[] = [
  { 
    id: 1, 
    type: 'sale', 
    title: 'New Sale!',
    message: "You just sold 'Cyberpunk Neon' for €15.00!", 
    time: "5 mins ago", 
    read: false,
    image: 'https://picsum.photos/seed/cyber1/100/100'
  },
  { 
    id: 2, 
    type: 'approval', 
    title: 'Artwork Approved',
    message: "Your artwork 'Ethereal Forest' has been approved and is now Live on the marketplace.", 
    time: "2 hours ago", 
    read: false,
    image: 'https://picsum.photos/seed/forest1/100/100'
  },
  { 
    id: 3, 
    type: 'follow', 
    title: 'New Follower',
    message: "RetroKing started following you.", 
    time: "5 hours ago", 
    read: true,
    image: 'https://picsum.photos/seed/user3/100/100'
  },
  { 
    id: 4, 
    type: 'comment', 
    title: 'New Comment',
    message: "PixelMaster commented on 'Neon Alleyway': \"This looks absolutely stunning!\"", 
    time: "1 day ago", 
    read: true,
    image: 'https://picsum.photos/seed/alley1/100/100'
  },
  { 
    id: 5, 
    type: 'rejection', 
    title: 'Artwork Rejected',
    message: "Your artwork 'Test Art' was rejected. Reason: Poor image quality. Please check our guidelines.", 
    time: "1 day ago", 
    read: true 
  },
  { 
    id: 6, 
    type: 'withdrawal', 
    title: 'Payout Processed',
    message: "Your payout of €50.00 has been processed to your PayPal account.", 
    time: "2 days ago", 
    read: true 
  },
  { 
    id: 7, 
    type: 'sale', 
    title: 'New Sale!',
    message: "You just sold 'Retro Wave' for €12.00!", 
    time: "3 days ago", 
    read: true,
    image: 'https://picsum.photos/seed/retro1/100/100'
  },
  { 
    id: 8, 
    type: 'system', 
    title: 'System Update',
    message: "We've updated our Terms of Service. Please review the changes.", 
    time: "1 week ago", 
    read: true 
  },
];

export default function Activity() {
  const [filter, setFilter] = useState<string>('all');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'sale': return <ShoppingCart className="w-5 h-5 text-emerald-400" />;
      case 'approval': return <CheckCircle className="w-5 h-5 text-blue-400" />;
      case 'rejection': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'withdrawal': return <Wallet className="w-5 h-5 text-purple-400" />;
      case 'comment': return <MessageSquare className="w-5 h-5 text-yellow-400" />;
      case 'follow': return <UserPlus className="w-5 h-5 text-pink-400" />;
      case 'system': return <Bell className="w-5 h-5 text-slate-400" />;
      default: return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  const getBgColor = (type: NotificationType) => {
    switch (type) {
      case 'sale': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'approval': return 'bg-blue-500/10 border-blue-500/20';
      case 'rejection': return 'bg-red-500/10 border-red-500/20';
      case 'withdrawal': return 'bg-purple-500/10 border-purple-500/20';
      case 'comment': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'follow': return 'bg-pink-500/10 border-pink-500/20';
      default: return 'bg-slate-800 border-slate-700';
    }
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesFilter = filter === 'all' || n.type === filter || (filter === 'unread' && !n.read);
    const matchesSearch = n.message.toLowerCase().includes(searchQuery.toLowerCase()) || n.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Activity & Notifications</h1>
            <p className="text-slate-400">Stay updated with your sales, comments, and system alerts.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={markAllRead}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              <Check className="w-4 h-4" /> Mark all as read
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-8 backdrop-blur-sm sticky top-20 z-30">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {[
                { id: 'all', label: 'All' },
                { id: 'unread', label: 'Unread' },
                { id: 'sale', label: 'Sales' },
                { id: 'approval', label: 'System' }, // Grouping approval/rejection/system roughly or just specific
                { id: 'comment', label: 'Comments' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    filter === tab.id 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search activity..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`group relative flex gap-4 p-5 rounded-xl border transition-all duration-300 ${
                  notification.read 
                    ? 'bg-slate-900/30 border-slate-800/50 hover:border-slate-700' 
                    : 'bg-slate-900/80 border-slate-700 shadow-[0_0_15px_rgba(0,0,0,0.2)]'
                }`}
              >
                {/* Icon/Image */}
                <div className="flex-shrink-0">
                  {notification.image ? (
                    <div className="relative">
                      <img src={notification.image} alt="Context" className="w-12 h-12 rounded-lg object-cover border border-slate-700" />
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900 ${getBgColor(notification.type)}`}>
                        {getIcon(notification.type)}
                      </div>
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getBgColor(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`text-base font-semibold ${notification.read ? 'text-slate-300' : 'text-white'}`}>
                        {notification.title}
                        {!notification.read && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>}
                      </h3>
                      <p className="text-slate-400 mt-1 text-sm leading-relaxed">{notification.message}</p>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{notification.time}</span>
                  </div>
                </div>

                {/* Actions (Hover) */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm p-1 rounded-lg border border-slate-800">
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-md hover:bg-slate-800 transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-slate-800 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">No notifications found</h3>
              <p className="text-slate-500">You're all caught up! Check back later for new activity.</p>
              {filter !== 'all' && (
                <button 
                  onClick={() => setFilter('all')}
                  className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Load More (Mock) */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm font-medium">
              Load Older Activity
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
