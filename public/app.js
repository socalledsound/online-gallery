// Your web app's Firebase configuration
const firebaseConfig = {
        // put your firebase config here, available from your firebase console:
    //https://console.firebase.google.com/ 
    //go to you project then settings and scroll down
    apiKey: "AIzaSyCcvquhO2CGo8zyIH9hGx54NN1ADeA65vg",
    authDomain: "persistently-4625f.firebaseapp.com",
    databaseURL: "https://persistently-4625f.firebaseio.com",
    projectId: "persistently-4625f",
    storageBucket: "persistently-4625f.appspot.com",
    messagingSenderId: "526323833103",
    appId: "1:526323833103:web:93182b3faf5f09c571867a"
    
};

console.log('hi');

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const db = firebase.firestore();
const imagesRef = db.collection('images');

imagesRef.onSnapshot( snapshot => {
    let update = snapshot.docChanges();
    update.forEach(image => {
        console.log(image.doc.data());
        addToGallery(image.doc.data().imageURL);
    })
})


const gallery = document.querySelector('#gallery');
const drop = document.querySelector('#drop');

drop.addEventListener("dragover",function(e){
    e = e || event;
    e.preventDefault();
    console.log('preventing');
    },false);

drop.addEventListener('drop', (e)=>{
    const file = e.dataTransfer.files[0];
    const filesize = file.size / 1024 / 1024;
    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
        let fileURL = reader.result;
        console.log(file);firebase 
        const metadata = { contentType: file.type };
        uploadFile(file, metadata);


       
    })



    if(file){
        if(filesize > 1){
            alert('file must be smaller than 1 MB');
        } else {
            reader.readAsDataURL(file);
        }
    }
})


function addToGallery(url){
    const imgElement = document.createElement('img');
    imgElement.src = url;
    const div = document.createElement('div');
    div.className = 'img-item';
    div.appendChild(imgElement);
    gallery.appendChild(div);
}

function uploadFile(file, metadata){
    const uniqueId = window.crypto.getRandomValues(new Uint32Array(1))[0];
    const filePath = `images/${uniqueId}.jpg`;
    const upload = storage.ref().child(filePath).put(file, metadata).then((snapshot)=>{
        snapshot.ref.getDownloadURL().then(getDownloadURL => {
            console.log(downloadURL);
          
            //add this url to firestore
            imagesRef.add({imageURL: downloadURL});
        })
    })
}