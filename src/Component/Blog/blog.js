
import "./blog.css"

function Blog(){
    return (
        <>
            <div className="blog">
                <div className="blog__container">
                    <div className="blog__title">
                        <p>BLOG</p>
                        <h1>Latest From Our Blog</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et rhoncus lacus.</p>
                    </div>
                    <div className="blog__main">
                        <div className="blog__column1">
                            <div className="blog__vienimg">
                                <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2014/01/gallery1.jpg"></img>
                            </div>
                            <div className="blog__vienimg">
                                <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2014/01/gallery7.jpg"></img>
                            </div>
                        </div>
                        <div className="blog__column2">
                            <div className="blog__vienimg">
                                <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2014/01/gallery9-2.jpg"></img>
                            </div>
                            <div className="blog__vienimg">
                                <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2014/01/gallery3.jpg"></img>
                            </div>
                        </div>
                        <div className="blog__column3">
                            <div className="blog__vienimg">
                                <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2014/01/gallery4-1.jpg"></img>
                            </div>
                            <div className="blog__vienimg">
                                <img src="https://mistymount.wpenginepowered.com/wp-content/uploads/2014/01/gallery8-1.jpg"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Blog;