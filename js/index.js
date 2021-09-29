
async function getBooks() {
    try {
        const res = await axios.get('https://api.marktube.tv/v1/book', {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        });
        return res.data;
    } catch (error) {
        console.log('getBooks error', error);
        return null;
    }
}

function render(books) {
    const listElement = document.querySelector('#list');
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const bookElement = document.createElement('div');
        bookElement.classList.value = 'col-md-4';
        bookElement.innerHTML = `
        <div class="card mb-4 shadow-sm">
            <div class="card-body">
                <p class="card-text">${book.title === '' ? '제목 없음' : book.title}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <a href="/book?id=${book.bookId}">
                            <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary"
                            >
                                View
                            </button>
                        </a>
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary btn-delete"
                            data-book-id="${book.bookId}"
                        >
                            Delete
                        </button>
                    </div>
                    <small class="text-muted">${new Date(
                        book.createdAt,
                    ).toLocaleString()}</small>
                </div>
            </div>
        </div>
        `;
        listElement.append(bookElement);
    }
    document.querySelectorAll('.btn-delete').forEach(element => {
        element.addEventListener('click', async event => {
            const bookId = event.target.dataset.bookId;
            try {
                await deleteBook(bookId);
                location.reload();
            } catch (error) {
                console.log(error);
            }
        });
    });
}

async function deleteBook(bookId) {
    if (!checkToken()) return;

    await axios.delete(`https://api.marktube.tv/v1/book/${bookId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return;
}

async function main() {
    // 버튼에 이벤트 연결
    bindLogoutButton();

    // 토큰 체크
    if (!checkToken()) return;

    // 토큰으로 서버에서 나의 정보 받아오기
    if (!(await checkUserByToken())) return;

    // 나의 책을 서버에서 받아오기
    const books = await getBooks();
    if (books === null) {
        return;
    }

    // 받아온 책을 그리기
    render(books);
}

/*
    DOMContentLoaded 이벤트는 초기 HTML 문서를 완전히 불러오고 분석했을 때 발생합니다. 
    스타일 시트, 이미지, 하위 프레임의 로딩은 기다리지 않습니다.
*/ 
document.addEventListener('DOMContentLoaded', main);