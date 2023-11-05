var pic_preview = document.getElementById('pic-preview');
var upload_here = document.getElementById("upload-here");
var title_insert = document.getElementById("title-insert");
var title_guessing = document.getElementById("title-guessing");
var title_result_box = document.getElementById("title-result-box");
var title_result = document.getElementById("title-result");

upload_here.addEventListener('click', ()=>{
    var input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.addEventListener("change", function(e) {
        var file = e.target.files[0];
        if (file){
            // prepare animation
            title_result_box.classList.add("scale-0")
            title_guessing.classList.remove("opacity-0")
            upload_here.classList.remove('opacity-0')
            upload_here.classList.add('opacity-30')
            pic_preview.classList.add('opacity-0')
            pic_preview.classList.remove('group-hover:opacity-20')
            title_insert.classList.remove("opacity-0")

            var reader = new FileReader();

            reader.onload = (e)=>{
                var b64 = e.target.result
                pic_preview.src = b64

                upload_here.classList.add('opacity-0')
                upload_here.classList.remove('opacity-30')
                pic_preview.classList.remove('opacity-0')
                pic_preview.classList.add('group-hover:opacity-20')
                title_insert.classList.add("opacity-0")

                setTimeout(()=>{
                    getResult(b64).then(pred=>{
                        title_result.innerText = pred
                        title_guessing.classList.add("opacity-0")
    
                        setTimeout(()=>{
                            title_result_box.classList.remove("scale-0")
                        },100)
                    })
                },500)
            }
            reader.readAsDataURL(file)
        }
    });
    input.click()
})

async function getResult(base64img){
    return fetch(`api/pokemon`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // mode: 'no-cors'
        body: JSON.stringify({"img": base64img})
    })
    .then(response => response.json())
    .then(data=> {
        return data.result
    })
    .catch(err=>{
        return "I Don't Know"
    })
}