import React from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto w-full">
      {children}
    </div>
  );
}

export default Container