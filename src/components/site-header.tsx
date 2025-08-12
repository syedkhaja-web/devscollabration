
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DevsTecIcon } from '@/components/icons';
import { Menu, Search, X } from 'lucide-react';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/collaborate', label: 'Collaborate' },
    { href: '/documentation', label: 'Documentation' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <DevsTecIcon className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">Devs Tec</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search or jump to..."
                className="w-full rounded-md bg-muted pl-9 md:w-56 lg:w-80"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
               <Button asChild variant="ghost">
                  <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                  <Link href="/login">Sign Up</Link>
              </Button>
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
             <div className="border-t pt-4 mt-2 space-y-2">
                <>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center rounded-lg p-2 text-base font-medium hover:bg-accent">Sign In</Link>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center rounded-lg p-2 text-base font-medium hover:bg-accent">Sign Up</Link>
                </>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
