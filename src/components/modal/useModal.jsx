import React, { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [thisId, setThisId] = useState(null);

  function toggle() {
    setIsShowing(!isShowing);
    console.log("toggling" + isShowing)
  }

  // HER FÅR JEG DET RIGTIGE ID
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