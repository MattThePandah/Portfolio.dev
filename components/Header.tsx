'use client'

import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import { cn } from '@/scripts/utils/tailwind-helpers'
import NextImage from 'next/image'
import { useEffect, useState } from 'react'

import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex h-[60px] justify-center">
      <div
        className={cn(
          'mx-6 w-full max-w-[375px] items-center justify-between rounded-3xl border border-border bg-secondary px-4 shadow-sm saturate-100 backdrop-blur-[10px] sm:max-w-screen-sm xl:max-w-screen-xl',
          isScrolled && 'border-transparent bg-background/80'
        )}>
        <div className="mx-auto flex h-[60px] w-full items-center justify-between">
          <div>
            <Link href="/" aira-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between rounded-full">
              <NextImage
                src="/static/images/logo.webp"
                alt="Logo"
                width="40"
                height="40"
                title="Logo"
              />
              </div>
            </Link>
          </div>
          <div className="flex items-center sm:space-x-3">
            <ul className="hidden space-x-2 sm:flex">
              {headerNavLinks.map((link, i) => (
                <li key={i}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
    // <header className="fixed inset-x-0 top-4 z-40 flex h-[60px] justify-center">
    //   <div>
    //     <Link href="/" aria-label={siteMetadata.headerTitle}>
    //       <div className="flex items-center justify-between">
    //         <div className="mr-3">
    //           <Logo />
    //         </div>
    //         {typeof siteMetadata.headerTitle === 'string' ? (
    //           <div className="hidden h-6 text-2xl font-semibold sm:block">
    //             {siteMetadata.headerTitle}
    //           </div>
    //         ) : (
    //           siteMetadata.headerTitle
    //         )}
    //       </div>
    //     </Link>
    //   </div>
    //   <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
    //     {headerNavLinks
    //       .filter((link) => link.href !== '/')
    //       .map((link) => (
    //         <Link
    //           key={link.title}
    //           href={link.href}
    //           className="hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400
    //           sm:block"
    //         >
    //           {link.title}
    //         </Link>
    //       ))}
    //     <SearchButton />
    //     <ThemeSwitch />
    //     <MobileNav />
    //   </div>
    // </header>
  )
}

export default Header
