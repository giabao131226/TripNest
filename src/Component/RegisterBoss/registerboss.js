import { Form, Input, DatePicker, Button,message } from "antd";
import "./registerboss.css"
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function RegisterBoss() {
    const [messageApi,contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const handleFinish = useCallback(() => {
        messageApi.open({
            type: 'success',
            content: "Bạn đã đăng ký thành công,hãy chờ chúng tôi duyệt nhé!"
        })
    },[])
    return (
        <>
            {contextHolder}
            <div className="registerboss">
                <div className="registerboss__container">
                    <div className="registerboss__img">
                        <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg"></img>
                    </div>
                    <div className="registerboss__main">
                        <div className="registerboss__title">
                            <h3>Tạo tài khoản chủ cơ sở</h3>
                            <p>Cung cấp các thông tin sau để trở thành chủ cơ sở</p>
                        </div>
                        <div className="registerboss__form">
                            <Form onFinish={handleFinish}>
                                <Form.Item label="CCCD/CMND" name={"cccd"} rules={[{ required: true, message: "Please enter your National ID number!" }]}>
                                    <Input></Input>
                                </Form.Item>
                                <Form.Item label="Họ Và Tên" name={"hovaten"} rules={[{ required: true, message: "Please enter your Fullname!" }]}>
                                    <Input></Input>
                                </Form.Item>
                                <Form.Item label="Ngày/Tháng/NămSinh" name={"dateofbirth"} rules={[{ required: true, message: "Please enter your Date Of Birth!" }]}>
                                    <DatePicker />
                                </Form.Item>
                                <Button type="primary" htmlType="submit">Xác Nhận</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RegisterBoss;