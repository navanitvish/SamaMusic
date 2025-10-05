import { useState, useEffect } from 'react'
import { 
  Search, 
  Plus, 
  Play, 
  Pause, 
  Download, 
  Trash2, 
  Edit, 
  Filter,
  Music,
  Volume2,
  Shuffle,
  Repeat,
  MoreVertical,
  Heart,
  Share2,
  Disc,
  Headphones,
  TrendingUp,
  Clock,
  Users,
  Star,
  X,
  Eye,
  Upload,
  User,
  Tag,
  Calendar,
  FileAudio,
  Sparkles
} from 'lucide-react'

// AddMusic Component
const AddMusic = ({ isOpen, onClose, onAddMusic }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    duration: '',
    file: null
  })

  const [dragActive, setDragActive] = useState(false)

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 
    'R&B', 'Country', 'Latin', 'Indie', 'Alternative', 'Blues'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }))
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('audio/')) {
        setFormData(prev => ({
          ...prev,
          file: file
        }))
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.artist || !formData.genre || !formData.duration) {
      alert('Please fill in all required fields')
      return
    }
    
    const [minutes, seconds] = formData.duration.split(':').map(Number)
    const durationInSeconds = (minutes * 60) + (seconds || 0)
    
    const newMusic = {
      id: Date.now(),
      title: formData.title,
      artist: formData.artist,
      album: formData.album || 'Unknown Album',
      genre: formData.genre,
      duration: durationInSeconds,
      uploadDate: new Date().toISOString(),
      plays: 0,
      likes: 0,
      fileName: formData.file?.name || 'Unknown File'
    }
    
    onAddMusic(newMusic)
    
    setFormData({
      title: '',
      artist: '',
      album: '',
      genre: '',
      duration: '',
      file: null
    })
    
    onClose()
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 px-8 py-6">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Add New Music</h3>
                  <p className="text-white/80">Upload and organize your tracks</p>
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

          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-900">
                <FileAudio className="inline h-4 w-4 mr-2" />
                Audio File
              </label>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? 'border-purple-500 bg-purple-50'
                    : formData.file
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {formData.file ? (
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center">
                      <Music className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{formData.file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(formData.file.size)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">Drop your audio file here</p>
                      <p className="text-gray-500">or click to browse</p>
                      <p className="text-xs text-gray-400 mt-2">Supports MP3, WAV, FLAC, AAC</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  <Music className="inline h-4 w-4 mr-2" />
                  Track Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter track title"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  <User className="inline h-4 w-4 mr-2" />
                  Artist *
                </label>
                <input
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter artist name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Album
                </label>
                <input
                  type="text"
                  name="album"
                  value={formData.album}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter album name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  <Clock className="inline h-4 w-4 mr-2" />
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="MM:SS (e.g., 3:45)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                <Tag className="inline h-4 w-4 mr-2" />
                Category *
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select a genre</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
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
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Add Music
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMusic

// Main MusicList Component
