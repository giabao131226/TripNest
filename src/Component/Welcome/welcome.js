import "./welcome.css"
function Welcome(){
    return (
        <>
            <div className="welcome">
                <div className="welcome__container">
                    <div className="welcome__title">
                        <h1>WELCOME TO TRIPNEST</h1>
                        <p>"A place that celebrates life rather than sucks life out of it"</p>
                    </div>
                    <div className="welcome__imgs">
                        <div className="welcome__img">
                            <img src="https://ticotravel.com.vn/wp-content/themes/ticotravel/assets/images/ticotravel/default-page-header-image.jpg">
                            </img>
                        </div>
                        <div className="welcome__img">
                            <img src="https://vivatrip.vn/public/images/uploads/hotels/hotel_185058681_2145744577.webp">
                            </img>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Welcome;