// ── DATA ──
const WORDS = [
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

// ── STATE ──
let mode = null;           // 'streak' | 'timed'
let playerName = 'Me';
let score = 0;
let winTarget = 5;
let timeLimit = 60;        // timed mode: total seconds
let globalTimeLeft = 0;
let currentWord = null;
let buzzLocked = false;
let gameActive = false;

let answerTimer = null;
let buzzCountdown = null;
let globalTimer = null;

// ── DOM ──
const $ = id => document.getElementById(id);

// ── SCREEN MANAGEMENT ──
function showScreen(name) {
  $('setup-mode').style.display  = name === 'setup'  ? 'block' : 'none';
  $('name-setup').style.display  = name === 'options' ? 'block' : 'none';
  $('main-game').style.display   = name === 'game'   ? 'block' : 'none';
  $('win-screen').style.display  = name === 'end'    ? 'block' : 'none';
}

// ── SETUP: mode buttons ──
document.getElementById('mode-select').addEventListener('click', e => {
  if (!e.target.classList.contains('mode-btn')) return;
  mode = e.target.dataset.mode;
  $('streak-options').style.display = mode === 'streak' ? 'block' : 'none';
  $('timed-options').style.display  = mode === 'timed'  ? 'block' : 'none';
  showScreen('options');
});

// ── SETUP: start button ──
$('start-game-btn').addEventListener('click', () => {
  playerName = $('name-p1').value.trim() || 'Me';
  $('label-p1').textContent = playerName;

  if (mode === 'streak') {
    winTarget = Math.max(1, parseInt($('win-target').value) || 5);
  } else {
    timeLimit = Math.max(10, parseInt($('time-limit').value) || 60);
    globalTimeLeft = timeLimit;
  }

  score = 0;
  gameActive = true;
  updateScoreDisplay();
  showScreen('game');
  startGlobalTimer();
  loadNewWord();
});

// ── GLOBAL TIMER (timed mode only) ──
function startGlobalTimer() {
  clearInterval(globalTimer);
  if (mode !== 'timed') {
    $('win-progress').textContent = `First to ${winTarget} points wins`;
    return;
  }
  updateTimerDisplay();
  globalTimer = setInterval(() => {
    globalTimeLeft--;
    updateTimerDisplay();
    if (globalTimeLeft <= 0) {
      clearInterval(globalTimer);
      endGame();
    }
  }, 1000);
}

function updateTimerDisplay() {
  if (mode === 'timed') {
    $('win-progress').textContent = `⏱ ${globalTimeLeft}s remaining`;
  }
}

// ── SCORE ──
function updateScoreDisplay() {
  $('score-p1').textContent = score;
  const pips = $('pips-p1');
  pips.innerHTML = '';
  if (mode === 'streak') {
    for (let i = 0; i < winTarget; i++) {
      const d = document.createElement('div');
      d.className = 'pip ' + (i < score ? 'p1f' : 'empty');
      pips.appendChild(d);
    }
  }
}

// ── WORD ──
function loadNewWord() {
  if (!gameActive) return;
  $('word-display').classList.add('flash');
  setTimeout(() => {
    currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    $('word-display').textContent = currentWord.w.toUpperCase();
    $('word-display').classList.remove('flash');
    resetRound();
    startBuzzCountdown();
  }, 200);
}

function resetRound() {
  clearInterval(answerTimer);
  clearInterval(buzzCountdown);
  buzzLocked = false;
  $('input-zone').classList.remove('vis');
  $('result-zone').className = 'result-zone';
  $('next-btn').classList.remove('vis');
  $('song-input').value = '';
  $('song-input').disabled = false;
  $('submit-btn').disabled = true;
  $('timer-bar').style.width = '100%';
  $('status-msg').textContent = 'Buzz in to answer!';
  $('buzz-p1').disabled = false;
  $('cat-tag').textContent = currentWord.cat;
}

// ── BUZZ COUNTDOWN (30s to buzz) ──
function startBuzzCountdown() {
  let t = 30;
  $('cat-tag').textContent = `${currentWord.cat} — ${t}s`;
  buzzCountdown = setInterval(() => {
    t--;
    $('cat-tag').textContent = `${currentWord.cat} — ${t}s`;
    if (t <= 0) {
      clearInterval(buzzCountdown);
      if (!buzzLocked) {
        buzzLocked = true;
        $('buzz-p1').disabled = true;
        $('status-msg').textContent = "Time's up — no one buzzed!";
        // streak: missing a buzz ends the game
        if (mode === 'streak') {
          setTimeout(endGame, 1200);
        } else {
          $('next-btn').classList.add('vis');
        }
      }
    }
  }, 1000);
}

// ── BUZZ IN ──
function doBuzz() {
  if (buzzLocked || !gameActive) return;
  clearInterval(buzzCountdown);
  buzzLocked = true;
  $('buzz-p1').disabled = true;
  $('cat-tag').textContent = currentWord.cat;
  $('active-banner').textContent = `${playerName} — type a song title`;
  $('input-zone').classList.add('vis');
  $('status-msg').textContent = '';
  $('song-input').focus();
  startAnswerTimer();
}

// ── ANSWER TIMER (5s) ──
function startAnswerTimer() {
  $('timer-bar').style.width = '100%';
  clearInterval(answerTimer);
  const start = Date.now();
  answerTimer = setInterval(() => {
    const ratio = Math.max(0, 1 - (Date.now() - start) / 5000);
    $('timer-bar').style.width = (ratio * 100) + '%';
    if (ratio <= 0) { clearInterval(answerTimer); onTimeUp(); }
  }, 50);
}

function onTimeUp() {
  $('song-input').disabled = true;
  $('submit-btn').disabled = true;
  showResult(false, "Time's Up!", "You didn't answer in time.");
  if (mode === 'streak') {
    setTimeout(endGame, 1200);
  } else {
    $('next-btn').classList.add('vis');
  }
}

// ── SUBMIT ──
async function submitAnswer() {
  clearInterval(answerTimer);
  $('song-input').disabled = true;
  $('submit-btn').disabled = true;

  const guess = $('song-input').value.trim();
  if (!guess || guess.length < 2) {
    showResult(false, 'Nothing entered', 'Type a song title!');
    $('next-btn').classList.add('vis');
    return;
  }

  $('status-msg').textContent = 'Checking with Genius...';

  try {
    const resp = await fetch(`/api/search?q=${encodeURIComponent(guess)}`);
    if (!resp.ok) { showResult(false, 'API error', `Status ${resp.status}`); $('next-btn').classList.add('vis'); return; }
    const data = await resp.json();
    const hits = data.response?.hits;

    if (hits && hits.length > 0 && hits[0].type === 'song') {
      const top = hits[0].result;
      const norm = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
      const actualNorm = norm(top.title);
      const guessNorm  = norm(guess);
      const wordNorm   = norm(currentWord.w);

      const guessWords = guessNorm.split(/\s+/).filter(w => w.length > 1);
      const matchRatio = guessWords.length
        ? guessWords.filter(w => actualNorm.includes(w)).length / guessWords.length
        : 0;

      if (matchRatio < 0.95) {
        showResult(false, 'No match', `Genius found "${top.title}" — not quite!`);
        handleWrong(); return;
      }
      if (!actualNorm.replace(/\s/g,'').includes(wordNorm.replace(/\s/g,''))) {
        showResult(false, 'Word not in title', `"${top.title}" doesn't contain "${currentWord.w}"`);
        handleWrong(); return;
      }
      if (guessNorm === wordNorm) {
        showResult(false, 'Too simple', `The title can't just be the word itself.`);
        handleWrong(); return;
      }

      // ✓ Correct
      score++;
      updateScoreDisplay();
      showResult(true, top.title, `by ${top.primary_artist.name} — point scored!`);

      if (mode === 'streak' && score >= winTarget) {
        setTimeout(endGame, 1200);
        return;
      }
      $('next-btn').classList.add('vis');

    } else {
      showResult(false, 'Not found', "Genius doesn't recognise that song");
      handleWrong();
    }
  } catch (err) {
    showResult(false, 'Connection error', 'Could not reach the API.');
    $('next-btn').classList.add('vis');
  }
}

function handleWrong() {
  if (mode === 'streak') {
    setTimeout(endGame, 1200);
  } else {
    $('next-btn').classList.add('vis');
  }
}

function showResult(success, title, detail) {
  $('status-msg').textContent = '';
  $('result-zone').className = 'result-zone vis ' + (success ? 'suc' : 'fail');
  $('result-title').textContent = title;
  $('result-detail').textContent = detail;
}

// ── END GAME ──
function endGame() {
  gameActive = false;
  clearInterval(globalTimer);
  clearInterval(answerTimer);
  clearInterval(buzzCountdown);

  $('win-crown').textContent = score > 0 ? '★' : '○';
  $('win-crown').className = 'p1c';

  if (mode === 'streak') {
    $('win-name').textContent = score >= winTarget ? `${playerName} wins!` : 'Streak ended!';
    $('win-sub').innerHTML = score >= winTarget
      ? `You reached ${winTarget} points — well played!`
      : `You scored <strong>${score}</strong> point${score !== 1 ? 's' : ''} before missing.`;
  } else {
    $('win-name').textContent = "Time's up!";
    $('win-sub').innerHTML = `You scored <strong>${score}</strong> point${score !== 1 ? 's' : ''} in ${timeLimit} seconds.`;
  }

  showScreen('end');
}

// ── EVENT LISTENERS ──
$('buzz-p1').addEventListener('click', doBuzz);
$('submit-btn').addEventListener('click', submitAnswer);
$('song-input').addEventListener('keydown', e => { if (e.key === 'Enter' && !$('submit-btn').disabled) submitAnswer(); });
$('song-input').addEventListener('input', () => { $('submit-btn').disabled = $('song-input').value.trim().length < 2; });
$('next-btn').addEventListener('click', loadNewWord);

$('play-again-btn').addEventListener('click', () => {
  clearInterval(globalTimer);
  clearInterval(answerTimer);
  clearInterval(buzzCountdown);
  score = 0; gameActive = false; mode = null;
  showScreen('setup');
});

document.addEventListener('keydown', e => {
  if (document.activeElement.tagName === 'INPUT') return;
  if ((e.key === 'q' || e.key === 'Q') && !$('buzz-p1').disabled) { e.preventDefault(); doBuzz(); }
});

// Start on setup screen
showScreen('setup');