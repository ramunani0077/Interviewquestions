import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import Stopwatch from './App';

describe('Stopwatch Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('testStartButtonFunctionality', () => {
    render(<Stopwatch />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByText('0:03')).toBeInTheDocument();
  });

  test('testPauseButtonFunctionality', () => {
    render(<Stopwatch />);
    const startButton = screen.getByText('Start');
    const pauseButton = screen.getByText('Pause');
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.click(pauseButton);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('0:03')).toBeInTheDocument();
  });

  test('testStopButtonFunctionality', () => {
    render(<Stopwatch />);
    const startButton = screen.getByText('Start');
    const stopButton = screen.getByText('Stop');
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.click(stopButton);
    expect(screen.getByText('0:00')).toBeInTheDocument();
    expect(localStorage.getItem('stopwatch-time')).toBeNull();
  });

  test('testRetrieveCachedTimeOnLoad', () => {
    localStorage.setItem('stopwatch-time', '120');
    render(<Stopwatch />);
    expect(screen.getByText('2:00')).toBeInTheDocument();
  });

  test('testInvalidCachedTimeHandling', () => {
    localStorage.setItem('stopwatch-time', 'invalid');
    render(<Stopwatch />);
    expect(screen.getByText('0:00')).toBeInTheDocument();
  });

  test('testPauseAndResumeAccuracy', () => {
    render(<Stopwatch />);
    const startButton = screen.getByText('Start');
    const pauseButton = screen.getByText('Pause');
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.click(pauseButton);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('0:05')).toBeInTheDocument();
  });
});