import { useState } from 'react'
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Download,
  Search,
  X,
  AlertCircle,
  RefreshCw,
  Zap,
  Crown,
  Shield
} from 'lucide-react'
import AddSubscriptionModal from './AddSubscriptionModal'
import SubscriptionsTable from './SubscriptionsTable'

const ManageSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      planName: 'Premium Music Pro',
      userName: 'John Doe',
      email: 'john.doe@example.com',
      price: 29.99,
      billingCycle: 'monthly',
      status: 'active',
      startDate: '2024-01-15',
      nextBillingDate: '2024-11-15',
      autoRenew: true,
      features: ['Unlimited Tracks', 'HD Audio', 'No Ads'],
      tier: 'premium'
    },
    {
      id: 2,
      planName: 'Basic Stream',
      userName: 'Jane Smith',
      email: 'jane.smith@example.com',
      price: 9.99,
      billingCycle: 'monthly',
      status: 'active',
      startDate: '2024-02-01',
      nextBillingDate: '2024-11-01',
      autoRenew: true,
      features: ['Limited Tracks', 'Standard Audio'],
      tier: 'basic'
    },
    {
      id: 3,
      planName: 'Enterprise Suite',
      userName: 'Acme Corporation',
      email: 'admin@acme.com',
      price: 199.99,
      billingCycle: 'yearly',
      status: 'active',
      startDate: '2024-01-01',
      nextBillingDate: '2025-01-01',
      autoRenew: true,
      features: ['Unlimited Everything', 'Priority Support', 'Custom Branding'],
      tier: 'enterprise'
    },
    {
      id: 4,
      planName: 'Student Plan',
      userName: 'Alex Johnson',
      email: 'alex.j@university.edu',
      price: 4.99,
      billingCycle: 'monthly',
      status: 'cancelled',
      startDate: '2024-03-10',
      nextBillingDate: '2024-10-10',
      autoRenew: false,
      features: ['Limited Tracks', 'Standard Audio', 'Student Discount'],
      tier: 'basic'
    },
    {
      id: 5,
      planName: 'Premium Music Pro',
      userName: 'Sarah Williams',
      email: 'sarah.w@email.com',
      price: 29.99,
      billingCycle: 'monthly',
      status: 'pending',
      startDate: '2024-10-01',
      nextBillingDate: '2024-11-01',
      autoRenew: true,
      features: ['Unlimited Tracks', 'HD Audio', 'No Ads'],
      tier: 'premium'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedTier, setSelectedTier] = useState('all')
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = 
      sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.planName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || sub.status === selectedStatus
    const matchesTier = selectedTier === 'all' || sub.tier === selectedTier

    return matchesSearch && matchesStatus && matchesTier
  })

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id))
    }
  }

  const handleAddSubscription = (newSubscription) => {
    setSubscriptions(prev => [...prev, newSubscription])
  }

  const toggleSelection = (id) => {
    setSelectedSubscriptions(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const getTotalRevenue = () => {
    return subscriptions
      .filter(sub => sub.status === 'active')
      .reduce((acc, sub) => {
        const multiplier = sub.billingCycle === 'yearly' ? 1 : 12
        return acc + (sub.price * multiplier)
      }, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold mb-2">Manage Subscriptions</h1>
              <p className="text-white/80 text-lg">Track and manage all subscription plans</p>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">{subscriptions.length} Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">
                    {subscriptions.filter(s => s.status === 'active').length} Active
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="font-semibold">
                    ${getTotalRevenue().toLocaleString()}/year
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 px-4 py-2 rounded-xl transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-white text-indigo-600 hover:bg-white/90 font-semibold px-6 py-2 rounded-xl transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Subscription
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Statistics Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Active</h4>
              <p className="text-sm text-gray-600">Subscriptions</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {subscriptions.filter(s => s.status === 'active').length}
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
            <TrendingUp className="h-4 w-4" />
            <span>+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Revenue</h4>
              <p className="text-sm text-gray-600">Annual (MRR)</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            ${(getTotalRevenue() / 1000).toFixed(1)}K
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-600 mt-2">
            <TrendingUp className="h-4 w-4" />
            <span>+8.3% growth</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Pending</h4>
              <p className="text-sm text-gray-600">Awaiting payment</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {subscriptions.filter(s => s.status === 'pending').length}
          </div>
          <div className="flex items-center gap-2 text-sm text-yellow-600 mt-2">
            <AlertCircle className="h-4 w-4" />
            <span>Needs attention</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center">
              <XCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Cancelled</h4>
              <p className="text-sm text-gray-600">This month</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {subscriptions.filter(s => s.status === 'cancelled').length}
          </div>
          <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
            <AlertCircle className="h-4 w-4" />
            <span>-2.1% churn rate</span>
          </div>
        </div>
      </div> */}

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
          {/* Status Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedStatus === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({subscriptions.length})
            </button>
            <button
              onClick={() => setSelectedStatus('active')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedStatus === 'active'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Active ({subscriptions.filter(s => s.status === 'active').length})
            </button>
            <button
              onClick={() => setSelectedStatus('pending')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedStatus === 'pending'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pending ({subscriptions.filter(s => s.status === 'pending').length})
            </button>
            <button
              onClick={() => setSelectedStatus('cancelled')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedStatus === 'cancelled'
                  ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Cancelled ({subscriptions.filter(s => s.status === 'cancelled').length})
            </button>
          </div>

          {/* Tier Filter & Search */}
          <div className="flex items-center gap-3">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Tiers</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2.5 w-80 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Selected Items Actions */}
        {selectedSubscriptions.length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-blue-900">
                {selectedSubscriptions.length} subscription(s) selected
              </span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-white rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Renew All
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-white rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1">
                  <Trash2 className="h-3 w-3" />
                  Cancel Selected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subscriptions Table Component */}
        <SubscriptionsTable 
          subscriptions={filteredSubscriptions}
          selectedSubscriptions={selectedSubscriptions}
          onToggleSelection={toggleSelection}
          onSelectAll={(ids) => setSelectedSubscriptions(ids)}
          onDelete={handleDelete}
        />
      </div>

      {/* Add Subscription Modal */}
      <AddSubscriptionModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSubscription={handleAddSubscription}
      />
    </div>
  )
}

export default ManageSubscriptions