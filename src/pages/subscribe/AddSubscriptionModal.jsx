import { useState } from 'react'
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Plus,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
  Download,
  Search,
  Filter,
  X,
  Eye,
  AlertCircle,
  RefreshCw,
  Zap,
  Crown,
  Shield,
  Star,
  Mail,
  User,
  Tag,
  Sparkles
} from 'lucide-react'

// Add Subscription Modal Component
const AddSubscriptionModal = ({ isOpen, onClose, onAddSubscription }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    planName: '',
    tier: '',
    price: '',
    billingCycle: 'monthly',
    autoRenew: true,
    startDate: new Date().toISOString().split('T')[0]
  })

  const plans = {
    basic: [
      { name: 'Basic Stream', price: 9.99 },
      { name: 'Student Plan', price: 4.99 }
    ],
    premium: [
      { name: 'Premium Music Pro', price: 29.99 },
      { name: 'Premium Plus', price: 39.99 }
    ],
    enterprise: [
      { name: 'Enterprise Suite', price: 199.99 },
      { name: 'Enterprise Pro', price: 299.99 }
    ]
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleTierChange = (e) => {
    const tier = e.target.value
    setFormData(prev => ({
      ...prev,
      tier: tier,
      planName: '',
      price: ''
    }))
  }

  const handlePlanChange = (e) => {
    const planName = e.target.value
    const selectedPlan = plans[formData.tier]?.find(p => p.name === planName)
    setFormData(prev => ({
      ...prev,
      planName: planName,
      price: selectedPlan ? selectedPlan.price : ''
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.userName || !formData.email || !formData.planName || !formData.tier) {
      alert('Please fill in all required fields')
      return
    }

    const nextBillingDate = new Date(formData.startDate)
    if (formData.billingCycle === 'monthly') {
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
    } else {
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1)
    }

    const newSubscription = {
      id: Date.now(),
      userName: formData.userName,
      email: formData.email,
      planName: formData.planName,
      tier: formData.tier,
      price: parseFloat(formData.price),
      billingCycle: formData.billingCycle,
      status: 'active',
      startDate: formData.startDate,
      nextBillingDate: nextBillingDate.toISOString().split('T')[0],
      autoRenew: formData.autoRenew,
      features: formData.tier === 'basic' 
        ? ['Limited Tracks', 'Standard Audio']
        : formData.tier === 'premium'
        ? ['Unlimited Tracks', 'HD Audio', 'No Ads']
        : ['Unlimited Everything', 'Priority Support', 'Custom Branding'],
      plays: 0,
      likes: 0
    }

    onAddSubscription(newSubscription)
    
    // Reset form
    setFormData({
      userName: '',
      email: '',
      planName: '',
      tier: '',
      price: '',
      billingCycle: 'monthly',
      autoRenew: true,
      startDate: new Date().toISOString().split('T')[0]
    })
    
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className=" inset-0 transition-opacity bg-black/60 "
          onClick={onClose}
        ></div>

        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-8 py-6">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Add New Subscription</h3>
                  <p className="text-white/80">Create a subscription for a customer</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  <User className="inline h-4 w-4 mr-2" />
                  Customer Name *
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter customer name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="customer@email.com"
                  required
                />
              </div>

              {/* Tier Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  <Tag className="inline h-4 w-4 mr-2" />
                  Plan Tier *
                </label>
                <select
                  name="tier"
                  value={formData.tier}
                  onChange={handleTierChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select tier</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              {/* Plan Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  <Crown className="inline h-4 w-4 mr-2" />
                  Plan Name *
                </label>
                <select
                  name="planName"
                  value={formData.planName}
                  onChange={handlePlanChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={!formData.tier}
                  required
                >
                  <option value="">Select plan</option>
                  {formData.tier && plans[formData.tier]?.map(plan => (
                    <option key={plan.name} value={plan.name}>{plan.name}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  <DollarSign className="inline h-4 w-4 mr-2" />
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="29.99"
                  required
                />
              </div>

              {/* Billing Cycle */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Billing Cycle *
                </label>
                <select
                  name="billingCycle"
                  value={formData.billingCycle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Auto Renew */}
              <div className="space-y-2 flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="autoRenew"
                    checked={formData.autoRenew}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Enable Auto-Renew
                    </span>
                    <span className="text-xs text-gray-500">Automatically renew subscription</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Subscription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default AddSubscriptionModal