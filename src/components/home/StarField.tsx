import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  radius: number
  baseAlpha: number
  twinkleSpeed: number
  twinklePhase: number
  driftX: number
  driftY: number
  accent: boolean
}

const DENSITY = 0.00012
const MIN_STARS = 40
const MAX_STARS = 160
const ACCENT_RGB = '96, 165, 250'
const LIGHT_RGB = '255, 255, 255'

function createStars(width: number, height: number): Star[] {
  const count = Math.min(MAX_STARS, Math.max(MIN_STARS, Math.round(width * height * DENSITY)))
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.1 + 0.4,
    baseAlpha: Math.random() * 0.35 + 0.15,
    twinkleSpeed: Math.random() * 0.8 + 0.3,
    twinklePhase: Math.random() * Math.PI * 2,
    driftX: (Math.random() - 0.5) * 3,
    driftY: Math.random() * 3 + 1.5,
    accent: Math.random() < 0.15,
  }))
}

/** Cielo estrellado tenue (parpadeo + deriva lenta) dibujado en canvas para no saturar el DOM. */
const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let stars: Star[] = []
    let frameId = 0
    let lastTime = performance.now()

    const paint = (star: Star, alpha: number) => {
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${star.accent ? ACCENT_RGB : LIGHT_RGB}, ${alpha})`
      ctx.fill()
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = createStars(width, height)

      if (prefersReducedMotion) {
        ctx.clearRect(0, 0, width, height)
        stars.forEach((star) => paint(star, star.baseAlpha))
      }
    }

    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    if (prefersReducedMotion) {
      return () => resizeObserver.disconnect()
    }

    const tick = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      ctx.clearRect(0, 0, width, height)
      for (const star of stars) {
        star.x += star.driftX * delta
        star.y += star.driftY * delta
        if (star.y > height + 4) star.y = -4
        if (star.x > width + 4) star.x = -4
        if (star.x < -4) star.x = width + 4

        const twinkle = Math.max(
          0,
          star.baseAlpha + Math.sin(time * 0.001 * star.twinkleSpeed + star.twinklePhase) * 0.15,
        )
        paint(star, twinkle)
      }

      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      className='pointer-events-none absolute inset-0 h-full w-full'
    />
  )
}

export default StarField
