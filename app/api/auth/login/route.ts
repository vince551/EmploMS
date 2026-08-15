import { NextResponse } from 'next/server'
import { findUser, createSession, verifyPassword } from '@/lib/auth'
export async function POST(req:Request){
  try { const {email,password}=await req.json(); const user=await findUser(String(email||'').toLowerCase()); if(!user || !(await verifyPassword(password,user.passwordHash))) return NextResponse.json({error:'Invalid email or password'},{status:401}); await createSession({id:user.id,name:user.name,email:user.email,role:user.role,employeeId:user.employee?.id}); return NextResponse.json({ok:true}) } catch { return NextResponse.json({error:'Login failed'},{status:500}) }
}