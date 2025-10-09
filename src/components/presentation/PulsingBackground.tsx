export default function PulsingBackground() {
    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -2,
                background: `
          radial-gradient(circle at 20% 30%, var(--accent), transparent 40%),
          radial-gradient(circle at 80% 70%, var(--gradient-end), transparent 40%)
        `,
                backgroundSize: '200% 200%',
                animation: 'pulse 20s ease infinite',
                opacity: 0.15,
                pointerEvents: 'none',
            }}
        />
    );
}