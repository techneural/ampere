'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import logo from '@/assets/logo.png'
import Image from 'next/image'

// ── Animated circuit node ─────────────────────────────────────────────────────
const Node = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.circle
    cx={x}
    cy={y}
    r={2.5}
    fill="#e45a47"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0.4, 1], scale: [0, 1.4, 1] }}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
  />
)

// ── Animated circuit line ─────────────────────────────────────────────────────
const Line = ({
  x1,
  y1,
  x2,
  y2,
  delay,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  delay: number
}) => (
  <motion.line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="#e45a47"
    strokeWidth={1}
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: [0, 0.6, 0.3] }}
    transition={{ delay, duration: 0.8, ease: 'easeInOut' }}
  />
)

// ── Circuit board SVG ─────────────────────────────────────────────────────────
const CircuitBoard = () => (
  <svg
    width="260"
    height="260"
    viewBox="0 0 260 260"
    className="absolute inset-0 m-auto opacity-20"
  >
    <motion.rect
      x="10"
      y="10"
      width="240"
      height="240"
      rx="4"
      stroke="#e45a47"
      strokeWidth="0.5"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ delay: 0.1, duration: 1 }}
    />

    {/* Lines */}
    <Line x1={10} y1={65} x2={80} y2={65} delay={0.2} />
    <Line x1={80} y1={65} x2={80} y2={130} delay={0.4} />
    <Line x1={80} y1={130} x2={180} y2={130} delay={0.6} />
    <Line x1={180} y1={130} x2={180} y2={65} delay={0.7} />
    <Line x1={180} y1={65} x2={250} y2={65} delay={0.8} />
    <Line x1={10} y1={195} x2={130} y2={195} delay={0.5} />
    <Line x1={130} y1={195} x2={130} y2={250} delay={0.7} />
    <Line x1={130} y1={195} x2={250} y2={195} delay={0.9} />
    <Line x1={40} y1={10} x2={40} y2={65} delay={0.3} />
    <Line x1={220} y1={195} x2={220} y2={250} delay={0.8} />

    {/* Nodes */}
    <Node x={80} y={65} delay={0.45} />
    <Node x={80} y={130} delay={0.65} />
    <Node x={180} y={130} delay={0.75} />
    <Node x={180} y={65} delay={0.85} />
    <Node x={130} y={195} delay={0.72} />
    <Node x={40} y={65} delay={0.35} />
    <Node x={220} y={195} delay={0.85} />
  </svg>
)

// ── Scanning line ─────────────────────────────────────────────────────────────
const ScanLine = () => (
  <motion.div
    className="absolute inset-x-0 h-px"
    style={{ background: 'linear-gradient(90deg, transparent, #e45a47, transparent)' }}
    initial={{ top: '0%', opacity: 0 }}
    animate={{ top: ['0%', '100%', '0%'], opacity: [0, 0.8, 0] }}
    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
  />
)

// ── Progress bar ──────────────────────────────────────────────────────────────
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-48 h-px bg-neutral-800 overflow-hidden rounded-full">
    <motion.div
      className="h-full rounded-full"
      style={{ background: 'linear-gradient(90deg, #e45a47, #ff8a78)' }}
      initial={{ width: '0%' }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3 }}
    />
  </div>
)

// ── Main component ────────────────────────────────────────────────────────────
export default function NavigationLoader() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const [statusText, setStatusText] = useState('Initializing')
  const isMounted = useRef(false)

  useEffect(() => {
    // Skip the very first mount — only show on actual route changes
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    setVisible(true)
    setProgress(0)
    setStatusText('Initializing')

    const steps = [
      { to: 30, delay: 0, text: 'Initializing' },
      { to: 60, delay: 400, text: 'Loading assets' },
      { to: 85, delay: 900, text: 'Calibrating' },
      { to: 100, delay: 1400, text: 'Ready' },
    ]

    const timers = steps.map(({ to, delay, text }) =>
      setTimeout(() => {
        setProgress(to)
        setStatusText(text)
      }, delay),
    )

    const hideTimer = setTimeout(() => setVisible(false), 2000)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(hideTimer)
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#000' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5 }}
        >
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#e45a47 1px, transparent 1px), linear-gradient(90deg, #e45a47 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(228,90,71,0.08) 0%, transparent 70%)',
            }}
          />

          {/* Circuit */}
          <div className="relative w-64 h-64 mb-6 flex items-center justify-center">
            <CircuitBoard />
            <ScanLine />

            {/* Center Logo */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div
                className="w-28 h-28 flex items-center justify-center rounded-lg"
                style={{
                  background: '#0a0a0a',
                  border: '1px solid rgba(228,90,71,0.5)',
                  boxShadow: '0 0 24px rgba(228,90,71,0.2), inset 0 0 12px rgba(228,90,71,0.05)',
                }}
              >
                <Image
                  src={logo}
                  alt="Ampere Labs Logo"
                  width={96}
                  height={96}
                  className="w-24 h-24 object-contain"
                />
              </div>
            </motion.div>
          </div>

          {/* Text */}
          <div className="mb-1 tracking-[0.3em] uppercase text-xs text-white">Ampere Labs</div>

          <div className="mb-5 text-[11px] tracking-widest uppercase text-primary font-bold">
            {statusText}
          </div>

          <ProgressBar progress={progress} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
