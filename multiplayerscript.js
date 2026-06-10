    const WORDS=[
    {w:"fire",cat:"emotion"},{w:"rain",cat:"weather"},{w:"heart",cat:"emotion"},
    {w:"night",cat:"time"},{w:"love",cat:"emotion"},{w:"road",cat:"journey"},
    {w:"light",cat:"atmosphere"},{w:"sky",cat:"nature"},{w:"dream",cat:"abstract"},
    {w:"gold",cat:"material"},{w:"soul",cat:"emotion"},{w:"river",cat:"nature"},
    {w:"city",cat:"place"},{w:"sun",cat:"nature"},{w:"blood",cat:"body"},
    {w:"stars",cat:"nature"},{w:"wind",cat:"nature"},{w:"home",cat:"place"},
    {w:"broken",cat:"emotion"},{w:"dark",cat:"atmosphere"},{w:"memory",cat:"abstract"},
    {w:"dance",cat:"action"},{w:"smile",cat:"expression"},{w:"midnight",cat:"time"},
    {w:"forever",cat:"time"},{w:"alive",cat:"state"},{w:"tears",cat:"emotion"},
    {w:"wild",cat:"quality"},{w:"stone",cat:"material"},{w:"floor",cat:"place"},
    {w:"angel",cat:"abstract"},{w:"baby",cat:"person"},{w:"back",cat:"direction"},
    {w:"beautiful",cat:"quality"},{w:"believe",cat:"abstract"},{w:"black",cat:"color"},
    {w:"blue",cat:"color"},{w:"boy",cat:"person"},{w:"burn",cat:"action"},
    {w:"california",cat:"place"},{w:"calm",cat:"emotion"},{w:"chase",cat:"action"},
    {w:"cold",cat:"weather"},{w:"come",cat:"action"},{w:"crash",cat:"action"},
    {w:"cry",cat:"action"},{w:"dead",cat:"state"},{w:"demons",cat:"abstract"},
    {w:"desire",cat:"emotion"},{w:"diamond",cat:"material"},{w:"die",cat:"action"},
    {w:"dizzy",cat:"state"},{w:"empty",cat:"state"},{w:"escape",cat:"action"},
    {w:"eyes",cat:"body"},{w:"fade",cat:"action"},{w:"fall",cat:"action"},
    {w:"fame",cat:"abstract"},{w:"fast",cat:"quality"},{w:"feel",cat:"action"},
    {w:"fight",cat:"action"},{w:"fly",cat:"action"},{w:"free",cat:"state"},
    {w:"frozen",cat:"state"},{w:"ghost",cat:"abstract"},{w:"girl",cat:"person"},
    {w:"glory",cat:"abstract"},{w:"gone",cat:"state"},{w:"goodbye",cat:"expression"},
    {w:"happy",cat:"emotion"},{w:"hate",cat:"emotion"},{w:"heaven",cat:"place"},
    {w:"hero",cat:"person"},{w:"high",cat:"state"},{w:"hold",cat:"action"},
    {w:"holy",cat:"quality"},{w:"hope",cat:"emotion"},{w:"hot",cat:"weather"},
    {w:"hurt",cat:"emotion"},{w:"ice",cat:"nature"},{w:"jump",cat:"action"},
    {w:"king",cat:"person"},{w:"kiss",cat:"action"},{w:"last",cat:"time"},
    {w:"life",cat:"abstract"},{w:"lonely",cat:"emotion"},{w:"lost",cat:"state"},
    {w:"loud",cat:"quality"},{w:"magic",cat:"abstract"},{w:"man",cat:"person"},
    {w:"mind",cat:"abstract"},{w:"money",cat:"material"},{w:"moon",cat:"nature"},
    {w:"morning",cat:"time"},{w:"mountain",cat:"nature"},{w:"move",cat:"action"},
    {w:"name",cat:"abstract"},{w:"new",cat:"quality"},{w:"ocean",cat:"nature"},
    {w:"only",cat:"quality"},{w:"pain",cat:"emotion"},{w:"paradise",cat:"place"},
    {w:"party",cat:"action"},{w:"power",cat:"abstract"},{w:"pretty",cat:"quality"},
    {w:"queen",cat:"person"},{w:"quiet",cat:"quality"},{w:"red",cat:"color"},
    {w:"ride",cat:"action"},{w:"rise",cat:"action"},{w:"rock",cat:"material"},
    {w:"run",cat:"action"},{w:"sad",cat:"emotion"},{w:"save",cat:"action"},
    {w:"scream",cat:"action"},{w:"shadow",cat:"atmosphere"},{w:"shine",cat:"action"},
    {w:"silver",cat:"material"},{w:"sing",cat:"action"},{w:"sleep",cat:"action"},
    {w:"slow",cat:"quality"},{w:"smoke",cat:"atmosphere"},{w:"snow",cat:"weather"},
    {w:"somebody",cat:"person"},{w:"song",cat:"abstract"},{w:"sorry",cat:"expression"},
    {w:"space",cat:"nature"},{w:"storm",cat:"weather"},{w:"sugar",cat:"material"},
    {w:"summer",cat:"time"},{w:"sweet",cat:"quality"},{w:"thunder",cat:"weather"},
    {w:"time",cat:"abstract"},{w:"tonight",cat:"time"},{w:"touch",cat:"action"},
    {w:"truth",cat:"abstract"},{w:"under",cat:"direction"},{w:"universe",cat:"nature"},
    {w:"victim",cat:"person"},{w:"voice",cat:"body"},{w:"war",cat:"abstract"},
    {w:"water",cat:"nature"},{w:"white",cat:"color"},{w:"wings",cat:"nature"},
    {w:"winter",cat:"time"},{w:"wish",cat:"abstract"},{w:"woman",cat:"person"},
    {w:"wonder",cat:"emotion"},{w:"world",cat:"abstract"},{w:"young",cat:"quality"}
    ];

    let activePlayer=null, timerInterval=null, buzzLocked=false, currentWord=null;
    let scores=[0,0], winTarget=5, names=["Blue","Pink"];

    const $=id=>document.getElementById(id);
    const nameSetup=$("name-setup");
    const nameP1=$("name-p1"), nameP2=$("name-p2"), winTargetInp=$("win-target");
    const startGameBtn=$("start-game-btn"), mainGame=$("main-game");
    const wordDisplay=$("word-display"), catTag=$("cat-tag"), winProgress=$("win-progress");
    const buzzP1=$("buzz-p1"), buzzP2=$("buzz-p2"), cardP1=$("card-p1"), cardP2=$("card-p2");
    const labelP1=$("label-p1"), labelP2=$("label-p2");
    const scoreP1=$("score-p1"), scoreP2=$("score-p2");
    const pipsP1=$("pips-p1"), pipsP2=$("pips-p2");
    const inputZone=$("input-zone"), activeBanner=$("active-banner"), songInput=$("song-input");
    const timerBar=$("timer-bar"), submitBtn=$("submit-btn");
    const resultZone=$("result-zone"), resultTitle=$("result-title"), resultDetail=$("result-detail");
    const statusMsg=$("status-msg"), nextBtn=$("next-btn");
    const winScreen=$("win-screen"), winCrown=$("win-crown"), winName=$("win-name"), winSub=$("win-sub");
    const playAgainBtn=$("play-again-btn");

    startGameBtn.addEventListener("click",()=>{
    names[0]=nameP1.value.trim()||"Blue";
    names[1]=nameP2.value.trim()||"Pink";
    winTarget=Math.max(1,parseInt(winTargetInp.value)||5);
    labelP1.textContent=names[0];
    labelP2.textContent=names[1];
    nameSetup.style.display="none";
    mainGame.style.display="block";
    scores=[0,0];
    updateScores();
    loadNewWord();
    });

    function updateScores(){
    scoreP1.textContent=scores[0];
    scoreP2.textContent=scores[1];
    renderPips(pipsP1,scores[0],winTarget,"p1f");
    renderPips(pipsP2,scores[1],winTarget,"p2f");
    winProgress.textContent=`first to ${winTarget} wins`;
    }

    function renderPips(container,score,total,cls){
    container.innerHTML="";
    for(let i=0;i<total;i++){
        const d=document.createElement("div");
        d.className="pip "+(i<score?cls:"empty");
        container.appendChild(d);
    }
    }

    function loadNewWord(){
    wordDisplay.classList.add("flash");
    setTimeout(()=>{
        currentWord=WORDS[Math.floor(Math.random()*WORDS.length)];
        wordDisplay.textContent=currentWord.w.toUpperCase();
        catTag.textContent=currentWord.cat;
        wordDisplay.classList.remove("flash");
    },200);
    resetRound();
    }

    let buzzTimerInterval=null;
    let buzzTimeLeft=30;
    //buzztimer
    function startBuzzTimer(){
    clearInterval(buzzTimerInterval);
    buzzTimeLeft=30;
    catTag.style.outline="none";
    buzzTimerInterval=setInterval(()=>{
        buzzTimeLeft--;
        catTag.textContent=`${currentWord.cat} — ${buzzTimeLeft}s`;
        if(buzzTimeLeft<=0){
        clearInterval(buzzTimerInterval);
        if(!buzzLocked){
            buzzP1.disabled=true;
            buzzP2.disabled=true;
            statusMsg.textContent="time's up — no one buzzed!";
            nextBtn.classList.add("vis");
        }
        }
    },1000);
    }

    function loadNewWord(){
    wordDisplay.classList.add("flash");
    setTimeout(()=>{
        currentWord=WORDS[Math.floor(Math.random()*WORDS.length)];
        wordDisplay.textContent=currentWord.w.toUpperCase();
        catTag.textContent=currentWord.cat;
        wordDisplay.classList.remove("flash");
    },200);
    resetRound();
    startBuzzTimer();
    }


    function resetRound(){
    clearInterval(buzzTimerInterval);
    clearTimer();
    activePlayer=null;
    buzzLocked=false;
    inputZone.classList.remove("vis");
    resultZone.classList.remove("vis","suc","fail");
    nextBtn.classList.remove("vis");
    songInput.value="";
    songInput.disabled=false;
    submitBtn.disabled=true;
    timerBar.style.width="100%";
    statusMsg.textContent="buzz in to answer";
    buzzP1.disabled=false;
    buzzP2.disabled=false;
    cardP1.className="pcard";
    cardP2.className="pcard";
    }

    function buzz(p){
    clearInterval(buzzTimerInterval);
    catTag.textContent=currentWord.cat;
    if(buzzLocked)return;
    buzzLocked=true;
    activePlayer=p;
    buzzP1.disabled=true;
    buzzP2.disabled=true;
    if(p===1){
        cardP1.className="pcard p1a";
        activeBanner.textContent=names[0]+" — type a song title";
        activeBanner.className="p1";
        timerBar.className="";
        songInput.className="p1f";
    }else{
        cardP2.className="pcard p2a";
        activeBanner.textContent=names[1]+" — type a song title";
        activeBanner.className="p2";
        timerBar.className="p2c";
        songInput.className="p2f";
    }
    inputZone.classList.add("vis");
    statusMsg.textContent="";
    songInput.focus();
    startTimer();
    }
    //5 seconds to type
    function startTimer(){
    timerBar.style.width="100%";
    clearInterval(timerInterval);
    const start=Date.now();
    timerInterval=setInterval(()=>{
        const r=Math.max(0,5-(Date.now()-start)/1000);
        timerBar.style.width=(r/5*100)+"%";
        if(r<=0){clearInterval(timerInterval);timeUp();}
    },50);
    }
    //handles behavior of the typingtimer
    function resetTimer(){clearInterval(timerInterval);startTimer();}
    function clearTimer(){clearInterval(timerInterval);timerInterval=null;}
    //runs when you run out of time
    function timeUp(){
    songInput.disabled=true;
    submitBtn.disabled=true;
    statusMsg.textContent="time's up!";
    showResult(false,"Time ran out","No points awarded");
    }
    //timer reset
    songInput.addEventListener("input",()=>{
    if(!activePlayer)return;
    resetTimer();
    submitBtn.disabled=songInput.value.trim().length<2;
    });

    submitBtn.addEventListener("click",()=>submitAnswer());
    songInput.addEventListener("keydown",e=>{if(e.key==="Enter"&&!submitBtn.disabled)submitAnswer();});

    async function submitAnswer(){
    clearTimer();
    songInput.disabled=true;
    submitBtn.disabled=true;

    const songGuess=songInput.value.trim();
    if(!songGuess||songGuess.length<2){showResult(false,"Nothing entered","Type a song title!");return;}

    statusMsg.textContent="checking with Genius...";

    try{
        const resp = await fetch(`/api/search?q=${encodeURIComponent(guess)}`);
        if(!resp.ok){showResult(false,"API error",`Genius returned ${resp.status}`);return;}
        const data=await resp.json();
        const hits=data.response.hits;
        if(hits&&hits.length>0&&hits[0].type==="song"){
        const top=hits[0].result;
        const normalize=s=>s.toLowerCase().replace(/[^a-z0-9\s]/g,"").trim();
    const actualNorm=normalize(top.title);
    const guessNorm=normalize(songGuess);
    const wordNorm=normalize(currentWord.w);

    // Check if enough words from the guess appear in the title
    const guessWords=guessNorm.split(/\s+/).filter(w=>w.length>1);
    const matchCount=guessWords.filter(w=>actualNorm.includes(w)).length;
    const matchRatio=matchCount/guessWords.length;

    if(matchRatio<0.95){
    showResult(false,"No match",`Genius found "${top.title}" — not quite!`);
    return;
    }
    if(!actualNorm.replace(/\s/g,"").includes(wordNorm.replace(/\s/g,""))){
    showResult(false,"Word not in title",`"${top.title}" doesn't contain "${currentWord.w}"`);
    return;
    }
    if (normalize(songGuess) === normalize(currentWord.w)) {
        showResult(false, "Simple Guess", `The song title cannot simply be "${currentWord.w}" itself.`);
        return;
    }

    scores[activePlayer-1]++;
    updateScores();
    showResult(true,top.title,`by ${top.primary_artist.name} — point to ${names[activePlayer-1]}!`);
    if(scores[activePlayer-1]>=winTarget){setTimeout(()=>showWinScreen(activePlayer),1200);}
    }
    else{
    showResult(false,"Not found","Genius doesn't recognise that song");
    }
    }
    catch(err){
    showResult(false,"Fetch error","Could not reach Genius API — is the server running?");
    }
    }

    function showResult(success,title,detail){
    statusMsg.textContent="";
    resultZone.className="result-zone vis "+(success?"suc":"fail");
    resultTitle.textContent=title;
    resultDetail.textContent=detail;
    nextBtn.classList.add("vis");
    }

    function showWinScreen(p){
    mainGame.style.display="none";
    winScreen.classList.add("vis");
    winCrown.className="win-crown "+(p===1?"p1c":"p2c");
    winName.textContent=names[p-1]+" wins!";
    winSub.textContent=`${scores[p-1]} points — first to ${winTarget}. Well played!`;
    // If you want an exit link, add it to the HTML win-screen div instead
    }

    nextBtn.addEventListener("click",loadNewWord);
    playAgainBtn.addEventListener("click",()=>{
    scores=[0,0];
    winScreen.classList.remove("vis");
    nameSetup.style.display="block";
    });

    buzzP1.addEventListener("click",()=>buzz(1));
    buzzP2.addEventListener("click",()=>buzz(2));

    document.addEventListener("keydown",e=>{
    const tag=document.activeElement.tagName;
    if(tag==="INPUT"||tag==="TEXTAREA")return;
    if(e.key==="q"||e.key==="Q"){if(!buzzP1.disabled){e.preventDefault();buzz(1);}}
    if(e.key==="p"||e.key==="P"){if(!buzzP2.disabled){e.preventDefault();buzz(2);}}
    });