'use client'

import { useState, useRef, useEffect, useCallback } from 'react';
import React from 'react';

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  zIndex?: number;
}

const Window = ({
  title,
  isOpen,
  onClose,
  children,
  initialPosition = { x: 100, y: 100 },
  width = 400,
  height = 300,
  zIndex = 1,
}: WindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    },
    [isDragging, dragOffset]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    setIsDragging(true);
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width,
        height,
        zIndex,
        userSelect: isDragging ? "none" : "auto",
      }}
    >
      {/* Window Frame */}
      <div
        style={{
          background: "#f5f5dc",
          border: "1px solid #000",
          borderRadius: "8px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "8px",
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: isDragging ? "grabbing" : "grab",
            minHeight: "20px",
            marginBottom: "8px",
          }}
          onMouseDown={handleMouseDown}
        >
          <button
            className="window-controls"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              width: "16px",
              height: "16px",
              cursor: "pointer",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            ✕
          </button>
          <div style={{ flex: 1 }}></div>
          <span
            style={{
              fontFamily: "NewYork, Times, serif",
              fontSize: "14px",
              color: "#000",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "-1px",
              transform: "scaleX(0.8) scaleY(1.4)",
              display: "inline-block",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "optimizeLegibility",
            }}
          >
            {title}
          </span>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            background: "white",
            border: "1px solid #000",
            borderRadius: "6px",
            overflow: "auto",
            padding: "12px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <Window
      title="My Window"
      isOpen={true}
      onClose={() => console.log("Closed")}
    >
      <p>This is an example content inside the window component.</p>
    </Window>
  );
};

export default HomePage;