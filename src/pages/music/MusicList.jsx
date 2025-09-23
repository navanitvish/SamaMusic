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
  Eye
} from 'lucide-react'
import AddMusic from './AddMusic'





// Main MusicList Component
const MusicList = () => {
  const [musicList, setMusicList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMusic, setFilteredMusic] = useState([])
  const [playingId, setPlayingId] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedTracks, setSelectedTracks] = useState([])

  // Enhanced dummy data
  const dummyMusic = [
    {
      id: 1,
      title: 'Midnight Dreams',
      artist: 'Luna Rodriguez',
      album: 'Neon Nights',
      genre: 'Electronic',
      duration: 245,
      uploadDate: '2024-03-15T10:30:00Z',
      plays: 15420,
      likes: 1240,
      fileName: 'midnight-dreams.mp3'
    },
    {
      id: 2,
      title: 'Summer Vibes',
      artist: 'Beach Boys Revival',
      album: 'Coastal Dreams',
      genre: 'Pop',
      duration: 198,
      uploadDate: '2024-03-10T14:20:00Z',
      plays: 8734,
      likes: 892,
      fileName: 'summer-vibes.wav'
    },
    {
      id: 3,
      title: 'Urban Flow',
      artist: 'MC Phoenix',
      album: 'City Lights',
      genre: 'Hip Hop',
      duration: 212,
      uploadDate: '2024-03-08T16:45:00Z',
      plays: 23891,
      likes: 2156,
      fileName: 'urban-flow.mp3'
    },
    {
      id: 4,
      title: 'Jazz Café',
      artist: 'The Smooth Collective',
      album: 'Late Night Sessions',
      genre: 'Jazz',
      duration: 287,
      uploadDate: '2024-03-05T11:15:00Z',
      plays: 5643,
      likes: 423,
      fileName: 'jazz-cafe.flac'
    },
    {
      id: 5,
      title: 'Rock Anthem',
      artist: 'Thunder Strike',
      album: 'Electric Storm',
      genre: 'Rock',
      duration: 234,
      uploadDate: '2024-03-01T09:30:00Z',
      plays: 12056,
      likes: 967,
      fileName: 'rock-anthem.mp3'
    }
  ]

  useEffect(() => {
    setMusicList(dummyMusic)
    setFilteredMusic(dummyMusic)
  }, [])

  useEffect(() => {
    let filtered = musicList.filter(music =>
      music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      music.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      music.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      music.album.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(music => music.genre.toLowerCase() === selectedFilter.toLowerCase())
    }

    setFilteredMusic(filtered)
  }, [searchTerm, musicList, selectedFilter])

  const handlePlay = (musicId) => {
    setPlayingId(playingId === musicId ? null : musicId)
  }

  const handleDelete = (musicId) => {
    if (window.confirm('Are you sure you want to delete this track?')) {
      const updatedMusic = musicList.filter(music => music.id !== musicId)
      setMusicList(updatedMusic)
    }
  }

  const handleAddMusic = (newMusic) => {
    setMusicList(prev => [...prev, newMusic])
  }

  const toggleTrackSelection = (trackId) => {
    setSelectedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    )
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getGenreColor = (genre) => {
    const colors = {
      'Electronic': 'from-cyan-500 to-blue-500',
      'Pop': 'from-pink-500 to-rose-500',
      'Hip Hop': 'from-yellow-500 to-orange-500',
      'Jazz': 'from-purple-500 to-indigo-500',
      'Rock': 'from-red-500 to-rose-500',
      'Classical': 'from-emerald-500 to-teal-500',
      'R&B': 'from-violet-500 to-purple-500',
      'Country': 'from-amber-500 to-yellow-500',
      'Latin': 'from-orange-500 to-red-500',
      'Indie': 'from-green-500 to-emerald-500',
      'Alternative': 'from-slate-500 to-gray-500',
      'Blues': 'from-blue-600 to-indigo-600'
    }
    return colors[genre] || 'from-gray-500 to-slate-500'
  }

  const uniqueGenres = [...new Set(musicList.map(music => music.genre))]
  
  const filters = [
    { value: 'all', label: 'All Tracks', count: musicList.length },
    ...uniqueGenres.map(genre => ({
      value: genre.toLowerCase(),
      label: genre,
      count: musicList.filter(m => m.genre === genre).length
    }))
  ]

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold mb-2">Music Library</h1>
              <p className="text-white/80 text-lg">Manage and discover your audio collection</p>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  <span className="font-semibold">{musicList.length} Tracks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  <span className="font-semibold">{musicList.reduce((acc, music) => acc + music.plays, 0).toLocaleString()} Total Plays</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  <span className="font-semibold">{musicList.reduce((acc, music) => acc + music.likes, 0).toLocaleString()} Likes</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 px-4 py-2 rounded-xl transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Playlist
              </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-6 py-2 rounded-xl transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Music
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedFilter === filter.value
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tracks, artists, albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-80 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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

            <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Selected Tracks Actions */}
        {selectedTracks.length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-blue-900">
                {selectedTracks.length} track(s) selected
              </span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-white rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  Download
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-white rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1">
                  <Trash2 className="h-3 w-3" />
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Music Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTracks(filteredMusic.map(m => m.id))
                        } else {
                          setSelectedTracks([])
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Track Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMusic.map((music) => (
                  <tr key={music.id} className="hover:bg-gray-50 transition-colors duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                        checked={selectedTracks.includes(music.id)}
                        onChange={() => toggleTrackSelection(music.id)}
                      />
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${getGenreColor(music.genre)} flex items-center justify-center shadow-lg`}>
                            <span className="text-lg font-bold text-white">
                              {music.title.charAt(0)}
                            </span>
                          </div>
                          {playingId === music.id && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <Volume2 className="h-2 w-2 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{music.title}</h3>
                          <p className="text-sm text-gray-500">{music.artist}</p>
                          <p className="text-xs text-gray-400">{music.album}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full text-white bg-gradient-to-r ${getGenreColor(music.genre)}`}>
                        {music.genre}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {formatDuration(music.duration)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Headphones className="h-3 w-3 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900">
                            {music.plays.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-red-400" />
                          <span className="text-xs text-gray-500">
                            {music.likes.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(music.uploadDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1 ">
                        {/* <button 
                          onClick={() => handlePlay(music.id)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          {playingId === music.id ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </button> */}
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        {/* <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <Download className="h-4 w-4" />
                        </button> */}
                        <button className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(music.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        {/* <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredMusic.length === 0 && (
          <div className="text-center py-12">
            <Music className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tracks found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              Add New Track
            </button>
          </div>
        )}
      </div>

      {/* Bottom Statistics */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Music className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Total Tracks</h4>
              <p className="text-sm text-gray-600">In library</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{musicList.length}</div>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>+{Math.floor(musicList.length * 0.12)} this month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Headphones className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Total Plays</h4>
              <p className="text-sm text-gray-600">All time</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {(musicList.reduce((acc, music) => acc + music.plays, 0) / 1000).toFixed(1)}K
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>+18.2% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Total Likes</h4>
              <p className="text-sm text-gray-600">Engagement</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {(musicList.reduce((acc, music) => acc + music.likes, 0) / 1000).toFixed(1)}K
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>+24.7% engagement</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Top Genre</h4>
              <p className="text-sm text-gray-600">Most popular</p>
            </div>
          </div>
         
          <div className="flex items-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Most streamed</span>
          </div>
        </div>
      </div> */}

      {/* Add Music Modal */}
      <AddMusic 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMusic={handleAddMusic}
      />
    </div>
  )
}

export default MusicList