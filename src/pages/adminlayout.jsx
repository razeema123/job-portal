 import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Bell,
  Search,
  Settings,
  Menu,
  Home,
  BarChart3,
  Package,
  UserCheck,
  Calendar,
  Mail,
  Activity,
  Eye,
  MousePointer,
  Clock,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Edit,
  Trash2,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  UserPlus,
  Shield,
  ShieldCheck,
  ShieldX
} from 'lucide-react';

const AdminApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');


  // Add these new page components inside your AdminApp component:
const usersData = [
    {
      id: 1,
      name: 'Revathy R',
      email: 'revathy.r@example.com',
      role: 'Frontend Developer',
      status: 'active',
      lastLogin: '2024-01-15',
      joinDate: '2023-05-12',
      avatar: 'RR',
      location: 'Kottayam, Kerala',
      phone: '+91 9876543210',
      projects: 12
    },
    {
      id: 2,
      name: 'Darshana P',
      email: 'darshana.p@example.com',
      role: 'Backend Developer',
      status: 'active',
      lastLogin: '2024-01-14',
      joinDate: '2023-03-08',
      avatar: 'DP',
      location: 'Ernakulam, Kerala',
      phone: '+91 9876543211',
      projects: 8
    },
    {
      id: 3,
      name: 'Reghuvaran',
      email: 'reghuvaran@example.com',
      role: 'Full Stack Developer',
      status: 'inactive',
      lastLogin: '2024-01-10',
      joinDate: '2023-01-15',
      avatar: 'RG',
      location: 'Thrissur, Kerala',
      phone: '+91 9876543212',
      projects: 15
    },
    {
      id: 4,
      name: 'Tinu',
      email: 'tinu@example.com',
      role: 'Software Tester',
      status: 'active',
      lastLogin: '2024-01-15',
      joinDate: '2023-07-20',
      avatar: 'TN',
      location: 'Kochi, Kerala',
      phone: '+91 9876543213',
      projects: 6
    },
    {
      id: 5,
      name: 'Praseeda',
      email: 'praseeda@example.com',
      role: 'UI/UX Designer',
      status: 'active',
      lastLogin: '2024-01-13',
      joinDate: '2023-09-05',
      avatar: 'PR',
      location: 'Calicut, Kerala',
      phone: '+91 9876543214',
      projects: 9
    },
    {
      id: 6,
      name: 'Ashwin',
      email: 'ashwin@example.com',
      role: 'DevOps Engineer',
      status: 'pending',
      lastLogin: '2024-01-12',
      joinDate: '2023-11-18',
      avatar: 'AS',
      location: 'Trivandrum, Kerala',
      phone: '+91 9876543215',
      projects: 4
    }
  ];

 
  const filteredUsers = usersData
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                           user.role.toLowerCase().includes(userSearchTerm.toLowerCase());
      const matchesFilter = userFilter === 'all' || user.status === userFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'joinDate' || sortBy === 'lastLogin') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <ShieldCheck size={16} className="text-green-600" />;
      case 'inactive':
        return <ShieldX size={16} className="text-red-600" />;
      case 'pending':
        return <Shield size={16} className="text-yellow-600" />;
      default:
        return <Shield size={16} className="text-gray-600" />;
    }
  };

