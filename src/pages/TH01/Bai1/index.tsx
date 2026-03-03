import React ,{ useState } from "react";
import {Input,Button, Space} from 'antd'

const BaiTap1 : React.FC = () => {
    const [soNgauNhien] = useState<number>(Math.floor(Math.random() * 100) + 1)
    const [soNguoiNhap,setSoNguoiNhap] = useState<number>(0)
    const [ketQua,setKetQua] = useState<string>()
    const [soLuot,setSoLuot]= useState<number>(10)
    const check = () =>{
        if(soLuot<=0){
            setKetQua(`Ban da het luot, so ngau nhien la ${soNgauNhien}`)
            return;
        }
        if(soNgauNhien>soNguoiNhap){
            setKetQua("Ban doan qua thap")
            
        }else if(soNgauNhien<soNguoiNhap){
            setKetQua("Ban doan qua cao!")
            
        }else{
            setKetQua("Chuc mung ! ban da doan dung")

        }
        setSoLuot(prev => prev - 1)
    }
    return(
        <>
            <Space style = {{marginBottom : 16}}>
                <Input placeholder="Nhap So Cua Ban" allowClear onChange={(e)=>setSoNguoiNhap(Number(e.target.value))}></Input>
                <Button type = "primary" onClick={check}>Kiem tra</Button>
            </Space>
            <div>Ket qua :{ketQua} </div>
            <div>So luot con lai :{soLuot}</div>
        </>
    )
}
export default BaiTap1;