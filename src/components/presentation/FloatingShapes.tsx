export default function FloatingShapes() {
    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--accent), transparent 70%)',
                    opacity: 0.3,
                    animation: 'float 12s ease-in-out infinite',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '60%',
                    left: '80%',
                    width: '0',
                    height: '0',
                    borderLeft: '40px solid transparent',
                    borderRight: '40px solid transparent',
                    borderBottom: `70px solid var(--gradient-end)`,
                    opacity: 0.2,
                    animation: 'float 15s ease-in-out infinite 2s',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '70%',
                    width: '60px',
                    height: '60px',
                    background: 'radial-gradient(circle, var(--gradient-end), transparent 70%)',
                    opacity: 0.25,
                    animation: 'float 18s ease-in-out infinite 4s',
                }}
            />
            <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(-20px, -30px) rotate(5deg);
          }
          50% {
            transform: translate(20px, -20px) rotate(-5deg);
          }
          75% {
            transform: translate(-10px, 20px) rotate(3deg);
          }
        }
      `}</style>
        </div>
    );
}