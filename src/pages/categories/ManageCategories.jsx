import { useState } from 'react'
import {
  Music,
  Heart,
  Globe,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Tag,
  TrendingUp,
  Users,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Sparkles,
  Filter,
  MoreVertical,
  Archive
} from 'lucide-react'

// Add/Edit Category Modal
const CategoryModal = ({ isOpen, onClose, onSave, category, type }) => {
  const [formData, setFormData] = useState(category || {
    name: '',
    description: '',
    color: '#8B5CF6',
    isActive: true
  })

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name) {
      alert('Please enter a name')
      return
    }
    onSave(formData)
    onClose()
  }

  const colorOptions = [
    '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6',
    '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className=" inset-0 transition-opacity bg-black/60 "
          onClick={onClose}
        ></div>

        <div className="inline-block w-full max-w-lg my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl">
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 px-8 py-6">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {category ? 'Edit' : 'Add'} {type}
                  </h3>
                  <p className="text-white/80">
                    {category ? 'Update' : 'Create new'} {type.toLowerCase()} category
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full "></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full "></div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                <Tag className="inline h-4 w-4 mr-2" />
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder={`Enter ${type.toLowerCase()} name`}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter description (optional)"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Color Tag
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-12 h-12 rounded-xl cursor-pointer border-2 border-gray-200"
                />
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-lg transition-all duration-200 ${
                        formData.color === color ? 'ring-2 ring-offset-2 ring-purple-500 scale-110' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
              />
              <label className="text-sm font-semibold text-gray-900">
                Active (visible to users)
              </label>
            </div>

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
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {category ? 'Update' : 'Add'} {type}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Main Component
const ManageCategories = () => {
  const [activeTab, setActiveTab] = useState('genre')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  const [categories, setCategories] = useState({
    genre: [
      { id: 1, name: 'Rock', description: 'Rock and Roll music', color: '#EF4444', isActive: true, trackCount: 245, createdDate: '2024-01-15' },
      { id: 2, name: 'Pop', description: 'Popular mainstream music', color: '#EC4899', isActive: true, trackCount: 567, createdDate: '2024-01-20' },
      { id: 3, name: 'Hip Hop', description: 'Hip hop and rap music', color: '#F59E0B', isActive: true, trackCount: 423, createdDate: '2024-02-01' },
      { id: 4, name: 'Jazz', description: 'Jazz and blues', color: '#8B5CF6', isActive: true, trackCount: 189, createdDate: '2024-02-10' },
      { id: 5, name: 'Electronic', description: 'Electronic and EDM', color: '#06B6D4', isActive: true, trackCount: 334, createdDate: '2024-02-15' },
      { id: 6, name: 'Classical', description: 'Classical orchestral music', color: '#10B981', isActive: false, trackCount: 98, createdDate: '2024-03-01' }
    ],
    mood: [
      { id: 1, name: 'Happy', description: 'Uplifting and joyful', color: '#F59E0B', isActive: true, trackCount: 456, createdDate: '2024-01-15' },
      { id: 2, name: 'Sad', description: 'Melancholic and emotional', color: '#3B82F6', isActive: true, trackCount: 289, createdDate: '2024-01-20' },
      { id: 3, name: 'Energetic', description: 'High energy and motivating', color: '#EF4444', isActive: true, trackCount: 378, createdDate: '2024-02-01' },
      { id: 4, name: 'Relaxing', description: 'Calm and peaceful', color: '#10B981', isActive: true, trackCount: 512, createdDate: '2024-02-05' },
      { id: 5, name: 'Romantic', description: 'Love and romance', color: '#EC4899', isActive: true, trackCount: 234, createdDate: '2024-02-10' },
      { id: 6, name: 'Angry', description: 'Aggressive and intense', color: '#DC2626', isActive: false, trackCount: 145, createdDate: '2024-03-01' }
    ],
    language: [
      { id: 1, name: 'English', description: 'English language tracks', color: '#3B82F6', isActive: true, trackCount: 1245, createdDate: '2024-01-10' },
      { id: 2, name: 'Spanish', description: 'Spanish language tracks', color: '#F59E0B', isActive: true, trackCount: 687, createdDate: '2024-01-15' },
      { id: 3, name: 'French', description: 'French language tracks', color: '#8B5CF6', isActive: true, trackCount: 423, createdDate: '2024-01-20' },
      { id: 4, name: 'Hindi', description: 'Hindi language tracks', color: '#10B981', isActive: true, trackCount: 567, createdDate: '2024-02-01' },
      { id: 5, name: 'Japanese', description: 'Japanese language tracks', color: '#EC4899', isActive: true, trackCount: 289, createdDate: '2024-02-05' },
      { id: 6, name: 'Korean', description: 'Korean language tracks', color: '#06B6D4', isActive: false, trackCount: 178, createdDate: '2024-02-15' }
    ]
  })

  const getCurrentCategories = () => {
    let filtered = categories[activeTab].filter(cat =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (statusFilter !== 'all') {
      filtered = filtered.filter(cat => 
        statusFilter === 'active' ? cat.isActive : !cat.isActive
      )
    }

    return filtered
  }

  const handleAddCategory = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleSaveCategory = (formData) => {
    if (editingCategory) {
      setCategories(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(cat =>
          cat.id === editingCategory.id ? { ...cat, ...formData } : cat
        )
      }))
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData,
        trackCount: 0,
        createdDate: new Date().toISOString().split('T')[0]
      }
      setCategories(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], newCategory]
      }))
    }
  }

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(cat => cat.id !== id)
      }))
    }
  }

  const handleToggleStatus = (id) => {
    setCategories(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(cat =>
        cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
      )
    }))
  }

  const getTabIcon = (tab) => {
    switch(tab) {
      case 'genre': return Music
      case 'mood': return Heart
      case 'language': return Globe
      default: return Tag
    }
  }

  const getTotalStats = () => {
    return {
      total: categories[activeTab].length,
      active: categories[activeTab].filter(c => c.isActive).length,
      inactive: categories[activeTab].filter(c => !c.isActive).length,
      totalTracks: categories[activeTab].reduce((acc, cat) => acc + cat.trackCount, 0)
    }
  }

  const stats = getTotalStats()
  const filteredCategories = getCurrentCategories()

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold mb-2">Manage Categories</h1>
              <p className="text-white/80 text-lg">Organize your music library by genre, mood, and language</p>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  <span className="font-semibold">{stats.total} Categories</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">{stats.active} Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  <span className="font-semibold">{stats.totalTracks.toLocaleString()} Tracks</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 px-4 py-2 rounded-xl transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button 
                onClick={handleAddCategory}
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-6 py-2 rounded-xl transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Tag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Total</h4>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          <div className="flex items-center gap-2 text-sm text-purple-600 mt-2">
            <TrendingUp className="h-4 w-4" />
            <span>All categories</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Active</h4>
              <p className="text-sm text-gray-600">In use</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.active}</div>
          <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
            <CheckCircle className="h-4 w-4" />
            <span>Live categories</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-500 rounded-xl flex items-center justify-center">
              <Archive className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Inactive</h4>
              <p className="text-sm text-gray-600">Archived</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.inactive}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <XCircle className="h-4 w-4" />
            <span>Not visible</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Tracks</h4>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{(stats.totalTracks / 1000).toFixed(1)}K</div>
          <div className="flex items-center gap-2 text-sm text-blue-600 mt-2">
            <TrendingUp className="h-4 w-4" />
            <span>Categorized</span>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {['genre', 'mood', 'language'].map((tab) => {
            const Icon = getTabIcon(tab)
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
                className={`px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="capitalize">{tab}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab ? 'bg-white/20' : 'bg-white'
                }`}>
                  {categories[tab].length}
                </span>
              </button>
            )
          })}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                statusFilter === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({categories[activeTab].length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                statusFilter === 'active'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Active ({categories[activeTab].filter(c => c.isActive).length})
            </button>
            <button
              onClick={() => setStatusFilter('inactive')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                statusFilter === 'inactive'
                  ? 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Inactive ({categories[activeTab].filter(c => !c.isActive).length})
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-2.5 w-80 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="relative group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                    style={{ backgroundColor: category.color }}
                  >
                    <span className="text-xl font-bold text-white">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                    <p className="text-xs text-gray-500">{category.trackCount} tracks</p>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  category.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {category.description || 'No description available'}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  Created: {new Date(category.createdDate).toLocaleDateString()}
                </span>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleToggleStatus(category.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title={category.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {category.isActive ? (
                      <XCircle className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Tag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={handleAddCategory}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              Add New Category
            </button>
          </div>
        )}
      </div>

      {/* Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCategory(null)
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
        type={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      />
    </div>
  )
}

export default ManageCategories