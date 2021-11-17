// import firebase from "package:firebase_core/firebase_core.dart"
//import firebase from "firebase/compat";

var firebaseConfig = {
    apiKey: "AIzaSyA6LFw48XiIdVdfZxP34Xmr0QFifUlO4Ik",
    authDomain: "ttst-1f284.firebaseapp.com",
    databaseURL: "https://ttst-1f284-default-rtdb.firebaseio.com",
    projectId: "ttst-1f284",
    storageBucket: "ttst-1f284.appspot.com",
    messagingSenderId: "907858494375",
    appId: "1:907858494375:web:e8d519daa827cd6a076c82",
    measurementId: "G-BZ7Q1188LB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
;
// 구글 인증 기능 추가
// var provider = new firebase.auth.GoogleAuthProvider();
//
// // 인증하기
// firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//
//     console.log(user)		// 인증 후 어떤 데이터를 받아오는지 확인해보기 위함.
// // ...
// }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
// });