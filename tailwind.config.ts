
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				mono: ['SF Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
				sans: ['SF Pro Text', 'Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				terminal: {
					background: '#0d1117',
					text: '#c9d1d9',
					accent: '#58a6ff',
					success: '#3fb950',
					warning: '#d29922',
					error: '#f85149',
					muted: '#8b949e',
				},
				system: {
					blue: '#0366d6',
					gray: '#1f2937',
					darkgray: '#111827',
					lightgray: '#374151',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'cursor-blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
				'text-appear': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'boot-progress': {
					'0%': { width: '0%' },
					'100%': { width: '100%' },
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in': {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				'overlay-show': {
					'0%': { opacity: '0' },
					'100%': { opacity: '0.8' },
				},
				'window-appear': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(88, 166, 255, 0.5)' },
					'50%': { boxShadow: '0 0 15px rgba(88, 166, 255, 0.8)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'cursor-blink': 'cursor-blink 1s step-end infinite',
				'text-appear': 'text-appear 0.3s ease-out forwards',
				'boot-progress': 'boot-progress 3s ease-out forwards',
				'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
				'slide-in': 'slide-in 0.3s ease-out forwards',
				'overlay-show': 'overlay-show 0.3s ease-out forwards',
				'window-appear': 'window-appear 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'glow-pulse': 'glow-pulse 2s infinite',
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(8px)',
			},
			backgroundColor: {
				'glass': 'rgba(255, 255, 255, 0.1)',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
