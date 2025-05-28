import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { supabase } from "../supabase"; // 👈 Import your Supabase client

export default function UpdatePosts() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                console.log("Fetched post data:", data);
                console.log("Current postId from URL:", postId);
console.log("Post ID from fetched data:", data.posts[0]?._id);

                if (!res.ok) {
                    setPublishError(data.message);
                    return;
                }
                setFormData(data.posts[0]);
            } catch (error) {
                console.log(error.message);
            }
            finally {
      setLoading(false); // ✅ done loading
    }
        };
        fetchPost();
    }, [postId]);

    const handleUploadImage = async () => {
        if (formData && formData._id && currentUser && currentUser._id) {
  console.log(formData._id, "and", currentUser._id);
} else {
  console.log("formData._id or currentUser._id is missing", formData._id, currentUser?._id);
}


        try {
            if (!file) {
                setImageUploadError("Please select an image");
                return;
            }

            setImageUploadError(null);
            setPublishError(null);

            const fileName = `${Date.now()}-${file.name}`;
            const { data, error } = await supabase.storage
                .from("postblogwebapp") // 👈 your Supabase bucket name
                .upload(fileName, file);

            if (error) {
                throw error;
            }

            // Get public URL
            const { data: publicUrlData } = supabase
                .storage
                .from("postblogwebapp")
                .getPublicUrl(fileName);

            setFormData({ ...formData, image: publicUrlData.publicUrl });
            setImageUploadProgress(null);
        } catch (error) {
            setImageUploadError("Image upload failed!");
            setImageUploadProgress(null);
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       if (formData && formData._id && currentUser && currentUser._id) {
  console.log(formData._id, "and", currentUser._id);
} else {
  console.log("formData._id or currentUser._id is missing", formData._id, currentUser?._id);
}

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
            navigate(`/post/${data.slug}`);
        } catch (error) {
            setPublishError("Something went wrong!");
        }
    };

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-3xl text-center my-7 font-semibold">Update post</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        placeholder="Title"
                        required
                        id="title"
                        className="flex-1"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        value={formData.title || ""}
                    />
                    <Select
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        value={formData.category || ""}
                    >
                        <option value="uncategorized">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                    <Button
                        type="button"
                        gradientDuoTone="purpleToBlue"
                        size="sm"
                        outline
                        onClick={handleUploadImage}
                        disabled={!formData._id || !currentUser?._id}
                    >
                        {imageUploadProgress ? (
                            <div className="w-16 h-16">
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                            </div>
                        ) : (
                            "Upload Image"
                        )}
                    </Button>
                </div>
                {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
                {formData.image && (
                    <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />
                )}
                <ReactQuill
                    theme="snow"
                    value={formData.content || ""}
                    placeholder="Write something..."
                    className="h-72 mb-12"
                    required
                    onChange={(value) => setFormData({ ...formData, content: value })}
                />
                <Button type="submit" gradientDuoTone="purpleToPink" disabled={!formData._id || !currentUser?._id}>
                    Update post
                </Button>
                {publishError && <Alert className="mt-5" color="failure">{publishError}</Alert>}
            </form>
        </div>
    );
}
