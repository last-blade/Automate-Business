import { upload } from "../utils/multer.js";
import multer from "multer";

const handleMulterUpload = (fieldName = "taskImage") => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log("err1", err)
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
        console.log("err2", err)
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