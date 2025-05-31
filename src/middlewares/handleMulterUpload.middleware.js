import { upload } from "../utils/multer.js";
import multer from "multer";

const handleMulterUpload = (fieldName = "taskImage") => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File size should not exceed 1MB",
          });
        }

        return res.status(400).json({
          success: false,
          message: `Multer error: ${err.message}`,
        });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Unexpected error during file upload",
        });
      }
      next();
    });
  };
};

export {handleMulterUpload}