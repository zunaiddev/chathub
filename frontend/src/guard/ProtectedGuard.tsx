import {type JSX, useEffect, useState} from "react";
import {JwtService} from "../service/jwt.service.ts";
import {Navigate} from "react-router-dom";

interface Props {
    isPublic?: boolean;
    children: JSX.Element;
}

function ProtectedGuard({isPublic = false, children}: Props): JSX.Element | null {
    const [loading, setLoading] = useState<boolean>(true);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        console.log("Authenticated", authenticated);
    }, [authenticated]);

    useEffect(() => {
        JwtService.getAccessToken()
            .then(res => {
                setAuthenticated(!!res.token);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return null;
    }

    if (isPublic) {
        return (authenticated ? <Navigate to="/" replace/> : children);
    }

    // if (isPublic) {
    //     return (authenticated ? <Navigate to="/"/> : children);
    // }

    return (authenticated ? children : <Navigate to="/auth/login" replace/>);
}

export default ProtectedGuard;