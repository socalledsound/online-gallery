// Your web app's Firebase configuration
const firebaseConfig = {
    // put your firebase config here, available from your firebase console:
    //https://console.firebase.google.com/ 
    //go to you project then settings and scroll down
    };



    const drop = document.querySelector('#drop');


    window.addEventListener('drag', (e)=>{
        e.preventDefault();
    })

    drop.addEventListener('drop', (e)=>{
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        const fileSize = file.size/ 1024 / 1024;
        if(file){
            if(fileSize > 1){
                alert('image needs to be smaller than 1MB');
            }

            reader.readAsDataURL(file);
        } 

        reader.addEventListener('load', (e) =>{
            const fileToUpload = reader.result;
            const metadata = 
        })


        }
    })

