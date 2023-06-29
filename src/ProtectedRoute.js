import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isLoggedUser, setLoggedUser] = useState(false);

    const checkUser = () => {
        const user = localStorage.getItem('user');
        if (!user || user === undefined) {
            setLoggedUser(false);
            return navigate('/');
        }
        setLoggedUser(true);
    }

    useEffect(() => {
        checkUser();
    }, [isLoggedUser])

    return <Fragment>
        {isLoggedUser ? children : null}
    </Fragment>
}

export default ProtectedRoute;