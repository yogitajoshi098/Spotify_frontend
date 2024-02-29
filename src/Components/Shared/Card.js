const Card = ({ title, imgUrl, onClick }) => {
    return (
        <div className="w-full h-48 p-4 bg-black rounded-lg cursor-pointer" onClick={onClick}>
            <div className="h-3/5">
                <img
                    className="object-cover w-full h-full rounded-md"
                    src={imgUrl}
                    alt="label"
                />
            </div>
            <div className="py-1 overflow-hidden font-semibold text-white">{title}</div>
        </div>
    );
};

export default Card;
