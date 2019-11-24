// Get the modal
var modalloc = document.getElementById("myModal0");
var modalimg = document.getElementById("myModal1");
var modalvid = document.getElementById("myModal2");
var modaldel = document.getElementById("myModal3");
var modal = document.querySelectorAll('.modal');

// Get the button that opens the modal
var btnloc = document.getElementsByClassName("myBtn0");
var btnimg = document.getElementsByClassName("myBtn1");
var btnvid = document.getElementsByClassName("myBtn2");
var btndel = document.getElementsByClassName("myBtn3");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");

// When the user clicks the button, open the modal 
for (let i = 0; i < btndel.length; i++) {
    btndel[i].addEventListener('click', () => {
        modaldel.style.display = 'block';
    });
}

for (let i = 0; i < btnvid.length; i++) {
    btnvid[i].addEventListener('click', () => {
        modalvid.style.display = 'block';
    });
}

for (let i = 0; i < btnimg.length; i++) {
    btnimg[i].addEventListener('click', () => {
        modalimg.style.display = 'block';
    });
}

for (let i = 0; i < btnloc.length; i++) {
    btnloc[i].addEventListener('click', () => {
        modalloc.style.display = 'block';
    });
}
// When the user clicks on <span> (x), close the modal


let ii;
for (ii = 0; ii < span.length; ii++) {
    span[ii].onclick = () => {
        for (let iii = 0; iii < modal.length; iii++) {
            modal[iii].style.display = "none";
        }
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modaldel || event.target == modalvid) {
        modaldel.style.display = "none";
        modalvid.style.display = "none";
    }
}