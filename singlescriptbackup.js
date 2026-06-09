

    // --- CONSTANTS AND DATA ---
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

    // --- GLOBAL STATE VARIABLES ---
    let gameState = {
        score: 0,
        max_score: 0,
        name: "Me",
        winTarget: 5,
        currentMode: null, // 'streak' or 'timed'
    };

    let activePlayer = 'user';
    let timerInterval = null;
    let buzzLocked = false;
    let currentWord = null;
    let timedChallengeState = {
        totalRounds: 0,
        timeLimit: 60, 
    };

    // --- DOM REFERENCES ---
    const $=id=>document.getElementById(id);
    const nameSetup=$("name-setup");
    const startGameBtn=$("start-game-btn");
    const mainGame=$("main-game");

    const pCard=$("card-p1");
    const labelP1=$("label-p1");
    const scoreP1=$("score-p1");
    const pipsP1=$("pips-p1");
    const buzzBtn=$("buzz-p1");

    const wordDisplay=$("word-display"), catTag=$("cat-tag"), winProgress=$("win-progress");
    const inputZone=$("input-zone"), activeBanner=$("active-banner"), songInput=$("song-input");
    const timerBar=$("timer-bar"), submitBtn=$("submit-btn");
    const resultZone=$("result-zone"), resultTitle=$("result-title"), resultDetail=$("result-detail");
    const statusMsg=$("status-msg"), nextBtn=$("next-btn");
    const winScreen=$("win-screen"), winCrown=$("win-crown"), winName=$("win-name"), winSub=$("win-sub");
    const playAgainBtn=$("play-again-btn");


    // ==================================================
    // I. CORE UTILITIES & UI UPDATES
    // ==================================================

    function updateScores(){
        scoreP1.textContent=gameState.score;
        renderPips(pipsP1, gameState.score, gameState.winTarget, "p1f");
        winProgress.innerHTML=`${gameState.name} leads — first to ${gameState.winTarget}.`;
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
            resetRound();
            startBuzzTimer(); 
        },200);
    }

    function resetRound(){
        clearInterval(buzzTimerInterval);
        clearTimer();
        activePlayer = 'user';
        buzzLocked = false;
        inputZone.classList.remove("vis");
        resultZone.classList.remove("vis","suc","fail");
        nextBtn.classList.remove("vis");
        songInput.value="";
        songInput.disabled=false;
        submitBtn.disabled=true;
        timerBar.style.width="100%";
        statusMsg.textContent="Buzz in to answer!";
        buzzBtn.disabled=false;
        pCard.className="pcard p1a"; 
    }

    let buzzTimerInterval = null;
    function startBuzzTimer(){
        if (buzzTimerInterval) clearInterval(buzzTimerInterval);
        const totalTime = 30; 
        let timeLeft = totalTime;
        catTag.textContent=`${currentWord.cat} — ${timeLeft}s`;

        buzzTimerInterval = setInterval(()=>{
            timeLeft--;
            catTag.textContent=`${currentWord.cat} — ${timeLeft}s`;
            if(timeLeft<=0){
                clearInterval(buzzTimerInterval);
                statusMsg.textContent = "Time ran out to buzz! Click next word.";
                buzzLocked = true;
                buzzBtn.disabled = true;
                nextBtn.classList.add("vis");
            }
        },1000);
    }

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

        function resetTimer(){clearInterval(timerInterval);startTimer();}
        function clearTimer(){clearInterval(timerInterval);timerInterval=null;}

        function timeUp(){
        songInput.disabled=true;
        submitBtn.disabled=true;
        statusMsg.textContent="time's up!";
        showResult(false,"Time ran out","No points awarded");
        }

        songInput.addEventListener("input",()=>{
        if(!activePlayer)return;
        resetTimer();
        submitBtn.disabled=songInput.value.trim().length<2;
        });

    submitBtn.addEventListener("click",()=>submitAnswer());
    songInput.addEventListener("keydown",e=>{if(e.key==="Enter"&&!submitBtn.disabled)submitAnswer();});
    // ==================================================
    // II. GAME ACTIONS AND LOGIC
    // ==================================================

    function buzz(){
        if (!buzzLocked) {
            clearInterval(buzzTimerInterval); 
            buzzLocked = true;
            activePlayer = 'user';
            
            pCard.className="pcard p1a"; 
            activeBanner.textContent=`${gameState.name} — type a song title`;
            activeBanner.className="p1";
            inputZone.classList.add("vis");

            statusMsg.textContent="";
            songInput.focus();
            startTimer();
        }
    }

    async function submitAnswer(){
        clearTimer();
        songInput.disabled=true;
        submitBtn.disabled=true;
        buzzBtn.disabled = true; 

        const songGuess=songInput.value.trim();
        if(!songGuess||songGuess.length<2){
            showResult(false,"Nothing entered","Type a song title!");
            nextBtn.classList.add("vis");
            return;
        }

        statusMsg.textContent="checking with Genius...";

        try{
            const resp=await fetch(`http://localhost:3001/search?q=${encodeURIComponent(songGuess)}`);
            if(!resp.ok){showResult(false,"API error",`Genius returned ${resp.status}`); nextBtn.classList.add("vis"); return;}
            const data=await resp.json();
            const hits=data.response.hits;

            if(hits&&hits.length>0&&hits[0].type==="song"){
                const top=hits[0].result;
                const normalize=s=>s.toLowerCase().replace(/[^a-z0-9\s]/g,"").trim();
                const actualNorm=normalize(top.title);
                const guessNorm=normalize(songGuess);
                const wordNorm=normalize(currentWord.w);

                const guessWords=guessNorm.split(/\s+/).filter(w=>w.length>1);
                const matchCount=guessWords.filter(w=>actualNorm.includes(w)).length;
                const matchRatio=matchCount/guessWords.length;

                if(matchRatio<0.90){
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
                if (((guessNorm.length / actualNorm.length) >= (0.75)) || (((guessNorm.length / actualNorm.length) - 1) <= 0.25))
                {
                gameState.score++;
                updateScores();
                showResult(true,top.title,`by ${top.primary_artist.name} — You scored a point!`);
                }

                if (gameState.score >= gameState.winTarget) {
                    setTimeout(()=>showWinScreen(),1200);
                    return;
                }

            } else{
                showResult(false,"Not found","Genius doesn't recognise that song");
            }
        } catch(err){
            showResult(false,"Fetch error","Could not reach Genius API — is the server running?");
        } finally {
            nextBtn.classList.add("vis");
        }
    }

    function showResult(success,title,detail){
        statusMsg.textContent="";
        resultZone.className="result-zone vis "+(success?"suc":"fail");
        resultTitle.textContent=title;
        resultDetail.textContent=detail;
    }

    function showWinScreen(){
        mainGame.style.display="none";
        winScreen.classList.add("vis");
        winCrown.className="win-crown p1c"; 
        winName.textContent=`${gameState.name} wins!`;
        winSub.innerHTML = `<strong>${gameState.score}</strong> points — first to ${gameState.winTarget}. Well played!<br><br><a href="index.html" style="color:#8a8894;text-decoration:none">← Exit to Main Menu</a>`;
    }


    // ==================================================
    // III. GAME MODE SETUP AND FLOW CONTROL
    // ==================================================

    function initializeGame(mode, timeLimit) {
        clearInterval(timerInterval);
        gameState.currentMode = mode;
        
        // Grab elements if mode dictates
        if (mode === 'timed') {
            const roundInput = document.getElementById('round-limit');
            timedChallengeState.timeLimit = roundInput ? Math.max(1, parseInt(roundInput.value)) : 10;
            timedChallengeState.totalRounds = 0;
        } else {
            timedChallengeState.timeLimit = 0; 
        }

        document.getElementById('setup-mode').style.display='none';
        document.getElementById('name-setup').style.display='block';
        document.getElementById('name-setup').style.position='relative';    
        mainGame.style.display='none';
        winScreen.classList.remove("vis");

        document.getElementById('start-game-btn').onclick = () => startGame(mode);
    }

    function startGame(mode) {
        // Capture user setup choices here
        const inputName = document.getElementById("name-p1").value.trim();
        const inputTarget = document.getElementById("win-target").value;
        
        if(inputName) {
            gameState.name = inputName;
            labelP1.textContent = inputName;
        }
        if(inputTarget) {
            gameState.winTarget = parseInt(inputTarget);
        }

        mainGame.style.display="block";
        nameSetup.style.display="none";

        if (mode === 'timed') {
            statusMsg.textContent = `Timed Challenge activated! Round 1/${timedChallengeState.timeLimit}`;
        } else {
            statusMsg.textContent = "Streak mode active! Keep going until you fail!";
        }
        
        gameState.score = 0;
        updateScores();
        loadNewWord();
    }

    function handleNextRound() {
        if (gameState.currentMode === 'streak') {
            loadNewWord();
            statusMsg.textContent = "Continue the streak!"; 
        } else if (gameState.currentMode === 'timed') {
            timedChallengeState.totalRounds++;
            if (timedChallengeState.totalRounds >= timedChallengeState.timeLimit) {
                showWinScreen();
            } else {
                loadNewWord();
                statusMsg.textContent = `Round ${timedChallengeState.totalRounds + 1}/${timedChallengeState.timeLimit}. Guess the next song!`; 
            }
        }
    }


    // Attach manual clickable event triggers
    buzzBtn.addEventListener("click", buzz);
    nextBtn.addEventListener("click", handleNextRound);
    playAgainBtn.addEventListener("click", () => {
        winScreen.classList.remove("vis");
        document.getElementById('setup-mode').style.display='block';
    });

    songInput.addEventListener("input",()=>{
        if (!buzzLocked) return; 
        submitBtn.disabled=songInput.value.trim().length<2;
    });

    submitBtn.addEventListener("click", submitAnswer);
    songInput.addEventListener("keydown", e=>{
        if(e.key==="Enter" && !submitBtn.disabled) {
            e.preventDefault();
            submitAnswer();
        }
    });

    document.addEventListener("keydown",e=>{
        const tag=document.activeElement.tagName;
        if(tag==="INPUT"||tag==="TEXTAREA")return;

        if(e.key==="q"||e.key==="Q"){
            if (!buzzLocked) { 
                e.preventDefault();
                buzz();
            }
        }
    });

    // ==================================================
    // I. GLOBAL SETUP AND INITIALIZATION (DOM Ready Listener)
    // We use DOMContentLoaded to ensure all HTML elements exist when we try to find them.
    document.addEventListener('DOMContentLoaded', () => {
        
        // 1. Reference the key container element
        const modeContainer = document.getElementById('mode-select');

        /** Helper function: Resets and sets up the UI for a new game setup */
        function initializeGame(mode, timeLimit) {
            gameState.currentMode = mode;
            
            // Reset name/target display
            document.getElementById("win-row").innerHTML = `
                <label>First to</label><input id="win-target" type="number" min="1" max="20" value="5" /><label>points wins</label>
            `;
            // Set the temporary time limit input if 'timed' mode was selected
            if (mode === 'timed') {
                document.getElementById("win-row").innerHTML += `<label>Time Limit</label><input id="round-limit" type="number" min="1" value="10" />`;
            }

            // Make the name setup visible, but hide the actual game elements
            nameSetup.style.display = "block";
            mainGame.style.display = "none"; 
        }


        /** Handles setting up the state when a mode button is clicked */
        if (modeContainer) {
            modeContainer.addEventListener('click', (e) => {
                // Ensure the clicked element is actually one of the mode buttons
                if (!e.target.classList.contains('mode-btn')) return; 

                const selectedMode = e.target.dataset.mode;
                let timeLimitValue = undefined;

                // Determine Time Limit based on the selection
                if (selectedMode === 'timed') {
                    // Get value from the input we dynamically created in the HTML/JS setup
                    timeLimitValue = parseInt(document.getElementById('round-limit').value) || 10;
                } else {
                    timeLimitValue = undefined; // Not applicable for streak mode
                }

                // Set up the UI state immediately upon clicking a mode button
                initializeGame(selectedMode, timeLimitValue);
            });
        }


        /** Handles starting the game when the main 'Start Game' button is clicked */
        const startGameBtn = document.getElementById('start-game-btn');

        if (startGameBtn) {
            startGameBtn.addEventListener("click", () => {
                // We rely on the global state variables being set by initializeGame() 
                // which was called when a mode button was clicked first.
                const finalMode = gameState.currentMode;
                const finalTimeLimit = timedChallengeState.timeLimit || 0;

                if (finalMode) {
                    startGame(finalMode, finalTimeLimit);
                } else {
                    // Fallback if the user somehow clicks start before selecting a mode
                    alert("Please select a game mode first!");
                }
            });
        }
    });


    /** Function that handles the actual game start and initial word load */
    function startGame(mode, timeLimit) {
        gameState.score = 0;
        gameState.winTarget = parseInt(document.getElementById('win-target').value) || 5;
        timedChallengeState.totalRounds = 0;

        // Reset UI visibility and state
        nameSetup.style.display = "none";
        mainGame.style.display = "block";
        
        updateScores();
        loadNewWord();
    }
    