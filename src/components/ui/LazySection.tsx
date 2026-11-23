"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
  deferMount?: boolean;
  id?: string;
}

/**
 * Component LazySection kết hợp:
 * 1. Native CSS `content-visibility: auto` (trình duyệt tự động bỏ qua bước dựng hình/paint cho các phần khuất bên dưới mà không làm chậm LCP).
 * 2. IntersectionObserver (nếu bật `deferMount={true}`, chỉ gắn vào DOM và gọi API khi người dùng cuộn tới gần).
 */
export default function LazySection({
  children,
  minHeight = "450px",
  rootMargin = "200px",
  deferMount = false,
  id,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(!deferMount);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!deferMount || isVisible) return;
    const el = containerRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [deferMount, isVisible, rootMargin]);

  return (
    <div
      ref={containerRef}
      id={id}
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: `auto ${minHeight}`,
      }}
    >
      {isVisible ? (
        children
      ) : (
        <div aria-hidden="true" style={{ minHeight }} />
      )}
    </div>
  );
}
