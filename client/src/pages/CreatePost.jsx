import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase"; // <-- Supabase client import

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }

            setImageUploadError(null);
            setPublishError(null);
            setUploading(true);
            setImageUploadProgress(0);

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `post-images/${fileName}`;

            const upload = await supabase.storage
                .from('postblogwebapp')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (upload.error) {
                throw upload.error;
            }

            const { data } = supabase.storage
                .from('postblogwebapp')
                .getPublicUrl(filePath);

            setFormData({ ...formData, image: data.publicUrl });
            setFile(null); // reset file input
        } catch (error) {
            console.error(error);
            setImageUploadError('Image upload failed!');
        } finally {
            setUploading(false);
            setImageUploadProgress(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3000/api/post/create", {
                method: "POST",
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

            setPublishError(null);
            navigate(`/post/${data.slug}`);
        } catch (error) {
            setPublishError('Something went wrong!');
        }
    };

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-3xl text-center my-7 font-semibold">Create a post</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        placeholder="Title"
                        required
                        id="title"
                        className="flex-1"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <Select
                        onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                        }
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        disabled={uploading}
                    />
                    <Button
                        type="button"
                        gradientDuoTone="purpleToBlue"
                        size="sm"
                        outline
                        onClick={handleUploadImage}
                        disabled={uploading}
                    >
                        {
                            uploading ? (
                                <div className="w-16 h-16">
                                    <CircularProgressbar
                                        value={imageUploadProgress || 0}
                                        text={`${imageUploadProgress || 0}%`}
                                    />
                                </div>
                            ) : 'Upload Image'
                        }
                    </Button>
                </div>

                {imageUploadError && (
                    <Alert color="failure">
                        {imageUploadError}
                    </Alert>
                )}

                {formData.image && (
                    <img
                        src={formData.image}
                        alt="upload"
                        className="w-full h-72 object-cover"
                    />
                )}

                <ReactQuill
                    theme="snow"
                    placeholder="Write something..."
                    className="h-72 mb-12"
                    required
                    onChange={(value) => {
                        setFormData({ ...formData, content: value });
                    }}
                />

                <Button
                    type="submit"
                    gradientDuoTone="purpleToPink"
                >
                    Publish
                </Button>

                {publishError && (
                    <Alert className="mt-5" color="failure">
                        {publishError}
                    </Alert>
                )}
            </form>
        </div>
    );
}
