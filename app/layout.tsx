import './globals.css'
import type { Metadata } from 'next'
export const metadata:Metadata={title:'EmploMS — Workforce OS',description:'Premium employee management platform'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}