import React from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto w-full overflow-hidden h-[calc(100vh-4rem)]">
      {children}
    </div>
  );
}

export default Container