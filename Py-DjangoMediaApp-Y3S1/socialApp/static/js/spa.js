function retrievePost(){
    console.log("media retrieved")
    var contentHTML = "<h2>posts</h2>";
    content_region = document.getElementById("posts");
    content_region.innerHTML = contentHTML;
    
}

function retrieveProfileDetails(user){
    console.log("profile details retreived")
    var request = new XMLHttpRequest();
    var url = 'api/media/'+user;
    request.onreadystatechange = function(){
        if(this.readyState == 4 && (this.status >= 200 && this.status < 400)){
            var data = JSON.parse(this.responseText);
            console.log(data);
        }
        else if(this.status > 400 || (this.status > 0 && this.status < 200)){
            consolge.log('profile detail request failed'+this.status)
        }
    };
    request.open("GET",url,true);
    request.send()
}

function initialisePage(){
    console.log("page initialised");
    retrievePost();
    retrieveProfileDetails();
}