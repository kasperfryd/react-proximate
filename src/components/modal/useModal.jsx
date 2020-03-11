import React, { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [thisId, setThisId] = useState(null);

  function toggle() {
    setIsShowing(!isShowing);
    console.log("toggling" + isShowing)
  }


  function setId(thisId){
    setThisId(thisId)
    console.log(thisId);
  }

  return {
    setId,
    thisId,
    isShowing,
    toggle,
  }
};

export default useModal;