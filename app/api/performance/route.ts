import { NextResponse } from 'next/server'
import { getSession, requireRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
const review=z.object({employeeId:z.string(),period:z.string(),rating:z.coerce.number().min(1).max(5),feedback:z.string().min(3),reviewer:z.string().min(2)})
export async function GET(){const s=await getSession();if(!s)return NextResponse.json({error:'Unauthorized'},{status:401});return NextResponse.json(await prisma.performanceReview.findMany({include:{employee:true},orderBy:{createdAt:'desc'}}))}
export async function POST(req:Request){try{await requireRole(['ADMIN','HR']);const d=review.parse(await req.json());return NextResponse.json(await prisma.performanceReview.create({data:d}),{status:201})}catch(e:any){return NextResponse.json({error:e.message},{status:e.message==='FORBIDDEN'?403:400})}}