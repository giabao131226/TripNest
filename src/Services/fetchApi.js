
export const FetchPost = async (duLieu) => {
    const res = await fetch("http://localhost:3000/user",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...duLieu
        })
    })
    const data = res.json()
    return data
}