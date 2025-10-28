import Header from "../components/Header"
import Footer from "../../components/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faSquarePlus } from "@fortawesome/free-solid-svg-icons"
import EditProfile from "../components/EditProfile"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react"
import { addBookApi, deleteProfileBooksApi, getBoughtBooksApi, getSoldBooksApi } from "../../services/allApi"
import { useContext } from "react"
import { userProfileUpdateContext } from "../../context/ContextSearch"
import { serverUrl } from "../../services/serverURL"

const Profile = () => {
    const [activeTab, setActiveTab] = useState("sellBook");
    const activeTabStyle = "text-blue-600 bg-white border border-gray-300 px-2 py-0.5 hover:cursor-pointer";
    const inactiveTabStyle = "bg-gray-100 text-black px-2 py-0.5 hover:cursor-pointer";
    const [sellStatus, setSellStatus] = useState(true);
    const [soldHistoryStatus, setSoldHistoryStatus] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState(false);
    const [token, setToken] = useState("");
    const [deleteUpdateTrancker, setDeleteUpdateTracker] = useState(false);
    const [soldBooks, setSoldBooks] = useState([]);
    const [boughtBooks, setBoughtBooks] = useState([]);
    const [bookDetails, setBookDetails] = useState({
        title: "",
        author: "",
        noOfPages: "",
        imageUrl: "",
        price: "",
        dPrice: "",
        abstract: "",
        publisher: "",
        language: "",
        isbn: "",
        category: "",
        uploadImg: []
    });
    const { userProfileUpdateStatus } = useContext(userProfileUpdateContext);
    const [userDetails, setUserDetails] = useState({
        username: "",
        profile: ""
    });
    const [googlePic, setGooglePic] = useState(false);

    const getAllSoldBooks = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        const result = await getSoldBooksApi(reqHeader);

        if (result.status === 200) {
            setSoldBooks(result.data);
        }


    }

    const getAllBoughtBooks = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };

        const result = await getBoughtBooksApi(reqHeader);
        if (result.status === 200) {
            setBoughtBooks(result.data);
        }

    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"));
            const user = JSON.parse(sessionStorage.getItem("Existing User"));
            setUserDetails({ username: user.username, profile: user.profile });
            if (user.profile.startsWith("https")) {
                setGooglePic(true);
            }
        }
    }, [userProfileUpdateStatus]);

    useEffect(() => {
        if (activeTab == "soldHistory") {
            getAllSoldBooks();
        } else if (activeTab == "purchaseHistory") {
            getAllBoughtBooks();
        }
    }, [activeTab, deleteUpdateTrancker]);
    const [preview, setPreview] = useState("");
    const [previewList, setPreviewList] = useState([]);
    const handleFormData = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setBookDetails(prev => ({ ...prev, [name]: value }));
    }
    const handleFileUpload = (e) => {
        // console.log(e.target.files[0]);
        const fileArray = bookDetails.uploadImg;
        fileArray.push(e.target.files[0]);
        setBookDetails(prev => ({ ...prev, uploadImg: fileArray }));
        const url = URL.createObjectURL(e.target.files[0]);
        if (!preview) {
            setPreview(url);
        } else {
            const previewArray = previewList;
            previewArray.push(url);
            setPreviewList(previewArray);
        }

    }
    const handleFormReset = () => {
        setBookDetails({
            title: "",
            author: "",
            noOfPages: "",
            imageUrl: "",
            price: "",
            dPrice: "",
            abstract: "",
            publisher: "",
            language: "",
            isbn: "",
            category: "",
            uploadImg: []
        });
        setPreview("");
        setPreviewList([]);
    }
    const handleSubmit = async () => {
        const { title, author, noOfPages, imageUrl, price, dPrice, abstract, publisher, language, isbn, category, uploadImg } = bookDetails;
        if (!title || !author || !noOfPages || !imageUrl || !price || !dPrice || !abstract || !publisher || !language || !isbn || !category || !uploadImg.length) {
            toast.info("Please fill the form completely.");
        } else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            // console.log(reqHeader);

            const reqBody = new FormData();
            for (let key in bookDetails) {
                if (key != "uploadImg") {
                    reqBody.append(key, bookDetails[key]);

                } else {
                    bookDetails.uploadImg.forEach(item => {
                        reqBody.append("uploadImg", item)
                    })
                }
            }

            const result = await addBookApi(reqBody, reqHeader);
            // console.log(result);
            if (result.status == "401") {
                toast.warning(result.response.data);
                handleFormReset();
            } else if (result.status == "200") {
                toast.success("Book added successfully");
                handleFormReset();
            } else {
                toast.error("Something went wrong");
                handleFormReset();
            }
        }

    };
    // console.log(`${serverUrl}/uploads/${boughtBooks[0]?.imageUrl}`);
    const hanldeDeleteBook = async (id) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };
        try {
            await deleteProfileBooksApi(id, reqHeader);
            setDeleteUpdateTracker(prev => !prev);

        } catch (err) {
            toast.error("Something went wrong.");
        }
    }

    return (
        <>
            <Header />
            <main className='grow'>
                <div className="w-full bg-gray-900 h-[150px] relative"><div className="absolute top-[60%] left-[20px] p-2 bg-white rounded-[50%]"><img src={userDetails.profile == "" ? "https://cdn-icons-png.flaticon.com/512/9187/9187604.png" : googlePic ? userDetails.profile : `${serverUrl}/uploads/${userDetails.profile}`} alt="" style={{ width: '100px', height: '100px' }} className='inline cursor-pointer bg-white rounded-[50%]' /></div
                ></div>
                <div className="flex mt-15 ms-2 gap-2 items-center justify-between px-4"><div className="flex items-center gap-2"><h1 className="font-bold text-4xl ">{userDetails.username}</h1><FontAwesomeIcon icon={faCircleCheck} className="transform translate-y-1 text-lg text-blue-500" /></div>
                    <EditProfile />
                </div>
                <p className="px-4 mt-6 text-xs w-5/6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad ipsum perferendis fugiat voluptates officiis id quae vel voluptatem earum architecto dolores nulla numquam, sunt soluta optio placeat necessitatibus voluptate dolor!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad ipsum perferendis fugiat voluptates officiis id quae vel voluptatem earum architecto dolores nulla numquam, sunt soluta optio placeat necessitatibus voluptate dolor!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad ipsum perferendis fugiat</p>
                <div className="mt-8 flex justify-center">
                    <button onClick={() => setActiveTab("sellBook")} className={activeTab === "sellBook" ? activeTabStyle : inactiveTabStyle}>Sell Books</button>
                    <button onClick={() => setActiveTab("soldHistory")} className={activeTab === "soldHistory" ? activeTabStyle : inactiveTabStyle}>Sold History</button>
                    <button onClick={() => setActiveTab("purchaseHistory")} className={activeTab === "purchaseHistory" ? activeTabStyle : inactiveTabStyle}>Purchase History</button>
                </div>
                {
                    activeTab === "sellBook" && <form className="w-3/4 bg-blue-100 shadow shadow-gray-500 mt-6 mx-auto px-4 py-6 mb-8">
                        <h2 className="text-center text-2xl font-bold">Book Details</h2>
                        <div className="grid grid-cols-2 w-full gap-2 mt-4 px-10">
                            <div className="flex flex-col gap-2 items-center">
                                <input onChange={handleFormData} value={bookDetails.title} type="text" placeholder="Title" id="title" name="title" className="px-2 py-2 bg-white border rounded-md w-full" />
                                <input onChange={handleFormData} value={bookDetails.author} type="text" placeholder="Author" id="author" name="author" className="px-2 py-2 bg-white border rounded-md w-full" />
                                <input onChange={handleFormData} value={bookDetails.noOfPages} type="text" placeholder="No of Pages" id="noOfPages" name="noOfPages" className="px-2 py-2 bg-white border rounded-md w-full" />
                                <input onChange={handleFormData} value={bookDetails.imageUrl} type="text" placeholder="Image URL" id="imageUrl" name="imageUrl" className="px-2 py-2 bg-white border rounded-md w-full" />
                                <input onChange={handleFormData} value={bookDetails.price} type="text" placeholder="Price" id="price" name="price" className="px-2 py-2 bg-white border rounded-md w-full" />
                                <input onChange={handleFormData} value={bookDetails.dPrice} type="text" placeholder="Discount Price" id="dPrice" name="dPrice" className="px-2 py-2 bg-white border rounded-md w-full" />
                                <textarea onChange={handleFormData} value={bookDetails.abstract} name="abstract" id="abstract" placeholder="Abstract" className="px-2 py-2 bg-white border rounded-md w-full" rows={5}></textarea>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <input onChange={handleFormData} value={bookDetails.publisher} type="text" placeholder="Publisher" id="publisher" name="publisher" className="px-2 py-2 bg-white border rounded-md w-full" />
                                <input onChange={handleFormData} value={bookDetails.language} type="text" placeholder="Language" id="language" name="language" className="px-2 py-2 bg-white border rounded-md w-full" />
                                <input onChange={handleFormData} value={bookDetails.isbn} type="text" placeholder="ISBN" id="isbn" name="isbn" className="px-2 py-2 bg-white border rounded-md w-full" />
                                <input onChange={handleFormData} value={bookDetails.category} type="text" placeholder="Category" id="category" name="category" className="px-2 py-2 bg-white border rounded-md w-full" />
                                <input type="file" id="image" name="image" className="hidden" onChange={handleFileUpload} />
                                {!preview ? <label htmlFor="image">
                                    <img src="/imageUpload.png" alt="upload image" className="w-[100px] aspect-auto mt-6 cursor-pointer" />
                                </label> :
                                    <img src={preview} alt="upload image" className="w-[80px] aspect-auto mt-6 cursor-pointer" />
                                }
                                {preview && <div className="flex justify-center items-center gap-2">
                                    {
                                        previewList.map((img, index) => <img key={index} src={img} alt="book 1" className="w-[40px] aspect-auto" />)
                                    }
                                    <label htmlFor="image"><FontAwesomeIcon icon={faSquarePlus} className="text-4xl cursor-pointer" /></label>
                                </div>}
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end mt-6 me-4">
                            <button type="button" className="bg-red-700 px-4 py-1 text-white hover:opacity-75 rounded-md" onClick={handleFormReset}>Reset</button>
                            <button type="button" className="bg-green-700 px-4 py-1 text-white hover:opacity-75 rounded-md" onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                }
                {
                    activeTab === "soldHistory" && <>
                        {
                            soldBooks?.length > 0 &&
                            soldBooks?.map(book => {
                                return <section key={book._id} className="w-3/4 bg-blue-100 shadow shadow-gray-500 mt-6 mx-auto px-4 py-6 mb-8">

                                    <div className="grid grid-cols-[3fr_1fr] gap-2 mt-6">
                                        <div>
                                            <h3 className="font-bold">{book?.title}</h3>
                                            <p className="font-bold text-sm">{book?.author}</p>
                                            <p className="font-bold text-red-600 text-sm">${book?.dPrice}</p>
                                            <p className="text-sm">{book?.abstract}</p>
                                            <div className="flex gap-4">{
                                                book?.status === "approved" ?
                                                    <img src="https://img.freepik.com/premium-vector/round-approved-stamp-blue-color-template_748886-1091.jpg" alt="approved" className="w-[80px] aspect-square mt-5 rounded-[50%]" /> :
                                                    book?.status === "sold" ?
                                                        <img src="https://img.freepik.com/premium-vector/sold-out-stamp-sold-out-grunge-round-sign_822766-11507.jpg" alt="sold" className="w-[80px] aspect-square mt-5 rounded-[50%]" /> :
                                                        <img src="https://img.freepik.com/premium-vector/pending-decision-rubber-stamp-pending-decision-stamp-vintage-old-red-color_545399-3161.jpg" alt="pending" className="w-[80px] aspect-square mt-5 rounded-[50%]" />}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <img src={`${book?.imageUrl}`} alt="book 1" className="w-[100px] aspect-auto" />
                                            <div>
                                                <button className="bg-red-700 hover:opacity-75 px-2 py-0.5 rounded-md text-white" onClick={() => hanldeDeleteBook(book?._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>


                                </section>
                            })
                        }

                        {soldBooks?.length <= 0 && <div className="text-center my-6">
                            <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="No Books" className="w-[100px] aspect-auto inline-block" />
                            <p className="text-xl font-medium text-red-600 ">No Books Sold Yet</p>
                        </div>}</>
                }
                {
                    activeTab === "purchaseHistory" && <>

                        {boughtBooks?.length > 0 &&
                            boughtBooks?.map(book => (
                                <section key={book?._id} className="w-3/4 bg-blue-100 shadow shadow-gray-500 mt-6 mx-auto px-4 py-6 mb-8">


                                    <div className="grid grid-cols-[3fr_1fr] gap-2 mt-6">
                                        <div>
                                            <h3 className="font-bold">{book?.title}</h3>
                                            <p className="font-bold text-sm">{book?.author}</p>
                                            <p className="font-bold text-red-600 text-sm">${book?.dPrice}</p>
                                            <p className="text-sm">{book?.abstract}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <img src={`${book?.imageUrl}`} alt="book 1" className="w-[100px] aspect-auto" />
                                            <div>
                                                <button className="bg-red-700 hover:opacity-75 px-2 py-0.5 rounded-md text-white" onClick={() => hanldeDeleteBook(book?._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>


                                </section>
                            ))
                        }
                        {boughtBooks?.length <= 0 && <div className="text-center my-6">
                            <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" alt="No Books" className="w-[100px] aspect-auto inline-block" />
                            <p className="text-xl font-medium text-red-600">No Books Purchased Yet</p>
                        </div>}
                    </>
                }
                <ToastContainer theme='colored' autoClose={2000} position='top-center' />
            </main>
            <Footer />
        </>
    )
}

export default Profile