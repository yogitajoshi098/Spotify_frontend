import { openUploadWidget } from "../../Utils/CloudinaryService";
import { cloudinary_upload_preset } from "../../config";

const CloudinaryUpload = ({ setUrl, setName }) => {
    const uploadSong = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dgafdkkv2",
                uploadPreset: cloudinary_upload_preset,
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    console.log(result.info)
                    setUrl(result.info.secure_url);
                    setName(result.info.original_filename);
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
            className="p-4 font-semibold text-black bg-white rounded-full"
            onClick={uploadSong}
        >
            Select Track
        </button>
    );
};

export default CloudinaryUpload;