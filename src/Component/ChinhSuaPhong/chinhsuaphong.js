import { Modal,Form,Input,Select ,Button} from "antd";
import { useCallback, useEffect } from "react";
import { data } from "react-router-dom";


function ChinhSuaPhong({closeModalChange,modalChange,dataChange,loaiPhong,messageApi,tienIch}){
    const [form] = Form.useForm();
    const handleSubmit = useCallback((values) => {
        const newPhong = {
            tenPhong: values.tenPhong,
            gia: values.gia,
            loaiPhong: values.loaiPhong,
            rate: values.rate,
            rateper10: values.rateper10,
            diaChi: values.diaChi,
            idChuSoHuu: values.id,
            trangThai: false,
            thoiGianChoThue: values.thoiGianChoThue,
            mota: values.mota,
            soDo: values.soDo,
            idQTV: "",
            duyet: "chuaDuyet"
        };
        fetch("https://servertripnest-4.onrender.com/api/phong/"+dataChange.id,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPhong)
        })
        .then(res => res.json())
        .then(data => {
            closeModalChange();
            messageApi.open({
                "type": "success",
                "content": "Chúc mừng bạn đã cập nhật thành công"
            })
        })
        Promise.all(
            values.tienIch.map(async (item) => {
                fetch("https://servertripnest-4.onrender.com/api/tienich",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"idbds": dataChange.id,"tienich":item})
                })
            })
        )
        .then(result => {})

    },[dataChange])
    useEffect(() => {
        if(dataChange){
            form.setFieldsValue({
                "tenPhong": dataChange.tenPhong,
                "gia": dataChange.gia,
                "diaChi": dataChange.diaChi,
                "thoiGianChoThue": dataChange.thoiGianChoThue,
                "loaiPhong": dataChange.loaiPhong,
                "mota": dataChange.mota
            })
        }
    },[dataChange])
    return (
        <>
            <Modal onCancel={closeModalChange} open={modalChange} footer = {false} title = "Chỉnh sửa thông tin" destroyOnHidden>
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item initialValue={dataChange.tenPhong} label="Tên Bất Động Sản" name={"tenPhong"} rules={[{ required: true, message: "Bạn phải nhập tên bất động sản trước!" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item initialValue = {dataChange.gia} label="Gía" name={"gia"} rules={[{ required: true, message: "Bạn phải nhập giá bất động sản trước!" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item initialValue={dataChange.diaChi} label="Địa Chỉ" name={"diaChi"} rules={[{ required: true, message: "Bạn phải nhập địa chỉ trước!" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item initialValue={dataChange.thoiGianChoThue} label="Thời gian cho thuê" name={"thoiGianChoThue"} rules={[{ required: true, message: "Bạn phải ghi rõ thời gian cho thuê!" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item initialValue={dataChange.loaiPhong} label="Loại Bất Động Sản" name={"loaiPhong"} rules={[{ required: true, message: "Bạn phải nhập loại bất động sản!" }]}>
                        <Select options={loaiPhong}>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Tiện Ích" name={"tienIch"}>
                        <Select options={tienIch} allowClear mode="multiple">
                        </Select>
                    </Form.Item>
                    <Form.Item initialValue={dataChange.soDo} label="Sổ Đỏ" name={"soDo"} rules={[{ required: true, message: "Bạn phải gắn link ảnh sổ đỏ" }]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item initialValue={dataChange.mota} label="Mô Tả" name={"mota"} rules={[{ required: true, message: "Bạn phải mô tả về bất động sản!" }]}>
                        <Input.TextArea></Input.TextArea>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Xác nhận</Button>
                </Form>
            </Modal>
        </>
    )
}
export default ChinhSuaPhong;