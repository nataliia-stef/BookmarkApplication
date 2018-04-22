//evenListener for window load
window.addEventListener('load', fetchBookmarks, false);

//eventListener for sumbit button
document.getElementById('myForm').addEventListener('submit', saveBookmark);


//save our bookmark
function saveBookmark(e) {  
    //get values from inputs
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;
    let siteDescription = document.getElementById('siteDescription').value;
    
    if(!validateInputs(siteName,siteUrl)){
        return false;
    }
    let bookmark = {
        name: siteName,
        url: siteUrl,
        description: siteDescription
    }

    if(localStorage.getItem('bookmarks') === null){
        //init array
       let bookmarks = [];
        bookmarks.push(bookmark);
        
        //set to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else {
        //get bookmarks from localstorage
       let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);

        //re-set back to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    //re-fetch bookmarks
    fetchBookmarks();
    resetForm();

    //prevents form from submittinf
    e.preventDefault();
}

//delete bookmark
function deleteBookmark(url){
    //get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //loop through bookmarks 
    for(let i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //remove from array 
            //starting from position i remove one element
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks();
} 

//Fetch bookmarks
function fetchBookmarks(){
    //get bookmarks from localstorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id 
    let bookmarksResults = document.getElementById('bookmarksResults');

    //Output the results
    bookmarksResults.innerHTML = '';

    for(let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        let description = bookmarks[i].description;

        bookmarksResults.innerHTML +=   '<div class="card card-body bg-light bookmark-div">'+ 
                                            '<h4>' + name + 
                                                '<div class="buttons"><a class="btn btn-primary btn-sm btn-custom btn-custom--blue" target="_blank" href="' + url + '">Open</a>' + 
                                                    '<a onclick="deleteBookmark(\'' + url + '\')"class="btn btn-danger btn-sm btn-custom btn-custom--red" href="#"' + url + '">Delete</a>' +
                                                '</div>' +
                                            '</h4>' +
                                            '<p class="lead">' + description + '</p>'+
                                        '</div>';
    }
}


function validateInputs(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert("You forgot to fill out the form");
        //stop the process
        return false;
    }

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(let i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url === siteUrl){
            alert('You have already save this link!');
            return false;
        }
    }

    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert("Use a valid url!");
        return false;
    }

    return true;
}
function resetForm() {
    document.getElementById('myForm').reset();
}