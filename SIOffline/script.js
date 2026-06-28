'use strict';

const PLAYERS = {
  pasha: 'Паша',
  tanya: 'Таня',
};

const ROUND_FILES = {
  1: './questions/round-1.json',
  2: './questions/round-2.json',
  3: './questions/round-3.json',
  final: './questions/round-final.json',
};

const STORAGE_KEY = 'svoya-igra-save';

const state = {
  currentRound: 1,
  scores: { pasha: 0, tanya: 0 },
  tanyaFinalScore: 0,
  roundData: null,
  answered: new Set(),
  finalAnswered: false,
  gameFinished: false,
  presentationDone: false,
  activeQuestion: null,
  isFinal: false,
};

const $ = (id) => document.getElementById(id);

const els = {
  app: $('app'),
  loading: $('loading'),
  errorPanel: $('error-panel'),
  errorText: $('error-text'),
  btnRetry: $('btn-retry'),
  boardWrapper: $('board-wrapper'),
  boardHead: $('board-head'),
  boardBody: $('board-body'),
  finalBoard: $('final-board'),
  finalTheme: $('final-theme'),
  finalQuestionBtn: $('final-question-btn'),
  gameOver: $('game-over'),
  winnerText: $('winner-text'),
  btnRestart: $('btn-restart'),
  roundBadge: $('round-badge'),
  scorePasha: $('score-pasha'),
  scoreTanya: $('score-tanya'),
  modalOverlay: $('modal-overlay'),
  modal: $('modal'),
  modalCost: $('modal-cost'),
  modalTheme: $('modal-theme'),
  modalQuestion: $('modal-question'),
  modalImage: $('modal-image'),
  modalAnswerHost: $('modal-answer-host'),
  modalAnswerText: $('modal-answer-text'),
  modalActions: $('modal-actions'),
  modalActionsFinal: $('modal-actions-final'),
  btnShowAnswer: $('btn-show-answer'),
  btnCloseModal: $('btn-close-modal'),
  btnBothCorrect: $('btn-both-correct'),
  btnNoAnswer: $('btn-no-answer'),
  btnCorrect: $('btn-correct'),
  btnWrong: $('btn-wrong'),
  themePresentation: $('theme-presentation'),
  presentationInner: $('presentation-inner'),
  presentationRound: $('presentation-round'),
  presentationTheme: $('presentation-theme'),
};

const presentation = {
  themes: [],
  index: 0,
  onComplete: null,
};

