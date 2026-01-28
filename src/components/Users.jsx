import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/auth/admin/usersList", {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (error) {
                console.log(error);
                // navigate('/login', { state: { from: location }, replace: true });//TODO: Fix this - it throws to login even when the token is valid
            }
        }
        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <article>
            <h1>Users List</h1>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.name + " - " + user?.username + " - " + user?.roles.map(role => role).join(", ")}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    )
}

export default Users
