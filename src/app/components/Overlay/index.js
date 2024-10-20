import React, { useEffect, useRef } from "react";
import { svgImages } from "../../data/svgJson";

const OverlayScreen = (props) => {
  const { ns, toggleOverlay, overlay } = props;
  const ref = useRef(null);
  const toRef = useRef(null);

  const setFocus = () => {
    if (ref && ref.current) {
      toRef.current = setTimeout(() => {
        const button = ref.current.querySelector("button");
        if (button) {
          clearTimeout(toRef.current);
          button.focus();
        }
      }, 400);
    }
    return () => {
      clearTimeout(toRef.current);
    };
  };

  const handleArrowNavigation = (e) => {
    const focusableElements = ref.current.querySelectorAll('button, [role="button"], [tabindex="0"]');
    const focusableArray = Array.from(focusableElements);
    const currentIndex = focusableArray.indexOf(document.activeElement);
    let nextElement;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        nextElement = focusableArray[(currentIndex + 1) % focusableArray.length];
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        nextElement = focusableArray[(currentIndex - 1 + focusableArray.length) % focusableArray.length];
        break;
      default:
        return;
    }

    if (nextElement) {
      nextElement.focus();
    }
  };

  useEffect(() => {
    setFocus();
    const handleKeydown = (e) => handleArrowNavigation(e);

    if (ref.current) {
      ref.current.setAttribute('role', 'application');
      ref.current.addEventListener("keydown", handleKeydown);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("keydown", handleKeydown);
      }
      clearTimeout(toRef.current);
    };
  }, [overlay]);

  const overlayClasses = overlay ? "show" : "hide";
  const mobileView = props.isMobileDevice ? "mobile-view" : "";

  return (
    <div ref={ref} className={`${ns}-overlay-container ${overlayClasses}`} tabIndex="0">
      <div className="header">
        <div className="logo"></div>
        <div className="toc-container" aria-hidden="true">
          <div
            className="toc-arrow"
            dangerouslySetInnerHTML={{ __html: svgImages.tocArrow }}
            role="img"
            tabIndex="-1"
            aria-hidden="true"
          ></div>
          <span aria-label="Table of Contents" tabIndex="0">
            Table of Contents
          </span>
        </div>
        <div className="right-container">
          <div className="help">
            <span aria-label="Help" tabIndex="0">
              Help
            </span>
            <div dangerouslySetInnerHTML={{ __html: svgImages.infoArrow }}></div>
          </div>
        </div>
      </div>
      <div className="body">
        <div onClick={toggleOverlay} className="start-activity" tabIndex="-1">
          {props.children}
        </div>
      </div>
      <div className="footer">
        <div className="restart-section">
          <span aria-label="Restart Flowchart" tabIndex="0">
            Restart Flowchart
          </span>
          <div
            role="img"
            dangerouslySetInnerHTML={{ __html: svgImages.restartArrow }}
            tabIndex="-1"
            aria-hidden="true"
          ></div>
        </div>
        <div className="question-marker">
          <div className="quiz-section">
            <span aria-label="Quiz" tabIndex="0">
              Quiz
            </span>
            <div
              className="arrow"
              role="img"
              dangerouslySetInnerHTML={{ __html: svgImages.quizArrow }}
              tabIndex="-1"
              aria-hidden="true"
            ></div>
            <div
              className="icon"
              role="img"
              dangerouslySetInnerHTML={{ __html: svgImages.quizIcon }}
              tabIndex="-1"
              aria-hidden="true"
            ></div>
          </div>
        </div>
        <div className="play-controls">
          <div className="prev-section">
            <span aria-label="Previous Step" tabIndex="0">
              Previous Step
            </span>
            <div
              role="img"
              dangerouslySetInnerHTML={{ __html: svgImages.prevArrow }}
              tabIndex="-1"
              aria-hidden="true"
            ></div>
          </div>
          <div className="rewind-section">
            <span aria-label="Move backward 10 seconds" tabIndex="0">
              Move backward 10 seconds
            </span>
            <div
              role="img"
              dangerouslySetInnerHTML={{ __html: svgImages.rewindArrow }}
              tabIndex="-1"
              aria-hidden="true"
            ></div>
          </div>
          <div className="pause-section">
            <span aria-label="Play/Pause" tabIndex="0">
              Play/Pause
            </span>
            <div
              role="img"
              dangerouslySetInnerHTML={{ __html: svgImages.pauseArrow }}
              tabIndex="-1"
              aria-hidden="true"
            ></div>
          </div>
          <div className="forward-section">
            <span aria-label="Move forward 10 seconds" tabIndex="0">
              Move forward 10 seconds
            </span>
            <div
              role="img"
              dangerouslySetInnerHTML={{ __html: svgImages.forwardArrow }}
              tabIndex="-1"
              aria-hidden="true"
            ></div>
          </div>
          <div className="next-section">
            <span aria-label="Next Step" tabIndex="0">
              Next Step
            </span>
            <div
              role="img"
              dangerouslySetInnerHTML={{ __html: svgImages.nextArrow }}
              tabIndex="-1"
              aria-hidden="true"
            ></div>
          </div>
        </div>
        <div className={`audio-controls ${mobileView}`}>
          <div className="caption-section">
            <span aria-label="Closed Captions" tabIndex="0">
              Closed Captions
            </span>
            <div
              role="img"
              dangerouslySetInnerHTML={{ __html: svgImages.ccArrow }}
              tabIndex="-1"
              aria-hidden="true"
            ></div>
          </div>
          <div className={`volume-section`}>
            <span aria-label="Volume Control" tabIndex="0">
              Volume Control
            </span>
            <div
              role="img"
              dangerouslySetInnerHTML={{ __html: svgImages.volumeControlArrow }}
              tabIndex="-1"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayScreen;
