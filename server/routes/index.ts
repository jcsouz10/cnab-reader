import multer from "multer";
import { saveCNABInformation } from "../controller/cnab";

const multerMiddleware = multer().single("file");

export default (app) => {
    app.route("/api/upload/cnab").post(multerMiddleware, saveCNABInformation);
};
