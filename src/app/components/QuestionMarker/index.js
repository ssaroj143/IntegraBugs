import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const QuestionMarker = (props) => {
  const {
    ns,
    markers,
    onClick,
    selected,
    question,
    currentTime,
    answeredQuestions,
  } = props;

  const [minGap, setMinGap] = useState(2);
  useEffect(() => {
    const updateMinGap = () => {
      const screenWidth = document.documentElement.clientWidth;
      const zoomLevel = window.devicePixelRatio;
      if (zoomLevel >= 1 && screenWidth <= 1024) {
        if (zoomLevel >= 1 && screenWidth < 321) {
          setMinGap(8.5);
        } else if (zoomLevel >= 2 && screenWidth <= 512) {
          setMinGap(5.5);
        } else {
          setMinGap(3);
        }
      } else {
        setMinGap(2);
      }
    };

    updateMinGap();
    window.addEventListener("resize", updateMinGap);
    return () => window.removeEventListener("resize", updateMinGap);
  }, []);

  const _onClick = (e, marker) => {
    e.stopPropagation();
    onClick(marker);
  };

  const calculatePercentage = (time) => {
    return (time / props.duration) * 100;
  };
  const adjustedMarkers = markers.reduce((acc, marker, index) => {
    const left = calculatePercentage(marker.activeTimestamp);

    if (index > 0 && left - acc[index - 1].left < minGap) {
      acc.push({ ...marker, left: acc[index - 1].left + minGap });
    } else {
      acc.push({ ...marker, left });
    }
    return acc;
  }, []);

  return (
    <div aria-hidden={props.overlay} className={`${ns}-question-marker marker-container`}>
      {adjustedMarkers.map((m) => {
        const active = m.id == selected && question ? "active" : "";
        const visited = answeredQuestions.includes(m.id) ? "visited" : "";
        return (
          <button
            key={m.id}
            name={m.id}
            title={m.markerTitle}
            aria-label={m.markerLabel}
            disabled={m.id == selected}
            aria-hidden={props.overlay}
            onClick={(e) => _onClick(e, m)}
            tabIndex={props.overlay ? "-1" : ""}
            style={{ left: `calc(${m.left}% - 5px)` }}
            className={`marker ${visited} ${active}`}
          ></button>
        );
      })}
    </div>
  );
};

QuestionMarker.propTypes = {
  onClick: PropTypes.func.isRequired,
  markers: PropTypes.array.isRequired,
  duration: PropTypes.number.isRequired,
  selected: PropTypes.string.isRequired,
  answeredQuestions: PropTypes.array.isRequired,
};

export default QuestionMarker;
