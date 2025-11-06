import { useState, useContext, createContext } from "react";


const LikeContext = createContext();
const LikeProvider = ({ children }) => {
  const [like, setLike] = useState(true);
  
  
  return (
    <LikeContext.Provider value={[like, setLike]}>
      {children}
    </LikeContext.Provider>
  );
};
const useLike = () => useContext(LikeContext);
export { LikeProvider, useLike };