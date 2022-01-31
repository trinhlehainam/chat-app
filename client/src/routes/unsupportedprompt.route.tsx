import { memo } from "react";
import { useNavigate } from "react-router-dom";
import LobbyButton from "../components/lobby/button.component";

const MemoButton = memo(LobbyButton);
const UnsupportedPrompt = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-12">
            <h1 className="text-yellow-custom text-7xl">Page is not yet supported !</h1>
            <MemoButton classname="" childClassName="btn-base peer" fillClass="fill" onClick={() => navigate('/')} text="BACK TO HOME" />
        </div>
    )
};

export default UnsupportedPrompt;
