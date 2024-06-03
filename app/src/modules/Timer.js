/**
   * Create the timer
   * @class
   */
const Timer = (() => {
  let timer;
  let currentSession;
  let currentMinutes;
  let currentSeconds;
  let workTimer;
  let breakTimer;

  /**
   * Reset the timer & Set session to Work
   * @param {int} workValue - Work time in minutes
   * @param {int} breakValue - Break length in minutes
   * @memberof Timer
   */
  function resetTimer(workValue, breakValue) {
    clearInterval(timer);

    timer = null;
    currentSession = 'Work';
    currentMinutes = workValue;
    currentSeconds = 0;
    workTimer = workValue * 60;
    breakTimer = breakValue * 60;

    document.querySelector('.audio').pause();
    document.querySelector('.audio').currentTime = 0;
    document.title = 'Pomodoro Timer';
  }

  /**
   * Return the work time in minutes or 25 if null
   * @param {int} workValue - Work time in minutes
   * @returns {int}
   * @memberof Timer
   */
  function renderWorkValue(workValue) {
    workValue ? localStorage.setItem('workValue', JSON.stringify(Number(workValue))) : null;
    return JSON.parse(localStorage.getItem('workValue')) || 25;
  }

  /**
   * Return the break length in minutes or 5 if null
   * @param {int} workValue - Work time in minutes
   * @returns {int}
   * @memberof Timer
   */
  function renderBreakValue(breakValue) {
    breakValue ? localStorage.setItem('breakValue', JSON.stringify(Number(breakValue))) : null;
    return JSON.parse(localStorage.getItem('breakValue')) || 5;
  }

  /**
   * Toggle the play pause bouton visually
   * @param {string} show - Can be pause or play
   * @memberof Timer
   */
  function togglePlayPause(show) {
    let hide;
    show === 'play' ? hide = 'pause' : show === 'pause' ? hide = 'play' : null;

    const buttonToShow = document.createElement('button');
    const buttonToHide = document.querySelector(`.timer-buttons .${hide}-timer`);

    buttonToShow.setAttribute('type', 'button');
    buttonToShow.classList.add('button', 'timer-button', `${show}-timer`);
    buttonToShow.setAttribute('aria-label', show);
    buttonToShow.setAttribute('title', show.replace(show.charAt(0), show.charAt(0).toUpperCase()));
    buttonToShow.innerHTML = `<span class="fa fa-${show} fa-lg timer-icon"></span>`;

    buttonToHide ? document.querySelector('.timer-buttons').removeChild(buttonToHide) : null;
    !document.querySelector(`.timer-buttons .${show}-timer`) ? document.querySelector('.timer-buttons').insertBefore(buttonToShow, document.querySelector('.reset-timer')) : null;
  }

  /**
   * Start the timer
   * @memberof Timer
   */
  function playTimer() {
    let currentTimer;

    if (workTimer > 0) {
      workTimer--;
      currentMinutes = parseInt(workTimer / 60, 10);
      currentSeconds = parseInt(workTimer % 60, 10);
    }
    else {

      if (breakTimer === renderBreakValue() * 60 && currentMinutes === 0 && currentSeconds === 0) {
        document.querySelector('.audio').play();
        currentMinutes = renderBreakValue();
        currentSeconds = 0;
        currentSession = 'Break';
      }
      else {

        if (breakTimer > 0) {
          breakTimer--;
          currentMinutes = parseInt(breakTimer / 60, 10);
          currentSeconds = parseInt(breakTimer % 60, 10);
        }
        else {
          document.querySelector('.audio').play();
          clearInterval(timer);
          workTimer = renderWorkValue() * 60;
          breakTimer = renderBreakValue() * 60;
          currentMinutes = workTimer / 60;
          currentSeconds = workTimer % 60;
          currentSession = 'Work';
          countDown();
        }
      }
    }

    currentTimer = `${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:${currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}`;
    document.querySelector('.session').innerHTML = `${currentSession} Session`;
    document.querySelector('.timer').innerHTML = currentTimer;
    document.title = `${currentSession} – ${currentTimer}`;
  }

  /**
   * Start the countDown
   * @fires togglePlayPause
   * @memberof Timer
   */
  function countDown() {
    timer = setInterval(playTimer, 1000);
    togglePlayPause('pause');
  }

  /**
   * Pause the timer and generate a pause sound
   * @fires togglePlayPause
   * @memberof Timer
   */
  function pauseTimer() {
    clearInterval(timer);
    document.querySelector('.audio').pause();
    togglePlayPause('play');
  }

  /**
   * Render the timer
   * By Resetting the timer, generating the HTML elements and pausing the timer
   * @param {int} workValue - Work time in minutes
   * @param {int} breakValue - Break length in minutes
   * @fires resetTimer
   * @fires togglePlayPause
   * @memberof Timer
   */
  function renderTimer(workValue, breakValue) {
    resetTimer(workValue, breakValue);

    document.querySelector('.timer-card').innerHTML = `
    <h2 class="session">${currentSession} Session</h2>
    <div class="timer">${workValue < 10 ? `0${workValue}` : workValue}:00</div>`;

    document.querySelector('.timer-buttons').innerHTML = `
    <button type="button" class="button timer-button reset-timer" aria-label="reset" title="Reset">
      <span class="fa fa-redo-alt fa-lg timer-icon"></span>
    </button>`;

    togglePlayPause('play');
  }

  return {
    timer,
    renderWorkValue,
    renderBreakValue,
    countDown,
    pauseTimer,
    renderTimer
  };
})();

export { Timer };
