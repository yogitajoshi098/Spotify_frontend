import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconWithoutText = ({ iconName, size, targetLink, onClick }) => {
    return (
        <Link to={targetLink} className="block">
            <div
                className="cursor-pointer"
                onClick={onClick}
            >

                <Icon
                    icon={iconName}
                    color="white"
                    fontSize={size}
                />


            </div>
        </Link>
    );
};

export default IconWithoutText;