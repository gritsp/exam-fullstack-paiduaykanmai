# 1.3 * (Optional Test) ใช้ภาษาอะไรก็ได้เพื่อแก้ไขปัญหา
# กิ่งไม้มีความยาวเป็น N ต้องการตัดกิ่งไม้เป็นท่อนเล็กๆ ตามเงื่อนไขสองข้อดังต่อไปนี้:
# กิ่งไม้แต่ละท่อนต้องมีความยาว A, B หรือ C
# จำนวนท่อนไม้ควรมีมากที่สุด
# Input บรรทัดแรกจะเป็นค่า N A B C โดยที่ N คือ ความยาวของกิ่งไม้ (1 ≤ N) และ A, B, C คือความยาวของท่อนไม้ที่กำหนด (A, B, C ≤ 4000) Output แสดงจำนวนท่อนไม้ทั้งหมดที่ตัดได้
# Input
# 5 5 3 2
# Output
# 2
# หมายเหตุ จำนวนไม้ทั้งหมดคือ 2 ท่อน ได้แก่ ท่อนที่ยาว 2 และ 3
print("input")
timber = input("> ")
timber = timber.split()
N = int(timber[0])
timber.pop(0)
temp = []
for i in timber:
    temp.append(int(i))
timber = temp
timber.sort()
a = 0
def checktimber(timber,N,a):
    temp = N
    if temp%timber[0]!=0:
        a+=1
        return checktimber(timber,temp-timber[1],a)
    else:
        return (temp//timber[0])+a
        
print("output")
print(checktimber(timber,N,a))