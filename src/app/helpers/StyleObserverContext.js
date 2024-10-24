import React, { createContext, useContext, useEffect } from 'react';

const StyleObserverContext = createContext();
export const StyleObserverProvider = ({ children }) => {
  useEffect(() => {
    const addClassToLocalStorage = (className) => {
      const existingClasses = JSON.parse(localStorage.getItem('bodyClasses')) || [];
      if (!existingClasses.includes(className)) {
        existingClasses.push(className);
        localStorage.setItem('bodyClasses', JSON.stringify(existingClasses));
      }
    };

    const removeClassFromLocalStorage = (className) => {
      const existingClasses = JSON.parse(localStorage.getItem('bodyClasses')) || [];
      const updatedClasses = existingClasses.filter((cls) => cls !== className);
      localStorage.setItem('bodyClasses', JSON.stringify(updatedClasses));
    };

    const applyStoredClasses = () => {
      const storedClasses = JSON.parse(localStorage.getItem('bodyClasses')) || [];
      const chartContainer = document.querySelector('body');
      if (chartContainer) {
        storedClasses.forEach((className) => {
          chartContainer.classList.add(className);
        });
      }
    };

    const callback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.tagName === 'STYLE') {
              console.log('A <style> tag was appended:', node);
              const chartContainer = document.querySelector('body');
              if (chartContainer) {
                chartContainer.classList.add('style-tag-added');
                addClassToLocalStorage('style-tag-added');
              }
              const event = new CustomEvent('styleAppended', { detail: node });
              window.dispatchEvent(event);
            }
          });

          mutation.removedNodes.forEach((node) => {
            if (node.tagName === 'STYLE') {
              console.log('A <style> tag was removed:', node);
              const chartContainer = document.querySelector('body');
              if (chartContainer) {
                chartContainer.classList.remove('style-tag-added');
                removeClassFromLocalStorage('style-tag-added');
              }
              const event = new CustomEvent('styleRemoved', { detail: node });
              window.dispatchEvent(event);
            }
          });
        }
      }
    };

    applyStoredClasses();

    const targetNode = document.documentElement;
    const config = { childList: true, subtree: true };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    return () => observer.disconnect();
  }, []);

  return (
    <StyleObserverContext.Provider value={null}>
      {children}
    </StyleObserverContext.Provider>
  );
};

export const useStyleObserver = () => {
  return useContext(StyleObserverContext);
};