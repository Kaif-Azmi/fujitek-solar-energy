import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Header UI', () => {
  it('does not expose /login link in public header', () => {
    const headerPath = path.join(process.cwd(), 'components', 'Header.tsx');
    const content = fs.readFileSync(headerPath, 'utf8');

    // The Header must not contain a public /login link
    expect(content.includes('href="/login"')).toBe(false);

    // No visible Login CTA text in header
    expect(content.includes('\n            Login\n')).toBe(false);
  });
});
