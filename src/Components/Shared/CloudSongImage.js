import { openUploadWidget } from "../../Utils/CloudinaryService";
import { cloudinary_upload_preset } from "../../config";

const CloudSongImage = ({ setThumbnail, setUploadedImageStatus }) => {
    const uploadThumbnail = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dgafdkkv2",
                uploadPreset: cloudinary_upload_preset,
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    console.log(result)
                    setThumbnail(result.info.secure_url);
                    setUploadedImageStatus(result.event);
                } else {
                    if (error) {
                        console.log(error);
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button
            className="w-full py-3 text-gray-500 bg-white border border-gray-400 border-solid rounded hover:border-blue-500 hover:bg-blue-100 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={uploadThumbnail}
        >
            Select Image
        </button>
    );
};

export default CloudSongImage;