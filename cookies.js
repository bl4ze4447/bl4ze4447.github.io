const cookieFA = document.querySelector('.fa-solid.fa-cookie');
const cookieScore = document.querySelector('.score');
const cookieContainer = document.querySelector('.cookieContainer')
function cookieHandler(){
    cookieContainer.style.backgroundColor = '#6F4E37';
    cookieFA.style.color = '#E6CEA0';
    cookieScore.style.color = '#9D7E67'; 
    setTimeout(() => {
        cookieContainer.style.backgroundColor = '#F5DEB3';
        cookieFA.style.color = '#9D7E67';
        cookieScore.style.color = '#a3833d';
        cookieFA.style.fontSize = (Number.parseInt(cookieFA.style.fontSize.toString().substring(0, 2)) + 5).toString() + 'vh';
    }, 400);
    increaseCookieScore(cookieScore);
}

let score;
let multiplier = 1;
function initializeData(){
    if(localStorage.getItem("score") == null){
        localStorage.setItem("score", "0");
    }
    score = Number.parseInt(localStorage.getItem("score"));
    document.querySelector('.score').textContent = score.toString();
}
initializeData();

async function increaseCookieScore(element){
    score = Number.parseInt(localStorage.getItem("score"));
    score += 10 * multiplier;
    localStorage.setItem("score", score.toString());
    element.textContent = score;
    if(score >= 1000000000){
        element.textContent = score.toString().substring(0, 1) + " Billion" + '\n&& ' + score.toString().substring(1, 2) + " M";
    }
}

const shopTextMain = document.querySelector('.shopTextMain');
const shopContainer = document.querySelector('.shopContainer');
const shopTriangle = document.querySelector('.triangle');
const shopGrid = document.querySelector('.shop-grid');
let toggle = false;
function shopHandler(){
    if(toggle == false){
        shopGrid.style.display = 'flex';
        shopGrid.style.opacity = 1;
        shopTriangle.style.transform = 'rotateX(180deg) translateY(-1.75vh)';
        shopTextMain.style.opacity = 0;
        shopTextMain.style.display = 'none';
        shopContainer.style.height = '20vh';
        toggle = true;
    }
    else if(toggle == true){
        shopGrid.style.display = 'none';
        shopGrid.style.opacity = 0;
        shopTriangle.style.transform = 'rotateX(0) translateY(0)';
        shopTextMain.style.opacity = 1;
        shopTextMain.style.display = 'flex';
        shopContainer.style.height = '10vh';
        toggle = false;
    }
}