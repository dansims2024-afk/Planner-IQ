import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white px-4 sm:px-6">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        
        {/* Logo and Brand */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="relative h-10 w-10 transition-transform group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Recruit-IQ Logo" 
              fill
              className="object-contain"
              priority 
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Recruit-IQ
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
          <Link href="/jobs" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            Jobs
          </Link>
          <Link href="/candidates" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            Candidates
          </Link>
        </div>

        {/* User Profile (Clerk) */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />
          <UserButton afterSignOutUrl="/" />
        </div>

      </div>
    </nav>
  );
}
