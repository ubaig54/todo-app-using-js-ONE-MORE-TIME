let loginStatus = JSON.parse(localStorage.getItem('loginStatus'));

if (loginStatus) {
    window.location = location.origin;
}

let users = [];
let usersInLocalStorage = JSON.parse(localStorage.getItem('users', users));

if (usersInLocalStorage && usersInLocalStorage.length > 0) {
    users = usersInLocalStorage;
}

const loginCard = document.querySelector('.loginCard');
const signupCard = document.querySelector('.signupCard');

const gotoSignup = document.querySelector('.gotoSignup');
const gotoLogin = document.querySelector('.gotoLogin');

gotoSignup.onclick = () => {
    loginCard.style.display = "none";
    signupCard.style.display = "block";
}

gotoLogin.onclick = () => {
    loginCard.style.display = "block";
    signupCard.style.display = "none";
}

const signupForm = document.querySelector('#signupForm');
const loginForm = document.querySelector('#loginForm');

signupForm.onsubmit = () => {
    let signupName = document.querySelector('#signupName');
    let signupEmail = document.querySelector('#signupEmail');
    let signupPw = document.querySelector('#signupPw');

    let formValidity = true;

    for (i = 0; i < users.length; i++) {
        if (signupEmail.value === users[i].email) {
            formValidity = false;
            alert('Email already registered!');
            break;
        }
    }
    if (signupPw.value.length < 4) {
        formValidity = false;
        alert('Password should have at aleast 4 digits.');
    }

    if (formValidity) {
        users.push({ name: signupName.value, email: signupEmail.value, pw: signupPw.value });
    }

    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem('loginStatus', true);
    localStorage.setItem('currentUser', JSON.stringify({ name: users[i].name, email: users[i].email }));
    window.location = location.origin;

    return false;
}

loginForm.onsubmit = () => {
    let loginEmail = document.querySelector('#loginEmail');
    let loginPw = document.querySelector('#loginPw');
    let loginFlag = false;

    if (users.length > 0) {
        for (i = 0; i < users.length; i++) {
            console.log(i)
            if (loginEmail.value === users[i].email && loginPw.value === users[i].pw) {
                loginFlag = true;
                localStorage.setItem('loginStatus', true);
                localStorage.setItem('currentUser', JSON.stringify({ name: users[i].name, email: users[i].email }));
                window.location = location.origin;
                break;
            }
        }
        if (!loginFlag) {
            alert('Invalid email or password');
        }
    } else {
        alert('Invalid email or password')
    }

    return false;
}