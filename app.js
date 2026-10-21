// CMasterLab — Main Interactive Application Logic

const STORAGE_KEY = 'cmasterlab_state_v1';

const defaultState = {
  studentName: 'Alex Mercer',
  xp: 0,
  streak: 0,
  maxStreak: 0,
  completedModules: [],
  answeredQuizzes: [],
  solvedChallenges: [],
  unlockedBadges: [],
  instructorMode: false,
  currentUnit: 'basics',
  currentMode: 'dashboard'
};

let state = loadState();
let activeModuleIndex = 0;
let quizFilter = 'all';
let currentQuizList = [];
let currentQuizIndex = 0;
let currentChallengeId = C_CHALLENGES[0].id;
let currentTraceStep = 0;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch (e) {
    return { ...defaultState };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore storage errors
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 3200);
}

function getLevelInfo(xp) {
  const levels = [
    { level: 1, title: 'Novice Coder', min: 0, next: 100 },
    { level: 2, title: 'Loop Apprentice', min: 100, next: 250 },
    { level: 3, title: 'Array Ranger', min: 250, next: 450 },
    { level: 4, title: 'Pointer Adept', min: 450, next: 700 },
    { level: 5, title: 'Systems Architect', min: 700, next: 1000 },
    { level: 6, title: 'K&R Legend', min: 1000, next: 1500 }
  ];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].min) {
      const cur = levels[i];
      const pct = Math.min(100, Math.round(((xp - cur.min) / (cur.next - cur.min)) * 100));
      return { ...cur, pct };
    }
  }
  return { ...levels[0], pct: 0 };
}

function awardXP(amount, reason) {
  state.xp += amount;
  showToast(`+${amount} XP — ${reason}`);
  checkBadges();
  saveState();
  updateHUD();
}

function checkBadges() {
  C_BADGES.forEach((badge) => {
    if (!state.unlockedBadges.includes(badge.id) && badge.check(state)) {
      state.unlockedBadges.push(badge.id);
      showToast(`🏅 Badge Unlocked: ${badge.name}!`);
    }
  });
}

function computeUnitMastery(unitKey) {
  const unit = C_UNITS[unitKey];
  const modIds = unit.modules.map((m) => m.id);
  const quizIds = unit.quizzes.map((q) => q.id);
  const chalIds = C_CHALLENGES.filter((c) => c.unit === unitKey).map((c) => c.id);

  const totalItems = modIds.length + quizIds.length + chalIds.length;
  if (totalItems === 0) return 0;

  const doneMods = modIds.filter((id) => state.completedModules.includes(id)).length;
  const doneQuizzes = quizIds.filter((id) => state.answeredQuizzes.includes(id)).length;
  const doneChals = chalIds.filter((id) => state.solvedChallenges.includes(id)).length;

  return Math.round(((doneMods + doneQuizzes + doneChals) / totalItems) * 100);
}

