import { Modal, Form, Input, Select, Button, Image } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import "./registerboss.css"
import { FaInbox } from "react-icons/fa6";
import { data, useAsyncError } from "react-router-dom";
import Swal from 'sweetalert2'

export default function CreateAccommodation() {
    const [content, setContent] = useState("");
    const [imageAccomodation, setImageAccomodation] = useState([]);
    const [imagesUpToSever, setImagesUpToSever] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [wards, setWards] = useState([]);
    const [imagePreviewLisence, setImagePreviewLisence] = useState("");
    const [dataUpToSever, setDataUpToSever] = useState({});
    const [amenities, setAmenities] = useState([]);
    const [amenity,setAmenity] = useState([]);

    const handlePreviewImage = useCallback((e) => {
        const files = e.target.files;
        const name = e.target.name;
        if (name == "lisence") {
            const urlLinsence = URL.createObjectURL(files[0]);
            setImagePreviewLisence(urlLinsence);
            return;
        }
        const arrayImage = [...imageAccomodation];
        const images = [...imagesUpToSever];
        Array.from(files).forEach((item) => {
            const url = URL.createObjectURL(item);
            arrayImage.push(url);
            images.push(item);
        })
        setImageAccomodation(arrayImage);
        setImagesUpToSever(images);
    }, [imageAccomodation, imagesUpToSever]);

    const handleRemoveImagePreview = useCallback((e) => {
        const indexImage = e.target.getAttribute("image-index");
        const newImageAccomodation = [], newImagesUpToServer = [];
        imageAccomodation.forEach((item, index) => {
            if (index != indexImage) {
                newImageAccomodation.push(item);
                newImagesUpToServer.push(imagesUpToSever[index]);
            }
        })
        setImageAccomodation(newImageAccomodation);
        setImagesUpToSever(newImagesUpToServer);

    }, [imageAccomodation, imagesUpToSever]);

    const handleChangeProvince = useCallback((e) => {
        const provinceId = e.target.value;
        const name = e.target.name;
        if (provinceId == "province-default") {
            setWards([]);
            return;
        }
        const index = provinces.findIndex((item) => item._id == provinceId);
        setDataUpToSever({ ...dataUpToSever, [name]: provinceId });
        setWards(provinces[index].wards);
    }, [provinces,dataUpToSever]);

    const handleChangeAmenity = useCallback((e) => {
        const amenityID = e.target.value;
        if(e.target.checked){
            setAmenity([...amenity,amenityID]);
        }else{
            const newAmenity = amenity.filter((item) => item != amenityID);
            setAmenity(newAmenity);
        }
    },[amenity])

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setDataUpToSever({ ...dataUpToSever, [name]: value });
    });

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const imageLisence = document.querySelector("input#lisence");

        const formData = new FormData();
        Object.keys(dataUpToSever).forEach((item) => {
            formData.append(item, dataUpToSever[item]);
        })
        formData.append("amenity",JSON.stringify(amenity));

        if(imageLisence){
            formData.append("lisence",imageLisence.files[0]);
        }

        if(imagesUpToSever.length>0){
            imagesUpToSever.forEach((item) => {
                formData.append("images",item);
            })
        }
        fetch("http://localhost:5000/bds/save", {
            method: "POST",
            credentials: "include",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Đã lưu thành công!",
                        text: "Thông tin cơ sở lưu trú đã được cập nhật.",
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2500,
                        timerProgressBar: true,
                        background: "#ffffff",
                        color: "#333",
                        iconColor: "#22c55e"
                    });
                    e.target.reset();
                    setDataUpToSever({});
                    setImageAccomodation([]);
                    setImagePreviewLisence("");
                    setAmenity([]);
                }
            })
    }, [dataUpToSever,amenity,imagesUpToSever])

    useEffect(() => {
        fetch("http://localhost:5000/province")
            .then(res => res.json())
            .then(data => {
                if (data.success) setProvinces(data.data);
            })
        fetch("http://localhost:5000/amenity")
            .then(res => res.json())
            .then(data => {
                if (data.success){
                    setAmenities(data.amenities);
                }
            })
    }, [])

    return (
        <>
            <div className="container-fluid text-align-start">
                <div className="container">
                    <form className="formCreateAccomodation d-flex flex-column" onSubmit={handleSubmit}>
                        <h3 className="m-0">Thông Tin Cơ Bản</h3>
                        <div className="d-flex flex-column">
                            <label>Tên Cơ Sở Lưu Trú</label>
                            <input type="text" name="name" onChange={handleChange} required></input>
                        </div>
                        <div className="d-flex flex-column">
                            <label>Địa chỉ</label>

                            <div className="d-flex gap-x-3">
                                <div className="col-6 d-flex flex-column">
                                    <label>Thành phố</label>
                                    <select name="province_id" onChange={handleChangeProvince}>
                                        <option value="province-default">--Chọn thành phố--</option>
                                        {provinces.map((item, index) => <option value={item._id} key={index}>{item.name}</option>)}
                                    </select>
                                </div>

                                <div className="col-6 d-flex flex-column">
                                    <label>Xã / Phường</label>
                                    <select name="ward_id" onChange={handleChange}>
                                        <option>--Chọn xã/phường--</option>
                                        {wards.map((item, index) => <option value={item._id} key={index}>{item.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="d-flex flex-column">
                                <label>Địa chỉ cụ thể</label>
                                <input
                                    onChange={handleChange}
                                    name="address"
                                    type="text"
                                    placeholder="Ví dụ: 123 Trần Duy Hưng, Cầu Giấy"
                                    required
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <label>Loại Cơ Sở Lưu Trú</label>
                            <select name="category_id" onChange={handleChange}>
                                <option></option>
                            </select>
                        </div>
                        <div className="d-flex flex-column">
                            <label>Tiện Ích</label>
                            <div className="images d-flex flex-wrap items-center justify-center">
                                {amenities.length > 0 ?
                                    <>
                                        {amenities.map((item, index) =>
                                            <>
                                                <div key={index} className="col-3 p-2">
                                                    <label className="amenity-item">
                                                        <input
                                                            type="checkbox"
                                                            name="amenity"
                                                            value={item._id}
                                                            onChange={handleChangeAmenity}
                                                        />

                                                        <div className="amenity-content">
                                                            <div className="amenity-icon">
                                                                <i className={item.icon}></i>
                                                            </div>

                                                            <span>{item.name}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            </>)}
                                    </> :
                                    <>
                                        <div className="empty d-flex items-center justify-center gap-x-3">
                                            <FaInbox className="font-30" />
                                        </div>
                                    </>}
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <label>Mô Tả</label>
                            <Editor
                                apiKey="1a2hzecrr53ypadb7v095uo5i8u7xzhzy2a0al9uyn03q53h"
                                value={dataUpToSever.description}
                                onEditorChange={(newValue) => setDataUpToSever({ ...dataUpToSever, "description": newValue })}
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <label>Giá</label>
                            <input type="text" name="price" onChange={handleChange}></input>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-between">
                                <label>Ảnh Về Cơ Sở Lưu Trú</label>
                                <label htmlFor="imageAccomodation" className="cursor-pointer">Thêm ảnh</label>
                            </div>
                            <input
                                onChange={handlePreviewImage}
                                id="imageAccomodation" type="file"
                                name="image" accept="image/*"
                                multiple
                                className="d-none">
                            </input>
                            <div className="images d-flex flex-wrap items-center gap-x-3">
                                {imageAccomodation.length > 0 ?
                                    <>
                                        {imageAccomodation.map((item, index) =>
                                            <>
                                                <div className="vien" key={index}>
                                                    <Image width={150} src={item} className="image" />
                                                    <button

                                                        className="font-bold"
                                                        type="button"
                                                        onClick={handleRemoveImagePreview}
                                                        image-index={index}
                                                    >x</button>
                                                </div>
                                            </>)}
                                    </> :
                                    <>
                                        <div className="empty d-flex items-center justify-center gap-x-3">
                                            <FaInbox className="font-30" />
                                        </div>
                                    </>}
                            </div>
                        </div>
                        <h3 className="m-0">Thông Tin Xác Minh</h3>
                        <div className="d-flex flex-column">
                            <div className="d-flex items-center justify-between">
                                <label>Số đỏ / sổ hồng / Hợp đồng thuê / Hợp đồng uỷ quyền</label>
                                <label htmlFor="lisence" className="cursor-pointer">Thêm ảnh</label>
                            </div>
                            <input
                                id="lisence"
                                onChange={handlePreviewImage}
                                type="file"
                                name="lisence"
                                accept="image/*"
                                className="d-none">
                            </input>
                            <Image src={imagePreviewLisence} />
                        </div>
                        <div className="buttons d-flex items-center gap-x-2">
                            <button className="btn btn-save" type="submit">Lưu</button>
                            <button className="btn btn-request">Yêu Cầu Xác Minh</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}