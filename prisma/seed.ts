import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma=new PrismaClient()
async function main(){
 const departments=[['Engineering',12000000],['Product',8000000],['People & HR',5000000],['Finance',7000000],['Marketing',6000000]] as const
 const ds:any={}
 for(const [name,budget] of departments) ds[name]=await prisma.department.upsert({where:{name},update:{},create:{name,budget}})
 const passwordHash=await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD||'Admin@12345',12)
 const user=await prisma.user.upsert({where:{email:'admin@emploms.local'},update:{passwordHash,role:'ADMIN'},create:{name:'EmploMS Admin',email:'admin@emploms.local',passwordHash,role:'ADMIN'}})
 const employees=[['EMP-1001','Amina Otieno','amina@emploms.local','Engineering','Senior Software Engineer',185000],['EMP-1002','Brian Kamau','brian@emploms.local','Product','Product Manager',160000],['EMP-1003','Nadia Wanjiku','nadia@emploms.local','People & HR','HR Manager',145000],['EMP-1004','Kevin Ochieng','kevin@emploms.local','Finance','Financial Analyst',130000],['EMP-1005','Faith Njeri','faith@emploms.local','Marketing','Growth Specialist',120000]] as const
 for(const [employeeId,name,email,dep,designation,salary] of employees) await prisma.employee.upsert({where:{employeeId},update:{},create:{employeeId,name,email,designation,salary,joinedAt:new Date('2025-01-15'),departmentId:ds[dep].id,userId:email==='amina@emploms.local'?undefined:undefined}})
 const adminEmployee=await prisma.employee.findUnique({where:{employeeId:'EMP-1001'}}); if(adminEmployee&&!user.employee) await prisma.employee.update({where:{id:adminEmployee.id},data:{userId:user.id}})
 await prisma.auditLog.create({data:{actorId:user.id,action:'SEED',entity:'System',metadata:{message:'Initial EmploMS seed'}}})
 console.log('Seed complete. Admin: admin@emploms.local / '+(process.env.SEED_ADMIN_PASSWORD||'Admin@12345'))
}
main().finally(()=>prisma.$disconnect())
