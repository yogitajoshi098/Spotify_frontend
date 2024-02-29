const TextWithHover = ({ displayText, active, className }) => {
    return (
        <div className="flex items-center justify-start cursor-pointer">
            <div
                className={className + ` ${active ? "text-white" : "text-gray-500"
                    } font-semibold hover:text-gray-600 }`}
            >
                {displayText}
            </div>
        </div>
    );
};

export default TextWithHover