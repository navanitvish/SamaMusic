import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../../store/slices/authSlice'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { Eye, EyeOff, Music2, Sparkles } from 'lucide-react'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (error) dispatch(clearError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(login({
      email: formData.email,
      password: formData.password,
      role: formData.role,
      fcmToken: ''
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-xl opacity-30"></div>
        
        {/* Card content */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
              <Music2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">SamaSong Music</h2>
            <p className="text-blue-200 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Admin Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-500/20 backdrop-blur-sm border border-red-500/50 p-4">
                <div className="text-sm text-red-100">{error}</div>
              </div>
            )}
            
            <div className="space-y-4">
              <Input
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@samasong.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 focus:border-purple-400 focus:ring-purple-400/50"
              />
              
              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 focus:border-purple-400 focus:ring-purple-400/50 pr-12"
                />
                <button
                  type="button"
                  className="absolute right-3 top-[38px] text-blue-200 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-blue-200 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500" />
                Remember me
              </label>
              <a href="#" className="text-purple-300 hover:text-purple-200 transition-colors">
                Forgot password?
              </a>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in to Dashboard'
                )}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-blue-200">
            <p>Don't have an account? <a href="#" className="text-purple-300 hover:text-purple-200 font-semibold transition-colors">Contact Admin</a></p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
      `}</style>
    </div>
  )
}

export default LoginForm