import {fetchUser} from "@/apis/user-api";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {User} from "../models/user/user.model";

const UserPage = () => {
    const router = useRouter();
    const {id} = router.query; // get the id parameter from the URL
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (id) {
            let userId = id as string;
            fetchUser(userId).then((data) => {
                setUser(data);
            });
        }
    }, []);

    return <div>{user ? JSON.stringify(user) : "no dealio babydoll"}</div>; // render the id parameter
};

export default UserPage;
