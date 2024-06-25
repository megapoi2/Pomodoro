import { Timer } from '../src/modules/Timer.js';

describe('Timer module', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div class="timer-card"></div>
        <div class="timer-buttons"></div>
        <audio class="audio"></audio>
      `;
      jest.useFakeTimers();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
      jest.clearAllTimers();
    });
  
    test('resetTimer should initialize the timer correctly', () => {
      Timer.renderTimer(25, 5);
  
      expect(document.querySelector('.session').textContent).toBe('Work Session');
      expect(document.querySelector('.timer').textContent).toBe('25:00');
    });
  
    test('renderWorkValue should return the correct work value', () => {
      Timer.renderWorkValue(30);
      expect(Timer.renderWorkValue()).toBe(30);
  
      Timer.renderWorkValue("Not a value");
      expect(Timer.renderWorkValue()).toBe(25);
    });
  
    test('renderBreakValue should return the correct break value', () => {
      Timer.renderBreakValue(10);
      expect(Timer.renderBreakValue()).toBe(10);
  
      Timer.renderBreakValue("Not a value");
      expect(Timer.renderBreakValue()).toBe(5);
    });

  test('countDown should start the timer', () => {
    Timer.renderTimer(25, 5);
    Timer.countDown();
    jest.advanceTimersByTime(1000);
    expect(document.querySelector('.timer').textContent).toBe('24:59');
  });

  test('pauseTimer should pause the timer', () => {
    Timer.renderTimer(25, 5);
    Timer.countDown();
    Timer.pauseTimer();
    jest.advanceTimersByTime(1000);
    expect(document.querySelector('.timer').textContent).toBe('25:00');
  });

  test('playTimer should switch to break when work timer is 0', () => {
    Timer.renderTimer(25, 5);
    Timer.countDown();
    jest.advanceTimersByTime(1501000); // 25 minute et 1 second in milliseconds
    expect(document.querySelector('.session').textContent).toBe('Break Session');
  });

  test('playTimer should count down during break session', () => {
    Timer.renderTimer(25, 5);
    Timer.countDown();
    jest.advanceTimersByTime(1501000); // 1 minute and 1 second in milliseconds
    jest.advanceTimersByTime(1000);  // 1 second in milliseconds
    expect(document.querySelector('.timer').textContent).toBe('04:59');
  });

  test('playTimer should reset after break timer is 0', () => {
    Timer.renderTimer(25, 5);
    Timer.countDown();
    jest.advanceTimersByTime(1501000); // 25 minute et 1 second in milliseconds
    jest.advanceTimersByTime(301000); // 1 minute and 1 second for break
    jest.advanceTimersByTime(1000);  // 1 second in milliseconds
    expect(document.querySelector('.timer').textContent).toBe('24:59');
    expect(document.querySelector('.session').textContent).toBe('Work Session');
  });
});
