import { Button, Form,Input,Modal } from "antd";
import { useCallback } from "react";

function ThemAnh({closeModalThemAnh,modalThemAnh,idPhong,messageApi}){
    const handleSubmit = useCallback((e) => {
        const data = {
            "idbds": idPhong,
            "hinhAnh": e.hinhAnh
        }
        fetch("http://localhost:3000/hinhanh",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            messageApi.open({
                "type": "success",
                "content": "Ảnh đã được thêm thành công!!!"
            })
            closeModalThemAnh()
        })
    })
    return (
        <>
            <Modal open = {modalThemAnh} onCancel={closeModalThemAnh} footer={false} title="Thêm ảnh cho Bất Động Sản của bạn">
                <Form onFinish={handleSubmit}>
                    <Form.Item label = "Đường dẫn ảnh" name="hinhAnh">
                        <Input></Input>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Thêm Ảnh</Button>
                </Form>
            </Modal>
        </>
    )
}
export default ThemAnh;