const UsersPage = () => (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
      {/* Users Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
            <p className="text-gray-600">Manage and monitor all registered users</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Download size={20} />
              <span>Export</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <UserPlus size={20} />
              <span>Add User</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{usersData.length}</p>
              </div>
              <Users size={24} className="text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {usersData.filter(u => u.status === 'active').length}
                </p>
              </div>
              <ShieldCheck size={24} className="text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {usersData.filter(u => u.status === 'pending').length}
                </p>
              </div>
              <Shield size={24} className="text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-900">
                  {usersData.filter(u => u.status === 'inactive').length}
                </p>
              </div>
              <ShieldX size={24} className="text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users by name, email, or role..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full lg:w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-4">
              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-500" />
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Sort */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="joinDate-desc">Newest First</option>
                <option value="joinDate-asc">Oldest First</option>
                <option value="lastLogin-desc">Last Login (Recent)</option>
                <option value="projects-desc">Most Projects</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{user.avatar}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(user.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.location}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.projects}</div>
                    <div className="text-xs text-gray-500">projects</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Joined {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {filteredUsers.length} of {usersData.length} users
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );


const SettingsPage = () => (
  <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
    <h2 className="text-2xl font-bold mb-4">Settings</h2>
    <p className="text-gray-600">This is the settings page where you can manage preferences and configurations.</p>
  </main>
);

 

 
  // Dashboard Data
  const salesData = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
  ];

  const pieData = [
    { name: 'Backend devoloper', value: 400, color: '#8884d8' },
    { name: 'Frontend devoloper', value: 300, color: '#82ca9d' },
    { name: 'full stack devoloper', value: 200, color: '#ffc658' },
    { name: 'Software tester', value: 100, color: '#ff7c7c' },
  ];

  const recentActivities = [
    { id: 1, user: 'Revathy R', action: 'Created new order', time: '2 mins ago' },
    { id: 2, user: 'darshana p', action: 'Updated product inventory', time: '5 mins ago' },
    { id: 3, user: 'Reghuvaran', action: 'Processed refund', time: '10 mins ago' },
    { id: 4, user: 'Tinu', action: 'Added new customer', time: '15 mins ago' },
    { id: 5, user: 'praseeda', action: 'Updated user profile', time: '20 mins ago' },
    { id: 6, user: 'Ashwin', action: 'Processed payment', time: '25 mins ago' },
  ];

  // Analytics Data
  const trafficData = [
    { name: 'Mon', visitors: 4000, pageViews: 12000, bounceRate: 35 },
    { name: 'Tue', visitors: 3000, pageViews: 9000, bounceRate: 42 },
    { name: 'Wed', visitors: 2000, pageViews: 8000, bounceRate: 28 },
    { name: 'Thu', visitors: 2780, pageViews: 11000, bounceRate: 38 },
    { name: 'Fri', visitors: 1890, pageViews: 7500, bounceRate: 45 },
    { name: 'Sat', visitors: 2390, pageViews: 9500, bounceRate: 32 },
    { name: 'Sun', visitors: 3490, pageViews: 13000, bounceRate: 29 },
  ];

  const conversionData = [
    { name: 'Week 1', conversions: 65, visitors: 1000 },
    { name: 'Week 2', conversions: 78, visitors: 1200 },
    { name: 'Week 3', conversions: 52, visitors: 900 },
    { name: 'Week 4', conversions: 91, visitors: 1400 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#3b82f6' },
    { name: 'Mobile', value: 35, color: '#10b981' },
    { name: 'Tablet', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#8b5cf6' },
  ];

  const topPages = [
    { page: '/dashboard', views: 15420, percentage: 28.5 },
    { page: '/analytics', views: 9650, percentage: 17.8 },
    { page: '/users', views: 7230, percentage: 13.4 },
    { page: '/settings', views: 4890, percentage: 9.0 },
  ];

  const filteredActivities = recentActivities.filter(activity =>
    activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow duration-200" 
         style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          <p className={`text-sm font-medium flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
            {Math.abs(change)}% from last month
          </p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  const navigationItems = [
    { icon: Home, label: 'Dashboard', key: 'dashboard' },
    { icon: BarChart3, label: 'Analytics', key: 'analytics' },
    { icon: Users, label: 'Users', key: 'users' },
 
    { icon: ShoppingCart, label: 'Orders', key: 'orders' },
    { icon: Mail, label: 'Messages', key: 'messages' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  const DashboardPage = () => (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Applications"
          value="54,239"
          change={12.5}
          icon={DollarSign}
          color="#10b981"
        />
        <StatCard
          title="shortlisted"
          value="8,549"
          change={8.2}
          icon={Users}
          color="#3b82f6"
        />
        <StatCard
          title="Latest Recruiters"
          value="1,423"
          change={-2.1}
          icon={ShoppingCart}
          color="#f59e0b"
        />
        <StatCard
          title="views"
          value="24.8%"
          change={15.3}
          icon={TrendingUp}
          color="#8b5cf6"
        />
      </div>
       
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Overview</h3>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Upcoming</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Ongoing</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Usage Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Device Usage</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Recent Activity 
              {searchTerm && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({filteredActivities.length} of {recentActivities.length} results)
                </span>
              )}
            </h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Activity size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{activity.time}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg font-medium">No activities found</p>
                <p className="text-gray-400 text-sm">Try searching for a different term</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { icon: UserCheck, label: 'Add New User', color: '#3b82f6', bg: 'bg-blue-50' },
              { icon: Package, label: 'Review jobrequests', color: '#10b981', bg: 'bg-green-50' },
              { icon: Calendar, label: 'Schedule Meeting', color: '#f59e0b', bg: 'bg-yellow-50' },
              { icon: Mail, label: 'Send Newsletter', color: '#8b5cf6', bg: 'bg-purple-50' },
            ].map((action, index) => (
              <button
                key={index}
                className={`w-full flex items-center space-x-3 p-4 text-left rounded-lg border hover:shadow-md transition-all duration-200 ${action.bg}`}
              >
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  <action.icon size={20} style={{ color: action.color }} />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );

  const AnalyticsPage = () => (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
      {/* Analytics Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Visitors"
          value="24,567"
          change={18.2}
          icon={Eye}
          color="#3b82f6"
        />
        <StatCard
          title="Page Views"
          value="68,420"
          change={12.8}
          icon={MousePointer}
          color="#10b981"
        />
        <StatCard
          title="Avg. Session"
          value="3m 24s"
          change={-5.4}
          icon={Clock}
          color="#f59e0b"
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          change={8.7}
          icon={Target}
          color="#8b5cf6"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Traffic Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Traffic Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Area type="monotone" dataKey="visitors" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVisitors)" />
                <Area type="monotone" dataKey="pageViews" stroke="#10b981" fillOpacity={1} fill="url(#colorPageViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Conversion Rate Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Pages</h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{page.page}</p>
                    <p className="text-xs text-gray-600">{page.views.toLocaleString()} views</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{page.percentage}%</p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Analytics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Device Analytics</h3>
          
          {/* Device Pie Chart */}
          <div className="h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Device List */}
          <div className="space-y-3">
            {[
              { icon: Monitor, label: 'Desktop', value: '45%', color: '#3b82f6' },
              { icon: Smartphone, label: 'Mobile', value: '35%', color: '#10b981' },
              { icon: Tablet, label: 'Tablet', value: '15%', color: '#f59e0b' },
              { icon: Globe, label: 'Other', value: '5%', color: '#8b5cf6' },
            ].map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <device.icon size={20} style={{ color: device.color }} />
                  <span className="text-sm font-medium text-gray-700">{device.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{device.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Logo */}
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <h1 className="text-white text-xl font-bold">Admin Panel</h1>
        </div>
        
        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(item.key)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === item.key
                    ? 'bg-gray-800 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
                {currentPage === item.key && (
                  <div className="ml-auto h-2 w-2 bg-blue-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-full p-4 bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">MJ</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Michael Jackson</p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-gray-700 lg:hidden"
              >
                <Menu size={24} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentPage === 'dashboard' ? 'Dashboard' : 'Analytics'}
                </h2>
                <p className="text-sm text-gray-600">
                  {currentPage === 'dashboard' ? 'Welcome back,Michael Jackson!' : 'Detailed insights and metrics'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Avatar */}
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
         {currentPage === 'dashboard' && <DashboardPage />}
{currentPage === 'analytics' && <AnalyticsPage />}
{currentPage === 'users' && <UsersPage />}
 
{currentPage === 'settings' && <SettingsPage />}

      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminApp;