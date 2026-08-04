import { Modal,Form,Input,Select ,Button} from "antd";

function AddRoom({modalAdd,cancelMDA,handleSubmit,loaiPhong,tienIch}) {
    return (
        <>
            <Modal
                open={modalAdd}
                onCancel={cancelMDA}
                title="Thêm Bất Động Sản"
                footer={false}
            >
                <Form onFinish={handleSubmit}>
                    <Form.Item label="Tên Bất Động Sản" name={"tenPhong"} rules={[{ required: true, message: "Thông tin bắt buộc" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Gía" name={"gia"} rules={[{ required: true, message: "Thông tin bắt buộc" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Địa Chỉ" name={"diaChi"} rules={[{ required: true, message: "Thông tin bắt buộc" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Thời gian cho thuê" name={"thoiGianChoThue"} rules={[{ required: true, message: "Thông tin bắt buộc" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Loại Bất Động Sản" name={"loaiPhong"} rules={[{ required: true, message: "Thông tin bắt buộc" }]}>
                        <Select options={loaiPhong}>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Tiện Ích" name={"tienIch"}>
                        <Select options={tienIch} allowClear mode="multiple">
                        </Select>
                    </Form.Item>
                    <Form.Item label="Sổ đỏ" name={"soDo"}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Mô Tả" name={"mota"} rules={[{ required: true, message: "Thông tin bắt buộc" }]}>
                        <Input.TextArea></Input.TextArea>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Xác nhận</Button>
                </Form>
            </Modal>
        </>
    )
}
export default AddRoom