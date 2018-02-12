//evenListener for window load
window.addEventListener('load', fetchBookmarks, false);

//eventListener for sumbit button
document.getElementById('myForm').addEventListener('submit', saveBookmark);


//save our bookmark
function saveBookmark(e) {  
    //get values from inputs
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    var siteDescription = document.getElementById('siteDescription').value;
    
    if(!validateInputs(siteName,siteUrl)){
        return false;
    }
    var bookmark = {
        name: siteName,
        url: siteUrl,
        description: siteDescription
    }

    if(localStorage.getItem('bookmarks') === null){
        //init array
        var bookmarks = [];
        bookmarks.push(bookmark);
        
        //set to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else {
        //get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
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
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //loop through bookmarks 
    for(var i = 0; i < bookmarks.length; i++){
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
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id 
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Output the results
    bookmarksResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        var description = bookmarks[i].description;

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

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url === siteUrl){
            alert('You have already save this link!');
            return false;
        }
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert("Use a valid url!");
        return false;
    }

    return true;
}
function resetForm() {
    document.getElementById('myForm').reset();
}