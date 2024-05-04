//<!--============ NavBar ============-->
// Scrolling Effect
// window.addEventListener("scroll", () => {
//   let navBar = document.querySelector(".navA");
//   navBar.classList.toggle("sticky", window.scrollY > 0);
// });

const primaryHeader = document.querySelector(".navA");
const scrollWatcher = document.createElement("div");

scrollWatcher.setAttribute("data-scroll-watcher", "");
primaryHeader.before(scrollWatcher);

const navObserver = new IntersectionObserver(
  (entries) => {
    primaryHeader.classList.toggle("sticky", !entries[0].isIntersecting);
  },
  { rootMargin: "50px 0px 0px 0px" }
);

navObserver.observe(scrollWatcher);
//<!--============ NavBar ============-->

//<!--============ Slider ============-->
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;

// // event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}

// //event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}

// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 8000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 8000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})
//<!--============ Slider ============-->

//<!--============ Scroll To Top ============-->
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
      scrollProgress.style.display = "grid";
    } else {
      scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  };
  
  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue;
//<!--============ Scroll To Top ============-->

//<!--============ Send Message ============-->
// checked Inputs:
  function checkedInputs(){
    const allInputs =document.querySelectorAll(".inputX");

    for(const lineInputs of allInputs ){
      if (lineInputs.value == ""){
          lineInputs.classList.add("errorX");
          lineInputs.parentElement.classList.add("errorX");
        }

      if(allInputs[1].value !== " "){
        checkedEmail();
      }  

      allInputs[1].addEventListener("keyup", () => {
        checkedEmail();
      })

      lineInputs.addEventListener("keyup", () => {
        if (lineInputs.value !== ""){
            lineInputs.classList.remove("errorX");
            lineInputs.parentElement.classList.remove("errorX");
        }
        else{
            lineInputs.classList.add("errorX");
            lineInputs.parentElement.classList.add("errorX");
        }
      })
    }
  }

// checked Email:
  function checkedEmail(){
    const email = document.getElementById("email");
    const emailReg= /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errTxtEmail = document.querySelector(".errTxt.email");

    if(!email.value.match(emailReg)){
      email.classList.add("errorX");
      email.parentElement.classList.add("errorX");

        if(email.value != "") {
          errTxtEmail.innerHTML = "Enter a valid email Address";
        }
        else{
          errTxtEmail.innerHTML = "Email Address can't be blank";
        }
    }
    else{
      email.classList.remove("errorX");
      email.parentElement.classList.remove("errorX");
    }
  }

//Script URL Google:
  const fullName = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const subject = document.getElementById("subject");
  const mess = document.getElementById("message");


  const scriptURL = 'https://script.google.com/macros/s/AKfycbzdhTjQjDTkM-E4rxp9gwmhXgbYsr1ssefd9HogCkWjGZt2a8YLonezcD000_ETHObH/exec'

  const form = document.forms['contactForm']
  
  form.addEventListener('submit', e => {
    e.preventDefault();
      checkedInputs();



      if(!fullName.classList.contains("errorX") && !email.classList.contains("errorX") && 
      !phone.classList.contains("errorX") && !subject.classList.contains("errorX") && 
      !mess.classList.contains("errorX")){
            console.log("Ok");
            sendEmail();
      }
  })

// Send Email:  
  function sendEmail(){
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    form.reset();
    openPopUp();
  }

//Open PopUp  
  let popJ = document.getElementById("popId");

    function openPopUp(){
      popJ.classList.add("open-popup");    
    }

    function closePopUp(){
      popJ.classList.remove("open-popup");
      document.documentElement.scrollTop = 0;
    }
//<!--============ Send Message ============-->





