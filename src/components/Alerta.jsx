import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="text-center text-white uppercase my-4 bg-red-600 font-bold p-3">
      {children}
    </div>
  );
}

export default Alerta