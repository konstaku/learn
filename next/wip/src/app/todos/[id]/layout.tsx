import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1>Individual todo</h1>
      {children}
    </>
  );
}
