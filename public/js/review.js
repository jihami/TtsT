document.addEventListener('DOMContentLoaded', click, false);
function click(){
    //별점선택
    document.querySelector('.rating').addEventListener('click',function(e){
        let elem = e.target;
        if(elem.classList.contains('rate_radio')){
            rating.setRate(parseInt(elem.value));
        }
    });
    //리뷰 글자수 초과 체크
    document.querySelector('.review_textarea').addEventListener('keydown',function(){
        //리뷰 400자 초과 안되게 자동 자름
        let review = document.querySelector('.review_textarea');
        let lengthCheckEx = /^.{400,}$/;
        if(lengthCheckEx.test(review.value)){
            //400자 초과 컷
            review.value = review.value.substr(0,400);
        }
    });
    //닉네임 글자수 초과 체크
    document.querySelector('.nickname_textarea').addEventListener('keydown',function(){
        //닉네임 10자 초과 안되게 자동 자름
        let review = document.querySelector('.nickname_textarea');
        let lengthCheckEx = /^.{10,}$/;
        if(lengthCheckEx.test(nickname.value)){
            //400자 초과 컷
            nickname.value = nickname.value.substr(0,10);
        }
    });
    //저장전 체크
    document.querySelector('#save').addEventListener('click', function(e){
        let s = rating.rate
        //별점 미선택시 경고 메시지
        if(rating.rate == 0){
            rating.showMessage('rate');
            return false;
        }
        //닉네임 3자 이하면 경고 메시지
        if(document.querySelector(".nickname_textarea").value.length < 2){
            rating.showMessage("nickname");
            return false;
        }
        //리뷰 4자 이하면 메시지 표시
        if(document.querySelector('.review_textarea').value.length < 5){
            rating.showMessage('review');
            return false;
        }
        //데이터 전달
        let nickName = document.querySelector('.nickname_textarea').value
        let review = document.querySelector('.review_textarea').value
        const db = firebase.firestore();
        var re = 0;
        db.collection("review").get().then((result)=>{
            result.forEach((doc) => {
                if (nickName==doc.data().name){
                    re += 1;
                }else if(nickName!=doc.data().name){
                    re += 0;
                }// if
            }); //forEach
            if(re==0){
                success();
            }else {
                overlap();
            }
        }); //db
        function overlap() {
            alert("중복입니다. 다시 입력해주세요");
            document.querySelector('.nickname_textarea').value = "";
            document.querySelector('.review_textarea').value = review;
        }
        async function success() { //저장완료시 결과페이지로 넘어가도록
            await db.collection("review").add({name: nickName, review: review, star: s}); // 비동기여서 await 로써주면 됌!!
            alert("저장완료!");
            rating.setRate(0);
            document.querySelector('.nickname_textarea').value = "";
            document.querySelector('.review_textarea').value = "";
            location.href = "../reviewList.html";
        }
    });
}
//별점 마킹
function Rating(){};
Rating.prototype.rate = 0;
Rating.prototype.setRate = function(newrate){
    //별점 표시
    this.rate = newrate;
    document.querySelector('.ratefill').style.width = parseInt(newrate * 60) + 'px';
    let items = document.querySelectorAll('.rate_radio');
    items.forEach(function(item, idx){
        if(idx < newrate){
            item.checked = true;
        }else{
            item.checked = false;
        }
    });
}
Rating.prototype.showMessage = function(type){//경고메시지 표시
    switch(type){
        case 'rate':
            //안내메시지 표시
            document.querySelector('.review_rating .warning_msg').style.display = 'block';
            //지정된 시간 후 안내 메시지 감춤
            setTimeout(function(){
                document.querySelector('.review_rating .warning_msg').style.display = 'none';
            },1000);
            break;
        case 'nickname':
            //안내메시지 표시
            document.querySelector('.nickname_contents .warning_nickname').style.display = 'block';
            //지정된 시간 후 안내 메시지 감춤
            setTimeout(function(){
                document.querySelector('.nickname_contents .warning_nickname').style.display = 'none';
            },1000);
            break;
        case 'review':
            //안내메시지 표시
            document.querySelector('.review_contents .warning_msg').style.display = 'block';
            //지정된 시간 후 안내 메시지 감춤
            setTimeout(function(){
                document.querySelector('.review_contents .warning_msg').style.display = 'none';
            },1000);
            break;
    }
}
let rating = new Rating();//별점 인스턴스
