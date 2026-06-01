import React, { useEffect, useRef } from 'react'

interface WaveformVisualizerProps {
  data: number[]
  height?: number
  color?: string
  barWidth?: number
  gap?: number
  animated?: boolean
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  data,
  height = 60,
  color = 'rgba(99, 102, 241, 0.8)',
  barWidth = 3,
  gap = 2,
  animated = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const totalBars = data.length
    const totalWidth = rect.width
    const barW = (totalWidth - (totalBars - 1) * gap) / totalBars

    let offset = 0

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, height)

      data.forEach((value, i) => {
        const x = i * (barW + gap)
        const barHeight = value * height * 0.8
        const y = (height - barHeight) / 2

        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
        gradient.addColorStop(0, color)
        gradient.addColorStop(1, color.replace(/[\d.]+\)$/, '0.2)'))

        ctx.fillStyle = gradient

        // Rounded bars
        const radius = barW / 2
        ctx.beginPath()
        ctx.roundRect(x, y, barW, barHeight, [radius, radius, radius, radius])
        ctx.fill()

        // Add glow effect for animated bars
        if (animated) {
          const glowIntensity = Math.sin(offset + i * 0.3) * 0.3 + 0.7
          ctx.fillStyle = color.replace(/[\d.]+\)$/, `${glowIntensity * 0.3})`)
          ctx.beginPath()
          ctx.roundRect(x - 1, y - 1, barW + 2, barHeight + 2, [radius + 1, radius + 1, radius + 1, radius + 1])
          ctx.fill()
        }
      })

      if (animated) {
        offset += 0.05
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [data, height, color, barWidth, gap, animated])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: `${height}px`,
        display: 'block',
      }}
    />
  )
}

export default WaveformVisualizer