async function loadRoundData(round) {
  const file = ROUND_FILES[round];
  if (!file) throw new Error(`Неизвестный раунд: ${round}`);

  let response;
  try {
    response = await fetch(file);
  } catch {
    throw new Error(
      `Не удалось загрузить ${file}. Если вы открыли файл напрямую (file://), ` +
      'запустите локальный сервер в папке проекта, например: python -m http.server'
    );
  }

  if (!response.ok) {
    throw new Error(`Ошибка загрузки ${file}: HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(`Файл ${file} пуст или имеет неверный формат`);
  }

  return data;
}

function getAllCosts(themes) {
  const costs = new Set();
  themes.forEach((theme) => {
    theme.questions.forEach((q) => costs.add(q.cost));
  });
  return [...costs].sort((a, b) => a - b);
}

function questionKey(themeIndex, questionIndex) {
  return `${themeIndex}-${questionIndex}`;
}

function saveGameState() {
  try {
    const payload = {
      currentRound: state.currentRound,
      scores: { ...state.scores },
      tanyaFinalScore: state.tanyaFinalScore,
      answered: [...state.answered],
      finalAnswered: state.finalAnswered,
      gameFinished: state.gameFinished,
      isFinal: state.isFinal,
      presentationDone: state.presentationDone,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* localStorage недоступен — игра продолжит работать без сохранения */
  }
}

function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return null;
    if (!data.scores || typeof data.scores.pasha !== 'number' || typeof data.scores.tanya !== 'number') {
      return null;
    }
    if (!Array.isArray(data.answered)) return null;

    return data;
  } catch {
    return null;
  }
}

function clearGameState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function applySavedState(saved) {
  state.currentRound = saved.currentRound ?? 1;
  state.scores = { pasha: saved.scores.pasha, tanya: saved.scores.tanya };
  state.tanyaFinalScore = saved.tanyaFinalScore ?? 0;
  state.answered = new Set(saved.answered);
  state.finalAnswered = Boolean(saved.finalAnswered);
  state.gameFinished = Boolean(saved.gameFinished);
  state.isFinal = Boolean(saved.isFinal);
  state.presentationDone = Boolean(saved.presentationDone) || saved.answered.length > 0;
  state.activeQuestion = null;
  state.roundData = null;
}

function isRoundComplete() {
  if (state.isFinal) return state.finalAnswered;

  let total = 0;
  state.roundData.forEach((theme) => {
    total += theme.questions.length;
  });
  return state.answered.size >= total;
}

function updateScores(animate = false) {
  els.scorePasha.textContent = state.scores.pasha;
  els.scoreTanya.textContent = state.scores.tanya;

  if (animate) {
    [els.scorePasha, els.scoreTanya].forEach((el) => {
      el.classList.remove('updated');
      void el.offsetWidth;
      el.classList.add('updated');
    });
  }
}

function updateRoundBadge() {
  if (state.isFinal) {
    els.roundBadge.textContent = 'Финал';
  } else {
    els.roundBadge.textContent = `Раунд ${state.currentRound}`;
  }
}

function hideThemePresentation() {
  els.themePresentation.classList.add('hidden');
  els.app.classList.remove('presentation-mode');
}

function hideGameViews() {
  els.boardWrapper.classList.add('hidden');
  els.finalBoard.classList.add('hidden');
  els.gameOver.classList.add('hidden');
  hideThemePresentation();
}

function showThemePresentation(roundLabel, themes, onComplete) {
  hideGameViews();
  els.loading.classList.add('hidden');

  presentation.themes = themes;
  presentation.index = -1;
  presentation.onComplete = onComplete;

  els.presentationRound.textContent = roundLabel;
  els.presentationTheme.textContent = '';

  els.app.classList.add('presentation-mode');
  els.themePresentation.classList.remove('hidden');
  restartThemeAnimation();
}

function restartThemeAnimation() {
  els.presentationTheme.style.animation = 'none';
  void els.presentationTheme.offsetWidth;
  els.presentationTheme.style.animation = '';
}

function advanceThemePresentation() {
  if (presentation.index < presentation.themes.length - 1) {
    presentation.index += 1;
    els.presentationTheme.textContent = presentation.themes[presentation.index];
    restartThemeAnimation();
    return;
  }

  hideThemePresentation();
  state.presentationDone = true;
  saveGameState();
  presentation.onComplete?.();
}

function shouldSkipPresentation() {
  return state.presentationDone || state.answered.size > 0;
}

function beginRoundAfterPresentation(roundLabel, onComplete) {
  const themes = state.roundData.map((t) => t.theme);

  if (shouldSkipPresentation()) {
    onComplete();
    return;
  }

  showThemePresentation(roundLabel, themes, onComplete);
}

function renderBoard() {
  hideThemePresentation();
  els.boardWrapper.classList.remove('hidden');
  els.finalBoard.classList.add('hidden');
  els.gameOver.classList.add('hidden');

  const themes = state.roundData;
  const costs = getAllCosts(themes);

  els.boardHead.innerHTML = `
    <tr>
      <th class="corner"></th>
      ${costs.map((cost) => `<th class="cost-header">${cost}</th>`).join('')}
    </tr>
  `;

  els.boardBody.innerHTML = themes
    .map((theme, themeIndex) => {
      const cells = costs
        .map((cost) => {
          const qIndex = theme.questions.findIndex((q) => q.cost === cost);
          if (qIndex === -1) {
            return '<td class="used"></td>';
          }

          const key = questionKey(themeIndex, qIndex);
          const used = state.answered.has(key);
          const q = theme.questions[qIndex];

          return `
            <td class="${used ? 'used' : ''}" data-theme="${themeIndex}" data-question="${qIndex}">
              <button class="cell-btn" ${used ? 'disabled' : ''} data-theme="${themeIndex}" data-question="${qIndex}">
                ${used ? '' : q.cost}
              </button>
            </td>
          `;
        })
        .join('');

      return `<tr><th class="theme-label">${escapeHtml(theme.theme)}</th>${cells}</tr>`;
    })
    .join('');

  els.boardBody.querySelectorAll('.cell-btn:not([disabled])').forEach((btn) => {
    btn.addEventListener('click', () => {
      openQuestion(
        parseInt(btn.dataset.theme, 10),
        parseInt(btn.dataset.question, 10)
      );
    });
  });
}

function renderFinalBoard() {
  hideThemePresentation();
  els.boardWrapper.classList.add('hidden');
  els.finalBoard.classList.remove('hidden');
  els.gameOver.classList.add('hidden');

  const theme = state.roundData[0];
  const question = theme.questions[0];

  els.finalTheme.textContent = theme.theme;
  els.finalQuestionBtn.textContent = question.cost;
  els.finalQuestionBtn.disabled = state.finalAnswered;
  els.finalQuestionBtn.classList.toggle('used', state.finalAnswered);

  els.finalQuestionBtn.onclick = () => {
    if (!state.finalAnswered) {
      openQuestion(0, 0, true);
    }
  };
}

function openQuestion(themeIndex, questionIndex, isFinal = false) {
  const theme = state.roundData[themeIndex];
  const question = theme.questions[questionIndex];

  state.activeQuestion = { themeIndex, questionIndex, isFinal };

  els.modalCost.textContent = question.cost;
  els.modalTheme.textContent = theme.theme;
  els.modalQuestion.innerHTML = question.text;

  if (question.image && question.image.trim()) {
    els.modalImage.src = question.image;
    els.modalImage.classList.remove('hidden');
    els.modalImage.onerror = () => els.modalImage.classList.add('hidden');
  } else {
    els.modalImage.classList.add('hidden');
    els.modalImage.removeAttribute('src');
  }

  els.modalAnswerText.textContent = question.answer || '—';
  els.modalAnswerHost.classList.remove('visible');
  els.modalAnswerHost.classList.add('hidden');
  els.btnShowAnswer.classList.remove('hidden');

  if (isFinal || state.isFinal) {
    els.modalActions.classList.add('hidden');
    els.modalActionsFinal.classList.remove('hidden');
  } else {
    els.modalActions.classList.remove('hidden');
    els.modalActionsFinal.classList.add('hidden');
  }

  els.modalOverlay.classList.remove('hidden');
  els.modal.style.animation = 'none';
  void els.modal.offsetWidth;
  els.modal.style.animation = '';
}

function closeModal() {
  els.modalOverlay.classList.add('hidden');
  state.activeQuestion = null;
}

function awardPoints(player, delta) {
  state.scores[player] += delta;
  updateScores(true);
  saveGameState();
}

function awardPointsToBoth(delta) {
  state.scores.pasha += delta;
  state.scores.tanya += delta;
  updateScores(true);
  saveGameState();
}

function finishRegularQuestion() {
  const { themeIndex, questionIndex } = state.activeQuestion;
  state.answered.add(questionKey(themeIndex, questionIndex));
  saveGameState();
  closeModal();
  renderBoard();
  checkRoundComplete();
}

function handlePlayerAnswer(player) {
  if (!state.activeQuestion || state.isFinal) return;

  const { themeIndex, questionIndex } = state.activeQuestion;
  const question = state.roundData[themeIndex].questions[questionIndex];

  awardPoints(player, question.cost);
  finishRegularQuestion();
}

function handleBothCorrect() {
  if (!state.activeQuestion || state.isFinal) return;

  const { themeIndex, questionIndex } = state.activeQuestion;
  const question = state.roundData[themeIndex].questions[questionIndex];

  awardPointsToBoth(question.cost);
  finishRegularQuestion();
}

function handleNoAnswer() {
  if (!state.activeQuestion || state.isFinal) return;

  finishRegularQuestion();
}

function handleFinalAnswer(correct) {
  if (!state.activeQuestion || !state.isFinal) return;

  const question = state.roundData[0].questions[0];
  const delta = correct ? question.cost : -question.cost;

  awardPoints('pasha', delta);
  state.finalAnswered = true;
  saveGameState();
  closeModal();
  renderFinalBoard();
  setTimeout(showGameOver, 600);
}

function checkRoundComplete() {
  if (!isRoundComplete()) return;

  setTimeout(async () => {
    if (state.currentRound < 3) {
      await startRound(state.currentRound + 1);
    } else if (!state.isFinal) {
      await startFinalRound();
    }
  }, 800);
}

async function startRound(roundNum) {
  state.currentRound = roundNum;
  state.isFinal = false;
  state.gameFinished = false;
  state.presentationDone = false;
  state.answered.clear();

  showLoading(true);
  hideError();
  hideGameViews();

  try {
    state.roundData = await loadRoundData(roundNum);
    showLoading(false);
    updateRoundBadge();
    saveGameState();

    beginRoundAfterPresentation(`Раунд ${roundNum}`, () => {
      renderBoard();
      saveGameState();
    });
  } catch (err) {
    showLoading(false);
    showError(err.message);
  }
}

async function startFinalRound() {
  state.isFinal = true;
  state.gameFinished = false;
  state.presentationDone = false;
  state.finalAnswered = false;
  state.tanyaFinalScore = state.scores.tanya;
  state.scores.pasha = 0;

  showLoading(true);
  hideError();
  hideGameViews();

  try {
    state.roundData = await loadRoundData('final');
    showLoading(false);
    updateRoundBadge();
    updateScores();
    saveGameState();

    beginRoundAfterPresentation('Финал', () => {
      renderFinalBoard();
      saveGameState();
    });
  } catch (err) {
    showLoading(false);
    showError(err.message);
  }
}

function showGameOver() {
  state.gameFinished = true;
  saveGameState();
  hideThemePresentation();
  els.finalBoard.classList.add('hidden');
  els.boardWrapper.classList.add('hidden');
  els.gameOver.classList.remove('hidden');

  const pashaScore = state.scores.pasha;
  const tanyaScore = state.tanyaFinalScore;

  let text;
  if (pashaScore > tanyaScore) {
    text = `Победитель — Паша! (${pashaScore} : ${tanyaScore} в финале)`;
  } else if (tanyaScore > pashaScore) {
    text = `Победитель — Таня! (финал Паши: ${pashaScore}, очки Тани: ${tanyaScore})`;
  } else {
    text = `Ничья! (${pashaScore} : ${tanyaScore})`;
  }

  els.winnerText.textContent = text;
}

function showLoading(show) {
  els.loading.classList.toggle('hidden', !show);
}

function showError(message) {
  els.errorText.textContent = message;
  els.errorPanel.classList.remove('hidden');
  hideGameViews();
}

function hideError() {
  els.errorPanel.classList.add('hidden');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function initGame() {
  clearGameState();

  state.scores = { pasha: 0, tanya: 0 };
  state.tanyaFinalScore = 0;
  state.currentRound = 1;
  state.isFinal = false;
  state.gameFinished = false;
  state.presentationDone = false;
  state.answered.clear();
  state.finalAnswered = false;

  els.gameOver.classList.add('hidden');
  updateScores();
  await startRound(1);
}

async function restoreGame() {
  const saved = loadGameState();
  if (!saved) {
    await initGame();
    return;
  }

  applySavedState(saved);
  showLoading(true);
  hideError();
  els.gameOver.classList.add('hidden');

  try {
    updateScores();
    updateRoundBadge();

    if (state.gameFinished) {
      showLoading(false);
      showGameOver();
      return;
    }

    if (state.isFinal) {
      state.roundData = await loadRoundData('final');
      showLoading(false);

      if (state.finalAnswered) {
        showGameOver();
      } else if (shouldSkipPresentation()) {
        renderFinalBoard();
      } else {
        beginRoundAfterPresentation('Финал', () => {
          renderFinalBoard();
          saveGameState();
        });
      }
      return;
    }

    state.roundData = await loadRoundData(state.currentRound);
    showLoading(false);

    if (shouldSkipPresentation()) {
      renderBoard();
    } else {
      beginRoundAfterPresentation(`Раунд ${state.currentRound}`, () => {
        renderBoard();
        saveGameState();
      });
    }
  } catch (err) {
    showLoading(false);
    clearGameState();
    showError(`${err.message}. Сохранение сброшено — начните игру заново.`);
  }
}

function bindEvents() {
  els.modalActions.querySelectorAll('[data-player]').forEach((btn) => {
    btn.addEventListener('click', () => handlePlayerAnswer(btn.dataset.player));
  });

  els.btnCorrect.addEventListener('click', () => handleFinalAnswer(true));
  els.btnWrong.addEventListener('click', () => handleFinalAnswer(false));
  els.btnBothCorrect.addEventListener('click', handleBothCorrect);
  els.btnNoAnswer.addEventListener('click', handleNoAnswer);

  els.btnCloseModal.addEventListener('click', closeModal);

  els.modalOverlay.addEventListener('click', (e) => {
    if (e.target === els.modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !els.modalOverlay.classList.contains('hidden')) {
      closeModal();
      return;
    }

    if (
      !els.themePresentation.classList.contains('hidden') &&
      (e.key === ' ' || e.key === 'Enter')
    ) {
      e.preventDefault();
      advanceThemePresentation();
    }
  });

  els.btnRetry.addEventListener('click', initGame);
  els.btnRestart.addEventListener('click', initGame);

  els.btnShowAnswer.addEventListener('click', () => {
    els.modalAnswerHost.classList.remove('hidden');
    els.modalAnswerHost.classList.add('visible');
    els.btnShowAnswer.classList.add('hidden');
  });

  els.themePresentation.addEventListener('click', advanceThemePresentation);
}

document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  restoreGame();
});
