
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DevsTecIcon } from '@/components/icons';
import { Menu, X, LogOut, LogIn } from 'lucide-react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';


export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [clientLoaded, setClientLoaded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setClientLoaded(true);
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
    });

    return () => {
        window.removeEventListener('resize', handleResize);
        unsubscribe();
    }
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const baseNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/collaborate', label: 'Collaborate' },
    { href: '/chatbot', label: 'AI Assistant' },
    { href: '/report', label: 'Report' },
    { href: '/documentation', label: 'Documentation' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/deploy', label: 'Deploy' },
    { href: '/reel', label: 'Demo Reel' },
  ];

  const navLinks = loading ? [] : baseNavLinks;
  
  const AuthButton = () => {
    if (loading || !clientLoaded) return null;

    if (user) {
      return (
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="mr-2" />
          Sign Out
        </Button>
      )
    }
    // Don't show sign-in button on the login page itself
    if (pathname === '/login') return null;
    
    return (
      <Button asChild variant="ghost" size="sm">
        <Link href="/login">
          <LogIn className="mr-2" />
          Sign In
        </Link>
      </Button>
    )
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <DevsTecIcon className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">Devs Tec</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors hover:text-foreground/80 ${pathname === link.href ? 'text-foreground' : 'text-foreground/60'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:flex">
             <AuthButton />
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background shadow-md md:hidden">
          <nav className="grid gap-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center rounded-lg p-2 text-base font-medium hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t pt-2 mt-2">
               <AuthButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
