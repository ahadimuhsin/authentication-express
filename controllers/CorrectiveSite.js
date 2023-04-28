import Clusters from "../models/ClusterModel.js";
import fs from "fs"
import CorrectiveSites from "../models/CorrectiveSiteModel.js";

const date = new Date();

let year = date.getFullYear();
let month = ("0" + (date.getMonth() + 1)).slice(-2)


export const IndexCluster = async(req, res) => {
    try {
        const clusters = await Clusters.findAll({
            where: {
                flag: 1
            },
            include: ['regional']
        })
        res.formatter.ok({ data: clusters })
    } catch (error) {
        console.error(error)
    }
}

export const Store = async(req, res) => {
    try {
        console.log(req)
        if (req.files === null) {
            return res.status(400).json({
                message: 'File harus dilampirkan'
            })
        }
        console.log(req.files[0].path);
        const { ticket_id, type_image, notes } = req.body
        if ((type_image == "BEFORE" || type_image == "AFTER") && req.files.length > 2) {
            return res.formatter.badRequest({
                message: "Maksimal 2 foto yang bisa dilampirkan"
            })
        }

        if (type_image == "PROGRESS" && req.files.length > 10) {
            return res.formatter.badRequest({
                message: "Maksimal 10 foto yang bisa dilampirkan"
            })
        }
        for (let i = 0; i < req.files.length; i++) {
            let tmp_path = req.files[i].path;
            let extArray = req.files[i].mimetype.split("/");
            let extension = extArray[extArray.length - 1];

            let path_destination = `public/images/corrective/${year}/${month}/` + req.files[i].filename + '.' + extension;
            let path_to_save = `corrective/${year}/${month}/` + req.files[i].filename + '.' + extension;
            /** A better way to copy the uploaded file. **/
            var src = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(path_destination);
            src.pipe(dest);

            src.on('end', function() { fs.unlinkSync(tmp_path) });
            src.on('error', function(err) {
                res.status(500).json({
                    err: err,
                    msg: "File Upload Gagal"
                });
            });

            await CorrectiveSites.create({
                ticket_id: ticket_id,
                type_image: type_image,
                notes: notes,
                image: path_to_save,
                submit_by: req.userId
            })
        }

        return res.formatter.ok({
            message: 'Berhasil Diupload'
        })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}