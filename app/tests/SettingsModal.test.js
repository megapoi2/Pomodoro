import { SettingsModal } from '../src/modules/SettingsModal';
import { Timer } from '../src/modules/Timer.js';

describe('SettingsModal module', () => {
  beforeEach(() => {
    document.body.innerHTML = `<main>
            <div class="timer-card"></div>
            <div class="timer-buttons"></div>
            <audio class="audio"></audio>
        </main>
      `;
  });

  test('openSettingsModal should open modal and add modal-open class', () => {
    SettingsModal.openSettingsModal();
    const modal = document.getElementById('modal');
    expect(modal).toBeTruthy(); // Modal should be inserted into the DOM
    expect(document.body.classList.contains('modal-open')).toBe(true); // Body should have modal-open class
  });

  test('closeSettingsModal should close modal and remove modal-open class', () => {
    SettingsModal.openSettingsModal();
    SettingsModal.closeSettingsModal();
    const modal = document.getElementById('modal');
    expect(modal).toBeFalsy(); // Modal should be removed from the DOM
    expect(document.body.classList.contains('modal-open')).toBe(false); // Body should not have modal-open class
  });

  test('handleSubmit should render error message for invalid workTimerInput', () => {
    const eventMock = { preventDefault: jest.fn() };
    const workTimerInput = 'invalid';
    const breakTimerInput = 10; // Valid breakTimerInput

    jest.spyOn(Timer, 'renderWorkValue').mockReturnValue(25); // Default values
    jest.spyOn(Timer, 'renderBreakValue').mockReturnValue(breakTimerInput); // Valid breakTimerInput
    jest.spyOn(Timer, 'renderTimer');

    SettingsModal.openSettingsModal();
    const form = document.querySelector('.settings-form');
    const workInput = form.querySelector('#work-timer-input');
    const breakInput = form.querySelector('#break-timer-input');
    workInput.value = workTimerInput;
    breakInput.value = breakTimerInput;

    SettingsModal.handleSubmit(eventMock, workTimerInput, breakTimerInput);

    expect(eventMock.preventDefault).toHaveBeenCalledTimes(1); // preventDefault should be called

    // Check that error message is rendered
    const errorMessage = document.querySelector('.error-message');
    expect(errorMessage).toBeTruthy(); // Error message should be present
    expect(errorMessage.textContent).toContain('must be a number greater than 0 and less than 61'); // Check error message content

    // Check that modal is not closed after invalid submission
    const modal = document.getElementById('modal');
    expect(modal).toBeTruthy(); // Modal should still be in the DOM
    expect(document.body.classList.contains('modal-open')).toBe(true); // Body should still have modal-open class
  });

  test('handleSubmit should render error message for invalid breakTimerInput', () => {
    const eventMock = { preventDefault: jest.fn() };
    const workTimerInput = 30; // Valid workTimerInput
    const breakTimerInput = 'invalid';

    jest.spyOn(Timer, 'renderWorkValue').mockReturnValue(workTimerInput); // Valid workTimerInput
    jest.spyOn(Timer, 'renderBreakValue').mockReturnValue(5); // Default values
    jest.spyOn(Timer, 'renderTimer');

    SettingsModal.openSettingsModal();
    const form = document.querySelector('.settings-form');
    const workInput = form.querySelector('#work-timer-input');
    const breakInput = form.querySelector('#break-timer-input');
    workInput.value = workTimerInput;
    breakInput.value = breakTimerInput;

    SettingsModal.handleSubmit(eventMock, workTimerInput, breakTimerInput);

    expect(eventMock.preventDefault).toHaveBeenCalledTimes(1); // preventDefault should be called

    // Check that error message is rendered
    const errorMessage = document.querySelector('.error-message');
    expect(errorMessage).toBeTruthy(); // Error message should be present
    expect(errorMessage.textContent).toContain('must be a number greater than 0 and less than 61'); // Check error message content

    // Check that modal is not closed after invalid submission
    const modal = document.getElementById('modal');
    expect(modal).toBeTruthy(); // Modal should still be in the DOM
    expect(document.body.classList.contains('modal-open')).toBe(true); // Body should still have modal-open class
  });

  test('handleSubmit should render timer with valid inputs', () => {
    const eventMock = { preventDefault: jest.fn() };
    const workTimerInput = 30;
    const breakTimerInput = 10;

    jest.spyOn(Timer, 'renderWorkValue').mockReturnValue(workTimerInput);
    jest.spyOn(Timer, 'renderBreakValue').mockReturnValue(breakTimerInput);
    jest.spyOn(Timer, 'renderTimer');

    SettingsModal.openSettingsModal();
    const form = document.querySelector('.settings-form');
    const workInput = form.querySelector('#work-timer-input');
    const breakInput = form.querySelector('#break-timer-input');
    workInput.value = workTimerInput;
    breakInput.value = breakTimerInput;

    SettingsModal.handleSubmit(eventMock, workTimerInput, breakTimerInput);

    expect(eventMock.preventDefault).toHaveBeenCalledTimes(1); // preventDefault should be called
    expect(Timer.renderWorkValue).toHaveBeenCalledWith(workTimerInput);
    expect(Timer.renderBreakValue).toHaveBeenCalledWith(breakTimerInput);
    expect(Timer.renderTimer).toHaveBeenCalledWith(workTimerInput, breakTimerInput);

    // Check that modal is closed after valid submission
    const modal = document.getElementById('modal');
    expect(modal).toBeFalsy(); // Modal should be removed from the DOM
    expect(document.body.classList.contains('modal-open')).toBe(false); // Body should not have modal-open class
  });
});
