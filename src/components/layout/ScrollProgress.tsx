'use client';

interface ScrollProgressProps {
  progress: number;
}

export function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 h-[2px]"
      style={{ backgroundColor: 'rgba(28, 20, 16, 0.3)' }}
    >
      <div
        className="h-full bg-amber-honey transition-none"
        style={{
          width: `${progress * 100}%`,
          willChange: 'width',
        }}
      />
    </div>
  );
}
