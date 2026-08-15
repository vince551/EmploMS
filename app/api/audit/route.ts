import {NextResponse} from 'next/server'
import {requireRole} from '@/lib/auth'
import {prisma} from '@/lib/prisma'
export async function GET(){try{await requireRole(['ADMIN','HR']);return NextResponse.json(await prisma.auditLog.findMany({orderBy:{createdAt:'desc'},take:100}))}catch(e:any){return NextResponse.json({error:e.message},{status:403})}}