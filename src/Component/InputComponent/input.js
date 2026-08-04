

import "./input.css"

// Hàm Xoá Hiển Thị Lỗi
    // const deleteAlertError = useCallback((e) => {
    //     const id = e.target.getAttribute("alert-error")
    //     const element = document.querySelector("#" + `${id}`)
    //     const dadElement = e.target.closest(".divInputSignIn")
    //     dadElement.classList.remove("error")
    //     element.textContent = '';
    // }, [])
    // 

export default function Input({title,nameInput,type,placeholder,icon,onChangeFunction,errorContent}) {
    return (
        <>
            <div className="d-flex flex-column relative divInputSignIn">
                <label className="font-bold text-gray-200">{title}</label>
                <input type={type} minLength={6} placeholder={placeholder} className="signIninput py-2 px-6 font-bold" name={nameInput} required alert-error='error-name' onChange={onChangeFunction}></input>
                {icon}
            </div>
            <p className="text-error m-0">{errorContent}</p>
        </>
    )
}