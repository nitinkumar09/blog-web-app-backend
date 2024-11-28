import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import OAuth from "../components/OAuth";

export default function SignUpp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage("Please fill out all fields.");
        }

        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('http://localhost:3000/api/auth/signup', {  // Corrected route
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Signup Successfull..!");
                navigate("/sign-in")
            } else {
                setLoading(false);
                return setErrorMessage(data.message);
            }
            setLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* Left Side */}
                <div className="flex-1">
                    <Link to="/" className="font-bold dark:text-white text-4xl">
                        <span className="px-3 py-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                            Nitin&apos;s
                        </span>
                        Blog
                    </Link>
                    <p className="text-sm mt-5">
                        This is a demo project. You can sign up with your email and password or with Google.
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <Label value="Your username" />
                            <TextInput
                                type="text"
                                placeholder="Username"
                                name="username"  // Add name attribute
                                onChange={handleChange}
                                autoComplete="username"
                            />
                        </div>

                        <div>
                            <Label value="Your email" />
                            <TextInput
                                type="email"
                                placeholder="name@company.com"
                                name="email"  // Add name attribute
                                onChange={handleChange}
                                autoComplete="email"
                            />
                        </div>

                        <div>
                            <Label value="Your password" />
                            <TextInput
                                type="password"
                                placeholder="Password"
                                name="password"  // Add name attribute
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                        </div>

                        <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size="sm" />
                                        <span className="pl-3">Loading....</span>
                                    </>
                                ) : "Sign Up"
                            }
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to="/sign-in" className="text-blue-500">
                            Sign In
                        </Link>
                    </div>
                    {
                        errorMessage && (
                            <Alert className=" mt-5" color="failure">
                                {errorMessage}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
