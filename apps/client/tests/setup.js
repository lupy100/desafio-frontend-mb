import { vi } from 'vitest';

// Mock global APIs se necessário
globalThis.fetch = vi.fn();
