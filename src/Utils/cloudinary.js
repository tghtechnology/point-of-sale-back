import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dusghtj8l', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

export async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'articulos'
    })
}

export async function deleteImage(secure_url) {
    const urlParts = secure_url.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const public_id = `articulos/${fileNameWithExtension.split('.')[0]}`;
    
    return await cloudinary.uploader.destroy(public_id);
}

          
