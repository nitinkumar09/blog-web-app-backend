import { Alert, Button, Modal, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { supabase } from "../supabase";

import { Link } from "react-router-dom"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi"
export default function DashProfile() {
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);




//    const uploadImage = async () => {
//     setImageFileUploading(true);
//     setImageFileUploadError(null);

//     const fileExt = imageFile.name.split('.').pop();
//     const fileName = `${Date.now()}.${fileExt}`;
//     const filePath = `profile-pictures/${fileName}`;

//     const { error: uploadError } = await supabase.storage
//         .from('postblogwebapp') // <- change to your actual bucket name
//         .upload(filePath, imageFile, {
//             cacheControl: '3600',
//             upsert: false
//         });
// // console.log(uploadError)
//     if (uploadError) {
//         setImageFileUploadError('Could not upload image (File must be less than 2MB)');
//         setImageFileUploadProgress(null);
//         setImageFile(null);
//         setImageFileUrl(null);
//         setImageFileUploading(false);
//         return;
//     }

//     const { data } = supabase.storage
//         .from('postblogwebapp')
//         .getPublicUrl(filePath);

//     if (data?.publicUrl) {
//         setImageFileUrl(data.publicUrl);
//         setFormData({ ...formData, profilePicture: data.publicUrl });
//         setImageFileUploading(false);
//     } else {
//         setImageFileUploadError('Failed to get image URL');
//         setImageFileUploading(false);
//     }
// };




const uploadImage = async () => {
  setImageFileUploading(true);
  setImageFileUploadError(null);

  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `profile-pictures/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('postblogwebapp')
    .upload(filePath, imageFile, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    setImageFileUploadError('Could not upload image (File must be less than 2MB)');
    setImageFile(null);
    setImageFileUrl(null);
    setImageFileUploading(false);
    return;
  }

  const { data, error: publicUrlError } = supabase.storage
    .from('postblogwebapp')
    .getPublicUrl(filePath);

  if (publicUrlError || !data?.publicUrl) {
    setImageFileUploadError('Failed to get image URL');
    setImageFileUploading(false);
    return;
  }

  setImageFileUrl(data.publicUrl);
  setFormData({ ...formData, profilePicture: data.publicUrl });
  setImageFileUploading(false);
};





    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        // Check if formData is empty
        if (Object.keys(formData).length === 0) {

            setUpdateUserError('No changes mode');
            return;
        }

        if (imageFileUploading) {
            setUpdateUserError('Please wait for image to upload.')
            return;
        }

        try {
            // Start the update process
            dispatch(updateStart());

            // Make the API request
            // const res = await fetch(`http://localhost:3000/api/user/update/673e5f3c8448337f98b5bda3`, {
            console.log("user id",currentUser._id)

            // console.log(formData)
            const token = localStorage.getItem("token"); // Retrieve the token from localStorage

            const res = await fetch(`http://localhost:3000/api/user/update/${currentUser?._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include the token in the Authorization header
                },
                credentials: "include", // Ensure cookies are sent
                body: JSON.stringify(formData), // Convert formData to JSON string
            });
            // .then(response => response.json()) // Parse the JSON response
            // .then(data => {
            //     console.log(data); // Handle the response data
            // })
            // .catch(error => {
            //     console.error('Error:', error); // Handle errors
            // });


            // Parse the response
            const data = await res.json();
            console.log(formData)

            if (!res.ok) {
                // Dispatch failure action if the response is not OK
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            } else {
                // Dispatch success action on success
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's profile updated successfully");
                setTimeout(() => {
              setUpdateUserSuccess("");
           }, 30000);

            }
        } catch (error) {
            // Dispatch failure action in case of an error
            console.log("Error in catch")
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
        }
    };

    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const token = localStorage.getItem("token"); // Retrieve the token from localStorage

            const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser?._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include the token in the Authorization header
                },
                credentials: "include", // Ensure cookies are sent
                body: JSON.stringify(formData), // Convert formData to JSON string
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
            }
            else {
                dispatch(deleteUserSuccess(data))
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }

    };

    const hanldeSignout = async () => {
        localStorage.removeItem("token");
        try {
            const res = await fetch("http://localhost:3000/api/user/signout", {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            }
            else {
                alert("Are you sure you want to sign out?");
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
                  
                  
                    {
  imageFileUploading && (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 rounded-full">
      <div className="loader"></div> {/* CSS spinner */}
    </div>
  )
}

                    <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] 
                            ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
                </div>
                {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}
                <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} onChange={handleChange} />
                <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email} onChange={handleChange} />
                

                <TextInput type="password" id="password" placeholder="password" defaultValue={currentUser.password}  onChange={handleChange} />
                {/* <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading || imageFileUploading}>{loading ? "Loading..." : "Update"}</Button> */}
                <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={imageFileUploadProgress && imageFileUploadProgress < 100}>
                    {imageFileUploadProgress && imageFileUploadProgress < 100 ? "Uploading..." : "Update"}
                </Button>
                {
                    currentUser.isAdmin && (
                        <Link to={'/create-post'}>
                            <Button
                                type="button"
                                gradientDuoTone="purpleToPink"
                                className="w-full"
                            >
                                Create a post
                            </Button>
                        </Link>
                    )
                }

            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span onClick={() => setShowModal(true)} className="cursor-pointer">Delete Account</span>
                <span onClick={hanldeSignout} className="cursor-pointer">Sign Out</span>
            </div>
            {
                updateUserSuccess && (
                    <Alert color="success" className="mt-5">
                        {updateUserSuccess}
                    </Alert>
                )
            }
            {
                updateUserError && (
                    <Alert color="failure" className="mt-5">
                        {updateUserError}
                    </Alert>
                )
            }
            {
                error && (
                    <Alert color="failure" className="mt-5">
                        {error}
                    </Alert>
                )
            }
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete your account?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteUser}>Yes, I,m sure </Button>
                            <Button color="gray" onClick={() => setShowModal(false)}>No,cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
