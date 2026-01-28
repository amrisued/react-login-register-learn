import useAuth from "./useAuth";
import axios from "../api/axios";

const REFRESH_TOKEN_URL = "/auth/refreshToken"

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.post(
                REFRESH_TOKEN_URL,
                JSON.stringify({ refreshToken: auth?.refreshToken }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            setAuth({
                ...auth,
                accessToken: response?.data?.accessToken,
                //refreshToken: response?.data?.refreshToken,//we need to keep the refresh token to control the user session
            });

            return response?.data?.accessToken;
        } catch (error) {
            console.log(error);
        }
    };
    return refresh;
};

export default useRefreshToken;
