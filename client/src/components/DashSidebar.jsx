import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi'
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('')
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search])
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
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-1">
                    {

                        currentUser && currentUser.isAdmin && (
                            <Link to={'/dashboard?tab=dash'}>
                                <Sidebar.Item 
                                active={tab === 'dash' || !tab}
                                icon={HiChartPie} as='div'>
                                    Dashboard
                                </Sidebar.Item>

                            </Link>
                        )

                    }
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? "Admin" : "User"} labelColor="dark" as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>

                    <Link to='/dashboard?tab=posts'>
                        {
                            currentUser.isAdmin && (
                                <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                                    Posts
                                </Sidebar.Item>
                            )
                        }
                    </Link>

                    <Link to='/dashboard?tab=users'>
                        {
                            currentUser.isAdmin && (
                                <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as='div'>
                                    Users
                                </Sidebar.Item>
                            )
                        }
                    </Link>

                    <Link to='/dashboard?tab=comments'>
                        {
                            currentUser.isAdmin && (
                                <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as='div'>
                                    Comments
                                </Sidebar.Item>
                            )
                        }
                    </Link>
                    
                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={hanldeSignout}>
                        Sign Out
                    </Sidebar.Item>

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar >
    )
}
