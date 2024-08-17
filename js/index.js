// ミートボールメニュー 
const navBtn = document.querySelector('.sp-nav-btn')

navBtn.addEventListener("click", function(){
  navBtn.classList.toggle("is-active")
})

//下からフェードイン
$(function(){
	$(window).scroll(function (){
		$('.fadeUp').each(function(){
			var elemPos = $(this).offset().top-100;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll > elemPos - windowHeight){
				$(this).addClass('scrollin');
			}
		});
	});
});


//contact スクロール
$('a[href*="#"]').click(function () {//全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
	var elmHash = $(this).attr('href'); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
	var pos = $(elmHash).offset().top-130;//idの上部の距離からHeaderの高さを引いた値を取得
	$('body,html').animate({scrollTop: pos}, 50); //取得した位置にスクロール。700の数値が大きくなるほどゆっくりスクロール
	return false;
});

//ミートボールメニュー時 contact スクロール
  $(".sp-nav-btn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".sp-nav-btn").removeClass('is-active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
})



// 上に遷移させるボタン
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {

	var scroll = $(window).scrollTop(); //スクロール値を取得
	if (scroll >= 200){//200pxスクロールしたら
		$('#page-top').removeClass('DownMove');		// DownMoveというクラス名を除去して
		$('#page-top').addClass('UpMove');			// UpMoveというクラス名を追加して出現
	}else{//それ以外は
		if($('#page-top').hasClass('UpMove')){//UpMoveというクラス名が既に付与されていたら
			$('#page-top').removeClass('UpMove');	//  UpMoveというクラス名を除去し
			$('#page-top').addClass('DownMove');	// DownMoveというクラス名を追加して非表示
		}
	}
	
	var wH = window.innerHeight; //画面の高さを取得
	var footerPos =  $('#footer').offset().top; //footerの位置を取得
	if(scroll+wH >= (footerPos+10)) {
		var pos = (scroll+wH) - footerPos+25 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
		$('#page-top').css('bottom',pos);	//#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
	}else{//それ以外は
		if($('#page-top').hasClass('UpMove')){//UpMoveというクラス名がついていたら
			$('#page-top').css('bottom','15px');// 下から10pxの位置にページリンクを指定
		}
	}
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top').click(function () {
	$('body,html').animate({
		scrollTop: 0//ページトップまでスクロール
	}, 100);//ページトップスクロールの速さ。数字が大きいほど遅くなる
	return false;//リンク自体の無効化
	});


// アコーディオン
$(function () {
	$(".js-title").on("click", function() {
	  $(this).next().slideToggle(200);
	  $(this).toggleClass("open",200);
	});
  });



// メイン文字

var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
    cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
    nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);

