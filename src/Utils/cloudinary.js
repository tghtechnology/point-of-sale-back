import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dnwzliif9', 
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
    return await cloudinary.uploader.destroy(ImgId)
}

          
