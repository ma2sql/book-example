
async function save(event) {
    event.preventDefault();
    event.stopPropagation();

    event.target.classList.add('was-validated');

    const titleElement = document.querySelector('#title');
    const messageElement = document.querySelector('#message');
    const authorElement = document.querySelector('#author');
    const urlElement = document.querySelector('#url');

    const title = titleElement.value;
    const message = messageElement.value;
    const author = authorElement.value;
    const url = urlElement.value;

    if (title === '' || message == '' || author === '' || url === '') {
        return;
    }

    if (!checkToken()) return;
    
    try {
        await axios.post('https://api.marktube.tv/v1/book', {
            title,
            message,
            author,
            url
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        location.assign('/');
    } catch(error) {
        console.log('save error', error);
        alert('책 추가 실패');
    }
}

function bindSaveButton() {
    const form = document.querySelector('#form-add-book');
    form.addEventListener('submit', save);
}

async function main() {
    // 버튼에 이벤트 연결
    bindSaveButton();

    // 토큰 체크
    if (!checkToken()) return;

    // 토큰으로 서버에서 나의 정보 받아오기
    if (!(await checkUserByToken())) return;
}

document.addEventListener('DOMContentLoaded', main);