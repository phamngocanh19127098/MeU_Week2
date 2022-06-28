Huớng dẫn chạy source:
Run source sql
chạy lệnh npm install
chạy lênh npm run start
truy cập swagger vào http://localhost:3000/doc 
Note : ví dụ request body của tạo hóa đơn
{
"total_price": "100",
"productList": [
    {
  "quantity": 40,
  "product_id" : 1,
}
]
}
Duy nhất API này swagger nó không render được example
mọi API khác đã có example trên swagger