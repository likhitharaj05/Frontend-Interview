import { Button } from "./ui/button";

export default function Header() {
    return (
        <header className="w-full bg-white border-b sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          
          {/* LEFT: LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="font-semibold text-lg">
              CA Monk
            </span>
          </div>
  
          {/* CENTER: NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-sm text-gray-600">
            <a className="hover:text-indigo-600 cursor-pointer transition-colors">Tools</a>
            <a className="hover:text-indigo-600 cursor-pointer transition-colors">Practice</a>
            <a className="hover:text-indigo-600 cursor-pointer transition-colors">Events</a>
            <a className="hover:text-indigo-600 cursor-pointer transition-colors">Job Board</a>
            <a className="hover:text-indigo-600 cursor-pointer transition-colors">Points</a>
          </nav>
  
          {/* RIGHT: PROFILE */}
          <Button>
            Profile
          </Button>
  
        </div>
      </header>
    );
  }
  