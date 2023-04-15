import axios from "axios";
import countriesJSON from "../../dataset/countries.min.json";

export const getParams = (args) => {
    return {
        params: {
            ...args
        }
    };
}

//export const host = "https://atlantbh-auction-app.herokuapp.com";

export const host = "http://localhost:8080";


export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'c7x617z9');

    return (await axios.post('https://api.Cloudinary.com/v1_1/deye0c3eh/image/upload', formData)).data.secure_url;
}


export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const countries = Object.keys(countriesJSON);

export const placeholderPicture = "https://res.cloudinary.com/deye0c3eh/image/upload/gender-neutral-placeholder_ifvixm.png";
