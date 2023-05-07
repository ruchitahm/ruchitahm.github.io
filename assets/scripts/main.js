var tablinks = document.getElementsByClassName("tablinks");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


var menu = document.getElementById("sidemenu");
function openmenu(){
    //opens the side panel
    menu.style.right="0";
    menu.classList.add('sidepanelopen');
}
function closemenu(){
      //closes the sidepanel
    menu.style.right="-200px";
    menu.classList.remove('sidepanelopen');
}
function sectn(){
    //closes the sidepanel
    menu.style.right="-200px";
}

window.addEventListener('scroll', function(){
    // adding sticky navbar
    var header = document.querySelector('.navbarheader');
    header.classList.toggle('sticky', window.scrollY>0);
})

// Contact form validation
const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const messageEl = document.querySelector('#message');
const form1 = document.querySelector('#contactform');

const checkName = () => {
    let valid = false;
    const min = 3,
          max = 25;
    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, 'Name cannot be blank.');
    } else if (!isBetween(name.length, min, max)) {
        showError(nameEl, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
}
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

const checkMessage = () => {

    let valid = false;
    const min = 5,
        max = 25;
    const message = messageEl.value.trim();

    if (!isRequired(message)) {
        showError(messageEl, 'Message cannot be blank.');
    } else if (!isBetween(message.length, min, max)) {
        showError(messageEl, `Message must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(messageEl);
        valid = true;
    }
    return valid;
}

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isRequired = value => value === '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbyqGH_aplWFeH-z_YjvVU42VmvYM8wdCqIhIEs9GzAEBIZT3p6x4WzQS0iYldh3A4zV/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg");

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
    // validate forms
    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isMessageValid = checkMessage();

    let isFormValid = isNameValid &&
        isEmailValid &&
        isMessageValid;
    // submit to the server if the form is valid
    if (isFormValid) {
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message send successfully!"
            setTimeout(function(){
                msg.innerHTML = ""
            }, 2000)
           
            e.preventDefault();
            form.reset();
            console.log('Success!', response)
        })
        
        .catch(error => console.error('Error!', error.message))

        const elements = document.querySelectorAll('.success');
    elements.forEach((element) => {
      element.classList.remove('success');

    });
// disableing the input fields
    document.querySelector('#name').disabled = true;
        document.querySelector('#email').disabled = true;
        document.querySelector('#message').disabled = true;
        // document.querySelector('textarea').disabled = true;
        setTimeout(function() {
            // document.querySelector('textarea').disabled = false;
            document.querySelector('#name').disabled = false;
            document.querySelector('#email').disabled = false;
            document.querySelector('#message').disabled = false;
        }, 5000);
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'message':
            checkMessage();
            break;
    }
}));
