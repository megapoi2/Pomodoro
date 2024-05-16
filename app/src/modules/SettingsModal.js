import { Timer } from './Timer';

/**
   * Create the settings modal
   * @class
   */
const SettingsModal = (() => {

  /**
   * Handle submit by triggering errors if needed and modifying the time input values to render properly the timer
   * @fires Timer.renderTimer
   * @param {object} event - Triggering event
   * @param {int} workTimerInput - Work time in minutes
   * @param {int} breakTimerInput - Break length in minutes
   * @fires event.preventDefault
   * @fires Timer.renderTimer
   * @fires closeSettingsModal
   * @memberof SettingsModal
   */
  function handleSubmit(event, workTimerInput, breakTimerInput) {
    event.preventDefault();
    removeFormErrorMessage();

    if (isNaN(workTimerInput) || workTimerInput < 1 || workTimerInput >= 61) {
      renderFormErrorMessage('Work Timer');
    }
    else if (isNaN(breakTimerInput) || breakTimerInput < 1 || breakTimerInput >= 61) {
      renderFormErrorMessage('Break Timer');
    }
    else {
      if (Math.floor(workTimerInput) !== workTimerInput) workTimerInput = Math.floor(workTimerInput);
      if (Math.floor(breakTimerInput) !== breakTimerInput) breakTimerInput = Math.floor(breakTimerInput);
      Timer.renderTimer(Timer.renderWorkValue(workTimerInput), Timer.renderBreakValue(breakTimerInput));
      closeSettingsModal();
    }
  }

  /**
   * open settings modal by generating the innerHTML
   * @memberof SettingsModal
   */
  function openSettingsModal() {
    const settingsModal = document.createElement('div');
    settingsModal.classList.add('modal');
    settingsModal.setAttribute('id', 'modal');
    settingsModal.innerHTML = `<div class="modal-content">
      <div class="modal-header">Set Custom Timer (in minutes)</div>
      <div class="modal-body">
        <form class="settings-form" novalidate>
          <div class="form-group">
            <label for="work-timer-input">Work:</label>
            <input type="text" value="${Timer.renderWorkValue()}" inputmode="numeric" id="work-timer-input" required />
          </div>
          <div class="form-group">
            <label for="break-timer-input">Break:</label>
            <input type="text" value="${Timer.renderBreakValue()}" inputmode="numeric" id="break-timer-input" required />
          </div>
          <div class="button-group">
            <button type="submit" class="button modal-button submit">Save</button>
            <button type="button" class="button modal-button cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>`;

    document.querySelector('main').insertBefore(settingsModal, document.querySelector('.timer-card'));
    document.querySelector('body').classList.add('modal-open');
  }

  /**
   * close settings modal by removing child and remove class
   * @memberof SettingsModal
   */
  function closeSettingsModal() {
    const settingsModal = document.getElementById('modal');
    settingsModal ? document.querySelector('main').removeChild(settingsModal) : null;
    document.querySelector('body').classList.remove('modal-open');
  }

  /**
   * render form error message by adding the error-message class and changing the inner html
   * @memberof SettingsModal
   */
  function renderFormErrorMessage(timer) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('message', 'error-message');
    errorMessage.innerHTML = `<span class=" fa fa-exclamation-circle fa-lg fa-fw"></span> ${timer} must be a number greater than 0 and less than 61.`;

    document.querySelector('#modal .modal-body').appendChild(errorMessage);
  }

  /**
   * render form error message by removing the error-message class and removing the child
   * @memberof SettingsModal
   */
  function removeFormErrorMessage() {
    const errorMessage = document.querySelector('.error-message');
    errorMessage ? document.querySelector('.modal-body').removeChild(errorMessage) : null;
  }

  return {
    handleSubmit,
    openSettingsModal,
    closeSettingsModal
  };
})();

export { SettingsModal };