function updateHUD() {
  const lvl = getLevelInfo(state.xp);
  document.getElementById('hudStreak').textContent = state.streak;
  document.getElementById('hudXP').textContent = `${state.xp} XP`;
  document.getElementById('hudLevel').textContent = `Lv. ${lvl.level} ${lvl.title}`;
  document.getElementById('hudXPBar').style.width = `${lvl.pct}%`;

  // Instructor toggle state
  const instBtn = document.getElementById('instructorToggle');
  const instState = document.getElementById('instructorState');
  instBtn.classList.toggle('active', state.instructorMode);
  instState.textContent = state.instructorMode ? 'ON' : 'OFF';

  // Unit Mastery Bars
  const mBasics = computeUnitMastery('basics');
  const mArrays = computeUnitMastery('arrays');
  const mPointers = computeUnitMastery('pointers');
  const mStructs = computeUnitMastery('structs');

  document.getElementById('masteryBasics').textContent = `${mBasics}%`;
  document.getElementById('barBasics').style.width = `${mBasics}%`;
  document.getElementById('masteryArrays').textContent = `${mArrays}%`;
  document.getElementById('barArrays').style.width = `${mArrays}%`;
  document.getElementById('masteryPointers').textContent = `${mPointers}%`;
  document.getElementById('barPointers').style.width = `${mPointers}%`;
  document.getElementById('masteryStructs').textContent = `${mStructs}%`;
  document.getElementById('barStructs').style.width = `${mStructs}%`;

  // Student Card
  document.getElementById('statQuizzes').textContent = state.answeredQuizzes.length;
  document.getElementById('statChallenges').textContent = state.solvedChallenges.length;
  document.getElementById('statBadges').textContent = `${state.unlockedBadges.length}/${C_BADGES.length}`;

  // Compute rank
  const allRanks = [...INITIAL_CLASSMATES, { name: state.studentName, xp: state.xp, isUser: true }]
    .sort((a, b) => b.xp - a.xp);
  const userRank = allRanks.findIndex((r) => r.isUser) + 1;
  document.getElementById('studentRankTag').textContent = `Rank #${userRank} • Lv. ${lvl.level}`;

  // Toggle instructor elements across active views
  document.getElementById('fillSolutionBtn').classList.toggle('hidden', !state.instructorMode);
  document.getElementById('lessonInstructorNote').classList.toggle('hidden', !state.instructorMode);
  document.getElementById('quizInstructorBox').classList.toggle('hidden', !state.instructorMode);
}

