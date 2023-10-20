
const options = {
method: 'GET',
headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTRkN2Q3MzQ4MTRkNDBhMjdiOGVmNDFjNDU0YTczMiIsInN1YiI6IjY1MmYzZDU3YTgwMjM2MDExYWM3ZDc0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qSh5DqBb-mWUiS0C1A5XbEjpMUAu4yLxDcfH15jHhr8'
}
};

function msgId(id){

        let div_id = document.getElementById(id);

        div_id.addEventListener('click', function(event){
                alert('영화 id : '+id);
        });

}

function searchMovie(){
        
        //조회 전 기존 조회된 카드 영역 지우기
        const card = document.getElementById("card");
        card.removeEventListener("click",msgId);
        card.replaceChildren();

        //검색어 가져오기
        let txt = document.querySelector('#search').value;


        //영화 자료 API 가져오기
        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
                
                let movie_list = response['results'];
                //console.log(response['results']);

                Object.keys(movie_list).forEach(function(key){
                        
                        let movie_list_det = movie_list[key];

                        let arr_title = [];
                        arr_title.push(movie_list_det['title']);

                        //find 함수를 활용한 문자열 일치
                        let chk_title = arr_title.filter(str => str===txt );

                        //title대문자로 변환
                        let title = movie_list_det['title'].toUpperCase();
                        
                        // find나 indexOf로 문자열로 검색 조회
                        if (title.indexOf(txt.toUpperCase()) != -1 || chk_title.length > 0) {
                                createDiv(movie_list_det);
                        } 
                        
                });
                
        })
        .catch(err => console.error(err));

}

function enterkey() {
	if (window.event.keyCode == 13) {
    	// 엔터키가 눌렸을 때
        searchMovie();
    }
}

function createDiv(movie_list_det){

        let image = 'https://image.tmdb.org/t/p/w500/'+movie_list_det['poster_path'];
        let title = movie_list_det['title'];
        let content = movie_list_det['overview'];
        let vote_average = movie_list_det['vote_average'];
        let id = movie_list_det['id'];
        
        //카드 리스트 DOM 객체로 만들기
        let cerateDiv = document.createElement('div');
        let createDiv2 = document.createElement('div');

        let createDiv3_1 = document.createElement('div');
        let createH5 = document.createElement('h5');
        let createP = document.createElement('p');

        let createDiv3_2 = document.createElement('div');
        let createSmall = document.createElement('small');

        let createImg = document.createElement('img');
        

        // 객체 안에 ClassName 넣기
        cerateDiv.className = 'col';
        createDiv2.className = 'card h-100';

        createDiv3_1.className = 'card-body';
        createH5.className = 'card-title';
        createP.className = 'card-text';

        createDiv3_2.className = 'card-footer';
        createSmall.className = 'text-body-secondary';

        createImg.className = 'card-img-top';


        // 객체 하위 관계 지정하기
        cerateDiv.appendChild(createDiv2);
        
        createDiv2.appendChild(createImg);
        createImg.after(createDiv3_1);
        createDiv3_1.after(createDiv3_2);
        
        createDiv3_1.appendChild(createH5);
        createDiv3_1.appendChild(createP);

        createDiv3_2.appendChild(createSmall);


        // 속성값 추가하기
        cerateDiv.setAttribute('id',id);
        createImg.setAttribute('src',image);
        createH5.textContent = title;
        createP.textContent = content;
        createSmall.textContent = 'Rating : '+vote_average;


        document.getElementById("card").append(cerateDiv);

        /*cerateDiv.addEventListener('click', function(event){
                alert('영화 id : '+id);
        });*/

        msgId(id);
}

window.onload = function(){
        // 페이지 열릴 때 검색함수 실행
        searchMovie();
}
