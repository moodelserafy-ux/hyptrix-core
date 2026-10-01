const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const AdmZip = require('adm-zip');
const mime = require('mime-types');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// حد أقصى 50 ميجا لملف الـ ZIP
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const PORT = 3000;

app.post('/deploy', upload.single('site_file'), async (req, res) => {
    try {
        const file = req.file;
        const siteName = req.body.site_name;

        if (!file || !siteName) {
            return res.status(400).json({ error: "لازم تبعت ملف الموقع واسم الموقع!" });
        }

        // لو العميل رافع ملف ZIP، هنفكه ونرفع كل ملف لوحده
        if (file.originalname.endsWith('.zip') || file.mimetype === 'application/zip') {
            const zip = new AdmZip(file.buffer);
            const zipEntries = zip.getEntries();
            
            // رفع كل الملفات في نفس الوقت (Parallel Upload) للسرعة
            const uploadPromises = zipEntries.map(async (entry) => {
                // لو ده فولدر فاضي، تجاهله
                if (entry.isDirectory) return;

                const fileContent = entry.getData();
                const filePath = `${siteName}/${entry.entryName}`; // الحفاظ على مسار الملفات جوه الفولدر
                const contentType = mime.lookup(entry.entryName) || 'application/octet-stream';

                const uploadParams = {
                    Bucket: process.env.R2_BUCKET_NAME,
                    Key: filePath,
                    Body: fileContent,
                    ContentType: contentType,
                };

                return s3Client.send(new PutObjectCommand(uploadParams));
            });

            await Promise.all(uploadPromises);

        } else {
            // لو رافع ملف عادي (مش ZIP)، ارفعه زي ما هو
            const contentType = mime.lookup(file.originalname) || file.mimetype;
            const uploadParams = {
                Bucket: process.env.R2_BUCKET_NAME,
                Key: `${siteName}/${file.originalname}`,
                Body: file.buffer,
                ContentType: contentType,
            };
            await s3Client.send(new PutObjectCommand(uploadParams));
        }

        res.json({
            status: "success",
            message: "تم رفع الموقع بالكامل بنجاح!",
        });

    } catch (error) {
        console.error("Error during deployment:", error);
        res.status(500).json({ error: "حصل مشكلة أثناء رفع الملفات!" });
    }
});

// المسار السري لاستقبال مدفوعات فودافون كاش من MacroDroid
app.post('/webhook/vodafone-cash', (req, res) => {
    try {
        // حماية للمسار عشان محدش يبعت طلبات مزيفة
        const secretKey = req.headers['x-hyptrix-secret'];
        if (secretKey !== 'MATRIX_CASH_2026') {
            return res.status(401).json({ error: "Access Denied!" });
        }

        const { sender_number, amount, full_message } = req.body;

        if (!sender_number || !amount) {
            return res.status(400).json({ error: "بيانات الدفع ناقصة" });
        }

        // هنا السيرفر بيسجل إن الفلوس وصلت (في المستقبل ممكن نربطها بداتابيز العملاء)
        console.log(`\n======================================`);
        console.log(`💰 [عملية دفع جديدة!]`);
        console.log(`📱 من الرقم: ${sender_number}`);
        console.log(`💵 المبلغ: ${amount} جنيه`);
        console.log(`======================================\n`);

        res.json({ status: "success", message: "تم استلام وتأكيد الدفع!" });

    } catch (error) {
        console.error("Error in Webhook:", error);
        res.status(500).json({ error: "خطأ داخلي" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Hyptrix Engine is running on port ${PORT}`);
});
