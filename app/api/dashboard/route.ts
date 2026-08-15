import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
export async function GET(){
 const s=await getSession(); if(!s) return NextResponse.json({error:'Unauthorized'},{status:401})
 const [employees,present,onLeave,payroll,departments,recent]=await Promise.all([
  prisma.employee.count({where:{status:'ACTIVE'}}),
  prisma.attendance.count({where:{date:{gte:new Date(new Date().setHours(0,0,0,0))},status:{in:['PRESENT','LATE','HALF_DAY']}}}),
  prisma.leaveRequest.count({where:{status:'APPROVED',startDate:{lte:new Date()},endDate:{gte:new Date()}}}),
  prisma.payroll.aggregate({_sum:{net:true}}),
  prisma.department.findMany({include:{_count:{select:{employees:true}}},orderBy:{name:'asc'}}),
  prisma.auditLog.findMany({take:8,orderBy:{createdAt:'desc'}})
 ]); return NextResponse.json({employees,present,onLeave,payroll:Number(payroll._sum.net||0),departments,recent})
}