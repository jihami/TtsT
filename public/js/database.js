//데이터베이스 참조 가져오기
var database = firebase.database();

//데이터베이스 메세지 쓰기
firebase.database().ref('gi').set('hi');
firebase.database().ref('test/').set({"name": "이름이야", "intro":"인삿말이야"});