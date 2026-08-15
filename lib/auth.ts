import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me-in-production')
export type Session = { id:string; name:string; email:string; role:'ADMIN'|'HR'|'EMPLOYEE'; employeeId?:string }

export async function hashPassword(password:string){ return bcrypt.hash(password,12) }
export async function verifyPassword(password:string,hash:string){ return bcrypt.compare(password,hash) }
export async function createSession(user: Session){
  const token = await new SignJWT(user).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(secret)
  const jar = await cookies(); jar.set('ems_session', token, {httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*7})
}
export async function getSession():Promise<Session|null>{
  const token=(await cookies()).get('ems_session')?.value
  if(!token) return null
  try { return (await jwtVerify(token,secret)).payload as unknown as Session } catch { return null }
}
export async function requireRole(roles:Session['role'][]){ const s=await getSession(); if(!s || !roles.includes(s.role)) throw new Error('FORBIDDEN'); return s }
export async function findUser(email:string){ return prisma.user.findUnique({where:{email},include:{employee:true}}) }
