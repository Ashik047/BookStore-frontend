import { commonApi } from "./commonApi"
import { serverUrl } from "./serverURL"

// general APIs
export const registerApi = async (reqBody) => {
    return await commonApi("POST", `${serverUrl}/register`, reqBody);
}
export const loginApi = async (reqBody) => {
    return await commonApi("POST", `${serverUrl}/login`, reqBody);
}
export const googleLoginApi = async (reqBody) => {
    return await commonApi("POST", `${serverUrl}/google-login`, reqBody);
}


// User APIs


// get home books
export const getHomeBooksApi = async () => {
    return await commonApi("GET", `${serverUrl}/all-home-books`, "");
}
// get all books
export const getAllBooksApi = async (searchKey, reqHeader) => {
    return await commonApi("GET", `${serverUrl}/all-books?search=${searchKey}`, "", reqHeader);
}
// get one books
export const getOneBooksApi = async (id) => {
    return await commonApi("GET", `${serverUrl}/view-book/${id}`, "");
}

// add a new book
export const addBookApi = async (reqBody, reqHeader) => {
    return await commonApi("POST", `${serverUrl}/add-book`, reqBody, reqHeader);
}

// get all jobs
export const getAllJobsApi = async (searchKey) => {
    return await commonApi("GET", `${serverUrl}/all-jobs?search=${searchKey}`, "");
}
// add job application
export const addApplicationApi = async (reqBody, reqHeader) => {
    return await commonApi("POST", `${serverUrl}/apply-job`, reqBody, reqHeader);
}

// get all job applications

export const getAllJobApplicationApi = async () => {
    return await commonApi("GET", `${serverUrl}/all-application`, "");
}

// update User profile
export const updateUserProfileApi = async (reqBody, reqHeader) => {
    return await commonApi("PUT", `${serverUrl}/user-profile-update`, reqBody, reqHeader);
}
// get all books added by user
export const getSoldBooksApi = async (reqHeader) => {
    return await commonApi("GET", `${serverUrl}/all-sold-books`, "", reqHeader);
}
//  get all books bought by user
export const getBoughtBooksApi = async (reqHeader) => {
    return await commonApi("GET", `${serverUrl}/all-bought-books`, "", reqHeader);
}
// make payment
export const makePaymentApi = async (reqBody, reqHeader) => {
    return await commonApi("PUT", `${serverUrl}/make-payment`, reqBody, reqHeader);
}
// delete profile books
export const deleteProfileBooksApi = async (id, reqHeader) => {
    return await commonApi("DELETE", `${serverUrl}/delete-profile-books/${id}`, "", reqHeader);
}



// Admin APIs

// all books
export const getAllBooksAdminApi = async (reqHeader) => {
    return await commonApi("GET", `${serverUrl}/admin-all-books`, "", reqHeader);
}
// approve book
export const approveBookApi = async (reqBody, reqHeader) => {
    return await commonApi("PUT", `${serverUrl}/admin-approve-book`, reqBody, reqHeader);
}

// get all users

export const getAllUserApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/all-users`, '', reqHeader)
}

// post a job
export const addJobApi = async (reqBody) => {
    return await commonApi("POST", `${serverUrl}/add-job`, reqBody);
}
// delete a job
export const deleteJobApi = async (id) => {
    return await commonApi("DELETE", `${serverUrl}/delete-job/${id}`, "");
}
// update admin profile
export const updateAdminProfileApi = async (reqBody, reqHeader) => {
    return await commonApi("PUT", `${serverUrl}/admin-profile-update`, reqBody, reqHeader);
}
