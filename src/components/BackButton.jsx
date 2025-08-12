import { useNavigate, useNavigationType, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function BackButton({ fallback = "/", children = "Back", className = "" }) {
  const navigate = useNavigate();
  const navigationType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"
  const location = useLocation();
  const hasHistoryRef = useRef(true);

  useEffect(() => {
    if (navigationType === "POP") {
      hasHistoryRef.current = window.history.length > 1;
    } else {
      hasHistoryRef.current = true;
    }
  }, [navigationType, location.key]);

  const handleBack = () => {
    if (window.history.length > 1 && hasHistoryRef.current) {
      navigate(-1);
    } else {
      navigate(fallback, { replace: true });
    }
  };

  return (
    <button type="button" onClick={handleBack} className={className} aria-label="Go back">
      {children}
    </button>
  );
}
