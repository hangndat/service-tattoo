// Helper mock usePathname (dùng trong test)
// Giữ pathname ở scope module (ổn định với hoisting của Vitest)
let __mockPathname = '/';

export const mockUsePathname = (p: string) => {
  __mockPathname = p;

  vi.mock('next/navigation', async () => {
    const actual = await import('next/navigation');
    return {
      ...actual,
      usePathname: () => __mockPathname, // đọc từ biến module
    };
  });
};