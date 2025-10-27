const btn_start = document.getElementById('btn-start');

btn_start.addEventListener('click', () => {
    // loggedInUserId
    if (localStorage.getItem('loggedInUserId')) {
        window.location.href = 'htmls/logo.html';
    }
    else {
        window.location.href = 'htmls/registr.html';
    }
});