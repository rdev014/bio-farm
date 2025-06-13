
import { Leaf } from 'lucide-react';


const AppLogo = () => {


  return (
    <div className="flex items-center justify-center">
      <div
        className="relative group cursor-pointer"

      >
        {/* Main Logo Container */}
        <div className="relative size-14 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:shadow-green-500/30">
          {/* Subtle Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Leaf Icon */}
          <Leaf
            className={`size-8 hover:rotate-6 hover:scale-110 text-white relative z-10 transition-all duration-300 `}
          />

          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-green-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Minimal Particle Effects */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-300 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-700 group-hover:animate-pulse" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-300 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-700 group-hover:animate-pulse delay-200" />
        </div>

        {/* Text Label */}
        <div className="absolute top-0 -mt-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-zinc-900 text-sm font-medium bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm">
            Arkin
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppLogo