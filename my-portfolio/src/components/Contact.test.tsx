import { render, screen, fireEvent } from '@testing-library/react';
import ContactSection from './Contact';

describe('Contact', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  const fillForm = () => {
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Recruiter' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Interested in chatting about an opportunity.' },
    });
  };

  it('renders all required form fields and the submit button', () => {
    render(<ContactSection />);

    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('submits to Formspree and shows a success message on a 2xx response', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
    render(<ContactSection />);

    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      'https://formspree.io/f/xkopnbro',
      expect.objectContaining({ method: 'POST' })
    );

    // Fields are cleared back to empty after a successful send.
    expect(screen.getByLabelText('Name')).toHaveValue('');
  });

  it('shows an error message when Formspree responds with a non-2xx status', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false } as Response);
    render(<ContactSection />);

    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('shows an error message when the request throws (e.g. offline)', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network down'));
    render(<ContactSection />);

    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('disables the fields while sending, and keeps them disabled after success', async () => {
    let resolveFetch: (value: { ok: boolean }) => void = () => {};
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    ) as unknown as typeof fetch;

    render(<ContactSection />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByLabelText('Name')).toBeDisabled();
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();

    resolveFetch({ ok: true });

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeDisabled();
  });
});
