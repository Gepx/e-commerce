export const loadSnap = () => {
  return new Promise((resolve, reject) => {
    if (window.snap) return resolve(window.snap);

    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.async = true;
    script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
    script.onload = () => resolve(window.snap);
    script.onerror = () => reject(new Error('Failed to load Midtrans Snap'));
    document.head.appendChild(script);
  });
};
