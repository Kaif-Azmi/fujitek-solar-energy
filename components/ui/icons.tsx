import * as React from 'react'

type IconProps = { className?: string }

export const Lightning = ({ className = '' }: IconProps) => (
  <span className={`icon ${className}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
    </svg>
  </span>
)

export const Wrench = ({ className = '' }: IconProps) => (
  <span className={`icon ${className}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.7 13.35a1 1 0 00-1.4 0l-2.3 2.3a2 2 0 01-2.83 0l-1.4-1.4 4.24-4.24a1 1 0 000-1.41l-1.9-1.9a3 3 0 00-4.24 0l-2.5 2.5a3 3 0 000 4.24l1.9 1.9a1 1 0 001.41 0l4.24-4.24 1.4 1.4a2 2 0 010 2.83l2.3 2.3a1 1 0 001.4-1.41z" />
    </svg>
  </span>
)

export const Handshake = ({ className = '' }: IconProps) => (
  <span className={`icon ${className}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12l6 6 14-14" />
      <path d="M7 8l5 5" />
    </svg>
  </span>
)

export const MapPin = ({ className = '' }: IconProps) => (
  <span className={`icon ${className}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  </span>
)

export const Phone = ({ className = '' }: IconProps) => (
  <span className={`icon ${className}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.12 1.21.39 2.4.78 3.53a2 2 0 01-.45 2.11L9.91 11.09a16 16 0 006 6l1.73-1.73a2 2 0 012.11-.45c1.13.39 2.32.66 3.53.78A2 2 0 0122 16.92z" />
    </svg>
  </span>
)

export const Mail = ({ className = '' }: IconProps) => (
  <span className={`icon ${className}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h16v16H4z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  </span>
)

export const Sun = ({ className = '' }: IconProps) => (
  <span className={`icon ${className}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.76 4.84l-1.8-1.79L4 4.01l1.79 1.8 0.97-0.97zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm7.24-1.84l0.97 0.97L20 19.16l-0.97-0.97 0.21-0.21zM17 13h3v-2h-3v2zM6.76 19.16l-0.97 0.97L8 20.99l0.97-0.97-2.21-1.86zM12 7a5 5 0 100 10 5 5 0 000-10z" />
    </svg>
  </span>
)

export const Leaf = ({ className = '' }: IconProps) => (
  <span className={`icon ${className}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.39 4.22A9 9 0 0012 2v10l8.39-7.78zM12 22c4.97 0 9-4.03 9-9 0-1.76-.45-3.41-1.24-4.85C15.93 11.9 12 22 12 22z" />
    </svg>
  </span>
)

export const Star = ({ className = '' }: IconProps) => (
  <span className={`icon ${className}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 20.201 4.665 24 6 15.596 0 9.748l8.332-1.73z" />
    </svg>
  </span>
)

export const Rocket = ({ className = '' }: IconProps) => (
  <span className={`icon ${className}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2s4 1 6 3 3 6 3 6-2 0-5 3-5 5-5 5-2-1-5-4-4-5-4-5 2-3 4-5 6-3 6-3z" />
    </svg>
  </span>
)
