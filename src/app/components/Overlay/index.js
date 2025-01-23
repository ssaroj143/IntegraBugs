import React, { useEffect, useRef } from "react";
import { svgImages } from "../../data/svgJson";

const OverlayScreen = (props) => {
  const { ns, toggleOverlay, overlay } = props;
  const ref = useRef(null);
  const toRef = useRef(null);

  useEffect(() => {
    setFocus()
  }, []);

  useEffect(() => {
    overlay && setFocus()
  }, [overlay])
  const setFocus = () => {
    if (ref && ref.current) {
      toRef.current = setTimeout(() => {
        const button = ref.current.querySelector("body button");
        if (button) {
          clearTimeout(toRef.current);
          button.focus();
        }
      }, 400);
    }

    return () => {
      clearTimeout(toRef.current);
    };
  }

  const overlayClasses = overlay ? "show" : "hide";
  const mobileView = props.isMobileDevice ? "mobile-view" : "";

  return (
    <div ref={ref} className={`${ns}-overlay-container ${overlayClasses}`}>
      <div className="header">
        <div className="logo"></div>
        <div className="toc-container">
          <div
            className="toc-arrow"
            dangerouslySetInnerHTML={{ __html: svgImages.tocArrow }}
            role="img"
            tabIndex="-1"
            aria-hidden="true"
          ></div>
          <span aria-label="Table Of Contents">
            Table of Contents
          </span>
        </div>
        <div className="right-container">
          <div className="help">
            <span aria-label="Help">
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
          <span aria-label="Restart Flowchart">
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
            <span aria-label="Quiz">
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
            <span aria-label="Previous Step">
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
            <span aria-label="Move backward 10 seconds">
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
            <span aria-label="Play/Pause">
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
            <span aria-label="Move forward 10 seconds">
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
            <span aria-label="Next Step">
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
            <span aria-label="Closed Captions">
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
            <span aria-label="Volume Control">
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
