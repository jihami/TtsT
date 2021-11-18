document.addEventListener('DOMContentLoaded', click, false);
var vn,vr;
function click(){
    //별점선택 이벤트 리스너
    document.querySelector('.rating').addEventListener('click',function(e){
        let elem = e.target;
        if(elem.classList.contains('rate_radio')){
            rating.setRate(parseInt(elem.value));
        }
    })

    //리뷰 작성 글자수 초과 체크 이벤트 리스너
    document.querySelector('.review_textarea').addEventListener('keydown',function(){
        //리뷰 400자 초과 안되게 자동 자름
        let review = document.querySelector('.review_textarea');
        let lengthCheckEx = /^.{400,}$/;
        if(lengthCheckEx.test(review.value)){
            //400자 초과 컷
            review.value = review.value.substr(0,400);
        }
    });
    //닉네임 작성 글자수 초과 체크 이벤트 리스너
    document.querySelector('.nickname_textarea').addEventListener('keydown',function(){
        //닉네임 10자 초과 안되게 자동 자름
        let review = document.querySelector('.nickname_textarea');
        let lengthCheckEx = /^.{10,}$/;
        if(lengthCheckEx.test(nickname.value)){
            //400자 초과 컷
            nickname.value = nickname.value.substr(0,10);
        }
    });

    //저장 전송전 필드 체크 이벤트 리스너
    document.querySelector('#save').addEventListener('click', function(e){
        let s = rating.rate
        //별점 선택 안했으면 메시지 표시
        if(rating.rate == 0){
            rating.showMessage('rate');
            return false;
        }
        //닉네임 3자 미만이면 메시지 표시
        if(document.querySelector(".nickname_textarea").value.length < 2){
            rating.showMessage("nickname");
            return false;
        }
        //리뷰 5자 미만이면 메시지 표시
        if(document.querySelector('.review_textarea').value.length < 5){
            rating.showMessage('review');
            return false;
        }
        //폼 서밋
        let n = document.querySelector('.nickname_textarea').value
        let r = document.querySelector('.review_textarea').value
        const db = firebase.firestore();
        db.collection("review").add({name : n, review : r, star : s})
        alert("저장완료!");
        rating.setRate(0);
        document.querySelector('.nickname_textarea').value = "";
        document.querySelector('.review_textarea').value = "";
        vn = n;
        vr = r;
        // console.log(vn,vr)
    });
}
//별점 마킹 모듈 프로토타입으로 생성
function Rating(){};
Rating.prototype.rate = 0;
Rating.prototype.setRate = function(newrate){
    //별점 마킹 - 클릭한 별 이하 모든 별 체크 처리
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

let rating = new Rating();//별점 인스턴스 생성