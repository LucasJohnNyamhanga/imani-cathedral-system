import { IncomingForm } from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';

var mv = require('mv');

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = await new Promise((resolve, reject) => {
		const form = new IncomingForm();

		form.parse(req, (err, fields, files) => {
			if (err) return reject(err);
			const fileUpload = JSON.parse(JSON.stringify(files));
			var oldPath = fileUpload.file.filepath;
			var newPath = `./public/uploads/${fileUpload.file.originalFilename}`;
			mv(oldPath, newPath, function (err: any) {
				console.log(err);
			});
			res.status(200).json({
				file: `/uploads/${fileUpload.file.originalFilename}`,
			});
		});
	});
}
