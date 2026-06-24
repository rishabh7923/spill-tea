import React from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto w-full flex-1">
      {children}
    </div>
  );
}

export default Container