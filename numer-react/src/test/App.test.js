import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import Newton from '../cal/RootOfEquation/Newton-Rephson';

test('finds the root of 2Z^3-2Z using Newton-Raphson method', () => {
  render(<Newton />);
  const fx = screen.getByTestId('equation');
  fireEvent.change(fx, {target : {value : "2Z^3-2Z"}})

  const x = screen.getByTestId('XL');
  fireEvent.change(x, {target : {value : 5}})

  const bt = screen.getByTestId('btn');
  fireEvent.click(bt);

  const ans = screen.getByTestId('ans').textContent;
  expect(ans).toBe("Answer = 1.000000")
});