// ==========================================
// 1. DASHBOARD & MODULES VIEW
// ==========================================
function renderDashboard() {
  const unit = C_UNITS[state.currentUnit];
  document.getElementById('heroTag').textContent = unit.tag;
  document.getElementById('heroTitle').textContent = unit.title;
  document.getElementById('heroDesc').textContent = unit.desc;
  document.getElementById('heroFilename').textContent = unit.heroFilename;
  document.getElementById('heroCodeSnippet').textContent = unit.heroCode;

  const doneCount = unit.modules.filter((m) => state.completedModules.includes(m.id)).length;
  document.getElementById('moduleCompletionCount').textContent =
    `${doneCount} / ${unit.modules.length} Completed in Unit`;

  const grid = document.getElementById('modulesGrid');
  grid.innerHTML = '';

  unit.modules.forEach((mod, idx) => {
    const isCompleted = state.completedModules.includes(mod.id);
    const card = document.createElement('div');
    card.className = `module-card ${idx === activeModuleIndex ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
    card.innerHTML = `
      <div>
        <div class="module-num">${mod.num}</div>
        <h4 class="module-title">${mod.title}</h4>
        <p class="module-summary">${mod.summary}</p>
      </div>
      <div class="module-footer">
        <span>📄 ${mod.filename}</span>
        <span>+${mod.xp} XP</span>
      </div>
    `;
    card.addEventListener('click', () => {
      activeModuleIndex = idx;
      renderDashboard();
    });
    grid.appendChild(card);
  });

  renderActiveLesson();
}

function renderActiveLesson() {
  const unit = C_UNITS[state.currentUnit];
  const mod = unit.modules[activeModuleIndex] || unit.modules[0];
  const isCompleted = state.completedModules.includes(mod.id);

  document.getElementById('lessonTopicBadge').textContent = mod.num;
  document.getElementById('lessonTitle').textContent = mod.title;
  document.getElementById('lessonExplanation').innerHTML = mod.explanation;
  document.getElementById('lessonCodeFilename').textContent = mod.filename;
  document.getElementById('lessonCodeContent').textContent = mod.code;
  document.getElementById('lessonCodeOutput').textContent = mod.output;
  document.getElementById('lessonInstructorText').textContent = mod.instructorNote;

  const btn = document.getElementById('completeLessonBtn');
  if (isCompleted) {
    btn.textContent = '✓ Module Completed';
    btn.disabled = true;
  } else {
    btn.textContent = `✓ Complete Module (+${mod.xp} XP)`;
    btn.disabled = false;
  }
}

// ==========================================
// 2. QUIZ ARENA VIEW
// ==========================================
function buildQuizList() {
  const unit = C_UNITS[state.currentUnit];
  if (quizFilter === 'all') {
    currentQuizList = [...unit.quizzes];
  } else {
    currentQuizList = unit.quizzes.filter((q) => q.type === quizFilter);
    if (currentQuizList.length === 0) currentQuizList = [...unit.quizzes];
  }
  if (currentQuizIndex >= currentQuizList.length) {
    currentQuizIndex = 0;
  }
}

function getComboMultiplier() {
  if (state.streak >= 5) return 2.0;
  if (state.streak >= 3) return 1.5;
  if (state.streak >= 2) return 1.25;
  return 1.0;
}

function renderQuiz() {
  const unit = C_UNITS[state.currentUnit];
  document.getElementById('quizTrackLabel').textContent = `${unit.tag} • QUIZ ARENA`;
  buildQuizList();

  const q = currentQuizList[currentQuizIndex];
  const total = currentQuizList.length;
  const pct = Math.round(((currentQuizIndex + 1) / total) * 100);
  document.getElementById('quizProgressFill').style.width = `${pct}%`;

  const mult = getComboMultiplier();
  document.getElementById('quizComboBadge').textContent = `Combo: ${mult.toFixed(2)}x XP`;

  const typeLabels = {
    output: 'PREDICT C OUTPUT',
    bug: 'SPOT THE C BUG',
    concept: 'CONCEPT CHECK'
  };
  document.getElementById('qTypeTag').textContent = typeLabels[q.type] || 'C QUIZ';
  document.getElementById('qDifficulty').textContent = q.difficulty;
  document.getElementById('qCounter').textContent = `Question ${currentQuizIndex + 1} of ${total}`;
  document.getElementById('qPrompt').textContent = q.prompt;
  document.getElementById('qFilename').textContent = q.filename;
  document.getElementById('qCodeBlock').textContent = q.code;

  const feedbackBox = document.getElementById('qFeedbackBox');
  feedbackBox.className = 'q-feedback hidden';

  const letters = ['A', 'B', 'C', 'D'];
  document.getElementById('quizInstructorKey').textContent =
    `Option ${letters[q.correct]} ("${q.options[q.correct]}") — ${q.explanation}`;

  const optionsGrid = document.getElementById('qOptionsGrid');
  optionsGrid.innerHTML = '';

  q.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'q-option-btn';
    btn.innerHTML = `
      <span class="q-option-letter">${letters[idx]}</span>
      <span>${optText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
    `;
    btn.addEventListener('click', () => handleQuizAnswer(q, idx, btn));
    optionsGrid.appendChild(btn);
  });
}

function handleQuizAnswer(q, chosenIdx, clickedBtn) {
  const allBtns = document.querySelectorAll('.q-option-btn');
  allBtns.forEach((b) => (b.disabled = true));

  const feedbackBox = document.getElementById('qFeedbackBox');
  const feedbackTitle = document.getElementById('qFeedbackTitle');
  const feedbackText = document.getElementById('qFeedbackText');

  if (chosenIdx === q.correct) {
    clickedBtn.classList.add('correct');
    state.streak += 1;
    if (state.streak > state.maxStreak) state.maxStreak = state.streak;

    const mult = getComboMultiplier();
    const earned = Math.round(q.xp * mult);

    feedbackBox.className = 'q-feedback success';
    if (!state.answeredQuizzes.includes(q.id)) {
      state.answeredQuizzes.push(q.id);
      awardXP(earned, `Quiz Correct (${mult}x Streak!)`);
      feedbackTitle.textContent = `✓ Correct! (+${earned} XP)`;
    } else {
      feedbackTitle.textContent = '✓ Correct! (Already Mastered)';
      saveState();
      updateHUD();
    }
    feedbackText.textContent = q.explanation;
  } else {
    clickedBtn.classList.add('wrong');
    allBtns[q.correct].classList.add('correct');
    state.streak = 0;
    saveState();
    updateHUD();

    feedbackBox.className = 'q-feedback error';
    feedbackTitle.textContent = '✗ Not quite! Streak reset to 0.';
    feedbackText.textContent = q.explanation;
  }

  document.getElementById('quizComboBadge').textContent = `Combo: ${getComboMultiplier().toFixed(2)}x XP`;
}

// ==========================================
// 3. CODING CHALLENGES VIEW
// ==========================================
function populateChallengeSelector() {
  const select = document.getElementById('challengeSelect');
  select.innerHTML = '';
  C_CHALLENGES.forEach((chal) => {
    const opt = document.createElement('option');
    opt.value = chal.id;
    const solvedMark = state.solvedChallenges.includes(chal.id) ? '✓ ' : '';
    opt.textContent = `${solvedMark}${chal.title} (${chal.difficulty})`;
    if (chal.id === currentChallengeId) opt.selected = true;
    select.appendChild(opt);
  });
}

function updateLineNumbers() {
  const editor = document.getElementById('codeEditor');
  const lines = editor.value.split('\n').length;
  const nums = [];
  for (let i = 1; i <= Math.max(lines, 12); i++) {
    nums.push(i);
  }
  document.getElementById('editorLineNumbers').innerHTML = nums.join('<br>');
}

function renderChallenge() {
  populateChallengeSelector();
  const chal = C_CHALLENGES.find((c) => c.id === currentChallengeId) || C_CHALLENGES[0];
  const isSolved = state.solvedChallenges.includes(chal.id);

  document.getElementById('challengeXPBadge').textContent = `+${chal.xp} XP`;
  document.getElementById('chalDiffPill').textContent = chal.difficulty;

  const statusPill = document.getElementById('chalStatusPill');
  statusPill.textContent = isSolved ? '✓ Solved' : 'Unsolved';
  statusPill.classList.toggle('solved', isSolved);

  document.getElementById('chalTitle').textContent = chal.title;
  document.getElementById('chalDesc').innerHTML = chal.desc;

  const reqList = document.getElementById('chalRequirements');
  reqList.innerHTML = chal.requirements.map((r) => `<li>${r}</li>`).join('');

  const exBox = document.getElementById('chalExamples');
  exBox.innerHTML = chal.examples.map((ex) => `<div class="example-case">${ex}</div>`).join('');

  document.getElementById('chalHintDrawer').classList.add('hidden');
  document.getElementById('chalHintText').textContent = chal.hint;

  document.getElementById('editorFilename').textContent = chal.filename;
  const editor = document.getElementById('codeEditor');
  editor.value = chal.starterCode;
  updateLineNumbers();

  document.getElementById('consoleMetrics').textContent = 'Ready to compile (GCC C11)';
  document.getElementById('consoleOutput').innerHTML =
    `<div class="console-placeholder">Click <strong>"▶ Compile &amp; Run C Tests"</strong> to compile <code>${chal.filename}</code> and run unit tests.</div>`;
}

function runChallengeTests() {
  const chal = C_CHALLENGES.find((c) => c.id === currentChallengeId) || C_CHALLENGES[0];
  const code = document.getElementById('codeEditor').value;
  const consoleOut = document.getElementById('consoleOutput');
  const metrics = document.getElementById('consoleMetrics');

  // Basic C syntax sanity check
  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;
  if (openBraces !== closeBraces || openBraces === 0) {
    metrics.textContent = 'Compilation Failed (exit code 1)';
    consoleOut.innerHTML = `
      <div class="test-result-row fail">
        <span><strong>${chal.filename}: error:</strong> mismatched curly braces '{' and '}' in C source file.</span>
      </div>
    `;
    return;
  }

  const results = chal.validate(code);
  const allPassed = results.every((r) => r.pass);
  const passCount = results.filter((r) => r.pass).length;

  metrics.textContent = `${passCount}/${results.length} Tests Passed • 0.014s • 1.2 MB RAM`;

  consoleOut.innerHTML = results
    .map(
      (r) => `
      <div class="test-result-row ${r.pass ? 'pass' : 'fail'}">
        <span>${r.pass ? '✓ PASS' : '✗ FAIL'} — ${r.name}</span>
        <span>Output: ${r.actual}</span>
      </div>
    `
    )
    .join('');

  if (allPassed) {
    if (!state.solvedChallenges.includes(chal.id)) {
      state.solvedChallenges.push(chal.id);
      awardXP(chal.xp, `Solved ${chal.title}`);
    } else {
      showToast('✓ All C test cases passed!');
    }
    populateChallengeSelector();
    const statusPill = document.getElementById('chalStatusPill');
    statusPill.textContent = '✓ Solved';
    statusPill.classList.add('solved');
  }
}

// ==========================================
// 4. MEMORY & POINTER VISUALIZER VIEW
// ==========================================
function renderVisualizer() {
  const unit = C_UNITS[state.currentUnit];
  const trace = unit.trace;
  if (currentTraceStep >= trace.steps.length) currentTraceStep = 0;

  const step = trace.steps[currentTraceStep];
  document.getElementById('traceFilename').textContent = trace.filename;
  document.getElementById('traceStepIndicator').textContent =
    `Step ${currentTraceStep + 1} of ${trace.steps.length}`;

  const codeContainer = document.getElementById('traceCodeLines');
  codeContainer.innerHTML = trace.lines
    .map((lineText, idx) => {
      const lineNum = idx + 1;
      const isActive = lineNum === step.line;
      return `
        <div class="trace-line ${isActive ? 'active-line' : ''}">
          <span class="trace-line-num">${lineNum}</span>
          <span class="trace-line-code">${lineText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
        </div>
      `;
    })
    .join('');

  document.getElementById('traceStepExplanation').textContent = step.explanation;
  document.getElementById('traceStdout').textContent = step.stdout || '(no output yet)';

  const memGrid = document.getElementById('memorySlotsGrid');
  memGrid.innerHTML = step.memory
    .map(
      (cell) => `
      <div class="mem-cell ${cell.type === 'pointer' ? 'pointer-cell' : ''} ${cell.changed ? 'changed' : ''}">
        <div class="mem-addr">
          <span>ADDR: ${cell.addr}</span>
          <span>${cell.type === 'pointer' ? 'PTR (8B)' : 'STACK'}</span>
        </div>
        <div class="mem-name">${cell.name}</div>
        <div class="mem-val">${cell.val}</div>
      </div>
    `
    )
    .join('');
}

// ==========================================
// 5. ACHIEVEMENTS & LEADERBOARD VIEW
// ==========================================
function renderAchievements() {
  checkBadges();
  const badgesGrid = document.getElementById('badgesGrid');
  badgesGrid.innerHTML = C_BADGES.map((b) => {
    const unlocked = state.unlockedBadges.includes(b.id);
    return `
      <div class="badge-card ${unlocked ? 'unlocked' : ''}">
        <div class="badge-icon">${b.icon}</div>
        <div class="badge-name">${b.name}</div>
        <div class="badge-desc">${b.desc}</div>
      </div>
    `;
  }).join('');

  const leaderboard = [
    ...INITIAL_CLASSMATES,
    { name: `${state.studentName} (You)`, xp: state.xp, avatar: '👨‍💻', isUser: true }
  ].sort((a, b) => b.xp - a.xp);

  const listEl = document.getElementById('leaderboardList');
  listEl.innerHTML = leaderboard
    .map(
      (row, idx) => `
      <div class="leader-row ${row.isUser ? 'is-user' : ''}">
        <span class="leader-rank">#${idx + 1}</span>
        <span>${row.avatar}</span>
        <span class="leader-name">${row.name}</span>
        <span class="leader-xp">${row.xp} XP</span>
      </div>
    `
    )
    .join('');
}

function exportStudentReport() {
  const lvl = getLevelInfo(state.xp);
  const lines = [
    '====================================================',
    '  CMasterLab — Student C Programming Progress Report',
    '====================================================',
    `Student Name       : ${state.studentName}`,
    `Current Level      : Lv. ${lvl.level} (${lvl.title})`,
    `Total XP           : ${state.xp} XP`,
    `Max Quiz Streak    : ${state.maxStreak}x`,
    `Modules Completed  : ${state.completedModules.length} / 12`,
    `Quizzes Mastered   : ${state.answeredQuizzes.length} / 20`,
    `Challenges Solved  : ${state.solvedChallenges.length} / ${C_CHALLENGES.length}`,
    `Badges Unlocked    : ${state.unlockedBadges.length} / ${C_BADGES.length}`,
    '',
    'Unit Mastery Breakdown:',
    `  - Unit 1 (Basics & Flow)      : ${computeUnitMastery('basics')}%`,
    `  - Unit 2 (Functions & Arrays) : ${computeUnitMastery('arrays')}%`,
    `  - Unit 3 (Pointers & Memory)  : ${computeUnitMastery('pointers')}%`,
    `  - Unit 4 (Structs & File I/O) : ${computeUnitMastery('structs')}%`,
    '===================================================='
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${state.studentName.replace(/\s+/g, '_')}_C_Report.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Exported C Progress Report!');
}

// ==========================================
// NAVIGATION & EVENT LISTENERS
// ==========================================
function switchMode(mode) {
  state.currentMode = mode;
  saveState();

  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  document.querySelectorAll('.view-section').forEach((sec) => {
    sec.classList.toggle('active', sec.id === `view-${mode}`);
  });

  if (mode === 'dashboard') renderDashboard();
  if (mode === 'quiz') renderQuiz();
  if (mode === 'challenges') renderChallenge();
  if (mode === 'visualizer') renderVisualizer();
  if (mode === 'achievements') renderAchievements();
}

function switchUnit(unitKey) {
  state.currentUnit = unitKey;
  activeModuleIndex = 0;
  currentQuizIndex = 0;
  currentTraceStep = 0;

  // Pick first challenge of this unit when switching unit
  const unitChal = C_CHALLENGES.find((c) => c.unit === unitKey);
  if (unitChal) currentChallengeId = unitChal.id;

  document.querySelectorAll('.track-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.unit === unitKey);
  });

  saveState();
  switchMode(state.currentMode);
}

document.addEventListener('DOMContentLoaded', () => {
  // Restore unit buttons
  document.querySelectorAll('.track-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.unit === state.currentUnit);
    btn.addEventListener('click', () => switchUnit(btn.dataset.unit));
  });

  // Mode buttons
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchMode(btn.dataset.mode));
  });

  // Brand click returns to dashboard
  document.getElementById('brandHome').addEventListener('click', () => switchMode('dashboard'));

  // Student name input
  const nameInput = document.getElementById('studentNameInput');
  nameInput.value = state.studentName;
  nameInput.addEventListener('change', () => {
    state.studentName = nameInput.value.trim() || 'Alex Mercer';
    saveState();
    updateHUD();
    if (state.currentMode === 'achievements') renderAchievements();
  });

  // Instructor Mode toggle
  document.getElementById('instructorToggle').addEventListener('click', () => {
    state.instructorMode = !state.instructorMode;
    saveState();
    updateHUD();
    showToast(
      state.instructorMode
        ? '🎓 Instructor Mode ON: Teaching notes & solutions unlocked!'
        : '🎓 Instructor Mode OFF'
    );
  });

  // Hero quick-action buttons
  document.getElementById('startQuizBtn').addEventListener('click', () => switchMode('quiz'));
  document.getElementById('startChallengeBtn').addEventListener('click', () => switchMode('challenges'));
  document.getElementById('startVisualizerBtn').addEventListener('click', () => switchMode('visualizer'));

  // Complete Module button
  document.getElementById('completeLessonBtn').addEventListener('click', () => {
    const unit = C_UNITS[state.currentUnit];
    const mod = unit.modules[activeModuleIndex];
    if (!state.completedModules.includes(mod.id)) {
      state.completedModules.push(mod.id);
      awardXP(mod.xp, `Completed ${mod.num}`);
      renderDashboard();
    }
  });

  // Copy lesson C code
  document.getElementById('copyLessonCodeBtn').addEventListener('click', () => {
    const code = document.getElementById('lessonCodeContent').textContent;
    navigator.clipboard.writeText(code);
    showToast('📋 Copied C snippet to clipboard!');
  });

  // Quiz filter chips
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      quizFilter = chip.dataset.qfilter;
      currentQuizIndex = 0;
      renderQuiz();
    });
  });

  // Quiz navigation & hint
  document.getElementById('prevQuestionBtn').addEventListener('click', () => {
    if (currentQuizIndex > 0) {
      currentQuizIndex--;
      renderQuiz();
    }
  });

  document.getElementById('nextQuestionBtn').addEventListener('click', () => {
    currentQuizIndex = (currentQuizIndex + 1) % currentQuizList.length;
    renderQuiz();
  });

  document.getElementById('hintQuestionBtn').addEventListener('click', () => {
    const q = currentQuizList[currentQuizIndex];
    showToast(`💡 Hint: ${q.hint}`);
  });

  // Challenge selector & buttons
  document.getElementById('challengeSelect').addEventListener('change', (e) => {
    currentChallengeId = e.target.value;
    renderChallenge();
  });

  const codeEditor = document.getElementById('codeEditor');
  codeEditor.addEventListener('input', updateLineNumbers);
  codeEditor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeEditor.selectionStart;
      const end = codeEditor.selectionEnd;
      codeEditor.value = codeEditor.value.substring(0, start) + '    ' + codeEditor.value.substring(end);
      codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
      updateLineNumbers();
    }
  });

  document.getElementById('challengeHintBtn').addEventListener('click', () => {
    document.getElementById('chalHintDrawer').classList.toggle('hidden');
  });

  document.getElementById('resetCodeBtn').addEventListener('click', () => {
    const chal = C_CHALLENGES.find((c) => c.id === currentChallengeId);
    if (chal) {
      codeEditor.value = chal.starterCode;
      updateLineNumbers();
      showToast('↺ Starter C code restored.');
    }
  });

  document.getElementById('fillSolutionBtn').addEventListener('click', () => {
    const chal = C_CHALLENGES.find((c) => c.id === currentChallengeId);
    if (chal) {
      codeEditor.value = chal.solutionCode;
      updateLineNumbers();
      showToast('🎓 Official C reference solution loaded.');
    }
  });

  document.getElementById('runTestsBtn').addEventListener('click', runChallengeTests);

  // Visualizer controls
  document.getElementById('traceResetBtn').addEventListener('click', () => {
    currentTraceStep = 0;
    renderVisualizer();
  });

  document.getElementById('tracePrevBtn').addEventListener('click', () => {
    if (currentTraceStep > 0) {
      currentTraceStep--;
      renderVisualizer();
    }
  });

  document.getElementById('traceNextBtn').addEventListener('click', () => {
    const trace = C_UNITS[state.currentUnit].trace;
    if (currentTraceStep < trace.steps.length - 1) {
      currentTraceStep++;
      renderVisualizer();
    } else {
      showToast('✓ Reached end of C memory execution trace!');
    }
  });

  // Report & Reset
  document.getElementById('exportReportBtn').addEventListener('click', exportStudentReport);
  document.getElementById('resetProgressBtn').addEventListener('click', () => {
    if (confirm('Reset all XP, streaks, completed modules, and solved C challenges?')) {
      state = { ...defaultState };
      saveState();
      updateHUD();
      switchMode('dashboard');
      showToast('🗑 Progress has been reset.');
    }
  });

  // Initial render
  updateHUD();
  switchMode(state.currentMode);
});
