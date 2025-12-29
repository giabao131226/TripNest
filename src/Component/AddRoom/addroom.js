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
                    <Form.Item label="Tên Bất Động Sản" name={"tenPhong"} rules={[{ required: true, message: "Bạn phải nhập tên bất động sản trước!" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Gía" name={"gia"} rules={[{ required: true, message: "Bạn phải nhập giá bất động sản trước!" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Địa Chỉ" name={"diaChi"} rules={[{ required: true, message: "Bạn phải nhập địa chỉ trước!" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Thời gian cho thuê" name={"thoiGianChoThue"} rules={[{ required: true, message: "Bạn phải ghi rõ thời gian cho thuê!" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Loại Bất Động Sản" name={"loaiPhong"} rules={[{ required: true, message: "Bạn phải nhập loại bất động sản!" }]}>
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
                    <Form.Item label="Mô Tả" name={"mota"} rules={[{ required: true, message: "Bạn phải mô tả về bất động sản!" }]}>
                        <Input.TextArea></Input.TextArea>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Xác nhận</Button>
                </Form>
            </Modal>
        </>
    )
}
export default AddRoom