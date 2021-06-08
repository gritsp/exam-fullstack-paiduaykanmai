# 1.1 มีหินอยู่จำนวน N ก้อน แต่ละก้อนสามารถเป็นสีแดง R เขียว G หรือน้ำเงิน B หากนำหินทั้งหมดไปสุ่มวางเรียงกันเป็นแถวเดียว จงหาจำนวนของคู่หินที่มีสีเดียวกันและอยู่ติดกัน
# Input แบ่งออกเป็น 2 บรรทัดโดยบรรทัดแรกคือค่า N แสดงถึงจำนวนหินที่มีและบรรทัดที่สองจะเป็นลำดับสีของหินที่ถูกเรียงไว้แล้ว Output ตัวเลขแสดงจำนวนคู่หินที่มีสี่เดียวกันและอยู่ติดกัน
# Input
# 3
# RRG
# Output
# 1
print("input")
rangeIndex = int(input("N> "))
text = input("Rock color> ")
print(text)
score = 0
for i in range(rangeIndex):
    if i>0:
        if text[i]==text[i-1]:
            score+=1

print("output")
print(score)