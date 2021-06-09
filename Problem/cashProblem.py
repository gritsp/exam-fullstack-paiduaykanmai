# 1.2 ประเทศ XYZ มีธนบัตรทั้งหมดอยู่ 5 ชนิดคือ 1, 5, 10, 20 และ 100 ลุงพรชัยมีเงินอยู่ในธนาคาร N บาท หากถอนเงินออกมาทั้งหมดจะได้ธนบัตรจำนวนน้อยที่สุดจำนวนเท่าไร
# Input บรรทัดแรกคือค่า N ซึ่งแสดงถึงจำนวนเงินของลุงพรชัย Output แสดงจำนวนธนบัตรที่น้อยที่สุดที่ลุงพรชัยจะได้รับ
# Input
# 125
# Output
# 3

def changeMoney(cash):
    listCash = [100,20,10,5,1]
    n = 0
    for i in listCash:
        temp = cash//i
        n+=temp
        cash = cash-(i*temp)
    return n

print("input")
cash = int(input("> "))
changeM = changeMoney(cash)
print("output")
print(changeM)